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
            <button @click="setRegistrationStatus('existing')" class="btn btn-primary">
              {{ t('form.registration.existing') }}
            </button>
            <button @click="setRegistrationStatus('new')" class="btn btn-secondary">
              {{ t('form.registration.new') }}
            </button>
          </div>
        </div>
      </div>

      <!-- RegID Lookup Section -->
      <div class="section" v-if="registrationStatus === 'existing'">
        <h2>{{ t('form.searchExisting') }}</h2>
        <div class="regid-lookup">
          <div class="form-group">
            <label for="regidSearch">{{ t('form.enterRegID') }}</label>
            <div class="search-container">
              <input 
                type="text" 
                id="regidSearch" 
                v-model="regidSearch" 
                :placeholder="t('form.enterRegID')"
                class="form-control"
              />
              <button @click="searchRegID" class="btn btn-primary">{{ t('form.search') }}</button>
            </div>
          </div>
          
          <div v-if="searchResult" class="search-result">
            <div v-if="searchResult.found" class="alert alert-success">
              <strong>{{ t('form.foundApplicant') }}</strong> 
              <div class="profile-info">
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
              </div>
              <button @click="useExistingProfile" class="btn btn-primary">{{ t('form.useThisProfile') }}</button>
            </div>
            <div v-else class="alert alert-warning">
              {{ t('form.noProfileFound') }}
              <button @click="setRegistrationStatus('new')" class="btn btn-secondary">{{ t('form.registerNew') }}</button>
            </div>
          </div>
          
          <!-- Back Button -->
          <div class="back-button-container">
            <button @click="goBack" class="btn btn-secondary">{{ t('form.backToRegistration') }}</button>
          </div>
        </div>
      </div>

      <!-- Personal Information Section -->
      <div class="section" v-if="registrationStatus === 'new'">
        <h2>{{ t('form.personalInfo') }}</h2>
        
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
              required
            />
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

        <div class="form-row">
          <div class="form-group">
            <label for="totalChildren">{{ t('form.totalChildren') }}</label>
            <input 
              type="number" 
              id="totalChildren" 
              v-model="formData.totalChildren" 
              class="form-control" 
              min="0" 
              required 
            />
          </div>
          <div class="form-group">
            <label for="occupation">{{ t('form.occupation') }}</label>
            <input type="text" id="occupation" v-model="formData.occupation" class="form-control" required />
          </div>
        </div>

        <div class="form-group">
          <label for="familyBackground">{{ t('form.familyBackground') }}</label>
          <textarea 
            id="familyBackground" 
            v-model="formData.familyBackground" 
            class="form-control" 
            rows="3"
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
          <div class="form-group">
            <label for="source">{{ t('form.source') }}</label>
            <select id="source" v-model="formData.source" class="form-control">
              <option value="">{{ t('form.selectSource') }}</option>
              <option v-for="account in bankAccounts" :key="account" :value="account">
                {{ account }}
              </option>
            </select>
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

        <div class="form-group">
          <label for="projectDescription">{{ t('form.projectDescription') }}</label>
          <textarea 
            id="projectDescription" 
            v-model="formData.projectDescription" 
            class="form-control" 
            rows="3"
            :placeholder="t('form.projectDescriptionPlaceholder')"
          ></textarea>
        </div>


      </div>

      <!-- Submit Section -->
      <div class="section" v-if="registrationStatus === 'new' || useExisting">
        <div class="form-actions">
          <button @click="submitForm" :disabled="loading" class="btn btn-primary">
            {{ loading ? t('form.submitting') : t('form.submit') }}
          </button>
          <button @click="resetForm" class="btn btn-secondary">{{ t('form.reset') }}</button>
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
  generateGrantLoanId
} from '@/utils/dbUtils.js'
import { generateRegIdFromDistrict } from '@/utils/regIdUtils.js'
import { DISTRICT_MAPPING } from '@/enums/districts.js'
import { RootCollection, SearchElementDoc, ProfileField, RF_LOAN_FIELD, GRANT_FIELD } from '@/enums/db.js'

const db = getFirestore();

const loading = ref(false)
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
const bankAccounts = ref([])

const districts = Object.values(DISTRICT_MAPPING)

const formData = reactive({
  Name: '',
  yearOfBirth: '',
  address: '',
  NIC: '',
  contact: '',
  totalChildren: '',
  familyBackground: '',
  occupation: '',
  district: '',
  Reg_ID: '',
  loanType: '',
  initialAmount: '',
  purpose: '',
  projectDescription: '',
  source: ''
})

