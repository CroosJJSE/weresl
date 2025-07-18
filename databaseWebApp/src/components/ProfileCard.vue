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
    const profileImageUrl = ref('/placeholder-profile.jpg')
    const imageLoading = ref(true)

    const profileTypes = computed(() => {
      return profileService.getProfileTypes(props.profile)
    })

    const formatAmount = (amount) => {
      if (!amount) return '0'
      return new Intl.NumberFormat('en-IN').format(amount)
    }

    const handleImageError = () => {
      profileImageUrl.value = '/placeholder-profile.jpg'
      imageLoading.value = false
    }

    const handleImageLoad = () => {
      imageLoading.value = false
    }

    const loadProfileImage = async () => {
      try {
        if (!props.profile || !props.profile.Image) {
          profileImageUrl.value = '/placeholder-profile.jpg'
          return
        }
        
        // Use imageService to get the correct thumbnail URL (supports both Drive and Cloudinary)
        const thumbnailUrl = await imageService.getProfileImageThumbnail(props.profile.Image)
        profileImageUrl.value = thumbnailUrl
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
      if (newProfile) {
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

.profile-stats strong {
  color: #333;
}
</style> 