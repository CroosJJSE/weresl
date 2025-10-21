<template>
  <div v-if="isVisible" class="pdf-export-modal-overlay" @click="closeModal">
    <div class="pdf-export-modal" @click.stop @touchstart.stop @touchmove.stop>
      <div class="modal-header">
        <h2>
          <i class="fas fa-file-pdf" style="color: #dc3545; margin-right: 10px;"></i>
          PDF Export
        </h2>
        <button class="close-btn" @click="closeModal">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="modal-content">
        <!-- Selection Info -->
        <div class="selection-info" v-if="selectedProfiles.length > 0">
          <div class="info-card">
            <i class="fas fa-info-circle" style="color: #1565c0; margin-right: 8px;"></i>
            <span>{{ selectedProfiles.length }} profile{{ selectedProfiles.length !== 1 ? 's' : '' }} selected</span>
          </div>
        </div>

        <!-- Profile Selection -->
        <div class="profile-selection">
          <div class="selection-header">
            <div class="selection-controls">
              <button 
                class="btn btn-secondary mobile-btn icon-only" 
                @click="selectAll"
                :disabled="allProfiles.length === 0"
                title="Select All"
              >
                <i class="fas fa-check-double"></i>
              </button>
              <button 
                class="btn btn-secondary mobile-btn icon-only" 
                @click="deselectAll"
                :disabled="selectedProfiles.length === 0"
                title="Deselect All"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>

          <!-- Search and Filters -->
          <div class="search-filters">
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
            <div class="export-options-toggle">
              <button 
                class="btn btn-secondary mobile-btn icon-only" 
                @click="showExportOptions = !showExportOptions"
                title="Export Options"
              >
                <i class="fas fa-ellipsis-v"></i>
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

          <!-- Profiles List -->
          <div class="profiles-list">
            <div v-if="loading" class="loading">
              <div class="spinner"></div>
              <span>Loading profiles...</span>
            </div>
            
            <div v-else-if="filteredProfiles.length === 0" class="no-profiles">
              <i class="fas fa-search" style="font-size: 24px; color: #ccc; margin-bottom: 10px;"></i>
              <p>No profiles found</p>
            </div>
            
            <div v-else class="profiles-grid">
              <div 
                v-for="profile in filteredProfiles" 
                :key="profile.id"
                class="profile-item"
                :class="{ selected: isProfileSelected(profile.id), 'mobile-profile': isMobile }"
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

        <!-- Export Options - Moved to top controls -->
      </div>

      <!-- Modal Footer -->
      <div class="modal-footer">
        <button class="btn btn-secondary mobile-btn icon-only" @click="closeModal" title="Cancel">
          <i class="fas fa-times"></i>
        </button>
        <button 
          class="btn btn-primary mobile-btn" 
          @click="generatePDF"
          :disabled="selectedProfiles.length === 0 || generating"
          :title="generating ? 'Generating PDF...' : `Generate PDF (${selectedProfiles.length})`"
        >
          <i v-if="generating" class="fas fa-spinner fa-spin"></i>
          <i v-else class="fas fa-file-pdf"></i>
          <span class="btn-text" v-if="!generating">{{ selectedProfiles.length }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { pdfExportService } from '@/services/pdfExportService.js'
import { profileService } from '@/services/profile.js'
import { imageService } from '@/services/imageService.js'

export default {
  name: 'PdfExportModal',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const allProfiles = ref([])
    const filteredProfiles = ref([])
    const selectedProfiles = ref([])
    const loading = ref(false)
    const generating = ref(false)
    const searchQuery = ref('')
    const districtFilter = ref('')
    const districts = ref([])
    const showExportOptions = ref(false)
    
    // Mobile detection
    const isMobile = ref(false)
    
    onMounted(() => {
      checkMobileDevice()
      window.addEventListener('resize', checkMobileDevice)
    })
    
    const checkMobileDevice = () => {
      isMobile.value = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                       window.innerWidth <= 768
    }

    const exportOptions = reactive({
      includeImages: true,
      includeRFLoans: false,
      includeRFHistory: false,
      rfHistoryFrom: '',
      rfHistoryTo: '',
      includeGrantHistory: true
      // includeChildrenInfo removed as requested
    })

    // Load profiles when modal opens
    watch(() => props.isVisible, async (newValue) => {
      if (newValue) {
        await loadProfiles()
      }
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
          // Try multiple thumbnail sizes for better reliability
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
          
          // Close modal
          closeModal()
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

    const closeModal = () => {
      selectedProfiles.value = []
      searchQuery.value = ''
      districtFilter.value = ''
      emit('close')
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
        isMobile,
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
        closeModal,
        handleTouchStart,
        handleTouchEnd
      }
  }
}
</script>

<style scoped>
.pdf-export-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
  /* Prevent body scroll on mobile */
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
}

.pdf-export-modal {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e0e0e0;
}

.modal-header h2 {
  margin: 0;
  font-size: 20px;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #666;
  padding: 5px;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.close-btn:hover {
  background-color: #f0f0f0;
}

.modal-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  /* Mobile scroll improvements */
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: #ccc transparent;
}

.modal-content::-webkit-scrollbar {
  width: 6px;
}

.modal-content::-webkit-scrollbar-track {
  background: transparent;
}

.modal-content::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}

