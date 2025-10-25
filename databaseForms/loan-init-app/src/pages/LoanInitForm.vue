<template>
  <div class="loan-init-form">
    <div class="logo-container">
      <img src="https://drive.google.com/thumbnail?id=1AEEWccjf_sMoXJgAaYIPZZm5rM-OCFe2" alt="We'RE SL Logo" class="logo" />
    </div>
    <div class="form-header">
      <h2>Loan Initialization Form</h2>
      <p>Register new loans for existing or new users</p>
    </div>
    <div class="language-toggle">
      <LanguageToggle />
    </div>
    <div class="form-container">
      <h1>{{ t('form.title') }}</h1>
      
      <!-- Initial Registration Status -->
      <div class="section" v-if="!registrationStatus">
        <h2>{{ t('form.registrationStatus') }}</h2>
        <div class="registration-choice">
          <p>{{ t('form.registrationQuestion') }}</p>
          <div class="choice-buttons">
            <button @click="setRegistrationStatus('existing')" class="btn btn-primary" :disabled="loading">
              <span v-if="loading" class="loading-spinner"></span>
              {{ t('form.registration.existing') }}
            </button>
            <button @click="setRegistrationStatus('new')" class="btn btn-secondary" :disabled="loading">
              <span v-if="loading" class="loading-spinner"></span>
              {{ t('form.registration.new') }}
            </button>
          </div>
        </div>
      </div>

      <!-- RegID Lookup Section -->
      <div class="section" v-if="registrationStatus === 'existing'">
        <div class="section-header">
          <h2>{{ t('form.searchExisting') }}</h2>
          <button @click="goToHome" class="btn btn-outline back-home-btn" :disabled="loading || imageUploading">
            <span v-if="loading || imageUploading" class="loading-spinner"></span>
            {{ t('form.backToHome') }}
          </button>
        </div>
        <div class="regid-lookup">
          <!-- Search Type Toggle -->
          <div class="form-group">
            <label>{{ t('form.searchType') }}</label>
            <div class="search-type-toggle">
              <button 
                @click="searchType = 'regid'" 
                :class="['btn', searchType === 'regid' ? 'btn-primary' : 'btn-secondary']"
                :disabled="searching"
              >
                {{ t('form.searchByRegID') }}
              </button>
              <button 
                @click="searchType = 'nic'" 
                :class="['btn', searchType === 'nic' ? 'btn-primary' : 'btn-secondary']"
                :disabled="searching"
              >
                {{ t('form.searchByNIC') }}
              </button>
              <button 
                @click="searchType = 'name'" 
                :class="['btn', searchType === 'name' ? 'btn-primary' : 'btn-secondary']"
                :disabled="searching"
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
                :disabled="searching"
              />
              <button @click="searchProfile" class="btn btn-primary" :disabled="searching || !searchValue.trim()">
                <span v-if="searching" class="loading-spinner"></span>
                {{ searching ? t('form.searching') : t('form.search') }}
              </button>
            </div>
          </div>
          
          <div v-if="searchResult" class="search-result">
            <div v-if="searchResult.found" class="alert alert-success">
              <strong>{{ t('form.foundApplicant') }}</strong> 
              
              <!-- Single profile result -->
              <div v-if="!Array.isArray(searchResult.profile)" class="profile-info">
                <div class="profile-image-container">
                  <img 
                    v-if="profileImageUrl || searchResult.profile[ProfileField.PROFILE_IMAGE_DRIVE_ID] || searchResult.profile.profileImageUrl || searchResult.profile.imageUrl" 
                    :src="profileImageUrl || (searchResult.profile[ProfileField.PROFILE_IMAGE_DRIVE_ID] ? convertToImageUrl(searchResult.profile[ProfileField.PROFILE_IMAGE_DRIVE_ID]) : null) || searchResult.profile.profileImageUrl || searchResult.profile.imageUrl" 
                    alt="Profile Photo" 
                    class="profile-image"
                    @error="handleImageError"
                  />
                  <div v-else class="profile-placeholder">
                    <span>{{ t('form.noProfilePhoto') }}</span>
                  </div>
                </div>
                <p><strong>{{ t('form.name') }}</strong> {{ searchResult.profile[ProfileField.FULL_NAME] || searchResult.profile.Name || 'N/A' }}</p>
                <p><strong>{{ t('form.nic') }}</strong> {{ searchResult.profile[ProfileField.NIC] || searchResult.profile.NIC || 'N/A' }}</p>
                <p><strong>{{ t('form.phone') }}</strong> {{ searchResult.profile[ProfileField.PHONE_NUMBER] || searchResult.profile.contact || 'N/A' }}</p>
                <p><strong>{{ t('form.regid') }}</strong> {{ searchResult.profile[ProfileField.REG_ID] || searchResult.profile.Reg_ID || 'N/A' }}</p>
                <p v-if="searchResult.profile.hasPendingLoan" class="pending-loan-warning">
                  <strong>⚠️ Pending Loan:</strong> This user has a pending loan request
                </p>
                <button @click="useExistingProfile" class="btn btn-primary" :disabled="loading">
                  <span v-if="loading" class="loading-spinner"></span>
                  {{ t('form.useThisProfile') }}
                </button>
              </div>

              <!-- Multiple profiles result -->
              <div v-else class="multiple-profiles">
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
                        :src="(profile[ProfileField.PROFILE_IMAGE_DRIVE_ID] ? convertToImageUrl(profile[ProfileField.PROFILE_IMAGE_DRIVE_ID]) : null) || profile.Image || profile.profileImageUrl || profile.imageUrl" 
                        alt="Profile Photo" 
                        class="profile-image-small"
                        @error="handleImageError"
                      />
                      <div v-else class="profile-placeholder-small">
                        <span>{{ t('form.noProfilePhoto') }}</span>
                      </div>
                    </div>
                    <div class="profile-details">
                      <p class="profile-name"><strong>{{ profile[ProfileField.FULL_NAME] || profile.Name || 'N/A' }}</strong></p>
                      <p class="profile-regid">{{ t('form.regid') }} {{ profile[ProfileField.REG_ID] || profile.Reg_ID || 'N/A' }}</p>
                      <p class="profile-nic">{{ t('form.nic') }} {{ profile[ProfileField.NIC] || profile.NIC || 'N/A' }}</p>
                      <p class="profile-district">{{ t('form.district') }} {{ profile[ProfileField.DISTRICT] || profile.district || profile.District || 'N/A' }}</p>
                      <p v-if="profile.hasPendingLoan" class="pending-loan-warning-small">
                        ⚠️ {{ t('form.hasPendingLoan') }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="alert alert-warning">
              {{ t('form.noProfileFound') }}
              <button @click="setRegistrationStatus('new')" class="btn btn-secondary" :disabled="loading">
                <span v-if="loading" class="loading-spinner"></span>
                {{ t('form.registerNew') }}
              </button>
            </div>
          </div>
          
          <!-- Back Button -->
          <div class="back-button-container">
            <button @click="goBack" class="btn btn-secondary" :disabled="loading">
              <span v-if="loading" class="loading-spinner"></span>
              {{ t('form.backToRegistration') }}
            </button>
          </div>
        </div>
      </div>

      <!-- Personal Information Section -->
      <div class="section" v-if="registrationStatus === 'new'">
        <div class="section-header">
          <h2>{{ t('form.personalInfo') }}</h2>
          <button @click="goToHome" class="btn btn-outline back-home-btn" :disabled="loading || imageUploading">
            <span v-if="loading || imageUploading" class="loading-spinner"></span>
            {{ t('form.backToHome') }}
          </button>
        </div>
        
        <!-- Profile Image Display and Upload for New Applicants -->
        <div class="profile-image-section">
          <div class="profile-image-container">
            <img 
              v-if="imagePreview || uploadedImageUrl" 
              :src="imagePreview || uploadedImageUrl" 
              alt="Profile Photo" 
              class="profile-image"
            />
            <div v-else class="profile-placeholder">
              <span>{{ t('form.noProfilePhoto') }}</span>
            </div>
          </div>
          <div class="form-group" style="margin-top: 10px;">
            <label for="profileImage">{{ t('form.profileImage') }} *</label>
            <input 
              type="file" 
              id="profileImage" 
              @change="handleImageUpload" 
              accept="image/*"
              class="form-control"
              :disabled="imageUploading"
              required
            />
            <small class="file-size-limit">{{ t('form.maxFileSize') }}: 10MB</small>
            <span v-if="imageError" class="error-message">{{ imageError }}</span>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="Name">{{ t('form.fullName') }}</label>
            <input type="text" id="Name" v-model="formData.Name" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="yearOfBirth">{{ t('form.yearOfBirth') }}</label>
            <input 
              type="number" 
              id="yearOfBirth" 
              v-model="formData.yearOfBirth" 
              class="form-control" 
              min="1900" 
              max="2020" 
              @input="validateYearOfBirth"
              required 
            />
            <span v-if="yearOfBirthError" class="error-message">{{ yearOfBirthError }}</span>
          </div>
        </div>

        <div class="form-group">
          <label for="address">{{ t('form.address') }}</label>
          <textarea 
            id="address" 
            v-model="formData.address" 
            class="form-control" 
            rows="3"
            required
          ></textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="NIC">{{ t('form.nicNumber') }}</label>
            <input type="text" id="NIC" v-model="formData.NIC" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="contact">{{ t('form.phoneNumber') }}</label>
            <input 
              type="tel" 
              id="contact" 
              v-model="formData.contact" 
              class="form-control" 
              @input="validatePhoneNumber"
              @keypress="onlyNumbers"
              required 
            />
            <span v-if="phoneError" class="error-message">{{ phoneError }}</span>
          </div>
        </div>

        <div class="form-group">
          <label for="occupation">{{ t('form.occupation') }}</label>
          <input type="text" id="occupation" v-model="formData.occupation" class="form-control" required />
        </div>

        <div class="form-group">
          <label for="familyBackground">{{ t('form.familyBackground') }}</label>
          <textarea 
            id="familyBackground" 
            v-model="formData.familyBackground" 
            class="form-control" 
            rows="3"
            :placeholder="t('form.familyBackgroundPlaceholder')"
            required
          ></textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="district">{{ t('form.district') }}</label>
            <select id="district" v-model="formData.district" @change="generateRegID" class="form-control" required>
              <option value="">{{ t('form.selectDistrict') }}</option>
              <option v-for="district in districts" :key="district" :value="district">
                {{ district }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="Reg_ID">{{ t('form.regidField') }}</label>
            <input type="text" id="Reg_ID" v-model="formData.Reg_ID" class="form-control" readonly />
          </div>
        </div>
      </div>

      <!-- Loan Details Section -->
      <div class="section" v-if="registrationStatus === 'new' || useExisting">
        <h2>{{ t('form.loanDetails') }}</h2>
        <div class="form-row">
          <div class="form-group">
            <label for="loanType">{{ t('form.loanType') }}</label>
            <select id="loanType" v-model="formData.loanType" class="form-control" required>
              <option value="">{{ t('form.selectLoanType') }}</option>
              <option value="RF">{{ t('form.loanType.rf') }}</option>
              <option value="GRANT">{{ t('form.loanType.grant') }}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="initialAmount">{{ t('form.initialAmount') }}</label>
            <input 
              type="number" 
              id="initialAmount" 
              v-model="formData.initialAmount" 
              class="form-control" 
              min="0"
              step="0.01"
              required 
            />
          </div>
        </div>

        <div class="form-group">
          <label for="purpose">{{ t('form.purpose') }}</label>
          <textarea 
            id="purpose" 
            v-model="formData.purpose" 
            class="form-control" 
            rows="3"
            :placeholder="t('form.purposePlaceholder')"
            required
          ></textarea>
        </div>

      </div>

      <!-- Submit Section -->
      <div class="section" v-if="registrationStatus === 'new' || useExisting">
        <div class="form-actions">
          <button @click="submitForm" :disabled="loading || imageUploading" class="btn btn-primary">
            <span v-if="loading || imageUploading" class="loading-spinner"></span>
            <span v-if="imageUploading">{{ t('form.uploadingImage') }}</span>
            <span v-else-if="loading">{{ t('form.submitting') }}</span>
            <span v-else>{{ t('form.submit') }}</span>
          </button>
          <button @click="resetForm" class="btn btn-secondary" :disabled="loading || imageUploading">
            <span v-if="loading || imageUploading" class="loading-spinner"></span>
            {{ t('form.reset') }}
          </button>
          <button @click="goToHome" class="btn btn-outline" :disabled="loading || imageUploading">
            <span v-if="loading || imageUploading" class="loading-spinner"></span>
            {{ t('form.backToHome') }}
          </button>
        </div>
      </div>

      <!-- Status Messages -->
      <div v-if="message" :class="['alert', messageType]">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { getFirestore, doc, getDoc, setDoc, collection, query, getDocs, where } from 'firebase/firestore'
import { imageService } from '@/services/imageService.js'
import { profileService } from '@/services/profile.js'
import { dbOperations } from '@/firebase/db.js'
import { t } from '../i18n';
import LanguageToggle from '../components/LanguageToggle.vue';
import { convertToImageUrl, extractFileId } from '@/utils/driveUtils.js'
import { 
  getProfileByRegId, 
  saveProfile, 
  addLoan, 
  getPendingLoans,
  generateRFLoanId,
  generateGrantLoanId,
  searchProfilesByNIC,
  searchProfilesByName
} from '@/utils/dbUtils.js'
import { generateRegIdFromDistrict } from '@/utils/regIdUtils.js'
import { DISTRICT_MAPPING } from '@/enums/districts.js'
import { RootCollection, SearchElementDoc, ProfileField, RF_LOAN_FIELD, GRANT_FIELD, ARMS } from '@/enums/db.js'

const db = getFirestore();

const loading = ref(false)
const imageUploading = ref(false)
const searching = ref(false)
const message = ref('')
const messageType = ref('')
const regidSearch = ref('')
const searchResult = ref(null)
const useExisting = ref(false)
const imagePreview = ref(null)
const uploadedImageUrl = ref(null)
const registrationStatus = ref('') // 'existing', 'new', ''
const yearOfBirthError = ref('')
const phoneError = ref('')
const imageError = ref('')
const receivers = ref([])
const searchType = ref('regid') // 'regid' or 'nic'
const searchValue = ref('')

const districts = Object.values(DISTRICT_MAPPING)

const formData = reactive({
  Name: '',
  yearOfBirth: '',
  address: '',
  NIC: '',
  contact: '',
  familyBackground: '',
  occupation: '',
  district: '',
  Reg_ID: '',
  loanType: '',
  initialAmount: '',
  purpose: '',
  source: 'wereSL' // Default source
})

// Load receivers from RF_receiver collection
const loadReceivers = async () => {
  try {
    const receiversQuery = query(collection(db, 'RF_receiver'))
    const receiversSnapshot = await getDocs(receiversQuery)
    receivers.value = receiversSnapshot.docs.map(doc => doc.id)
  } catch (error) {
    console.error('Error loading receivers:', error)
  }
}

// Load data on component mount
onMounted(() => {
  loadReceivers()
})

// Computed property to convert Google Drive URL to displayable image URL
const profileImageUrl = computed(() => {
  if (searchResult.value?.profile?.Image) {
    return convertToImageUrl(searchResult.value.profile.Image) || searchResult.value.profile.Image
  }
  return null
})

const showMessage = (text, type = 'info') => {
  message.value = text
  messageType.value = `alert-${type}`
  setTimeout(() => {
    message.value = ''
    messageType.value = ''
  }, 5000)
}

const handleImageError = (event) => {
  event.target.src = '/placeholder-profile.jpg'
}

const generateRegID = async () => {
  if (formData.district) {
    try {
      const newRegId = await generateRegIdFromDistrict(formData.district)
      formData.Reg_ID = newRegId
    } catch (error) {
      showMessage('Error generating RegID: ' + error.message, 'error')
    }
  }
}

const searchProfile = async () => {
  console.log('🔍 [LoanInitForm] Starting profile search...')
  console.log('📝 [LoanInitForm] Search type:', searchType.value)
  console.log('📝 [LoanInitForm] Search value:', searchValue.value)
  
  if (!searchValue.value.trim()) {
    console.log('❌ [LoanInitForm] Empty search value')
    showMessage('Please enter a value to search', 'error')
    return
  }

  searching.value = true
  console.log('⏳ [LoanInitForm] Search started, setting loading state')
  
  try {
    let profileResult
    
    if (searchType.value === 'regid') {
      console.log('🔍 [LoanInitForm] Searching by RegID:', searchValue.value)
      // Search by Reg_ID (case-insensitive)
      profileResult = await getProfileByRegId(searchValue.value)
    } else if (searchType.value === 'nic') {
      console.log('🔍 [LoanInitForm] Searching by NIC:', searchValue.value)
      // Search by NIC
      profileResult = await searchProfilesByNIC(searchValue.value)
    } else if (searchType.value === 'name') {
      console.log('🔍 [LoanInitForm] Searching by Name:', searchValue.value)
      // Search by Name
      profileResult = await searchProfilesByName(searchValue.value)
    } else {
      console.log('❌ [LoanInitForm] Invalid search type:', searchType.value)
      showMessage('Invalid search type', 'error')
      return
    }
    
    console.log('📊 [LoanInitForm] Search result:', profileResult)
    
    if (profileResult.success && profileResult.data) {
      const profileData = profileResult.data
      console.log('✅ [LoanInitForm] Search successful, processing results...')
      
      // Handle both single profile and multiple profiles
      if (Array.isArray(profileData)) {
        console.log('📋 [LoanInitForm] Multiple profiles found:', profileData.length)
        // Multiple profiles - check pending loan status for each
        const pendingLoansResult = await getPendingLoans()
        console.log('🔍 [LoanInitForm] Checking pending loans for', profileData.length, 'profiles')
        
        const profilesWithPendingStatus = profileData.map(profile => {
          const regId = profile[ProfileField.REG_ID] || profile.Reg_ID || profile.id
          const hasPendingLoan = pendingLoansResult.success && 
            pendingLoansResult.data.includes(regId)
          console.log('📝 [LoanInitForm] Profile', regId, 'has pending loan:', hasPendingLoan)
          return {
            ...profile,
            hasPendingLoan: hasPendingLoan
          }
        })
        
        searchResult.value = {
          found: true,
          profile: profilesWithPendingStatus
        }
        console.log('✅ [LoanInitForm] Multiple profiles processed:', profilesWithPendingStatus.length)
      } else {
        console.log('👤 [LoanInitForm] Single profile found')
        // Single profile - check pending loan status
        const regId = profileData[ProfileField.REG_ID] || profileData.Reg_ID || profileData.id
        console.log('🔍 [LoanInitForm] Checking pending loan for RegID:', regId)
        
        const pendingLoansResult = await getPendingLoans()
        const hasPendingLoan = pendingLoansResult.success && 
          pendingLoansResult.data.includes(regId)
        
        console.log('📝 [LoanInitForm] Profile', regId, 'has pending loan:', hasPendingLoan)
        
        searchResult.value = {
          found: true,
          profile: {
            ...profileData,
            hasPendingLoan: hasPendingLoan
          }
        }
        console.log('✅ [LoanInitForm] Single profile processed')
      }
      
    } else {
      console.log('❌ [LoanInitForm] No profiles found')
      searchResult.value = { found: false }
    }
  } catch (error) {
    console.error('❌ [LoanInitForm] Search error:', error)
    showMessage('Error searching for profile: ' + error.message, 'error')
  } finally {
    searching.value = false
    console.log('✅ [LoanInitForm] Search completed, loading state cleared')
  }
}

const selectProfile = (profile) => {
  console.log('👆 [LoanInitForm] Profile selected:', profile[ProfileField.FULL_NAME] || profile.Name || 'N/A')
  console.log('📝 [LoanInitForm] Selected profile RegID:', profile[ProfileField.REG_ID] || profile.Reg_ID || profile.id)
  
  // Set the selected profile as the single profile result
  searchResult.value = {
    found: true,
    profile: profile
  }
  
  console.log('✅ [LoanInitForm] Profile selection completed')
}

const useExistingProfile = () => {
  console.log('🔄 [LoanInitForm] Using existing profile...')
  
  if (searchResult.value?.profile) {
    const profile = searchResult.value.profile
    console.log('📝 [LoanInitForm] Profile data:', profile[ProfileField.FULL_NAME] || profile.Name || 'N/A')
    console.log('📝 [LoanInitForm] Profile RegID:', profile[ProfileField.REG_ID] || profile.Reg_ID || profile.id)
    
    // Map existing data to form fields, handling different field Names and providing defaults
    formData.Name = profile[ProfileField.FULL_NAME] || profile.Name || ''
    formData.yearOfBirth = profile[ProfileField.YEAR_OF_BIRTH] || profile.yearOfBirth || profile.YearOfBirth || ''
    formData.address = profile[ProfileField.ADDRESS] || profile.address || profile.Address || ''
    formData.NIC = profile[ProfileField.NIC] || profile.NIC || ''
    formData.contact = profile[ProfileField.PHONE_NUMBER] || profile.contact || ''
    formData.familyBackground = profile[ProfileField.DESCRIPTION] || profile.familyBackground || profile.FamilyBackground || ''
    formData.occupation = profile[ProfileField.OCCUPATION] || profile.occupation || profile.Occupation || ''
    formData.district = profile[ProfileField.DISTRICT] || profile.district || profile.District || ''
    formData.Reg_ID = profile[ProfileField.REG_ID] || profile.Reg_ID || profile.reg_id || profile.id || ''
    
    console.log('✅ [LoanInitForm] Form data populated from existing profile')
    
    // If there's an existing profile image, use it
    if (profile[ProfileField.PROFILE_IMAGE_DRIVE_ID] || profile.Image || profile.profileImageUrl || profile.imageUrl) {
      uploadedImageUrl.value = profile[ProfileField.PROFILE_IMAGE_DRIVE_ID] || profile.Image || profile.profileImageUrl || profile.imageUrl
      console.log('🖼️ [LoanInitForm] Profile image loaded:', uploadedImageUrl.value)
    } else {
      uploadedImageUrl.value = null
      console.log('🖼️ [LoanInitForm] No profile image found')
    }
    
    useExisting.value = true
    console.log('✅ [LoanInitForm] Existing profile loaded successfully')
    showMessage('Using existing profile data', 'success')
  } else {
    console.log('❌ [LoanInitForm] No profile data available')
    showMessage('No profile data available', 'error')
  }
}

const setRegistrationStatus = (status) => {
  registrationStatus.value = status
  if (status === 'existing') {
    searchType.value = 'regid' // Reset search type to RegID
    searchValue.value = '' // Clear search field when switching to existing
    searchResult.value = null
    useExisting.value = false
  }
}

const goBack = () => {
  registrationStatus.value = ''
  searchType.value = 'regid' // Reset search type to RegID
  searchValue.value = ''
  searchResult.value = null
  useExisting.value = false
  imagePreview.value = null
  uploadedImageUrl.value = null
  // Reset form data
  Object.keys(formData).forEach(key => {
    formData[key] = ''
  })
}

const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) {
    imageError.value = 'Profile photo is required.';
    return;
  }

  try {
    // Show preview
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)

    // Upload to Google Drive
    imageUploading.value = true; // Start upload
    uploadedImageUrl.value = await imageService.uploadImage(file, 'profile-photos')
    imageError.value = ''; // Clear error if upload is successful
    showMessage('Image uploaded successfully', 'success')
  } catch (error) {
    imageError.value = 'Error uploading image: ' + error.message;
    showMessage('Error uploading image: ' + error.message, 'error')
  } finally {
    imageUploading.value = false; // End upload
  }
}

