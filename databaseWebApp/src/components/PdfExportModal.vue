<template>
  <div v-if="isVisible" class="pdf-export-modal-overlay" @click="closeModal">
    <div class="pdf-export-modal" @click.stop>
      <div class="modal-header">
        <h2>
          <i class="fas fa-file-pdf" style="color: #dc3545; margin-right: 10px;"></i>
          Export Profiles to PDF
        </h2>
        <button class="close-btn" @click="closeModal">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="modal-content">
        <!-- Selection Info -->
        <div class="selection-info">
          <div class="info-card">
            <i class="fas fa-info-circle" style="color: #1565c0; margin-right: 8px;"></i>
            <span>{{ selectedProfiles.length }} profile{{ selectedProfiles.length !== 1 ? 's' : '' }} selected</span>
          </div>
        </div>

        <!-- Profile Selection -->
        <div class="profile-selection">
          <div class="selection-header">
            <h3>Select Profiles</h3>
            <div class="selection-controls">
              <button 
                class="btn btn-secondary" 
                @click="selectAll"
                :disabled="allProfiles.length === 0"
              >
                <i class="fas fa-check-double" style="margin-right: 5px;"></i>
                Select All
              </button>
              <button 
                class="btn btn-secondary" 
                @click="deselectAll"
                :disabled="selectedProfiles.length === 0"
              >
                <i class="fas fa-times" style="margin-right: 5px;"></i>
                Deselect All
              </button>
            </div>
          </div>

          <!-- Search and Filters -->
          <div class="search-filters">
            <input 
              v-model="searchQuery" 
              @input="filterProfiles"
              type="text" 
              placeholder="Search profiles..."
              class="search-input"
            />
            <select v-model="districtFilter" @change="filterProfiles" class="filter-select">
              <option value="">All Districts</option>
              <option v-for="district in districts" :key="district" :value="district">
                {{ district }}
              </option>
            </select>
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
                :class="{ selected: isProfileSelected(profile.id) }"
                @click="toggleProfileSelection(profile.id)"
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
                  <p class="district">{{ profile.basicInfo?.District || profile.District || 'Unknown District' }}</p>
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

        <!-- Export Options -->
        <div class="export-options">
          <h3>Export Options</h3>
          <div class="options-grid">
            <div class="option-item">
              <label>
                <input type="checkbox" v-model="exportOptions.includeImages" />
                Include Profile Images
              </label>
            </div>
            <div class="option-item">
              <label>
                <input type="checkbox" v-model="exportOptions.includeLoanHistory" />
                Include Loan History
              </label>
            </div>
            <div class="option-item">
              <label>
                <input type="checkbox" v-model="exportOptions.includeGrantHistory" />
                Include Grant History
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="modal-footer">
        <button class="btn btn-secondary" @click="closeModal">
          <i class="fas fa-times" style="margin-right: 5px;"></i>
          Cancel
        </button>
        <button 
          class="btn btn-primary" 
          @click="generatePDF"
          :disabled="selectedProfiles.length === 0 || generating"
        >
          <i v-if="generating" class="fas fa-spinner fa-spin" style="margin-right: 5px;"></i>
          <i v-else class="fas fa-file-pdf" style="margin-right: 5px;"></i>
          {{ generating ? 'Generating PDF...' : `Generate PDF (${selectedProfiles.length})` }}
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

    const exportOptions = reactive({
      includeImages: true,
      includeLoanHistory: true,
      includeGrantHistory: true
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
          return `https://drive.google.com/thumbnail?id=${fileId}&sz=w200-h200`
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
        const result = await pdfExportService.generateProfilesPDF(selectedProfiles.value)
        
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
      closeModal
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
  gap: 12px;
  margin-bottom: 16px;
}

.search-input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.filter-select {
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  min-width: 150px;
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
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 12px;
  padding: 16px;
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
}

.profile-item:hover {
  border-color: #1565c0;
  box-shadow: 0 2px 8px rgba(21, 101, 192, 0.1);
}

.profile-item.selected {
  border-color: #1565c0;
  background: #e3f2fd;
}

.profile-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
  flex-shrink: 0;
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

.export-options {
  margin-bottom: 24px;
}

.export-options h3 {
  margin: 0 0 12px 0;
  font-size: 16px;
  color: #333;
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.option-item label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
}

.option-item input[type="checkbox"] {
  width: 16px;
  height: 16px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px 24px;
  border-top: 1px solid #e0e0e0;
  background: #f8f9fa;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
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
  .pdf-export-modal {
    margin: 10px;
    max-height: 95vh;
  }
  
  .modal-header {
    padding: 16px 20px;
  }
  
  .modal-content {
    padding: 20px;
  }
  
  .selection-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .search-filters {
    flex-direction: column;
  }
  
  .profiles-grid {
    grid-template-columns: 1fr;
  }
  
  .modal-footer {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
