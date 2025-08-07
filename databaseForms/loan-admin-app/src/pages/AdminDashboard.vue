<template>
  <div class="admin-dashboard">
    <!-- Loading Screen -->
    <div v-if="initialLoading" class="loading-screen">
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <h2>Loading Admin Dashboard...</h2>
        <p>Please wait while we fetch the latest data</p>
      </div>
    </div>
    
    <div v-else>
      <div class="dashboard-header">
        <h1>Loan Admin Dashboard</h1>
        <p>Manage loan approvals and payment requests</p>
      </div>

    <!-- Success Message -->
    <div v-if="successMessage" class="success-message">
      {{ successMessage }}
      <button @click="clearSuccessMessage" class="close-message">&times;</button>
    </div>

    <!-- Statistics Cards -->
    <div class="stats-grid">
      <div class="stat-card" @click="activeTab = 'loans'" :class="{ active: activeTab === 'loans' }">
        <div class="stat-content">
          <div class="stat-label">Loan</div>
        </div>
      </div>
      <div class="stat-card" @click="activeTab = 'returns'" :class="{ active: activeTab === 'returns' }">
        <div class="stat-content">
          <div class="stat-label">Payment</div>
        </div>
      </div>
      <div class="stat-card" @click="showBankAccountModal = true">
        <div class="stat-content">
          <div class="stat-label">Bank Account</div>
        </div>
      </div>
      <div class="stat-card" @click="startGoogleSheetsUpdate" :class="{ active: isUpdatingSheets }">
        <div class="stat-content">
          <div v-if="!isUpdatingSheets" class="stat-value">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14,2 14,8 20,8"></polyline>
            </svg>
          </div>
          <div v-else class="stat-value">
            <div class="progress-spinner">
              <div class="spinner-ring"></div>
            </div>
          </div>
          <div class="stat-label">Sheets</div>
          <div v-if="isUpdatingSheets" class="stat-subtitle">{{ sheetsProgress.status }}</div>
          <div v-else class="stat-subtitle">Click to update all profiles</div>
        </div>
      </div>
    </div>

    <!-- Pending Loan Approvals Tab -->
    <div v-if="activeTab === 'loans'" class="tab-content">
      <div class="section">
        <h2>Pending Loan Approvals</h2>
        <div class="loan-grid">
          <div v-for="loan in pendingLoans" :key="loan.regId" class="loan-card">
            <div class="loan-header">
              <div class="profile-info">
                <div class="profile-picture">
                  <img 
                    v-if="loan.profilePicture" 
                    :src="loan.profilePicture" 
                    :alt="loan.name"
                    @error="handleImageError"
                    @load="handleImageLoad"
                  />
                  <div v-else class="profile-placeholder">
                    {{ getInitials(loan.name) }}
                  </div>
                </div>
                <div class="profile-details">
                  <h3>{{ loan.name }}</h3>
                  <p class="reg-id">Reg ID: {{ loan.regId }}</p>
                  <p class="district">District: {{ loan.district }}</p>
                  <p class="contact" v-if="loan.contact">Contact: {{ loan.contact }}</p>
                  <p class="age" v-if="loan.age">Age: {{ loan.age }} years</p>
                </div>
              </div>
              <div class="loan-actions">
                <button 
                  @click="approveLoan(loan.regId, loan.loanId)" 
                  class="btn btn-success"
                  :disabled="approvingLoans.includes(`${loan.regId}_${loan.loanId}`)"
                >
                  <span v-if="approvingLoans.includes(`${loan.regId}_${loan.loanId}`)" class="loader"></span>
                  {{ approvingLoans.includes(`${loan.regId}_${loan.loanId}`) ? 'Approving...' : 'Approve' }}
                </button>
                <button 
                  @click="editLoan(loan)" 
                  class="btn btn-secondary"
                  :disabled="approvingLoans.includes(`${loan.regId}_${loan.loanId}`)"
                >
                  Edit
                </button>
              </div>
            </div>
            
            <div class="loan-details">
              <div class="detail-row">
                <span class="label">Loan ID:</span>
                <span class="value">{{ loan.loanId }}</span>
              </div>
              <div class="detail-row">
                <span class="label">Loan Type:</span>
                <span class="value">{{ loan.loanType }}</span>
              </div>
              <div class="detail-row">
                <span class="label">Amount:</span>
                <span class="value">Rs. {{ formatAmount(loan.amount) }}</span>
              </div>
              <div class="detail-row">
                <span class="label">Purpose:</span>
                <span class="value">{{ loan.purpose }}</span>
              </div>
              <div class="detail-row">
                <span class="label">Source:</span>
                <span class="value">{{ loan.source || 'Not specified' }}</span>
              </div>
              <div class="detail-row">
                <span class="label">Request Date:</span>
                <span class="value">{{ formatDate(loan.createdAt) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pending Returns Tab (Payments + GIF Returns) -->
    <div v-if="activeTab === 'returns'" class="tab-content">
      <div class="section">
        <h2>Pending Returns</h2>
        
        <!-- Payment Requests -->
        <div v-if="pendingPayments.length > 0" class="subsection">
          <h3>Payment Requests ({{ pendingPayments.length }})</h3>
        <div class="payment-grid">
          <div v-for="payment in pendingPayments" :key="payment.id" class="payment-card">
            <div class="payment-header">
              <div class="profile-info">
                <div class="profile-picture">
                  <img 
                    v-if="payment.profilePicture" 
                    :src="payment.profilePicture" 
                    :alt="payment.name"
                    @error="handleImageError"
                    @load="handleImageLoad"
                  />
                  <div v-else class="profile-placeholder">
                    {{ getInitials(payment.name) }}
                  </div>
                </div>
                <div class="profile-details">
                  <h3>{{ payment.name }}</h3>
                  <p class="reg-id">Reg ID: {{ payment.regId }}</p>
                  <p class="district">District: {{ payment.district }}</p>
                  <p class="contact" v-if="payment.contact">Contact: {{ payment.contact }}</p>
                  <p class="age" v-if="payment.age">Age: {{ payment.age }} years</p>
                </div>
              </div>
              <div class="payment-actions">
                <button 
                  @click="approvePayment(payment.id)" 
                  class="btn btn-success"
                  :disabled="approvingPayments.includes(payment.id)"
                >
                  <span v-if="approvingPayments.includes(payment.id)" class="loader"></span>
                  {{ approvingPayments.includes(payment.id) ? 'Approving...' : 'Approve' }}
                </button>
                <button 
                  @click="editPayment(payment)" 
                  class="btn btn-secondary"
                  :disabled="approvingPayments.includes(payment.id)"
                >
                  Edit
                </button>
              </div>
            </div>
            
            <div class="payment-details">
              <div class="detail-row">
                <span class="label">Payment Amount:</span>
                <span class="value">Rs. {{ formatAmount(payment.amount) }}</span>
              </div>
              <div class="detail-row" v-if="payment.paidAmount">
                <span class="label">Paid Amount:</span>
                <span class="value">Rs. {{ formatAmount(payment.paidAmount) }}</span>
              </div>
              <div class="detail-row">
                <span class="label">Receiver:</span>
                <span class="value">{{ payment.receiver }}</span>
              </div>
              <div class="detail-row">
                <span class="label">Total Balance:</span>
                <span class="value">Rs. {{ formatAmount(payment.totalBalance) }}</span>
              </div>
              <div class="detail-row">
                <span class="label">Active Loans:</span>
                <span class="value">{{ payment.activeLoans?.length || 0 }}</span>
              </div>
              <div class="detail-row">
                <span class="label">Request Date:</span>
                <span class="value">{{ formatDate(payment.createdAt) }}</span>
              </div>
              <div class="detail-row" v-if="payment.driveLink">
                <span class="label">Receipt:</span>
                <span class="value">
                  <a :href="payment.driveLink" target="_blank" class="receipt-link">
                    View Receipt
                  </a>
                </span>
            </div>
          </div>
        </div>
      </div>
    </div>

        <!-- GIF Returns -->
        <div v-if="pendingGIFReturns.length > 0" class="subsection">
          <h3>GIF Returns ({{ pendingGIFReturns.length }})</h3>
        <div class="gif-return-grid">
          <div v-for="gifReturn in pendingGIFReturns" :key="gifReturn.id" class="gif-return-card">
            <div class="gif-return-header">
              <div class="profile-info">
                <div class="profile-picture">
                  <img 
                    v-if="gifReturn.profilePicture" 
                    :src="gifReturn.profilePicture" 
                    :alt="gifReturn.name"
                    @error="handleImageError"
                    @load="handleImageLoad"
                  />
                  <div v-else class="profile-placeholder">
                    {{ getInitials(gifReturn.name) }}
                  </div>
                </div>
                <div class="profile-details">
                  <h3>{{ gifReturn.name }}</h3>
                  <p class="reg-id">Reg ID: {{ gifReturn.regId }}</p>
                  <p class="district">District: {{ gifReturn.district }}</p>
                  <p class="contact" v-if="gifReturn.contact">Contact: {{ gifReturn.contact }}</p>
                  <p class="age" v-if="gifReturn.age">Age: {{ gifReturn.age }} years</p>
                </div>
              </div>
              <div class="gif-return-actions">
                <button 
                  @click="approveGIFReturn(gifReturn.id)" 
                  class="btn btn-success"
                  :disabled="approvingGIFReturns.includes(gifReturn.id)"
                >
                  <span v-if="approvingGIFReturns.includes(gifReturn.id)" class="loader"></span>
                  {{ approvingGIFReturns.includes(gifReturn.id) ? 'Approving...' : 'Approve' }}
                </button>
                <button 
                  @click="editGIFReturn(gifReturn)" 
                  class="btn btn-secondary"
                  :disabled="approvingGIFReturns.includes(gifReturn.id)"
                >
                  Edit
                </button>
              </div>
            </div>
            
            <div class="gif-return-details">
              <div class="detail-row">
                <span class="label">GIF Return ID:</span>
                <span class="value">{{ gifReturn.id }}</span>
              </div>
              <div class="detail-row">
                <span class="label">Description:</span>
                <span class="value">{{ gifReturn.description }}</span>
              </div>
              <div class="detail-row">
                <span class="label">Status:</span>
                <span class="value">{{ gifReturn.status }}</span>
              </div>
              <div class="detail-row">
                <span class="label">Request Date:</span>
                <span class="value">{{ formatDate(gifReturn.createdAt) }}</span>
              </div>
            </div>
          </div>
          </div>
        </div>

        <!-- No Returns Message -->
        <div v-if="pendingPayments.length === 0 && pendingGIFReturns.length === 0" class="no-returns">
          <p>No pending returns found.</p>
        </div>
      </div>
    </div>

    <!-- Edit Loan Modal -->
    <div v-if="showEditModal" class="modal-overlay" @click="closeEditModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Edit Loan Request</h3>
          <button @click="closeEditModal" class="close-btn">&times;</button>
        </div>
        <form @submit.prevent="saveLoanEdit" class="edit-form">
          <div class="form-group">
            <label>Loan ID:</label>
            <input 
              type="text" 
              v-model="editingLoan.loanId" 
              class="form-control"
              readonly
            />
            <small class="form-help">Loan ID is auto-generated and cannot be changed</small>
          </div>
          <div class="form-group">
            <label>Loan Type:</label>
            <select v-model="editingLoan.loanType" class="form-control">
              <option value="RF">RF Loan</option>
              <option value="GRANT">Grant</option>
            </select>
          </div>
          <div class="form-group">
            <label>Amount:</label>
            <input 
              type="number" 
              v-model="editingLoan.amount" 
              class="form-control"
              min="0"
            />
          </div>
          <div class="form-group">
            <label>Purpose:</label>
            <textarea 
              v-model="editingLoan.purpose" 
              class="form-control"
              rows="3"
            ></textarea>
          </div>
          <div class="form-group">
            <label>Source:</label>
            <select v-model="editingLoan.source" class="form-control">
              <option value="">Select Source</option>
              <option v-for="source in availableSources" :key="source" :value="source">
                {{ source }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>Request Date:</label>
            <input 
              type="date" 
              v-model="editingLoan.requestDate" 
              class="form-control"
            />
          </div>
          <div class="form-actions">
            <button 
              type="submit" 
              class="btn btn-primary"
              :disabled="savingLoan"
            >
              <span v-if="savingLoan" class="loader"></span>
              {{ savingLoan ? 'Saving...' : 'Save Changes' }}
            </button>
            <button type="button" @click="closeEditModal" class="btn btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Payment Modal -->
    <div v-if="showEditPaymentModal" class="modal-overlay" @click="closeEditPaymentModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Edit Payment Request</h3>
          <button @click="closeEditPaymentModal" class="close-btn">&times;</button>
        </div>
        <form @submit.prevent="savePaymentEdit" class="edit-form">
          <div class="form-group">
            <label>Payment ID:</label>
            <input 
              type="text" 
              v-model="editingPayment.id" 
              class="form-control"
              readonly
            />
            <small class="form-help">Payment ID cannot be changed</small>
          </div>
          <div class="form-group">
            <label>Reg ID:</label>
            <input 
              type="text" 
              v-model="editingPayment.regId" 
              class="form-control"
              readonly
            />
          </div>
          <div class="form-group">
            <label>Paid Amount: <span style="color: red;">*</span></label>
            <input 
              type="number" 
              v-model="editingPayment.paidAmount" 
              class="form-control"
              min="0"
              step="0.01"
              required
            />
            <small class="form-help">Must be greater than 0 and less than or equal to total balance</small>
          </div>
          <div class="form-group">
            <label>Source/Receiver:</label>
            <select v-model="editingPayment.receiver" class="form-control">
              <option value="">Select Source</option>
              <option v-for="source in availableSources" :key="source" :value="source">
                {{ source }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>Date:</label>
            <input 
              type="date" 
              v-model="editingPayment.date" 
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label>Total Balance:</label>
            <input 
              type="number" 
              v-model="editingPayment.totalBalance" 
              class="form-control"
              readonly
            />
            <small class="form-help">Total balance is read-only</small>
          </div>

          <div class="form-actions">
            <button 
              type="submit" 
              class="btn btn-primary"
              :disabled="savingPayment"
            >
              <span v-if="savingPayment" class="loader"></span>
              {{ savingPayment ? 'Saving...' : 'Save Changes' }}
            </button>
            <button type="button" @click="closeEditPaymentModal" class="btn btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>
    </div>

    <!-- Edit GIF Return Modal -->
    <div v-if="showEditGIFReturnModal" class="modal-overlay" @click="closeEditGIFReturnModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Edit GIF Return Request</h3>
          <button @click="closeEditGIFReturnModal" class="close-btn">&times;</button>
        </div>
        <form @submit.prevent="saveGIFReturnEdit" class="edit-form">
          <div class="form-group">
            <label>GIF Return ID:</label>
            <input 
              type="text" 
              v-model="editingGIFReturn.id" 
              class="form-control"
              readonly
            />
            <small class="form-help">GIF Return ID cannot be changed</small>
          </div>
          <div class="form-group">
            <label>Reg ID:</label>
            <input 
              type="text" 
              v-model="editingGIFReturn.regId" 
              class="form-control"
              readonly
            />
          </div>
          <div class="form-group">
            <label>Description: <span style="color: red;">*</span></label>
            <textarea 
              v-model="editingGIFReturn.description" 
              class="form-control"
              rows="4"
              required
            ></textarea>
            <small class="form-help">Describe the GIF return details</small>
          </div>
          <div class="form-group">
            <label>Date:</label>
            <input 
              type="date" 
              v-model="editingGIFReturn.date" 
              class="form-control"
            />
          </div>

          <div class="form-actions">
            <button 
              type="submit" 
              class="btn btn-primary"
              :disabled="savingGIFReturn"
            >
              <span v-if="savingGIFReturn" class="loader"></span>
              {{ savingGIFReturn ? 'Saving...' : 'Save Changes' }}
            </button>
            <button type="button" @click="closeEditGIFReturnModal" class="btn btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Bank Account Management Modal -->
    <div v-if="showBankAccountModal" class="modal-overlay" @click="closeBankAccountModal">
      <div class="modal-content bank-account-modal" @click.stop>
        <div class="modal-header">
          <h3>Bank Account Management</h3>
          <button @click="closeBankAccountModal" class="close-btn">&times;</button>
        </div>
        
        <div class="bank-account-content">
          <!-- wereSL Account Balance Update -->
          <div class="section">
            <h4>Update Budget Balance</h4>
            <div class="wereSL-balance-form">
              <div class="balance-edit-container">
                <div v-if="!editingWereSL" class="balance-display" @click="startEditWereSL">
                  <span class="balance-amount">Rs. {{ formatAmountWithCommas(wereSLBalance) }}</span>
                  <span class="edit-tag">edit</span>
                </div>
                <div v-else class="balance-edit-form">
                  <input
                    v-model="newWereSLBalance"
                    type="number"
                    class="form-control"
                    min="0"
                    step="0.01"
                    placeholder="Enter new balance"
                    @keyup.enter="updateWereSLBalance"
                  />
                  <button @click="updateWereSLBalance" class="btn btn-primary" :disabled="updatingWereSL">
                    <span v-if="updatingWereSL" class="loader"></span>
                    {{ updatingWereSL ? 'Saving...' : 'Save' }}
                  </button>
                  <button @click="cancelEditWereSL" class="btn btn-secondary">Cancel</button>
                </div>
                <div v-if="editingWereSL" class="balance-change">
                  {{ formatAmountWithCommas(wereSLBalance) }} → {{ formatAmountWithCommas(newWereSLBalance) }}
                </div>
              </div>
            </div>
          </div>

          <!-- Money Transfer Section -->
          <div class="section">
            <h4>Transfer Money</h4>
            <div class="transfer-form">
              <select v-model="transferFromAccount" class="form-control" @change="updateTransferValidation">
                <option value="">Source</option>
                <option v-for="account in bankAccounts" :key="account.name" :value="account.name">
                  {{ account.name }}
                </option>
              </select>
              <select v-model="transferToAccount" class="form-control" @change="updateTransferValidation">
                <option value="">Destination</option>
                <option v-for="account in bankAccounts" :key="account.name" :value="account.name">
                  {{ account.name }}
                </option>
              </select>
              <input
                type="number"
                v-model="transferAmount"
                class="form-control"
                min="0"
                step="0.01"
                placeholder="Amount"
                @input="updateTransferValidation"
              />
              <button
                @click="transferMoney"
                class="btn btn-success"
                :disabled="transferring || !canTransfer"
              >
                <span v-if="transferring" class="loader"></span>
                {{ transferring ? 'Transferring...' : 'Transfer' }}
              </button>
              <small class="form-help" v-if="transferValidationMessage" :class="{ 'error': transferValidationError }">
                {{ transferValidationMessage }}
              </small>
            </div>
          </div>

          <!-- Account Balances Overview -->
          <div class="section">
            <div class="section-header" @click="toggleAccountBalances">
              <h4>Account Balances</h4>
              <div class="expand-icon" :class="{ expanded: showAccountBalances }">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </div>
            </div>
            <div v-if="showAccountBalances" class="section-content">
              <div class="account-balances-grid">
                <div v-for="account in bankAccounts" :key="account.name" class="account-balance-tile">
                  <div class="account-name">{{ getAccountFirstName(account.name) }}</div>
                  <div class="account-balance">Rs. {{ formatAmountInMillions(account.currentBankBalance || 0) }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Transaction History -->
          <div class="section">
            <div class="section-header" @click="toggleTransactionHistory">
              <h4>Transaction History</h4>
              <span class="toggle-icon">{{ showTransactionHistory ? '−' : '+' }}</span>
            </div>
            <div v-if="showTransactionHistory" class="section-content">
              <div class="transaction-filters">
                <select v-model="transactionFilter.account" class="form-control">
                  <option value="">All Accounts</option>
                  <option v-for="account in bankAccounts" :key="account.name" :value="account.name">
                    {{ account.name }}
                  </option>
                </select>
                <select v-model="transactionFilter.type" class="form-control">
                  <option value="">All Types</option>
                  <option value="transfer">Internal</option>
                  <option value="loan_approval">Loan</option>
                  <option value="payment_approval">Payment</option>
                </select>
              </div>
              <div class="transaction-history">
                <div v-for="transaction in filteredTransactions" :key="transaction.id" class="transaction-item">
                  <div class="transaction-simple">
                    <div class="transaction-main">
                      <span class="transaction-type-tag" :class="getTransactionTypeClass(transaction.type)">
                        {{ getTransactionTypeLabel(transaction.type) === 'Internal Transaction' ? 'INT' : (transaction.type === 'loan_approval' ? 'LOAN' : 'PAY') }}
                      </span>
                      <span class="transaction-accounts">
                        {{ getTransactionSender(transaction) }} → {{ getTransactionReceiver(transaction) }}
                      </span>
                      <span class="transaction-amount">Rs. {{ formatAmountWithCommas(transaction.amount) }}</span>
                      <span class="transaction-date">{{ formatDate(transaction.timestamp) }}</span>
                      <span v-if="transaction.loanId" class="transaction-regid">{{ transaction.loanId }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue'
import { adminDbService } from '../services/dbService.js'
import { convertGoogleDriveUrl } from '../utils/driveUtils.js'
import { RF_RETURN_RECORD_FIELD, GIF_RETURN_RECORD_FIELD, ProfileField, RootCollection } from '../enums/db.js'
import { updateMainTabRow } from '../utils/gasUtils.js'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/index.js'

export default {
  name: 'AdminDashboard',
  setup() {
    const pendingLoans = ref([])
    const pendingPayments = ref([])
    const pendingGIFReturns = ref([])
    const showEditModal = ref(false)
    const showEditPaymentModal = ref(false)
    const showEditGIFReturnModal = ref(false)
    const editingLoan = ref({})
    const editingPayment = ref({})
    const editingGIFReturn = ref({})
    const loading = ref(false)
    const initialLoading = ref(true)
    const activeTab = ref('loans')
    const approvingLoans = ref([])
    const approvingPayments = ref([])
    const approvingGIFReturns = ref([])
    const successMessage = ref('')
    const savingLoan = ref(false)
    const savingPayment = ref(false)
    const savingGIFReturn = ref(false)
    const availableSources = ref([])

    // Sheets Update
    const isUpdatingSheets = ref(false)
    const sheetsProgress = ref({
      current: 0,
      total: 0,
      status: 'Ready'
    })

    // Bank Account Management
    const showBankAccountModal = ref(false)
    const bankAccounts = ref([])
    const wereSLBalance = ref(0)
    const editingWereSL = ref(false)
    const newWereSLBalance = ref('')
    const updatingWereSL = ref(false)
    const transferFromAccount = ref('')
    const transferToAccount = ref('')
    const transferAmount = ref('')
    const transferring = ref(false)
    const transferValidationMessage = ref('')
    const transferValidationError = ref(false)
    const canTransfer = ref(false)

    // Expandable sections
    const showAccountBalances = ref(false)
    const showTransactionHistory = ref(false)
    
    // Transaction history
    const transactionHistory = ref([])
    const loadingTransactions = ref(false)
    
    // Transaction filters
    const transactionFilter = ref({
      account: '',
      type: ''
    })

    const pendingLoanCount = computed(() => pendingLoans.value.length)
    const pendingPaymentCount = computed(() => pendingPayments.value.length)
    const pendingGIFReturnCount = computed(() => pendingGIFReturns.value.length)

    // Bank Account Computed Properties
    const totalBankBalance = computed(() => {
      return bankAccounts.value.reduce((sum, account) => sum + (account.currentBankBalance || 0), 0)
    })

    // Load pending loans from SearchElements/pending-loan
    const loadPendingLoans = async () => {
      try {
        console.log('🔄 Loading pending loans...')
        loading.value = true
        pendingLoans.value = await adminDbService.getPendingLoans()
        console.log('✅ Loaded pending loans:', pendingLoans.value.length)
      } catch (error) {
        console.error('❌ Error loading pending loans:', error)
      } finally {
        loading.value = false
      }
    }

    // Load pending payments
    const loadPendingPayments = async () => {
      try {
        console.log('🔄 Loading pending payments...')
        pendingPayments.value = await adminDbService.getPendingPayments()
        console.log('✅ Loaded pending payments:', pendingPayments.value.length)
      } catch (error) {
        console.error('❌ Error loading pending payments:', error)
      }
    }

    // Load pending GIF returns
    const loadPendingGIFReturns = async () => {
      try {
        console.log('🔄 Loading pending GIF returns...')
        pendingGIFReturns.value = await adminDbService.getPendingGIFReturns()
        console.log('✅ Loaded pending GIF returns:', pendingGIFReturns.value.length)
      } catch (error) {
        console.error('❌ Error loading pending GIF returns:', error)
      }
    }

    // Load available sources
    const loadAvailableSources = async () => {
      try {
        console.log('🔄 Loading available sources...')
        availableSources.value = await adminDbService.getAvailableSources()
        console.log('✅ Loaded sources:', availableSources.value)
      } catch (error) {
        console.error('❌ Error loading sources:', error)
      }
    }

    // Sheets Update Functions
    const startGoogleSheetsUpdate = async () => {
      if (isUpdatingSheets.value) {
        showSuccessMessage('Sheets update already in progress', 'warning')
        return
      }

      try {
        isUpdatingSheets.value = true
        sheetsProgress.value = {
          current: 0,
          total: 0,
          status: '🔄 Loading profiles...'
        }

        console.log('🔄 Starting Sheets update...')
        
        // Get all profiles
        const profilesResult = await adminDbService.getAllProfiles()
        if (!profilesResult.success) {
          throw new Error('Failed to load profiles')
        }

        const profiles = profilesResult.data
        if (!profiles || profiles.length === 0) {
          showSuccessMessage('No profiles found to update', 'warning')
          return
        }

        sheetsProgress.value.total = profiles.length
        sheetsProgress.value.status = `📊 Found ${profiles.length} profiles to update...`

        let totalCompleted = 0
        let totalFailed = 0
        const batchSize = 5 // Process 5 profiles at a time
        const totalBatches = Math.ceil(profiles.length / batchSize)

        for (let batchNumber = 1; batchNumber <= totalBatches; batchNumber++) {
          const startIndex = (batchNumber - 1) * batchSize
          const endIndex = Math.min(startIndex + batchSize, profiles.length)
          const batch = profiles.slice(startIndex, endIndex)

          sheetsProgress.value.status = `⚡ Processing batch ${batchNumber}/${totalBatches} (${totalCompleted + totalFailed}/${profiles.length} completed)...`

          // Process batch in parallel
          const batchPromises = batch.map(async (profile, index) => {
            const currentIndex = startIndex + index + 1
            const profileId = profile[ProfileField.REG_ID] || profile.regId || profile.id

            sheetsProgress.value.status = `📝 Processing ${profileId} (${currentIndex}/${profiles.length})...`

            try {
              // Update Sheets using the existing updateMainTabRow function
              await updateMainTabRow(profile)
              totalCompleted++
              console.log(`✅ Updated Sheets for profile ${profileId}`)
            } catch (error) {
              totalFailed++
              console.error(`❌ Failed to update Sheets for profile ${profileId}:`, error)
            }
          })

          await Promise.all(batchPromises)
        }

        // Update final status
        sheetsProgress.value.current = totalCompleted
        sheetsProgress.value.status = `✅ Completed ${totalCompleted}/${profiles.length} profiles (${totalFailed} failed)`

        // Show final result
        if (totalFailed === 0) {
          sheetsProgress.value.status = `🎉 Successfully updated ${totalCompleted} profiles!`
          showSuccessMessage(`✅ Successfully updated Sheets with ${totalCompleted} profiles!`)
        } else {
          sheetsProgress.value.status = `⚠️ Updated ${totalCompleted} profiles, ${totalFailed} failed`
          showSuccessMessage(`⚠️ Updated ${totalCompleted} profiles, ${totalFailed} failed. Check console for details.`, 'warning')
        }

        console.log(`🎉 Sheets update completed: ${totalCompleted}/${profiles.length} profiles updated`)

      } catch (error) {
        console.error('❌ Error during Sheets update:', error)
        sheetsProgress.value.status = `❌ Update failed: ${error.message}`
        showSuccessMessage(`❌ Sheets update failed: ${error.message}`, 'error')
      } finally {
        isUpdatingSheets.value = false
        sheetsProgress.value.status = 'Ready'
      }
    }

    // Bank Account Management Methods
    
    // Load bank accounts
    const loadBankAccounts = async () => {
      try {
        console.log('🔄 Loading bank accounts...')
        bankAccounts.value = await adminDbService.getAllBankAccounts()
        console.log('✅ Loaded bank accounts:', bankAccounts.value.length)
        
        // Find wereSL account and set its balance
        const wereSLAccount = bankAccounts.value.find(account => account.name === 'wereSL')
        if (wereSLAccount) {
          wereSLBalance.value = wereSLAccount.currentBankBalance || 0
          console.log('💰 wereSL balance:', wereSLBalance.value)
        }
      } catch (error) {
        console.error('❌ Error loading bank accounts:', error)
      }
    }

    // Update wereSL balance
    const updateWereSLBalance = async () => {
      try {
        const newBalance = parseFloat(newWereSLBalance.value)
        if (isNaN(newBalance) || newBalance < 0) {
          showSuccessMessage('Please enter a valid positive amount', 'error')
          return
        }

        updatingWereSL.value = true
        console.log('🔄 Updating wereSL balance to:', newBalance)
        
        await adminDbService.updateBankBalance('wereSL', newBalance)
        
        // Update local state
        wereSLBalance.value = newBalance
        newWereSLBalance.value = ''
        
        // Refresh bank accounts
        await loadBankAccounts()
        
        // Refresh transaction history if it's currently shown
        if (showTransactionHistory.value) {
          await loadTransactionHistory()
        }
        
        showSuccessMessage('wereSL balance updated successfully!')
        console.log('✅ wereSL balance updated')
      } catch (error) {
        console.error('❌ Error updating wereSL balance:', error)
        showSuccessMessage('Error updating wereSL balance. Please try again.', 'error')
      } finally {
        updatingWereSL.value = false
      }
    }

    // Update transfer validation
    const updateTransferValidation = () => {
      const fromAccount = transferFromAccount.value
      const toAccount = transferToAccount.value
      const amount = parseFloat(transferAmount.value)
      
      // Reset validation
      transferValidationMessage.value = ''
      transferValidationError.value = false
      canTransfer.value = false
      
      // Check if all fields are filled
      if (!fromAccount || !toAccount || !amount) {
        return
      }
      
      // Check if same account
      if (fromAccount === toAccount) {
        transferValidationMessage.value = 'Cannot transfer to the same account'
        transferValidationError.value = true
        return
      }
      
      // Check if amount is valid
      if (isNaN(amount) || amount <= 0) {
        transferValidationMessage.value = 'Amount must be a positive number'
        transferValidationError.value = true
        return
      }
      
      // Check if source account has sufficient balance
      const sourceAccount = bankAccounts.value.find(account => account.name === fromAccount)
      if (!sourceAccount) {
        transferValidationMessage.value = 'Source account not found'
        transferValidationError.value = true
        return
      }
      
      const sourceBalance = sourceAccount.currentBankBalance || 0
      if (sourceBalance < amount) {
        transferValidationMessage.value = `Insufficient balance. Available: Rs. ${sourceBalance.toLocaleString()}, Required: Rs. ${amount.toLocaleString()}`
        transferValidationError.value = true
        return
      }
      
      // All validations passed
      transferValidationMessage.value = `Transfer Rs. ${amount.toLocaleString()} from ${fromAccount} to ${toAccount}`
      canTransfer.value = true
    }

    // Transfer money between accounts
    const transferMoney = async () => {
      try {
        const fromAccount = transferFromAccount.value
        const toAccount = transferToAccount.value
        const amount = parseFloat(transferAmount.value)
        
        if (!canTransfer.value) {
          showSuccessMessage('Please fix validation errors before transferring', 'error')
          return
        }

        transferring.value = true
        console.log('🔄 Transferring money:', amount, 'from', fromAccount, 'to', toAccount)
        
        const result = await adminDbService.transferMoneyBetweenAccounts(fromAccount, toAccount, amount)
        
        // Reset form
        transferFromAccount.value = ''
        transferToAccount.value = ''
        transferAmount.value = ''
        transferValidationMessage.value = ''
        canTransfer.value = false
        
        // Refresh bank accounts
        await loadBankAccounts()
        
        // Refresh transaction history if it's currently shown
        if (showTransactionHistory.value) {
          await loadTransactionHistory()
        }
        
        showSuccessMessage(`Successfully transferred Rs. ${amount.toLocaleString()} from ${fromAccount} to ${toAccount}`)
        console.log('✅ Money transferred successfully')
      } catch (error) {
        console.error('❌ Error transferring money:', error)
        showSuccessMessage(error.message || 'Error transferring money. Please try again.', 'error')
      } finally {
        transferring.value = false
      }
    }

    // Close bank account modal
    const closeBankAccountModal = () => {
      console.log('🔄 Closing bank account modal')
      showBankAccountModal.value = false
      // Reset form values
      newWereSLBalance.value = ''
      transferFromAccount.value = ''
      transferToAccount.value = ''
      transferAmount.value = ''
      transferValidationMessage.value = ''
      canTransfer.value = false
      // Reset expandable sections
      showAccountBalances.value = false
      showTransactionHistory.value = false
    }

    // Load transaction history
    const loadTransactionHistory = async () => {
      try {
        loadingTransactions.value = true
        console.log('🔄 Loading transaction history...')
        transactionHistory.value = await adminDbService.getWereSLTransactionHistory()
        console.log('✅ Loaded transaction history:', transactionHistory.value.length, 'transactions')
      } catch (error) {
        console.error('❌ Error loading transaction history:', error)
        transactionHistory.value = []
      } finally {
        loadingTransactions.value = false
      }
    }

    // Toggle account balances section
    const toggleAccountBalances = () => {
      showAccountBalances.value = !showAccountBalances.value
    }

    // Toggle transaction history section
    const toggleTransactionHistory = async () => {
      showTransactionHistory.value = !showTransactionHistory.value
      if (showTransactionHistory.value && transactionHistory.value.length === 0) {
        await loadTransactionHistory()
      }
    }

    // Approve loan (removed Sheets integration)
    const approveLoan = async (regId, loanId) => {
      try {
        const uniqueId = `${regId}_${loanId}`
        console.log('🔄 Approving loan for RegID:', regId, 'LoanID:', loanId)
        approvingLoans.value.push(uniqueId)
        
        const loan = pendingLoans.value.find(l => l.regId === regId && l.loanId === loanId)
        console.log('🔍 DEBUG: Found loan object:', loan)
        if (loan) {
          await adminDbService.approveLoan(regId, loan.loanType, loan.loanId)
          
          await loadPendingLoans()
          
          // Refresh bank accounts and transaction history if shown
          await loadBankAccounts()
          if (showTransactionHistory.value) {
            await loadTransactionHistory()
          }
          
          showSuccessMessage('Loan approved successfully!')
          console.log('✅ Loan approved for RegID:', regId, 'LoanID:', loanId)
        }
      } catch (error) {
        console.error('❌ Error approving loan:', error)
        // Show specific error message for insufficient balance
        if (error.message && error.message.includes('Insufficient balance')) {
          showSuccessMessage(error.message, 'error')
        } else {
          showSuccessMessage('Error approving loan. Please try again.', 'error')
        }
      } finally {
        const uniqueId = `${regId}_${loanId}`
        approvingLoans.value = approvingLoans.value.filter(id => id !== uniqueId)
      }
    }

    // Edit loan
    const editLoan = (loan) => {
      console.log('🔄 Opening edit modal for loan:', loan)
      
      editingLoan.value = { 
        ...loan,
        requestDate: loan.createdAt ? new Date(loan.createdAt.toDate()).toISOString().split('T')[0] : ''
      }
      showEditModal.value = true
    }

    // Save loan edit
    const saveLoanEdit = async () => {
      const currentRegId = editingLoan.value.regId // Store regId at the beginning
      console.log('🔄 Saving loan edit for regId:', currentRegId)
      
      try {
        savingLoan.value = true
        
        const loan = editingLoan.value
        await adminDbService.updateLoan(loan.regId, loan.loanType, loan.loanId, {
          amount: parseFloat(loan.amount),
          purpose: loan.purpose,
          source: loan.source
        })
        
        closeEditModal()
        await loadPendingLoans()
        showSuccessMessage('Loan updated successfully!')
        console.log('✅ Loan updated successfully')
        
        // Small delay to ensure UI updates properly
        setTimeout(() => {
          console.log('🔄 UI state updated after edit')
        }, 100)
        
      } catch (error) {
        console.error('❌ Error updating loan:', error)
        showSuccessMessage('Error updating loan. Please try again.', 'error')
      } finally {
        savingLoan.value = false
      }
    }

    // Approve payment (removed Sheets integration)
    const approvePayment = async (paymentId) => {
      try {
        console.log('🔄 Approving payment:', paymentId)
        approvingPayments.value.push(paymentId)
        
        await adminDbService.approvePayment(paymentId)
        
        await loadPendingPayments()
        
        // Refresh bank accounts and transaction history if shown
        await loadBankAccounts()
        if (showTransactionHistory.value) {
          await loadTransactionHistory()
        }
        
        showSuccessMessage('Payment approved successfully!')
        console.log('✅ Payment approved:', paymentId)
      } catch (error) {
        console.error('❌ Error approving payment:', error)
        showSuccessMessage('Error approving payment. Please try again.', 'error')
      } finally {
        approvingPayments.value = approvingPayments.value.filter(id => id !== paymentId)
      }
    }

    // Edit payment
    const editPayment = (payment) => {
      console.log('🔄 Opening edit payment modal for:', payment)
      
      // Prepare the payment data for editing
      editingPayment.value = { 
        ...payment,
        paidAmount: payment.paidAmount || payment.amount || 0,
        date: payment.timestamp ? new Date(payment.timestamp.toDate()).toISOString().split('T')[0] : ''
      }
      
      showEditPaymentModal.value = true
    }

    // Save payment edit
    const savePaymentEdit = async () => {
      try {
        // Validation
        const paidAmount = parseFloat(editingPayment.value.paidAmount)
        const totalBalance = parseFloat(editingPayment.value.totalBalance)
        
        // Check if paid amount is empty or invalid
        if (!paidAmount || paidAmount <= 0) {
          showSuccessMessage('Paid amount must be greater than 0', 'error')
          return
        }
        
        // Check if paid amount is greater than total balance
        if (paidAmount > totalBalance) {
          showSuccessMessage('Paid amount cannot be greater than total balance', 'error')
          return
        }
        
        savingPayment.value = true
        console.log('🔄 Saving payment edit:', editingPayment.value)
        
        const updateData = {
          [RF_RETURN_RECORD_FIELD.PAID_AMOUNT]: paidAmount,
          [RF_RETURN_RECORD_FIELD.RECEIVER]: editingPayment.value.receiver
        }
        
        // Add date if it was changed
        if (editingPayment.value.date) {
          updateData[RF_RETURN_RECORD_FIELD.TIMESTAMP] = new Date(editingPayment.value.date)
        }
        
        await adminDbService.updatePayment(editingPayment.value.id, updateData)
        
        closeEditPaymentModal()
        await loadPendingPayments()
        showSuccessMessage('Payment updated successfully!')
        console.log('✅ Payment updated successfully')
        
      } catch (error) {
        console.error('❌ Error updating payment:', error)
        showSuccessMessage('Error updating payment. Please try again.', 'error')
      } finally {
        savingPayment.value = false
      }
    }

    // Close edit payment modal
    const closeEditPaymentModal = () => {
      console.log('🔄 Closing edit payment modal')
      showEditPaymentModal.value = false
      editingPayment.value = {}
    }

    // Approve GIF return
    const approveGIFReturn = async (gifReturnId) => {
      try {
        console.log('🔄 Approving GIF return:', gifReturnId)
        approvingGIFReturns.value.push(gifReturnId)
        
        await adminDbService.approveGIFReturn(gifReturnId)
        await loadPendingGIFReturns()
        showSuccessMessage('GIF return approved successfully!')
        console.log('✅ GIF return approved:', gifReturnId)
      } catch (error) {
        console.error('❌ Error approving GIF return:', error)
        showSuccessMessage('Error approving GIF return. Please try again.', 'error')
      } finally {
        approvingGIFReturns.value = approvingGIFReturns.value.filter(id => id !== gifReturnId)
      }
    }

    // Edit GIF return
    const editGIFReturn = (gifReturn) => {
      console.log('🔄 Opening edit GIF return modal for:', gifReturn)
      
      // Prepare the GIF return data for editing
      editingGIFReturn.value = { 
        ...gifReturn,
        date: gifReturn.createdAt ? new Date(gifReturn.createdAt.toDate()).toISOString().split('T')[0] : ''
      }
      
      showEditGIFReturnModal.value = true
    }

    // Save GIF return edit
    const saveGIFReturnEdit = async () => {
      try {
        savingGIFReturn.value = true
        console.log('🔄 Saving GIF return edit:', editingGIFReturn.value)
        
        const updateData = {
          [GIF_RETURN_RECORD_FIELD.DESCRIPTION]: editingGIFReturn.value.description
        }
        
        // Add date if it was changed
        if (editingGIFReturn.value.date) {
          updateData[GIF_RETURN_RECORD_FIELD.TIMESTAMP] = new Date(editingGIFReturn.value.date)
        }
        
        await adminDbService.updateGIFReturn(editingGIFReturn.value.id, updateData)
        
        closeEditGIFReturnModal()
        await loadPendingGIFReturns()
        showSuccessMessage('GIF return updated successfully!')
        console.log('✅ GIF return updated successfully')
        
      } catch (error) {
        console.error('❌ Error updating GIF return:', error)
        showSuccessMessage('Error updating GIF return. Please try again.', 'error')
      } finally {
        savingGIFReturn.value = false
      }
    }

    // Close edit GIF return modal
    const closeEditGIFReturnModal = () => {
      console.log('🔄 Closing edit GIF return modal')
      showEditGIFReturnModal.value = false
      editingGIFReturn.value = {}
    }

    // Show success message
    const showSuccessMessage = (message, type = 'success') => {
      successMessage.value = message
      setTimeout(() => {
        successMessage.value = ''
      }, 5000)
    }

    // Clear success message
    const clearSuccessMessage = () => {
      successMessage.value = ''
    }

    // Utility functions
    const formatAmount = (amount) => {
      return new Intl.NumberFormat('en-IN').format(amount)
    }

    const formatAmountInMillions = (amount) => {
      if (amount >= 1000000) {
        return (amount / 1000000).toFixed(1) + 'M'
      } else if (amount >= 1000) {
        return (amount / 1000).toFixed(1) + 'K'
      } else {
        return formatAmount(amount)
      }
    }

    const formatDate = (date) => {
      if (!date) return 'N/A'
      const d = date.toDate ? date.toDate() : new Date(date)
      return d.toLocaleDateString('en-IN')
    }

    const getInitials = (name) => {
      if (!name) return '?'
      return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
    }

    // Use the centralized convertGoogleDriveUrl function
    const handleImageError = (event) => {
      console.log('❌ Image failed to load:', event.target.src)
      console.log('🔄 Attempting to convert Google Drive URL...')
      
      // Try to convert Google Drive URL to direct image URL
      const originalSrc = event.target.src
      if (originalSrc.includes('drive.google.com/file/d/')) {
        const fileId = originalSrc.match(/\/file\/d\/([^\/]+)/)?.[1]
        if (fileId) {
          // Try thumbnail first, then fallback to uc format
          if (!event.target.dataset.retryAttempt || event.target.dataset.retryAttempt === '1') {
            const directUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w400-h400`
            console.log('🔄 Trying thumbnail URL:', directUrl)
            event.target.dataset.retryAttempt = '1'
            event.target.src = directUrl
            return
          } else if (event.target.dataset.retryAttempt === '1') {
            const fallbackUrl = `https://drive.google.com/uc?export=view&id=${fileId}`
            console.log('🔄 Trying fallback URL:', fallbackUrl)
            event.target.dataset.retryAttempt = '2'
            event.target.src = fallbackUrl
            return
          }
        }
      }
      
      // If all attempts fail, hide image and show placeholder
      console.log('❌ All image loading attempts failed, showing placeholder')
      event.target.style.display = 'none'
      const placeholder = event.target.nextElementSibling
      if (placeholder) {
        placeholder.style.display = 'flex'
      }
    }

    const handleImageLoad = (event) => {
      console.log('✅ Image loaded successfully:', event.target.src)
      // Hide placeholder if image loads successfully
      const placeholder = event.target.nextElementSibling
      if (placeholder) {
        placeholder.style.display = 'none'
      }
    }

    const closeEditModal = () => {
      console.log('🔄 Closing edit modal')
      showEditModal.value = false
      editingLoan.value = {}
    }

    onMounted(async () => {
      console.log('🚀 Admin Dashboard mounted')
      try {
        initialLoading.value = true
        console.log('🔄 Starting initial data load...')
        
        // Load all data in parallel
        await Promise.all([
          loadPendingLoans(),
          loadPendingPayments(),
          loadPendingGIFReturns(), // Added loadPendingGIFReturns
          loadAvailableSources(),
          loadBankAccounts() // Added loadBankAccounts
        ])
        
        console.log('✅ Initial data load completed')
      } catch (error) {
        console.error('❌ Error during initial load:', error)
      } finally {
        initialLoading.value = false
        console.log('🎉 Admin Dashboard ready')
      }
    })

    const getTransactionTypeLabel = (type) => {
      switch (type) {
        case 'transfer':
          return 'Internal Transaction'
        case 'balance_update':
          return 'Balance Update'
        case 'loan_approval':
          return 'External Transaction'
        case 'payment_approval':
          return 'External Transaction'
        default:
          return type
      }
    }

    const getTransactionTypeClass = (type) => {
      switch (type) {
        case 'transfer':
          return 'transfer-tag'
        case 'loan_approval':
          return 'loan-tag'
        case 'payment_approval':
          return 'payment-tag'
        default:
          return ''
      }
    }

    const getAccountFirstName = (accountName) => {
      return accountName.split(' ')[0] || accountName
    }

    // Get transaction sender
    const getTransactionSender = (transaction) => {
      if (transaction.type === 'transfer') {
        return transaction.fromAccount || '-'
      } else if (transaction.type === 'loan_approval') {
        return 'wereSL'
      } else if (transaction.type === 'payment_approval') {
        return transaction.regId || '-'
      }
      return '-'
    }

    // Get transaction receiver
    const getTransactionReceiver = (transaction) => {
      if (transaction.type === 'transfer') {
        return transaction.toAccount || '-'
      } else if (transaction.type === 'loan_approval') {
        return transaction.regId || '-'
      } else if (transaction.type === 'payment_approval') {
        return 'wereSL'
      }
      return '-'
    }

    // Start editing wereSL balance
    const startEditWereSL = () => {
      editingWereSL.value = true
      newWereSLBalance.value = wereSLBalance.value.toString()
    }

    // Cancel editing wereSL balance
    const cancelEditWereSL = () => {
      editingWereSL.value = false
      newWereSLBalance.value = ''
    }

    // Format amount with commas (1,900,000)
    const formatAmountWithCommas = (amount) => {
      if (!amount || isNaN(amount)) return '0'
      return parseFloat(amount).toLocaleString('en-IN')
    }

    return {
      pendingLoans,
      pendingPayments,
      pendingLoanCount,
      pendingPaymentCount,
      pendingGIFReturnCount,
      pendingGIFReturns, // Added pendingGIFReturns to return
      showEditModal,
      showEditPaymentModal,
      showEditGIFReturnModal, // Added showEditGIFReturnModal to return
      editingLoan,
      editingPayment,
      editingGIFReturn, // Added editingGIFReturn to return
      loading,
      initialLoading,
      activeTab,
      approvingLoans,
      approvingPayments,
      approvingGIFReturns, // Added approvingGIFReturns to return
      successMessage,
      savingLoan,
      savingPayment,
      savingGIFReturn, // Added savingGIFReturn to return
      availableSources,
      approveLoan,
      editLoan,
      saveLoanEdit,
      approvePayment,
      editPayment,
      savePaymentEdit,
      closeEditPaymentModal,
      showSuccessMessage,
      clearSuccessMessage,
      formatAmount,
      formatAmountInMillions,
      formatDate,
      getInitials,
      convertGoogleDriveUrl,
      handleImageError,
      handleImageLoad,
      closeEditModal,
      approveGIFReturn, // Added approveGIFReturn to return
      editGIFReturn, // Added editGIFReturn to return
      saveGIFReturnEdit, // Added saveGIFReturnEdit to return
      closeEditGIFReturnModal, // Added closeEditGIFReturnModal to return
      showBankAccountModal, // Added showBankAccountModal to return
      bankAccounts, // Added bankAccounts to return
      wereSLBalance, // Added wereSLBalance to return
      editingWereSL, // Added editingWereSL to return
      newWereSLBalance, // Added newWereSLBalance to return
      updatingWereSL, // Added updatingWereSL to return
      transferFromAccount, // Added transferFromAccount to return
      transferToAccount, // Added transferToAccount to return
      transferAmount, // Added transferAmount to return
      transferring, // Added transferring to return
      transferValidationMessage, // Added transferValidationMessage to return
      transferValidationError, // Added transferValidationError to return
      canTransfer, // Added canTransfer to return
      updateTransferValidation, // Added updateTransferValidation to return
      updateWereSLBalance, // Added updateWereSLBalance to return
      transferMoney, // Added transferMoney to return
      closeBankAccountModal, // Added closeBankAccountModal to return
      totalBankBalance, // Added totalBankBalance to return
      showAccountBalances, // Added showAccountBalances to return
      showTransactionHistory, // Added showTransactionHistory to return
      transactionHistory, // Added transactionHistory to return
      loadingTransactions, // Added loadingTransactions to return
      loadTransactionHistory, // Added loadTransactionHistory to return
      toggleAccountBalances, // Added toggleAccountBalances to return
      toggleTransactionHistory, // Added toggleTransactionHistory to return
      getTransactionTypeLabel, // Added getTransactionTypeLabel to return
      getAccountFirstName, // Added getAccountFirstName to return
      getTransactionSender, // Added getTransactionSender to return
      getTransactionReceiver, // Added getTransactionReceiver to return
      getTransactionTypeClass, // Added getTransactionTypeClass to return
      transactionFilter, // Added transactionFilter to return
      filteredTransactions: computed(() => {
        let filtered = transactionHistory.value;
        if (transactionFilter.value.account) {
          filtered = filtered.filter(t => 
            t.fromAccount === transactionFilter.value.account || 
            t.toAccount === transactionFilter.value.account ||
            t.sourceAccount === transactionFilter.value.account ||
            t.receiverAccount === transactionFilter.value.account
          );
        }
        if (transactionFilter.value.type) {
          filtered = filtered.filter(t => t.type === transactionFilter.value.type);
        }
        // Only show transactions with valid sender/receiver and amount > 0
        filtered = filtered.filter(t => {
          const sender = getTransactionSender(t);
          const receiver = getTransactionReceiver(t);
          return sender !== '-' && receiver !== '-' && t.amount && t.amount > 0;
        });
        return filtered;
      }),
      editingWereSL, // Added editingWereSL to return
      startEditWereSL, // Added startEditWereSL to return
      cancelEditWereSL, // Added cancelEditWereSL to return
      formatAmountWithCommas, // Added formatAmountWithCommas to return
      getTransactionSender, // Added getTransactionSender to return
      getTransactionReceiver, // Added getTransactionReceiver to return
      getTransactionTypeClass, // Added getTransactionTypeClass to return
      transactionFilter, // Added transactionFilter to return
      // Sheets Update
      isUpdatingSheets,
      sheetsProgress,
      startGoogleSheetsUpdate
    }
  }
}
</script>

<style scoped>
.admin-dashboard {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  text-align: center;
  margin-bottom: 30px;
}

.dashboard-header h1 {
  color: #1565c0;
  margin-bottom: 10px;
}

/* Success Message */
.success-message {
  background: #d4edda;
  color: #155724;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #c3e6cb;
}

.close-message {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #155724;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.stat-card.active {
  border-color: #1565c0;
  background-color: #e3f2fd;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  50% {
    box-shadow: 0 4px 8px rgba(21, 101, 192, 0.3);
  }
  100% {
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
}

.stat-icon {
  color: #1565c0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
}

.stat-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1565c0;
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
}

.stat-subtitle {
  font-size: 0.8rem;
  color: #666;
  margin-top: 2px;
  font-style: italic;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  animation: fadeInOut 2s ease-in-out infinite;
}

@keyframes fadeInOut {
  0%, 100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}

/* Enhanced stat card for Sheets */
.stat-card.active {
  border-color: #1565c0;
  background-color: #e3f2fd;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  50% {
    box-shadow: 0 4px 8px rgba(21, 101, 192, 0.3);
  }
  100% {
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
}

.stat-subtitle {
  font-size: 0.8rem;
  color: #666;
  margin-top: 2px;
  font-style: italic;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  animation: fadeInOut 2s ease-in-out infinite;
}

@keyframes fadeInOut {
  0%, 100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}

/* Enhanced loading animation for active state */
.stat-card.active .stat-value {
  animation: bounce 1s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px);
  }
}

/* Tab Styles */
.tab-container {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 2px solid #e3f2fd;
}

.tab-button {
  flex: 1;
  padding: 15px 20px;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  color: #666;
  transition: all 0.3s;
}

.tab-button:hover {
  color: #1565c0;
  background-color: #f5f5f5;
}

.tab-button.active {
  color: #1565c0;
  border-bottom-color: #1565c0;
  background-color: #e3f2fd;
}

.tab-content {
  min-height: 400px;
}

.section {
  background: white;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.section h2 {
  color: #1565c0;
  margin-bottom: 20px;
  border-bottom: 2px solid #e3f2fd;
  padding-bottom: 10px;
}

.loan-grid, .payment-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
}

.loan-card, .payment-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  background: #fafafa;
}

.gif-return-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
}

.gif-return-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  background: #fafafa;
}

