<template>
  <div class="rf-loans-editor">
    <!-- Read-only View -->
    <div v-if="!isEditing" class="space-y-4">
      <div v-if="rfLoans.length === 0" class="text-center py-8">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No RF Loans</h3>
        <p class="mt-1 text-sm text-gray-500">No RF loans have been recorded yet.</p>
      </div>
      
      <div v-else class="space-y-3">
        <div
          v-for="loan in rfLoans"
          :key="loan.id"
          class="bg-white rounded-lg border border-gray-200 p-4"
        >
          <div class="flex items-center justify-between mb-3">
            <h4 class="text-sm font-semibold text-gray-900">{{ loan.data.purpose || 'Unnamed Loan' }}</h4>
            <span :class="[
              'px-2 py-1 text-xs font-medium rounded-full',
              loan.data.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            ]">
              {{ loan.data.status || 'unknown' }}
            </span>
          </div>
          
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span class="text-gray-500">Amount:</span>
              <span class="font-medium text-gray-900 ml-1">
                Rs. {{ loan.data.amount?.toLocaleString() || '0' }}
              </span>
            </div>
            <div>
              <span class="text-gray-500">Balance:</span>
              <span class="font-medium text-gray-900 ml-1">
                Rs. {{ loan.data.currentBalance?.toLocaleString() || '0' }}
              </span>
            </div>
            <div>
              <span class="text-gray-500">ARMS:</span>
              <span class="font-medium text-gray-900 ml-1">
                {{ loan.data.arms || 'Not set' }}
              </span>
            </div>
            <div>
              <span class="text-gray-500">Approved:</span>
              <span class="font-medium text-gray-900 ml-1">
                {{ formatDate(loan.data.approvedAt) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit View -->
    <div v-else class="space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">RF Loans</h3>
      </div>

      <div v-if="rfLoans.length === 0" class="text-center py-8">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No RF Loans</h3>
        <p class="mt-1 text-sm text-gray-500">Click "Add Entry" in the header to create a new loan.</p>
      </div>

      <div v-else class="space-y-3">
        <div
          v-for="loan in rfLoans"
          :key="loan.id"
          class="bg-white rounded-lg border border-gray-200 p-4"
        >
          <div class="flex items-center justify-between mb-4">
            <h4 class="text-sm font-semibold text-gray-900">{{ loan.data.purpose || 'Unnamed Loan' }}</h4>
            <button
              @click="removeRFLoan(loan.id)"
              class="flex items-center px-2 py-1 text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          <div class="grid grid-cols-1 gap-4">
            <!-- Purpose -->
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Purpose</label>
              <input
                v-model="loan.data.purpose"
                type="text"
                placeholder="e.g., Fish farming, Small shop"
                class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <!-- Amount -->
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Amount (Rs.)</label>
              <input
                v-model.number="loan.data.amount"
                type="number"
                placeholder="0"
                class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <!-- Current Balance -->
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Current Balance (Rs.)</label>
              <input
                v-model.number="loan.data.currentBalance"
                type="number"
                placeholder="0"
                class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <!-- Status -->
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Status</label>
              <select
                v-model="loan.data.status"
                class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <!-- ARMS -->
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">ARMS</label>
              <select
                v-model="loan.data.arms"
                class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select ARMS</option>
                <option value="EDEN">EDEN</option>
                <option value="ARK">ARK</option>
                <option value="Metamorphosis">Metamorphosis</option>
                <option value="Keystone">Keystone</option>
              </select>
            </div>

            <!-- Approved Date -->
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Approved Date</label>
              <div class="flex items-center space-x-2">
                <input
                  :value="formatDateForInput(loan.data.approvedAt)"
                  @input="updateLoanDate(loan.id, 'approvedAt', $event.target.value)"
                  type="date"
                  class="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  @click="setCurrentDate(loan.id, 'approvedAt')"
                  class="px-3 py-2 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors"
                >
                  Today
                </button>
              </div>
            </div>

            <!-- Payment Integrity -->
            <div class="flex items-center space-x-3">
              <input
                v-model="loan.data.paymentIntegrity"
                type="checkbox"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label class="text-sm text-gray-700">Payment Integrity</label>
            </div>
          </div>
        </div>
      </div>

      <!-- Save Button -->
      <div class="sticky bottom-0 bg-white border-t border-gray-200 p-4 -mx-4">
        <button
          @click="saveChanges"
          :disabled="saving"
          class="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg v-if="saving" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <svg v-else class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          {{ saving ? 'Saving...' : 'Save Changes' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { RootCollection, ProfileField, RF_LOAN_FIELD } from '../enums/db.js'

// Store collection names as constants for use in async functions
const PROFILES_COLLECTION = RootCollection.PROFILES
const RF_LOANS_COLLECTION = ProfileField.RF_LOANS

// Props
const props = defineProps({
  profile: {
    type: Object,
    required: true
  },
  isEditing: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['save', 'update'])

// Reactive state
const rfLoans = ref([])
const saving = ref(false)

// Computed properties
const loadRFLoans = async () => {
  try {
    // Import Firebase dynamically
    const { getFirestore, collection, getDocs, query, where } = await import('firebase/firestore')
    const { initializeApp } = await import('firebase/app')
    
    // Firebase config
    const firebaseConfig = {
      apiKey: "AIzaSyBVUVyDTnOwMmYR1ybOLYv9i_B19aox1Lg",
      authDomain: "weresldatabase.firebaseapp.com",
      projectId: "weresldatabase",
      storageBucket: "weresldatabase.firebasestorage.app",
      messagingSenderId: "148662033996",
      appId: "1:148662033996:web:f9b5ea903b9cc5a24d9ee9"
    }
    
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    
    const rfLoansRef = collection(db, PROFILES_COLLECTION, props.profile.id, RF_LOANS_COLLECTION)
    const snapshot = await getDocs(rfLoansRef)
    
    rfLoans.value = snapshot.docs.map(doc => ({
      id: doc.id,
      data: doc.data(),
      ref: doc.ref
    }))
    
    console.log(`Loaded ${rfLoans.value.length} RF loans for ${props.profile.id}`)
  } catch (error) {
    console.error('Error loading RF loans:', error)
    rfLoans.value = []
  }
}

// Methods
const addRFLoan = () => {
  const regId = props.profile.id
  const existingLoans = rfLoans.value
  const nextNumber = existingLoans.length + 1
  const formattedNumber = nextNumber.toString().padStart(2, '0')
  const newLoanId = `RF_${regId}_${formattedNumber}`
  
  const timestamp = Math.floor(Date.now() / 1000)
  
  const newLoan = {
    id: newLoanId,
    data: {
      [RF_LOAN_FIELD.LOAN_ID]: newLoanId,
      [RF_LOAN_FIELD.REG_ID]: regId,
      [RF_LOAN_FIELD.PURPOSE]: '',
      [RF_LOAN_FIELD.AMOUNT]: 0,
      [RF_LOAN_FIELD.CURRENT_BALANCE]: 0,
      [RF_LOAN_FIELD.STATUS]: 'active',
      [RF_LOAN_FIELD.TYPE]: 'RF',
      [RF_LOAN_FIELD.SOURCE]: 'wereSL',
      [RF_LOAN_FIELD.ARMS]: '',
      [RF_LOAN_FIELD.APPROVED_AT]: {
        seconds: timestamp,
        nanoseconds: 0
      },
      [RF_LOAN_FIELD.CREATED_AT]: {
        seconds: timestamp,
        nanoseconds: 0
      },
      [RF_LOAN_FIELD.INITIATION_DATE]: {
        seconds: timestamp,
        nanoseconds: 0
      },
      [RF_LOAN_FIELD.PAYMENT_INTEGRITY]: true,
      [RF_LOAN_FIELD.LOAN_HISTORY]: []
    }
  }
  
  rfLoans.value.push(newLoan)
}

const removeRFLoan = (loanId) => {
  if (confirm(`Are you sure you want to remove the RF loan "${loanId}"?`)) {
    rfLoans.value = rfLoans.value.filter(loan => loan.id !== loanId)
  }
}

const updateLoanDate = (loanId, field, dateString) => {
  if (!dateString) return
  
  const loan = rfLoans.value.find(l => l.id === loanId)
  if (!loan) return
  
  const date = new Date(dateString)
  const timestamp = Math.floor(date.getTime() / 1000)
  
  loan.data[field] = {
    seconds: timestamp,
    nanoseconds: 0
  }
}

const setCurrentDate = (loanId, field) => {
  const loan = rfLoans.value.find(l => l.id === loanId)
  if (!loan) return
  
  const currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)
  const timestamp = Math.floor(currentDate.getTime() / 1000)
  
  loan.data[field] = {
    seconds: timestamp,
    nanoseconds: 0
  }
}

const formatDate = (timestamp) => {
  if (!timestamp) return 'No date'
  
  try {
    let date
    if (typeof timestamp === 'number') {
      date = new Date(timestamp * 1000)
    } else if (timestamp.seconds) {
      date = new Date(timestamp.seconds * 1000)
    } else {
      date = new Date(timestamp)
    }
    
    return date.toLocaleDateString()
  } catch (error) {
    return 'Invalid date'
  }
}

const formatDateForInput = (timestamp) => {
  if (!timestamp) return ''
  
  try {
    let date
    if (typeof timestamp === 'number') {
      date = new Date(timestamp * 1000)
    } else if (timestamp.seconds) {
      date = new Date(timestamp.seconds * 1000)
    } else {
      date = new Date(timestamp)
    }
    
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  } catch (error) {
    return ''
  }
}

const saveChanges = async () => {
  try {
    saving.value = true
    
    // Save each loan individually
    for (const loan of rfLoans.value) {
      await saveRFLoan(loan)
    }
    
    emit('save', {})
  } catch (error) {
    console.error('Error saving RF loans:', error)
  } finally {
    saving.value = false
  }
}

const saveRFLoan = async (loan) => {
  try {
    // Import Firebase dynamically
    const { getFirestore, doc, setDoc, serverTimestamp } = await import('firebase/firestore')
    const { initializeApp } = await import('firebase/app')
    
    // Firebase config
    const firebaseConfig = {
      apiKey: "AIzaSyBVUVyDTnOwMmYR1ybOLYv9i_B19aox1Lg",
      authDomain: "weresldatabase.firebaseapp.com",
      projectId: "weresldatabase",
      storageBucket: "weresldatabase.firebasestorage.app",
      messagingSenderId: "148662033996",
      appId: "1:148662033996:web:f9b5ea903b9cc5a24d9ee9"
    }
    
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    
    const loanRef = doc(db, PROFILES_COLLECTION, props.profile.id, RF_LOANS_COLLECTION, loan.id)
    await setDoc(loanRef, {
      ...loan.data,
      [RF_LOAN_FIELD.LAST_UPDATED]: serverTimestamp()
    })
    
    console.log(`Saved RF loan: ${loan.id}`)
  } catch (error) {
    console.error(`Error saving RF loan ${loan.id}:`, error)
    throw error
  }
}

// Expose methods for parent component to call
defineExpose({
  addRFLoan
})

// Watchers
watch(() => props.profile, () => {
  loadRFLoans()
}, { immediate: true })

watch(() => props.isEditing, (newValue) => {
  if (newValue) {
    loadRFLoans()
  }
})
</script>

<style scoped>
.rf-loans-editor {
  max-width: 100%;
}
</style>
