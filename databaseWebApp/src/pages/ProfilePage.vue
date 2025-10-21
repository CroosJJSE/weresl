<template>
  <div class="bg-gray-50 text-gray-800">
    <div class="max-w-4xl mx-auto bg-white min-h-screen">
      <!-- Header -->
      <header class="no-print bg-blue-600 text-white p-4 flex justify-between items-center sticky top-0 z-10 shadow-md">
        <button @click="goBack" class="p-2 hover:bg-blue-700 rounded-full transition-colors">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="text-xl font-bold">Profile Details</h1>
        <div class="flex items-center gap-2">
          <button @click="openPrintModal" class="p-2 hover:bg-blue-700 rounded-full transition-colors" title="Print Summary">
            <span class="material-symbols-outlined">print</span>
          </button>
        </div>
      </header>

      <!-- Breadcrumbs -->
      <nav v-if="profile" class="no-print bg-gray-100 text-sm text-gray-600 px-4 py-2">
        <ol class="list-none p-0 inline-flex">
          <li class="flex items-center">
            <a @click="goBack" class="hover:text-blue-600 cursor-pointer">Home</a>
            <span class="material-symbols-outlined mx-2 text-sm">chevron_right</span>
          </li>
          <li class="flex items-center">
            <a @click="goBack" class="hover:text-blue-600 cursor-pointer">Users</a>
            <span class="material-symbols-outlined mx-2 text-sm">chevron_right</span>
          </li>
          <li>{{ profile[ProfileField.FULL_NAME] || 'Unknown' }}</li>
        </ol>
      </nav>

      <main class="p-4 sm:p-6">
        <!-- Loading State -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-12">
          <div class="loading-spinner"></div>
          <p class="mt-4 text-gray-600">Loading profile...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="bg-white rounded-xl shadow-md flex flex-col items-center justify-center p-8 text-center">
          <span class="material-symbols-outlined text-5xl text-red-500">error</span>
          <p class="mt-4 font-semibold text-gray-800">Failed to load profile</p>
          <p class="text-sm text-gray-600">{{ error }}</p>
          <button @click="loadProfile" class="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Retry
          </button>
        </div>

        <!-- Profile Content -->
        <div v-else-if="profile">
          <!-- Profile Header Section -->
          <section class="text-center mb-8">
            <img 
              :src="profileImageUrl" 
              :alt="`Profile picture of ${profile[ProfileField.FULL_NAME]}`"
              class="w-36 h-36 mx-auto rounded-lg object-cover shadow-lg border-4 border-white"
              @error="handleImageError"
            />
            <h2 class="text-2xl font-bold mt-4">{{ profile[ProfileField.FULL_NAME] || 'Unknown' }}</h2>
            <p class="text-gray-500">Reg_ID: {{ profile[ProfileField.REG_ID] || 'N/A' }}</p>
            <div class="flex justify-center items-center gap-2 mt-2">
              <span v-for="type in profileTypes" :key="type" 
                    :class="getProfileTypeClass(type)"
                    class="text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {{ type }}
              </span>
            </div>
            <div class="flex justify-center items-center gap-4 text-gray-500 mt-2 text-sm">
              <span>District: {{ profile[ProfileField.DISTRICT] || 'N/A' }}</span>
              <span>Age: {{ calculateAge(profile[ProfileField.YEAR_OF_BIRTH]) }}</span>
            </div>
          </section>

          <!-- Basic Information Section -->
          <section class="mb-8">
            <div class="bg-white p-4 rounded-lg tile-shadow print-shadow-none border border-gray-200">
              <h3 class="font-bold text-lg mb-4 text-blue-600">Basic Information</h3>
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <label class="text-xs text-gray-500">Phone</label>
                  <p class="font-medium">{{ profile[ProfileField.PHONE_NUMBER] || '-' }}</p>
                </div>
                <div>
                  <label class="text-xs text-gray-500">NIC</label>
                  <p class="font-medium">{{ profile[ProfileField.NIC] || '-' }}</p>
                </div>
                <div class="col-span-2">
                  <label class="text-xs text-gray-500">Address</label>
                  <p class="font-medium">{{ profile[ProfileField.ADDRESS] || '-' }}</p>
                </div>
                <div>
                  <label class="text-xs text-gray-500">Occupation</label>
                  <p class="font-medium">{{ profile[ProfileField.OCCUPATION] || '-' }}</p>
                </div>
              </div>
            </div>
          </section>

          <!-- RF Projects Section -->
          <section v-if="hasRFLoans" class="mb-8">
            <details open="">
              <summary class="flex justify-between items-center cursor-pointer mb-4">
                <h3 class="font-bold text-lg text-green-600">RF Projects</h3>
                <span class="material-symbols-outlined transition-transform duration-300">expand_more</span>
              </summary>
              <div class="space-y-4">
                <div v-for="loan in rfLoans" :key="loan.id" 
                     @click="openLoanDetails(loan.id, LOAN_TYPES.RF)"
                     class="bg-white p-4 rounded-lg tile-shadow print-shadow-none border border-l-4 cursor-pointer hover:shadow-lg transition-shadow"
                     :class="loan[RF_LOAN_FIELD.STATUS] === 'active' ? 'border-green-500' : loan[RF_LOAN_FIELD.STATUS] === 'pending' ? 'border-red-500' : 'border-gray-400 opacity-80'">
                  <div class="flex justify-between items-start">
                    <div>
                      <h4 class="font-bold text-base">{{ loan[RF_LOAN_FIELD.PURPOSE] || 'RF Loan' }}</h4>
                      <p class="text-sm text-gray-500">Amount: LKR {{ formatAmount(loan[RF_LOAN_FIELD.AMOUNT]) }}</p>
                      <p v-if="loan[RF_LOAN_FIELD.STATUS] === 'active'" class="text-sm font-semibold text-red-600">
                        Balance: LKR {{ formatAmount(loan[RF_LOAN_FIELD.CURRENT_BALANCE]) }}
                      </p>
                      <p v-else-if="loan[RF_LOAN_FIELD.STATUS] === 'pending'" class="text-sm font-semibold text-orange-600">
                        Pending Approval
                      </p>
                      <p v-else class="text-sm font-semibold text-green-600">Completed</p>
                    </div>
                    <span :class="getLoanStatusClass(loan[RF_LOAN_FIELD.STATUS])" 
                          class="text-xs font-bold px-3 py-1 rounded-full">
                      {{ getLoanStatusText(loan[RF_LOAN_FIELD.STATUS]) }}
                    </span>
                  </div>
                  <div class="text-xs text-gray-500 mt-3 pt-3 border-t flex justify-between">
                    <span>Approved: {{ formatDateOnly(loan[RF_LOAN_FIELD.APPROVED_AT] || loan[RF_LOAN_FIELD.INITIATION_DATE]) }}</span>
                    <span>{{ loan.id }}</span>
                  </div>
                </div>
              </div>
            </details>
          </section>

          <!-- RF Payment History Section -->
          <section v-if="hasRFPaymentHistory" class="mb-8">
            <details open="">
              <summary class="flex justify-between items-center cursor-pointer mb-4">
                <h3 class="font-bold text-lg text-gray-700 flex items-center gap-2">
                  <span class="material-symbols-outlined text-gray-500">folder</span>RF Payment History
                </h3>
                <span class="material-symbols-outlined transition-transform duration-300">expand_more</span>
              </summary>
              <div class="bg-white p-4 rounded-lg tile-shadow print-shadow-none border border-gray-200">
                <div class="space-y-4">
                  <div class="grid grid-cols-4 items-center text-sm font-bold text-gray-500 border-b pb-2">
                    <p>Date</p>
                    <p class="text-center">Project</p>
                    <p class="text-center">Receiver</p>
                    <p class="text-right">Amount</p>
                  </div>
                  <div v-for="payment in sortedRFReturnHistory" :key="payment.RRH_ID" 
                       class="grid grid-cols-4 items-center text-sm py-2 border-b"
                       :class="payment.opacity ? 'opacity-60' : ''">
                    <p class="text-gray-500">{{ formatDateOnly(payment.approvedDate) }}</p>
                    <p class="font-medium text-center text-xs">{{ getProjectName(payment.targetLoan) || '-' }}</p>
                    <p class="font-medium text-center">{{ payment.receiver || '-' }}</p>
                    <a v-if="payment.DRIVE_LINK_ID" 
                       :href="getReceiptUrl(payment.DRIVE_LINK_ID)" 
                       target="_blank"
                       class="flex items-center gap-1 text-blue-600 hover:underline justify-end font-semibold">
                      <span>{{ formatAmount(payment.amount) }}</span>
                      <span class="material-symbols-outlined text-sm no-print">open_in_new</span>
                    </a>
                    <span v-else class="text-gray-500 justify-end font-semibold text-right">
                      {{ formatAmount(payment.amount) }}
                    </span>
                  </div>
                </div>
              </div>
            </details>
          </section>

          <!-- Grant Projects Section -->
          <section v-if="hasGrantLoans">
            <details open="">
              <summary class="flex justify-between items-center cursor-pointer mb-4">
                <h3 class="font-bold text-lg text-red-600">Grant Projects</h3>
                <span class="material-symbols-outlined transition-transform duration-300">expand_more</span>
              </summary>
              <div class="bg-white p-4 rounded-lg tile-shadow print-shadow-none border border-gray-200">
                <div class="space-y-4">
                  <div v-for="grant in grantLoans" :key="grant.id" 
                       class="grid grid-cols-3 items-center text-sm py-2 border-b">
                    <span class="text-sm font-semibold text-gray-800">{{ grant[GRANT_FIELD.PURPOSE] || 'Grant' }}</span>
                    <span class="text-sm text-gray-500 text-center">LKR {{ formatAmount(grant[GRANT_FIELD.AMOUNT] || grant[GRANT_FIELD.APPROVED_AMOUNT]) }}</span>
                    <span class="text-sm text-gray-500 text-right">{{ formatDateOnly(grant[GRANT_FIELD.APPROVED_AT] || grant[GRANT_FIELD.REQUESTED_DATE]) }}</span>
                  </div>
                </div>
              </div>
            </details>
          </section>

          <!-- GIF Projects Section -->
          <section v-if="hasGifItems">
            <details open="">
              <summary class="flex justify-between items-center cursor-pointer mb-4">
                <h3 class="font-bold text-lg text-blue-600">GIF Projects</h3>
                <span class="material-symbols-outlined transition-transform duration-300">expand_more</span>
              </summary>
              <div class="bg-white p-4 rounded-lg tile-shadow print-shadow-none border border-gray-200">
                <div class="space-y-4">
                  <div v-for="(gifItem, index) in gifItems" :key="index" 
                       class="grid grid-cols-1 items-center text-sm py-2 border-b">
                    <span class="text-sm font-semibold text-gray-800">{{ gifItem.description || gifItem }}</span>
                  </div>
                </div>
              </div>
            </details>
          </section>
        </div>
      </main>
    </div>

    <!-- Print Modal -->
    <PrintModal 
      v-if="showPrintModal" 
      :show="showPrintModal" 
      :profile="profile" 
      :profileImageUrl="profileImageUrl"
      :activeRFLoans="activeRFLoans"
      :completedRFLoans="completedRFLoans"
      :grantProjects="grantLoans"
      :rfReturnHistory="rfReturnHistory"
      :gifItems="gifItems"
      @close="closePrintModal" 
    />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { dbOperations } from '@/firebase/db.js'
