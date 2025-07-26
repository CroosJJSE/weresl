<template>
  <div class="rfgif-return-form">
    <div class="logo-container">
      <img src="https://drive.google.com/thumbnail?id=1AEEWccjf_sMoXJgAaYIPZZm5rM-OCFe2" alt="We'RE SL Logo" class="logo" />
    </div>
    <div class="form-header">
      <h2>RF & GIF Return Form</h2>
      <p>Record RF repayments and GIF returns for existing users</p>
    </div>
    <div class="language-toggle">
      <LanguageToggle />
    </div>
    <div class="form-container">
      <h1>{{ t('form.title') }}</h1>
      
      <!-- Search Section -->
      <div class="section">
        <h2>{{ t('form.searchApplicant') }}</h2>
        <div class="search-section">
          <div class="form-group">
            <label for="searchInput">{{ t('form.enterNICOrRegID') }}</label>
            <div class="search-container">
              <input 
                type="text" 
                id="searchInput" 
                v-model="searchInput" 
                :placeholder="t('form.enterNICOrRegID')"
                class="form-control"
                @keyup.enter="searchProfile"
              />
              <button @click="searchProfile" class="btn btn-primary" :disabled="loading">
                {{ loading ? t('form.searching') : t('form.search') }}
              </button>
            </div>
          </div>
          
          <div v-if="searchResult" class="search-result">
            <div v-if="searchResult.found" class="alert alert-success">
              <strong>{{ t('form.applicantFound') }}</strong> 
              <div class="profile-info">
                <div class="profile-image-container">
                  <img 
                    v-if="searchResult.profile.Image || searchResult.profile.profileImageUrl || searchResult.profile.imageUrl" 
                    :src="searchResult.profile.Image || searchResult.profile.profileImageUrl || searchResult.profile.imageUrl" 
                    alt="Profile Photo" 
                    class="profile-image"
                  />
                  <div v-else class="profile-placeholder">
                    <span>{{ t('form.noProfilePhoto') }}</span>
                  </div>
                </div>
                <p><strong>{{ t('form.name') }}</strong> {{ searchResult.profile.Name || searchResult.profile.basicInfo?.name || 'N/A' }}</p>
                <p><strong>{{ t('form.nic') }}</strong> {{ searchResult.profile.NIC || searchResult.profile.basicInfo?.nic || 'N/A' }}</p>
                <p><strong>{{ t('form.phone') }}</strong> {{ searchResult.profile.contact || searchResult.profile.basicInfo?.phone || 'N/A' }}</p>
                <p><strong>{{ t('form.regid') }}</strong> {{ searchResult.profile.Reg_ID || searchResult.profile.regId || 'N/A' }}</p>
                <p><strong>{{ t('form.district') }}</strong> {{ searchResult.profile.District || searchResult.profile.basicInfo?.district || 'N/A' }}</p>
              </div>
            </div>
            <div v-else class="alert alert-warning">
              {{ t('form.noProfileFound') }}
            </div>
          </div>
        </div>
      </div>

      <!-- Return Type Selection -->
      <div v-if="searchResult && searchResult.found" class="section">
        <h2>{{ t('form.returnType') }}</h2>
        <div class="return-type-selection">
          <div class="choice-buttons">
            <button @click="setReturnType('RF')" class="btn btn-primary" :class="{ active: returnType === 'RF' }">
              {{ t('form.rfRepayment') }}
            </button>
            <button @click="setReturnType('GIF')" class="btn btn-secondary" :class="{ active: returnType === 'GIF' }">
              {{ t('form.gifReturn') }}
            </button>
            </div>
            </div>
            </div>

      <!-- GIF Return Form -->
      <div v-if="returnType === 'GIF' && searchResult && searchResult.found" class="section">
        <h2>{{ t('form.gifReturnForm') }}</h2>
        <div class="gif-form">
          <div class="form-group">
            <label for="gifDescription">{{ t('form.gifDescription') }} *</label>
            <textarea 
              id="gifDescription" 
              v-model="gifData.description" 
              :placeholder="t('form.gifDescriptionPlaceholder')"
              class="form-control" 
              :class="{ 'error': showGIFError && !gifData.description.trim() }"
              rows="4"
              required
              @blur="validateGIFDescription"
            ></textarea>
            <span v-if="showGIFError && !gifData.description.trim()" class="error-message">
              {{ t('form.pleaseEnterGIFDescription') }}
            </span>
          </div>
          
          <div class="form-actions">
            <button @click="submitGIFReturn" :disabled="loading || !gifData.description" class="btn btn-primary">
              {{ loading ? t('form.processing') : t('form.submitGIFReturn') }}
            </button>
          </div>
        </div>
      </div>

      <!-- RF Repayment Form -->
      <div v-if="returnType === 'RF' && searchResult && searchResult.found" class="section">
        <h2>{{ t('form.rfRepaymentForm') }}</h2>
        
        <!-- Active RF Loans Display -->
        <div v-if="activeRFLoans.length > 0" class="rf-loans-section">
          <h3>{{ t('form.activeRFLoans') }}</h3>
          <div class="loans-list">
            <div v-for="loan in activeRFLoans" :key="loan.id" class="loan-item">
              <div class="loan-header">
                <h4>{{ loan.purpose }}</h4>
                <span :class="['status', loan.status]">{{ loan.status }}</span>
              </div>
              <div class="loan-details">
                <div class="detail-row">
                  <span class="label">{{ t('form.initialAmount') }}:</span>
                  <span class="value">LKR {{ formatCurrency(loan.amount) }}</span>
                </div>
                <div class="detail-row">
                  <span class="label">{{ t('form.currentBalance') }}:</span>
                  <span class="value">LKR {{ formatCurrency(loan.currentBalance) }}</span>
                </div>
                <div class="detail-row">
                  <span class="label">{{ t('form.initiationDate') }}:</span>
                  <span class="value">{{ formatDate(loan.initiationDate) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="alert alert-info">
          {{ t('form.noActiveRFLoans') }}
        </div>

        <!-- Payment Entry -->
        <div v-if="activeRFLoans.length > 0" class="payment-entry">
          <h3>{{ t('form.paymentEntry') }}</h3>
          
          <div class="form-row">
            <div class="form-group">
              <label for="repaymentAmount">{{ t('form.repaymentAmount') }} *</label>
              <input 
                type="number" 
                id="repaymentAmount" 
                v-model="rfData.amount" 
                class="form-control" 
                :class="{ 'error': showRFAmountError && (!rfData.amount || rfData.amount <= 0) }"
                min="0"
                step="0.01"
                required 
                @blur="validateRFAmount"
              />
              <span v-if="showRFAmountError && (!rfData.amount || rfData.amount <= 0)" class="error-message">
                {{ t('form.pleaseEnterValidAmount') }}
              </span>
            </div>
            <div class="form-group">
              <label for="billUpload">{{ t('form.billUpload') }} *</label>
              <input 
                type="file" 
                id="billUpload" 
                @change="handleBillUpload" 
                accept="image/*,.pdf"
                class="form-control"
                :class="{ 'error': showRFBillError && !rfData.billFile }"
                required
              />
              <span v-if="billError" class="error-message">{{ billError }}</span>
              <span v-if="showRFBillError && !rfData.billFile" class="error-message">
                {{ t('form.pleaseUploadBill') }}
              </span>
            </div>
          </div>

          <div v-if="billPreview" class="bill-preview">
            <h4>{{ t('form.billPreview') }}</h4>
            <div class="preview-container">
              <img v-if="billPreview.type === 'image'" :src="billPreview.url" alt="Bill Preview" class="bill-image" />
              <div v-else class="bill-pdf">
                <span>{{ t('form.pdfFile') }}: {{ billPreview.name }}</span>
                </div>
              </div>
            </div>
            
          <div class="payment-summary">
            <h4>{{ t('form.paymentSummary') }}</h4>
            <div class="summary-grid">
              <div class="summary-item">
                <span class="label">{{ t('form.totalRepayment') }}:</span>
                <span class="value">LKR {{ formatCurrency(rfData.amount || 0) }}</span>
              </div>
              <div class="summary-item">
                <span class="label">{{ t('form.totalLoans') }}:</span>
                <span class="value">{{ activeRFLoans.length }}</span>
              </div>
              <div class="summary-item">
                <span class="label">{{ t('form.totalBalance') }}:</span>
                <span class="value">LKR {{ formatCurrency(totalBalance) }}</span>
            </div>
          </div>
        </div>

          <div class="form-actions">
            <button @click="submitRFRepayment" :disabled="loading || !canSubmitRF" class="btn btn-primary">
              {{ loading ? t('form.processing') : t('form.submitRepayment') }}
            </button>
          </div>
        </div>
      </div>

      <!-- Success Message -->
      <div v-if="successMessage" class="alert alert-success">
        {{ successMessage }}
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="alert alert-error">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import { dbOperations } from '../firebase/db.js'
import { imageService } from '../services/imageService.js'
import { t } from '../i18n.ts'
import LanguageToggle from '../components/LanguageToggle.vue'
import { doc, updateDoc, serverTimestamp, collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase/index.js'
import '../styles/lang-fonts.css'

export default {
  name: 'RFGIFReturnForm',
  components: {
    LanguageToggle
  },
  setup() {
    const loading = ref(false)
    const searchInput = ref('')
    const searchResult = ref(null)
    const returnType = ref('')
    const successMessage = ref('')
    const errorMessage = ref('')
    const billError = ref('')
    const billPreview = ref(null)

    // Validation state
    const showGIFError = ref(false)
    const showRFAmountError = ref(false)
    const showRFBillError = ref(false)

    // GIF Return Data
    const gifData = reactive({
      description: ''
    })

    // RF Repayment Data
    const rfData = reactive({
      amount: '',
      billFile: null,
      billUrl: ''
    })

    // Profile and Loans Data
    const currentProfile = ref(null)
    const activeRFLoans = ref([])

    // Computed properties
    const totalBalance = computed(() => {
      return activeRFLoans.value.reduce((sum, loan) => sum + (loan.currentBalance || 0), 0)
    })

    const canSubmitRF = computed(() => {
      return rfData.amount > 0 && rfData.billFile && !loading.value
    })

    // Methods
    const searchProfile = async () => {
      if (!searchInput.value.trim()) {
        errorMessage.value = t('form.pleaseEnterNICOrRegID')
        return
      }

      loading.value = true
      errorMessage.value = ''
      successMessage.value = ''

      try {
        // Search by Reg_ID first
        let profile = await dbOperations.getProfileByRegId(searchInput.value.trim())
        
        // If not found, search by NIC
        if (!profile) {
          const q = query(collection(db, 'profiles'), where('NIC', '==', searchInput.value.trim()))
          const querySnapshot = await getDocs(q)
          if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0]
            profile = { id: doc.id, ...doc.data() }
          }
        }

        if (profile) {
          console.log('[DEBUG] Profile loaded:', profile)
          searchResult.value = { found: true, profile }
          currentProfile.value = profile
          await loadActiveRFLoans(profile.Reg_ID)
        } else {
          searchResult.value = { found: false }
          currentProfile.value = null
          activeRFLoans.value = []
        }
      } catch (error) {
        console.error('Error searching profile:', error)
        errorMessage.value = t('form.errorSearchingProfile')
      } finally {
        loading.value = false
      }
    }

    const loadActiveRFLoans = async (regId) => {
      try {
        const loans = await dbOperations.getLoans(regId)
        // Filter for active RF loans and sort by initiation date (oldest first)
        activeRFLoans.value = loans
          .filter(loan => loan.type === 'RF' && loan.status === 'active')
          .sort((a, b) => {
            const dateA = a.initiationDate?.toDate?.() || new Date(a.initiationDate)
            const dateB = b.initiationDate?.toDate?.() || new Date(b.initiationDate)
            return dateA - dateB
          })
      } catch (error) {
        console.error('Error loading RF loans:', error)
        errorMessage.value = t('form.errorLoadingLoans')
      }
    }

    const setReturnType = (type) => {
      returnType.value = type
      // Reset form data
      gifData.description = ''
      rfData.amount = ''
      rfData.billFile = null
      rfData.billUrl = ''
      billPreview.value = null
      billError.value = ''
    }

    const handleBillUpload = (event) => {
      const file = event.target.files[0]
      if (!file) return

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']
      if (!allowedTypes.includes(file.type)) {
        billError.value = t('form.invalidFileType')
        return
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        billError.value = t('form.fileTooLarge')
        return
      }

      billError.value = ''
      rfData.billFile = file

      // Create preview
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          billPreview.value = {
            type: 'image',
            url: e.target.result,
            name: file.name
          }
        }
        reader.readAsDataURL(file)
      } else {
        billPreview.value = {
          type: 'pdf',
          name: file.name
        }
      }
    }

    const submitGIFReturn = async () => {
      // Clear previous messages
      errorMessage.value = ''
      successMessage.value = ''
      
      // Validate mandatory fields
      if (!gifData.description.trim()) {
        errorMessage.value = t('form.pleaseEnterGIFDescription')
        return
      }

      loading.value = true
      errorMessage.value = ''
      successMessage.value = ''

      try {
        const regId = currentProfile.value.Reg_ID
        const now = new Date();
        const key = `${String(now.getMinutes()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getMonth() + 1).padStart(2, '0')}${now.getFullYear()}`;
        
        // Update profile with GIF return
        await dbOperations.updateProfile(regId, {
          [`GIF.${key}`]: gifData.description,
          Grant_return: true
        })

        successMessage.value = t('form.gifReturnRecorded')
        gifData.description = ''
        returnType.value = ''
      } catch (error) {
        console.error('Error submitting GIF return:', error)
        errorMessage.value = t('form.errorSubmittingGIFReturn')
      } finally {
        loading.value = false
      }
    }

    const submitRFRepayment = async () => {
      // Clear previous messages
      errorMessage.value = ''
      successMessage.value = ''
      
      // Validate mandatory fields
      console.log('[DEBUG] Repayment amount:', rfData.amount, 'Total balance:', totalBalance.value)
      if (!rfData.amount || rfData.amount <= 0) {
        errorMessage.value = t('form.pleaseEnterValidAmount')
        return
      }
      if (!rfData.billFile) {
        errorMessage.value = t('form.pleaseUploadBill')
        return
      }
      if (parseFloat(rfData.amount) > totalBalance.value) {
        errorMessage.value = t('form.overpaymentNotAllowed')
        return
      }

      loading.value = true
      errorMessage.value = ''
      successMessage.value = ''

      try {
        const regId = currentProfile.value.Reg_ID
        const repaymentAmount = parseFloat(rfData.amount)
        let remainingRepayment = repaymentAmount

        // Upload bill to Cloudinary
        const billUrl = await imageService.uploadImage(rfData.billFile, regId)

        // Apply repayment to loans (oldest first)
        for (const loan of activeRFLoans.value) {
          if (remainingRepayment <= 0) break

          const currentBalance = loan.currentBalance || 0
          const loanRef = doc(db, `profiles/${regId}/RF_Loans/${loan.id}`)

          if (remainingRepayment >= currentBalance) {
            // Full payment, mark as completed
            await updateDoc(loanRef, {
              currentBalance: 0,
              status: 'completed',
              lastUpdated: serverTimestamp(),
            })
            remainingRepayment -= currentBalance
          } else {
            // Partial payment
            await updateDoc(loanRef, {
              currentBalance: currentBalance - remainingRepayment,
              lastUpdated: serverTimestamp(),
            })
            remainingRepayment = 0
          }
        }

        // Record in RF_return_history with proper key format
        const now = new Date();
        const key = `${String(now.getMinutes()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getMonth() + 1).padStart(2, '0')}${now.getFullYear()}`;
        
        await dbOperations.updateProfile(regId, {
          [`RF_return_history.${key}`]: {
            [repaymentAmount]: billUrl
          }
        })

        // Update payment integrity
        await updatePaymentIntegrity(regId)

        successMessage.value = t('form.repaymentRecorded')
        rfData.amount = ''
        rfData.billFile = null
        rfData.billUrl = ''
        billPreview.value = null
        returnType.value = ''

        // Reload loans to show updated status
        await loadActiveRFLoans(regId)
      } catch (error) {
        console.error('Error submitting RF repayment:', error)
        errorMessage.value = t('form.errorSubmittingRepayment')
      } finally {
        loading.value = false
      }
    }

    const updatePaymentIntegrity = async (regId) => {
      try {
        // Get all RF loans
        const loans = await dbOperations.getLoans(regId)
        const rfLoans = loans.filter(loan => loan.type === 'RF')
        
        // Get return history
        const profile = await dbOperations.getProfileByRegId(regId)
        const returnHistory = profile.RF_return_history || {}

        // Calculate sums
        const sumOfRFLoans = rfLoans.reduce((sum, loan) => sum + (loan.amount || 0), 0)
        const sumOfCurrentBalances = rfLoans.reduce((sum, loan) => sum + (loan.currentBalance || 0), 0)
        
        // Calculate sum of return history with new format
        const sumOfReturnHistory = Object.values(returnHistory).reduce((sum, entry) => {
          // Handle new format: { [amount]: billUrl }
          if (typeof entry === 'object' && entry !== null) {
            // Get the amount from the object keys (amount is the key, billUrl is the value)
            const amount = Object.keys(entry)[0];
            return sum + (parseFloat(amount) || 0);
          }
          // Handle old format: { amount: number, billUrl: string }
          return sum + (entry.amount || 0);
        }, 0)

        // Check integrity
        const integrity = (sumOfReturnHistory + sumOfCurrentBalances === sumOfRFLoans)

        // Update integrity field
        await dbOperations.updateProfile(regId, {
          RF_payment_history_integrity: integrity
        })
      } catch (error) {
        console.error('Error updating payment integrity:', error)
      }
    }

    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount || 0)
    }

    const formatDate = (date) => {
      if (!date) return 'N/A'
      const dateObj = date.toDate ? date.toDate() : new Date(date)
      return dateObj.toLocaleDateString()
    }

    // Validation functions
    const validateGIFDescription = () => {
      showGIFError.value = true
    }

    const validateRFAmount = () => {
      showRFAmountError.value = true
    }

    const validateRFBill = () => {
      showRFBillError.value = true
    }

    return {
      loading,
      searchInput,
      searchResult,
      returnType,
      gifData,
      rfData,
      activeRFLoans,
      billPreview,
      billError,
      successMessage,
      errorMessage,
      totalBalance,
      canSubmitRF,
      searchProfile,
      setReturnType,
      handleBillUpload,
      submitGIFReturn,
      submitRFRepayment,
      formatCurrency,
      formatDate,
        validateGIFDescription,
        validateRFAmount,
        validateRFBill,
        showGIFError,
        showRFAmountError,
        showRFBillError,
        t
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

.logo-container {
  text-align: center;
  margin-bottom: 20px;
}

.logo {
  height: 60px;
  width: auto;
}

.form-header {
  text-align: center;
  margin-bottom: 30px;
}

.form-header h2 {
  color: #1565c0;
  margin-bottom: 10px;
}

.language-toggle {
  position: absolute;
  top: 20px;
  right: 20px;
}

.section {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 20px;
  margin-bottom: 20px;
}

.section h2 {
  color: #1565c0;
  margin-bottom: 15px;
  border-bottom: 2px solid #e3f2fd;
  padding-bottom: 10px;
}

.search-container {
  display: flex;
  gap: 10px;
}

.search-container input {
  flex: 1;
}

.profile-info {
  margin-top: 15px;
}

.profile-image-container {
  text-align: center;
  margin-bottom: 15px;
}

.profile-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #1565c0;
}

