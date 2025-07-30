<template>
  <div v-if="isVisible && profile" class="modal" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="close-button" @click="closeModal">&times;</div>
      
      <div class="modal-header">
        <div class="header-content">
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
            <div class="info-row">
              <div class="info-item">
                <strong>RegID:</strong> {{ profile.id }}
              </div>
              <div class="info-item">
                <strong>Name:</strong> {{ profile.basicInfo?.name || 'N/A' }}
              </div>
            </div>
            <div class="info-row">
              <div class="info-item">
                <strong>Age:</strong> {{ profile.basicInfo?.age || 'N/A' }}
              </div>
              <div class="info-item">
                <strong>District:</strong> {{ profile.basicInfo?.District || 'N/A' }}
              </div>
            </div>
            <div class="info-row">
              <div class="info-item">
                <strong>Phone:</strong> {{ profile.basicInfo?.phone || 'N/A' }}
              </div>
              <div class="info-item">
                <strong>NIC:</strong> {{ profile.basicInfo?.nic || 'N/A' }}
              </div>
            </div>
            <div class="info-row">
              <div class="info-item full-width">
                <strong>Address:</strong> {{ profile.basicInfo?.address || 'N/A' }}
              </div>
            </div>
            <div class="info-row">
              <div class="info-item">
                <strong>Children:</strong> {{ profile.basicInfo?.totalChildren || 'N/A' }}
              </div>
            </div>
          </div>
        </div>

        <!-- Loading indicator -->
        <div v-if="loadingDetails" class="loading-section">
          <div class="loading-spinner"></div>
          <p>Loading profile details...</p>
        </div>

        <!-- Simplified Project Section -->
        <div v-if="profileDetails && !loadingDetails" class="project-section">
          <div class="project-header">RF Projects</div>
          
          <!-- Combined RF Loans (Pending + Distributed) -->
          <div v-if="(profileDetails.activeRFLoans && profileDetails.activeRFLoans.length > 0) || (profileDetails.completedRFLoans && profileDetails.completedRFLoans.length > 0)" class="project-details" style="flex-direction: column;">
            <div style="text-align: center; font-weight: bold; margin-bottom: 10px;">RF Loans</div>
            
            <!-- Active/Pending RF Loans -->
            <div v-for="loan in profileDetails.activeRFLoans" :key="loan.id" style="display: flex; justify-content: space-between; padding: 8px 0; margin-left: 20px; border-bottom: 1px solid #eee;">
              <div style="flex: 1;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span>{{ loan.purpose }}</span>
                  <span style="color: #d32f2f; font-weight: bold; font-size: 12px;">(Active)</span>
                </div>
                <div v-if="loan.currentBalance" style="margin-top: 3px; font-size: 12px; color: #d32f2f;">
                  Current Balance: Rs. {{ formatAmount(loan.currentBalance) }}
                </div>
              </div>
              <div style="text-align: right;">
                <div>Rs. {{ formatAmount(loan.amount) }}</div>
                <div style="font-size: 12px; color: #666;">{{ formatDate(loan.initiationDate) }}</div>
              </div>
            </div>
            
            <!-- Completed RF Loans -->
            <div v-for="loan in profileDetails.completedRFLoans" :key="loan.id" style="display: flex; justify-content: space-between; padding: 8px 0; margin-left: 20px; border-bottom: 1px solid #eee;">
              <div style="flex: 1;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span>{{ loan.purpose }}</span>
                  <span style="color: #2e7d32; font-weight: bold; font-size: 12px;">(Completed)</span>
                </div>
              </div>
              <div style="text-align: right;">
                <div>Rs. {{ formatAmount(loan.amount) }}</div>
                <div style="font-size: 12px; color: #666;">{{ formatDate(loan.initiationDate) }}</div>
              </div>
            </div>
          </div>
          
          <!-- RF Paid History -->
          <div v-if="profileDetails.returnHistory && profileDetails.returnHistory.length > 0" class="project-details" style="flex-direction: column;">
            <div style="text-align: center; font-weight: bold; margin-bottom: 5px;">RF Paid History</div>
            <div v-for="payment in profileDetails.returnHistory" :key="payment.dateKey" style="display: flex; justify-content: space-between; padding: 5px 0; margin-left: 20px;">
              <span style="color: #2e7d32">{{ payment.parsedDate }}</span>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="margin-left: 10px;">Rs. {{ formatAmount(payment.amount) }}</span>
                <a 
                  v-if="payment.proofUrl && isValidUrl(payment.proofUrl)" 
                  :href="payment.proofUrl" 
                  target="_blank" 
                  style="color: #1565c0; text-decoration: none; font-size: 12px; font-weight: 500;"
                >
                  View Bill
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Error message -->
        <div v-if="loadError" class="error-section">
          <p style="color: #d32f2f; text-align: center;">Error loading profile details. Please try again.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted, watch } from 'vue'
