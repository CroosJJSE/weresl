<template>
  <div class="email-test">
    <h3>Email Notification Test</h3>
    <button @click="testEmail" :disabled="testing" class="test-btn">
      {{ testing ? 'Testing...' : 'Test Email Notification' }}
    </button>
    
    <div v-if="result" class="result">
      <div v-if="result.success" class="success">
        ✅ {{ result.message }}
      </div>
      <div v-else class="error">
        ❌ {{ result.message }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { sendLoanRequestEmail } from '@/utils/gasUtils.js'

export default {
  name: 'EmailTest',
  setup() {
    const testing = ref(false)
    const result = ref(null)

    const testEmail = async () => {
      testing.value = true
      result.value = null

      try {
        // Test data
        const testProfile = {
          Reg_ID: 'TEST001',
          fullName: 'John Doe',
          district: 'Colombo',
          address: '123 Test Street',
          nic: '123456789V',
          contact: '+94123456789',
          description: 'Test profile description',
          occupation: 'Software Developer'
        }

        const testLoanData = {
          type: 'RF',
          amount: 50000,
          purpose: 'Business expansion'
        }

        const emailResult = await sendLoanRequestEmail(testProfile, testLoanData)
        
        if (emailResult.success) {
          result.value = {
            success: true,
            message: 'Email test successful! Check admin email.'
          }
        } else {
          result.value = {
            success: false,
            message: `Email test failed: ${emailResult.message}`
          }
        }
      } catch (error) {
        result.value = {
          success: false,
          message: `Email test error: ${error.message}`
        }
      } finally {
        testing.value = false
      }
    }

    return {
      testing,
      result,
      testEmail
    }
  }
}
</script>

<style scoped>
.email-test {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 20px 0;
}

.test-btn {
  background: #1565c0;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.test-btn:hover:not(:disabled) {
  background: #0d47a1;
}

.test-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.result {
  margin-top: 15px;
  padding: 10px;
  border-radius: 5px;
}

.success {
  background: #e8f5e9;
  color: #2e7d32;
}

.error {
  background: #ffebee;
  color: #c62828;
}
</style> 