.loan-header, .payment-header, .gif-return-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
}

.profile-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.profile-picture {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
}

.profile-picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-placeholder {
  width: 100%;
  height: 100%;
  background: #1565c0;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
}

.profile-details h3 {
  margin: 0 0 5px 0;
  color: #333;
}

.reg-id, .district {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
}

.contact, .age {
  margin: 0;
  font-size: 0.8rem;
  color: #555;
}

.loan-actions, .payment-actions, .gif-return-actions {
  display: flex;
  gap: 10px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-success:hover:not(:disabled) {
  background-color: #1e7e34;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #545b62;
}

.btn-primary {
  background-color: #1565c0;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #0d47a1;
}

/* Loader */
.loader {
  width: 16px;
  height: 16px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loan-details, .payment-details, .gif-return-details {
  display: grid;
  gap: 8px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  border-bottom: 1px solid #eee;
}

.detail-row:last-child {
  border-bottom: none;
}

.label {
  font-weight: 500;
  color: #666;
}

.value {
  color: #333;
}

.receipt-link {
  color: #1565c0;
  text-decoration: none;
  font-weight: 500;
}

.receipt-link:hover {
  text-decoration: underline;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 10px;
  padding: 20px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
}

.edit-form {
  display: grid;
  gap: 15px;
}

.form-group {
  display: grid;
  gap: 5px;
}

.form-group label {
  font-weight: 500;
  color: #333;
}

.form-control {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  font-family: inherit;
}

.form-control:focus {
  outline: none;
  border-color: #1565c0;
  box-shadow: 0 0 0 2px rgba(21, 101, 192, 0.2);
}

.form-help {
  color: #666;
  font-size: 0.8rem;
  margin-top: 2px;
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}

/* Loading Screen */
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-content {
  text-align: center;
  color: #333;
  max-width: 400px;
  padding: 40px;
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(21, 101, 192, 0.2);
  border-radius: 50%;
  border-top-color: #1565c0;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

.loading-content h2 {
  margin-bottom: 10px;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1565c0;
}

.loading-content p {
  opacity: 0.7;
  font-size: 1rem;
  color: #666;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .admin-dashboard {
    padding: 10px;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  
  .stat-card {
    padding: 15px;
    text-align: center;
    flex-direction: column;
    gap: 10px;
  }
  
  .stat-value {
    font-size: 1.2rem;
  }
  
  .stat-label {
    font-size: 0.8rem;
  }
  
  .stat-subtitle {
    font-size: 0.7rem;
  }
  
  .tab-container {
    flex-direction: column;
  }
  
  .tab-button {
    text-align: center;
    padding: 12px;
  }
  
  .loan-grid, .payment-grid, .gif-return-grid {
    grid-template-columns: 1fr;
  }
  
  .loan-header, .payment-header, .gif-return-header {
    flex-direction: column;
    gap: 15px;
  }
  
  .loan-actions, .payment-actions, .gif-return-actions {
    width: 100%;
    justify-content: center;
  }
  
  .btn {
    flex: 1;
    justify-content: center;
  }
  
  .modal-content {
    width: 95%;
    margin: 10px;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .form-actions .btn {
    width: 100%;
  }
}

/* Bank Account Management Styles */
.bank-account-modal {
  max-width: 600px;
  max-height: 90vh;
}

.bank-account-content {
  display: grid;
  gap: 20px;
}

.bank-account-content .section {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
  margin: 0;
}

.bank-account-content .section h4 {
  color: #1565c0;
  margin-bottom: 10px;
  border-bottom: 1px solid #e3f2fd;
  padding-bottom: 5px;
}

.wereSL-balance-form {
  display: grid;
  gap: 15px;
}

.balance-edit-container {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: #e3f2fd;
  border-radius: 5px;
  border: 1px solid #bbdefb;
}

.balance-display {
  font-size: 1.2rem;
  font-weight: bold;
  color: #1565c0;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

.edit-tag {
  background-color: #1565c0;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: bold;
  white-space: nowrap;
}

.balance-edit-form {
  display: flex;
  align-items: center;
  gap: 10px;
}

.balance-edit-form input {
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  width: 120px;
}

.balance-edit-form input:focus {
  outline: none;
  border-color: #1565c0;
  box-shadow: 0 0 0 2px rgba(21, 101, 192, 0.2);
}

.balance-change {
  font-size: 0.8rem;
  color: #666;
  margin-top: 5px;
}

.transfer-form {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.transfer-form .form-control {
  flex: 1;
  min-width: 120px;
}

.transfer-form .btn {
  flex-shrink: 0;
}

.transfer-form .form-help {
  width: 100%;
  margin-top: 5px;
}

.form-help.error {
  color: #dc3545;
}

.account-balances-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
}

.account-balance-tile {
  background: white;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.account-balance-tile .account-name {
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
  font-size: 0.9rem;
}

.account-balance-tile .account-balance {
  color: #1565c0;
  font-weight: bold;
  font-size: 0.8rem;
}

.transaction-filters {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.transaction-filters .form-control {
  flex: 1;
  min-width: 120px;
}

.transaction-simple {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.transaction-main {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.transaction-type-tag {
  font-size: 0.7rem;
  font-weight: bold;
  color: white;
  padding: 2px 6px;
  border-radius: 8px;
  text-align: center;
  min-width: 30px;
}

.transfer-tag {
  background-color: #2196f3;
}
.loan-tag {
  background-color: #4caf50;
}
.payment-tag {
  background-color: #f44336;
}

.transaction-accounts {
  font-size: 0.9rem;
  color: #555;
  flex: 1;
}

.transaction-amount {
  font-weight: bold;
  color: #1565c0;
  font-size: 0.9rem;
  min-width: 80px;
  text-align: right;
}

.transaction-date {
  font-size: 0.8rem;
  color: #666;
  min-width: 70px;
  text-align: right;
}

.transaction-regid {
  font-size: 0.7rem;
  color: #666;
  background: #f8f9fa;
  padding: 2px 6px;
  border-radius: 4px;
  min-width: 60px;
  text-align: center;
}

.subsection {
  margin-bottom: 30px;
}

.subsection h3 {
  color: #1565c0;
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.no-returns {
  text-align: center;
  color: #666;
  padding: 30px;
}

.stat-subtitle {
  font-size: 0.8rem;
  color: #666;
  margin-top: 2px;
}

/* Expandable Section Styles */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.section-header h4 {
  margin: 0;
  color: #1565c0;
}

.toggle-icon {
  transition: transform 0.3s ease;
}

.expand-icon {
  transition: transform 0.3s ease;
}

.expand-icon.expanded {
  transform: rotate(180deg);
}

.section-content {
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.loading-transactions {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #666;
  font-size: 0.9rem;
  padding: 15px 0;
}

.no-transactions {
  text-align: center;
  color: #666;
  padding: 15px 0;
}

.transaction-history {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.transaction-item {
  background: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding: 10px;
}

/* Compact dropdown styling */
select.form-control {
  max-height: 200px;
  overflow-y: auto;
}

select.form-control option {
  padding: 4px 8px;
  font-size: 0.85rem;
}

/* Progress Spinner */
.progress-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  position: relative;
}

.spinner-ring {
  width: 100%;
  height: 100%;
  border: 2px solid rgba(21, 101, 192, 0.2);
  border-radius: 50%;
  border-top-color: #1565c0;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style> 