import { imageService } from '@/services/imageService.js'
import { ProfileField, RF_LOAN_FIELD, GRANT_FIELD, RootCollection } from '@/enums/db.js'
import { formatAmount, formatDate } from '@/utils/formatUtils.ts'
import PrintModal from '@/components/PrintModal.vue'

export default {
  name: 'ProfilePage',
  components: {
    PrintModal
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    
    const loading = ref(true)
    const error = ref(null)
    const profile = ref(null)
    const profileImageUrl = ref('/placeholder-profile.jpg')
    const rfLoans = ref([])
    const grantLoans = ref([])
    const rfReturnHistory = ref([])
    const gifItems = ref([])
    const showPrintModal = ref(false)

    // Loan type constants
    const LOAN_TYPES = {
      RF: 'RF',
      GRANT: 'GRANT',
      GIF: 'GIF'
    }

    const regId = computed(() => route.params.regId)

    // Computed properties for profile types
    const profileTypes = computed(() => {
      const types = []
      if (hasRFLoans.value) types.push(LOAN_TYPES.RF)
      if (hasGrantLoans.value) types.push(LOAN_TYPES.GRANT)
      if (hasGifItems.value) types.push(LOAN_TYPES.GIF)
      return types
    })

    const hasRFLoans = computed(() => rfLoans.value.length > 0)
    const hasGrantLoans = computed(() => grantLoans.value.length > 0)
    const hasRFPaymentHistory = computed(() => rfReturnHistory.value.length > 0)
    const hasGifItems = computed(() => gifItems.value.length > 0)

    // Computed properties for PrintModal
    const activeRFLoans = computed(() => rfLoans.value.filter(loan => loan[RF_LOAN_FIELD.STATUS] === 'active'))
    const completedRFLoans = computed(() => rfLoans.value.filter(loan => loan[RF_LOAN_FIELD.STATUS] === 'completed'))

    // Sorted RF return history (latest first)
    const sortedRFReturnHistory = computed(() => {
      if (!rfReturnHistory.value || rfReturnHistory.value.length === 0) return []
      
      return [...rfReturnHistory.value].sort((a, b) => {
        const dateA = parseDateForSorting(a.approvedDate)
        const dateB = parseDateForSorting(b.approvedDate)
        return dateB.getTime() - dateA.getTime() // Latest first
      })
    })

    const loadProfile = async () => {
      if (!regId.value) {
        error.value = 'Missing profile ID'
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

        // Load profile image
        await loadProfileImage()

        // Load loans and payment history
        await loadLoans()
        await loadRFReturnHistory()
        await loadGifItems()

      } catch (err) {
        error.value = 'Failed to load profile'
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

    const loadLoans = async () => {
      try {
        const allLoans = await dbOperations.getProfileLoans(regId.value)
        
        // Filter loans by type
        rfLoans.value = allLoans.filter(loan => loan.type === LOAN_TYPES.RF)
        grantLoans.value = allLoans.filter(loan => loan.type === LOAN_TYPES.GRANT)
        } catch (error) {
          rfLoans.value = []
          grantLoans.value = []
        }
    }

    const loadRFReturnHistory = async () => {
      try {
        const historyData = await dbOperations.getRFReturnHistory(regId.value)
        
        // Convert the object format to array format
        if (historyData && typeof historyData === 'object') {
          const historyArray = Object.values(historyData).map(item => ({
            RRH_ID: item.RRH_ID || '-',
            DRIVE_LINK_ID: item.DRIVE_LINK_ID || null,
            amount: item.amount || 0,
            approvedDate: item.approvedDate || null,
            change: item.change || '-',
            receiver: item.receiver || '-',
            regID: item.regID || regId.value,
            targetLoan: item.targetLoan || '-',
            opacity: false // Add opacity flag for styling
          }))
          
          rfReturnHistory.value = historyArray
        } else {
          rfReturnHistory.value = []
        }
        } catch (error) {
          rfReturnHistory.value = []
        }
    }

    const loadGifItems = async () => {
      try {
        const gifData = profile.value?.[ProfileField.GIF]
        if (gifData && Array.isArray(gifData)) {
          gifItems.value = gifData.map(item => ({
            description: item.description || item,
            timestamp: item.timestamp || new Date()
          }))
        } else {
          gifItems.value = []
        }
        } catch (error) {
          gifItems.value = []
        }
    }

    // Utility functions
    const calculateAge = (yearOfBirth) => {
      if (!yearOfBirth) return 'N/A'
      const currentYear = new Date().getFullYear()
      return currentYear - yearOfBirth
    }

    const getProfileTypeClass = (type) => {
      switch (type) {
        case LOAN_TYPES.RF:
          return 'bg-green-100 text-green-800'
        case LOAN_TYPES.GRANT:
          return 'bg-red-100 text-red-800'
        case LOAN_TYPES.GIF:
          return 'bg-blue-100 text-blue-800'
        default:
          return 'bg-gray-100 text-gray-800'
      }
    }

    const getLoanStatusClass = (status) => {
      switch (status) {
        case 'active':
          return 'bg-green-100 text-green-600'
        case 'pending':
          return 'bg-red-100 text-red-600'
        case 'completed':
          return 'bg-gray-100 text-gray-600'
        default:
          return 'bg-gray-100 text-gray-600'
      }
    }

    const getLoanStatusText = (status) => {
      switch (status) {
        case 'active':
          return 'Active'
        case 'pending':
          return 'Pending'
        case 'completed':
          return 'Completed'
        default:
          return 'Unknown'
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

    const getProjectName = (targetLoan) => {
      if (!targetLoan) return '-'
      
      // Find the loan in RF loans
      const loan = rfLoans.value.find(l => l.id === targetLoan)
      return loan ? loan[RF_LOAN_FIELD.PURPOSE] : targetLoan
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
          // Handle ISO date strings
          if (date.includes('T') && date.includes('Z')) {
            dateObj = new Date(date)
          }
          // Handle DD-MM-YYYY format (common in our database)
          else if (date.includes('-') && date.split('-').length === 3) {
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

    // Format date without time for display
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
          // Handle ISO date strings
          if (date.includes('T') && date.includes('Z')) {
            dateObj = new Date(date)
          }
          // Handle DD-MM-YYYY format (common in our database)
          else if (date.includes('-') && date.split('-').length === 3) {
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

    const handleImageError = () => {
      profileImageUrl.value = '/placeholder-profile.jpg'
    }

    const goBack = () => {
      router.push('/')
    }

    const openLoanDetails = (loanId, loanType) => {
      router.push(`/${regId.value}/${loanType}/${loanId}`)
    }

    const openPrintModal = () => {
      showPrintModal.value = true
    }

    const closePrintModal = () => {
      showPrintModal.value = false
    }

    onMounted(() => {
      loadProfile()
    })

    return {
      loading,
      error,
      profile,
      profileImageUrl,
      rfLoans,
      grantLoans,
      rfReturnHistory,
      gifItems,
      showPrintModal,
      regId,
      profileTypes,
      hasRFLoans,
      hasGrantLoans,
      hasRFPaymentHistory,
      hasGifItems,
      activeRFLoans,
      completedRFLoans,
      sortedRFReturnHistory,
      loadProfile,
      calculateAge,
      getProfileTypeClass,
      getLoanStatusClass,
      getLoanStatusText,
      getReceiptUrl,
      getProjectName,
      parseDateForSorting,
      formatDateOnly,
      handleImageError,
      goBack,
      openLoanDetails,
      openPrintModal,
      closePrintModal,
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
.tile-shadow {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

@media print {
  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .no-print {
    display: none;
  }
  .print-shadow-none {
    box-shadow: none;
  }
}

details>summary::-webkit-details-marker {
  display: none;
}

details[open]>summary span.material-symbols-outlined {
  transform: rotate(180deg);
}
</style>