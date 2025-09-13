<template>
  <div v-if="profile" class="profile-box" @click="openModal">
    <div class="profile-image-container">
      <img 
        :src="profileImageUrl" 
        :alt="profile.basicInfo?.name || 'Profile Image'"
        @error="handleImageError"
        @load="handleImageLoad"
        class="profile-image"
      />
    </div>
    
    <div class="profile-content">
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
        <p><strong>District:</strong> {{ profile.basicInfo?.District || 'N/A' }}</p>
        <p><strong>Age:</strong> {{ profile.basicInfo?.age || 'N/A' }}</p>
        <p><strong>Occupation:</strong> {{ profile.basicInfo?.occupation || 'N/A' }}</p>
      </div>
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
        const imageUrl = props.profile?.Image || props.profile?.imageUrl || props.profile?.basicInfo?.imageUrl || props.profile?.basicInfo?.profileImageDriveId;
        
        if (!props.profile || !imageUrl) {
          profileImageUrl.value = '/placeholder-profile.jpg'
          return
        }
        
        // Check if it's just a file ID (no URL structure)
        if (imageUrl && !imageUrl.includes('http') && !imageUrl.includes('drive.google.com')) {
          // It's likely just a file ID, convert to Google Drive URL
          const fileId = imageUrl.trim();
          if (fileId && fileId.length > 10) { // Basic validation for file ID
            // Try multiple thumbnail sizes for better reliability
            const thumbnailUrls = [
              `https://drive.google.com/thumbnail?id=${fileId}&sz=w400-h400`,
              `https://drive.google.com/thumbnail?id=${fileId}&sz=w300-h300`,
              `https://drive.google.com/thumbnail?id=${fileId}&sz=w200-h200`
            ];
            
            // Set the first URL and let error handling try others if needed
            profileImageUrl.value = thumbnailUrls[0];
            return;
          }
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
      
      // Try fallback URL if it's a Google Drive URL or file ID
      const imageUrl = props.profile?.Image || props.profile?.imageUrl || props.profile?.basicInfo?.imageUrl || props.profile?.basicInfo?.profileImageDriveId;
      
      if (imageUrl) {
        let fileId = null;
        
        if (imageService.isGoogleDriveUrl(imageUrl)) {
          fileId = imageService.extractDriveFileId(imageUrl);
        } else if (imageUrl && !imageUrl.includes('http') && imageUrl.length > 10) {
          // It might be just a file ID
          fileId = imageUrl.trim();
        }
        
        if (fileId) {
          // Try multiple fallback formats in sequence with different thumbnail sizes
          const fallbackUrls = [
            `https://drive.google.com/thumbnail?id=${fileId}&sz=w300-h300`,
            `https://drive.google.com/thumbnail?id=${fileId}&sz=w200-h200`,
            `https://drive.google.com/thumbnail?id=${fileId}&sz=w150-h150`,
            `https://drive.google.com/file/d/${fileId}/preview`,
            `https://drive.google.com/uc?export=view&id=${fileId}`
          ];
          
          // Find the next URL to try (skip the one that just failed)
          const currentUrl = profileImageUrl.value;
          const currentIndex = fallbackUrls.findIndex(url => url === currentUrl);
          const nextIndex = currentIndex >= 0 ? currentIndex + 1 : 0;
          
          if (nextIndex < fallbackUrls.length) {
            const nextUrl = fallbackUrls[nextIndex];
            console.log(`[ProfileCard] Trying fallback URL: ${nextUrl}`);
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
  border-radius: 12px;
  padding: 0;
  width: 100%;
  text-align: left;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.profile-box:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.profile-image-container {
  flex: 1;
  position: relative;
  overflow: hidden;
  background-color: #f5f5f5;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: #f5f5f5;
}

.profile-content {
  padding: 8px;
  flex-shrink: 0;
  background-color: #ffffff;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 6px;
  gap: 6px;
}

.profile-header h3 {
  margin: 0;
  font-size: 11px;
  font-weight: 600;
  color: #333;
  flex: 1;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.profile-types {
  display: flex;
  gap: 3px;
  flex-wrap: wrap;
}

.profile-type {
  padding: 2px 4px;
  border-radius: 8px;
  font-size: 8px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  line-height: 1;
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
  font-size: 9px;
  margin-bottom: 0;
}

.profile-info p {
  margin: 1px 0;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.profile-info strong {
  color: #1565c0;
}

.profile-stats {
  font-size: 11px;
  color: #666;
  border-top: 1px solid #eee;
  padding-top: 6px;
}

.profile-stats p {
  margin: 2px 0;
}

.profile-stats strong {
  color: #333;
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .profile-box {
    border-radius: 10px;
  }
  
  .profile-content {
    padding: 6px;
  }
  
  .profile-header {
    margin-bottom: 4px;
    gap: 4px;
  }
  
  .profile-header h3 {
    font-size: 10px;
  }
  
  .profile-types {
    gap: 2px;
  }
  
  .profile-type {
    padding: 1px 3px;
    font-size: 7px;
  }
  
  .profile-info {
    font-size: 8px;
  }
  
  .profile-stats {
    font-size: 9px;
  }
}

@media (max-width: 480px) {
  .profile-box {
    border-radius: 8px;
  }
  
  .profile-content {
    padding: 5px;
  }
  
  .profile-header h3 {
    font-size: 9px;
  }
  
  .profile-type {
    padding: 1px 2px;
    font-size: 6px;
  }
  
  .profile-info {
    font-size: 7px;
  }
  
  .profile-stats {
    font-size: 8px;
  }
}
</style> 