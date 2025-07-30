<template>
  <div class="home-page">
          <div class="header-container">
        <div class="logo-container">
          <img 
            :src="logoUrl || '/placeholder-logo.png'" 
            alt="WERESL Logo" 
            class="logo" 
            @click="handleLogoClick"
            @error="handleLogoError"
          />
        </div>
    </div>

    <h1>WERESL Database</h1>

    <div class="profiles-view">
      <div class="filters">
        <select v-model="filters.District" @change="loadProfiles">
          <option value="">All Districts</option>
          <option v-for="district in districts" :key="district" :value="district">
            {{ district }}
          </option>
        </select>

        <select v-model="filters.type" @change="loadProfiles">
          <option value="">All Types</option>
          <option value="RF">RF</option>
          <option value="GRANT">GRANT</option>
          <option value="GIF">GIF</option>
        </select>

        <select v-model="filters.year" @change="loadProfiles">
          <option value="">All Years</option>
          <option v-for="year in years" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
      </div>

      <div v-if="loading" class="loading">
        Loading profiles...
      </div>

      <div v-else-if="error" class="error">
        {{ error }}
      </div>

      <div v-else class="profile-container">
        <ProfileCard
          v-for="profile in profiles.filter(p => p && p.id)"
          :key="profile.id"
          :profile="profile"
          @open-modal="openProfileModal"
        />
      </div>
    </div>



    <!-- Profile Modal -->
    <ProfileModal
      :profile="selectedProfile"
      :is-visible="showModal"
      @close="closeProfileModal"
    />

    <!-- Developer Tools Modal -->
    <div v-if="showDevTools" class="dev-tools-modal">
      <div class="dev-tools-content">
        <div class="dev-tools-header">
          <h3>Developer Tools</h3>
          <button @click="showDevTools = false" class="close-btn">&times;</button>
        </div>
        <div class="dev-tools-body">
          <div class="raw-data">
            <h4>Raw Firebase Data</h4>
            <pre>{{ JSON.stringify(profiles, null, 2) }}</pre>
          </div>
          <div class="system-logs">
            <h4>System Logs</h4>
            <div v-for="log in systemLogs" :key="log.id" class="log-entry">
              <span class="log-level">{{ log.level }}</span>
              <span class="log-message">{{ log.details }}</span>
              <span class="log-time">{{ formatDate(log.timestamp) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>WERESL Database Management System</p>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from 'vue'
import ProfileCard from '@/components/ProfileCard.vue'
import ProfileModal from '@/components/ProfileModal.vue'

import { profileService } from '@/services/profile.js'
import { dbOperations } from '@/firebase/db.js'
import { imageService } from '@/services/imageService.js'

export default {
  name: 'HomePage',
  components: {
    ProfileCard,
    ProfileModal
  },
  setup() {
    const profiles = ref([])
    const loading = ref(false)
    const error = ref(null)
    const showModal = ref(false)
    const selectedProfile = ref(null)
    const showDevTools = ref(false)
    const logoClickCount = ref(0)
    const systemLogs = ref([])
    const logoUrl = ref(null)

    const loadLogo = async () => {
      try {
        const originalLogoUrl = 'https://drive.google.com/thumbnail?id=1AEEWccjf_sMoXJgAaYIPZZm5rM-OCFe2';
        
        // Use debug function for better troubleshooting
        const processedLogoUrl = await imageService.debugImageUrl(originalLogoUrl);
        logoUrl.value = processedLogoUrl;
      } catch (error) {
        console.error('[HomePage] Error loading logo:', error)
        logoUrl.value = '/placeholder-logo.png'
      }
    }

    const filters = reactive({
      District: '',
      type: '',
      year: ''
    })

    const districts = [
      'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo',
      'Galle', 'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara',
      'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar',
      'Matale', 'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya',
      'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
    ]

    const years = computed(() => {
      const currentYear = new Date().getFullYear()
      const years = []
      for (let year = currentYear; year >= 2020; year--) {
        years.push(year)
      }
      return years
    })

    const loadProfiles = async () => {
      loading.value = true
      error.value = null
      
      try {
        const loadedProfiles = await profileService.getProfiles(filters)
        
        // Filter out any null or invalid profiles
        profiles.value = loadedProfiles.filter(profile => {
          if (!profile || !profile.id) {
            console.warn('[HomePage] Found invalid profile:', profile)
            return false
          }
          return true
        })
        
      } catch (err) {
        console.error('[HomePage] Error loading profiles:', err);
        error.value = 'Failed to load profiles: ' + err.message
      } finally {
        loading.value = false
      }
    }

    const openProfileModal = (profile) => {
      selectedProfile.value = profile
      showModal.value = true
    }

    const closeProfileModal = () => {
      showModal.value = false
      selectedProfile.value = null
    }

    const handleLogoClick = () => {
      logoClickCount.value++
      if (logoClickCount.value >= 3) {
        showDevTools.value = true
        logoClickCount.value = 0
        loadSystemLogs()
      }
    }

    const loadSystemLogs = async () => {
      try {
        // This would load actual system logs from Firebase
        systemLogs.value = [
          { id: 1, level: 'info', details: 'System initialized', timestamp: new Date() },
          { id: 2, level: 'info', details: 'Profiles loaded', timestamp: new Date() }
        ]
      } catch (err) {
        console.error('Error loading system logs:', err)
      }
    }

    const formatDate = (date) => {
      return new Date(date).toLocaleString()
    }

    const handleLogoError = () => {
      logoUrl.value = '/placeholder-logo.png'
    }

    onMounted(() => {
      loadProfiles()
      loadLogo()
      // Test image processing
      imageService.testImageProcessing()
      // Test specific problematic thumbnail URL
      imageService.testThumbnailUrl()
    })

          return {
        profiles,
        loading,
        error,
        filters,
        districts,
        years,
        showModal,
        selectedProfile,
        showDevTools,
        systemLogs,
        logoClickCount,
        logoUrl,
        loadProfiles,
        loadLogo,
        openProfileModal,
        closeProfileModal,
        handleLogoClick,
        handleLogoError,
        formatDate
      }
  }
}
</script>

<style scoped>
.home-page {
  font-family: 'Poppins', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #ffffff;
  text-align: center;
  padding: 20px;
  min-height: 100vh;
}

.header-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin-bottom: 30px;
  position: relative;
}

.logo-container {
  text-align: center;
}

.logo {
  max-width: 300px;
  height: auto;
  cursor: pointer;
}

h1 {
  font-weight: 600;
  font-size: 28px;
  margin-bottom: 20px;
  text-transform: uppercase;
  color: #1565c0;
}

.profiles-view {
  max-width: 1200px;
  margin: 0 auto;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
}

.filters select {
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  font-size: 14px;
  min-width: 150px;
  cursor: pointer;
}

.filters select:focus {
  outline: none;
  border-color: #1565c0;
  box-shadow: 0 0 0 2px rgba(21, 101, 192, 0.2);
}

.loading, .error {
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
}

.error {
  color: #d32f2f;
  background-color: #ffebee;
  border-radius: 8px;
  margin: 20px;
}

.profile-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px 0;
}

.footer {
  margin-top: 40px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  color: #666;
}

.footer p {
  margin: 0;
  font-size: 14px;
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .home-page {
    padding: 10px;
  }
  
  .header-container {
    padding: 10px;
    margin-bottom: 20px;
  }
  
  .logo {
    max-width: 250px;
  }
  
  h1 {
    font-size: 24px;
    margin-bottom: 15px;
  }
  
  .filters {
    flex-direction: column;
    gap: 10px;
    padding: 15px;
  }
  
  .filters select {
    width: 100%;
    min-width: auto;
  }
  
  .profile-container {
    grid-template-columns: 1fr;
    gap: 15px;
    padding: 10px 0;
  }
  
  .loading, .error {
    padding: 20px;
    font-size: 16px;
  }
  
  .footer {
    margin-top: 30px;
    padding: 15px;
  }
}

@media (max-width: 480px) {
  .home-page {
    padding: 5px;
  }
  
  .logo {
    max-width: 200px;
  }
  
  h1 {
    font-size: 20px;
  }
  
  .filters {
    padding: 10px;
  }
  
  .profile-container {
    gap: 10px;
  }
}
</style> 