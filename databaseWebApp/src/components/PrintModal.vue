<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-gray-100">
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

      <!-- RF Loans Section -->
      <div v-if="activeRFLoans.length > 0 || completedRFLoans.length > 0" class="mt-4">
        <h2 class="font-bold text-sm bg-gray-100 p-2 rounded-t-md">RF Loans</h2>
        <div class="p-3 bg-white border border-gray-200 rounded-b-md">
          <div class="space-y-3 text-xs">
            <!-- Active RF Loans -->
            <div v-for="loan in activeRFLoans" :key="loan.id" class="space-y-1">
              <div class="flex justify-between items-center">
                <p>{{ loan[RF_LOAN_FIELD.PURPOSE] || 'RF Loan' }} - LKR {{ formatAmount(loan[RF_LOAN_FIELD.AMOUNT]) }}</p>
                <p class="text-gray-500">{{ formatDateOnly(loan[RF_LOAN_FIELD.APPROVED_AT] || loan[RF_LOAN_FIELD.INITIATION_DATE]) }}</p>
              </div>
              <div class="flex justify-between items-center">
                <p class="text-gray-500">LKR {{ formatAmount(loan[RF_LOAN_FIELD.CURRENT_BALANCE]) }}</p>
                <span class="text-green-600 bg-green-100 px-2 py-1 rounded-full font-semibold">Active</span>
              </div>
            </div>
            
            <!-- Completed RF Loans -->
            <div v-for="loan in completedRFLoans" :key="loan.id" class="space-y-1">
              <div class="flex justify-between items-center">
                <p>{{ loan[RF_LOAN_FIELD.PURPOSE] || 'RF Loan' }} - LKR {{ formatAmount(loan[RF_LOAN_FIELD.AMOUNT]) }}</p>
                <span class="text-blue-600 bg-blue-100 px-2 py-1 rounded-full font-semibold">Completed</span>
              </div>
              <div class="flex justify-between items-center">
                <p class="text-gray-500">{{ formatDateOnly(loan[RF_LOAN_FIELD.APPROVED_AT] || loan[RF_LOAN_FIELD.INITIATION_DATE]) }}</p>
                <p class="text-gray-500">{{ loan.id }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Grants Section -->
      <div v-if="grantProjects.length > 0" class="mt-4">
        <h2 class="font-bold text-sm bg-gray-100 p-2 rounded-t-md">Grants</h2>
        <div class="p-3 bg-white border border-gray-200 rounded-b-md">
          <div class="space-y-3 text-xs">
            <div v-for="grant in grantProjects" :key="grant.id" class="flex justify-between items-start">
              <p>{{ grant[GRANT_FIELD.PURPOSE] || 'Grant' }} - LKR {{ formatAmount(grant[GRANT_FIELD.AMOUNT] || grant[GRANT_FIELD.APPROVED_AMOUNT]) }}</p>
              <p class="text-gray-500">{{ formatDateOnly(grant[GRANT_FIELD.APPROVED_AT] || grant[GRANT_FIELD.REQUESTED_DATE]) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- GIF Projects Section -->
      <div v-if="gifItems.length > 0" class="mt-4">
        <h2 class="font-bold text-sm bg-gray-100 p-2 rounded-t-md">GIF Projects</h2>
        <div class="p-3 bg-white border border-gray-200 rounded-b-md">
          <div class="space-y-3 text-xs">
            <div v-for="(gifItem, index) in gifItems" :key="index" class="flex justify-between items-start">
              <p>{{ gifItem.description || gifItem }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- RF Payment History -->
      <div v-if="sortedRFReturnHistory.length > 0" class="mt-4">
        <h2 class="font-bold text-sm bg-gray-100 p-2 rounded-t-md">RF Paid History</h2>
        <div class="space-y-2 text-xs p-3 bg-white border border-gray-200 rounded-b-md">
          <div v-for="payment in sortedRFReturnHistory" :key="payment.RRH_ID" class="flex justify-between">
            <p class="text-gray-600">{{ formatDateOnly(payment.approvedDate) }}</p>
            <p>LKR {{ formatAmount(payment.amount) }}</p>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="no-print mt-6 flex justify-end gap-2">
        <button 
          @click="closeModal" 
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ProfileField, RF_LOAN_FIELD, GRANT_FIELD } from '../enums/db.js'
import { formatAmount, formatDate } from '../utils/formatUtils.ts'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  profile: {
    type: Object,
    default: () => ({})
  },
  profileImageUrl: {
    type: String,
    default: ''
  },
  activeRFLoans: {
    type: Array,
    default: () => []
  },
  completedRFLoans: {
    type: Array,
    default: () => []
  },
  grantProjects: {
    type: Array,
    default: () => []
  },
  rfReturnHistory: {
    type: Array,
    default: () => []
  },
  gifItems: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close'])

// Filter out RF return history with date "January 1, 2001" (which represents 01/01/2000)
const filteredRFReturnHistory = computed(() => {
  if (!props.rfReturnHistory) return []
  
  return props.rfReturnHistory.filter(payment => {
    if (!payment.approvedDate) return true
    
    const paymentDate = new Date(payment.approvedDate)
    const filterDate = new Date('2001-01-01T00:00:00+06:00') // January 1, 2001 at 12:00:00 AM UTC+6
    
    // Filter out payments with the specific date "January 1, 2001"
    return paymentDate.getTime() !== filterDate.getTime()
  })
})

// Sort RF return history by date (latest first)
const sortedRFReturnHistory = computed(() => {
  if (!filteredRFReturnHistory.value) return []
  
  return [...filteredRFReturnHistory.value].sort((a, b) => {
    const dateA = parseDateForSorting(a.approvedDate)
    const dateB = parseDateForSorting(b.approvedDate)
    return dateB.getTime() - dateA.getTime() // Latest first
  })
})

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

// Format date without time
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


const closeModal = () => {
  emit('close')
}
</script>

<style scoped>
.print-modal {
  max-width: 400px;
  margin: auto;
}

@media print {
  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .no-print {
    display: none;
  }
  .print-modal {
    box-shadow: none;
    border: none;
  }
}
</style>
