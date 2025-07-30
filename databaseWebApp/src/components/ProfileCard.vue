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

    const loadProfileImage = async () => {
      try {
        // Check multiple possible image field names
        const imageUrl = props.profile?.Image || props.profile?.imageUrl || props.profile?.basicInfo?.imageUrl;
        
        if (!props.profile || !imageUrl) {
          profileImageUrl.value = '/placeholder-profile.jpg'
          return
        }
        
        // Use debug function for better troubleshooting
        const directUrl = await imageService.debugImageUrl(imageUrl)
        profileImageUrl.value = directUrl
      } catch (error) {
        console.error(`[ProfileCard] Error loading image for profile: ${props.profile?.id}:`, error)
        profileImageUrl.value = '/placeholder-profile.jpg'
      }
    }

    const handleImageError = () => {
      console.error(`[ProfileCard] Image failed to load for profile: ${props.profile?.id}`);
      console.error(`[ProfileCard] Failed URL: ${profileImageUrl.value}`);
      
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
            console.log(`[ProfileCard] All fallback URLs exhausted, using placeholder`);
          }
        }
      }
      
      profileImageUrl.value = '/placeholder-profile.jpg'
      imageLoading.value = false
    }

    const handleImageLoad = () => {
      imageLoading.value = false
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
  width: 100%;
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
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: #f5f5f5;
  aspect-ratio: 1;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
  gap: 10px;
}

.profile-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  flex: 1;
}

.profile-types {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}

.profile-type {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 10px;
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

/* Mobile optimizations */
@media (max-width: 768px) {
  .profile-box {
    padding: 12px;
  }
  
  .profile-box img {
    height: 150px;
  }
  
  .profile-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .profile-header h3 {
    font-size: 14px;
  }
  
  .profile-types {
    gap: 4px;
  }
  
  .profile-type {
    padding: 3px 6px;
    font-size: 9px;
  }
  
  .profile-info {
    font-size: 13px;
  }
  
  .profile-stats {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .profile-box {
    padding: 10px;
  }
  
  .profile-box img {
    height: 120px;
  }
  
  .profile-header h3 {
    font-size: 13px;
  }
  
  .profile-type {
    padding: 2px 5px;
    font-size: 8px;
  }
  
  .profile-info {
    font-size: 12px;
  }
  
  .profile-stats {
    font-size: 11px;
  }
}
</style> 