const validateYearOfBirth = () => {
  const year = parseInt(formData.yearOfBirth);
  if (year < 1900 || year > 2020) {
    yearOfBirthError.value = 'Year of birth must be between 1900 and 2020';
    return false;
  }
  yearOfBirthError.value = '';
  return true;
};

const validatePhoneNumber = () => {
  const phone = formData.contact;
  if (phone.length > 0 && !/^\d+$/.test(phone)) {
    phoneError.value = 'Phone number must contain only numbers.';
    return false;
  }
  phoneError.value = '';
  return true;
};

const onlyNumbers = (event) => {
  const key = event.key;
  if (!/^\d$/.test(key)) {
    event.preventDefault();
  }
};

// Update validation to show which field is missing
const validateForm = () => {
  if (useExisting.value) {
    // Only validate loan fields for existing profiles
    if (!formData.loanType || !formData.initialAmount || !formData.purpose) {
      showMessage('Please fill in all loan details', 'error')
      return false
    }
    if (formData.initialAmount <= 0) {
      showMessage('Initial amount must be greater than 0', 'error')
      return false
    }
    return true
  }

  // Full validation for new profiles
  const requiredFields = [
    { key: 'Name', label: 'Full Name' },
    { key: 'yearOfBirth', label: 'Year of Birth' },
    { key: 'address', label: 'Address' },
    { key: 'NIC', label: 'NIC' },
    { key: 'contact', label: 'Contact' },
    { key: 'familyBackground', label: 'Family Background' },
    { key: 'occupation', label: 'Occupation' },
    { key: 'district', label: 'District' }
  ]
  for (const field of requiredFields) {
    if (
      formData[field.key] === '' ||
      formData[field.key] === null ||
      formData[field.key] === undefined
    ) {
      showMessage(`Please fill in the required field: ${field.label}`, 'error')
      return false
    }
  }

  // Check for profile photo - either uploaded for new users or existing for existing users
  if (registrationStatus.value === 'new' && !uploadedImageUrl.value) {
    showMessage('Please upload a profile photo', 'error')
    return false
  }

  // For existing users, check if they have an existing image or uploaded a new one
  if (useExisting.value && !uploadedImageUrl.value && !searchResult.value?.profile?.Image && !searchResult.value?.profile?.profileImageUrl && !searchResult.value?.profile?.imageUrl) {
    showMessage('Please upload a profile photo or use existing profile with photo', 'error')
    return false
  }

  // Validate year of birth
  if (!validateYearOfBirth()) {
    return false
  }

  // Validate phone number
  if (!validatePhoneNumber()) {
    return false
  }


  if (!formData.loanType || !formData.initialAmount || !formData.purpose) {
    showMessage('Please fill in all loan details', 'error')
    return false
  }

  if (formData.initialAmount <= 0) {
    showMessage('Initial amount must be greater than 0', 'error')
    return false
  }

  return true
}

