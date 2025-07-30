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
                    v-if="profileImageUrl || searchResult.profile.profileImageUrl || searchResult.profile.imageUrl" 
                    :src="profileImageUrl || searchResult.profile.profileImageUrl || searchResult.profile.imageUrl" 
                    alt="Profile Photo" 
                    class="profile-image"
                    @error="handleImageError"
                  />
                  <div v-else class="profile-placeholder">
                    <span>{{ t('form.noProfilePhoto') }}</span>
                  </div>
                </div>
                <p><strong>{{ t('form.name') }}</strong> {{ searchResult.profile.Name || 'N/A' }}</p>
                <p><strong>{{ t('form.nic') }}</strong> {{ searchResult.profile.NIC || 'N/A' }}</p>
                <p><strong>{{ t('form.phone') }}</strong> {{ searchResult.profile.contact || 'N/A' }}</p>
                <p><strong>{{ t('form.regid') }}</strong> {{ searchResult.profile.Reg_ID || 'N/A' }}</p>
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
import { ref, reactive, computed } from 'vue'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
import { dbOperations } from '@/firebase/db.js'
import { imageService } from '@/services/imageService.js'
import { t } from '../i18n';
import LanguageToggle from '../components/LanguageToggle.vue';
import { convertToImageUrl } from '@/utils/driveUrlUtils.js'

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

const districts = [
  'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo',
  'Galle', 'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara',
  'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar',
  'Matale', 'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya',
  'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
]

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
  projectDescription: ''
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
      const newRegId = await dbOperations.generateRegID(formData.district)
      formData.Reg_ID = newRegId
      console.log('✅ RegID generated:', newRegId)
    } catch (error) {
      console.error('❌ Error generating RegID:', error)
      showMessage('Error generating RegID: ' + error.message, 'error')
    }
  }
}

const searchRegID = async () => {
  if (!regidSearch.value) {
    showMessage('Please enter a RegID to search', 'error')
    return
  }

  console.log('🔍 Starting RegID search for:', regidSearch.value)
  loading.value = true
  try {
    const profile = await dbOperations.getProfileByRegId(regidSearch.value)
    console.log('📋 Search result:', profile)
    
    searchResult.value = {
      found: !!profile,
      profile: profile || null
    }
    
    console.log('📊 Search result object:', searchResult.value)
    
    if (profile) {
      showMessage('Profile found!', 'success')
    } else {
      showMessage('No profile found with this RegID', 'warning')
    }
  } catch (error) {
    console.error('❌ Search error:', error)
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
    formData.Name = profile.Name || ''
    formData.yearOfBirth = profile.yearOfBirth || profile.YearOfBirth || ''
    formData.address = profile.address || profile.Address || ''
    formData.NIC = profile.NIC || ''
    formData.contact = profile.contact || ''
    formData.totalChildren = profile.totalChildren || profile.TotalChildren || 0
    formData.familyBackground = profile.familyBackground || profile.FamilyBackground || ''
    formData.occupation = profile.occupation || profile.Occupation || ''
    formData.district = profile.district || profile.District || ''
    formData.Reg_ID = profile.Reg_ID || profile.reg_id || profile.id || ''
    // If there's an existing profile image, use it
    if (profile.Image || profile.profileImageUrl || profile.imageUrl) {
      uploadedImageUrl.value = profile.Image || profile.profileImageUrl || profile.imageUrl
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
      const nicDataRef = doc(db, 'SearchElements', 'NIC_data')
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
        Name: formData.Name,
        yearOfBirth: parseInt(formData.yearOfBirth),
        address: formData.address,
        NIC: formData.NIC,
        contact: formData.contact,
        totalChildren: parseInt(formData.totalChildren),
        familyBackground: formData.familyBackground,
        occupation: formData.occupation,
        District: formData.district, // Changed from 'district' to 'District'
        Reg_ID: formData.Reg_ID,
        Image: uploadedImageUrl.value, // Use "Image" field Name
        lastUpdated: new Date()
      }
      console.log('📝 Creating profile with data:', profileData)
      // Create profile document
      profileRef = await dbOperations.createProfile(profileData)
      console.log('✅ Profile created successfully:', profileRef)
      // 4. Add NIC:Reg_ID to NIC_data (only for new registrations)
      const nicDataRef2 = doc(db, 'SearchElements', 'NIC_data')
      const nicDataSnap2 = await getDoc(nicDataRef2)
      let nicData2 = nicDataSnap2.exists() ? nicDataSnap2.data() : {}
      nicData2[formData.NIC] = formData.Reg_ID
      await setDoc(nicDataRef2, nicData2)
      console.log('✅ NIC_data updated:', nicData2)
    }

    // Add loan document using addLoan function
    const loanData = {
      type: formData.loanType,
      amount: parseFloat(formData.initialAmount),
      purpose: formData.purpose,
      projectDescription: formData.projectDescription,
      initiationDate: new Date(),
      status: 'active',
      currentBalance: parseFloat(formData.initialAmount)
    }

    console.log('📝 Adding loan with data:', loanData)
    console.log('📝 Profile ID for loan:', profileRef)

    // Use addLoan function instead of createLoan
    const loanResult = await dbOperations.addLoan(profileRef, loanData)
    console.log('✅ Loan added successfully:', loanResult)

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