<template>
  <div class="pdf-export-page">
    <!-- Header -->
    <div class="page-header">
      <div class="header-left">
        <button class="back-btn" @click="goBack">
          <i class="fas fa-arrow-left"></i>
        </button>
        <h1>PDF Export</h1>
      </div>
      <div class="header-right">
        <button 
          class="export-btn" 
          @click="generatePDF"
          :disabled="selectedProfiles.length === 0 || generating"
        >
          <i v-if="generating" class="fas fa-spinner fa-spin"></i>
          <i v-else class="fas fa-file-pdf"></i>
          <span v-if="!generating">{{ selectedProfiles.length }}</span>
        </button>
      </div>
    </div>

    <!-- Top Controls Bar -->
    <div class="controls-bar">
      <div class="search-section">
        <div class="search-container">
          <i class="fas fa-search search-icon"></i>
          <input 
            v-model="searchQuery" 
            @input="filterProfiles"
            type="text" 
            placeholder="Search..."
            class="search-input"
          />
        </div>
        <div class="filter-container">
          <i class="fas fa-filter filter-icon"></i>
          <select v-model="districtFilter" @change="filterProfiles" class="filter-select">
            <option value="">All</option>
            <option v-for="district in districts" :key="district" :value="district">
              {{ district }}
            </option>
          </select>
        </div>
      </div>
      
      <div class="selection-controls">
        <button 
          class="control-btn" 
          @click="selectAll"
          :disabled="allProfiles.length === 0"
          title="Select All"
        >
          <i class="fas fa-check-double"></i>
        </button>
        <button 
          class="control-btn" 
          @click="deselectAll"
          :disabled="selectedProfiles.length === 0"
          title="Deselect All"
        >
          <i class="fas fa-times"></i>
        </button>
        <button 
          class="control-btn" 
          @click="showExportOptions = !showExportOptions"
          title="Export Options"
        >
          <i class="fas fa-ellipsis-v"></i>
        </button>
        <button 
          class="control-btn close-btn" 
          @click="goBack"
          title="Close"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>

    <!-- Export Options Dropdown -->
    <div v-if="showExportOptions" class="export-options-dropdown">
      <div class="options-grid">
        <div class="option-item">
          <label class="option-label">
            <input type="checkbox" v-model="exportOptions.includeImages" class="option-checkbox" />
            <span class="option-text">Profile Images</span>
          </label>
          <small class="option-hint">May affect performance due to CORS restrictions</small>
        </div>
        <div class="option-item">
          <label class="option-label">
            <input type="checkbox" v-model="exportOptions.includeRFLoans" class="option-checkbox" />
            <span class="option-text">RF Loans</span>
          </label>
        </div>
        <div class="option-item">
          <label class="option-label">
            <input type="checkbox" v-model="exportOptions.includeRFHistory" class="option-checkbox" />
            <span class="option-text">RF History</span>
          </label>
          <div v-if="exportOptions.includeRFHistory" class="year-range-selector">
            <div class="date-input-group">
              <label>From:</label>
              <input 
                type="month" 
                v-model="exportOptions.rfHistoryFrom" 
                class="date-input"
                :max="exportOptions.rfHistoryTo"
              />
            </div>
            <div class="date-input-group">
              <label>To:</label>
              <input 
                type="month" 
                v-model="exportOptions.rfHistoryTo" 
                class="date-input"
                :min="exportOptions.rfHistoryFrom"
              />
            </div>
          </div>
        </div>
        <div class="option-item">
          <label class="option-label">
            <input type="checkbox" v-model="exportOptions.includeGrantHistory" class="option-checkbox" />
            <span class="option-text">Grant History</span>
          </label>
        </div>
        <!-- Children Information option removed as requested -->
      </div>
    </div>

    <!-- Selection Info -->
    <div v-if="selectedProfiles.length > 0" class="selection-info">
      <div class="info-card">
        <i class="fas fa-info-circle"></i>
        <span>{{ selectedProfiles.length }} profile{{ selectedProfiles.length !== 1 ? 's' : '' }} selected</span>
      </div>
    </div>

    <!-- Profiles List -->
    <div class="profiles-container">
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <span>Loading profiles...</span>
      </div>
      
      <div v-else-if="filteredProfiles.length === 0" class="no-profiles">
        <i class="fas fa-search"></i>
        <p>No profiles found</p>
      </div>
      
      <div v-else class="profiles-grid">
        <div 
          v-for="profile in filteredProfiles" 
          :key="profile.id"
          class="profile-item"
          :class="{ selected: isProfileSelected(profile.id) }"
          @click="toggleProfileSelection(profile.id)"
          @touchstart="handleTouchStart"
          @touchend="handleTouchEnd"
        >
          <div class="profile-image">
            <img 
              :src="getProfileImageUrl(profile)" 
              :alt="profile.basicInfo?.name || 'Profile'"
              @error="handleImageError"
            />
          </div>
          <div class="profile-info">
            <h4>{{ profile.basicInfo?.name || profile.Name || 'Unknown' }}</h4>
            <p class="reg-id">{{ profile.id || profile.Reg_ID || 'No ID' }}</p>
            <div class="profile-tags">
              <span v-if="hasRF(profile)" class="tag rf-tag">RF</span>
              <span v-if="hasGrant(profile)" class="tag grant-tag">GRANT</span>
              <span v-if="hasGIF(profile)" class="tag gif-tag">GIF</span>
            </div>
          </div>
          <div class="selection-indicator">
            <i v-if="isProfileSelected(profile.id)" class="fas fa-check-circle"></i>
            <i v-else class="far fa-circle"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { pdfExportService } from '@/services/pdfExportService.js'
