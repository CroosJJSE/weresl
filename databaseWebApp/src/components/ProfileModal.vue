<template>
  <div v-if="isVisible && profile" class="modal" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="close-button" @click="closeModal">&times;</div>
      <div class="modal-header">
        <div class="header-content">
          <h2>{{ profile[ProfileField.FULL_NAME] || profile.basicInfo?.name || 'Unknown' }}</h2>
          <div class="profile-types">
            <span v-for="type in profileTypes" :key="type" :class="`profile-type ${type.toLowerCase()}-type`">{{ type }}</span>
          </div>
        </div>
      </div>
      <div class="modal-body">
        <div class="profile-image-section">
          <img :src="profileImageUrl" :alt="profile[ProfileField.FULL_NAME] || 'Profile Image'" @error="handleImageError" @load="handleImageLoad" class="profile-image" />
        </div>
        <div class="basic-info">
          <div class="info-grid">
            <div class="info-row"><div class="info-item"><strong>Registration ID:</strong> {{ profile[ProfileField.REG_ID] || profile.id }}</div></div>
            <div class="info-row"><div class="info-item"><strong>District:</strong> {{ profile[ProfileField.DISTRICT] || profile.basicInfo?.District || 'N/A' }}</div></div>
            <div class="info-row"><div class="info-item"><strong>Age:</strong> {{ calculateAge(profile[ProfileField.YEAR_OF_BIRTH] || profile.basicInfo?.age) }}</div></div>
            <div class="info-row"><div class="info-item"><strong>Address:</strong> {{ profile[ProfileField.ADDRESS] || profile.basicInfo?.address || 'N/A' }}</div></div>
            <div class="info-row"><div class="info-item"><strong>NIC:</strong> {{ profile[ProfileField.NIC] || profile.basicInfo?.nic || 'N/A' }}</div></div>
            <div class="info-row"><div class="info-item"><strong>Contact:</strong> {{ profile[ProfileField.PHONE_NUMBER] || profile.basicInfo?.phone || 'N/A' }}</div></div>
            <div class="info-row"><div class="info-item"><strong>Occupation:</strong> {{ profile[ProfileField.OCCUPATION] || profile.basicInfo?.occupation || 'N/A' }}</div></div>
          </div>
        </div>
        <!-- Description -->
        <div v-if="profile[ProfileField.DESCRIPTION]" class="project-section">
          <div class="project-header">Additional Information</div>
          <p>{{ profile[ProfileField.DESCRIPTION] }}</p>
        </div>
        <!-- RF Projects Section -->
        <div v-if="loadingDetails" class="project-section">
          <div class="project-header">RF Projects</div>
          <div class="project-details" style="flex-direction: column; align-items: center; padding: 20px;">
            <div class="loading-spinner"></div>
            <p style="color: #666; margin: 10px 0 0 0;">Loading loan details...</p>
          </div>
        </div>
        
        <div v-else-if="profileDetails && (profileDetails.activeRFLoans?.length > 0 || profileDetails.completedRFLoans?.length > 0)" class="project-section">
          <div class="project-header">RF Projects</div>
          <div class="project-details" style="flex-direction: column;">
            <div style="text-align: center; font-weight: bold; margin-bottom: 10px;">RF Loans</div>
            
            <!-- Active RF Loans -->
            <div v-if="profileDetails.activeRFLoans && profileDetails.activeRFLoans.length > 0">
              <div style="font-size: 12px; color: #1565c0; margin: 10px 0 5px 20px; font-weight: 600;">Active Loans</div>
              <div v-for="loan in profileDetails.activeRFLoans" :key="loan.id" class="loan-tile" @click="openLoanDetails(loan)">
                <div class="loan-tile-content">
                  <div class="loan-tile-left">
                    <div class="loan-purpose">{{ loan[RF_LOAN_FIELD.PURPOSE] || 'RF Project' }}</div>
                    <div class="loan-status-badge active">Active</div>
                    <div v-if="loan[RF_LOAN_FIELD.CURRENT_BALANCE]" class="loan-balance">Balance: Rs. {{ formatAmount(loan[RF_LOAN_FIELD.CURRENT_BALANCE]) }}</div>
                  </div>
                  <div class="loan-tile-right">
                    <div class="loan-amount">Rs. {{ formatAmount(loan[RF_LOAN_FIELD.AMOUNT]) }}</div>
                    <div class="loan-date">{{ formatDate(loan[RF_LOAN_FIELD.INITIATION_DATE]) }}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Completed RF Loans -->
            <div v-if="profileDetails.completedRFLoans && profileDetails.completedRFLoans.length > 0">
              <div style="font-size: 12px; color: #2e7d32; margin: 10px 0 5px 20px; font-weight: 600;">Completed Loans</div>
              <div v-for="loan in profileDetails.completedRFLoans" :key="loan.id" class="loan-tile" @click="openLoanDetails(loan)">
                <div class="loan-tile-content">
                  <div class="loan-tile-left">
                    <div class="loan-purpose">{{ loan[RF_LOAN_FIELD.PURPOSE] || 'RF Project' }}</div>
                    <div class="loan-status-badge completed">Completed</div>
                    <div v-if="loan[RF_LOAN_FIELD.LOAN_HISTORY] && loan[RF_LOAN_FIELD.LOAN_HISTORY].length > 0" class="loan-payments">
                      {{ loan[RF_LOAN_FIELD.LOAN_HISTORY].length }} payment{{ loan[RF_LOAN_FIELD.LOAN_HISTORY].length > 1 ? 's' : '' }}
                    </div>
                  </div>
                  <div class="loan-tile-right">
                    <div class="loan-amount">Rs. {{ formatAmount(loan[RF_LOAN_FIELD.AMOUNT]) }}</div>
                    <div class="loan-date">{{ formatDate(loan[RF_LOAN_FIELD.INITIATION_DATE]) }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- RF Payment History: prefer parsed array, fallback to map -->
        <div v-if="profileDetails && profileDetails.returnHistory && profileDetails.returnHistory.length > 0" class="project-details" style="flex-direction: column;">
          <div style="text-align: center; font-weight: bold; margin-bottom: 5px;">RF Payment History</div>
          <div v-for="payment in profileDetails.returnHistory" :key="payment.dateKey" style="display: flex; justify-content: space-between; padding: 5px 0; margin-left: 20px;">
            <span style="color: #2e7d32">{{ payment.parsedDate || payment.dateKey }}</span>
            <span style="margin-left: 10px;">Rs. {{ formatAmount(payment.amount) }}</span>
          </div>
        </div>
        <div v-else-if="getRFReturnHistoryArray().length > 0" class="project-details" style="flex-direction: column;">
          <div style="text-align: center; font-weight: bold; margin-bottom: 5px;">RF Payment History</div>
          <div v-for="payment in getRFReturnHistoryArray()" :key="payment.dateKey" style="display: flex; justify-content: space-between; padding: 5px 0; margin-left: 20px;">
            <span style="color: #2e7d32">{{ payment.dateKey }}</span>
            <span style="margin-left: 10px;">Rs. {{ formatAmount(payment.amount) }}</span>
          </div>
        </div>
        <!-- GRANT Projects Section: prefer map, fallback to array -->
        <div v-if="getGrantArray().length > 0" class="project-section">
          <div class="project-header">GRANT Projects</div>
          <div class="project-details" style="flex-direction: column;">
            <div style="text-align: center; font-weight: bold; margin-bottom: 10px;">GRANT Loans</div>
            <div v-for="(grant, idx) in getGrantArray()" :key="grant.id || idx" class="loan-tile" @click="openLoanDetails(grant)">
              <div class="loan-tile-content">
                <div class="loan-tile-left">
                  <div class="loan-purpose">{{ grant[GRANT_FIELD.PURPOSE] || grant.purpose || 'GRANT Project' }}</div>
                  <div class="loan-status-badge grant">GRANT</div>
                  <div v-if="grant.currentBalance" class="loan-balance">Balance: Rs. {{ formatAmount(grant.currentBalance) }}</div>
                </div>
                <div class="loan-tile-right">
                  <div class="loan-amount">Rs. {{ formatAmount(grant[GRANT_FIELD.AMOUNT] || grant[GRANT_FIELD.APPROVED_AMOUNT] || grant.amount || grant.approvedAmount || grant.currentBalance) }}</div>
                  <div class="loan-date">{{ formatDate(grant[GRANT_FIELD.REQUESTED_DATE] || grant[GRANT_FIELD.CREATED_AT] || grant.requestedDate || grant.createdAt || grant.initiationDate || grant.approvedAt) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Error message -->
        <div v-if="loadError" class="error-section">
          <p style="color: #d32f2f; text-align: center;">Error loading profile details. Please try again.</p>
        </div>
      </div>
    </div>
    
    <!-- Loan Details Modal -->
    <LoanDetailsModal 
      :loan="selectedLoan" 
      :isVisible="showLoanDetails" 
      @close="closeLoanDetails" 
    />
  </div>
</template>

<script>
import { computed, ref, onMounted, watch } from 'vue'
import { profileService } from '@/services/profile.js'
import { imageService } from '@/services/imageService.js'
import { dbOperations } from '@/firebase/db.js'
import { ProfileField, RF_LOAN_FIELD, GRANT_FIELD } from '@/enums/db.js'
import LoanDetailsModal from './LoanDetailsModal.vue'
import { formatAmount, formatDate, calculateAge } from '@/utils/formatUtils.ts'

export default {
  name: 'ProfileModal',
  components: {
    LoanDetailsModal
  },
  props: {
    profile: {
      type: Object,
      required: true
    },
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const profileImageUrl = ref('/placeholder-profile.jpg')
    const imageLoading = ref(true)
    const loadingDetails = ref(false)
    const profileDetails = ref(null)
    const loadError = ref(false)
    const selectedLoan = ref(null)
    const showLoanDetails = ref(false)

    const profileTypes = computed(() => {
      return profileService.getProfileTypes(props.profile)
    })



    // Helper: parse RF_return_history map to array
    const getRFReturnHistoryArray = () => {
      const map = props.profile[ProfileField.RF_RETURN_HISTORY]
      if (!map || typeof map !== 'object') return []
      return Object.entries(map).map(([key, value]) => ({
        dateKey: key,
        amount: value
      }))
    }

    // Helper: get GRANTs as array
    const getGrantArray = () => {
      // First try to get from profile details (subcollection data)
      if (profileDetails.value?.activeGrants && profileDetails.value.activeGrants.length > 0) {
        return profileDetails.value.activeGrants;
      }
      
      // Then try to get from profile's Grant field
      const grantMap = props.profile[ProfileField.GRANT];
      if (grantMap && typeof grantMap === 'object') {
        return Object.values(grantMap);
      }
      
      // Finally try from profile's GRANT field (different casing)
      const grantData = props.profile.GRANT;
      if (grantData && typeof grantData === 'object') {
        return Object.values(grantData);
      }
      
      return [];
    }

    const loadProfileDetails = async () => {
      if (!props.profile?.id) return
      try {
        loadingDetails.value = true
        loadError.value = false
        profileDetails.value = null
        const details = await dbOperations.getProfileDetails(props.profile.id)
        if (props.profile?.id === props.profile?.id) {
          profileDetails.value = details
        }
      } catch (error) {
        loadError.value = true
      } finally {
        loadingDetails.value = false
      }
    }

    const loadProfileImage = async () => {
      try {
        const imageUrl = props.profile?.Image || props.profile?.imageUrl || props.profile?.basicInfo?.imageUrl;
        if (!props.profile || !imageUrl) {
          profileImageUrl.value = '/placeholder-profile.jpg'
          return
        }
        if (imageUrl && !imageUrl.includes('http') && !imageUrl.includes('drive.google.com')) {
          const fileId = imageUrl.trim();
          if (fileId && fileId.length > 10) {
            const driveUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w400-h400`;
            profileImageUrl.value = driveUrl;
            return;
          }
        }
        const directUrl = await imageService.debugImageUrl(imageUrl)
        profileImageUrl.value = directUrl
      } catch (error) {
        profileImageUrl.value = '/placeholder-profile.jpg'
      }
    }

    const handleImageError = () => {
      profileImageUrl.value = '/placeholder-profile.jpg'
      imageLoading.value = false
    }
    const handleImageLoad = () => {
      imageLoading.value = false
    }
    const closeModal = () => {
      emit('close')
    }

    const openLoanDetails = (loan) => {
      selectedLoan.value = loan
      showLoanDetails.value = true
    }

    const closeLoanDetails = () => {
      showLoanDetails.value = false
      selectedLoan.value = null
    }
    onMounted(() => {
      if (props.isVisible && props.profile?.id) {
        loadProfileDetails()
        loadProfileImage()
      }
    })
    watch(() => [props.isVisible, props.profile?.id], ([isVisible, profileId]) => {
      if (isVisible && profileId) {
        profileDetails.value = null
        loadError.value = false
        loadProfileDetails()
        loadProfileImage()
      }
    }, { immediate: true })
    return {
      profileImageUrl,
      imageLoading,
      profileTypes,
      formatAmount,
      formatDate,
      calculateAge,
      handleImageError,
      handleImageLoad,
      closeModal,
      loadingDetails,
      profileDetails,
      loadError,
      getRFReturnHistoryArray,
      getGrantArray,
      openLoanDetails,
      closeLoanDetails,
      selectedLoan,
      showLoanDetails,
      ProfileField,
      RF_LOAN_FIELD,
      GRANT_FIELD
    }
  }
}
</script>

<style scoped>
/* Loading Spinner */
.loading-spinner {
  width: 30px;
  height: 30px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #1565c0;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.modal {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 10px;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 24px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #f5f5f5;
  border-radius: 20px;
  color: #333;
  z-index: 10;
}

.close-button:hover {
  background-color: #e0e0e0;
}

.modal-header {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #eee;
}

.header-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.modal-header h2 {
  margin: 0;
  color: #1565c0;
  font-size: 24px;
  text-align: center;
}

.profile-types {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

.profile-type {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
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

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.profile-image-section {
  text-align: center;
}

.profile-image {
  width: 100%;
  max-width: 300px;
  height: auto;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-height: 200px;
}

.loading-section {
  text-align: center;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #1565c0;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-section {
  text-align: center;
  padding: 15px;
  background-color: #ffebee;
  border-radius: 10px;
  border: 1px solid #f44336;
}

/* Project Section Styles */
.project-section {
  margin: 20px 0;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 10px;
}

.project-header {
  font-size: 18px;
  font-weight: 600;
  color: #1565c0;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 2px solid #1565c0;
}

.project-details {
  margin: 10px 0;
  padding: 10px;
  background-color: white;
  border-radius: 8px;
  border-left: 4px solid #1565c0;
}

.basic-info h3 {
  color: #1565c0;
  margin-bottom: 15px;
  font-size: 18px;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.info-item {
  padding: 6px 0;
  border-bottom: 1px solid #f0f0f0;
  flex: 1;
  font-size: 14px;
}

.info-item.full-width {
  flex: none;
  width: 100%;
}

.info-item strong {
  color: #1565c0;
  display: inline-block;
  min-width: 60px;
  font-size: 13px;
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .modal {
    padding: 5px;
  }
  
  .modal-content {
    padding: 15px;
    border-radius: 10px;
    max-height: 95vh;
  }
  
  .modal-header h2 {
    font-size: 20px;
  }
  
  .profile-types {
    gap: 6px;
  }
  
  .profile-type {
    padding: 4px 10px;
    font-size: 11px;
  }
  
  .profile-image {
    max-width: 250px;
    max-height: 150px;
  }
  
  .project-section {
    padding: 10px;
  }
  
  .project-header {
    font-size: 16px;
  }
  
  .project-details {
    padding: 8px;
  }
  
  .info-item {
    font-size: 13px;
    padding: 4px 0;
  }
  
  .info-item strong {
    min-width: 50px;
    font-size: 12px;
  }
  
  .info-row {
    gap: 8px;
  }
}

/* Landscape orientation adjustments */
@media (max-width: 768px) and (orientation: landscape) {
  .modal-content {
    max-height: 98vh;
    max-width: 90vw;
  }
  
  .profile-image {
    max-width: 200px;
    max-height: 120px;
  }
  
  .modal-body {
    gap: 15px;
  }
  
  .basic-info h3 {
    font-size: 16px;
    margin-bottom: 10px;
  }
  
  .info-grid {
    gap: 3px;
  }
  
  .info-item {
    font-size: 12px;
    padding: 3px 0;
  }
  
  .info-item strong {
    min-width: 45px;
    font-size: 11px;
  }
}

/* Loan Tile Styles */
.loan-tile {
  margin: 8px 0;
  padding: 12px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.loan-tile:hover {
  border-color: #1565c0;
  box-shadow: 0 2px 6px rgba(21, 101, 192, 0.2);
  transform: translateY(-1px);
}

.loan-tile-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
}

.loan-tile-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.loan-tile-right {
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.loan-purpose {
  font-weight: 600;
  color: #333;
  font-size: 14px;
  line-height: 1.3;
}

.loan-status-badge {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  align-self: flex-start;
}

.loan-status-badge.active {
  background-color: #e3f2fd;
  color: #1565c0;
  border: 1px solid #1565c0;
}

.loan-status-badge.completed {
  background-color: #e8f5e9;
  color: #2e7d32;
  border: 1px solid #2e7d32;
}

.loan-status-badge.grant {
  background-color: #ffebee;
  color: #c62828;
  border: 1px solid #c62828;
}

.loan-balance {
  font-size: 11px;
  color: #d32f2f;
  font-weight: 500;
}

.loan-payments {
  font-size: 11px;
  color: #2e7d32;
  font-weight: 500;
}

.loan-amount {
  font-weight: 600;
  color: #2e7d32;
  font-size: 14px;
}

.loan-date {
  font-size: 11px;
  color: #666;
}

/* Mobile optimizations for loan tiles */
@media (max-width: 768px) {
  .loan-tile {
    padding: 10px;
    margin: 6px 0;
  }
  
  .loan-tile-content {
    gap: 8px;
  }
  
  .loan-purpose {
    font-size: 13px;
  }
  
  .loan-status-badge {
    padding: 2px 6px;
    font-size: 9px;
  }
  
  .loan-balance,
  .loan-payments {
    font-size: 10px;
  }
  
  .loan-amount {
    font-size: 13px;
  }
  
  .loan-date {
    font-size: 10px;
  }
}

@media (max-width: 768px) and (orientation: landscape) {
  .loan-tile {
    padding: 8px;
    margin: 4px 0;
  }
  
  .loan-tile-content {
    gap: 6px;
  }
  
  .loan-purpose {
    font-size: 12px;
  }
  
  .loan-status-badge {
    padding: 2px 5px;
    font-size: 8px;
  }
  
  .loan-balance,
  .loan-payments {
    font-size: 9px;
  }
  
  .loan-amount {
    font-size: 12px;
  }
  
  .loan-date {
    font-size: 9px;
  }
}
</style> 