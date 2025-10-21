<template>
  <div class="relative min-h-screen w-full bg-gradient-to-br from-gray-100 to-gray-200 font-display text-gray-800">
    <!-- Header -->
    <header class="sticky top-0 z-10 bg-white/80 backdrop-blur-sm shadow-sm">
      <div class="flex items-center justify-between p-4">
        <button @click="goBack" class="p-2 rounded-full hover:bg-gray-200 transition-colors">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <div class="flex items-center gap-2">
          <span :class="getStatusClass()" class="px-3 py-1 text-sm font-semibold text-white rounded-full">
            {{ getLoanStatus() }}
          </span>
          <button @click="openPrintModal" class="p-2 rounded-full hover:bg-gray-200 transition-colors" title="Print Summary">
            <span class="material-symbols-outlined">print</span>
          </button>
          <button @click="goBack" class="p-2 rounded-full hover:bg-gray-200 transition-colors">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
      </div>
    </header>

    <main class="space-y-0">
      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-12">
        <div class="loading-spinner"></div>
        <p class="mt-4 text-gray-600">Loading loan details...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-white rounded-xl shadow-md flex flex-col items-center justify-center p-8 text-center">
        <span class="material-symbols-outlined text-5xl text-red-500">error</span>
        <p class="mt-4 font-semibold text-gray-800">Failed to load loan details</p>
        <p class="text-sm text-gray-600">{{ error }}</p>
        <button @click="loadLoanDetails" class="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Retry
        </button>
      </div>

      <!-- Loan Details Content -->
      <div v-else-if="loan && profile" class="p-4">
        <div class="max-w-2xl mx-auto">
          <!-- Profile Header -->
          <div class="flex items-start gap-5 mb-6 pb-6 border-b border-gray-200/80">
            <div class="w-28 h-28 flex-shrink-0">
              <img 
                :src="profileImageUrl" 
                :alt="`Profile picture of ${profile[ProfileField.FULL_NAME]}`"
                class="w-full h-full object-cover rounded-2xl shadow-lg"
              />
            </div>
            <div class="flex-grow pt-2">
              <h1 class="font-extrabold text-2xl text-gray-800 tracking-tight">{{ profile[ProfileField.FULL_NAME] || 'Unknown' }}</h1>
              <p class="text-sm text-gray-500 mt-1">Reg_ID: {{ profile[ProfileField.REG_ID] || 'N/A' }}</p>
              <div class="mt-2 text-sm space-y-0.5">
                <p class="text-gray-500"><span class="font-medium text-gray-700">NIC:</span> {{ profile[ProfileField.NIC] || 'N/A' }}</p>
                <p class="text-gray-500"><span class="font-medium text-gray-700">District:</span> {{ profile[ProfileField.DISTRICT] || 'N/A' }}</p>
                <p class="text-gray-500"><span class="font-medium text-gray-700">Contact:</span> {{ profile[ProfileField.PHONE_NUMBER] || 'N/A' }}</p>
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <!-- Loan Details Tile -->
            <div class="tile">
              <div class="gradient-header flex justify-between items-center p-4 rounded-t-2xl border-b border-gray-200/80">
                <h2 class="font-bold text-base text-gray-700">{{ isRFLoan ? 'RF Loan Details' : 'Grant Details' }}</h2>
                <span :class="getPrintStatusClass()" class="px-3 py-1 rounded-full font-semibold text-xs border">
                  {{ getLoanStatus() }}
                </span>
              </div>
              <div class="p-4">
                <div class="space-y-4 text-sm">
                  <div class="space-y-2">
                    <div class="flex justify-between items-center">
                      <p class="font-medium text-gray-800">{{ loan[loanField.PURPOSE] || 'Loan' }} - LKR {{ formatAmount(loan[loanField.AMOUNT] || loan[loanField.APPROVED_AMOUNT]) }}</p>
                      <p class="text-gray-500 text-xs">{{ formatDateOnly(loan[loanField.APPROVED_AT] || loan[loanField.INITIATION_DATE] || loan[loanField.REQUESTED_DATE]) }}</p>
                    </div>
                      <div class="flex justify-between items-center">
                        <p v-if="loan[loanField.STATUS] !== 'completed'" class="font-semibold text-lg text-red-600">LKR {{ formatAmount(loan[loanField.CURRENT_BALANCE] || loan[loanField.AMOUNT] || loan[loanField.APPROVED_AMOUNT]) }}</p>
                        <p v-else class="font-semibold text-lg text-green-600">Completed</p>
                        <p class="text-gray-500 text-xs">{{ loanId }}</p>
                      </div>
                    <div class="flex justify-between text-xs pt-2 border-t border-gray-100">
                      <p class="text-gray-500">ARMS: <span class="font-medium text-gray-600">{{ loan[loanField.ARMS] || 'N/A' }}</span></p>
                      <p class="text-gray-500">Source: <span class="font-medium text-gray-600">{{ loan[loanField.SOURCE] || 'N/A' }}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Payment History Tile -->
            <div v-if="sortedLoanSettlementHistory.length > 0" class="tile">
              <div class="gradient-header flex justify-between items-center p-4 rounded-t-2xl border-b border-gray-200/80">
                <h2 class="font-bold text-base text-gray-700">{{ isRFLoan ? 'RF Payment History' : 'Payment History' }}</h2>
                <button @click="openReceiptFolder" class="material-symbols-outlined text-gray-500 hover:text-gray-700 transition-colors" title="Open Receipt Folder">
                  folder_open
                </button>
              </div>
              <div class="p-4">
                <div class="space-y-4 text-sm relative pl-4">
                  <div v-for="payment in sortedLoanSettlementHistory" :key="payment.RRH_ID || payment.id" class="timeline-item grid grid-cols-2 items-center relative">
                    <p class="text-gray-500 text-xs">{{ formatDateOnly(payment.approvedDate) }}</p>
                    <a 
                      v-if="payment.DRIVE_LINK_ID" 
                      :href="getReceiptUrl(payment.DRIVE_LINK_ID)" 
                      target="_blank"
                      class="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 justify-end group transition-colors duration-200"
                    >
                      <span class="font-semibold text-sm">LKR {{ formatAmount(payment.amount) }}</span>
                      <span class="material-symbols-outlined text-base transform group-hover:translate-x-0.5 transition-transform duration-200">arrow_forward</span>
                    </a>
                    <span v-else class="flex items-center gap-1.5 text-gray-500 justify-end">
                      <span class="font-semibold text-sm">LKR {{ formatAmount(payment.amount) }}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Print Modal -->
    <div v-if="showPrintModal" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-100">
      <div class="print-modal bg-white p-4 shadow-lg border border-gray-200 w-full max-w-md mx-4">
        <!-- Profile Header -->
        <div class="flex items-start gap-4 mb-4 pb-4 border-b border-gray-200">
          <div class="w-24 h-24 flex-shrink-0">
            <img 
              :src="profileImageUrl" 
              :alt="`Profile picture of ${profile[ProfileField.FULL_NAME]}`"
              class="w-full h-full object-cover rounded-md"
            />
          </div>
          <div class="flex-grow pt-2">
            <h1 class="font-bold text-lg">{{ profile[ProfileField.FULL_NAME] || 'Unknown' }}</h1>
            <p class="text-xs text-gray-600">Reg_ID: {{ profile[ProfileField.REG_ID] || 'N/A' }}</p>
            <p class="text-xs text-gray-600">NIC: {{ profile[ProfileField.NIC] || 'N/A' }}</p>
            <p class="text-xs text-gray-600">District: {{ profile[ProfileField.DISTRICT] || 'N/A' }}</p>
            <p class="text-xs text-gray-600">Contact: {{ profile[ProfileField.PHONE_NUMBER] || 'N/A' }}</p>
          </div>
        </div>

        <!-- Loan Information -->
        <div class="mt-4">
          <div class="flex justify-between items-center bg-gray-100 p-2 rounded-t-md">
            <h2 class="font-bold text-sm">{{ isRFLoan ? 'RF Loan' : 'Grant' }}</h2>
            <span :class="getPrintStatusClass()" class="px-2 py-1 rounded-full font-semibold text-xs">
              {{ getLoanStatus() }}
            </span>
          </div>
          <div class="p-3 bg-white border border-gray-200 rounded-b-md">
            <div class="space-y-3 text-xs">
              <div class="space-y-1">
                <div class="flex justify-between items-center">
                  <p>{{ loan[loanField.PURPOSE] || 'Loan' }} - LKR {{ formatAmount(loan[loanField.AMOUNT] || loan[loanField.APPROVED_AMOUNT]) }}</p>
                  <p class="text-gray-500">{{ formatDateOnly(loan[loanField.APPROVED_AT] || loan[loanField.INITIATION_DATE] || loan[loanField.REQUESTED_DATE]) }}</p>
                </div>
                  <div v-if="isRFLoan && loan[loanField.STATUS] !== 'completed'" class="flex justify-between items-center">
                    <p class="font-semibold text-red-600">LKR {{ formatAmount(loan[loanField.CURRENT_BALANCE]) }}</p>
                    <p class="text-gray-500">{{ loanId }}</p>
                  </div>
                  <div v-else-if="isRFLoan && loan[loanField.STATUS] === 'completed'" class="flex justify-between items-center">
                    <p class="font-semibold text-green-600">Completed</p>
                    <p class="text-gray-500">{{ loanId }}</p>
                  </div>
                <div class="flex justify-between">
                  <p class="text-gray-500">ARMS: {{ loan[loanField.ARMS] || 'N/A' }}</p>
                  <p class="text-gray-500">Source: {{ loan[loanField.SOURCE] || 'N/A' }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Payment History -->
        <div v-if="sortedLoanSettlementHistory.length > 0" class="mt-4">
          <div class="flex justify-between items-center bg-gray-100 p-2 rounded-t-md">
            <h2 class="font-bold text-sm">{{ isRFLoan ? 'RF Paid History' : 'Payment History' }}</h2>
          </div>
          <div class="space-y-2 text-xs p-3 bg-white border border-gray-200 rounded-b-md">
            <div v-for="payment in sortedLoanSettlementHistory" :key="payment.RRH_ID || payment.id" class="grid grid-cols-2 items-center text-center">
              <p class="text-gray-600 text-left">{{ formatDateOnly(payment.approvedDate) }}</p>
              <p class="text-right text-gray-800">LKR {{ formatAmount(payment.amount) }}</p>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="no-print mt-6 flex justify-end gap-2">
          <button 
            @click="closePrintModal" 
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { dbOperations } from '@/firebase/db.js'
import { imageService } from '@/services/imageService.js'
import { ProfileField, RF_LOAN_FIELD, GRANT_FIELD } from '@/enums/db.js'
import { formatAmount, formatDate } from '@/utils/formatUtils.ts'

export default {
  name: 'LoanDetailsPage',
  setup() {
    const route = useRoute()
    const router = useRouter()
    
    const loading = ref(true)
    const error = ref(null)
    const loan = ref(null)
    const profile = ref(null)
    const profileImageUrl = ref('/placeholder-profile.jpg')
    const loanSettlementHistory = ref([])
    const showPrintModal = ref(false)

    const regId = computed(() => route.params.regId)
    const loanId = computed(() => route.params.loanId)
    
    // Loan type constants
    const LOAN_TYPES = {
      RF: 'RF',
      GRANT: 'GRANT'
    }
    
    const loanType = computed(() => route.params.loanType || LOAN_TYPES.RF)
    const isRFLoan = computed(() => loanType.value === LOAN_TYPES.RF)
    const isGrantLoan = computed(() => loanType.value === LOAN_TYPES.GRANT)

    const loanField = computed(() => {
      return isRFLoan.value ? RF_LOAN_FIELD : GRANT_FIELD
    })

    // Sorted loan settlement history for print modal (latest first)
    const sortedLoanSettlementHistory = computed(() => {
      if (!loanSettlementHistory.value || loanSettlementHistory.value.length === 0) return []
      
      return [...loanSettlementHistory.value].sort((a, b) => {
        const dateA = parseDateForSorting(a.approvedDate)
        const dateB = parseDateForSorting(b.approvedDate)
        return dateB.getTime() - dateA.getTime() // Latest first
      })
    })

    const loadLoanDetails = async () => {
      if (!regId.value || !loanId.value) {
        error.value = 'Missing profile ID or loan ID'
        loading.value = false
        return
      }

      try {
        loading.value = true
        error.value = null

        // Load profile data
        const profileData = await dbOperations.getProfileByRegId(regId.value)
        if (!profileData) {
          error.value = 'Profile not found'
          return
        }
        profile.value = profileData

        // Load loan data
        const loanData = await dbOperations.getLoanById(regId.value, loanId.value, loanType.value)
        if (!loanData) {
          error.value = 'Loan not found'
          return
        }
        loan.value = loanData

        // Load profile image
        await loadProfileImage()

        // Load loan settlement history
        await loadLoanSettlementHistory()

      } catch (err) {
        error.value = 'Failed to load loan details'
      } finally {
        loading.value = false
      }
    }

    const loadProfileImage = async () => {
      try {
        const imageUrl = profile.value?.Image || profile.value?.imageUrl || profile.value?.basicInfo?.imageUrl
        if (!imageUrl) {
          profileImageUrl.value = '/placeholder-profile.jpg'
          return
        }

        if (imageUrl && !imageUrl.includes('http') && !imageUrl.includes('drive.google.com')) {
          const fileId = imageUrl.trim()
          if (fileId && fileId.length > 10) {
            const driveUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w400-h400`
            profileImageUrl.value = driveUrl
            return
          }
        }

        const directUrl = await imageService.debugImageUrl(imageUrl)
        profileImageUrl.value = directUrl
      } catch (error) {
        profileImageUrl.value = '/placeholder-profile.jpg'
      }
    }

    const loadLoanSettlementHistory = async () => {
      try {
        // For RF loans, get settlement history from the specific loan's loanHistory array
        if (isRFLoan.value) {
          // The loanHistory should be available in the loan data
          if (loan.value?.loanHistory && Array.isArray(loan.value.loanHistory)) {
            loanSettlementHistory.value = loan.value.loanHistory
              .map(item => ({
                ...item,
                approvedDate: item.date || item.approvedDate || item.timestamp || new Date(),
                DRIVE_LINK_ID: item.receipt_link_ID || item.DRIVE_LINK_ID,
                amount: parseFloat(item.amount) || 0,
                receiver: item.receiver || 'SYSTEM'
              }))
              .sort((a, b) => new Date(b.approvedDate) - new Date(a.approvedDate))
          } else {
            // Fallback: if loanHistory is not available, try to get it from the loan document
            const loanData = await dbOperations.getLoanById(regId.value, loanId.value, loanType.value)
            if (loanData?.loanHistory && Array.isArray(loanData.loanHistory)) {
              loanSettlementHistory.value = loanData.loanHistory
                .map(item => ({
                  ...item,
                  approvedDate: item.date || item.approvedDate || item.timestamp || new Date(),
                  DRIVE_LINK_ID: item.receipt_link_ID || item.DRIVE_LINK_ID,
                  amount: parseFloat(item.amount) || 0,
                  receiver: item.receiver || 'SYSTEM'
                }))
                .sort((a, b) => new Date(b.approvedDate) - new Date(a.approvedDate))
            } else {
              loanSettlementHistory.value = []
            }
          }
        }
        // For Grant loans, settlement history might be different
        // Add Grant-specific logic here if needed
        } catch (error) {
          loanSettlementHistory.value = []
        }
    }

    const getLoanStatus = () => {
      if (!loan.value) return 'Unknown'
      
      const status = loan.value[loanField.value.STATUS]
      if (status === 'active' || status === 'Active') return 'Active'
      if (status === 'completed' || status === 'Completed') return 'Completed'
      if (status === 'pending' || status === 'Pending') return 'Pending'
      
      return 'Active' // Default to Active
    }

    const getStatusClass = () => {
      const status = getLoanStatus()
      switch (status) {
        case 'Active':
          return 'bg-active-green'
        case 'Completed':
          return 'bg-completed-blue'
        case 'Pending':
          return 'bg-yellow-500'
        default:
          return 'bg-gray-500'
      }
    }

    const getReceiptUrl = (fileId) => {
      if (!fileId) return '#'
      
      // If it's already a full Google Drive URL, extract the file ID
      if (fileId.includes('drive.google.com')) {
        const match = fileId.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)
        if (match && match[1]) {
          return `https://drive.google.com/file/d/${match[1]}/view`
        }
        return '#'
      }
      
      // If it's just a file ID, use it directly
      return `https://drive.google.com/file/d/${fileId}/view`
    }

    // Parse date for sorting - handles various date formats
    const parseDateForSorting = (date) => {
      if (!date) return new Date(0) // Use epoch for missing dates
      
      try {
        let dateObj
        
        // Handle Firebase Timestamp objects with .toDate() method
        if (date.toDate) {
          dateObj = date.toDate()
        } 
        // Handle Firebase Timestamp objects with seconds/nanoseconds properties (from dev-data-dashboard)
        else if (date.seconds && typeof date.seconds === 'number') {
          dateObj = new Date(date.seconds * 1000)
        }
        // Handle plain timestamp numbers
        else if (typeof date === 'number') {
          dateObj = new Date(date * 1000) // Assume seconds if it's a reasonable timestamp
        }
        else if (typeof date === 'string') {
          // Handle DD-MM-YYYY format (common in our database)
          if (date.includes('-') && date.split('-').length === 3) {
            const parts = date.split('-')
            if (parts[0].length === 2 && parts[1].length === 2 && parts[2].length === 4) {
              // DD-MM-YYYY format - convert to YYYY-MM-DD for proper parsing
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
          return new Date(0) // Use epoch for invalid dates
        }
        
        return dateObj
      } catch (error) {
        return new Date(0) // Use epoch for parsing errors
      }
    }

    // Format date without time for print modal
    const formatDateOnly = (date) => {
      if (!date) return 'N/A'
      try {
        let dateObj
        
        // Handle Firebase Timestamp objects with .toDate() method
        if (date.toDate) {
          dateObj = date.toDate()
        } 
        // Handle Firebase Timestamp objects with seconds/nanoseconds properties (from dev-data-dashboard)
        else if (date.seconds && typeof date.seconds === 'number') {
          dateObj = new Date(date.seconds * 1000)
        }
        // Handle plain timestamp numbers
        else if (typeof date === 'number') {
          dateObj = new Date(date * 1000) // Assume seconds if it's a reasonable timestamp
        }
        else if (typeof date === 'string') {
          // Handle DD-MM-YYYY format (common in our database)
          if (date.includes('-') && date.split('-').length === 3) {
            const parts = date.split('-')
            if (parts[0].length === 2 && parts[1].length === 2 && parts[2].length === 4) {
              // DD-MM-YYYY format - convert to YYYY-MM-DD for proper parsing
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
          year: 'numeric', month: 'short', day: 'numeric'
        })
      } catch (error) {
        return 'Invalid Date'
      }
    }

    // Print modal functions
    const openPrintModal = () => {
      showPrintModal.value = true
    }

    const closePrintModal = () => {
      showPrintModal.value = false
    }

    const getPrintStatusClass = () => {
      const status = getLoanStatus()
      switch (status) {
        case 'Active':
          return 'text-green-700 bg-green-100/80 border-green-200/80'
        case 'Completed':
          return 'text-blue-700 bg-blue-100/80 border-blue-200/80'
        case 'Pending':
          return 'text-yellow-700 bg-yellow-100/80 border-yellow-200/80'
        default:
          return 'text-gray-700 bg-gray-100/80 border-gray-200/80'
      }
    }

    const openReceiptFolder = async () => {
      try {
        const folderLink = await dbOperations.getRFBillDriveFolderLink(regId.value)
        if (folderLink) {
          window.open(folderLink, '_blank')
        }
      } catch (error) {
        // Silently handle error
      }
    }

    const goBack = () => {
      router.push(`/${regId.value}`)
    }

    onMounted(() => {
      loadLoanDetails()
    })

    return {
      loading,
      error,
      loan,
      profile,
      profileImageUrl,
      loanSettlementHistory,
      sortedLoanSettlementHistory,
      showPrintModal,
      regId,
      loanId,
      loanType,
      isRFLoan,
      isGrantLoan,
      loanField,
      loadLoanDetails,
      getLoanStatus,
      getStatusClass,
      getReceiptUrl,
      parseDateForSorting,
      formatDateOnly,
      openPrintModal,
      closePrintModal,
      getPrintStatusClass,
      openReceiptFolder,
      goBack,
      formatAmount,
      formatDate,
      ProfileField,
      RF_LOAN_FIELD,
      GRANT_FIELD,
      LOAN_TYPES
    }
  }
}
</script>

<style scoped>
.tile {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease-in-out;
}

.tile:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

.gradient-header {
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -16px;
  top: 8px;
  width: 8px;
  height: 8px;
  background-color: #d1d5db;
  border-radius: 9999px;
}

.timeline-item:not(:last-child)::after {
  content: '';
  position: absolute;
  left: -13px;
  top: 20px;
  width: 2px;
  height: calc(100% - 4px);
  background-color: #e5e7eb;
}

.print-modal {
  max-width: 420px;
  margin: auto;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

@media print {
  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    background: none;
  }
  .no-print {
    display: none;
  }
  .print-modal {
    box-shadow: none;
    border: none;
    max-width: 100%;
    border-radius: 0;
  }
  .tile {
    box-shadow: none;
    border: 1px solid #e5e7eb;
  }
}
</style>

