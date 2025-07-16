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

    <div class="view-toggle">
      <button 
        :class="['view-btn', { active: currentView === 'profiles' }]"
        @click="currentView = 'profiles'"
      >
        Profiles
      </button>
      <button 
        :class="['view-btn', { active: currentView === 'analytics' }]"
        @click="currentView = 'analytics'"
      >
        Analytics
      </button>
    </div>

    <div v-if="currentView === 'profiles'" class="profiles-view">
      <div class="filters">
        <select v-model="filters.district" @change="loadProfiles">
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

    <div v-else-if="currentView === 'analytics'" class="analytics-view">
      <AnalyticsDashboard />
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
import AnalyticsDashboard from '@/pages/analytics/AnalyticsDashboard.vue'
import { profileService } from '@/services/profile.js'
import { dbOperations } from '@/firebase/db.js'
import { imageService } from '@/services/imageService.js'

export default {
  name: 'HomePage',
  components: {
    ProfileCard,
    ProfileModal,
    AnalyticsDashboard
  },
  setup() {
    const currentView = ref('profiles')
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
        logoUrl.value = await imageService.getLogoImage()
      } catch (error) {
        console.error('Error loading logo:', error)
        logoUrl.value = '/placeholder-logo.png'
      }
    }

    const filters = reactive({
      district: '',
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
        console.log('Loaded profiles:', loadedProfiles)
        
        // Filter out any null or invalid profiles
        profiles.value = loadedProfiles.filter(profile => {
          if (!profile || !profile.id) {
            console.warn('Found invalid profile:', profile)
            return false
          }
          return true
        })
        
        console.log('Filtered profiles:', profiles.value)
      } catch (err) {
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
    })

          return {
        currentView,
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
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin-bottom: 30px;
  position: relative;
}

.logo-container {
  flex: 1;
  text-align: center;
}

.logo {
  max-width: 400px;
  height: auto;
  cursor: pointer;
}



h1 {
  font-weight: 600;
  font-size: 32px;
  margin-bottom: 20px;
  text-transform: uppercase;
}

.view-toggle {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.view-btn {
  padding: 8px 20px;
  border: 1px solid #1565c0;
  background-color: white;
  color: #1565c0;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
  font-family: 'Poppins', sans-serif;
}

.view-btn.active {
  background-color: #1565c0;
  color: white;
}

.filters {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

select {
  padding: 10px;
  font-size: 16px;
  width: 250px;
  font-family: 'Poppins', sans-serif;
}

.profile-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
  justify-content: center;
}

.loading, .error {
  padding: 20px;
  font-size: 18px;
  color: #666;
}

.error {
  color: #c62828;
}

.dev-tools-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.dev-tools-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 1200px;
  max-height: 90vh;
  overflow-y: auto;
}

.dev-tools-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

.dev-tools-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.raw-data, .system-logs {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 5px;
}

.raw-data pre {
  font-size: 12px;
  overflow-x: auto;
  white-space: pre-wrap;
}

.log-entry {
  display: flex;
  gap: 10px;
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
}

.log-level {
  font-weight: 600;
  min-width: 60px;
}

.log-level.info {
  color: #1565c0;
}

.log-level.error {
  color: #c62828;
}

.log-level.warning {
  color: #f57c00;
}

.log-time {
  color: #666;
  font-size: 12px;
}

.footer {
  margin-top: 40px;
  padding: 20px;
  text-align: center;
  font-style: italic;
  color: #1565c0;
  border-top: 1px solid #eee;
}

@media screen and (max-width: 768px) {
  .filters {
    flex-direction: column;
    align-items: center;
  }

  .profile-container {
    width: 90%;
  }

  .logo {
    max-width: 300px;
  }



  .dev-tools-body {
    grid-template-columns: 1fr;
  }
}
</style> 