.selection-info {
  margin-bottom: 20px;
}

.info-card {
  background: #e3f2fd;
  color: #1565c0;
  padding: 12px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  font-weight: 500;
}

.profile-selection {
  margin-bottom: 24px;
}

.selection-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.selection-header h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.selection-controls {
  display: flex;
  gap: 8px;
}

.search-filters {
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin-bottom: 16px;
  align-items: center;
}

.search-container {
  position: relative;
  flex: 1;
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

.profiles-list {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.loading, .no-profiles {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #666;
}

.spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #1565c0;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.profiles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  padding: 16px;
  max-height: 400px;
  overflow-y: auto;
}

.profile-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
  min-height: 80px;
}

.profile-item:hover {
  border-color: #1565c0;
  box-shadow: 0 2px 8px rgba(21, 101, 192, 0.1);
}

.profile-item.selected {
  border-color: #1565c0;
  background: #e3f2fd;
}

.profile-item.mobile-profile {
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
}

.profile-item.mobile-profile:active {
  transform: scale(0.98);
  transition: transform 0.1s ease;
}

.profile-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
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
  margin: 0 0 4px 0;
  font-size: 14px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.reg-id {
  margin: 0 0 2px 0;
  font-size: 12px;
  color: #666;
}

.district {
  margin: 0 0 4px 0;
  font-size: 12px;
  color: #888;
}

.profile-tags {
  display: flex;
  gap: 4px;
}

.tag {
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
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
  margin-left: 8px;
  color: #1565c0;
  font-size: 18px;
}

.export-options-toggle {
  flex-shrink: 0;
}

.export-options-dropdown {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-top: 12px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.option-item {
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
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
  gap: 10px;
  cursor: pointer;
  font-size: 14px;
  width: 100%;
  min-height: 40px;
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

.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 20px 24px;
  border-top: 1px solid #e0e0e0;
  background: #f8f9fa;
}

.btn {
  padding: 14px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 48px; /* Better touch target */
  width: 100%;
}

.mobile-btn {
  position: relative;
  overflow: hidden;
}

.mobile-btn:active {
  transform: scale(0.98);
}

.btn-text {
  font-weight: 500;
}

.icon-only {
  width: auto;
  min-width: 48px;
  padding: 12px;
}

.btn-primary {
  background: #1565c0;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #0d47a1;
}

.btn-primary:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #545b62;
}

@media (max-width: 768px) {
  .pdf-export-modal-overlay {
    padding: 10px;
  }
  
  .pdf-export-modal {
    margin: 0;
    max-height: 95vh;
    width: 100%;
    border-radius: 8px;
  }
  
  .modal-header {
    padding: 16px 20px;
  }
  
  .modal-header h2 {
    font-size: 18px;
  }
  
  .modal-content {
    padding: 16px;
  }
  
  .selection-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .selection-header h3 {
    font-size: 16px;
  }
  
  .search-filters {
    flex-direction: column;
    gap: 8px;
    align-items: stretch;
  }
  
  .search-input,
  .filter-select {
    font-size: 16px; /* Prevent zoom on iOS */
    padding: 12px 12px 12px 36px;
  }
  
  .export-options-dropdown {
    margin-top: 8px;
    padding: 12px;
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
  
  .profiles-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    padding: 12px;
    max-height: 350px;
  }
  
  .profile-item {
    padding: 16px;
    min-height: 80px;
  }
  
  .profile-image {
    width: 60px;
    height: 60px;
  }
  
  .profile-info h4 {
    font-size: 16px;
  }
  
  .profile-info p {
    font-size: 14px;
  }
  
  .modal-footer {
    flex-direction: column;
    gap: 12px;
    padding: 16px 20px;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
    min-height: 52px; /* Even better touch target on mobile */
  }
  
  .options-grid {
    gap: 12px;
  }
  
  .option-item {
    padding: 16px;
  }
  
  .option-label {
    min-height: 48px;
    font-size: 16px;
  }
  
  .option-checkbox {
    width: 22px;
    height: 22px;
  }
}

@media (max-width: 480px) {
  .pdf-export-modal {
    max-height: 98vh;
    border-radius: 6px;
  }
  
  .modal-header {
    padding: 14px 16px;
  }
  
  .modal-content {
    padding: 14px;
  }
  
  .search-filters {
    flex-direction: column;
    gap: 8px;
  }
  
  .filter-select {
    width: 100%;
  }
  
  .profiles-grid {
    grid-template-columns: 1fr;
    padding: 8px;
    max-height: 300px;
  }
  
  .profile-item {
    padding: 12px;
  }
  
  .profile-image {
    width: 50px;
    height: 50px;
  }
  
  .btn {
    min-height: 56px;
    font-size: 16px;
  }
  
  .modal-footer {
    flex-direction: row;
    gap: 8px;
  }
}
</style>
