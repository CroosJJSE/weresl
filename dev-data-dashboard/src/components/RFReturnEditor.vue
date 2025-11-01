<template>
  <div class="rf-return-editor">
    <!-- Add Entry Modal - Always visible when showAddModal is true -->
    <div v-if="showAddModal" class="mb-4 bg-white rounded-lg border-2 border-green-300 shadow-lg">
      <!-- Summary of Existing Entries -->
      <div v-if="rfReturnHistory.length > 0" class="p-4 bg-gray-50 border-b border-gray-200">
        <h3 class="text-sm font-semibold text-gray-700 mb-2">Summary of Existing Returns</h3>
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span class="text-gray-500">Total Entries:</span>
            <span class="font-medium text-gray-900 ml-1">{{ rfReturnHistory.length }}</span>
          </div>
          <div>
            <span class="text-gray-500">Total Amount:</span>
            <span class="font-medium text-gray-900 ml-1">
              Rs. {{ totalAmount.toLocaleString() }}
            </span>
          </div>
        </div>
      </div>

      <!-- Add Entry Form -->
      <div class="p-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-base font-semibold text-gray-900">Add New RF Return Entry</h3>
          <button
            @click="closeAddModal"
            class="flex items-center px-2 py-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="grid grid-cols-1 gap-4">
          <!-- Amount -->
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Amount (Rs.)</label>
            <input
              v-model.number="newEntryData.amount"
              type="number"
              placeholder="0"
              class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <!-- Approved Date -->
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Approved Date</label>
            <div class="flex items-center space-x-2">
              <input
                v-model="newEntryData.approvedDate"
                type="date"
                class="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <button
                @click="setTodayDate"
                class="px-3 py-2 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors"
              >
                Today
              </button>
            </div>
          </div>

          <!-- Receiver -->
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Receiver</label>
            <input
              v-model="newEntryData.receiver"
              type="text"
              placeholder="System"
              class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <!-- Drive Link ID -->
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Drive Link ID</label>
            <input
              v-model="newEntryData.driveLinkId"
              type="text"
              placeholder="Google Drive file ID (optional)"
              class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center justify-end space-x-3 mt-4 pt-4 border-t border-gray-200">
          <button
            @click="closeAddModal"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="saveNewEntry"
            :disabled="!newEntryData.amount || newEntryData.amount <= 0"
            class="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Add Entry
          </button>
        </div>
      </div>
    </div>

    <!-- Read-only View -->
    <div v-if="!isEditing" class="space-y-4">
      <div v-if="rfReturnHistory.length === 0" class="text-center py-8">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No RF Returns</h3>
        <p class="mt-1 text-sm text-gray-500">No return payments have been recorded yet.</p>
      </div>
      
      <div v-else class="space-y-3">
        <div
          v-for="(returnEntry, index) in rfReturnHistory"
          :key="returnEntry.RRH_ID || index"
          class="bg-white rounded-lg border border-gray-200 p-4"
        >
          <div class="flex items-center justify-between mb-2">
            <h4 class="text-sm font-semibold text-gray-900">
              {{ returnEntry.RRH_ID || `Return ${index + 1}` }}
            </h4>
            <span class="text-xs text-gray-500">
              {{ formatDate(returnEntry.approvedDate) }}
            </span>
          </div>
          
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span class="text-gray-500">Amount:</span>
              <span class="font-medium text-gray-900 ml-1">
                Rs. {{ returnEntry.amount?.toLocaleString() || '0' }}
              </span>
            </div>
            <div>
              <span class="text-gray-500">Receiver:</span>
              <span class="font-medium text-gray-900 ml-1">
                {{ returnEntry.receiver || 'System' }}
              </span>
            </div>
            <div v-if="returnEntry.DRIVE_LINK_ID" class="col-span-2">
              <span class="text-gray-500">Receipt:</span>
              <span class="font-medium text-blue-600 ml-1">
                {{ returnEntry.DRIVE_LINK_ID }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit View -->
    <div v-else class="space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">RF Return History</h3>
      </div>

      <div v-if="Object.keys(editReturnHistory).length === 0" class="text-center py-8">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No RF Returns</h3>
        <p class="mt-1 text-sm text-gray-500">Click "Add Entry" in the header to create a new return entry.</p>
      </div>

      <div v-else class="space-y-3">
        <div
          v-for="(returnEntry, entryKey) in editReturnHistory"
          :key="entryKey"
          class="bg-white rounded-lg border border-gray-200 p-4"
        >
          <div class="flex items-center justify-between mb-4">
            <h4 class="text-sm font-semibold text-gray-900">{{ entryKey }}</h4>
            <button
              @click="removeReturnEntry(entryKey)"
              class="flex items-center px-2 py-1 text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          <div class="grid grid-cols-1 gap-4">
            <!-- Amount -->
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Amount (Rs.)</label>
              <input
                :value="getReturnEntryField(entryKey, 'AMOUNT')"
                @input="updateReturnEntryField(entryKey, 'AMOUNT', $event.target.value)"
                type="number"
                placeholder="0"
                class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <!-- Approved Date -->
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Approved Date</label>
              <div class="flex items-center space-x-2">
                <input
                  :value="formatDateForInput(getReturnEntryField(entryKey, 'APPROVED_DATE'))"
                  @input="updateReturnDate(entryKey, $event.target.value)"
                  type="date"
                  class="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  @click="setCurrentDate(entryKey)"
                  class="px-3 py-2 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors"
                >
                  Today
                </button>
              </div>
            </div>

            <!-- Receiver -->
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Receiver</label>
              <input
                :value="getReturnEntryField(entryKey, 'RECEIVER')"
                @input="updateReturnEntryField(entryKey, 'RECEIVER', $event.target.value)"
                type="text"
                placeholder="System"
                class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <!-- Drive Link ID -->
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Drive Link ID</label>
              <input
                :value="getReturnEntryField(entryKey, 'DRIVE_LINK_ID')"
                @input="updateReturnEntryField(entryKey, 'DRIVE_LINK_ID', $event.target.value)"
                type="text"
                placeholder="Google Drive file ID"
                class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
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
import { ProfileField, RRH_OBJECT_FIELD } from '../enums/db.js'

// Props
const props = defineProps({
  profile: {
    type: Object,
    required: true
  },
  isEditing: {
    type: Boolean,
    default: false
  },
  showAddModal: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['save', 'update', 'close-add-modal'])

// Reactive state
const editData = ref({
  RF_return_history: {}
})
const saving = ref(false)
const newEntryData = ref({
  amount: 0,
  approvedDate: '',
  receiver: 'System',
  driveLinkId: ''
})

// Computed properties
const rfReturnHistory = computed(() => {
  const history = props.profile.data[ProfileField.RF_RETURN_HISTORY]
  if (!history || typeof history !== 'object') return []
  
  return Object.values(history).map(entry => ({
    RRH_ID: entry[RRH_OBJECT_FIELD.RRH_ID],
    amount: entry[RRH_OBJECT_FIELD.AMOUNT],
    approvedDate: entry[RRH_OBJECT_FIELD.APPROVED_DATE],
    receiver: entry[RRH_OBJECT_FIELD.RECEIVER],
    DRIVE_LINK_ID: entry[RRH_OBJECT_FIELD.DRIVE_LINK_ID]
  }))
})

// Computed property for safe access to RF_return_history in template
const editReturnHistory = computed(() => {
  return editData.value?.RF_return_history || {}
})

// Total amount of all existing returns
const totalAmount = computed(() => {
  return rfReturnHistory.value.reduce((sum, entry) => {
    return sum + (entry.amount || 0)
  }, 0)
})

// Methods
const closeAddModal = () => {
  console.log('❌ RFReturnEditor: Closing add modal')
  emit('close-add-modal')
  // Reset form data
  newEntryData.value = {
    amount: 0,
    approvedDate: '',
    receiver: 'System',
    driveLinkId: ''
  }
}

const setTodayDate = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  newEntryData.value.approvedDate = `${year}-${month}-${day}`
}

const saveNewEntry = () => {
  console.log('💾 RFReturnEditor: Saving new entry')
  console.log('💾 New entry data:', newEntryData.value)
  
  if (!newEntryData.value.amount || newEntryData.value.amount <= 0) {
    alert('Please enter a valid amount')
    return
  }
  
  // Generate new RRH ID
  const regId = props.profile.id
  const existingEntries = Object.keys(props.profile.data[ProfileField.RF_RETURN_HISTORY] || {})
  
  // Find max number
  let maxNumber = 0
  const rrhPrefix = `RRH_${regId}_`
  existingEntries.forEach(entryKey => {
    if (entryKey.startsWith(rrhPrefix)) {
      const numberPart = entryKey.substring(rrhPrefix.length)
      const number = parseInt(numberPart, 10)
      if (!isNaN(number) && number > maxNumber) {
        maxNumber = number
      }
    }
  })
  
  const nextNumber = maxNumber + 1
  const formattedNumber = nextNumber.toString().padStart(3, '0')
  const newRRHId = `RRH_${regId}_${formattedNumber}`
  
  // Parse date
  let timestamp
  if (newEntryData.value.approvedDate) {
    const date = new Date(newEntryData.value.approvedDate)
    timestamp = Math.floor(date.getTime() / 1000)
  } else {
    timestamp = Math.floor(Date.now() / 1000)
  }
  
  // Create new entry object
  const newEntry = {
    [RRH_OBJECT_FIELD.RRH_ID]: newRRHId,
    [RRH_OBJECT_FIELD.REG_ID]: regId,
    [RRH_OBJECT_FIELD.AMOUNT]: newEntryData.value.amount,
    [RRH_OBJECT_FIELD.APPROVED_DATE]: {
      seconds: timestamp,
      nanoseconds: 0
    },
    [RRH_OBJECT_FIELD.RECEIVER]: newEntryData.value.receiver || 'System',
    [RRH_OBJECT_FIELD.DRIVE_LINK_ID]: newEntryData.value.driveLinkId || ''
  }
  
  console.log('💾 New entry to save:', newEntry)
  
  // Get existing history and add new entry
  const existingHistory = props.profile.data[ProfileField.RF_RETURN_HISTORY] || {}
  const updatedHistory = {
    ...existingHistory,
    [newRRHId]: newEntry
  }
  
  // Save to profile
  emit('save', {
    [ProfileField.RF_RETURN_HISTORY]: updatedHistory
  })
  
  // Close modal and reset form
  closeAddModal()
}
const initializeEditData = () => {
  console.log('🔍 RFReturnEditor: Initializing edit data')
  console.log('🔍 Profile data:', props.profile.data)
  const history = props.profile.data[ProfileField.RF_RETURN_HISTORY]
  console.log('🔍 Existing RF return history:', history)
  console.log('🔍 History type:', typeof history)
  console.log('🔍 History is object:', typeof history === 'object' && history !== null)
  
  // Ensure RF_return_history exists and is initialized properly
  if (!editData.value.RF_return_history) {
    editData.value.RF_return_history = {}
  }
  
  if (history && typeof history === 'object' && history !== null) {
    // Deep clone to avoid reference issues
    const clonedHistory = {}
    Object.keys(history).forEach(key => {
      if (history[key] && typeof history[key] === 'object') {
        clonedHistory[key] = { ...history[key] }
      } else {
        clonedHistory[key] = history[key]
      }
    })
    editData.value.RF_return_history = clonedHistory
    console.log('🔍 Cloned history:', clonedHistory)
  } else {
    editData.value.RF_return_history = {}
    console.log('🔍 Initialized empty history')
  }
  
  console.log('🔍 Final editData.RF_return_history:', editData.value.RF_return_history)
  console.log('🔍 Keys count:', Object.keys(editData.value.RF_return_history).length)
}

const addReturnEntry = () => {
  console.log('➕ RFReturnEditor: Adding new return entry')
  console.log('➕ Current editData:', editData.value)
  console.log('➕ Current RF_return_history:', editData.value.RF_return_history)
  
  // Ensure RF_return_history exists
  if (!editData.value.RF_return_history) {
    console.log('⚠️ RF_return_history not initialized, initializing now...')
    editData.value.RF_return_history = {}
  }
  
  const regId = props.profile.id
  console.log('➕ Profile Reg ID:', regId)
  
  const existingEntries = Object.keys(editData.value.RF_return_history || {})
  console.log('➕ Existing entries:', existingEntries)
  console.log('➕ Existing entries count:', existingEntries.length)
  
  // Find the highest existing number by parsing RRH IDs
  let maxNumber = 0
  const rrhPrefix = `RRH_${regId}_`
  
  existingEntries.forEach(entryKey => {
    if (entryKey.startsWith(rrhPrefix)) {
      const numberPart = entryKey.substring(rrhPrefix.length)
      const number = parseInt(numberPart, 10)
      if (!isNaN(number) && number > maxNumber) {
        maxNumber = number
      }
    }
  })
  
  console.log('➕ Max existing number:', maxNumber)
  
  // Next number is max + 1
  const nextNumber = maxNumber + 1
  const formattedNumber = nextNumber.toString().padStart(3, '0')
  let newRRHId = `RRH_${regId}_${formattedNumber}`
  console.log('➕ Next number:', nextNumber)
  console.log('➕ Formatted number:', formattedNumber)
  console.log('➕ New RRH ID:', newRRHId)
  
  // Ensure the new ID doesn't already exist (safety check)
  if (editData.value.RF_return_history[newRRHId]) {
    console.log('⚠️ Warning: New RRH ID already exists! Trying next number...')
    const fallbackNumber = maxNumber + 2
    const fallbackFormatted = fallbackNumber.toString().padStart(3, '0')
    newRRHId = `RRH_${regId}_${fallbackFormatted}`
    console.log('➕ Using fallback RRH ID:', newRRHId)
  }
  
  const timestamp = Math.floor(Date.now() / 1000)
  console.log('➕ Timestamp:', timestamp)
  
  const newEntry = {
    [RRH_OBJECT_FIELD.RRH_ID]: newRRHId,
    [RRH_OBJECT_FIELD.REG_ID]: regId,
    [RRH_OBJECT_FIELD.AMOUNT]: 0,
    [RRH_OBJECT_FIELD.APPROVED_DATE]: {
      seconds: timestamp,
      nanoseconds: 0
    },
    [RRH_OBJECT_FIELD.RECEIVER]: 'System',
    [RRH_OBJECT_FIELD.DRIVE_LINK_ID]: ''
  }
  
  console.log('➕ New entry object:', newEntry)
  console.log('➕ RRH_OBJECT_FIELD values:', {
    RRH_ID: RRH_OBJECT_FIELD.RRH_ID,
    REG_ID: RRH_OBJECT_FIELD.REG_ID,
    AMOUNT: RRH_OBJECT_FIELD.AMOUNT,
    APPROVED_DATE: RRH_OBJECT_FIELD.APPROVED_DATE,
    RECEIVER: RRH_OBJECT_FIELD.RECEIVER,
    DRIVE_LINK_ID: RRH_OBJECT_FIELD.DRIVE_LINK_ID
  })
  
  editData.value.RF_return_history[newRRHId] = newEntry
  
  console.log('➕ Updated editData.RF_return_history:', editData.value.RF_return_history)
  console.log('➕ Updated keys:', Object.keys(editData.value.RF_return_history))
  console.log('➕ New entry added with ID:', newRRHId)
  console.log('➕ Total entries after add:', Object.keys(editData.value.RF_return_history).length)
  console.log('✅ Entry added successfully')
}

const removeReturnEntry = (entryKey) => {
  if (confirm(`Are you sure you want to remove the return entry "${entryKey}"?`)) {
    delete editData.value.RF_return_history[entryKey]
  }
}

// Helper methods for enum-based field access
const getReturnEntryField = (entryKey, fieldName) => {
  if (!editData.value.RF_return_history || !editData.value.RF_return_history[entryKey]) {
    return ''
  }
  
  const entry = editData.value.RF_return_history[entryKey]
  const enumField = RRH_OBJECT_FIELD[fieldName]
  
  // Try enum field first, then fallback to simple field name for compatibility
  return entry[enumField] || entry[fieldName.toLowerCase()] || entry[fieldName] || ''
}

const updateReturnEntryField = (entryKey, fieldName, value) => {
  console.log('🔄 Updating field:', entryKey, fieldName, value)
  
  if (!editData.value.RF_return_history) {
    editData.value.RF_return_history = {}
  }
  
  if (!editData.value.RF_return_history[entryKey]) {
    console.log('⚠️ Entry does not exist, creating...')
    const regId = props.profile.id
    const timestamp = Math.floor(Date.now() / 1000)
    editData.value.RF_return_history[entryKey] = {
      [RRH_OBJECT_FIELD.RRH_ID]: entryKey,
      [RRH_OBJECT_FIELD.REG_ID]: regId,
      [RRH_OBJECT_FIELD.AMOUNT]: 0,
      [RRH_OBJECT_FIELD.APPROVED_DATE]: {
        seconds: timestamp,
        nanoseconds: 0
      },
      [RRH_OBJECT_FIELD.RECEIVER]: 'System',
      [RRH_OBJECT_FIELD.DRIVE_LINK_ID]: ''
    }
  }
  
  const entry = editData.value.RF_return_history[entryKey]
  const enumField = RRH_OBJECT_FIELD[fieldName]
  
  // Handle number fields
  if (fieldName === 'AMOUNT') {
    entry[enumField] = parseFloat(value) || 0
  } else {
    entry[enumField] = value || ''
  }
  
  // Also set simple field name for compatibility
  const simpleField = fieldName.toLowerCase()
  if (fieldName === 'AMOUNT') {
    entry[simpleField] = parseFloat(value) || 0
  } else {
    entry[simpleField] = value || ''
  }
  
  console.log('🔄 Updated entry:', entry)
}

const updateReturnDate = (entryKey, dateString) => {
  if (!dateString) return
  
  const date = new Date(dateString)
  const timestamp = Math.floor(date.getTime() / 1000)
  
  editData.value.RF_return_history[entryKey][RRH_OBJECT_FIELD.APPROVED_DATE] = {
    seconds: timestamp,
    nanoseconds: 0
  }
}

const setCurrentDate = (entryKey) => {
  const currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)
  const timestamp = Math.floor(currentDate.getTime() / 1000)
  
  editData.value.RF_return_history[entryKey][RRH_OBJECT_FIELD.APPROVED_DATE] = {
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
    console.log('💾 RFReturnEditor: Saving changes')
    console.log('💾 Current editData:', editData.value)
    console.log('💾 Current RF_return_history:', editData.value.RF_return_history)
    
    saving.value = true
    
    // Ensure RF_return_history exists
    if (!editData.value.RF_return_history) {
      console.log('⚠️ RF_return_history is missing, initializing...')
      editData.value.RF_return_history = {}
    }
    
    // Clean up empty entries
    const cleanedHistory = {}
    const keys = Object.keys(editData.value.RF_return_history || {})
    console.log('💾 Processing', keys.length, 'entries')
    
    keys.forEach(key => {
      const entry = editData.value.RF_return_history[key]
      console.log('💾 Processing entry:', key, entry)
      
      if (entry) {
        // Check if amount is greater than 0 or if it's a new entry
        const amount = entry[RRH_OBJECT_FIELD.AMOUNT] || entry.amount || 0
        console.log('💾 Entry amount:', amount)
        
        if (amount > 0 || entry[RRH_OBJECT_FIELD.RRH_ID] || entry.RRH_ID) {
          // Ensure all required fields are present using enum field names
          const cleanedEntry = {
            [RRH_OBJECT_FIELD.RRH_ID]: entry[RRH_OBJECT_FIELD.RRH_ID] || entry.RRH_ID || key,
            [RRH_OBJECT_FIELD.REG_ID]: entry[RRH_OBJECT_FIELD.REG_ID] || entry.regID || props.profile.id,
            [RRH_OBJECT_FIELD.AMOUNT]: amount,
            [RRH_OBJECT_FIELD.APPROVED_DATE]: entry[RRH_OBJECT_FIELD.APPROVED_DATE] || entry.approvedDate || {
              seconds: Math.floor(Date.now() / 1000),
              nanoseconds: 0
            },
            [RRH_OBJECT_FIELD.RECEIVER]: entry[RRH_OBJECT_FIELD.RECEIVER] || entry.receiver || 'System',
            [RRH_OBJECT_FIELD.DRIVE_LINK_ID]: entry[RRH_OBJECT_FIELD.DRIVE_LINK_ID] || entry.DRIVE_LINK_ID || ''
          }
          cleanedHistory[key] = cleanedEntry
          console.log('💾 Added cleaned entry:', cleanedEntry)
        }
      }
    })
    
    console.log('💾 Final cleaned history:', cleanedHistory)
    console.log('💾 Final cleaned history keys:', Object.keys(cleanedHistory))
    
    const dataToSave = {
      [ProfileField.RF_RETURN_HISTORY]: cleanedHistory
    }
    console.log('💾 Data to save:', dataToSave)
    
    emit('save', dataToSave)
    console.log('✅ Save emit triggered')
  } catch (error) {
    console.error('❌ Error saving RF returns:', error)
    console.error('❌ Error stack:', error.stack)
  } finally {
    saving.value = false
  }
}

// Expose methods for parent component to call
defineExpose({
  addReturnEntry
})

// Watchers
watch(() => props.isEditing, (newValue) => {
  console.log('👀 RFReturnEditor: isEditing changed to', newValue)
  if (newValue) {
    console.log('👀 Initializing edit data because editing mode enabled')
    initializeEditData()
  }
})

watch(() => props.profile, () => {
  console.log('👀 RFReturnEditor: Profile changed')
  if (props.isEditing) {
    console.log('👀 Re-initializing edit data because profile changed while editing')
    initializeEditData()
  }
}, { deep: true })

// Watch showAddModal to initialize form when it opens
watch(() => props.showAddModal, (isOpen) => {
  if (isOpen) {
    console.log('👀 RFReturnEditor: Add modal opened, initializing form')
    // Set today's date by default
    setTodayDate()
    // Reset other fields
    newEntryData.value.amount = 0
    newEntryData.value.receiver = 'System'
    newEntryData.value.driveLinkId = ''
  }
})
</script>

<style scoped>
.rf-return-editor {
  max-width: 100%;
}
</style>
