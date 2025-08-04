<template>
  <div v-if="profile" class="profile-box" @click="openModal">
    <img 
      :src="profileImageUrl" 
      :alt="profile[ProfileField.FULL_NAME] || 'Profile Image'"
      @error="handleImageError"
      @load="handleImageLoad"
    />
    
    <div class="profile-header">
      <h3>{{ profile[ProfileField.FULL_NAME] || 'Unknown' }}</h3>
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
    
    <div class="profile-info">
      <p><strong>RegID:</strong> {{ profile[ProfileField.REG_ID] }}</p>
      <p><strong>Age:</strong> {{ profile[ProfileField.YEAR_OF_BIRTH] || 'N/A' }}</p>
      <p><strong>District:</strong> {{ profile[ProfileField.DISTRICT] || 'N/A' }}</p>
      <p><strong>Phone:</strong> {{ profile[ProfileField.PHONE_NUMBER] || 'N/A' }}</p>
    </div>
    
    <div v-if="profile.computed" class="profile-stats">
      <p><strong>Active Loans:</strong> {{ profile.computed.activeLoansCount }}</p>
      <p><strong>Total Loan Amount:</strong> Rs. {{ formatAmount(profile.computed.totalLoanAmount) }}</p>
      <p><strong>Remaining:</strong> Rs. {{ formatAmount(profile.computed.remainingLoanAmount) }}</p>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted, watch } from 'vue'
import { profileService } from '@/services/profile.js'
import { imageService } from '@/services/imageService.js'
import { ProfileField } from '../enums/db.js'
import { convertGoogleDriveUrl, extractFileId } from '../utils/driveUtils.js'

export default {
  name: 'ProfileCard',
  props: {
    profile: {
      type: Object,
      required: true
    }
  },
  emits: ['open-modal'],
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

    const handleImageError = (event) => {
      console.log('Image failed to load for profile:', props.profile[ProfileField.REG_ID])
      
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
        
        if (!props.profile || !props.profile[ProfileField.REG_ID]) {
          console.log('Profile or profile.regId is null/undefined:', props.profile)
          profileImageUrl.value = '/placeholder-profile.jpg'
          return
        }
        
        // Check if profile has profile image drive ID
        let fileId = null;
        
        if (props.profile[ProfileField.PROFILE_IMAGE_DRIVE_ID]) {
          fileId = props.profile[ProfileField.PROFILE_IMAGE_DRIVE_ID];
          console.log('Using profile image drive ID:', fileId);
        } else if (props.profile.Image) {
          // Extract file ID from the Image URL (fallback for old data)
          fileId = extractFileId(props.profile.Image);
          console.log('Extracted file ID from Image URL:', fileId);
        }
        
        // If no file ID found, use placeholder
        if (!fileId) {
          console.log('No image found for profile:', props.profile[ProfileField.REG_ID]);
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
        
        console.log('Generated URL formats for profile:', props.profile[ProfileField.REG_ID], urlFormats.value)
        
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

    // Watch for profile changes
    watch(() => props.profile, (newProfile) => {
      if (newProfile && newProfile[ProfileField.REG_ID]) {
        loadProfileImage()
      }
    }, { immediate: true })

    const openModal = () => {
      emit('open-modal', props.profile)
    }

    return {
      profileImageUrl,
      imageLoading,
      profileTypes,
      formatAmount,
      handleImageError,
      handleImageLoad,
      openModal
    }
  }
}
</script>

<style scoped>
.profile-box {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  width: 300px;
  text-align: left;
  background-color: #f9f9f9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.profile-box:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.profile-box img {
  width: 100%;
  height: 200px;
  object-fit: contain;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: #f5f5f5;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.profile-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
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

.profile-info {
  font-size: 14px;
  margin-bottom: 10px;
}

.profile-info p {
  margin: 5px 0;
}

.profile-info strong {
  color: #1565c0;
}

.profile-stats {
  font-size: 13px;
  color: #666;
  border-top: 1px solid #eee;
  padding-top: 10px;
}

.profile-stats p {
  margin: 3px 0;
}

@media screen and (max-width: 768px) {
  .profile-box {
    width: 90%;
  }
}
</style> 