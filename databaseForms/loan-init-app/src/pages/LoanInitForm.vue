<template>
  <div class="loan-init-form">
    <div class="form-container">
      <h1>WERESL Loan Initiation Form</h1>
      
      <!-- Initial Registration Status -->
      <div class="section" v-if="!registrationStatus">
        <h2>Applicant Registration Status</h2>
        <div class="registration-choice">
          <p>Is the applicant already registered in the system?</p>
          <div class="choice-buttons">
            <button @click="setRegistrationStatus('existing')" class="btn btn-primary">
              Yes, Search by RegID
            </button>
            <button @click="setRegistrationStatus('new')" class="btn btn-secondary">
              No, Register New Applicant
            </button>
          </div>
        </div>
      </div>

      <!-- RegID Lookup Section -->
      <div class="section" v-if="registrationStatus === 'existing'">
        <h2>Search Existing Applicant</h2>
        <div class="regid-lookup">
          <div class="form-group">
            <label for="regidSearch">Enter RegID:</label>
            <div class="search-container">
              <input 
                type="text" 
                id="regidSearch" 
                v-model="regidSearch" 
                placeholder="Enter RegID to search"
                class="form-control"
              />
              <button @click="searchRegID" class="btn btn-primary">Search</button>
            </div>
          </div>
          
          <div v-if="searchResult" class="search-result">
            <div v-if="searchResult.found" class="alert alert-success">
              <strong>Found existing applicant:</strong> 
              <div class="profile-info">
                <p><strong>Name:</strong> {{ searchResult.profile.name || searchResult.profile.Name || 'N/A' }}</p>
                <p><strong>RegID:</strong> {{ searchResult.profile.regId || searchResult.profile.Reg_ID || searchResult.profile.reg_id || 'N/A' }}</p>
                <p><strong>District:</strong> {{ searchResult.profile.district || searchResult.profile.District || 'N/A' }}</p>
                <p><strong>Phone:</strong> {{ searchResult.profile.phone || searchResult.profile.contact || 'N/A' }}</p>
              </div>
              <button @click="useExistingProfile" class="btn btn-secondary">Use This Profile</button>
            </div>
            <div v-else class="alert alert-warning">
              No existing profile found. Would you like to register as a new applicant?
              <button @click="setRegistrationStatus('new')" class="btn btn-secondary">Register New</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Personal Information Section -->
      <div class="section" v-if="registrationStatus === 'new' || useExisting">
        <h2>Personal Information</h2>
        <div class="form-row">
          <div class="form-group">
            <label for="name">Full Name *</label>
            <input type="text" id="name" v-model="formData.name" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="nic">NIC Number *</label>
            <input type="text" id="nic" v-model="formData.nic" class="form-control" required />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="district">District *</label>
            <select id="district" v-model="formData.district" @change="generateRegID" class="form-control" required>
              <option value="">Select District</option>
              <option v-for="district in districts" :key="district" :value="district">
                {{ district }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="regId">RegID</label>
            <input type="text" id="regId" v-model="formData.regId" class="form-control" readonly />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="address">Address *</label>
            <textarea id="address" v-model="formData.address" class="form-control" required></textarea>
          </div>
          <div class="form-group">
            <label for="phone">Phone Number *</label>
            <input type="tel" id="phone" v-model="formData.phone" class="form-control" required />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="formData.email" class="form-control" />
          </div>
          <div class="form-group">
            <label for="occupation">Occupation</label>
            <input type="text" id="occupation" v-model="formData.occupation" class="form-control" />
          </div>
        </div>
      </div>

      <!-- Image Upload Section -->
      <div class="section" v-if="registrationStatus === 'new' || useExisting">
        <h2>Document Upload</h2>
        <div class="image-upload">
          <div class="form-group">
            <label for="profileImage">Profile Photo</label>
            <input 
              type="file" 
              id="profileImage" 
              @change="handleImageUpload" 
              accept="image/*"
              class="form-control"
            />
            <div v-if="imagePreview" class="image-preview">
              <img :src="imagePreview" alt="Preview" />
            </div>
          </div>
        </div>
      </div>

      <!-- Loan Details Section -->
      <div class="section" v-if="registrationStatus === 'new' || useExisting">
        <h2>Loan Details</h2>
        <div class="form-row">
          <div class="form-group">
            <label for="loanType">Loan Type *</label>
            <select id="loanType" v-model="formData.loanType" class="form-control" required>
              <option value="">Select Loan Type</option>
              <option value="RF">RF</option>
              <option value="GRANT">GRANT</option>
            </select>
          </div>
          <div class="form-group">
            <label for="initialAmount">Initial Amount (LKR) *</label>
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
          <label for="purpose">Purpose *</label>
          <textarea 
            id="purpose" 
            v-model="formData.purpose" 
            class="form-control" 
            rows="3"
            placeholder="Enter loan purpose"
            required
          ></textarea>
        </div>

        <div class="form-group">
          <label for="projectDescription">Project Description (Optional)</label>
          <textarea 
            id="projectDescription" 
            v-model="formData.projectDescription" 
            class="form-control" 
            rows="3"
            placeholder="Enter additional project details (optional)"
          ></textarea>
        </div>


      </div>

      <!-- Submit Section -->
      <div class="section" v-if="registrationStatus === 'new' || useExisting">
        <div class="form-actions">
          <button @click="submitForm" :disabled="loading" class="btn btn-primary">
            {{ loading ? 'Submitting...' : 'Submit Loan Application' }}
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
import { imageService } from '@/services/imageService.js'

export default {
  name: 'LoanInitForm',
  setup() {
    const loading = ref(false)
    const message = ref('')
    const messageType = ref('')
    const regidSearch = ref('')
    const searchResult = ref(null)
    const useExisting = ref(false)
    const imagePreview = ref(null)
    const uploadedImageUrl = ref(null)
    const registrationStatus = ref('') // 'existing', 'new', ''

    const districts = [
      'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo',
      'Galle', 'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara',
      'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar',
      'Matale', 'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya',
      'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
    ]

    const formData = reactive({
      name: '',
      nic: '',
      district: '',
      regId: '',
      address: '',
      phone: '',
      email: '',
      occupation: '',
      loanType: '',
      initialAmount: '',
      purpose: '',
      projectDescription: ''
    })

    const showMessage = (text, type = 'info') => {
      message.value = text
      messageType.value = `alert-${type}`
      setTimeout(() => {
        message.value = ''
        messageType.value = ''
      }, 5000)
    }

    const generateRegID = async () => {
      if (formData.district) {
        try {
          console.log('🔧 Generating RegID for district:', formData.district)
          const newRegId = await dbOperations.generateRegID(formData.district)
          formData.regId = newRegId
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
        
        // Map existing data to form fields, handling different field names
        formData.name = profile.name || profile.Name || ''
        formData.nic = profile.nic || profile.NIC || ''
        formData.district = profile.district || profile.District || ''
        formData.regId = profile.regId || profile.Reg_ID || profile.reg_id || ''
        formData.address = profile.address || profile.Address || ''
        formData.phone = profile.phone || profile.contact || ''
        formData.email = profile.email || profile.Email || ''
        formData.occupation = profile.occupation || profile.Occupation || ''
        
        // If there's an existing profile image, use it
        if (profile.profileImageUrl || profile.imageUrl || profile.Image) {
          uploadedImageUrl.value = profile.profileImageUrl || profile.imageUrl || profile.Image
        }
        
        useExisting.value = true
        showMessage('Using existing profile data', 'success')
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

    const handleImageUpload = async (event) => {
      const file = event.target.files[0]
      if (!file) return

      try {
        // Show preview
        const reader = new FileReader()
        reader.onload = (e) => {
          imagePreview.value = e.target.result
        }
        reader.readAsDataURL(file)

        // Upload to Google Drive
        uploadedImageUrl.value = await imageService.uploadImage(file, 'profile-photos')
        showMessage('Image uploaded successfully', 'success')
      } catch (error) {
        showMessage('Error uploading image: ' + error.message, 'error')
      }
    }



    const validateForm = () => {
      if (!formData.name || !formData.nic || !formData.district || !formData.address || !formData.phone) {
        showMessage('Please fill in all required fields', 'error')
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
        // Create or update profile
        const profileData = {
          name: formData.name,
          nic: formData.nic,
          district: formData.district,
          regId: formData.regId,
          address: formData.address,
          phone: formData.phone,
          email: formData.email,
          occupation: formData.occupation,
          Image: uploadedImageUrl.value, // Use "Image" field name
          lastUpdated: new Date()
        }

        console.log('📝 Creating profile with data:', profileData)

        // Create profile document
        const profileRef = await dbOperations.createProfile(profileData)
        console.log('✅ Profile created successfully:', profileRef)

        // Create loan document using addLoan function
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

        showMessage('Loan application submitted successfully!', 'success')
        resetForm()
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
      message.value = ''
      registrationStatus.value = '' // Reset registration status
    }

    return {
      loading,
      message,
      messageType,
      regidSearch,
      searchResult,
      useExisting,
      imagePreview,
      registrationStatus,
      districts,
      formData,
      generateRegID,
      searchRegID,
      useExistingProfile,
      handleImageUpload,

      submitForm,
      resetForm,
      setRegistrationStatus
    }
  }
}
</script>

<style scoped>
.loan-init-form {
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

.search-result {
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