const submitForm = async () => {
  if (!validateForm()) return

  loading.value = true

  try {
    let profileRef;

    if (useExisting.value) {
      // Use the existing RegID from the form/profile
      profileRef = formData.Reg_ID;
    } else {
      // New profile flow
      // 1. Check NIC uniqueness in NIC_data BEFORE RegID generation
      const nicDataRef = doc(db, RootCollection.SEARCH_ELEMENTS, SearchElementDoc.NIC_DATA)
      const nicDataSnap = await getDoc(nicDataRef)
      let nicData = nicDataSnap.exists() ? nicDataSnap.data() : {}
      if (nicData[formData.NIC]) {
        showMessage('A profile with this NIC already exists (RegID: ' + nicData[formData.NIC] + ')', 'error')
        loading.value = false
        return
      }
      // 2. Generate RegID (only if NIC is unique)
      await generateRegID()
      // 3. Create new profile
      const profileData = {
        [ProfileField.FULL_NAME]: formData.Name,
        [ProfileField.YEAR_OF_BIRTH]: parseInt(formData.yearOfBirth),
        [ProfileField.ADDRESS]: formData.address,
        [ProfileField.NIC]: formData.NIC,
        [ProfileField.PHONE_NUMBER]: formData.contact,
        [ProfileField.DESCRIPTION]: formData.familyBackground,
        [ProfileField.OCCUPATION]: formData.occupation,
        [ProfileField.DISTRICT]: formData.district,
        [ProfileField.REG_ID]: formData.Reg_ID,
        [ProfileField.PROFILE_IMAGE_DRIVE_ID]: uploadedImageUrl.value ? extractFileId(uploadedImageUrl.value) : null,
        [ProfileField.LAST_UPDATED]: new Date()
      }
      // Create profile document
      profileRef = await dbOperations.createProfile(profileData)
      // 4. Add NIC:Reg_ID to NIC_data (only for new registrations)
      const nicDataRef2 = doc(db, RootCollection.SEARCH_ELEMENTS, SearchElementDoc.NIC_DATA)
      const nicDataSnap2 = await getDoc(nicDataRef2)
      let nicData2 = nicDataSnap2.exists() ? nicDataSnap2.data() : {}
      nicData2[formData.NIC] = formData.Reg_ID
      await setDoc(nicDataRef2, nicData2)
    }

    // Generate loan ID based on loan type
    let loanId
    if (formData.loanType === 'RF') {
      loanId = await generateRFLoanId(profileRef)
    } else if (formData.loanType === 'GRANT') {
      loanId = await generateGrantLoanId(profileRef)
    } else {
      throw new Error('Invalid loan type')
    }

    // Add loan document using addLoan function with proper enum field names
    const loanData = {
      loanId: loanId,
      [RF_LOAN_FIELD.TYPE]: formData.loanType,
      [RF_LOAN_FIELD.AMOUNT]: parseFloat(formData.initialAmount),
      [RF_LOAN_FIELD.PURPOSE]: formData.purpose,
      [RF_LOAN_FIELD.INITIATION_DATE]: new Date(),
      [RF_LOAN_FIELD.STATUS]: 'pending',
      [RF_LOAN_FIELD.CURRENT_BALANCE]: parseFloat(formData.initialAmount),
      [RF_LOAN_FIELD.SOURCE]: formData.source,
      [RF_LOAN_FIELD.REG_ID]: profileRef
    }

    // Use profile service to add loan with loan type
    const loanResult = await profileService.addLoan(profileRef, loanData, formData.loanType)

    // Add pending loan information to SearchElements using LOAN_ID as field name
    const pendingLoanRef = doc(db, RootCollection.SEARCH_ELEMENTS, SearchElementDoc.PENDING_LOAN)
    const pendingLoanSnap = await getDoc(pendingLoanRef)
    let pendingLoans = pendingLoanSnap.exists() ? pendingLoanSnap.data() : {}
    
    // Add the new pending loan using LOAN_ID as the field name with proper enum field names
    pendingLoans[loanId] = {
      regId: profileRef,
      loanId: loanId,
      loanType: formData.loanType,
      [RF_LOAN_FIELD.AMOUNT]: parseFloat(formData.initialAmount),
      [RF_LOAN_FIELD.PURPOSE]: formData.purpose,
      [RF_LOAN_FIELD.INITIATION_DATE]: new Date(),
      [RF_LOAN_FIELD.STATUS]: 'pending',
    }
    
    await setDoc(pendingLoanRef, pendingLoans)

    showMessage('Loan was initiated successfully!', 'success')
    setTimeout(() => {
      resetForm()
    }, 3000)
  } catch (error) {
    showMessage('Error submitting application: ' + error.message, 'error')
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  Object.keys(formData).forEach(key => {
    if (key === 'source') {
      formData[key] = 'wereSL' // Reset to default source
    } else {
      formData[key] = ''
    }
  })
  searchType.value = 'regid' // Reset search type to RegID
  searchValue.value = ''
  searchResult.value = null
  useExisting.value = false
  imagePreview.value = null
  uploadedImageUrl.value = null
  imageError.value = ''; // Reset image error
  message.value = ''
  registrationStatus.value = '' // Reset registration status
  yearOfBirthError.value = ''
  phoneError.value = ''
}

const goToHome = () => {
  window.location.href = '/'; // Redirect to home page
}

</script>

<style scoped>
.loan-init-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.logo-container {
  text-align: center;
  margin-bottom: 20px;
}

.logo {
  max-width: 180px;
  height: auto;
  margin: 0 auto 10px auto;
  display: block;
}

.form-header {
  text-align: center;
  margin-bottom: 30px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
}

.section-header h2 {
  margin-bottom: 0;
  flex: 1;
}

.back-home-btn {
  padding: 8px 16px;
  font-size: 14px;
  min-height: 36px;
  flex-shrink: 0;
}

.form-header h2 {
  color: #1565c0;
  margin-bottom: 10px;
  font-size: 1.5rem;
}

.form-header p {
  color: #666;
  font-size: 16px;
}

.form-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  padding: 30px;
}