// Load receivers from RF_receiver collection
const loadReceivers = async () => {
  try {
    const receiversQuery = query(collection(db, 'RF_receiver'))
    const receiversSnapshot = await getDocs(receiversQuery)
    receivers.value = receiversSnapshot.docs.map(doc => doc.id)
    console.log('Loaded receivers:', receivers.value)
  } catch (error) {
    console.error('Error loading receivers:', error)
  }
}

// Load bank accounts from bank_accounts collection
const loadBankAccounts = async () => {
  try {
    const bankAccountsQuery = query(collection(db, RootCollection.BANK_ACCOUNTS))
    const bankAccountsSnapshot = await getDocs(bankAccountsQuery)
    bankAccounts.value = bankAccountsSnapshot.docs.map(doc => doc.id)
    console.log('Loaded bank accounts:', bankAccounts.value)
  } catch (error) {
    console.error('Error loading bank accounts:', error)
  }
}

// Load data on component mount
onMounted(() => {
  loadReceivers()
  loadBankAccounts()
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
  console.log('Image failed to load, using placeholder')
  event.target.src = '/placeholder-profile.jpg'
}

const generateRegID = async () => {
  if (formData.district) {
    try {
      console.log('🔧 Generating RegID for district:', formData.district)
      const newRegId = await generateRegIdFromDistrict(formData.district)
      formData.Reg_ID = newRegId
      console.log('✅ RegID generated:', newRegId)
    } catch (error) {
      console.error('❌ Error generating RegID:', error)
      showMessage('Error generating RegID: ' + error.message, 'error')
    }
  }
}

const searchRegID = async () => {
  if (!regidSearch.value.trim()) {
    showMessage('Please enter a RegID to search', 'error')
    return
  }

  loading.value = true
  try {
    console.log('🔍 Searching for RegID:', regidSearch.value)
    
    // Use centralized utility to get profile
    const profileResult = await getProfileByRegId(regidSearch.value)
    
    if (profileResult.success && profileResult.data) {
      const profileData = profileResult.data
      
      // Check pending loan status
      const pendingLoansResult = await getPendingLoans()
      const hasPendingLoan = pendingLoansResult.success && 
        pendingLoansResult.data.includes(regidSearch.value)
      
      searchResult.value = {
        found: true,
        profile: {
          ...profileData,
          hasPendingLoan: hasPendingLoan
        }
      }
      
      console.log('✅ Profile found:', profileData)
      console.log('📝 Pending loan status:', hasPendingLoan)
    } else {
      searchResult.value = { found: false }
      console.log('❌ No profile found with RegID:', regidSearch.value)
    }
  } catch (error) {
    console.error('❌ Error searching for RegID:', error)
    showMessage('Error searching for profile: ' + error.message, 'error')
  } finally {
    loading.value = false
  }
}

const useExistingProfile = () => {
  if (searchResult.value?.profile) {
    const profile = searchResult.value.profile
    console.log('📋 Using existing profile data:', profile)
    // Map existing data to form fields, handling different field Names and providing defaults
    formData.Name = profile[ProfileField.FULL_NAME] || profile.Name || ''
    formData.yearOfBirth = profile[ProfileField.YEAR_OF_BIRTH] || profile.yearOfBirth || profile.YearOfBirth || ''
    formData.address = profile[ProfileField.ADDRESS] || profile.address || profile.Address || ''
    formData.NIC = profile[ProfileField.NIC] || profile.NIC || ''
    formData.contact = profile[ProfileField.PHONE_NUMBER] || profile.contact || ''
    formData.totalChildren = profile[ProfileField.TOTAL_CHILDREN] || profile.totalChildren || profile.TotalChildren || 0
    formData.familyBackground = profile[ProfileField.DESCRIPTION] || profile.familyBackground || profile.FamilyBackground || ''
    formData.occupation = profile[ProfileField.OCCUPATION] || profile.occupation || profile.Occupation || ''
    formData.district = profile[ProfileField.DISTRICT] || profile.district || profile.District || ''
    formData.Reg_ID = profile[ProfileField.REG_ID] || profile.Reg_ID || profile.reg_id || profile.id || ''
    // If there's an existing profile image, use it
    if (profile[ProfileField.PROFILE_IMAGE_DRIVE_ID] || profile.Image || profile.profileImageUrl || profile.imageUrl) {
      uploadedImageUrl.value = profile[ProfileField.PROFILE_IMAGE_DRIVE_ID] || profile.Image || profile.profileImageUrl || profile.imageUrl
      console.log('📸 Setting profile image URL:', uploadedImageUrl.value)
    } else {
      uploadedImageUrl.value = null
      console.log('📸 No existing profile image found')
    }
    useExisting.value = true
    showMessage('Using existing profile data', 'success')
    // Debug log for all fields
    console.log('📝 Mapped formData:', JSON.parse(JSON.stringify(formData)))
  }
}

const setRegistrationStatus = (status) => {
  registrationStatus.value = status
  if (status === 'existing') {
    regidSearch.value = '' // Clear search field when switching to existing
    searchResult.value = null
    useExisting.value = false
  }
}

const goBack = () => {
  registrationStatus.value = ''
  regidSearch.value = ''
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
    uploadedImageUrl.value = await imageService.uploadImage(file, 'profile-photos')
    imageError.value = ''; // Clear error if upload is successful
    showMessage('Image uploaded successfully', 'success')
  } catch (error) {
    imageError.value = 'Error uploading image: ' + error.message;
    showMessage('Error uploading image: ' + error.message, 'error')
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
  console.log('🔍 Validating form...')
  console.log('📋 Form data:', formData)
  console.log('📸 Uploaded image URL:', uploadedImageUrl.value)
  console.log('🔍 Registration status:', registrationStatus.value)
  console.log('🔍 Use existing:', useExisting.value)
  console.log('🔍 Search result profile:', searchResult.value?.profile)

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
    { key: 'totalChildren', label: 'Total Children' },
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
      console.log(`❌ Form validation failed: missing field ${field.key}`)
      showMessage(`Please fill in the required field: ${field.label}`, 'error')
      return false
    }
  }

  // Check for profile photo - either uploaded for new users or existing for existing users
  if (registrationStatus.value === 'new' && !uploadedImageUrl.value) {
    console.log('❌ Form validation failed: no image uploaded for new user')
    showMessage('Please upload a profile photo', 'error')
    return false
  }

  // For existing users, check if they have an existing image or uploaded a new one
  if (useExisting.value && !uploadedImageUrl.value && !searchResult.value?.profile?.Image && !searchResult.value?.profile?.profileImageUrl && !searchResult.value?.profile?.imageUrl) {
    console.log('❌ Form validation failed: no image for existing user')
    showMessage('Please upload a profile photo or use existing profile with photo', 'error')
    return false
  }

  console.log('✅ Form validation passed')

  // Validate year of birth
  if (!validateYearOfBirth()) {
    return false
  }

  // Validate phone number
  if (!validatePhoneNumber()) {
    return false
  }

  // Validate total children
  const childrenCount = parseInt(formData.totalChildren)
  if (childrenCount < 0) {
    showMessage('Total number of children cannot be negative', 'error')
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
  console.log('🚀 Starting form submission...')

  try {
    let profileRef;

    if (useExisting.value) {
      // Use the existing RegID from the form/profile
      profileRef = formData.Reg_ID;
      console.log('📝 Using existing profile with Reg_ID:', profileRef);
    } else {
      // New profile flow
      // 1. Check NIC uniqueness in NIC_data BEFORE RegID generation
      const nicDataRef = doc(db, RootCollection.SEARCH_ELEMENTS, SearchElementDoc.NIC_DATA)
      const nicDataSnap = await getDoc(nicDataRef)
      let nicData = nicDataSnap.exists() ? nicDataSnap.data() : {}
      console.log('🔍 Checking NIC_data for NIC:', formData.NIC)
      if (nicData[formData.NIC]) {
        showMessage('A profile with this NIC already exists (RegID: ' + nicData[formData.NIC] + ')', 'error')
        loading.value = false
        return
      }
      // 2. Generate RegID (only if NIC is unique)
      await generateRegID()
      console.log('✅ RegID generated:', formData.Reg_ID)
      // 3. Create new profile
      const profileData = {
        [ProfileField.FULL_NAME]: formData.Name,
        [ProfileField.YEAR_OF_BIRTH]: parseInt(formData.yearOfBirth),
        [ProfileField.ADDRESS]: formData.address,
        [ProfileField.NIC]: formData.NIC,
        [ProfileField.PHONE_NUMBER]: formData.contact,
        [ProfileField.TOTAL_CHILDREN]: parseInt(formData.totalChildren),
        [ProfileField.DESCRIPTION]: formData.familyBackground,
        [ProfileField.OCCUPATION]: formData.occupation,
        [ProfileField.DISTRICT]: formData.district,
        [ProfileField.REG_ID]: formData.Reg_ID,
        [ProfileField.PROFILE_IMAGE_DRIVE_ID]: uploadedImageUrl.value ? extractFileId(uploadedImageUrl.value) : null,
        [ProfileField.LAST_UPDATED]: new Date()
      }
      console.log('📝 Creating profile with data:', profileData)
      // Create profile document
      profileRef = await dbOperations.createProfile(profileData)
      console.log('✅ Profile created successfully:', profileRef)
      // 4. Add NIC:Reg_ID to NIC_data (only for new registrations)
      const nicDataRef2 = doc(db, RootCollection.SEARCH_ELEMENTS, SearchElementDoc.NIC_DATA)
      const nicDataSnap2 = await getDoc(nicDataRef2)
      let nicData2 = nicDataSnap2.exists() ? nicDataSnap2.data() : {}
      nicData2[formData.NIC] = formData.Reg_ID
      await setDoc(nicDataRef2, nicData2)
      console.log('✅ NIC_data updated:', nicData2)
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
      [RF_LOAN_FIELD.PROJECT_DESCRIPTION]: formData.projectDescription,
      [RF_LOAN_FIELD.INITIATION_DATE]: new Date(),
      [RF_LOAN_FIELD.STATUS]: 'pending',
      [RF_LOAN_FIELD.CURRENT_BALANCE]: parseFloat(formData.initialAmount),
      [RF_LOAN_FIELD.SOURCE]: formData.source,
      [RF_LOAN_FIELD.REG_ID]: profileRef
    }

    console.log('📝 Adding loan with data:', loanData)
    console.log('📝 Profile ID for loan:', profileRef)
    console.log('📝 Generated loan ID:', loanId)

    // Use profile service to add loan with loan type
    const loanResult = await profileService.addLoan(profileRef, loanData, formData.loanType)
    console.log('✅ Loan added successfully:', loanResult)

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
      [RF_LOAN_FIELD.STATUS]: 'pending'
    }
    
    await setDoc(pendingLoanRef, pendingLoans)
    console.log('✅ Pending loan added to SearchElements with LOAN_ID as field name:', pendingLoans)

    showMessage('Loan was initiated successfully!', 'success')
    setTimeout(() => {
      resetForm()
    }, 3000)
  } catch (error) {
    console.error('❌ Error submitting application:', error)
    showMessage('Error submitting application: ' + error.message, 'error')
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  Object.keys(formData).forEach(key => {
    formData[key] = ''
  })
  regidSearch.value = ''
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

.form-header h2 {
  color: #1565c0;
  margin-bottom: 10px;
}

.form-header p {
  color: #666;
  font-size: 16px;
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
  grid-template-columns: 1fr 1fr 1fr; /* Changed to 3 columns */
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

.error-message {
  color: #dc3545;
  font-size: 12px;
  margin-top: 5px;
  display: block;
}

.form-control.error {
  border-color: #dc3545;
}

.search-container {
  display: flex;
  gap: 10px;
}

.search-container .form-control {
  flex: 1;
}

.search-result {
  margin-top: 15px;
}

.alert {
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.alert-success {
  background-color: #4caf50;
  color: #fff;
  border: 1px solid #388e3c;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
}

.alert-error {
  background-color: #ffebee;
  color: #c62828;
  border: 1px solid #ffcdd2;
}

.alert-warning {
  background-color: #fff3e0;
  color: #f57c00;
  border: 1px solid #ffcc02;
}

.alert-info {
  background-color: #e3f2fd;
  color: #1565c0;
  border: 1px solid #bbdefb;
}

.image-preview {
  margin-top: 10px;
}

.image-preview img {
  max-width: 200px;
  max-height: 200px;
  border-radius: 5px;
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

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
}

.profile-info p {
  margin-bottom: 5px;
}

.registration-choice {
  text-align: center;
  padding: 20px;
  background-color: #f0f7ff;
  border: 1px solid #cce5ff;
  border-radius: 8px;
  margin-bottom: 20px;
}

.registration-choice p {
  font-size: 18px;
  color: #333;
  margin-bottom: 15px;
}

.choice-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.language-toggle {
  display: flex;
  justify-content: center;
  margin: 24px 0 16px 0;
}
.language-toggle .lang-toggle {
  display: flex;
  gap: 20px;
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
.language-toggle .lang-toggle button.active, .language-toggle .lang-toggle button:focus {
  background: #1565c0;
  color: #fff;
}
.language-toggle .lang-toggle button:hover:not(.active) {
  background: #e3f2fd;
}

.pending-loan-warning {
  color: #f57c00; /* Orange color for warning */
  font-size: 14px;
  font-weight: bold;
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #fffbe6; /* Light yellow background */
  border: 1px solid #ffe58f; /* Light orange border */
  border-radius: 5px;
  text-align: center;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .search-container {
    flex-direction: column;
  }
  
  .form-actions {
    flex-direction: column;
  }
}
</style> 