import { profileService } from '@/services/profile.js'

export default {
  name: 'PdfExportPage',
  setup() {
    const router = useRouter()
    const allProfiles = ref([])
    const filteredProfiles = ref([])
    const selectedProfiles = ref([])
    const loading = ref(false)
    const generating = ref(false)
    const searchQuery = ref('')
    const districtFilter = ref('')
    const districts = ref([])
    const showExportOptions = ref(false)
    
    const exportOptions = reactive({
      includeImages: true,
      includeRFLoans: false,
      includeRFHistory: false,
      rfHistoryFrom: '',
      rfHistoryTo: '',
      includeGrantHistory: true
      // includeChildrenInfo removed as requested
    })

    // Load profiles when page loads
    onMounted(async () => {
      await loadProfiles()
    })

    const loadProfiles = async () => {
      loading.value = true
      try {
        const result = await profileService.getProfiles()
        if (result && Array.isArray(result)) {
          allProfiles.value = result
          filteredProfiles.value = result
          
          // Extract unique districts
          const uniqueDistricts = [...new Set(result.map(p => 
            p.basicInfo?.District || p.District || 'Unknown District'
          ))].sort()
          districts.value = uniqueDistricts
        }
      } catch (error) {
        console.error('Error loading profiles:', error)
      } finally {
        loading.value = false
      }
    }

    const filterProfiles = () => {
      let filtered = allProfiles.value

      // Apply search filter
      if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase().trim()
        filtered = filtered.filter(profile => {
          const name = profile.basicInfo?.name || profile.Name || ''
          const nic = profile.basicInfo?.nic || profile.NIC || ''
          const regId = profile.id || profile.Reg_ID || ''
          
          return name.toLowerCase().includes(query) ||
                 nic.toLowerCase().includes(query) ||
                 regId.toLowerCase().includes(query)
        })
      }

      // Apply district filter
      if (districtFilter.value) {
        filtered = filtered.filter(profile => {
          const district = profile.basicInfo?.District || profile.District || 'Unknown District'
          return district === districtFilter.value
        })
      }

      filteredProfiles.value = filtered
    }

    const selectAll = () => {
      selectedProfiles.value = filteredProfiles.value.map(p => p.id || p.Reg_ID)
    }

    const deselectAll = () => {
      selectedProfiles.value = []
    }

    const toggleProfileSelection = (profileId) => {
      const index = selectedProfiles.value.indexOf(profileId)
      if (index > -1) {
        selectedProfiles.value.splice(index, 1)
      } else {
        selectedProfiles.value.push(profileId)
      }
    }

    const isProfileSelected = (profileId) => {
      return selectedProfiles.value.includes(profileId)
    }

    const getProfileImageUrl = (profile) => {
      const imageUrl = profile.basicInfo?.profileImageDriveId || profile.Image || profile.profileImageDriveId
      if (!imageUrl) return '/placeholder-profile.jpg'
      
      // Check if it's just a file ID
      if (imageUrl && !imageUrl.includes('http') && !imageUrl.includes('drive.google.com')) {
        const fileId = imageUrl.trim()
        if (fileId && fileId.length > 10) {
          return `https://drive.google.com/thumbnail?id=${fileId}&sz=w200-h200`
        }
      }
      
      // If it's already a Google Drive URL, try to convert to thumbnail
      if (imageUrl.includes('drive.google.com')) {
        try {
          const fileId = imageUrl.match(/[-\w]{25,}/)?.[0]
          if (fileId) {
            return `https://drive.google.com/thumbnail?id=${fileId}&sz=w200-h200`
          }
        } catch (error) {
          console.warn('Could not extract file ID from Google Drive URL:', error)
        }
      }
      
      return imageUrl
    }

    const handleImageError = (event) => {
      event.target.src = '/placeholder-profile.jpg'
    }

    const hasRF = (profile) => {
      return profile.loans?.some(loan => loan.type === 'RF') || profile.RF_Loan
    }

    const hasGrant = (profile) => {
      return profile.grants?.length > 0 || profile.GRANT
    }

    const hasGIF = (profile) => {
      return profile.loans?.some(loan => loan.type === 'GIF') || profile.GIFor
    }

    const generatePDF = async () => {
      if (selectedProfiles.value.length === 0) {
        alert('Please select at least one profile')
        return
      }

      generating.value = true
      try {
        const result = await pdfExportService.generateProfilesPDF(selectedProfiles.value, exportOptions)
        
        if (result.success) {
          // Download the PDF
          pdfExportService.downloadPDF(result.data.content, result.data.filename)
          
          // Show success message
          alert(`PDF generated successfully with ${result.data.count} profiles!`)
          
          // Go back to home page
          goBack()
        } else {
          throw new Error(result.message || 'Failed to generate PDF')
        }
      } catch (error) {
        console.error('Error generating PDF:', error)
        alert(`Error generating PDF: ${error.message}`)
      } finally {
        generating.value = false
      }
    }

    const goBack = () => {
      router.push('/')
    }
    
    // Touch event handlers for mobile
    const handleTouchStart = (event) => {
      event.currentTarget.style.transform = 'scale(0.98)'
    }
    
    const handleTouchEnd = (event) => {
      event.currentTarget.style.transform = 'scale(1)'
    }

    return {
      allProfiles,
      filteredProfiles,
      selectedProfiles,
      loading,
      generating,
      searchQuery,
      districtFilter,
      districts,
      exportOptions,
      showExportOptions,
      loadProfiles,
      filterProfiles,
      selectAll,
      deselectAll,
      toggleProfileSelection,
      isProfileSelected,
      getProfileImageUrl,
      handleImageError,
      hasRF,
      hasGrant,
      hasGIF,
      generatePDF,
      goBack,
      handleTouchStart,
      handleTouchEnd
    }
  }
}
</script>

