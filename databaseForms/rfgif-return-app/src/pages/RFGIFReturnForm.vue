<template>
  <div class="rfgif-return-form">
    <div class="form-container">
      <h1>WERESL RFGIF Return Form</h1>
      
      <!-- RegID Verification Section -->
      <div class="section">
        <h2>Applicant Verification</h2>
        <div class="regid-verification">
          <div class="form-group">
            <label for="regidInput">Enter RegID:</label>
            <div class="search-container">
              <input 
                type="text" 
                id="regidInput" 
                v-model="regidInput" 
                placeholder="Enter RegID to verify"
                class="form-control"
              />
              <button @click="verifyRegID" class="btn btn-primary">Verify</button>
            </div>
          </div>
          
          <div v-if="verificationResult" class="verification-result">
            <div v-if="verificationResult.found" class="alert alert-success">
              <strong>Applicant Found:</strong> {{ verificationResult.profile.name }} ({{ verificationResult.profile.regId }})
            </div>
            <div v-else class="alert alert-error">
              No applicant found with this RegID. Please check and try again.
            </div>
          </div>
        </div>
      </div>

      <!-- Current Loan Status -->
      <div v-if="currentLoan" class="section">
        <h2>Current Loan Status</h2>
        <div class="loan-status">
          <div class="status-grid">
            <div class="status-item">
              <label>Loan Type:</label>
              <span>{{ currentLoan.loanType }}</span>
            </div>
            <div class="status-item">
              <label>Initial Amount:</label>
              <span>LKR {{ formatCurrency(currentLoan.initialAmount) }}</span>
            </div>
            <div class="status-item">
              <label>Current Balance:</label>
              <span class="balance">LKR {{ formatCurrency(currentLoan.currentBalance) }}</span>
            </div>
            <div class="status-item">
              <label>Status:</label>
              <span :class="['status', currentLoan.status]">{{ currentLoan.status }}</span>
            </div>
          </div>
          
          <div v-if="currentLoan.projects && currentLoan.projects.length > 0" class="projects-summary">
            <h3>Active Projects</h3>
            <div class="projects-list">
              <div v-for="project in currentLoan.projects" :key="project.name" class="project-item">
                <div class="project-info">
                  <strong>{{ project.name }}</strong>
                  <span>LKR {{ formatCurrency(project.amount) }}</span>
                </div>
                <div class="project-date">{{ formatDate(project.date) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Payment Entry Section -->
      <div v-if="currentLoan && currentLoan.status === 'active'" class="section">
        <h2>Payment Entry</h2>
        
        <!-- Payment Type Selection -->
        <div class="form-group">
          <label for="paymentType">Payment Type *</label>
          <select id="paymentType" v-model="paymentData.type" class="form-control" required>
            <option value="">Select Payment Type</option>
            <option value="RF">RF Payment</option>
            <option value="GIF">GIF Entry</option>
          </select>
        </div>

        <!-- RF Payment Form -->
        <div v-if="paymentData.type === 'RF'" class="rf-payment">
          <div class="form-row">
            <div class="form-group">
              <label for="paymentAmount">Payment Amount (LKR) *</label>
              <input 
                type="number" 
                id="paymentAmount" 
                v-model="paymentData.amount" 
                class="form-control" 
                min="0"
                step="0.01"
                required 
              />
            </div>
            <div class="form-group">
              <label for="paymentMethod">Payment Method *</label>
              <select id="paymentMethod" v-model="paymentData.method" class="form-control" required>
                <option value="">Select Method</option>
                <option value="cash">Cash</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="check">Check</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <!-- Project Allocation -->
          <div v-if="currentLoan.projects && currentLoan.projects.length > 0" class="project-allocation">
            <h3>Allocate Payment to Projects</h3>
            <div class="allocation-container">
              <div v-for="project in currentLoan.projects" :key="project.name" class="allocation-item">
                <div class="project-header">
                  <strong>{{ project.name }}</strong>
                  <span>Original: LKR {{ formatCurrency(project.amount) }}</span>
                </div>
                <div class="allocation-input">
                  <label>Amount to Apply:</label>
                  <input 
                    type="number" 
                    v-model="project.allocation" 
                    class="form-control"
                    min="0"
                    step="0.01"
                    :max="project.amount"
                  />
                </div>
              </div>
            </div>
            
            <div class="allocation-summary">
              <div class="summary-item">
                <label>Total Payment:</label>
                <span>LKR {{ formatCurrency(paymentData.amount || 0) }}</span>
              </div>
              <div class="summary-item">
                <label>Total Allocated:</label>
                <span>LKR {{ formatCurrency(totalAllocated) }}</span>
              </div>
              <div class="summary-item">
                <label>Remaining:</label>
                <span :class="['remaining', { 'error': remainingAmount < 0 }]">
                  LKR {{ formatCurrency(remainingAmount) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- GIF Entry Form -->
        <div v-if="paymentData.type === 'GIF'" class="gif-entry">
          <div class="form-group">
            <label for="gifDescription">GIF Description *</label>
            <textarea 
              id="gifDescription" 
              v-model="paymentData.description" 
              class="form-control" 
              rows="4"
              required
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Submit Section -->
      <div v-if="currentLoan && currentLoan.status === 'active'" class="section">
        <div class="form-actions">
          <button @click="submitPayment" :disabled="loading || !canSubmit" class="btn btn-primary">
            {{ loading ? 'Processing...' : 'Submit Payment' }}
          </button>
          <button @click="resetForm" class="btn btn-secondary">Reset Form</button>
        </div>
      </div>

      <!-- Status Messages -->
      <div v-if="message" :class="['alert', messageType]">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import { dbOperations } from '@/firebase/db.js'

export default {
  name: 'RFGIFReturnForm',
  setup() {
    const loading = ref(false)
    const message = ref('')
    const messageType = ref('')
    const regidInput = ref('')
    const verificationResult = ref(null)
    const currentLoan = ref(null)

    const paymentData = reactive({
      type: '',
      amount: '',
      method: '',
      description: '',
      date: new Date()
    })

    const showMessage = (text, type = 'info') => {
      message.value = text
      messageType.value = `alert-${type}`
      setTimeout(() => {
        message.value = ''
        messageType.value = ''
      }, 5000)
    }

    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-LK', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount || 0)
    }

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-LK')
    }

    const verifyRegID = async () => {
      if (!regidInput.value) {
        showMessage('Please enter a RegID to verify', 'error')
        return
      }

      loading.value = true
      try {
        const profile = await dbOperations.getProfileByRegId(regidInput.value)
        verificationResult.value = {
          found: !!profile,
          profile: profile || null
        }
        
        if (profile) {
          // Get current loan
          const loans = await dbOperations.getLoans(profile.id)
          currentLoan.value = loans.find(loan => loan.status === 'active') || null
          
          if (currentLoan.value) {
            // Initialize project allocations
            currentLoan.value.projects = currentLoan.value.projects.map(project => ({
              ...project,
              allocation: 0
            }))
          }
          
          showMessage('Applicant verified successfully!', 'success')
        } else {
          showMessage('No applicant found with this RegID', 'error')
        }
      } catch (error) {
        showMessage('Error verifying RegID: ' + error.message, 'error')
      } finally {
        loading.value = false
      }
    }

    const totalAllocated = computed(() => {
      if (!currentLoan.value?.projects) return 0
      return currentLoan.value.projects.reduce((sum, project) => {
        return sum + (parseFloat(project.allocation) || 0)
      }, 0)
    })

    const remainingAmount = computed(() => {
      const paymentAmount = parseFloat(paymentData.amount) || 0
      return paymentAmount - totalAllocated.value
    })

    const canSubmit = computed(() => {
      if (paymentData.type === 'RF') {
        return paymentData.amount > 0 && 
               paymentData.method && 
               Math.abs(remainingAmount.value) < 0.01 // Allow small rounding differences
      } else if (paymentData.type === 'GIF') {
        return paymentData.description.trim()
      }
      return false
    })

    const validatePayment = () => {
      if (paymentData.type === 'RF') {
        if (!paymentData.amount || paymentData.amount <= 0) {
          showMessage('Payment amount must be greater than 0', 'error')
          return false
        }

        if (!paymentData.method) {
          showMessage('Please select a payment method', 'error')
          return false
        }

        if (Math.abs(remainingAmount.value) > 0.01) {
          showMessage('Payment allocation must equal payment amount', 'error')
          return false
        }

        // Check if payment exceeds current balance
        if (parseFloat(paymentData.amount) > currentLoan.value.currentBalance) {
          showMessage('Payment amount cannot exceed current balance', 'error')
          return false
        }
      } else if (paymentData.type === 'GIF') {
        if (!paymentData.description.trim()) {
          showMessage('Please enter a GIF description', 'error')
          return false
        }
      }

      return true
    }

    const submitPayment = async () => {
      if (!validatePayment()) return

      loading.value = true
      try {
        const paymentPayload = {
          amount: paymentData.type === 'RF' ? parseFloat(paymentData.amount) : 0,
          date: new Date(),
          paymentMethod: paymentData.method,
          type: paymentData.type,
          description: paymentData.description
        }

        if (paymentData.type === 'RF') {
          // Add applied projects for RF payments
          paymentPayload.appliedProjects = currentLoan.value.projects
            .filter(project => project.allocation > 0)
            .map(project => ({
              name: project.name,
              amount: parseFloat(project.allocation),
              originalAmount: parseFloat(project.amount)
            }))
        }

        // Create payment document
        await dbOperations.createPayment(
          verificationResult.value.profile.id,
          currentLoan.value.id,
          paymentPayload
        )

        // Update loan balance and status
        const newBalance = currentLoan.value.currentBalance - parseFloat(paymentData.amount)
        const newStatus = newBalance <= 0 ? 'completed' : 'active'
        
        await dbOperations.updateLoan(
          verificationResult.value.profile.id,
          currentLoan.value.id,
          {
            currentBalance: Math.max(0, newBalance),
            status: newStatus
          }
        )

        // Move completed projects to completedProjects array
        if (paymentData.type === 'RF') {
          const completedProjects = currentLoan.value.projects
            .filter(project => project.allocation >= project.amount)
            .map(project => ({
              projectName: project.name,
              originalAmount: parseFloat(project.amount),
              completionDate: new Date(),
              paymentReferences: [paymentPayload.date]
            }))

          if (completedProjects.length > 0) {
            await dbOperations.addCompletedProjects(
              verificationResult.value.profile.id,
              completedProjects
            )
          }
        }

        showMessage('Payment submitted successfully!', 'success')
        resetForm()
      } catch (error) {
        showMessage('Error submitting payment: ' + error.message, 'error')
      } finally {
        loading.value = false
      }
    }

    const resetForm = () => {
      regidInput.value = ''
      verificationResult.value = null
      currentLoan.value = null
      Object.keys(paymentData).forEach(key => {
        if (key === 'date') {
          paymentData[key] = new Date()
        } else {
          paymentData[key] = ''
        }
      })
      message.value = ''
    }

    return {
      loading,
      message,
      messageType,
      regidInput,
      verificationResult,
      currentLoan,
      paymentData,
      totalAllocated,
      remainingAmount,
      canSubmit,
      formatCurrency,
      formatDate,
      verifyRegID,
      submitPayment,
      resetForm
    }
  }
}
</script>

<style scoped>
.rfgif-return-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.form-container {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 30px;
}

h1 {
  text-align: center;
  color: #1565c0;
  margin-bottom: 30px;
}

.section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.section h2 {
  color: #333;
  margin-bottom: 20px;
  border-bottom: 2px solid #1565c0;
  padding-bottom: 10px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #333;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

.form-control:focus {
  outline: none;
  border-color: #1565c0;
  box-shadow: 0 0 0 2px rgba(21, 101, 192, 0.2);
}

.search-container {
  display: flex;
  gap: 10px;
}

.search-container .form-control {
  flex: 1;
}

.verification-result {
  margin-top: 15px;
}

.alert {
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.alert-success {
  background-color: #e8f5e9;
  color: #2e7d32;
  border: 1px solid #c8e6c9;
}

.alert-error {
  background-color: #ffebee;
  color: #c62828;
  border: 1px solid #ffcdd2;
}

.loan-status {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
}

.status-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 20px;
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  border: 1px solid #e0e0e0;
}

.status-item label {
  font-weight: 500;
  color: #666;
}

.balance {
  font-weight: bold;
  color: #1565c0;
}

.status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.status.active {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.status.completed {
  background-color: #e3f2fd;
  color: #1565c0;
}

.projects-summary h3 {
  margin-bottom: 15px;
  color: #333;
}

.projects-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.project-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  border: 1px solid #e0e0e0;
}

.project-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.project-date {
  font-size: 12px;
  color: #666;
}

.allocation-container {
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;
}

.allocation-item {
  margin-bottom: 15px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 5px;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.allocation-input {
  display: flex;
  align-items: center;
  gap: 10px;
}

.allocation-input label {
  min-width: 120px;
  font-weight: 500;
}

.allocation-input .form-control {
  max-width: 150px;
}

.allocation-summary {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #e0e0e0;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.summary-item:last-child {
  margin-bottom: 0;
  padding-top: 10px;
  border-top: 1px solid #e0e0e0;
  font-weight: bold;
}

.remaining.error {
  color: #dc3545;
}

.form-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background-color: #1565c0;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #0d47a1;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
}

@media (max-width: 768px) {
  .form-row,
  .status-grid {
    grid-template-columns: 1fr;
  }
  
  .search-container {
    flex-direction: column;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .allocation-input {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .allocation-input .form-control {
    max-width: 100%;
  }
}
</style> 