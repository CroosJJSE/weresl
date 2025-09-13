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

    <!-- Search Type Toggle -->
    <div class="search-toggle-container">
      <div class="toggle-buttons">
        <button 
          :class="['toggle-btn', { active: searchType === 'profiles' }]"
          @click="setSearchType('profiles')"
        >
          <i class="fas fa-users" style="margin-right: 8px;"></i>
          Profiles
        </button>
        <button 
          :class="['toggle-btn', { active: searchType === 'loans' }]"
          @click="setSearchType('loans')"
        >
          <i class="fas fa-handshake" style="margin-right: 8px;"></i>
          Loans
        </button>
      </div>
    </div>

    <!-- Profiles Search Section -->
    <div v-if="searchType === 'profiles'" class="profiles-view">
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
          v-model="profilesSearchQuery" 
          @input="handleProfilesSearch"
          type="text" 
          placeholder="Search by name, NIC, or RegID..."
          class="search-input"
        />
      </div>

      <!-- Filters -->
      <div class="filters">
        <select v-model="profilesFilters.District" @change="loadProfiles">
          <option value="">Districts</option>
          <option v-for="district in districts" :key="district" :value="district">
            {{ district }}
          </option>
        </select>
      </div>

      <div v-if="profilesLoading" class="loading">
        Loading profiles...
      </div>

      <div v-else-if="profilesError" class="error">
        {{ profilesError }}
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

    <!-- Loans Search Section -->
    <div v-if="searchType === 'loans'" class="loans-view">
      <!-- Search Bar -->
      <div class="search-container">
        <input 
          v-model="loansSearchQuery" 
          @input="handleLoansSearch"
          type="text" 
          placeholder="Search..."
          class="search-input"
        />
      </div>

      <!-- Loan Filters -->
      <div class="filters">
        <select v-model="loansFilters.type" @change="loadLoans">
          <option value="">Types</option>
          <option value="RF">RF</option>
          <option value="GRANT">GRANT</option>
        </select>

        <select v-model="loansFilters.year" @change="loadLoans">
          <option value="">Years</option>
          <option v-for="year in years" :key="year" :value="year">
            {{ year }}
          </option>
        </select>

        <select v-model="loansFilters.coordinator" @change="loadLoans">
          <option value="">Coordinators</option>
          <option v-for="coordinator in coordinators" :key="coordinator.id" :value="coordinator.id">
            {{ coordinator.firstName }} {{ coordinator.lastName }}
          </option>
        </select>

        <select v-model="loansFilters.arms" @change="loadLoans">
          <option value="">ARMS</option>
          <option v-for="arm in armsOptions" :key="arm" :value="arm">
            {{ arm }}
          </option>
        </select>

        <select v-model="loansFilters.status" @change="loadLoans">
          <option value="">Status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div v-if="loansLoading" class="loading">
        Loading loans...
      </div>

      <div v-else-if="loansError" class="error">
        {{ loansError }}
      </div>

      <div v-else class="loans-container">
        <div 
          v-for="loan in filteredLoans" 
          :key="loan.id" 
          class="loan-card"
          @click="openLoanModal(loan)"
        >
          <div class="loan-basic-info">
            <span class="loan-id">{{ loan[LOAN_FIELD?.LOAN_ID] || loan.loanId || 'N/A' }}</span>
            <span :class="['status-dot', loan[LOAN_FIELD?.STATUS] || loan.status || 'unknown']"></span>
          </div>
          <div class="loan-amount">{{ formatAmount(loan[LOAN_FIELD?.AMOUNT] || loan.amount || 0) }}</div>
        </div>
      </div>
    </div>

    <!-- Profile Modal -->
    <ProfileModal
      :profile="selectedProfile"
      :is-visible="showModal"
      @close="closeProfileModal"
    />

    <!-- Loan Modal -->
    <div v-if="showLoanModal" class="modal-overlay" @click="closeLoanModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>Loan Details</h2>
          <button class="close-btn" @click="closeLoanModal">&times;</button>
        </div>
        <div class="modal-body" v-if="selectedLoan">
          <div class="loan-detail-row">
            <span class="detail-label">Loan ID:</span>
            <span class="detail-value">{{ selectedLoan[LOAN_FIELD?.LOAN_ID] || selectedLoan.loanId || 'N/A' }}</span>
          </div>
          <div class="loan-detail-row">
            <span class="detail-label">Type:</span>
            <span class="detail-value">{{ selectedLoan[LOAN_FIELD?.TYPE] || selectedLoan.type || 'N/A' }}</span>
          </div>
          <div class="loan-detail-row">
            <span class="detail-label">Amount:</span>
            <span class="detail-value">{{ formatAmount(selectedLoan[LOAN_FIELD?.AMOUNT] || selectedLoan.amount || 0) }}</span>
          </div>
          <div class="loan-detail-row">
            <span class="detail-label">Purpose:</span>
            <span class="detail-value">{{ selectedLoan[LOAN_FIELD?.PURPOSE] || selectedLoan.purpose || 'N/A' }}</span>
          </div>
          <div class="loan-detail-row">
            <span class="detail-label">Status:</span>
            <span :class="['status-badge', selectedLoan[LOAN_FIELD?.STATUS] || selectedLoan.status || 'unknown']">
              {{ selectedLoan[LOAN_FIELD?.STATUS] || selectedLoan.status || 'Unknown' }}
            </span>
          </div>
          <div class="loan-detail-row">
            <span class="detail-label">ARMS:</span>
            <span class="detail-value">{{ selectedLoan[LOAN_FIELD?.ARMS] || selectedLoan.arms || 'N/A' }}</span>
          </div>
          <div class="loan-detail-row">
            <span class="detail-label">Coordinator:</span>
            <span class="detail-value">{{ getCoordinatorName(selectedLoan[LOAN_FIELD?.SOURCE] || selectedLoan.source) }}</span>
          </div>
          <div class="loan-detail-row">
            <span class="detail-label">Approved:</span>
            <span class="detail-value">{{ formatDate(selectedLoan[LOAN_FIELD?.APPROVED_AT] || selectedLoan.approvedAt) }}</span>
          </div>
          <div class="loan-detail-row clickable" @click="goToProfile(selectedLoan[LOAN_FIELD?.REG_ID] || selectedLoan.regId)">
            <span class="detail-label">Reg ID:</span>
            <span class="detail-value link">{{ selectedLoan[LOAN_FIELD?.REG_ID] || selectedLoan.regId || 'N/A' }}</span>
          </div>
          
          <!-- Loan History Button -->
          <div class="loan-detail-row">
            <button 
              @click="fetchLoanHistory" 
              :disabled="loadingLoanHistory"
              class="history-fetch-btn"
            >
              <span v-if="loadingLoanHistory">Loading...</span>
              <span v-else>📊 View Loan Settlement History</span>
            </button>
          </div>
          
          <!-- Loan History Section -->
          <div v-if="loanHistory && loanHistory.length > 0" class="loan-history-section">
            <h4>Loan Settlement History</h4>
            <div class="history-timeline">
              <div v-for="(payment, index) in loanHistory" :key="`timeline-${index}`" class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <div class="timeline-row">
                    <div class="payment-date">{{ formatDateCompact(payment.date) }}</div>
                    <div class="payment-amount">{{ formatAmountCompact(payment.amount) }}</div>
                    <div v-if="payment.receipt_link_ID" class="receipt-link">
                      <a :href="getReceiptUrl(payment.receipt_link_ID)" target="_blank" class="receipt-icon" title="View Receipt">
                        📄
                      </a>
                    </div>
                  </div>
                </div>
              </div>
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
import { useRouter } from 'vue-router'
import ProfileCard from '@/components/ProfileCard.vue'
import ProfileModal from '@/components/ProfileModal.vue'