<style scoped>
.pdf-export-page {
  min-height: 100vh;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
}

.page-header {
  background: white;
  padding: 16px 20px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.back-btn {
  background: none;
  border: none;
  font-size: 18px;
  color: #666;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s;
}

.back-btn:hover {
  background-color: #f0f0f0;
}

.page-header h1 {
  margin: 0;
  font-size: 20px;
  color: #333;
  font-weight: 600;
}

.export-btn {
  background: #1565c0;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.2s;
}

.export-btn:hover:not(:disabled) {
  background: #0d47a1;
}

.export-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.controls-bar {
  background: white;
  padding: 16px 20px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.search-section {
  display: flex;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.search-container {
  position: relative;
  flex: 1;
  min-width: 200px;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  font-size: 16px;
}

.search-input {
  width: 100%;
  padding: 10px 10px 10px 36px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
}

.filter-container {
  position: relative;
  flex-shrink: 0;
}

.filter-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  font-size: 16px;
  pointer-events: none;
}

.filter-select {
  width: 120px;
  padding: 10px 10px 10px 36px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  background-color: white;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.selection-controls {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.control-btn {
  background: #6c757d;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.control-btn:hover {
  background: #545b62;
}

.control-btn.close-btn {
  background: #dc3545;
}

.control-btn.close-btn:hover {
  background: #c82333;
}

.export-options-dropdown {
  background: white;
  border-bottom: 1px solid #e0e0e0;
  padding: 16px 20px;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 12px;
}

.option-item {
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #f8f9fa;
  transition: all 0.2s;
}

.option-item:hover {
  background: #e9ecef;
  border-color: #1565c0;
}

.option-label {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  font-size: 14px;
  width: 100%;
  min-height: 44px;
}

.option-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
  flex-shrink: 0;
}

.option-text {
  flex: 1;
  font-weight: 500;
  color: #333;
}

.option-hint {
  display: block;
  font-size: 11px;
  color: #666;
  margin-top: 2px;
  font-weight: normal;
}

.year-range-selector {
  margin-top: 12px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.date-input-group {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.date-input-group:last-child {
  margin-bottom: 0;
}

.date-input-group label {
  font-size: 12px;
  color: #666;
  font-weight: 500;
  min-width: 40px;
}

.date-input {
  padding: 6px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 12px;
  background: white;
}

.selection-info {
  padding: 16px 20px;
}

.info-card {
  background: #e3f2fd;
  color: #1565c0;
  padding: 12px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}

.profiles-container {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.loading, .no-profiles {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #666;
}

.spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #1565c0;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.no-profiles i {
  font-size: 48px;
  color: #ccc;
  margin-bottom: 16px;
}

.profiles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  max-width: 1200px;
  margin: 0 auto;
}

.profile-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
  min-height: 100px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.profile-item:hover {
  border-color: #1565c0;
  box-shadow: 0 4px 12px rgba(21, 101, 192, 0.15);
  transform: translateY(-2px);
}

.profile-item.selected {
  border-color: #1565c0;
  background: #e3f2fd;
  box-shadow: 0 4px 12px rgba(21, 101, 192, 0.2);
}

.profile-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 16px;
  flex-shrink: 0;
  background-color: #f5f5f5;
}

.profile-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-info {
  flex: 1;
  min-width: 0;
}

.profile-info h4 {
  margin: 0 0 6px 0;
  font-size: 16px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
}

.reg-id {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #666;
}

.profile-tags {
  display: flex;
  gap: 6px;
}

.tag {
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  color: white;
  font-weight: 500;
}

.rf-tag {
  background: #4285f4;
}

.grant-tag {
  background: #34a853;
}

.gif-tag {
  background: #ea4335;
}

.selection-indicator {
  margin-left: 12px;
  color: #1565c0;
  font-size: 20px;
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .page-header {
    padding: 12px 16px;
  }
  
  .page-header h1 {
    font-size: 18px;
  }
  
  .controls-bar {
    padding: 12px 16px;
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  
  .search-section {
    flex-direction: column;
    gap: 8px;
  }
  
  .search-container {
    min-width: 0;
  }
  
  .filter-select {
    width: 100%;
  }
  
  .selection-controls {
    justify-content: center;
  }
  
  .export-options-dropdown {
    padding: 12px 16px;
  }
  
  .options-grid {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  
  .year-range-selector {
    margin-top: 8px;
    padding: 8px;
  }
  
  .date-input-group {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
  
  .date-input-group label {
    min-width: auto;
  }
  
  .date-input {
    width: 100%;
    font-size: 16px; /* Prevent zoom on iOS */
  }
  
  .profiles-container {
    padding: 16px;
  }
  
  .profiles-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .profile-item {
    padding: 14px;
    min-height: 90px;
  }
  
  .profile-image {
    width: 50px;
    height: 50px;
    margin-right: 12px;
  }
  
  .profile-info h4 {
    font-size: 15px;
  }
  
  .reg-id {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .page-header {
    padding: 10px 14px;
  }
  
  .controls-bar {
    padding: 10px 14px;
  }
  
  .profiles-container {
    padding: 12px;
  }
  
  .profile-item {
    padding: 12px;
  }
  
  .profile-image {
    width: 45px;
    height: 45px;
    margin-right: 10px;
  }
}
</style>
