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
          <!-- Search Type Toggle -->
          <div class="form-group">
            <label>{{ t('form.searchType') }}</label>
            <div class="search-type-toggle">
              <button 
                @click="searchType = 'regid'" 
                :class="['btn', searchType === 'regid' ? 'btn-primary' : 'btn-secondary']"
                :disabled="loading"
              >
                {{ t('form.searchByRegID') }}
              </button>
              <button 
                @click="searchType = 'nic'" 
                :class="['btn', searchType === 'nic' ? 'btn-primary' : 'btn-secondary']"
                :disabled="loading"
              >
                {{ t('form.searchByNIC') }}
              </button>
              <button 
                @click="searchType = 'name'" 
                :class="['btn', searchType === 'name' ? 'btn-primary' : 'btn-secondary']"
                :disabled="loading"
              >
                {{ t('form.searchByName') }}
              </button>
            </div>
          </div>

          <div class="form-group">
            <label :for="searchType === 'regid' ? 'regidSearch' : searchType === 'nic' ? 'nicSearch' : 'nameSearch'">
              {{ searchType === 'regid' ? t('form.enterRegID') : searchType === 'nic' ? t('form.enterNIC') : t('form.enterName') }}
            </label>
            <div class="search-container">
              <input 
                type="text" 
                :id="searchType === 'regid' ? 'regidSearch' : searchType === 'nic' ? 'nicSearch' : 'nameSearch'"
                v-model="searchValue" 
                :placeholder="searchType === 'regid' ? t('form.enterRegID') : searchType === 'nic' ? t('form.enterNIC') : t('form.enterName')"
                class="form-control"
                :disabled="loading"
                @keyup.enter="searchProfile"
              />
              <button @click="searchProfile" class="btn btn-primary" :disabled="loading || !searchValue.trim()">
                <span v-if="loading" class="loading-spinner"></span>
                {{ loading ? t('form.searching') : t('form.search') }}
              </button>
            </div>
          </div>
          
          <div v-if="searchResult" class="search-result">
            <!-- Single profile found -->
            <div v-if="searchResult.found && !Array.isArray(searchResult.profile)" class="alert alert-success">
              <strong>{{ t('form.applicantFound') }}</strong> 
              <div class="profile-info">
                <div class="profile-image-container">
                  <img 
                    v-if="profileImageUrl" 
                    :src="profileImageUrl" 
                    alt="Profile Photo" 
                    class="profile-image"
                  />
                  <div v-else class="profile-placeholder">
                    <span>{{ t('form.noProfilePhoto') }}</span>
                  </div>
                </div>
                <p><strong>{{ t('form.name') }}</strong> {{ searchResult.profile.fullName || searchResult.profile.basicInfo?.name || 'N/A' }}</p>
                <p><strong>{{ t('form.nic') }}</strong> {{ searchResult.profile.nic || searchResult.profile.basicInfo?.nic || 'N/A' }}</p>
                <p><strong>{{ t('form.phone') }}</strong> {{ searchResult.profile.phoneNumber || searchResult.profile.basicInfo?.phone || 'N/A' }}</p>
                <p><strong>{{ t('form.regid') }}</strong> {{ searchResult.profile.Reg_ID || searchResult.profile.regId || 'N/A' }}</p>
                <p><strong>{{ t('form.district') }}</strong> {{ searchResult.profile.district || searchResult.profile.basicInfo?.district || 'N/A' }}</p>
              </div>
            </div>

            <!-- Multiple profiles found -->
            <div v-else-if="Array.isArray(searchResult.profile)" class="multiple-profiles">
              <div class="profiles-list">
                <div 
                  v-for="(profile, index) in searchResult.profile" 
                  :key="profile.id || index"
                  class="profile-item"
                  @click="selectProfile(profile)"
                >
                  <div class="profile-image-container-small">
                    <img 
                      v-if="profile[ProfileField.PROFILE_IMAGE_DRIVE_ID] || profile.Image || profile.profileImageUrl || profile.imageUrl" 
                      :src="profile[ProfileField.PROFILE_IMAGE_DRIVE_ID] ? convertToImageUrl(profile[ProfileField.PROFILE_IMAGE_DRIVE_ID]) : profile.Image || profile.profileImageUrl || profile.imageUrl" 
                      alt="Profile Photo" 
                      class="profile-image-small"
                    />
                    <div v-else class="profile-placeholder-small">
                      <span>{{ t('form.noPhoto') }}</span>
                    </div>
                  </div>
                  <div class="profile-details">
                    <h4>{{ profile[ProfileField.FULL_NAME] || profile.Name || 'N/A' }}</h4>
                    <p><strong>{{ t('form.nic') }}:</strong> {{ profile[ProfileField.NIC] || profile.NIC || 'N/A' }}</p>
                    <p><strong>{{ t('form.regid') }}:</strong> {{ profile[ProfileField.REG_ID] || profile.Reg_ID || profile.id || 'N/A' }}</p>
                    <p><strong>{{ t('form.district') }}:</strong> {{ profile[ProfileField.DISTRICT] || profile.District || 'N/A' }}</p>
                    <p v-if="profile.hasPendingLoan" class="pending-loan-warning">
                      {{ t('form.hasPendingLoan') }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- No profiles found -->
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
            <button 
              @click="setReturnType('GIF')" 
              class="btn btn-secondary" 
              :class="{ active: returnType === 'GIF', disabled: !hasGrantLoans }"
              :disabled="!hasGrantLoans"
            >
              {{ t('form.gifReturn') }}
              <span v-if="!hasGrantLoans" class="disabled-hint">({{ t('form.noGrantLoans') }})</span>
            </button>
          </div>
        </div>
      </div>

      <!-- GIF Return Form -->
      <div v-if="returnType === 'GIF' && searchResult && searchResult.found && hasGrantLoans" class="section">
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
            <button @click="submitGIFReturn" :disabled="loading || !gifData.description.trim()" class="btn btn-primary">
              {{ loading ? t('form.processing') : t('form.submitGIFReturn') }}
            </button>
          </div>
        </div>
      </div>

      <!-- RF Repayment Form -->
      <div v-if="returnType === 'RF' && searchResult && searchResult.found" class="section">
        <h2>{{ t('form.rfRepaymentForm') }}</h2>
        
        <!-- Active and Completed RF Loans Display -->
        <div v-if="activeRFLoans.length > 0" class="rf-loans-section">
          <h3>{{ t('form.activeAndCompletedRFLoans') }}</h3>
          <div class="loans-list">
            <div v-for="loan in activeRFLoans" :key="loan.id" class="loan-item">
              <div class="loan-header">
                <h4>{{ loan.purpose }}</h4>
                <span :class="['status', loan.status]">{{ getStatusText(loan.status) }}</span>
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
          {{ t('form.noActiveOrCompletedRFLoans') }}
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
          </div>
          
          
          <div class="form-row">
            <div class="form-group">
              <label for="billUpload">{{ t('form.billUpload') }} *</label>
              <div class="file-upload-container">
                <input 
                  type="file" 
                  id="billUpload" 
                  @change="handleBillUpload" 
                  accept="image/*,.pdf"
                  class="file-input"
                  :class="{ 'error': showRFBillError && !rfData.billFile }"
                  required
                />
                <label for="billUpload" class="file-label">
                  <span class="file-text">{{ rfData.billFile ? rfData.billFile.name : t('form.chooseFile') }}</span>
                  <span class="file-hint">{{ t('form.noFileChosen') }}</span>
                </label>
              </div>
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
              {{ loading ? t('form.processing') : t('form.requestRepayment') }}
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
import { doc, updateDoc, serverTimestamp, collection, query, where, getDocs, setDoc } from 'firebase/firestore'
import { db } from '../firebase/index.js'
import '../styles/lang-fonts.css'

// Import enums and utils
import { 
  RootCollection, 
  ProfileField, 
  RF_LOAN_FIELD, 
  RF_RETURN_RECORD_FIELD,
  GIF_RETURN_RECORD_FIELD
} from '../enums/db.js'
import { LoanStatus, ReturnRecordStatus } from '../enums/loans.js'
import { getRFLoans, getGrantLoans, getProfileByRegId, searchProfilesByNIC, searchProfilesByName, getPendingLoans } from '../utils/dbUtils.js'
import { convertGoogleDriveUrl, extractFileId } from '../utils/driveUtils.js'
import { createTimestamp } from '../utils/regIdUtils.js'
import { sendRepaymentRequestEmail, sendGIFReturnRequestEmail, logActivity } from '../utils/gasUtils.js'
import { SuccessMessage, ErrorMessage, InfoMessage } from '../enums/messages.js'

export default {
  name: 'RFGIFReturnForm',
  components: {
    LanguageToggle
  },
  setup() {
    const loading = ref(false)
    const searchValue = ref('')
    const searchType = ref('regid')
    const searchResult = ref(null)
    const returnType = ref('')
    const successMessage = ref('')
    const errorMessage = ref('')
    const billError = ref('')
    const billPreview = ref(null)
    const profileImageUrl = ref('')

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
      receiver: 'WERESL', // Always set to WERESL
      billFile: null,
      billUrl: ''
    })

    // Profile and Loans Data
    const currentProfile = ref(null)
    const activeRFLoans = ref([])
    const grantLoans = ref([])

    // Computed properties
    const totalBalance = computed(() => {
      const balance = activeRFLoans.value.reduce((sum, loan) => {
        const currentBalance = loan[RF_LOAN_FIELD.CURRENT_BALANCE] || 0
        return sum + currentBalance
      }, 0)
      return balance
    })

    const canSubmitRF = computed(() => {
      return rfData.amount > 0 && rfData.billFile && !loading.value
    })

    const hasGrantLoans = computed(() => {
      return grantLoans.value.length > 0
    })

    // Methods
    const searchProfile = async () => {
      console.log('🔍 [RFGIFReturnForm] Starting profile search...')
      console.log('📝 [RFGIFReturnForm] Search type:', searchType.value)
      console.log('📝 [RFGIFReturnForm] Search value:', searchValue.value)
      
      if (!searchValue.value.trim()) {
        console.log('❌ [RFGIFReturnForm] Empty search value')
        errorMessage.value = t('form.pleaseEnterNICOrRegID')
        return
      }

      loading.value = true
      console.log('⏳ [RFGIFReturnForm] Search started, setting loading state')
      errorMessage.value = ''
      successMessage.value = ''

      try {
        let profileResult
        
        if (searchType.value === 'regid') {
          console.log('🔍 [RFGIFReturnForm] Searching by RegID:', searchValue.value)
          // Search by Reg_ID (case-insensitive)
          profileResult = await getProfileByRegId(searchValue.value)
        } else if (searchType.value === 'nic') {
          console.log('🔍 [RFGIFReturnForm] Searching by NIC:', searchValue.value)
          // Search by NIC
          profileResult = await searchProfilesByNIC(searchValue.value)
        } else if (searchType.value === 'name') {
          console.log('🔍 [RFGIFReturnForm] Searching by Name:', searchValue.value)
          // Search by Name
          profileResult = await searchProfilesByName(searchValue.value)
        } else {
          console.log('❌ [RFGIFReturnForm] Invalid search type:', searchType.value)
          errorMessage.value = t('form.invalidSearchType')
          return
        }
        
        console.log('📊 [RFGIFReturnForm] Search result:', profileResult)
        
        if (profileResult.success && profileResult.data) {
          const profileData = profileResult.data
          console.log('✅ [RFGIFReturnForm] Search successful, processing results...')
          
          // Handle both single profile and multiple profiles
          if (Array.isArray(profileData)) {
            console.log('📋 [RFGIFReturnForm] Array of profiles found:', profileData.length)
            
            // If only one profile found, treat it as single profile and auto-load loans
            if (profileData.length === 1) {
              console.log('👤 [RFGIFReturnForm] Single profile in array, auto-selecting...')
              const singleProfile = profileData[0]
              const regId = singleProfile[ProfileField.REG_ID] || singleProfile.Reg_ID || singleProfile.id
              console.log('🔍 [RFGIFReturnForm] Checking pending loan for RegID:', regId)
              
              const pendingLoansResult = await getPendingLoans()
              const hasPendingLoan = pendingLoansResult.success && 
                pendingLoansResult.data.includes(regId)
              
              console.log('📝 [RFGIFReturnForm] Profile', regId, 'has pending loan:', hasPendingLoan)
              
              searchResult.value = {
                found: true,
                profile: {
                  ...singleProfile,
                  hasPendingLoan: hasPendingLoan
                }
              }
              console.log('✅ [RFGIFReturnForm] Single profile processed')
              
              // Set current profile and load data
              currentProfile.value = singleProfile
              await loadProfileImage(singleProfile)
              await loadLoans(regId)
            } else {
              // Multiple profiles - check pending loan status for each
              console.log('📋 [RFGIFReturnForm] Multiple profiles found:', profileData.length)
              const pendingLoansResult = await getPendingLoans()
              console.log('🔍 [RFGIFReturnForm] Checking pending loans for', profileData.length, 'profiles')
              
              const profilesWithPendingStatus = profileData.map(profile => {
                const regId = profile[ProfileField.REG_ID] || profile.Reg_ID || profile.id
                const hasPendingLoan = pendingLoansResult.success && 
                  pendingLoansResult.data.includes(regId)
                console.log('📝 [RFGIFReturnForm] Profile', regId, 'has pending loan:', hasPendingLoan)
                return {
                  ...profile,
                  hasPendingLoan: hasPendingLoan
                }
              })
              
              searchResult.value = {
                found: true,
                profile: profilesWithPendingStatus
              }
              console.log('✅ [RFGIFReturnForm] Multiple profiles processed:', profilesWithPendingStatus.length)
            }
          } else {
            console.log('👤 [RFGIFReturnForm] Single profile found')
            // Single profile - check pending loan status
            const regId = profileData[ProfileField.REG_ID] || profileData.Reg_ID || profileData.id
            console.log('🔍 [RFGIFReturnForm] Checking pending loan for RegID:', regId)
            
            const pendingLoansResult = await getPendingLoans()
            const hasPendingLoan = pendingLoansResult.success && 
              pendingLoansResult.data.includes(regId)
            
            console.log('📝 [RFGIFReturnForm] Profile', regId, 'has pending loan:', hasPendingLoan)
            
            searchResult.value = {
              found: true,
              profile: {
                ...profileData,
                hasPendingLoan: hasPendingLoan
              }
            }
            console.log('✅ [RFGIFReturnForm] Single profile processed')
            
            // Set current profile and load data
            currentProfile.value = profileData
            await loadProfileImage(profileData)
            await loadLoans(regId)
          }
          
        } else {
          console.log('❌ [RFGIFReturnForm] No profiles found')
          searchResult.value = { found: false }
          currentProfile.value = null
          activeRFLoans.value = []
          grantLoans.value = []
          profileImageUrl.value = ''
        }
      } catch (error) {
        console.error('❌ [RFGIFReturnForm] Search error:', error)
        errorMessage.value = t('form.errorSearchingProfile')
      } finally {
        loading.value = false
        console.log('✅ [RFGIFReturnForm] Search completed, loading state cleared')
      }
    }

    const selectProfile = (profile) => {
      console.log('👆 [RFGIFReturnForm] Profile selected:', profile[ProfileField.FULL_NAME] || profile.Name || 'N/A')
      console.log('📝 [RFGIFReturnForm] Selected profile RegID:', profile[ProfileField.REG_ID] || profile.Reg_ID || profile.id)
      
      // Set the selected profile as the single profile result
      searchResult.value = {
        found: true,
        profile: profile
      }
      
      // Set current profile and load data
      currentProfile.value = profile
      loadProfileImage(profile)
      loadLoans(profile[ProfileField.REG_ID] || profile.Reg_ID || profile.id)
      
      console.log('✅ [RFGIFReturnForm] Profile selection completed')
    }

    const convertToImageUrl = (driveId) => {
      return convertGoogleDriveUrl(driveId)
    }

    const loadProfileImage = async (profile) => {
      try {
        // Check for profile image drive ID
        const imageDriveId = profile[ProfileField.PROFILE_IMAGE_DRIVE_ID]
        
        if (imageDriveId) {
          // Convert drive ID to URL using utils
          profileImageUrl.value = convertGoogleDriveUrl(imageDriveId, 'w300')
        } else {
          // Fallback to old Image field
          const oldImageUrl = profile.Image || profile.profileImageUrl || profile.imageUrl
          if (oldImageUrl) {
            const fileId = extractFileId(oldImageUrl)
            if (fileId) {
              profileImageUrl.value = convertGoogleDriveUrl(fileId, 'w300')
            } else {
              profileImageUrl.value = ''
            }
          } else {
            profileImageUrl.value = ''
          }
        }
      } catch (error) {
        console.error('Error loading profile image:', error)
        profileImageUrl.value = ''
      }
    }

    const loadLoans = async (regId) => {
      try {
        // Use utils function to get RF loans
        const loansResult = await getRFLoans(regId)
        
        if (loansResult.success) {
          // Filter for active and completed RF loans and sort by initiation date (oldest first)
          activeRFLoans.value = loansResult.data
            .filter(loan => loan[RF_LOAN_FIELD.STATUS] === LoanStatus.ACTIVE || loan[RF_LOAN_FIELD.STATUS] === LoanStatus.COMPLETED)
            .sort((a, b) => {
              const dateA = a[RF_LOAN_FIELD.INITIATION_DATE]?.toDate?.() || new Date(a[RF_LOAN_FIELD.INITIATION_DATE])
              const dateB = b[RF_LOAN_FIELD.INITIATION_DATE]?.toDate?.() || new Date(b[RF_LOAN_FIELD.INITIATION_DATE])
              return dateA - dateB
            })
          console.log('[LOAD LOANS DEBUG] Loaded RF loans:', activeRFLoans.value)
        } else {
          activeRFLoans.value = []
        }

        // Load Grant loans
        const grantLoansResult = await getGrantLoans(regId)
        if (grantLoansResult.success) {
          grantLoans.value = grantLoansResult.data
        } else {
          grantLoans.value = []
        }
      } catch (error) {
        console.error('Error loading loans:', error)
        errorMessage.value = t('form.errorLoadingLoans')
        activeRFLoans.value = []
        grantLoans.value = []
      }
    }

    const setReturnType = (type) => {
      returnType.value = type
      // Reset form data
      gifData.description = ''
      rfData.amount = ''
      rfData.receiver = 'wereSL' // Always set to WERESL
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
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
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
        const regId = currentProfile.value[ProfileField.REG_ID]
        const timestamp = createTimestamp()
        
        // Create GIF return record using enum fields
        const gifReturnRecord = {
          [GIF_RETURN_RECORD_FIELD.REG_ID]: regId,
          [GIF_RETURN_RECORD_FIELD.TIMESTAMP]: new Date(),
          [GIF_RETURN_RECORD_FIELD.STATUS]: ReturnRecordStatus.PENDING,
          [GIF_RETURN_RECORD_FIELD.DESCRIPTION]: gifData.description.trim(),
          [GIF_RETURN_RECORD_FIELD.CREATED_AT]: serverTimestamp()
        }

        // Save to GIF_return_record collection using enum
        const gifReturnRef = doc(db, RootCollection.GIF_RETURN_RECORD, timestamp)
        await setDoc(gifReturnRef, gifReturnRecord)

        // Send email notification
        try {
          await sendGIFReturnRequestEmail(currentProfile.value, {
            description: gifData.description.trim()
          })
          
          // Log activity
          await logActivity('GIF_RETURN_REQUEST_SUBMITTED', {
            regId: regId,
            description: gifData.description.trim(),
            timestamp: timestamp
          })
          
          successMessage.value = SuccessMessage.REPAYMENT_REQUEST_SUBMITTED
        } catch (emailError) {
          console.error('Error sending email notification:', emailError)
          // Still show success message even if email fails
          successMessage.value = t('form.gifReturnRecordedSuccessfully')
        }

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
      
      // Reset validation states
      showRFAmountError.value = false
      showRFBillError.value = false
      
      // Validate mandatory fields
      let hasErrors = false
      
      if (!rfData.amount || rfData.amount <= 0) {
        showRFAmountError.value = true
        hasErrors = true
      }
      
      // Set receiver to WERESL automatically
      rfData.receiver = 'WERESL'
      
      if (!rfData.billFile) {
        showRFBillError.value = true
        hasErrors = true
      }
      
      if (hasErrors) {
        errorMessage.value = t('form.pleaseCompleteAllRequiredFields')
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
        const regId = currentProfile.value[ProfileField.REG_ID]
        const repaymentAmount = parseFloat(rfData.amount)
        
        // Upload bill to Google Drive
        const billUrl = await imageService.uploadImage(rfData.billFile, regId)

        // Create timestamp for document ID using utils function
        const timestamp = createTimestamp()

        // Prepare repayment request data using enum fields
        const repaymentRequest = {
          [RF_RETURN_RECORD_FIELD.REG_ID]: regId,
          [RF_RETURN_RECORD_FIELD.TIMESTAMP]: new Date(),
          [RF_RETURN_RECORD_FIELD.STATUS]: ReturnRecordStatus.PENDING,
          [RF_RETURN_RECORD_FIELD.PAID_AMOUNT]: repaymentAmount, // Amount that was paid
          [RF_RETURN_RECORD_FIELD.TOTAL_BALANCE]: totalBalance.value, // Total balance before payment
          [RF_RETURN_RECORD_FIELD.RECEIVER]: rfData.receiver,
          [RF_RETURN_RECORD_FIELD.RECEIPT_DRIVE_LINK_ID]: billUrl,
          loans: activeRFLoans.value.map(loan => ({
            id: loan.id || '',
            purpose: loan[RF_LOAN_FIELD.PURPOSE] || '',
            amount: loan[RF_LOAN_FIELD.AMOUNT] || 0,
            currentBalance: loan[RF_LOAN_FIELD.CURRENT_BALANCE] || 0,
            initiationDate: loan[RF_LOAN_FIELD.INITIATION_DATE] || new Date(),
            status: loan[RF_LOAN_FIELD.STATUS] || 'active'
          })),
          createdAt: serverTimestamp()
        }

        // Validate all required fields are not undefined
        const requiredFields = [
          'regId', 'timestamp', 'status', 'paidAmount', 'totalBalance', 'receiver', 'receiptDriveLinkId'
        ]
        
        for (const field of requiredFields) {
          const fieldValue = repaymentRequest[RF_RETURN_RECORD_FIELD[field.toUpperCase()]] || repaymentRequest[field]
          if (fieldValue === undefined || fieldValue === null) {
            throw new Error(`Required field ${field} is undefined`)
          }
        }

        // Save to RF_return_record collection using enum
        const repaymentRef = doc(db, RootCollection.RF_RETURN_RECORD, timestamp)
        
        try {
          await setDoc(repaymentRef, repaymentRequest)
        } catch (firestoreError) {
          console.error('Firestore save error:', firestoreError)
          throw firestoreError
        }

        // Send email notification
        try {
          await sendRepaymentRequestEmail(currentProfile.value, {
            amount: repaymentAmount,
            type: 'RF',
            description: `RF Loan Repayment - ${repaymentAmount} LKR`
          })
          
          // Log activity
          await logActivity('RF_REPAYMENT_REQUEST_SUBMITTED', {
            regId: regId,
            amount: repaymentAmount,
            timestamp: timestamp
          })
          
          successMessage.value = SuccessMessage.REPAYMENT_REQUEST_SUBMITTED
        } catch (emailError) {
          console.error('Error sending email notification:', emailError)
          // Still show success message even if email fails
          successMessage.value = t('form.repaymentRequestSubmitted')
        }

        rfData.amount = ''
        rfData.receiver = 'WERESL' // Always set to WERESL
        rfData.billFile = null
        rfData.billUrl = ''
        billPreview.value = null
        returnType.value = ''
      } catch (error) {
        console.error('Error submitting RF repayment request:', error)
        errorMessage.value = t('form.errorSubmittingRepaymentRequest')
      } finally {
        loading.value = false
      }
    }

    const updatePaymentIntegrity = async (regId) => {
      try {
        // Get all RF loans using utils function
        const loansResult = await getRFLoans(regId)
        const rfLoans = loansResult.success ? loansResult.data : []
        
        // Get return history
        const profileResult = await dbOperations.getProfileByRegId(regId)
        const profile = profileResult.success ? profileResult.data : null
        const returnHistory = profile ? profile[ProfileField.RF_RETURN_HISTORY] || {} : {}

        // Calculate sums
        const sumOfRFLoans = rfLoans.reduce((sum, loan) => sum + (loan[RF_LOAN_FIELD.AMOUNT] || 0), 0)
        const sumOfCurrentBalances = rfLoans.reduce((sum, loan) => sum + (loan[RF_LOAN_FIELD.CURRENT_BALANCE] || 0), 0)
        
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

    const getStatusText = (status) => {
      switch (status) {
        case LoanStatus.ACTIVE:
          return t('form.active');
        case LoanStatus.COMPLETED:
          return t('form.completed');
        case LoanStatus.GRANTED:
          return t('form.granted');
        case LoanStatus.PENDING:
          return t('form.pending');
        default:
          return status;
      }
    };

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


    // Load receivers on component mount
    onMounted(() => {
      // Receivers loading removed - using empty string
    })

    return {
      loading,
      searchValue,
      searchType,
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
      profileImageUrl,
      ProfileField,
      RF_LOAN_FIELD,
      RF_RETURN_RECORD_FIELD,
      LoanStatus,
      ReturnRecordStatus,
      searchProfile,
      selectProfile,
      convertToImageUrl,
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
      t,
      hasGrantLoans,
      getStatusText
    }
  }
}
</script>

<style scoped>
.rfgif-return-form {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.logo-container {
  text-align: center;
  margin-bottom: 20px;
}

.logo {
  height: 120px;
  width: auto;
}

.form-header {
  text-align: center;
  margin-bottom: 20px;
}

.form-header h2 {
  color: #1565c0;
  margin-bottom: 10px;
  font-size: 2rem;
}

.language-toggle {
  display: flex;
  justify-content: center;
  margin: 20px 0 30px 0;
}

.language-toggle .lang-toggle {
  display: flex;
  gap: 15px;
  background: rgba(255, 255, 255, 0.95);
  padding: 12px 20px;
  border-radius: 30px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  border: 2px solid #e3f2fd;
}

.language-toggle .lang-toggle button {
  font-size: 1.3rem;
  padding: 15px 30px;
  border-radius: 25px;
  border: 2px solid #1565c0;
  background: #f5faff;
  color: #1565c0;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 100px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.language-toggle .lang-toggle button.active, 
.language-toggle .lang-toggle button:focus {
  background: #1565c0;
  color: #fff;
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(21, 101, 192, 0.3);
}

.language-toggle .lang-toggle button:hover:not(.active) {
  background: #e3f2fd;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(21, 101, 192, 0.2);
}

.section {
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  padding: 25px;
  margin-bottom: 25px;
  border: 1px solid #e8f4fd;
}

.section h2 {
  color: #1565c0;
  margin-bottom: 20px;
  border-bottom: 3px solid #e3f2fd;
  padding-bottom: 15px;
  font-size: 1.5rem;
  font-weight: 600;
}

.search-container {
  display: flex;
  gap: 15px;
}

.search-container input {
  flex: 1;
}

.profile-info {
  margin-top: 20px;
}

.profile-image-container {
  text-align: center;
  margin-bottom: 20px;
}

.profile-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #1565c0;
  box-shadow: 0 4px 12px rgba(21, 101, 192, 0.2);
}

.profile-placeholder {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border: 4px solid #ddd;
  color: #666;
  font-size: 14px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.return-type-selection {
  text-align: center;
}

.choice-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.choice-buttons .btn {
  min-width: 180px;
  padding: 15px 25px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
}

.btn.active {
  background-color: #0d47a1;
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(13, 71, 161, 0.3);
}

.btn.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: #ccc;
  color: #666;
}

.disabled-hint {
  font-size: 0.8rem;
  opacity: 0.8;
  display: block;
  margin-top: 5px;
}

.loans-list {
  margin-top: 20px;
}

.loan-item {
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  background: #fafafa;
  transition: all 0.3s ease;
}

.loan-item:hover {
  border-color: #1565c0;
  box-shadow: 0 4px 12px rgba(21, 101, 192, 0.1);
}

.loan-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.loan-header h4 {
  margin: 0;
  color: #1565c0;
  font-size: 1.2rem;
  font-weight: 600;
}

.status {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status.active {
  background: #e8f5e9;
  color: #2e7d32;
  border: 1px solid #4caf50;
}

.status.completed {
  background: #e3f2fd;
  color: #1565c0;
  border: 1px solid #2196f3;
}

.status.pending {
  background: #fff3e0;
  color: #f57c00;
  border: 1px solid #ff9800;
}

.status.granted {
  background: #f3e5f5;
  color: #7b1fa2;
  border: 1px solid #9c27b0;
}

.loan-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.detail-row:last-child {
  border-bottom: none;
}

.label {
  font-weight: 600;
  color: #555;
  font-size: 0.95rem;
}

.value {
  font-weight: 700;
  color: #333;
  font-size: 1rem;
}

.payment-entry {
  margin-top: 25px;
}

.payment-entry h3 {
  color: #1565c0;
  margin-bottom: 20px;
  font-size: 1.3rem;
  font-weight: 600;
}

.bill-preview {
  margin-top: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 2px solid #e3f2fd;
}

.bill-image {
  max-width: 250px;
  max-height: 250px;
  border-radius: 8px;
  border: 2px solid #ddd;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.bill-pdf {
  padding: 15px;
  background: #e3f2fd;
  border-radius: 8px;
  color: #1565c0;
  font-weight: 600;
  border: 2px solid #bbdefb;
}

.payment-summary {
  margin-top: 25px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 2px solid #e3f2fd;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 15px;
  margin-top: 15px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.form-actions {
  margin-top: 25px;
  text-align: center;
}

.form-actions .btn {
  margin: 0 10px;
  padding: 15px 30px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.error-message {
  color: #dc3545;
  font-size: 0.9rem;
  margin-top: 8px;
  font-weight: 500;
}

.form-control.error {
  border-color: #dc3545;
  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
}

.file-upload-container {
  position: relative;
  overflow: hidden;
  display: inline-block;
  width: 100%;
}

.file-input {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 100%;
  min-height: 100%;
  font-size: 999px;
  opacity: 0;
  cursor: pointer;
  z-index: 1;
}

.file-label {
  display: inline-block;
  padding: 12px 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  cursor: pointer;
  color: #333;
  font-size: 14px;
  transition: all 0.3s ease;
  border: 2px solid #e0e0e0;
  width: 100%;
  box-sizing: border-box;
  text-align: left;
  padding-right: 40px;
  position: relative;
}

.file-label:hover {
  background-color: #e3f2fd;
  border-color: #1565c0;
}

.file-label::after {
  content: '📁';
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
}

.file-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 10px;
  font-weight: 500;
}

.file-hint {
  font-size: 12px;
  color: #666;
  margin-left: 5px;
  opacity: 0.8;
}

@media screen and (max-width: 768px) {
  .rfgif-return-form {
    padding: 15px;
  }
  
  .logo {
    height: 100px;
  }
  
  .form-header h2 {
    font-size: 1.5rem;
  }
  
  .language-toggle {
    margin: 15px 0 25px 0;
  }
  
  .language-toggle .lang-toggle {
    justify-content: center;
    padding: 10px 15px;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .language-toggle .lang-toggle button {
    font-size: 1.1rem;
    padding: 12px 20px;
    min-width: 80px;
  }
  
  .search-container {
    flex-direction: column;
  }
  
  .choice-buttons {
    flex-direction: column;
    gap: 15px;
  }
  
  .choice-buttons .btn {
    min-width: 100%;
  }
  
  .loan-details {
    grid-template-columns: 1fr;
  }
  
  .summary-grid {
    grid-template-columns: 1fr;
  }
  
  .profile-image,
  .profile-placeholder {
    width: 100px;
    height: 100px;
  }
  
  .bill-image {
    max-width: 200px;
    max-height: 200px;
  }
  
  .section {
    padding: 20px;
  }
  
  .form-actions .btn {
    margin: 5px;
    padding: 12px 20px;
    font-size: 1rem;
  }
}

/* Search type toggle styles */
.search-type-toggle {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.search-type-toggle .btn {
  flex: 1;
  padding: 10px 15px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
}

/* Multiple profiles styles */
.multiple-profiles {
  margin-top: 15px;
}

.profiles-list {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fafafa;
}

.profile-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.profile-item:hover {
  background-color: #e3f2fd;
  border-left: 4px solid #1565c0;
}

.profile-item:last-child {
  border-bottom: none;
}

.profile-image-container-small {
  margin-right: 15px;
}

.profile-image-small {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #1565c0;
}

.profile-placeholder-small {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #ddd;
  color: #666;
  font-size: 12px;
  text-align: center;
}

.profile-details {
  flex: 1;
}

.profile-details h4 {
  margin: 0 0 8px 0;
  color: #1565c0;
  font-size: 1.1rem;
  font-weight: 600;
}

.profile-details p {
  margin: 4px 0;
  font-size: 0.9rem;
  color: #555;
}

.pending-loan-warning {
  color: #f57c00;
  font-size: 12px;
  font-weight: bold;
  margin-top: 8px;
  padding: 4px 8px;
  background-color: #fffbe6;
  border: 1px solid #ffe58f;
  border-radius: 4px;
  text-align: center;
}
</style> 