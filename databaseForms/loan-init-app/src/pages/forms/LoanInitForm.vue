<template>
  <div class="loan-init-form">
    <div class="form-header">
      <h2>Loan Initialization Form</h2>
      <p>Register new loans for existing or new users</p>
    </div>

    <form @submit.prevent="handleSubmit" class="form">
      <div class="form-section">
        <h3>User Information</h3>
        
        <div class="form-group">
          <label for="registered">User Type</label>
          <select v-model="formData.registered" required>
            <option value="">Select User Type</option>
            <option value="Yes">Registered User</option>
            <option value="No">New User</option>
          </select>
        </div>

        <div v-if="formData.registered === 'Yes'" class="form-group">
          <label for="Reg_ID">Registration ID</label>
          <input 
            type="text" 
            id="Reg_ID" 
            v-model="formData.Reg_ID" 
            placeholder="Enter RegID"
            required
          />
        </div>

        <div v-if="formData.registered === 'No'" class="new-user-fields">
          <div class="form-row">
            <div class="form-group">
              <label for="Name">Full Name</label>
              <input 
                type="text" 
                id="Name" 
                v-model="formData.basicInfo.Name" 
                placeholder="Enter full Name"
                required
              />
            </div>
            <div class="form-group">
              <label for="age">Age</label>
              <input 
                type="number" 
                id="age" 
                v-model="formData.basicInfo.age" 
                placeholder="Enter age"
                min="0"
                required
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="NIC">NIC Number</label>
              <input 
                type="text" 
                id="NIC" 
                v-model="formData.basicInfo.NIC" 
                placeholder="Enter NIC number"
                required
              />
            </div>
            <div class="form-group">
              <label for="contact">Phone Number</label>
              <input 
                type="tel" 
                id="contact" 
                v-model="formData.basicInfo.contact" 
                placeholder="Enter contact number"
                required
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="district">District</label>
              <select id="district" v-model="formData.basicInfo.District" required>
                <option value="">Select District</option>
                <option v-for="district in districts" :key="district" :value="district">
                  {{ district }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="Address">Address</label>
              <textarea 
                id="Address" 
                v-model="formData.basicInfo.Address" 
                placeholder="Enter Address"
                required
              ></textarea>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="totalChildren">Total Children</label>
              <input 
                type="number" 
                id="totalChildren" 
                v-model="formData.basicInfo.totalChildren" 
                placeholder="Enter number of children"
                min="0"
                required
              />
            </div>
            <div class="form-group">
              <label for="schoolKids">School-going Children</label>
              <input 
                type="number" 
                id="schoolKids" 
                v-model="formData.basicInfo.schoolKids" 
                placeholder="Enter number of school children"
                min="0"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label for="description">Description</label>
            <textarea 
              id="description" 
              v-model="formData.description" 
              placeholder="Enter description"
              required
            ></textarea>
          </div>

          <div class="form-group">
            <label for="industry">Industry</label>
            <input 
              type="text" 
              id="industry" 
              v-model="formData.industry" 
              placeholder="Enter industry"
              required
            />
          </div>
        </div>
      </div>

      <div class="form-section">
        <h3>Loan Information</h3>
        
        <div class="form-row">
          <div class="form-group">
            <label for="loanType">Loan Type</label>
            <select id="loanType" v-model="formData.loanType" required>
              <option value="">Select Loan Type</option>
              <option value="RF">RF</option>
              <option value="GRANT">GRANT</option>
            </select>
          </div>
          <div class="form-group">
            <label for="amount">Amount (Rs.)</label>
            <input 
              type="number" 
              id="amount" 
              v-model="formData.amount" 
              placeholder="Enter amount"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label for="purpose">Purpose</label>
          <textarea 
            id="purpose" 
            v-model="formData.purpose" 
            placeholder="Enter loan purpose"
            required
          ></textarea>
        </div>

        <div class="form-group">
          <label for="projectDescription">Project Description (Optional)</label>
          <textarea 
            id="projectDescription" 
            v-model="formData.projectDescription" 
            placeholder="Enter additional project details (optional)"
          ></textarea>
        </div>
      </div>

      <div class="form-section">
        <h3>Image Upload</h3>
        
        <div class="form-group">
          <label for="image">Profile Image</label>
          <input 
            type="file" 
            id="image" 
            @change="handleImageUpload" 
            accept="image/*"
            required
          />
          <small>Supported formats: JPG, PNG, HEIC. Max size: 5MB</small>
        </div>

        <div v-if="imagePreview" class="image-preview">
          <img :src="imagePreview" alt="Preview" />
        </div>
      </div>

      <div class="form-actions">
        <button type="button" @click="resetForm" class="btn-secondary">Reset</button>
        <button type="submit" :disabled="loading" class="btn-primary">
          {{ loading ? 'Processing...' : 'Submit Loan' }}
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
import { ref, reactive } from 'vue'
import { profileService } from '@/services/profile.js'

export default {
  Name: 'LoanInitForm',
  setup() {
    const loading = ref(false)
    const error = ref(null)
    const success = ref(null)
    const imagePreview = ref(null)

    const districts = [
      'Mannar', 'Colombo', 'Batticaloa', 'Gampaha', 'Kalutara',
      'Kandy', 'Kurunegala', 'Jaffna', 'Vavuniya', 'Trincomalee',
      'Matara', 'Hambantota', 'Monaragala', 'Anuradhapura', 'Polonnaruwa',
      'Puttalam', 'Ratnapura', 'Nuwara Eliya', 'Badulla', 'Kegalle',
      'Mullaitivu', 'Matale', 'Ampara', 'Kilinochchi', 'Galle'
    ]

    const formData = reactive({
      registered: '',
      Reg_ID: '',
      basicInfo: {
        Name: '',
        age: '',
        NIC: '',
        contact: '',
        District: '',
        Address: '',
        totalChildren: '',
        schoolKids: ''
      },
      description: '',
      industry: '',
      loanType: '',
      amount: '',
      purpose: '',
      projectDescription: '',
      imageFile: null
    })

    const handleImageUpload = (event) => {
      const file = event.target.files[0]
      if (file) {
        formData.imageFile = file
        
        // Create preview
        const reader = new FileReader()
        reader.onload = (e) => {
          imagePreview.value = e.target.result
        }
        reader.readAsDataURL(file)
      }
    }

    const validateForm = () => {
      const errors = []

      if (formData.registered === 'Yes' && !formData.Reg_ID) {
        errors.push('Registration ID is required for registered users')
      }

      if (formData.registered === 'No') {
        const validationErrors = profileService.validateProfileData({ basicInfo: formData.basicInfo })
        errors.push(...validationErrors)
        
        // Check if profile photo is uploaded for new users
        if (!formData.imageFile) {
          errors.push('Please upload a profile photo')
        }
      }

      const loanValidationErrors = profileService.validateLoanData({
        type: formData.loanType,
        amount: formData.amount,
        purpose: formData.purpose
      })
      errors.push(...loanValidationErrors)

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
        const loanData = {
          type: formData.loanType,
          amount: parseFloat(formData.amount),
          purpose: formData.purpose,
          projectDescription: formData.projectDescription,
          date: new Date()
        }

        if (formData.registered === 'Yes') {
          // Add loan to existing profile
          await profileService.addLoan(formData.Reg_ID, loanData)
          success.value = `Loan added successfully to profile ${formData.Reg_ID}`
        } else {
          // Check if NIC already exists
          const allProfiles = await profileService.getProfiles();
          const nicExists = allProfiles.some(
            p => (p.basicInfo?.NIC || p.NIC) === formData.basicInfo.NIC
          );
          if (nicExists) {
            error.value = `A profile with this NIC already exists.`;
            loading.value = false;
            return;
          }
          // Create new profile with loan
          const profileData = {
            basicInfo: formData.basicInfo,
            loans: [loanData],
            imageFile: formData.imageFile
          }
          
          const Reg_ID = await profileService.createProfile(profileData)
          success.value = `New profile created successfully with RegID: ${Reg_ID}`
        }

        resetForm()
      } catch (err) {
        error.value = 'Failed to process loan: ' + err.message
      } finally {
        loading.value = false
      }
    }

    const resetForm = () => {
      Object.keys(formData).forEach(key => {
        if (key === 'basicInfo') {
          Object.keys(formData.basicInfo).forEach(basicKey => {
            formData.basicInfo[basicKey] = ''
          })
        } else {
          formData[key] = ''
        }
      })
      imagePreview.value = null
      error.value = null
      success.value = null
    }

    return {
      loading,
      error,
      success,
      districts,
      formData,
      imagePreview,
      handleImageUpload,
      handleSubmit,
      resetForm
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

.form-group small {
  color: #666;
  font-size: 12px;
  margin-top: 5px;
  display: block;
}

.new-user-fields {
  background-color: #e3f2fd;
  padding: 20px;
  border-radius: 8px;
  margin-top: 15px;
}

.image-preview {
  margin-top: 15px;
  text-align: center;
}

.image-preview img {
  max-width: 200px;
  max-height: 200px;
  border-radius: 8px;
  border: 2px solid #ddd;
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