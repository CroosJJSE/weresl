<template>
  <div v-if="profile" class="profile-box" @click="openModal">
    <img 
      :src="profileImageUrl" 
      :alt="profile.basicInfo?.name || 'Profile Image'"
      @error="handleImageError"
      @load="handleImageLoad"
    />
    
    <div class="profile-header">
      <h3>{{ profile.basicInfo?.name || 'Unknown' }}</h3>
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
      <p><strong>RegID:</strong> {{ profile.id }}</p>
      <p><strong>Age:</strong> {{ profile.basicInfo?.age || 'N/A' }}</p>
      <p><strong>District:</strong> {{ profile.basicInfo?.District || 'N/A' }}</p>
      <p><strong>Phone:</strong> {{ profile.basicInfo?.phone || 'N/A' }}</p>
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
    const PLACEHOLDER_IMAGE_URL = "https://drive.google.com/file/d/1ZgXsSuEMpzHS4as_wZ3ZRyR5Mpw9an05/view?usp=sharing"
    const profileImageUrl = ref(PLACEHOLDER_IMAGE_URL)
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
      event.target.src = PLACEHOLDER_IMAGE_URL
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
          profileImageUrl.value = PLACEHOLDER_IMAGE_URL
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
          profileImageUrl.value = PLACEHOLDER_IMAGE_URL;
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
        profileImageUrl.value = PLACEHOLDER_IMAGE_URL
      }
    }

    onMounted(() => {
      loadProfileImage()
    })

    // Watch for profile changes
    watch(() => props.profile, (newProfile) => {
      if (newProfile && newProfile.id) {
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