import { profileService } from '@/services/profile.js'
import { loansService } from '@/services/loans.js'
import { dbOperations } from '@/firebase/db.js'
import { imageService } from '@/services/imageService.js'
import { DISTRICT_MAPPING } from '@/enums/districts.js'
import { ARMS, LOAN_FIELD } from '@/enums/db.js'

export default {
  name: 'HomePage',
  components: {
    ProfileCard,
    ProfileModal
  },
  setup() {
    const router = useRouter()
    
    // Search type state
    const searchType = ref('profiles')
    
    // Profiles state
    const profiles = ref([])
    const filteredProfiles = ref([])
    const profilesLoading = ref(false)
    const profilesError = ref(null)
    const profilesSearchQuery = ref('')
    
    // Loans state
    const loans = ref([])
    const filteredLoans = ref([])
    const loansLoading = ref(false)
    const loansError = ref(null)
    const loansSearchQuery = ref('')
    
    // Loan modal state
    const showLoanModal = ref(false)
    const selectedLoan = ref(null)
    const loanHistory = ref([])
    const loadingLoanHistory = ref(false)
    
    // Common state
    const showModal = ref(false)
    const selectedProfile = ref(null)
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

    // Profiles filters
    const profilesFilters = reactive({
      District: ''
    })

    // Loans filters
    const loansFilters = reactive({
      type: '',
      year: '',
      coordinator: '',
      arms: '',
      status: ''
    })

    const districts = Object.values(DISTRICT_MAPPING)
    
    const armsOptions = Object.values(ARMS)
    
    const coordinators = ref([])

    const years = computed(() => {
      const currentYear = new Date().getFullYear()
      const years = []
      for (let year = currentYear; year >= 2020; year--) {
        years.push(year)
      }
      return years
    })

    // Load coordinators from database
    const loadCoordinators = async () => {
      try {
        const coordinatorsData = await loansService.getCoordinators()
        coordinators.value = coordinatorsData
      } catch (error) {
        console.error('Error loading coordinators:', error)
        // Fallback to empty array
        coordinators.value = []
      }
    }

    // Get coordinator name by ID or source
    const getCoordinatorName = (coordinatorId) => {
      // If coordinatorId is already a name (like "wereSL"), return it directly
      if (typeof coordinatorId === 'string' && coordinatorId.trim() !== '') {
        // Check if it's already a readable name (not an ID)
        if (coordinatorId.length > 10 || coordinatorId.includes(' ')) {
          return coordinatorId
        }
        
        // Try to find coordinator by ID first
        const coordinator = coordinators.value.find(c => c.id === coordinatorId)
        if (coordinator) {
          return `${coordinator.firstName} ${coordinator.lastName}`
        }
        
        // If not found by ID, return the source value as is
        return coordinatorId
      }
      
      return 'Unknown'
    }

    // Search type management
    const setSearchType = (type) => {
      searchType.value = type
      if (type === 'profiles') {
        loadProfiles()
      } else {
        loadLoans()
      }
    }

    // Profiles functions
    const loadProfiles = async () => {
      profilesLoading.value = true
      profilesError.value = null
      
      try {
        const loadedProfiles = await profileService.getProfiles(profilesFilters)
        
        // Filter out any null or invalid profiles
        profiles.value = loadedProfiles.filter(profile => {
          if (!profile || !profile.id) {
            console.warn('[HomePage] Found invalid profile:', profile)
            return false
          }
          return true
        })
        
        // Apply search filter
        applyProfilesSearchFilter()
        
      } catch (err) {
        console.error('[HomePage] Error loading profiles:', err);
        profilesError.value = 'Failed to load profiles: ' + err.message
      } finally {
        profilesLoading.value = false
      }
    }

    const applyProfilesSearchFilter = () => {
      if (!profilesSearchQuery.value.trim()) {
        filteredProfiles.value = profiles.value
        return
      }
      
      const query = profilesSearchQuery.value.toLowerCase().trim()
      filteredProfiles.value = profiles.value.filter(profile => {
        const name = profile.basicInfo?.name || ''
        const nic = profile.basicInfo?.nic || ''
        const regId = profile.id || ''
        
        return name.toLowerCase().includes(query) ||
               nic.toLowerCase().includes(query) ||
               regId.toLowerCase().includes(query)
      })
    }

    const handleProfilesSearch = () => {
      applyProfilesSearchFilter()
    }

    // Loans functions
    const loadLoans = async () => {
      loansLoading.value = true
      loansError.value = null
      
      try {
        const loadedLoans = await loansService.getLoans(loansFilters)
        loans.value = loadedLoans
        applyLoansSearchFilter()
        
      } catch (err) {
        console.error('[HomePage] Error loading loans:', err);
        loansError.value = 'Failed to load loans: ' + err.message
      } finally {
        loansLoading.value = false
      }
    }

    const applyLoansSearchFilter = () => {
      if (!loansSearchQuery.value.trim()) {
        filteredLoans.value = loans.value
        return
      }
      
      const query = loansSearchQuery.value.toLowerCase().trim()
      filteredLoans.value = loans.value.filter(loan => {
        const regId = loan[LOAN_FIELD.REG_ID] || ''
        const loanId = loan[LOAN_FIELD.LOAN_ID] || ''
        const projectDescription = ''
        const purpose = loan[LOAN_FIELD.PURPOSE] || ''
        
        return regId.toLowerCase().includes(query) ||
               loanId.toLowerCase().includes(query) ||
               projectDescription.toLowerCase().includes(query) ||
               purpose.toLowerCase().includes(query)
      })
    }

    const handleLoansSearch = () => {
      applyLoansSearchFilter()
    }

    // Utility functions
    const formatAmount = (amount) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'LKR'
      }).format(amount || 0)
    }

    const formatDate = (date) => {
      if (!date) return 'N/A'
      
      try {
        let dateObj
        
        // Handle Firestore timestamp
        if (date && typeof date === 'object' && date.toDate) {
          dateObj = date.toDate()
        }
        // Handle regular Date object
        else if (date instanceof Date) {
          dateObj = date
        }
        // Handle string or number
        else if (typeof date === 'string' || typeof date === 'number') {
          dateObj = new Date(date)
        }
        // Handle timestamp object
        else if (date && date.seconds) {
          dateObj = new Date(date.seconds * 1000)
        }
        else {
          return 'N/A'
        }
        
        // Check if date is valid
        if (isNaN(dateObj.getTime())) {
          return 'N/A'
        }
        
        return dateObj.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      } catch (error) {
        console.error('Error formatting date:', error, date)
        return 'N/A'
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

    const openPdfExportModal = () => {
      router.push('/pdf-export')
    }

    const handleLogoError = () => {
      logoUrl.value = '/placeholder-logo.png'
    }

    const openLoanModal = (loan) => {
      selectedLoan.value = loan
      showLoanModal.value = true
    }

    const closeLoanModal = () => {
      showLoanModal.value = false
      selectedLoan.value = null
      loanHistory.value = []
    }

    const fetchLoanHistory = async () => {
      if (!selectedLoan.value) return
      
      loadingLoanHistory.value = true
      loanHistory.value = []
      
      try {
        const regId = selectedLoan.value[LOAN_FIELD?.REG_ID] || selectedLoan.value.regId
        const loanId = selectedLoan.value[LOAN_FIELD?.LOAN_ID] || selectedLoan.value.loanId || selectedLoan.value.id
        const loanType = selectedLoan.value[LOAN_FIELD?.TYPE] || selectedLoan.value.type
        
        if (!regId || !loanId || !loanType) {
          console.error('Missing required loan data for fetching history')
          return
        }
        
        console.log(`Fetching loan history for ${loanType} loan: ${loanId} from profile: ${regId}`)
        
        // Fetch loan history from the subcollection
        const loanHistoryData = await dbOperations.getLoanHistory(regId, loanType, loanId)
        
        if (loanHistoryData && Array.isArray(loanHistoryData)) {
          loanHistory.value = loanHistoryData
          console.log('Loan history loaded:', loanHistoryData)
        } else {
          console.log('No loan history found or invalid format')
        }
        
      } catch (error) {
        console.error('Error fetching loan history:', error)
      } finally {
        loadingLoanHistory.value = false
      }
    }

    const getReceiptUrl = (fileId) => {
      return `https://drive.google.com/file/d/${fileId}/view?usp=sharing`
    }

    const formatDateCompact = (date) => {
      if (!date) return 'N/A'
      
      try {
        let dateObj
        
        if (date.toDate) {
          dateObj = date.toDate()
        } else if (typeof date === 'string') {
          if (date.includes('-') && date.split('-').length === 3) {
            const parts = date.split('-')
            if (parts[0].length === 2 && parts[1].length === 2 && parts[2].length === 4) {
              dateObj = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`)
            } else {
              dateObj = new Date(date)
            }
          } else {
            dateObj = new Date(date)
          }
        } else {
          dateObj = new Date(date)
        }
        
        if (isNaN(dateObj.getTime())) {
          return 'Invalid Date'
        }
        
        return dateObj.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })
      } catch (error) {
        return 'Invalid Date'
      }
    }

    const formatAmountCompact = (amount) => {
      if (!amount && amount !== 0) return 'N/A'
      
      try {
        const numAmount = parseFloat(amount)
        if (isNaN(numAmount)) return 'N/A'
        
        return numAmount.toLocaleString('en-US', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        })
      } catch (error) {
        return 'N/A'
      }
    }

    const goToProfile = async (regId) => {
      try {
        console.log('Loading profile for Reg ID:', regId)
        
        // Get profile data by Reg ID
        const profileResult = await dbOperations.getProfileByRegId(regId)
        if (profileResult) {
          console.log('Profile loaded successfully:', profileResult)
          
          // Pass the profile data directly to the modal
          // The ProfileModal will handle the data transformation using enums
          selectedProfile.value = profileResult
          showModal.value = true
          closeLoanModal()
        } else {
          console.error('Failed to load profile: Profile not found')
          closeLoanModal()
        }
      } catch (error) {
        console.error('Error getting profile:', error)
        // Fallback: just close the loan modal
        closeLoanModal()
      }
    }

    onMounted(() => {
      loadProfiles()
      loadLogo()
      loadCoordinators() // Load coordinators on mount
    })

          return {
      // Search type
      searchType,
      setSearchType,
      
      // Profiles
        profiles,
        filteredProfiles,
      profilesLoading,
      profilesError,
      profilesSearchQuery,
      profilesFilters,
      loadProfiles,
      handleProfilesSearch,
      
      // Loans
      loans,
      filteredLoans,
      loansLoading,
      loansError,
      loansSearchQuery,
      loansFilters,
      loadLoans,
      handleLoansSearch,
      
      // Loan Modal
      showLoanModal,
      selectedLoan,
      loanHistory,
      loadingLoanHistory,
      openLoanModal,
      closeLoanModal,
      goToProfile,
      fetchLoanHistory,
      
      // Common
        showModal,
        selectedProfile,
        logoUrl,
      districts,
      armsOptions,
      coordinators,
      years,
        openProfileModal,
        closeProfileModal,
        handleLogoError,
      openPdfExportModal,
      getCoordinatorName,
      formatAmount,
      formatDate,
      formatDateCompact,
      formatAmountCompact,
      getReceiptUrl,
      loadCoordinators,
      
      // Enums
      LOAN_FIELD
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

/* Search Toggle Styles */
.search-toggle-container {
  margin-bottom: 20px; /* Reduced margin */
  display: block; /* Ensure visibility */
  width: 100%; /* Full width */
}

.toggle-buttons {
  display: flex;
  justify-content: center;
  gap: 5px; /* Reduced gap between buttons */
  background-color: #f8f9fa;
  padding: 8px; /* Reduced padding */
  border-radius: 10px;
  max-width: 300px; /* Reduced max-width */
  margin: 0 auto;
  flex-wrap: nowrap; /* Ensure buttons stay in one line */
  width: 100%; /* Full width */
}

.toggle-btn {
  padding: 8px 16px; /* Reduced padding */
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background-color: white;
  color: #666;
  cursor: pointer;
  font-size: 13px; /* Reduced font size */
  font-weight: 600;
  transition: all 0.3s ease;
  flex: 1;
  white-space: nowrap; /* Prevent text wrapping */
  min-width: 0; /* Allow flex shrinking */
  display: block; /* Ensure visibility */
}

.toggle-btn:hover {
  border-color: #1565c0;
  color: #1565c0;
}

.toggle-btn.active {
  background-color: #1565c0;
  color: white;
  border-color: #1565c0;
}

.toggle-btn i {
  margin-right: 6px; /* Reduced icon margin */
}

.profiles-view,
.loans-view {
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
  gap: 10px; /* Reduced gap for mobile */
  justify-content: center;
  margin-bottom: 30px;
  padding: 15px; /* Reduced padding for mobile */
  background-color: #f8f9fa;
  border-radius: 10px;
}

.filters select {
  padding: 8px 12px; /* Reduced padding for mobile */
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  font-size: 14px;
  min-width: 120px; /* Reduced min-width for mobile */
  max-width: 140px; /* Added max-width to prevent overflow */
  cursor: pointer;
  flex: 1; /* Allow equal distribution */
  text-align: center; /* Center text in selects */
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

/* Loans Container Styles */
.loans-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Exactly 2 columns */
  gap: 12px;
  padding: 15px 0;
  max-width: 1200px;
  margin: 0 auto;
  /* Remove forced horizontal layout */
  /* grid-auto-flow: column; */
  /* grid-auto-columns: minmax(140px, 1fr); */
  /* overflow-x: auto; */
}

/* Fallback for browsers that don't support grid */
@supports not (display: grid) {
  .loans-container {
    display: flex;
    flex-wrap: wrap; /* Allow wrapping to new rows */
    gap: 12px;
    justify-content: flex-start;
    /* overflow-x: auto; Remove horizontal scroll */
  }
  
  .loan-card {
    flex: 0 0 calc(50% - 6px); /* Exactly 2 cards per row */
    margin-bottom: 12px; /* Add bottom margin for wrapped rows */
  }
}

.loan-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 12px; /* Reduced padding for smaller cards */
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-height: 80px; /* Reduced height for smaller cards */
  max-height: 80px; /* Fixed height for consistency */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  aspect-ratio: 1; /* Make cards square */
  width: 100%; /* Ensure full width within grid cell */
  box-sizing: border-box; /* Include padding in width calculation */
}

.loan-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  border-color: #1565c0;
}

.loan-basic-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px; /* Reduced margin for smaller cards */
}

.loan-id {
  font-weight: 600;
  color: #333;
  font-size: 12px; /* Reduced font size for smaller cards */
}

.loan-amount {
  font-size: 14px; /* Reduced font size for smaller cards */
  font-weight: 700;
  color: #1565c0;
  text-align: right;
}

.status-dot {
  display: inline-block;
  width: 6px; /* Smaller dot for smaller cards */
  height: 6px;
  border-radius: 50%;
  margin-left: 4px; /* Reduced margin for smaller cards */
}

.status-dot.active {
  background-color: #4caf50; /* Green for active */
}

.status-dot.completed {
  background-color: #ff9800; /* Orange for completed */
}

.status-dot.unknown {
  background-color: #9e9e9e; /* Gray for unknown */
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  width: 90%;
  max-width: 600px;
  max-height: 90%;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #e0e0e0;
}

.modal-header h2 {
  margin: 0;
  color: #1565c0;
  font-size: 24px;
}

.close-btn {
  background-color: #f0f0f0;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 24px;
  color: #666;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s ease;
}

.close-btn:hover {
  background-color: #e0e0e0;
}

.modal-body {
  font-size: 16px;
  color: #333;
}

.loan-detail-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px dashed #eee;
}

.loan-detail-row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.loan-detail-row.clickable {
  cursor: pointer;
  transition: background-color 0.2s ease;
  padding: 8px;
  border-radius: 4px;
}

.loan-detail-row.clickable:hover {
  background-color: #f5f5f5;
}

.detail-label {
  font-weight: 600;
  color: #555;
  min-width: 120px; /* Ensure labels don't wrap */
}

.detail-value {
  flex-grow: 1;
  text-align: left;
  color: #333;
}

.detail-value.link {
  color: #1565c0;
  text-decoration: underline;
  cursor: pointer;
}

.detail-value.link:hover {
  color: #1976d2;
}

.status-badge {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge.active {
  background-color: #4caf50;
  color: white;
}

.status-badge.completed {
  background-color: #ff9800;
  color: white;
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

/* Loan History Button */
.history-fetch-btn {
  width: 100%;
  padding: 12px 16px;
  background-color: #1565c0;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 10px;
}

.history-fetch-btn:hover:not(:disabled) {
  background-color: #0d47a1;
}

.history-fetch-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Loan History Section */
.loan-history-section {
  background-color: #f8f9fa;
  padding: 12px;
  border-radius: 8px;
  border-left: 4px solid #ff9800;
  margin-top: 15px;
}

.loan-history-section h4 {
  margin: 0 0 15px 0;
  color: #ff9800;
  font-size: 16px;
  font-weight: 600;
}

.history-timeline {
  position: relative;
}

.history-timeline::before {
  content: '';
  position: absolute;
  left: 15px;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: #ff9800;
}

.timeline-item {
  position: relative;
  margin-bottom: 20px;
  padding-left: 40px;
}

.timeline-marker {
  position: absolute;
  left: 8px;
  top: 5px;
  width: 16px;
  height: 16px;
  background-color: #ff9800;
  border-radius: 50%;
  border: 3px solid white;
}

.timeline-content {
  background-color: white;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.timeline-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.payment-date {
  font-weight: 600;
  color: #333;
  font-size: 14px;
  min-width: 80px;
}

.payment-amount {
  color: #2e7d32;
  font-weight: 600;
  font-size: 16px;
  flex: 1;
  text-align: center;
}

.receipt-link {
  min-width: 30px;
  text-align: right;
}

.receipt-icon {
  display: inline-block;
  padding: 8px;
  background-color: #1565c0;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-size: 16px;
  transition: background-color 0.2s;
  line-height: 1;
}

.receipt-icon:hover {
  background-color: #0d47a1;
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
  
  .toggle-buttons {
    flex-direction: column;
    max-width: 300px;
  }
  
  .filters {
    flex-direction: row; /* Keep filters in one row on mobile */
    flex-wrap: wrap;
    gap: 8px; /* Even smaller gap for mobile */
    padding: 12px;
    justify-content: space-between; /* Distribute evenly */
  }
  
  .filters select {
    width: calc(50% - 4px); /* Two filters per row on mobile */
    min-width: auto;
    max-width: none;
    font-size: 13px; /* Smaller font for mobile */
    padding: 6px 8px; /* Smaller padding for mobile */
  }
  
  .profile-container {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 12px;
    padding: 10px 0;
  }
  
  .loans-container {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Even smaller for mobile */
    gap: 12px; /* Smaller gap for mobile */
  }
  
  .loan-card {
    padding: 12px; /* Smaller padding for mobile */
    min-height: 70px; /* Smaller height for mobile */
  }
  
  .loan-id {
    font-size: 13px; /* Smaller font for mobile */
  }
  
  .loan-amount {
    font-size: 15px; /* Smaller font for mobile */
  }
  
  .status-dot {
    width: 8px; /* Smaller dot for mobile */
    height: 8px;
  }
  
  .modal-content {
    padding: 20px;
    width: 95%;
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
    gap: 6px; /* Smallest gap for very small screens */
  }
  
  .filters select {
    width: calc(50% - 3px); /* Two filters per row with smaller gap */
    font-size: 12px; /* Even smaller font for very small screens */
    padding: 5px 6px; /* Minimal padding for very small screens */
  }
  
  .profile-container {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 8px;
  }
  
  .loan-card {
    padding: 12px;
  }
  
  .loan-id {
    font-size: 12px;
  }
  
  .loan-amount {
    font-size: 16px;
  }
  
  .modal-content {
    padding: 15px;
    width: 98%;
  }
  
  .modal-header h2 {
    font-size: 20px;
  }
  
  .detail-label {
    min-width: 100px;
    font-size: 14px;
  }
  
  .detail-value {
    font-size: 14px;
  }
}

/* Responsive adjustments for loan container */
@media (max-width: 768px) {
  .loans-container {
    grid-template-columns: repeat(2, 1fr); /* Keep 2 columns on mobile */
    gap: 10px; /* Smaller gap on mobile */
  }
  
  .loan-card {
    padding: 10px; /* Smaller padding on mobile */
    min-height: 70px; /* Smaller height on mobile */
    max-height: 70px;
  }
  
  .loan-id {
    font-size: 11px; /* Smaller font on mobile */
  }
  
  .loan-amount {
    font-size: 13px; /* Smaller font on mobile */
  }
  
  .status-dot {
    width: 5px; /* Smaller dot on mobile */
    height: 5px;
  }
}

@media (max-width: 480px) {
  .loans-container {
    grid-template-columns: repeat(2, 1fr); /* Keep 2 columns on small mobile */
    gap: 8px; /* Even smaller gap */
  }
  
  .loan-card {
    padding: 8px; /* Minimal padding on small mobile */
    min-height: 60px; /* Smaller height on small mobile */
    max-height: 60px;
  }
  
  .loan-id {
    font-size: 10px; /* Minimal font on small mobile */
  }
  
  .loan-amount {
    font-size: 12px; /* Minimal font on small mobile */
  }
}
</style> 