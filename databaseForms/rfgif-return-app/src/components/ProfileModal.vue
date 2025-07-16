<template>
  <div v-if="isVisible && profile" class="modal" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="close-button" @click="closeModal">&times;</div>
      
      <div class="modal-header">
        <h2>{{ profile.basicInfo?.name || 'Unknown' }}</h2>
        <div class="profile-types">
          <span 
            v-for="type in profileTypes" 
            :key="type"
            :class="`profile-type ${type.toLowerCase()}-type`"
          >
            {{ type }}
          </span>
        </div>
      </div>

      <div class="modal-body">
        <div class="profile-image-section">
          <img 
            :src="profileImageUrl" 
            :alt="profile.basicInfo?.name || 'Profile Image'"
            @error="handleImageError"
            @load="handleImageLoad"
            class="profile-image"
          />
        </div>
        
        <div class="basic-info">
          <h3>Basic Information</h3>
          <div class="info-grid">
            <div class="info-item">
              <strong>RegID:</strong> {{ profile.id }}
            </div>
            <div class="info-item">
              <strong>Name:</strong> {{ profile.basicInfo?.name || 'N/A' }}
            </div>
            <div class="info-item">
              <strong>Age:</strong> {{ profile.basicInfo?.age || 'N/A' }}
            </div>
            <div class="info-item">
              <strong>District:</strong> {{ profile.basicInfo?.district || 'N/A' }}
            </div>
            <div class="info-item">
              <strong>Phone:</strong> {{ profile.basicInfo?.phone || 'N/A' }}
            </div>
            <div class="info-item">
              <strong>Address:</strong> {{ profile.basicInfo?.address || 'N/A' }}
            </div>
            <div class="info-item">
              <strong>NIC:</strong> {{ profile.basicInfo?.nic || 'N/A' }}
            </div>
            <div class="info-item">
              <strong>Total Children:</strong> {{ profile.basicInfo?.totalChildren || 'N/A' }}
            </div>
          </div>
        </div>

        <div v-if="profile.loans && profile.loans.length > 0" class="loans-section">
          <h3>Loans</h3>
          <div class="loan-list">
            <div v-for="loan in profile.loans" :key="loan.id" class="loan-item">
              <div class="loan-header">
                <span class="loan-type">{{ loan.type }}</span>
                <span class="loan-amount">Rs. {{ formatAmount(loan.amount) }}</span>
              </div>
              <div class="loan-details">
                <p><strong>Purpose:</strong> {{ loan.purpose }}</p>
                <p><strong>Date:</strong> {{ formatDate(loan.date) }}</p>
                <p><strong>Status:</strong> 
                  <span :class="`status-${loan.status}`">{{ loan.status }}</span>
                </p>
                <p v-if="loan.paidAmount"><strong>Paid:</strong> Rs. {{ formatAmount(loan.paidAmount) }}</p>
              </div>
            </div>
          </div>
        </div>

        <div v-if="profile.grants && profile.grants.length > 0" class="grants-section">
          <h3>Grants</h3>
          <div class="grant-list">
            <div v-for="grant in profile.grants" :key="grant.id" class="grant-item">
              <div class="grant-header">
                <span class="grant-amount">Rs. {{ formatAmount(grant.amount) }}</span>
              </div>
              <div class="grant-details">
                <p><strong>Purpose:</strong> {{ grant.purpose }}</p>
                <p><strong>Date:</strong> {{ formatDate(grant.date) }}</p>
              </div>
            </div>
          </div>
        </div>

        <div v-if="profile.paymentHistory && profile.paymentHistory.length > 0" class="payments-section">
          <h3>Payment History</h3>
          <div class="payment-list">
            <div v-for="payment in profile.paymentHistory" :key="payment.id" class="payment-item">
              <div class="payment-header">
                <span class="payment-type">{{ payment.type }}</span>
                <span class="payment-amount">Rs. {{ formatAmount(payment.amount) }}</span>
              </div>
              <div class="payment-details">
                <p v-if="payment.details"><strong>Details:</strong> {{ payment.details }}</p>
                <p><strong>Date:</strong> {{ formatDate(payment.date) }}</p>
              </div>
            </div>
          </div>
        </div>

        <div v-if="profile.arms && profile.arms.length > 0" class="arms-section">
          <h3>Projects (ARMS)</h3>
          <div class="arms-list">
            <div v-for="arm in profile.arms" :key="arm" class="arm-item">
              {{ arm }}
            </div>
          </div>
        </div>

        <div v-if="profile.computed" class="stats-section">
          <h3>Summary Statistics</h3>
          <div class="stats-grid">
            <div class="stat-item">
              <strong>Active Loans:</strong> {{ profile.computed.activeLoansCount }}
            </div>
            <div class="stat-item">
              <strong>Completed Loans:</strong> {{ profile.computed.completedLoansCount }}
            </div>
            <div class="stat-item">
              <strong>Grants:</strong> {{ profile.computed.grantsCount }}
            </div>
            <div class="stat-item">
              <strong>Total Loan Amount:</strong> Rs. {{ formatAmount(profile.computed.totalLoanAmount) }}
            </div>
            <div class="stat-item">
              <strong>Total Grant Amount:</strong> Rs. {{ formatAmount(profile.computed.totalGrantAmount) }}
            </div>
            <div class="stat-item">
              <strong>Total Paid:</strong> Rs. {{ formatAmount(profile.computed.totalPaidAmount) }}
            </div>
            <div class="stat-item">
              <strong>Remaining Loan:</strong> Rs. {{ formatAmount(profile.computed.remainingLoanAmount) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted, watch } from 'vue'
import { profileService } from '@/services/profile.js'
import { imageService } from '@/services/imageService.js'

export default {
  name: 'ProfileModal',
  props: {
    profile: {
      type: Object,
      required: true
    },
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const profileImageUrl = ref('/placeholder-profile.jpg')
    const imageLoading = ref(true)
    const currentUrlIndex = ref(0)
    const urlFormats = ref([])

    const profileTypes = computed(() => {
      return profileService.getProfileTypes(props.profile)
    })

    const formatAmount = (amount) => {
      if (!amount) return '0'
      return new Intl.NumberFormat('en-IN').format(amount)
    }

    const formatDate = (date) => {
      if (!date) return 'N/A'
      return new Date(date).toLocaleDateString('en-IN')
    }

    const handleImageError = (event) => {
      console.log('Image failed to load for profile:', props.profile.id)
      
      // Try next URL format if available
      if (currentUrlIndex.value < urlFormats.value.length - 1) {
        currentUrlIndex.value++
        const nextUrl = urlFormats.value[currentUrlIndex.value]
        console.log('Trying next URL format:', nextUrl)
        event.target.src = nextUrl
        return
      }
      
      // If all URLs failed, use placeholder
      console.log('All URL formats failed, using placeholder')
      event.target.src = '/placeholder-profile.jpg'
      imageLoading.value = false
    }

    const handleImageLoad = () => {
      imageLoading.value = false
    }

    const loadProfileImage = async () => {
      try {
        // Wait a bit to ensure props are properly set
        await new Promise(resolve => setTimeout(resolve, 0))
        
        if (!props.profile || !props.profile.id) {
          console.log('Profile or profile.id is null/undefined:', props.profile)
          profileImageUrl.value = '/placeholder-profile.jpg'
          return
        }
        
        // Check if profile has an Image field with Google Drive URL
        let fileId = null;
        
        if (props.profile.Image) {
          // Extract file ID from the Image URL (like the original system)
          const match = props.profile.Image.match(/[-\w]{25,}/);
          if (match) {
            fileId = match[0];
            console.log('Extracted file ID from Image URL:', fileId);
          }
        }
        
        // If no file ID from Image field, use placeholder
        if (!fileId) {
          console.log('No Image URL found for profile:', props.profile.id);
          profileImageUrl.value = '/placeholder-profile.jpg';
          return;
        }
        
        // Generate all possible URL formats for this profile
        urlFormats.value = [
          `https://drive.google.com/thumbnail?id=${fileId}&sz=w300`,
          `https://drive.google.com/uc?export=view&id=${fileId}`,
          `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`,
          `https://drive.google.com/thumbnail?id=${fileId}&sz=w200`
        ]
        
        console.log('Generated URL formats for profile:', props.profile.id, urlFormats.value)
        
        // Start with the first URL format
        currentUrlIndex.value = 0
        profileImageUrl.value = urlFormats.value[0]
      } catch (error) {
        console.error('Error loading profile image:', error)
        profileImageUrl.value = '/placeholder-profile.jpg'
      }
    }

    onMounted(() => {
      loadProfileImage()
    })

    // Reload image when profile changes
    watch(() => props.profile.id, () => {
      loadProfileImage()
    })

    const closeModal = () => {
      emit('close')
    }

    return {
      profileImageUrl,
      imageLoading,
      profileTypes,
      formatAmount,
      formatDate,
      handleImageError,
      handleImageLoad,
      closeModal
    }
  }
}
</script>

<style scoped>
.modal {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 36px;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-color: #f5f5f5;
  border-radius: 25px;
  color: #333;
}

.close-button:hover {
  background-color: #e0e0e0;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #eee;
}

.modal-header h2 {
  margin: 0;
  color: #1565c0;
}

.profile-types {
  display: flex;
  gap: 5px;
}

.profile-type {
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 600;
}

.rf-type {
  background-color: #e3f2fd;
  color: #1565c0;
}

.grant-type {
  background-color: #ffebee;
  color: #c62828;
}

.gif-type {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.profile-image-section {
  text-align: center;
  margin-bottom: 20px;
}

.profile-image {
  max-width: 200px;
  max-height: 200px;
  object-fit: contain;
  border-radius: 10px;
  border: 2px solid #eee;
  background-color: #f5f5f5;
}

.modal-body h3 {
  color: #1565c0;
  margin-bottom: 10px;
  font-size: 18px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.info-item {
  padding: 8px;
  background-color: #f8f9fa;
  border-radius: 5px;
}

.loan-list, .grant-list, .payment-list, .arms-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.loan-item, .grant-item, .payment-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background-color: #f9f9f9;
}

.loan-header, .grant-header, .payment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.loan-type, .grant-type, .payment-type {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.loan-amount, .grant-amount, .payment-amount {
  font-weight: 600;
  color: #1565c0;
}

.loan-details, .grant-details, .payment-details p {
  margin: 5px 0;
  font-size: 14px;
}

.status-active {
  color: #2e7d32;
  font-weight: 600;
}

.status-completed {
  color: #1565c0;
  font-weight: 600;
}

.arm-item {
  padding: 8px;
  background-color: #e8f5e9;
  border-radius: 5px;
  border-left: 4px solid #2e7d32;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.stat-item {
  padding: 10px;
  background-color: #e3f2fd;
  border-radius: 5px;
  text-align: center;
}

@media screen and (max-width: 768px) {
  .modal-content {
    width: 95%;
    margin: 20px;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style> 