h1 {
  text-align: center;
  color: #1565c0;
  margin-bottom: 30px;
  font-size: 1.8rem;
}

.section {
  margin-bottom: 30px;
  padding: 24px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background: #fafafa;
}

.section h2 {
  color: #333;
  margin-bottom: 20px;
  border-bottom: 2px solid #1565c0;
  padding-bottom: 10px;
  font-size: 1.3rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
  font-size: 14px;
}

.form-control {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
  background-color: #fff;
}

.form-control:focus {
  outline: none;
  border-color: #1565c0;
  box-shadow: 0 0 0 3px rgba(21, 101, 192, 0.1);
  transform: translateY(-1px);
}

.form-control:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
  opacity: 0.7;
}

.error-message {
  color: #dc3545;
  font-size: 12px;
  margin-top: 5px;
  display: block;
}

.file-size-limit {
  color: #6c757d;
  font-size: 12px;
  margin-top: 5px;
  display: block;
}

.form-control.error {
  border-color: #dc3545;
  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
}

.search-container {
  display: flex;
  gap: 12px;
  align-items: flex-end;
}

.search-container .form-control {
  flex: 1;
}

.search-type-toggle {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
}

.search-type-toggle .btn {
  flex: 1;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.search-type-toggle .btn-primary {
  background-color: #1565c0;
  color: white;
  border: 2px solid #1565c0;
}

.search-type-toggle .btn-secondary {
  background-color: #f5f5f5;
  color: #333;
  border: 2px solid #e0e0e0;
}

.search-type-toggle .btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.search-result {
  margin-top: 20px;
}

.alert {
  padding: 16px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  border-left: 4px solid;
  font-weight: 500;
}

.alert-success {
  background-color: #e8f5e9;
  color: #2e7d32;
  border-left-color: #4caf50;
}

.alert-error {
  background-color: #ffebee;
  color: #c62828;
  border-left-color: #f44336;
}

.alert-warning {
  background-color: #fff3e0;
  color: #f57c00;
  border-left-color: #ff9800;
}

.alert-info {
  background-color: #e3f2fd;
  color: #1565c0;
  border-left-color: #2196f3;
}

.image-preview {
  margin-top: 10px;
}

.image-preview img {
  max-width: 200px;
  max-height: 200px;
  border-radius: 8px;
}

.profile-image-section {
  margin-bottom: 20px;
  text-align: center;
}

.profile-image-container {
  display: inline-block;
  width: 150px;
  height: 150px;
  border: 2px solid #ddd;
  border-radius: 50%;
  overflow: hidden;
  background-color: #f8f9fa;
  margin-bottom: 16px;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  font-size: 14px;
  text-align: center;
  padding: 10px;
}

.back-button-container {
  margin-bottom: 20px;
  text-align: left;
}

.form-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  min-height: 44px;
  position: relative;
  overflow: hidden;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

.btn-primary {
  background-color: #1565c0;
  color: white;
  box-shadow: 0 2px 4px rgba(21, 101, 192, 0.2);
}

.btn-primary:hover:not(:disabled) {
  background-color: #0d47a1;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(21, 101, 192, 0.3);
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  box-shadow: 0 2px 4px rgba(108, 117, 125, 0.2);
}

.btn-secondary:hover:not(:disabled) {
  background-color: #545b62;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(108, 117, 125, 0.3);
}

.btn-danger {
  background-color: #dc3545;
  color: white;
  box-shadow: 0 2px 4px rgba(220, 53, 69, 0.2);
}

.btn-danger:hover:not(:disabled) {
  background-color: #c82333;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(220, 53, 69, 0.3);
}

.btn-outline {
  background-color: transparent;
  border: 2px solid #1565c0;
  color: #1565c0;
  box-shadow: 0 2px 4px rgba(21, 101, 192, 0.1);
}

.btn-outline:hover:not(:disabled) {
  background-color: #e3f2fd;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(21, 101, 192, 0.2);
}

.profile-info p {
  margin-bottom: 8px;
  line-height: 1.4;
}

.registration-choice {
  text-align: center;
  padding: 24px;
  background-color: #f0f7ff;
  border: 1px solid #cce5ff;
  border-radius: 12px;
  margin-bottom: 20px;
}

.registration-choice p {
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
  font-weight: 500;
}

.choice-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.language-toggle {
  display: flex;
  justify-content: center;
  margin: 24px 0 16px 0;
}

.language-toggle .lang-toggle {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.language-toggle .lang-toggle button {
  font-size: 1.5rem;
  padding: 18px 48px;
  border-radius: 12px;
  border: 3px solid #1565c0;
  background: #f5faff;
  color: #1565c0;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  min-width: 120px;
}

.language-toggle .lang-toggle button.active, 
.language-toggle .lang-toggle button:focus {
  background: #1565c0;
  color: #fff;
}

.language-toggle .lang-toggle button:hover:not(.active) {
  background: #e3f2fd;
}

.pending-loan-warning {
  color: #f57c00;
  font-size: 14px;
  font-weight: bold;
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #fffbe6;
  border: 1px solid #ffe58f;
  border-radius: 8px;
  text-align: center;
}

/* Multiple profiles styles */
.multiple-profiles {
  margin-top: 15px;
}

.profiles-count {
  font-size: 16px;
  font-weight: 600;
  color: #1565c0;
  margin-bottom: 15px;
  text-align: center;
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
  padding: 12px 15px;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.profile-item:hover {
  background-color: #e3f2fd;
}

.profile-item:last-child {
  border-bottom: none;
}

.profile-image-container-small {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #f5f5f5;
  margin-right: 15px;
  flex-shrink: 0;
}

.profile-image-small {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-placeholder-small {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  font-size: 10px;
  text-align: center;
  padding: 5px;
}

.profile-details {
  flex: 1;
}

.profile-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 4px 0;
}

.profile-regid,
.profile-nic,
.profile-district {
  font-size: 13px;
  color: #666;
  margin: 2px 0;
}

.pending-loan-warning-small {
  color: #f57c00;
  font-size: 12px;
  font-weight: bold;
  margin: 4px 0 0 0;
}

.loading-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s linear infinite;
  flex-shrink: 0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Enhanced mobile responsiveness */
@media (max-width: 768px) {
  .loan-init-form {
    padding: 16px;
  }
  
  .form-container {
    padding: 20px;
    margin: 0 8px;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .section-header h2 {
    width: 100%;
    text-align: left;
  }
  
  .back-home-btn {
    width: 100%;
    justify-content: center;
  }
  
  .form-row {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .search-container {
    flex-direction: column;
    gap: 12px;
  }
  
  .search-container .form-control {
    width: 100%;
  }
  
  .form-actions {
    flex-direction: column;
    gap: 12px;
  }
  
  .form-actions .btn {
    width: 100%;
    margin-bottom: 8px;
  }
  
  .choice-buttons {
    flex-direction: column;
    gap: 12px;
  }
  
  .choice-buttons .btn {
    width: 100%;
  }
  
  .language-toggle .lang-toggle {
    flex-direction: column;
    gap: 12px;
  }
  
  .language-toggle .lang-toggle button {
    width: 100%;
    padding: 16px 24px;
    font-size: 1.2rem;
  }
  
  .profile-image-container {
    width: 120px;
    height: 120px;
  }
  
  .form-header h2 {
    font-size: 1.3rem;
  }
  
  h1 {
    font-size: 1.5rem;
  }
  
  .section h2 {
    font-size: 1.2rem;
  }
  
  .registration-choice {
    padding: 20px;
  }
  
  .registration-choice p {
    font-size: 16px;
  }
}

/* Extra small devices */
@media (max-width: 480px) {
  .loan-init-form {
    padding: 12px;
  }
  
  .form-container {
    padding: 16px;
    margin: 0 4px;
  }
  
  .section {
    padding: 16px;
  }
  
  .btn {
    padding: 16px 20px;
    font-size: 16px;
    min-height: 48px;
  }
  
  .form-control {
    padding: 16px;
    font-size: 16px;
  }
  
  .profile-image-container {
    width: 100px;
    height: 100px;
  }
  
  .form-header h2 {
    font-size: 1.2rem;
  }
  
  h1 {
    font-size: 1.3rem;
  }
  
  .section h2 {
    font-size: 1.1rem;
  }
}

/* Tablet styles */
@media (min-width: 769px) and (max-width: 1024px) {
  .form-row {
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  
  .form-actions {
    gap: 20px;
  }
  
  .choice-buttons {
    gap: 20px;
  }
}

/* Large screen enhancements */
@media (min-width: 1025px) {
  .btn:hover:not(:disabled) {
    transform: translateY(-2px);
  }
  
  .form-control:focus {
    transform: translateY(-2px);
  }
  
  .section:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .btn,
  .form-control,
  .loading-spinner {
    transition: none;
    animation: none;
  }
  
  .btn:hover:not(:disabled) {
    transform: none;
  }
  
  .form-control:focus {
    transform: none;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .btn {
    border: 2px solid currentColor;
  }
  
  .form-control {
    border: 2px solid currentColor;
  }
  
  .section {
    border: 2px solid currentColor;
  }
}
</style> 