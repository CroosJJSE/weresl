<template>
  <div class="home-page">
          <div class="header-container">
        <div class="logo-container">
          <img 
            :src="logoUrl || '/placeholder-logo.png'" 
            alt="WERESL Logo" 
            class="logo" 
            @error="handleLogoError"
          />
        </div>
    </div>

    <h1>WERESL Database</h1>

    <div class="profiles-view">
      <!-- Action Bar -->
      <div class="action-bar">
        <div class="action-buttons">
          <button 
            class="btn btn-primary export-btn" 
            @click="openPdfExportModal"
          >
            <i class="fas fa-file-pdf" style="margin-right: 8px;"></i>
            Export to PDF
          </button>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="search-container">
        <input 
          v-model="searchQuery" 
          @input="handleSearch"
          type="text" 
          placeholder="Search by name, NIC, or RegID..."
          class="search-input"
        />
      </div>

      <!-- Filters -->
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
          v-for="profile in filteredProfiles"
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

    <!-- PDF Export Modal -->
    <PdfExportModal
      :is-visible="showPdfExportModal"
      @close="closePdfExportModal"
    />


    <div class="footer">
      <p>WERESL Database Management System</p>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from 'vue'
import ProfileCard from '@/components/ProfileCard.vue'
import ProfileModal from '@/components/ProfileModal.vue'
import PdfExportModal from '@/components/PdfExportModal.vue'

import { profileService } from '@/services/profile.js'
import { dbOperations } from '@/firebase/db.js'
import { imageService } from '@/services/imageService.js'

export default {
  name: 'HomePage',
  components: {
    ProfileCard,
    ProfileModal,
    PdfExportModal
  },
  setup() {
    const profiles = ref([])
    const filteredProfiles = ref([])
    const loading = ref(false)
    const error = ref(null)
    const showModal = ref(false)
    const selectedProfile = ref(null)
    const logoUrl = ref(null)
    const searchQuery = ref('')
    const showPdfExportModal = ref(false)

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
        
        // Apply search filter
        applySearchFilter()
        
      } catch (err) {
        console.error('[HomePage] Error loading profiles:', err);
        error.value = 'Failed to load profiles: ' + err.message
      } finally {
        loading.value = false
      }
    }

    const applySearchFilter = () => {
      if (!searchQuery.value.trim()) {
        filteredProfiles.value = profiles.value
        return
      }
      
      const query = searchQuery.value.toLowerCase().trim()
      filteredProfiles.value = profiles.value.filter(profile => {
        const name = profile.basicInfo?.name || ''
        const nic = profile.basicInfo?.nic || ''
        const regId = profile.id || ''
        
        return name.toLowerCase().includes(query) ||
               nic.toLowerCase().includes(query) ||
               regId.toLowerCase().includes(query)
      })
    }

    const handleSearch = () => {
      applySearchFilter()
    }

    const openProfileModal = (profile) => {
      selectedProfile.value = profile
      showModal.value = true
    }

    const closeProfileModal = () => {
      showModal.value = false
      selectedProfile.value = null
    }

    const openPdfExportModal = () => {
      showPdfExportModal.value = true
    }

    const closePdfExportModal = () => {
      showPdfExportModal.value = false
    }

    const handleLogoError = () => {
      logoUrl.value = '/placeholder-logo.png'
    }

    onMounted(() => {
      loadProfiles()
      loadLogo()
    })

          return {
        profiles,
        filteredProfiles,
        loading,
        error,
        filters,
        districts,
        years,
        showModal,
        selectedProfile,
        logoUrl,
        searchQuery,
        loadProfiles,
        loadLogo,
        openProfileModal,
        closeProfileModal,
        handleSearch,
        handleLogoError,
        showPdfExportModal,
        openPdfExportModal,
        closePdfExportModal
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

.action-bar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  padding: 0 20px;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: #1565c0;
  color: white;
}

.btn-primary:hover {
  background-color: #1976d2;
}

.btn-primary:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(21, 101, 192, 0.5);
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

.search-container {
  margin-bottom: 20px;
  padding: 0 20px;
}

.search-input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  background-color: #fff;
}

.search-input:focus {
  outline: none;
  border-color: #1565c0;
  box-shadow: 0 0 0 2px rgba(21, 101, 192, 0.2);
}

.profile-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  padding: 15px 0;
  max-width: 1200px;
  margin: 0 auto;
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
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 12px;
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
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 8px;
  }
}
</style> 