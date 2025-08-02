<template>
  <div class="admin-dashboard">
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
      <div class="stat-card">
        <div class="stat-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14,2 14,8 20,8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10,9 9,9 8,9"></polyline>
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ pendingLoanCount }}</div>
          <div class="stat-label">Pending Loan Approval</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
            <line x1="1" y1="10" x2="23" y2="10"></line>
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ pendingPaymentCount }}</div>
          <div class="stat-label">Pending Payment Request</div>
        </div>
      </div>
    </div>

    <!-- Tab Navigation -->
    <div class="tab-container">
      <button 
        @click="activeTab = 'loans'" 
        :class="['tab-button', { active: activeTab === 'loans' }]"
      >
        Pending Loan Approval ({{ pendingLoanCount }})
      </button>
      <button 
        @click="activeTab = 'payments'" 
        :class="['tab-button', { active: activeTab === 'payments' }]"
      >
        Pending Payment Request ({{ pendingPaymentCount }})
      </button>
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

    <!-- Pending Payment Requests Tab -->
    <div v-if="activeTab === 'payments'" class="tab-content">
      <div class="section">
        <h2>Pending Payment Requests</h2>
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
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue'
import { adminDbService } from '../services/dbService.js'
import { convertGoogleDriveUrl } from '../utils/driveUtils.js'

export default {
  name: 'AdminDashboard',
  setup() {
    const pendingLoans = ref([])
    const pendingPayments = ref([])
    const showEditModal = ref(false)
    const editingLoan = ref({})
    const loading = ref(false)
    const activeTab = ref('loans')
    const approvingLoans = ref([])
    const approvingPayments = ref([])
    const successMessage = ref('')
    const savingLoan = ref(false)
    const availableSources = ref([])

    const pendingLoanCount = computed(() => pendingLoans.value.length)
    const pendingPaymentCount = computed(() => pendingPayments.value.length)

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

    // Approve loan
    const approveLoan = async (regId, loanId) => {
      try {
        const uniqueId = `${regId}_${loanId}`
        console.log('🔄 Approving loan for RegID:', regId, 'LoanID:', loanId)
        approvingLoans.value.push(uniqueId)
        
        const loan = pendingLoans.value.find(l => l.regId === regId && l.loanId === loanId)
        if (loan) {
          await adminDbService.approveLoan(regId, loan.loanType, loan.loanId)
          await loadPendingLoans()
          showSuccessMessage('Loan approved successfully!')
          console.log('✅ Loan approved for RegID:', regId, 'LoanID:', loanId)
        }
      } catch (error) {
        console.error('❌ Error approving loan:', error)
        showSuccessMessage('Error approving loan. Please try again.', 'error')
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

    // Approve payment
    const approvePayment = async (paymentId) => {
      try {
        console.log('🔄 Approving payment:', paymentId)
        approvingPayments.value.push(paymentId)
        
        await adminDbService.approvePayment(paymentId)
        await loadPendingPayments()
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
      console.log('🔄 Payment editing not implemented yet')
      showSuccessMessage('Payment editing functionality to be implemented', 'info')
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

    onMounted(() => {
      console.log('🚀 Admin Dashboard mounted')
      loadPendingLoans()
      loadPendingPayments()
      loadAvailableSources()
    })



    return {
      pendingLoans,
      pendingPayments,
      pendingLoanCount,
      pendingPaymentCount,
      showEditModal,
      editingLoan,
      loading,
      activeTab,
      approvingLoans,
      approvingPayments,
      successMessage,
      savingLoan,
      availableSources,
      approveLoan,
      editLoan,
      saveLoanEdit,
      approvePayment,
      editPayment,
      showSuccessMessage,
      clearSuccessMessage,
      formatAmount,
      formatDate,
      getInitials,
      convertGoogleDriveUrl,
      handleImageError,
      handleImageLoad,
      closeEditModal
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
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
}

.stat-icon {
  color: #1565c0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #1565c0;
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
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

.loan-header, .payment-header {
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

.loan-actions, .payment-actions {
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

.loan-details, .payment-details {
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
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
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

/* Mobile Responsive */
@media (max-width: 768px) {
  .admin-dashboard {
    padding: 10px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .tab-container {
    flex-direction: column;
  }
  
  .tab-button {
    text-align: center;
    padding: 12px;
  }
  
  .loan-grid, .payment-grid {
    grid-template-columns: 1fr;
  }
  
  .loan-header, .payment-header {
    flex-direction: column;
    gap: 15px;
  }
  
  .loan-actions, .payment-actions {
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
</style> 