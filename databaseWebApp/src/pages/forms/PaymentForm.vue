<template>
  <div class="payment-form">
    <div class="form-header">
      <h2>Payment Return Form</h2>
      <p>Process RF loan payments and Grant "Give It Forward" entries</p>
    </div>

    <form @submit.prevent="handleSubmit" class="form">
      <div class="form-section">
        <h3>Payment Information</h3>
        
        <div class="form-row">
          <div class="form-group">
            <label for="regId">Registration ID</label>
            <input 
              type="text" 
              id="regId" 
              v-model="formData.regId" 
              placeholder="Enter RegID"
              required
            />
          </div>
          <div class="form-group">
            <label for="type">Payment Type</label>
            <select id="type" v-model="formData.type" required>
              <option value="">Select Type</option>
              <option value="RF">RF Loan Payment</option>
              <option value="GRANT">Grant "Give It Forward"</option>
            </select>
          </div>
        </div>

        <div v-if="formData.type === 'RF'" class="form-group">
          <label for="amount">Payment Amount (Rs.)</label>
          <input 
            type="number" 
            id="amount" 
            v-model="formData.amount" 
            placeholder="Enter payment amount"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div v-if="formData.type === 'GRANT'" class="form-group">
          <label for="details">Give It Forward Details</label>
          <textarea 
            id="details" 
            v-model="formData.details" 
            placeholder="Enter details about the grant recipient"
            required
          ></textarea>
        </div>

        <div class="form-group">
          <label for="date">Payment Date</label>
          <input 
            type="date" 
            id="date" 
            v-model="formData.date" 
            required
          />
        </div>
      </div>

      <div v-if="profile" class="profile-preview">
        <h3>Profile Preview</h3>
        <div class="profile-info">
          <p><strong>Name:</strong> {{ profile.basicInfo?.name }}</p>
          <p><strong>District:</strong> {{ profile.basicInfo?.District }}</p>
          <p><strong>Active Loans:</strong> {{ profile.computed?.activeLoansCount || 0 }}</p>
          <p><strong>Total Loan Amount:</strong> Rs. {{ formatAmount(profile.computed?.totalLoanAmount || 0) }}</p>
          <p><strong>Remaining Amount:</strong> Rs. {{ formatAmount(profile.computed?.remainingLoanAmount || 0) }}</p>
        </div>
      </div>

      <div class="form-actions">
        <button type="button" @click="resetForm" class="btn-secondary">Reset</button>
        <button type="submit" :disabled="loading" class="btn-primary">
          {{ loading ? 'Processing...' : 'Submit Payment' }}
        </button>
      </div>
    </form>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-if="success" class="success-message">
      {{ success }}
    </div>
  </div>
</template>

<script>
import { ref, reactive, watch } from 'vue'
import { profileService } from '@/services/profile.js'

export default {
  name: 'PaymentForm',
  setup() {
    const loading = ref(false)
    const error = ref(null)
    const success = ref(null)
    const profile = ref(null)

    const formData = reactive({
      regId: '',
      type: '',
      amount: '',
      details: '',
      date: new Date().toISOString().split('T')[0]
    })

    const loadProfile = async (regId) => {
      if (!regId) {
        profile.value = null
        return
      }

      try {
        profile.value = await profileService.getProfile(regId)
      } catch (err) {
        console.error('Error loading profile:', err)
        profile.value = null
      }
    }

    const validateForm = () => {
      const errors = []

      if (!formData.regId) {
        errors.push('Registration ID is required')
      }

      if (!formData.type) {
        errors.push('Payment type is required')
      }

      if (formData.type === 'RF') {
        if (!formData.amount || formData.amount <= 0) {
          errors.push('Valid payment amount is required for RF payments')
        }
      }

      if (formData.type === 'GRANT') {
        if (!formData.details) {
          errors.push('Details are required for GRANT payments')
        }
      }

      return errors
    }

    const handleSubmit = async () => {
      error.value = null
      success.value = null
      
      const validationErrors = validateForm()
      if (validationErrors.length > 0) {
        error.value = validationErrors.join(', ')
        return
      }

      loading.value = true

      try {
        const paymentData = {
          regId: formData.regId,
          type: formData.type,
          amount: parseFloat(formData.amount) || 0,
          details: formData.details,
          date: new Date(formData.date)
        }

        await profileService.processPayment(paymentData)
        
        if (formData.type === 'RF') {
          success.value = `RF payment of Rs. ${formData.amount} processed successfully for ${formData.regId}`
        } else {
          success.value = `Grant "Give It Forward" entry processed successfully for ${formData.regId}`
        }

        resetForm()
      } catch (err) {
        error.value = 'Failed to process payment: ' + err.message
      } finally {
        loading.value = false
      }
    }

    const resetForm = () => {
      Object.keys(formData).forEach(key => {
        if (key === 'date') {
          formData[key] = new Date().toISOString().split('T')[0]
        } else {
          formData[key] = ''
        }
      })
      profile.value = null
      error.value = null
      success.value = null
    }

    const formatAmount = (amount) => {
      if (!amount) return '0'
      return new Intl.NumberFormat('en-IN').format(amount)
    }

    // Watch for RegID changes to load profile
    watch(() => formData.regId, (newRegId) => {
      if (newRegId) {
        loadProfile(newRegId)
      } else {
        profile.value = null
      }
    })

    return {
      loading,
      error,
      success,
      profile,
      formData,
      handleSubmit,
      resetForm,
      formatAmount
    }
  }
}
</script>

<style scoped>
.payment-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.form-header {
  text-align: center;
  margin-bottom: 30px;
}

.form-header h2 {
  color: #1565c0;
  margin-bottom: 10px;
}

.form {
  background-color: #f8f9fa;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.form-section {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #dee2e6;
}

.form-section:last-child {
  border-bottom: none;
}

.form-section h3 {
  color: #1565c0;
  margin-bottom: 20px;
  font-size: 18px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #333;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.profile-preview {
  background-color: #e3f2fd;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.profile-preview h3 {
  color: #1565c0;
  margin-bottom: 15px;
}

.profile-info p {
  margin: 8px 0;
  font-size: 14px;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

.btn-primary,
.btn-secondary {
  padding: 12px 30px;
  border: none;
  border-radius: 5px;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background-color: #1565c0;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #0d47a1;
}

.btn-primary:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
}

.error-message {
  background-color: #ffebee;
  color: #c62828;
  padding: 15px;
  border-radius: 5px;
  margin-top: 20px;
  text-align: center;
}

.success-message {
  background-color: #e8f5e9;
  color: #2e7d32;
  padding: 15px;
  border-radius: 5px;
  margin-top: 20px;
  text-align: center;
}

@media screen and (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
  }
}
</style> 