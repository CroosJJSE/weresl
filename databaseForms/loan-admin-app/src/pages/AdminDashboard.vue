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

    <!-- Success/Error Message -->
    <div v-if="successMessage" :class="getMessageClass()">
      <div class="message-content">
        <div class="message-icon">
          <span v-if="messageType === 'success'">✅</span>
          <span v-else-if="messageType === 'error'">❌</span>
          <span v-else-if="messageType === 'warning'">⚠️</span>
          <span v-else>ℹ️</span>
        </div>
        <div class="message-text">{{ successMessage }}</div>
      </div>
      <button @click="clearSuccessMessage" class="close-message">&times;</button>
    </div>



    <!-- Statistics Cards -->
    <div class="stats-grid">
      <div class="stat-card" @click="activeTab = 'loans'" :class="{ active: activeTab === 'loans' }">
        <div class="stat-content">
          <div class="stat-value">{{ pendingLoanCount }}</div>
          <div class="stat-label">Loan</div>
        </div>
      </div>
      <div class="stat-card" @click="activeTab = 'returns'" :class="{ active: activeTab === 'returns' }">
        <div class="stat-content">
          <div class="stat-value">{{ pendingPaymentCount }}</div>
          <div class="stat-label">Payment</div>
        </div>
      </div>
      <div class="stat-card" @click="activeTab = 'coordinator'" :class="{ active: activeTab === 'coordinator' }">
        <div class="stat-content">
          <div class="stat-label">Coordinator</div>
        </div>
      </div>
      <div class="stat-card" @click="navigateToBankAccounts">
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
                  @click="editLoan(loan)" 
                  class="btn btn-primary"
                >
                  Edit & Approve
                </button>
              </div>
            </div>
            
            <!-- Compact loan info -->
            <div class="loan-compact-info">
              <div class="compact-row">
                <span class="compact-label">Amount:</span>
                <span class="compact-value">{{ formatAmount(loan.amount) }}</span>
              </div>
              <div class="compact-row">
                <span class="compact-label">Type:</span>
                <span class="compact-value">{{ loan.loanType }}</span>
              </div>
              <div class="compact-row">
                <span class="compact-label">Date:</span>
                <span class="compact-value">{{ formatDate(loan.createdAt) }}</span>
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
                    @click="editPaymentForApproval(payment)" 
                    class="btn btn-primary"
                    :disabled="approvingPayments.includes(payment.id)"
                  >
                    <span v-if="approvingPayments.includes(payment.id)" class="loader"></span>
                    {{ approvingPayments.includes(payment.id) ? 'Processing...' : 'Edit & Approve' }}
                  </button>
                </div>
              </div>
              
              <!-- Compact payment info -->
              <div class="payment-compact-info">
                <div class="compact-row">
                  <span class="compact-label">Amount:</span>
                  <span class="compact-value">{{ formatAmount(payment.paidAmount) }}</span>
                </div>
                <div class="compact-row">
                  <span class="compact-label">Balance:</span>
                  <span class="compact-value">{{ formatAmount(payment.totalBalance) }}</span>
                </div>
                <div class="compact-row">
                  <span class="compact-label">Date:</span>
                  <span class="compact-value">{{ formatDate(payment.createdAt) }}</span>
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

    <!-- Coordinator Tab -->
    <div v-if="activeTab === 'coordinator'" class="tab-content">
      <div class="section">
        <h2>Coordinator View</h2>
        
        <!-- Bank Account Filter -->
        <div class="coordinator-filters">
          <div class="filter-group">
            <label for="bankAccountFilter">Select Bank Account:</label>
            <select 
              id="bankAccountFilter" 
              v-model="selectedBankAccount" 
              @change="loadCoordinatorData"
              class="form-control"
            >
              <option value="">Select a Bank Account</option>
              <option v-for="account in bankAccounts" :key="account.name" :value="account.name">
                {{ account.name }}
              </option>
            </select>
          </div>
        </div>

        <div v-if="loadingCoordinatorData" class="loading-message">
          <div class="loader"></div>
          <p>Loading coordinator data...</p>
        </div>
        <div v-else-if="!selectedBankAccount" class="no-coordinator-data">
          <p>Please select a bank account to view coordinator data.</p>
        </div>
        <div v-else-if="coordinatorLoans.length === 0" class="no-coordinator-data">
          <p>No RF loans found for the selected coordinator.</p>
        </div>
        <div v-else class="coordinator-list">
          <div v-for="loan in coordinatorLoans" :key="loan.regId" class="coordinator-row">
            <div class="loan-id">{{ loan.regId }}</div>
            <div class="loan-name">{{ loan.name }}</div>
            <div class="current-month-payment" 
                 :class="{ 'paid': getCurrentMonthPayment(loan).paid, 'unpaid': !getCurrentMonthPayment(loan).paid }"
                 @click="showReturnHistory(loan.regId)">
              <span class="month">{{ getCurrentMonthName() }}</span>
              <span class="amount" v-if="getCurrentMonthPayment(loan).paid">
                {{ formatAmount(getCurrentMonthPayment(loan).amount) }}
              </span>
              <span class="status" v-else>Unpaid</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Return History Modal -->
    <div v-if="showReturnHistoryModal" class="modal-overlay" @click="closeReturnHistoryModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>RF Return History</h3>
          <button @click="closeReturnHistoryModal" class="close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <div v-if="loadingReturnHistory" class="loading-message">
            <div class="loader"></div>
            <p>Loading return history...</p>
          </div>
          <div v-else-if="returnHistory.length === 0" class="no-return-history">
            <p>No return history found for this profile.</p>
          </div>
          <div v-else class="return-history-list">
            <div v-for="(returnRecord, index) in returnHistory" :key="index" class="return-record">
              <div class="return-info">
                <div class="return-date">{{ formatDateTime(returnRecord.date) }}</div>
                <div class="return-details">
                  <span class="rrh-id">{{ returnRecord.rrhId }}</span>
                  <span class="receiver">{{ returnRecord.receiver }}</span>
                </div>
              </div>
              <div class="return-amount-section">
                <div class="return-amount">{{ formatAmount(returnRecord.amount) }}</div>
                <div v-if="returnRecord.driveLinkId" class="receipt-link">
                  <a :href="getReceiptUrl(returnRecord.driveLinkId)" target="_blank" class="receipt-link-btn">
                    📄 Receipt
                  </a>
                </div>
              </div>
            </div>
          </div>
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
            <select v-model="editingLoan.loanType" class="form-control" disabled>
              <option value="RF">RF Loan</option>
              <option value="GRANT">Grant</option>
            </select>
            <small class="form-help">Loan type cannot be changed during approval</small>
          </div>
          <div class="form-group">
            <label>Amount: <span class="required">*</span></label>
            <input 
              type="number" 
              v-model="editingLoan.amount" 
              class="form-control"
              :class="{ 'error': !editingLoan.amount || editingLoan.amount <= 0 }"
              min="0"
              required
            />
            <small class="form-help" v-if="!editingLoan.amount || editingLoan.amount <= 0">
              Amount is required and must be greater than 0
            </small>
          </div>
          <div class="form-group">
            <label>Purpose: <span class="required">*</span></label>
            <textarea 
              v-model="editingLoan.purpose" 
              class="form-control"
              :class="{ 'error': !editingLoan.purpose || editingLoan.purpose.trim() === '' }"
              rows="3"
              required
            ></textarea>
            <small class="form-help" v-if="!editingLoan.purpose || editingLoan.purpose.trim() === ''">
              Purpose is required
            </small>
          </div>
          <div class="form-group">
            <label>Source: <span class="required">*</span></label>
            <select v-model="editingLoan.source" class="form-control" :class="{ 'error': !editingLoan.source || editingLoan.source.trim() === '' }" required>
              <option value="">Select Source</option>
              <option v-for="source in availableSources" :key="source" :value="source">
                {{ source }}
              </option>
            </select>
            <small class="form-help" v-if="!editingLoan.source || editingLoan.source.trim() === ''">
              Source is required
            </small>
            <div v-if="editingLoan.source" class="balance-info">
              <small class="balance-text" :class="{ 'insufficient-funds': !hasSufficientFunds }">
                💰 Current balance: Rs. {{ formatAmount(currentSourceBalance) }}
                <span v-if="!hasSufficientFunds" class="warning-text">
                  ⚠️ Insufficient funds for this loan amount
                </span>
              </small>
            </div>
          </div>
          <div class="form-group">
            <label>ARMS (Optional):</label>
            <select v-model="editingLoan.arms" class="form-control">
              <option value="">Select ARMS (Optional)</option>
              <option v-for="(value, key) in armsOptions" :key="key" :value="value">
                {{ value }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>Request Date: <span class="required">*</span></label>
            <input 
              type="date" 
              v-model="editingLoan.requestDate" 
              class="form-control"
              :class="{ 'error': !editingLoan.requestDate }"
              required
            />
            <small class="form-help" v-if="!editingLoan.requestDate">
              Request date is required
            </small>
          </div>
          <div class="form-actions">
            <button 
              type="submit" 
              class="btn btn-success"
              :disabled="savingLoan || !isFormValid"
            >
              <span v-if="savingLoan" class="loader"></span>
              {{ savingLoan ? 'Approving...' : 'Approve Loan' }}
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
        <form class="edit-form">
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
            <label>Target Loan: <span style="color: red;">*</span></label>
            <select v-model="editingPayment.targetLoanId" class="form-control" required>
              <option value="">Select Target Loan</option>
              <option 
                v-for="loan in editingPayment.availableLoans" 
                :key="loan.id" 
                :value="loan.id"
              >
                {{ loan.id }} - Balance: {{ formatAmount(loan.currentBalance) }} 
                ({{ loan.purpose || 'No purpose' }})
              </option>
            </select>
            <small class="form-help">Choose which loan this payment will be applied to</small>
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

          <div class="form-group" v-if="editingPayment.receiptDriveLinkId">
            <label>Receipt:</label>
            <div class="receipt-link-container">
              <a 
                :href="convertGoogleDriveUrl(editingPayment.receiptDriveLinkId)" 
                target="_blank" 
                class="receipt-link-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                </svg>
                View Receipt
              </a>
            </div>
            <small class="form-help">Click to view the payment receipt</small>
          </div>

          <div class="form-actions">
            <button 
              type="button"
              @click="approveEditedPayment" 
              class="btn btn-success"
              :disabled="savingPayment"
            >
              <span v-if="savingPayment" class="loader"></span>
              {{ savingPayment ? 'Processing...' : 'Approve Payment' }}
            </button>
            <button 
              type="button"
              @click="rejectPayment" 
              class="btn btn-danger"
              :disabled="savingPayment"
            >
              <span v-if="savingPayment" class="loader"></span>
              {{ savingPayment ? 'Processing...' : 'Reject Payment' }}
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

    <!-- Loan Selection Modal for Payment Approval -->
    <div v-if="showLoanSelectionModal" class="modal-overlay" @click="closeLoanSelectionModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Select Loan for Payment</h3>
          <button @click="closeLoanSelectionModal" class="close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <div class="loan-selection-info">
            <p><strong>Reg ID:</strong> {{ selectedPaymentForLoan?.regId }}</p>
            <p><strong>Payment Amount:</strong> {{ formatAmount(selectedPaymentForLoan?.paidAmount || 0) }}</p>
            <p><strong>Available Loans:</strong> {{ availableLoansForPayment?.length || 0 }}</p>
          </div>
          
          <div class="loan-selection-form">
            <label for="loanSelect">Choose Loan to Apply Payment:</label>
            <select 
              id="loanSelect" 
              v-model="selectedLoanForPayment" 
              class="form-control"
              @change="onLoanSelectionChange"
            >
              <option value="">Select a loan...</option>
              <option 
                v-for="loan in availableLoansForPayment" 
                :key="loan.id" 
                :value="loan.id"
              >
                {{ loan.id }} - Balance: {{ formatAmount(loan.currentBalance) }} 
                ({{ loan.purpose || 'No purpose' }})
              </option>
            </select>
            
            <div v-if="selectedLoanForPayment" class="loan-details">
              <h4>Selected Loan Details:</h4>
              <div class="loan-info">
                <p><strong>Loan ID:</strong> {{ selectedLoanForPayment }}</p>
                <p><strong>Current Balance:</strong> {{ formatAmount(getSelectedLoanDetails()?.currentBalance || 0) }}</p>
                <p><strong>Purpose:</strong> {{ getSelectedLoanDetails()?.purpose || 'No purpose' }}</p>
                <p><strong>Source:</strong> {{ getSelectedLoanDetails()?.source || 'Unknown' }}</p>
              </div>
            </div>
            
            <div class="modal-actions">
              <button 
                @click="confirmLoanSelection" 
                class="btn btn-primary"
                :disabled="!selectedLoanForPayment || processingLoanSelection"
              >
                <span v-if="processingLoanSelection" class="loader"></span>
                {{ processingLoanSelection ? 'Processing...' : 'Apply Payment to Selected Loan' }}
              </button>
              <button @click="closeLoanSelectionModal" class="btn btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { adminDbService } from '../services/dbService.js'
import { convertGoogleDriveUrl } from '../utils/driveUtils.js'
import { RF_RETURN_RECORD_FIELD, GIF_RETURN_RECORD_FIELD, ProfileField, RootCollection, BANK_ACCOUNT_FIELD } from '../enums/db.js'
import { updateMainTabRow } from '../utils/gasUtils.js'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/index.js'
import { getProfileByRegId } from '../utils/dbUtils.js'

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
    const messageType = ref('success') // 'success', 'error', 'warning', 'info'
    const savingLoan = ref(false)
    const savingPayment = ref(false)
    const savingGIFReturn = ref(false)
    const availableSources = ref([])
    const sourceBalances = ref({}) // Store balances for all sources
    const armsOptions = {
      EDEN: 'EDEN',
      ARK: 'ARK',
      METAMORPHOSIS: 'Metamorphosis',
      KEYSTONE: 'Keystone'
    }

    // Sheets Update
    const isUpdatingSheets = ref(false)
    const sheetsProgress = ref({
      current: 0,
      total: 0,
      status: 'Ready'
    })

    // Bank accounts for coordinator functionality only
    const bankAccounts = ref([])

    const pendingLoanCount = computed(() => pendingLoans.value.length)
    const pendingPaymentCount = computed(() => pendingPayments.value.length)
    const pendingGIFReturnCount = computed(() => pendingGIFReturns.value.length)

    // Load bank accounts for coordinator functionality
    const loadBankAccounts = async () => {
      try {
        const result = await adminDbService.getAllBankAccounts()
        if (result.success) {
          bankAccounts.value = result.data
        } else {
          console.error('Failed to load bank accounts:', result.message)
          bankAccounts.value = []
        }
      } catch (error) {
        console.error('Error loading bank accounts:', error)
        bankAccounts.value = []
      }
    }

    // Load pending loans from SearchElements/pending-loan
    const loadPendingLoans = async () => {
      try {
        loading.value = true
        const result = await adminDbService.getPendingLoans()
        pendingLoans.value = result
      } catch (error) {
        console.error('Error loading pending loans:', error)
        // Handle error silently
      } finally {
        loading.value = false
      }
    }

    // Load pending payments
    const loadPendingPayments = async () => {
      try {
        const result = await adminDbService.getPendingPayments()
        pendingPayments.value = result
      } catch (error) {
        console.error('❌ AdminDashboard: Error loading pending payments:', error)
        // Handle error silently
      }
    }

    // Load pending GIF returns
    const loadPendingGIFReturns = async () => {
      try {
        pendingGIFReturns.value = await adminDbService.getPendingGIFReturns()
      } catch (error) {
        // Handle error silently
      }
    }

    // Load available sources and their balances
    const loadAvailableSources = async () => {
      try {
        availableSources.value = await adminDbService.getAvailableSources()
        
        // Load balances for all sources
        const balancePromises = availableSources.value.map(async (source) => {
          try {
            const balanceResult = await adminDbService.getBankBalanceByName(source)
            if (balanceResult) {
              sourceBalances.value[source] = balanceResult.balance || 0
            } else {
              sourceBalances.value[source] = 0
            }
          } catch (error) {
            console.error(`Error loading balance for ${source}:`, error)
            sourceBalances.value[source] = 0
          }
        })
        
        await Promise.all(balancePromises)
      } catch (error) {
        console.error('Error loading available sources:', error)
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

        // Get all profiles
        const profilesResult = await adminDbService.getAllProfiles()
        if (!profilesResult.success) {
          throw new Error('Failed to load profiles')
        }

        const allProfiles = profilesResult.data
        if (!allProfiles || allProfiles.length === 0) {
          showSuccessMessage('No profiles found to update', 'warning')
          return
        }

        // Filter profiles that need backup
        const profilesNeedingBackup = []
        for (const profile of allProfiles) {
          const backupCheck = await adminDbService.needsGoogleSheetsBackup(profile)
          if (backupCheck.success && backupCheck.needsBackup) {
            profilesNeedingBackup.push(profile)
          }
        }

        if (profilesNeedingBackup.length === 0) {
          showSuccessMessage('All profiles are already backed up to Google Sheets!', 'info')
          return
        }

        sheetsProgress.value.total = profilesNeedingBackup.length
        sheetsProgress.value.status = `📊 Found ${profilesNeedingBackup.length} profiles needing backup (${allProfiles.length - profilesNeedingBackup.length} already backed up)...`

        let totalCompleted = 0
        let totalFailed = 0
        let totalSkipped = 0
        const batchSize = 5 // Process 5 profiles at a time
        const totalBatches = Math.ceil(profilesNeedingBackup.length / batchSize)

        for (let batchNumber = 1; batchNumber <= totalBatches; batchNumber++) {
          const startIndex = (batchNumber - 1) * batchSize
          const endIndex = Math.min(startIndex + batchSize, profilesNeedingBackup.length)
          const batch = profilesNeedingBackup.slice(startIndex, endIndex)

          sheetsProgress.value.status = `⚡ Processing batch ${batchNumber}/${totalBatches} (${totalCompleted + totalFailed}/${profilesNeedingBackup.length} completed)...`

          // Process batch in parallel
          const batchPromises = batch.map(async (profile) => {
            try {
              const profileId = profile.id || profile.Reg_ID
              if (!profileId) return

              const result = await updateMainTabRow(profile)
              if (result.success) {
                if (result.skipped) {
                  totalSkipped++
                } else {
                  totalCompleted++
                }
              } else {
                totalFailed++
              }
            } catch (error) {
              totalFailed++
            }
          })

          await Promise.allSettled(batchPromises)

          // Update progress
          sheetsProgress.value.current = totalCompleted + totalFailed
          sheetsProgress.value.status = `📊 Progress: ${totalCompleted + totalFailed}/${profilesNeedingBackup.length} profiles processed`
        }

        sheetsProgress.value.status = `🎉 Completed: ${totalCompleted} updated, ${totalFailed} failed, ${totalSkipped} skipped`
        showSuccessMessage(`Sheets update completed: ${totalCompleted} profiles updated, ${totalFailed} failed, ${totalSkipped} skipped`)

      } catch (error) {
        showSuccessMessage('Error during Sheets update. Please try again.', 'error')
      } finally {
        isUpdatingSheets.value = false
        sheetsProgress.value = {
          current: 0,
          total: 0,
          status: 'Ready'
        }
      }
    }



    // Approve loan (removed Sheets integration)
    const approveLoan = async (regId, loanId) => {
      try {
        const uniqueId = `${regId}_${loanId}`
        approvingLoans.value.push(uniqueId)
        
        const loan = pendingLoans.value.find(l => l.regId === regId && l.loanId === loanId)
        if (loan) {
          await adminDbService.approveLoan(regId, loan.loanType, loan.loanId)
          
          await loadPendingLoans()
          
          // Refresh bank accounts and transaction history if shown
          await loadBankAccounts()
          if (showTransactionHistory.value) {
            await loadTransactionHistory()
          }
          
          showSuccessMessage('Loan approved successfully!')
        }
      } catch (error) {
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
      editingLoan.value = { 
        ...loan,
        requestDate: loan.createdAt ? new Date(loan.createdAt.toDate()).toISOString().split('T')[0] : ''
      }
      showEditModal.value = true
    }

    // Form validation computed property
    const isFormValid = computed(() => {
      const loan = editingLoan.value
      return loan.amount && 
             loan.amount > 0 && 
             loan.purpose && 
             loan.purpose.trim() !== '' && 
             loan.source && 
             loan.source.trim() !== '' &&
             loan.requestDate
    })

    // Get current source balance
    const currentSourceBalance = computed(() => {
      if (!editingLoan.value.source) return 0
      return sourceBalances.value[editingLoan.value.source] || 0
    })

    // Check if source has sufficient funds
    const hasSufficientFunds = computed(() => {
      if (!editingLoan.value.amount || !editingLoan.value.source) return true
      return currentSourceBalance.value >= editingLoan.value.amount
    })

    // Approve loan (updated from save loan edit)
    const saveLoanEdit = async () => {
      const currentRegId = editingLoan.value.regId
      
      try {
        // Validate form
        if (!isFormValid.value) {
          showSuccessMessage('Please fill in all required fields before approving', 'error')
          return
        }
        
        savingLoan.value = true
        
        const loan = editingLoan.value
        
        // First update the loan with the edited values
        const updateResult = await adminDbService.updateLoan(loan.regId, loan.loanType, loan.loanId, {
          amount: parseFloat(loan.amount),
          purpose: loan.purpose,
          source: loan.source,
          arms: loan.arms,
          coordinator: loan.source // Set coordinator = source
        })
        
        if (!updateResult.success) {
          throw new Error(updateResult.message || 'Failed to update loan')
        }
        
        // Then approve the loan
        const approvalResult = await adminDbService.approveLoan(loan.regId, loan.loanType, loan.loanId, loan.source)
        
        if (!approvalResult.success) {
          throw new Error(approvalResult.message || 'Failed to approve loan')
        }
        
        closeEditModal()
        await loadPendingLoans()
        
        showSuccessMessage('Loan approved successfully!')
        
      } catch (error) {
        console.error('❌ Error in loan approval process:', error)
        console.error('❌ Error details:', {
          message: error.message,
          stack: error.stack,
          name: error.name
        })
        
        // Show specific error message for insufficient balance
        if (error.message && error.message.includes('Insufficient balance')) {
          // Extract account name and amounts from error message
          const balanceMatch = error.message.match(/Insufficient balance in (.+?)\. Available: Rs\. ([\d,]+), Required: Rs\. ([\d,]+)/)
          if (balanceMatch) {
            const accountName = balanceMatch[1]
            const available = balanceMatch[2]
            const required = balanceMatch[3]
            showSuccessMessage(
              `❌ Insufficient Funds: The ${accountName} account has Rs. ${available} but needs Rs. ${required} for this loan. Please add funds to the ${accountName} account before approving loans.`,
              'error'
            )
          } else {
            showSuccessMessage(error.message, 'error')
          }
        } else {
          showSuccessMessage('Error approving loan. Please try again.', 'error')
        }
      } finally {
        savingLoan.value = false
      }
    }

    // Approve payment (removed Sheets integration)
    const approvePayment = async (paymentId) => {
      try {
        approvingPayments.value.push(paymentId)
        
        await adminDbService.approvePayment(paymentId)
        
        await loadPendingPayments()
        
        // Refresh bank accounts and transaction history if shown
        await loadBankAccounts()
        if (showTransactionHistory.value) {
          await loadTransactionHistory()
        }
        
        showSuccessMessage('Payment approved successfully!')
      } catch (error) {
        showSuccessMessage('Error approving payment. Please try again.', 'error')
      } finally {
        approvingPayments.value = approvingPayments.value.filter(id => id !== paymentId)
      }
    }

    // New payment approval with loan selection
    const approvePaymentWithLoanSelection = async (paymentId) => {
      try {
        // Get the payment data
        const payment = pendingPayments.value.find(p => p.id === paymentId)
        if (!payment) {
          showSuccessMessage('Payment not found', 'error')
          return
        }

        // Get available loans for this profile
        const rfLoansResult = await adminDbService.getProfileRFLoans(payment.regId)
        if (!rfLoansResult.success) {
          showSuccessMessage('Failed to get loans for this profile', 'error')
          return
        }

        const activeLoans = rfLoansResult.data.filter(loan => loan.status === 'active')
        
        if (activeLoans.length === 0) {
          showSuccessMessage('No active loans found for this profile', 'error')
          return
        }

        if (activeLoans.length === 1) {
          // Only one loan, proceed directly
          await approvePaymentToSpecificLoan(paymentId, activeLoans[0].id)
        } else {
          // Multiple loans, show selection modal
          selectedPaymentForLoan.value = payment
          availableLoansForPayment.value = activeLoans
          selectedLoanForPayment.value = ''
          
          showLoanSelectionModal.value = true
        }
      } catch (error) {
        showSuccessMessage('Error preparing payment approval', 'error')
      }
    }

    // Approve payment to a specific loan
    const approvePaymentToSpecificLoan = async (paymentId, loanId) => {
      try {
        approvingPayments.value.push(paymentId)
        
        await adminDbService.approvePaymentToSpecificLoan(paymentId, loanId)
        
        await loadPendingPayments()
        
        // Refresh bank accounts and transaction history if shown
        await loadBankAccounts()
        if (showTransactionHistory.value) {
          await loadTransactionHistory()
        }
        
        showSuccessMessage('Payment approved successfully!')
      } catch (error) {
        showSuccessMessage('Error approving payment. Please try again.', 'error')
      } finally {
        approvingPayments.value = approvingPayments.value.filter(id => id !== paymentId)
      }
    }

    // Edit payment for approval (new streamlined flow)
    const editPaymentForApproval = async (payment) => {
      try {
        // Load available loans for this profile
        const rfLoansResult = await adminDbService.getProfileRFLoans(payment.regId)
        let availableLoans = []
        
        if (rfLoansResult.success) {
          availableLoans = rfLoansResult.data.filter(loan => loan.status === 'active')
        }
        
        // Prepare the payment data for editing
        editingPayment.value = { 
          ...payment,
          paidAmount: payment.paidAmount || payment.amount || 0,
          date: payment.timestamp ? new Date(payment.timestamp.toDate()).toISOString().split('T')[0] : '',
          availableLoans: availableLoans,
          targetLoanId: payment.targetLoanId || '' // Add target loan ID field
        }
        
        showEditPaymentModal.value = true
      } catch (error) {
        showSuccessMessage('Error loading loans for this profile', 'error')
      }
    }

    // Edit payment
    const editPayment = async (payment) => {
      try {
        // Load available loans for this profile
        const rfLoansResult = await adminDbService.getProfileRFLoans(payment.regId)
        let availableLoans = []
        
        if (rfLoansResult.success) {
          availableLoans = rfLoansResult.data.filter(loan => loan.status === 'active')
        }
        
        // Prepare the payment data for editing
        editingPayment.value = { 
          ...payment,
          paidAmount: payment.paidAmount || payment.amount || 0,
          date: payment.timestamp ? new Date(payment.timestamp.toDate()).toISOString().split('T')[0] : '',
          availableLoans: availableLoans,
          targetLoanId: payment.targetLoanId || '' // Add target loan ID field
        }
        
        showEditPaymentModal.value = true
      } catch (error) {
        showSuccessMessage('Error loading loans for this profile', 'error')
      }
    }

    // Approve edited payment (new streamlined flow)
    const approveEditedPayment = async () => {
      try {
        // Validation
        const paidAmount = parseFloat(editingPayment.value.paidAmount)
        const totalBalance = parseFloat(editingPayment.value.totalBalance)
        const targetLoanId = editingPayment.value.targetLoanId
        
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
        
        // Check if target loan is selected
        if (!targetLoanId) {
          showSuccessMessage('Please select a target loan', 'error')
          return
        }
        
        savingPayment.value = true
        
        // First, update the payment record
        const updateData = {
          [RF_RETURN_RECORD_FIELD.PAID_AMOUNT]: paidAmount,
          [RF_RETURN_RECORD_FIELD.RECEIVER]: editingPayment.value.receiver,
          targetLoanId: targetLoanId
        }
        
        // Add date if it was changed
        if (editingPayment.value.date) {
          updateData[RF_RETURN_RECORD_FIELD.TIMESTAMP] = new Date(editingPayment.value.date)
        }
        
        // Update the payment record
        await adminDbService.updatePayment(editingPayment.value.id, updateData)
        
        // Now approve the payment using the existing approval logic
        await approvePaymentToSpecificLoan(editingPayment.value.id, targetLoanId)
        
        closeEditPaymentModal()
        showSuccessMessage('Payment updated and approved successfully!')
        
      } catch (error) {
        showSuccessMessage('Error updating and approving payment. Please try again.', 'error')
      } finally {
        savingPayment.value = false
      }
    }

    // Save payment edit
    const savePaymentEdit = async () => {
      try {
        
        // Validation
        const paidAmount = parseFloat(editingPayment.value.paidAmount)
        const totalBalance = parseFloat(editingPayment.value.totalBalance)
        const targetLoanId = editingPayment.value.targetLoanId
        
        
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
        
        // Check if target loan is selected
        if (!targetLoanId) {
          showSuccessMessage('Please select a target loan', 'error')
          return
        }
        
        console.log('✅ Validation passed, proceeding with save')
        
        savingPayment.value = true
        
        const updateData = {
          [RF_RETURN_RECORD_FIELD.PAID_AMOUNT]: paidAmount,
          [RF_RETURN_RECORD_FIELD.RECEIVER]: editingPayment.value.receiver,
          targetLoanId: targetLoanId // Add target loan ID to update data
        }
        
        // Add date if it was changed
        if (editingPayment.value.date) {
          updateData[RF_RETURN_RECORD_FIELD.TIMESTAMP] = new Date(editingPayment.value.date)
        }
        
        console.log('📝 Update data:', updateData)
        
        await adminDbService.updatePayment(editingPayment.value.id, updateData)
        
        console.log('✅ Payment updated successfully, closing modal')
        
        closeEditPaymentModal()
        await loadPendingPayments()
        showSuccessMessage('Payment updated successfully!')
        
      } catch (error) {
        console.error('❌ Error in savePaymentEdit:', error)
        showSuccessMessage('Error updating payment. Please try again.', 'error')
      } finally {
        savingPayment.value = false
      }
    }

    // Reject payment (remove from system)
    const rejectPayment = async () => {
      try {
        // Show confirmation dialog
        const confirmed = confirm(
          `Are you sure you want to reject this payment?\n\n` +
          `Reg ID: ${editingPayment.value.regId}\n` +
          `Amount: ${formatAmount(editingPayment.value.paidAmount)}\n\n` +
          `This will permanently remove the payment from the system.`
        )
        
        if (!confirmed) {
          return
        }
        
        savingPayment.value = true
        
        // Call the reject payment service
        await adminDbService.rejectPayment(editingPayment.value.id)
        
        closeEditPaymentModal()
        await loadPendingPayments()
        
        // Refresh bank accounts and transaction history if shown
        await loadBankAccounts()
        if (showTransactionHistory.value) {
          await loadTransactionHistory()
        }
        
        showSuccessMessage('Payment rejected and removed from system successfully!')
        
      } catch (error) {
        console.error('❌ Error rejecting payment:', error)
        showSuccessMessage('Error rejecting payment. Please try again.', 'error')
      } finally {
        savingPayment.value = false
      }
    }

    // Close edit payment modal
    const closeEditPaymentModal = () => {
      showEditPaymentModal.value = false
      editingPayment.value = {}
    }

    // Approve GIF return
    const approveGIFReturn = async (gifReturnId) => {
      try {
        approvingGIFReturns.value.push(gifReturnId)
        
        await adminDbService.approveGIFReturn(gifReturnId)
        
        await loadPendingGIFReturns()
        showSuccessMessage('GIF return approved successfully!')
      } catch (error) {
        showSuccessMessage('Error approving GIF return. Please try again.', 'error')
      } finally {
        approvingGIFReturns.value = approvingGIFReturns.value.filter(id => id !== gifReturnId)
      }
    }

    // Edit GIF return
    const editGIFReturn = (gifReturn) => {
      editingGIFReturn.value = { 
        ...gifReturn,
        date: gifReturn.timestamp ? new Date(gifReturn.timestamp.toDate()).toISOString().split('T')[0] : ''
      }
      showEditGIFReturnModal.value = true
    }

    // Save GIF return edit
    const saveGIFReturnEdit = async () => {
      try {
        savingGIFReturn.value = true
        
        const updateData = {
          [GIF_RETURN_RECORD_FIELD.DESCRIPTION]: editingGIFReturn.value.description,
          [GIF_RETURN_RECORD_FIELD.STATUS]: editingGIFReturn.value.status
        }
        
        // Add date if it was changed
        if (editingGIFReturn.value.date) {
          updateData[GIF_RETURN_RECORD_FIELD.TIMESTAMP] = new Date(editingGIFReturn.value.date)
        }
        
        await adminDbService.updateGIFReturn(editingGIFReturn.value.id, updateData)
        
        closeEditGIFReturnModal()
        await loadPendingGIFReturns()
        showSuccessMessage('GIF return updated successfully!')
        
      } catch (error) {
        showSuccessMessage('Error updating GIF return. Please try again.', 'error')
      } finally {
        savingGIFReturn.value = false
      }
    }

    // Close edit GIF return modal
    const closeEditGIFReturnModal = () => {
      showEditGIFReturnModal.value = false
      editingGIFReturn.value = {}
    }

    // Show success message
    const showSuccessMessage = (message, type = 'success') => {
      successMessage.value = message
      messageType.value = type
      setTimeout(() => {
        successMessage.value = ''
        messageType.value = 'success'
      }, 8000) // Longer timeout for error messages
    }

    // Clear success message
    const clearSuccessMessage = () => {
      successMessage.value = ''
      messageType.value = 'success'
    }

    // Get message class based on type
    const getMessageClass = () => {
      switch (messageType.value) {
        case 'error':
          return 'error-message'
        case 'warning':
          return 'warning-message'
        case 'info':
          return 'info-message'
        default:
          return 'success-message'
      }
    }

    // Utility functions
    const formatAmount = (amount) => {
      return new Intl.NumberFormat('en-US').format(amount)
    }

    const formatAmountInMillions = (amount) => {
      return new Intl.NumberFormat('en-US').format(amount)
    }

    const formatDate = (date) => {
      if (!date) return 'N/A'
      const d = date.toDate ? date.toDate() : new Date(date)
      return d.toLocaleDateString('en-IN')
    }

    const formatDateTime = (date) => {
      if (!date) return 'N/A'
      const d = date.toDate ? date.toDate() : new Date(date)
      return d.toLocaleString('en-IN', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    const getInitials = (name) => {
      if (!name) return '?'
      return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
    }

    // Use the centralized convertGoogleDriveUrl function
    const handleImageError = (event) => {
      // Try to convert Google Drive URL to direct image URL
      const originalSrc = event.target.src
      if (originalSrc.includes('drive.google.com/file/d/')) {
        const fileId = originalSrc.match(/\/file\/d\/([^\/]+)/)?.[1]
        if (fileId) {
          // Try thumbnail first, then fallback to uc format
          if (!event.target.dataset.retryAttempt || event.target.dataset.retryAttempt === '1') {
            const directUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w400-h400`
            event.target.dataset.retryAttempt = '1'
            event.target.src = directUrl
            return
          } else if (event.target.dataset.retryAttempt === '1') {
            const fallbackUrl = `https://drive.google.com/uc?export=view&id=${fileId}`
            event.target.dataset.retryAttempt = '2'
            event.target.src = fallbackUrl
            return
          }
        }
      }
      
      // If all attempts fail, hide image and show placeholder
      event.target.style.display = 'none'
      const placeholder = event.target.nextElementSibling
      if (placeholder) {
        placeholder.style.display = 'flex'
      }
    }

    const handleImageLoad = (event) => {
      // Hide placeholder if image loads successfully
      const placeholder = event.target.nextElementSibling
      if (placeholder) {
        placeholder.style.display = 'none'
      }
    }

    const closeEditModal = () => {
      showEditModal.value = false
      editingLoan.value = {}
    }

    onMounted(async () => {
      try {
        initialLoading.value = true
        
        // Load all data in parallel
        await Promise.all([
          loadPendingLoans(),
          loadPendingPayments(),
          loadPendingGIFReturns(),
          loadAvailableSources()
        ])
        
      } catch (error) {
        // Handle error silently
      } finally {
        initialLoading.value = false
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
        // Loan approval: sourceAccount → regId (money flows from sourceAccount to regId)
        return transaction.sourceAccount || 'wereSL'
      } else if (transaction.type === 'payment_approval') {
        // Payment approval: regId → receiverAccount (money flows from regId to receiverAccount)
        return transaction.regId || '-'
      }
      return '-'
    }

    // Get transaction receiver
    const getTransactionReceiver = (transaction) => {
      if (transaction.type === 'transfer') {
        return transaction.toAccount || '-'
      } else if (transaction.type === 'loan_approval') {
        // Loan approval: sourceAccount → regId (money flows from sourceAccount to regId)
        return transaction.regId || '-'
      } else if (transaction.type === 'payment_approval') {
        // Payment approval: regId → receiverAccount (money flows from regId to receiverAccount)
        return transaction.receiverAccount || 'wereSL'
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
      return parseFloat(amount).toLocaleString('en-US')
    }

    // Coordinator functionality
    const coordinatorLoans = ref([])
    const loadingCoordinatorData = ref(false)
    const showReturnHistoryModal = ref(false)
    const returnHistory = ref([])
    const loadingReturnHistory = ref(false)
    const selectedRegId = ref('')
    const selectedBankAccount = ref('')

    // Load coordinator data
    const loadCoordinatorData = async () => {
      try {
        loadingCoordinatorData.value = true
        
        // Check if a bank account is selected
        if (!selectedBankAccount.value) {
          coordinatorLoans.value = []
          return
        }
        
        // Get only the selected bank account
        const bankAccountsResult = await adminDbService.getAllBankAccounts()
        
        if (!bankAccountsResult.success) {
          throw new Error('Failed to get bank accounts')
        }
        
        // Find the selected bank account
        const selectedAccount = bankAccountsResult.data.find(account => account.name === selectedBankAccount.value)
        
        if (!selectedAccount) {
          console.log('⚠️ Selected bank account not found:', selectedBankAccount.value)
          coordinatorLoans.value = []
          return
        }
        
        console.log('📊 Selected bank account data:', selectedAccount)
        
        const allLoans = []
        const activeRFLoans = selectedAccount[BANK_ACCOUNT_FIELD.ACTIVE_RF_LOAN] || []
        
        console.log('📊 Raw activeRFLoans data:', activeRFLoans, 'Type:', typeof activeRFLoans)
        
        // Ensure activeRFLoans is an array
        if (!Array.isArray(activeRFLoans)) {
          console.warn('⚠️ activeRFLoans is not an array:', activeRFLoans)
          coordinatorLoans.value = []
          return
        }
        
        console.log('📊 Processing active RF loans:', activeRFLoans.length, 'loans')
        
        // Define current month and year at the top level
        const currentMonth = new Date().toLocaleString('en-US', { month: 'long' })
        const currentYear = new Date().getFullYear()
        
        // Process activeRF_loan entries
        for (const loanEntry of activeRFLoans) {
          console.log('📊 Processing loan entry:', loanEntry)
          
          if (loanEntry && loanEntry.regId) {
            try {
              // Get profile data
              const profileResult = await getProfileByRegId(loanEntry.regId)
              if (profileResult.success && profileResult.data) {
                const profile = profileResult.data
                
                // Process payment data from activeRF_loan paymentHistory
                const payments = {}
                
                // Check paymentHistory for current month payments
                if (loanEntry.paymentHistory && Array.isArray(loanEntry.paymentHistory)) {
                  console.log('📊 Processing payment history for', loanEntry.regId, ':', loanEntry.paymentHistory)
                  let totalCurrentMonthAmount = 0
                  
                  for (const paymentEntry of loanEntry.paymentHistory) {
                    if (paymentEntry && typeof paymentEntry === 'string') {
                      // Parse DD-MM-YYYY-MIN-HH : amount format
                      const parts = paymentEntry.split(' : ')
                      if (parts.length === 2) {
                        const dateTimeStr = parts[0]
                        const amount = parseInt(parts[1]) || 0
                        
                        // Parse DD-MM-YYYY-MIN-HH format
                        const dateParts = dateTimeStr.split('-')
                        if (dateParts.length >= 3) {
                          const day = parseInt(dateParts[0])
                          const month = parseInt(dateParts[1])
                          const year = parseInt(dateParts[2])
                          
                          // Create date object
                          const paymentDate = new Date(year, month - 1, day)
                          const paymentMonth = paymentDate.toLocaleString('en-US', { month: 'long' })
                          
                          // Only process current month and year payments
                          if (paymentMonth === currentMonth && year === currentYear) {
                            totalCurrentMonthAmount += amount
                            console.log('📊 Found current month payment:', amount, 'for', loanEntry.regId)
                          }
                        }
                      }
                    }
                  }
                  
                  if (totalCurrentMonthAmount > 0) {
                    payments[currentMonth] = {
                      paid: true,
                      amount: totalCurrentMonthAmount
                    }
                    console.log('📊 Total current month amount for', loanEntry.regId, ':', totalCurrentMonthAmount)
                  }
                }
                
                // Add current month if not paid
                if (!payments[currentMonth]) {
                  payments[currentMonth] = {
                    paid: false,
                    amount: 0
                  }
                }
                
                allLoans.push({
                  regId: loanEntry.regId,
                  name: loanEntry.profileName || profile.fullName || profile.Name || 'Unknown',
                  payments,
                  bankAccount: selectedAccount.name,
                  rfLoanId: loanEntry.rfLoanId
                })
                
                console.log('📊 Added loan to coordinator list:', loanEntry.regId, 'Payments:', payments)
              } else {
                console.log('⚠️ Profile not found for regId:', loanEntry.regId)
                // Add regId even if profile not found, with unknown name
                allLoans.push({
                  regId: loanEntry.regId,
                  name: loanEntry.profileName || 'Unknown',
                  payments: {
                    [currentMonth]: {
                      paid: false,
                      amount: 0
                    }
                  },
                  bankAccount: selectedAccount.name,
                  rfLoanId: loanEntry.rfLoanId
                })
              }
            } catch (error) {
              console.error('❌ Error processing loan entry:', loanEntry, error)
            }
          } else {
            console.warn('⚠️ Invalid loan entry:', loanEntry)
          }
        }
        
        coordinatorLoans.value = allLoans
      } catch (error) {
        console.error('❌ Error loading coordinator data:', error)
        coordinatorLoans.value = []
      } finally {
        loadingCoordinatorData.value = false
      }
    }

    // Get month name from DDMMYYYY format
    const getMonthFromDateKey = (dateKey) => {
      try {
        if (dateKey.length === 8) {
          const day = dateKey.substring(0, 2)
          const month = dateKey.substring(2, 4)
          const year = dateKey.substring(4, 8)
          
          const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
          return date.toLocaleString('en-US', { month: 'long' })
        }
        return dateKey
      } catch (error) {
        return dateKey
      }
    }

    // Show return history for a profile
    const showReturnHistory = async (regId) => {
      try {
        selectedRegId.value = regId
        showReturnHistoryModal.value = true
        loadingReturnHistory.value = true
        
        // Get profile data
        const profileResult = await getProfileByRegId(regId)
        if (profileResult.success && profileResult.data) {
          const profile = profileResult.data
          const rfReturnHistory = profile[ProfileField.RF_RETURN_HISTORY] || {}
          
          // Convert RRH objects to array format for display
          const historyArray = []
          
          // Check if it's the new RRH object format or legacy format
          const firstKey = Object.keys(rfReturnHistory)[0]
          const isRRHFormat = firstKey && firstKey.startsWith('RRH_')
          
          if (isRRHFormat) {
            // New RRH object format: {RRH_ID: RRH_Object}
            for (const [rrhId, rrhObject] of Object.entries(rfReturnHistory)) {
              if (rrhObject && rrhObject.approvedDate && rrhObject.amount) {
                historyArray.push({
                  rrhId: rrhObject.RRH_ID,
                  date: new Date(rrhObject.approvedDate),
                  amount: rrhObject.amount,
                  receiver: rrhObject.receiver || 'weresl',
                  driveLinkId: rrhObject.DRIVE_LINK_ID || '',
                  timestamp: rrhObject.approvedDate
                })
              }
            }
          } else {
            // Legacy format: {timestampKey: amount}
            for (const [timestampKey, amount] of Object.entries(rfReturnHistory)) {
              if (timestampKey && amount) {
                // Parse the timestamp (YYYY-MM-DD-HH-MIN format)
                const parts = timestampKey.split('-')
                if (parts.length >= 5) {
                  const year = parseInt(parts[0])
                  const month = parseInt(parts[1]) - 1 // Month is 0-indexed
                  const day = parseInt(parts[2])
                  const hours = parseInt(parts[3])
                  const minutes = parseInt(parts[4])
                  
                  const date = new Date(year, month, day, hours, minutes)
                  historyArray.push({
                    rrhId: `LEGACY_${timestampKey}`,
                    date: date,
                    amount: amount,
                    receiver: 'weresl',
                    driveLinkId: '',
                    timestamp: timestampKey
                  })
                }
              }
            }
          }
          
          // Sort by date (newest first)
          historyArray.sort((a, b) => b.date - a.date)
          returnHistory.value = historyArray
        } else {
          returnHistory.value = []
        }
      } catch (error) {
        console.error('Error loading return history:', error)
        returnHistory.value = []
      } finally {
        loadingReturnHistory.value = false
      }
    }

    // Close return history modal
    const closeReturnHistoryModal = () => {
      showReturnHistoryModal.value = false
      returnHistory.value = []
      selectedRegId.value = ''
    }

    // Convert Google Drive file ID to viewable URL
    const getReceiptUrl = (fileId) => {
      if (!fileId) return '#'
      return `https://drive.google.com/file/d/${fileId}/view`
    }

    // Watch for coordinator tab activation
    watch(activeTab, (newTab) => {
      if (newTab === 'coordinator') {
        // Load bank accounts list for dropdown (but not the data)
        if (bankAccounts.value.length === 0) {
          loadBankAccounts()
        }
      }
    })

    // Get current month name
    const getCurrentMonthName = () => {
      return new Date().toLocaleString('en-US', { month: 'long' })
    }

    // Get current month payment for a loan
    const getCurrentMonthPayment = (loan) => {
      const currentMonth = getCurrentMonthName()
      return loan.payments[currentMonth] || { paid: false, amount: 0 }
    }

    // Navigate to bank accounts page
    const router = useRouter()
    const navigateToBankAccounts = () => {
      router.push('/bank-accounts')
    }

    // Loan selection for payment approval
    const showLoanSelectionModal = ref(false)
    const selectedPaymentForLoan = ref(null)
    const availableLoansForPayment = ref([])
    const selectedLoanForPayment = ref('')
    const processingLoanSelection = ref(false)

    // Handle loan selection change
    const onLoanSelectionChange = () => {
      // This function can be used for additional logic when loan selection changes
    }

    // Get selected loan details
    const getSelectedLoanDetails = () => {
      if (!selectedLoanForPayment.value) return null
      return availableLoansForPayment.value.find(loan => loan.id === selectedLoanForPayment.value)
    }

    // Confirm loan selection and proceed with payment
    const confirmLoanSelection = async () => {
      if (!selectedLoanForPayment.value) {
        showSuccessMessage('Please select a loan', 'error')
        return
      }

      try {
        processingLoanSelection.value = true
        
        await approvePaymentToSpecificLoan(selectedPaymentForLoan.value.id, selectedLoanForPayment.value)
        
        closeLoanSelectionModal()
      } catch (error) {
        showSuccessMessage('Error processing payment', 'error')
      } finally {
        processingLoanSelection.value = false
      }
    }

    // Close loan selection modal
    const closeLoanSelectionModal = () => {
      showLoanSelectionModal.value = false
      selectedPaymentForLoan.value = null
      availableLoansForPayment.value = []
      selectedLoanForPayment.value = ''
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
        editPaymentForApproval,
        approveEditedPayment,
        savePaymentEdit,
        rejectPayment,
        closeEditPaymentModal,
        showSuccessMessage,
        clearSuccessMessage,
        getMessageClass,
        formatAmount,
        formatAmountInMillions,
        formatDate,
        formatDateTime,
        getInitials,
        convertGoogleDriveUrl,
        handleImageError,
        handleImageLoad,
        closeEditModal,
        approveGIFReturn, // Added approveGIFReturn to return
        editGIFReturn, // Added editGIFReturn to return
        saveGIFReturnEdit, // Added saveGIFReturnEdit to return
        closeEditGIFReturnModal, // Added closeEditGIFReturnModal to return
        // Form validation
        isFormValid,
        currentSourceBalance,
        hasSufficientFunds,
        // Sheets Update
        isUpdatingSheets,
        sheetsProgress,
        startGoogleSheetsUpdate,
        coordinatorLoans,
        loadingCoordinatorData,
        showReturnHistoryModal,
        returnHistory,
        loadingReturnHistory,
        selectedRegId,
        selectedBankAccount,
        loadCoordinatorData,
        getMonthFromDateKey,
        showReturnHistory,
        closeReturnHistoryModal,
        getReceiptUrl,
        getCurrentMonthName,
        getCurrentMonthPayment,
        navigateToBankAccounts,
        // Bank accounts for coordinator functionality
        bankAccounts,
        loadBankAccounts,
        armsOptions,
        showLoanSelectionModal,
        selectedPaymentForLoan,
        availableLoansForPayment,
        selectedLoanForPayment,
        processingLoanSelection,
        approvePaymentWithLoanSelection,
        approvePaymentToSpecificLoan,
        onLoanSelectionChange,
        getSelectedLoanDetails,
        confirmLoanSelection,
        closeLoanSelectionModal
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

/* Message Styles */
.success-message, .error-message, .warning-message, .info-message {
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border: 1px solid;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.success-message {
  background: #d4edda;
  color: #155724;
  border-color: #c3e6cb;
}

.error-message {
  background: #f8d7da;
  color: #721c24;
  border-color: #f5c6cb;
}

.warning-message {
  background: #fff3cd;
  color: #856404;
  border-color: #ffeaa7;
}

.info-message {
  background: #d1ecf1;
  color: #0c5460;
  border-color: #bee5eb;
}

.message-content {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  flex: 1;
}

.message-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
  margin-top: 2px;
}

.message-text {
  flex: 1;
  line-height: 1.4;
  font-weight: 500;
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

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover:not(:disabled) {
  background-color: #c82333;
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

/* Coordinator Styles */
.coordinator-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 20px;
}

.coordinator-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.2s ease;
  flex-wrap: wrap;
  gap: 8px;
}

.coordinator-row:hover {
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  transform: translateY(-1px);
}

.loan-id {
  flex: 1;
  min-width: 120px;
  font-weight: bold;
  color: #1565c0;
  font-size: 0.85rem;
  word-break: break-all;
}

.loan-name {
  flex: 1;
  font-weight: 600;
  color: #333;
  margin: 0 8px;
  min-width: 80px;
  word-break: break-word;
}

.current-month-payment {
  flex: 0 0 auto;
  min-width: 120px;
  max-width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid #e0e0e0;
  font-size: 0.85rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.current-month-payment.paid {
  background-color: #e8f5e9;
  border-color: #4caf50;
  color: #2e7d32;
}

.current-month-payment.unpaid {
  background-color: #ffebee;
  border-color: #f44336;
  color: #c62828;
}

.current-month-payment:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.current-month-payment .month {
  font-weight: 600;
  margin-right: 4px;
}

.current-month-payment .amount {
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.current-month-payment .status {
  font-weight: 600;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .coordinator-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    padding: 12px;
  }
  
  .loan-id {
    min-width: auto;
    width: 100%;
    font-size: 0.8rem;
  }
  
  .loan-name {
    min-width: auto;
    width: 100%;
    margin: 0;
    font-size: 0.9rem;
  }
  
  .current-month-payment {
    min-width: auto;
    width: 100%;
    max-width: none;
    justify-content: space-between;
    font-size: 0.8rem;
  }
  
  .current-month-payment .month {
    margin-right: 8px;
  }
  
  .current-month-payment .amount {
    text-align: right;
  }
}

@media (max-width: 480px) {
  .coordinator-row {
    padding: 10px;
  }
  
  .loan-id {
    font-size: 0.75rem;
  }
  
  .loan-name {
    font-size: 0.85rem;
  }
  
  .current-month-payment {
    font-size: 0.75rem;
    padding: 6px 10px;
  }
}

.loading-coordinator-data {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 40px;
  color: #666;
}

.no-coordinator-data {
  text-align: center;
  padding: 40px;
  color: #666;
}

/* Return History Modal Styles */
.return-history-list {
  max-height: 400px;
  overflow-y: auto;
}

.return-record {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s ease;
}

.return-info {
  flex: 1;
}

.return-details {
  display: flex;
  gap: 8px;
  margin-top: 4px;
}

.rrh-id {
  font-size: 0.8rem;
  color: #1565c0;
  font-weight: 500;
}

.receiver {
  font-size: 0.8rem;
  color: #666;
}

.return-amount-section {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.receipt-link-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background-color: #28a745;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.receipt-link-btn:hover {
  background-color: #218838;
}

.return-record:hover {
  background-color: #f5f5f5;
}

.return-record:last-child {
  border-bottom: none;
}

.return-date {
  font-weight: 600;
  color: #333;
}

.return-amount {
  font-weight: 600;
  color: #1565c0;
}

.no-return-history {
  text-align: center;
  padding: 40px;
  color: #666;
}

.loading-return-history {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 40px;
  color: #666;
}

.coordinator-filters {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-group label {
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

/* Loan Selection Modal */
.loan-selection-info {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.loan-selection-info p {
  margin: 8px 0;
  color: #333;
}

.loan-selection-form label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

.loan-details {
  background: #e3f2fd;
  padding: 16px;
  border-radius: 8px;
  margin: 20px 0;
  border-left: 4px solid #1565c0;
}

.loan-details h4 {
  margin: 0 0 12px 0;
  color: #1565c0;
  font-size: 16px;
}

.loan-info p {
  margin: 8px 0;
  color: #333;
}

.loan-info strong {
  color: #1565c0;
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
}

/* Target Loan Selection in Edit Modal */
.form-group select option {
  padding: 8px;
}

.form-group select option:first-child {
  color: #6c757d;
  font-style: italic;
}

/* Receipt Link Styles */
.receipt-link-container {
  margin-top: 8px;
}

.receipt-link-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background-color: #28a745;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s ease;
  border: 1px solid #28a745;
}

.receipt-link-btn:hover {
  background-color: #218838;
  border-color: #1e7e34;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.receipt-link-btn svg {
  flex-shrink: 0;
}

/* Compact Payment Info Styles */
.payment-compact-info {
  margin-top: 15px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.compact-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  font-size: 0.9rem;
}

.compact-row:not(:last-child) {
  border-bottom: 1px solid #dee2e6;
}

.compact-label {
  font-weight: 500;
  color: #6c757d;
}

.compact-value {
  font-weight: 600;
  color: #495057;
}

/* Required field indicator */
.required {
  color: #dc3545;
  font-weight: bold;
}

/* Form validation error states */
.form-control.error {
  border-color: #dc3545;
  box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.2);
}

.form-control.error:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.2);
}

/* Error help text */
.form-help {
  color: #dc3545;
  font-size: 0.8rem;
  margin-top: 2px;
  font-style: italic;
}

/* Loan Compact Info Styles */
.loan-compact-info {
  margin-top: 15px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

/* Balance Info Styles */
.balance-info {
  margin-top: 8px;
  padding: 8px 12px;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 4px;
}

.balance-text {
  color: #495057;
  font-size: 0.85rem;
  font-weight: 500;
}

.balance-text.insufficient-funds {
  color: #dc3545;
}

.warning-text {
  color: #dc3545;
  font-weight: 600;
  margin-left: 8px;
}
</style> 