.profile-placeholder {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border: 3px solid #ddd;
  color: #666;
  font-size: 12px;
  text-align: center;
}

.return-type-selection {
  text-align: center;
}

.choice-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.choice-buttons .btn {
  min-width: 150px;
}

.btn.active {
  background-color: #0d47a1;
  transform: scale(1.05);
}

.loans-list {
  margin-top: 15px;
}

.loan-item {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  background: #fafafa;
}

.loan-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.loan-header h4 {
  margin: 0;
  color: #1565c0;
}

.status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}

.status.active {
  background: #e8f5e9;
  color: #2e7d32;
}

.status.completed {
  background: #e3f2fd;
  color: #1565c0;
}

.loan-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
}

.label {
  font-weight: 500;
  color: #666;
}

.value {
  font-weight: 600;
  color: #333;
}

.payment-entry {
  margin-top: 20px;
}

.payment-entry h3 {
  color: #1565c0;
  margin-bottom: 15px;
}

.bill-preview {
  margin-top: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
}

.bill-image {
  max-width: 200px;
  max-height: 200px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.bill-pdf {
  padding: 10px;
  background: #e3f2fd;
  border-radius: 4px;
  color: #1565c0;
}

.payment-summary {
  margin-top: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
  margin-top: 10px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-actions {
  margin-top: 20px;
  text-align: center;
}

.form-actions .btn {
  margin: 0 10px;
}

.error-message {
  color: #dc3545;
  font-size: 12px;
  margin-top: 5px;
}

.form-control.error {
  border-color: #dc3545;
  box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.2);
}

@media screen and (max-width: 768px) {
  .rfgif-return-form {
    padding: 10px;
  }
  
  .search-container {
    flex-direction: column;
  }
  
  .choice-buttons {
    flex-direction: column;
  }
  
  .loan-details {
    grid-template-columns: 1fr;
  }
  
  .summary-grid {
    grid-template-columns: 1fr;
  }
}
</style> 