import { profileService } from '@/services/profile.js'
import { imageService } from '@/services/imageService.js'
import { dbOperations } from '@/firebase/db.js'

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
    const loadingDetails = ref(false)
    const profileDetails = ref(null)
    const loadError = ref(false)

    const profileTypes = computed(() => {
      return profileService.getProfileTypes(props.profile)
    })

    const formatAmount = (amount) => {
      if (!amount) return '0'
      return new Intl.NumberFormat('en-IN').format(amount)
    }

    const formatDate = (date) => {
      if (!date) return 'N/A'
      
      try {
        // Handle Firestore timestamp objects
        if (date && typeof date === 'object' && date.toDate) {
          return date.toDate().toLocaleDateString('en-IN')
        }
        
        // Handle regular Date objects
        if (date instanceof Date) {
          return date.toLocaleDateString('en-IN')
        }
        
        // Handle string dates
        if (typeof date === 'string') {
          return new Date(date).toLocaleDateString('en-IN')
        }
        
        // Handle timestamp numbers
        if (typeof date === 'number') {
          return new Date(date).toLocaleDateString('en-IN')
        }
        
        return 'N/A'
      } catch (error) {
        console.error('[ProfileModal] Error formatting date:', error, date)
        return 'N/A'
      }
    }

    const loadProfileDetails = async () => {
      if (!props.profile?.id) return
      
      try {
        console.log('[ProfileModal] Loading detailed profile data for:', props.profile.id)
        loadingDetails.value = true
        loadError.value = false
        
        // Reset profile details for this specific profile
        profileDetails.value = null
        
        const details = await dbOperations.getProfileDetails(props.profile.id)
        console.log('[ProfileModal] Profile details loaded:', details)
        
        // Only set the details if this is still the same profile (to prevent race conditions)
        if (props.profile?.id === props.profile?.id) {
          profileDetails.value = details
        }
      } catch (error) {
        console.error('[ProfileModal] Error loading profile details:', error)
        loadError.value = true
      } finally {
        loadingDetails.value = false
      }
    }

    const loadProfileImage = async () => {
      try {
        // Check multiple possible image field names
        const imageUrl = props.profile?.Image || props.profile?.imageUrl || props.profile?.basicInfo?.imageUrl;
        
        if (!props.profile || !imageUrl) {
          profileImageUrl.value = '/placeholder-profile.jpg'
          return
        }
        
        // Test the URL format
        if (imageService.isGoogleDriveUrl(imageUrl)) {
          const fileId = imageService.extractDriveFileId(imageUrl);
        } else if (imageService.isCloudinaryUrl(imageUrl)) {
        } else {
        }
        
        // Use debug function for better troubleshooting
        const directUrl = await imageService.debugImageUrl(imageUrl)
        profileImageUrl.value = directUrl
      } catch (error) {
        console.error(`[ProfileModal] Error loading image for profile: ${props.profile?.id}:`, error)
        profileImageUrl.value = '/placeholder-profile.jpg'
      }
    }

    const handleImageError = () => {
      console.error(`[ProfileModal] Image failed to load for profile: ${props.profile?.id}`);
      console.error(`[ProfileModal] Failed URL: ${profileImageUrl.value}`);
      
      // Try fallback URL if it's a Google Drive URL
      const imageUrl = props.profile?.Image || props.profile?.imageUrl || props.profile?.basicInfo?.imageUrl;
      if (imageService.isGoogleDriveUrl(imageUrl)) {
        const fileId = imageService.extractDriveFileId(imageUrl);
        if (fileId) {
          // Try multiple fallback formats in sequence
          const fallbackUrls = [
            `https://drive.google.com/thumbnail?id=${fileId}&sz=w400-h400`,
            `https://drive.google.com/file/d/${fileId}/preview`,
            `https://drive.google.com/thumbnail?id=${fileId}&sz=w200-h200`,
            `https://drive.google.com/uc?export=view&id=${fileId}`
          ];
          
          // Find the next URL to try (skip the one that just failed)
          const currentUrl = profileImageUrl.value;
          const currentIndex = fallbackUrls.findIndex(url => url === currentUrl);
          const nextIndex = currentIndex >= 0 ? currentIndex + 1 : 0;
          
          if (nextIndex < fallbackUrls.length) {
            const nextUrl = fallbackUrls[nextIndex];
            profileImageUrl.value = nextUrl;
            return;
          } else {
            console.log(`[ProfileModal] All fallback URLs exhausted, using placeholder`);
          }
        }
      }
      
      profileImageUrl.value = '/placeholder-profile.jpg'
      imageLoading.value = false
    }

    const handleImageLoad = () => {
      imageLoading.value = false
    }

    const isValidUrl = (url) => {
      if (!url) return false;
      try {
        new URL(url);
        return true;
      } catch (e) {
        return false;
      }
    };

    // Watch for modal visibility and profile changes
    watch(() => [props.isVisible, props.profile?.id], ([isVisible, profileId]) => {
      if (isVisible && profileId) {
        // Reset state when modal opens
        profileDetails.value = null
        loadError.value = false
        // Load profile details automatically
        loadProfileDetails()
        loadProfileImage()
      }
    }, { immediate: true })

    onMounted(() => {
      if (props.isVisible && props.profile?.id) {
        loadProfileDetails()
        loadProfileImage()
      }
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
      closeModal,
      loadingDetails,
      profileDetails,
      loadError,
      isValidUrl
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
  padding: 10px;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 24px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #f5f5f5;
  border-radius: 20px;
  color: #333;
  z-index: 10;
}

.close-button:hover {
  background-color: #e0e0e0;
}

.modal-header {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #eee;
}

.header-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.modal-header h2 {
  margin: 0;
  color: #1565c0;
  font-size: 24px;
  text-align: center;
}

.profile-types {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

.profile-type {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.rf-type {
  background-color: #e3f2fd;
  color: #1565c0;
  border: 1px solid #1565c0;
}

.grant-type {
  background-color: #ffebee;
  color: #c62828;
  border: 1px solid #c62828;
}

.gif-type {
  background-color: #e8f5e9;
  color: #2e7d32;
  border: 1px solid #2e7d32;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.profile-image-section {
  text-align: center;
}

.profile-image {
  width: 100%;
  max-width: 300px;
  height: auto;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-height: 200px;
}

.loading-section {
  text-align: center;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #1565c0;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-section {
  text-align: center;
  padding: 15px;
  background-color: #ffebee;
  border-radius: 10px;
  border: 1px solid #f44336;
}

/* Project Section Styles */
.project-section {
  margin: 20px 0;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 10px;
}

.project-header {
  font-size: 18px;
  font-weight: 600;
  color: #1565c0;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 2px solid #1565c0;
}

.project-details {
  margin: 10px 0;
  padding: 10px;
  background-color: white;
  border-radius: 8px;
  border-left: 4px solid #1565c0;
}

.basic-info h3 {
  color: #1565c0;
  margin-bottom: 15px;
  font-size: 18px;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.info-item {
  padding: 6px 0;
  border-bottom: 1px solid #f0f0f0;
  flex: 1;
  font-size: 14px;
}

.info-item.full-width {
  flex: none;
  width: 100%;
}

.info-item strong {
  color: #1565c0;
  display: inline-block;
  min-width: 60px;
  font-size: 13px;
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .modal {
    padding: 5px;
  }
  
  .modal-content {
    padding: 15px;
    border-radius: 10px;
    max-height: 95vh;
  }
  
  .modal-header h2 {
    font-size: 20px;
  }
  
  .profile-types {
    gap: 6px;
  }
  
  .profile-type {
    padding: 4px 10px;
    font-size: 11px;
  }
  
  .profile-image {
    max-width: 250px;
    max-height: 150px;
  }
  
  .project-section {
    padding: 10px;
  }
  
  .project-header {
    font-size: 16px;
  }
  
  .project-details {
    padding: 8px;
  }
  
  .info-item {
    font-size: 13px;
    padding: 4px 0;
  }
  
  .info-item strong {
    min-width: 50px;
    font-size: 12px;
  }
  
  .info-row {
    gap: 8px;
  }
}

/* Landscape orientation adjustments */
@media (max-width: 768px) and (orientation: landscape) {
  .modal-content {
    max-height: 98vh;
    max-width: 90vw;
  }
  
  .profile-image {
    max-width: 200px;
    max-height: 120px;
  }
  
  .modal-body {
    gap: 15px;
  }
  
  .basic-info h3 {
    font-size: 16px;
    margin-bottom: 10px;
  }
  
  .info-grid {
    gap: 3px;
  }
  
  .info-item {
    font-size: 12px;
    padding: 3px 0;
  }
  
  .info-item strong {
    min-width: 45px;
    font-size: 11px;
  }
}
</style> 