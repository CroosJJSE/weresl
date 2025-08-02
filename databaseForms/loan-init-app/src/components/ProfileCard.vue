<template>
  <div v-if="profile" class="profile-box" @click="openModal">
    <img 
      :src="profileImageUrl" 
      :alt="profile.basicInfo?.name || t('profileCard.unknown')"
      @error="handleImageError"
      @load="handleImageLoad"
    />
    
    <div class="profile-header">
      <h3>{{ profile.Name || profile.basicInfo?.Name || t('profileCard.unknown') }}</h3>
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
      <p><strong>{{ t('form.regid') }}</strong> {{ profile.Reg_ID || profile.id }}</p>
      <p><strong>{{ t('profileCard.age') }}</strong> {{ profile.Age || profile.basicInfo?.Age || 'N/A' }}</p>
      <p><strong>{{ t('profileCard.district') }}</strong> {{ profile.District || profile.basicInfo?.District || 'N/A' }}</p>
      <p><strong>{{ t('profileCard.phone') }}</strong> {{ profile.contact || profile.basicInfo?.contact || 'N/A' }}</p>
    </div>
    
    <div v-if="profile.computed" class="profile-stats">
      <p><strong>{{ t('profileCard.activeLoans') }}</strong> {{ profile.computed.activeLoansCount }}</p>
      <p><strong>{{ t('profileCard.totalLoanAmount') }}</strong> Rs. {{ formatAmount(profile.computed.totalLoanAmount) }}</p>
      <p><strong>{{ t('profileCard.remaining') }}</strong> Rs. {{ formatAmount(profile.computed.remainingLoanAmount) }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { profileService } from '@/services/profile.js'
import { imageService } from '@/services/imageService.js'
import { t } from '../i18n';
import { generateImageUrls } from '@/utils/driveUtils.js'

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
        if (props.profile.Image) {
          // Generate URL formats using utility function
          urlFormats.value = generateImageUrls(props.profile.Image)
          console.log('Generated URL formats for profile:', props.profile.id, urlFormats.value)
          
          if (urlFormats.value.length > 0) {
            // Start with the first URL format
            currentUrlIndex.value = 0
            profileImageUrl.value = urlFormats.value[0]
            return
          }
        }
        
        // If no valid URL formats, use placeholder
        console.log('No Image URL found for profile:', props.profile.id);
        profileImageUrl.value = '/placeholder-profile.jpg';
        
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