<template>
  <div class="profile-info-editor">
    <!-- Read-only View -->
    <div v-if="!isEditing" class="space-y-4">
      <div class="grid grid-cols-1 gap-4">
        <div v-for="field in profileFields" :key="field.key" class="bg-white rounded-lg border border-gray-200 p-4">
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
            {{ field.label }}
          </label>
          <div class="text-sm text-gray-900">
            {{ getFieldValue(field.key) || '—' }}
          </div>
        </div>
      </div>
    </div>

    <!-- Edit View -->
    <div v-else class="space-y-4">
      <div class="grid grid-cols-1 gap-4">
        <div v-for="field in profileFields" :key="field.key" class="bg-white rounded-lg border border-gray-200 p-4">
          <label class="block text-xs font-medium text-gray-700 mb-2">
            {{ field.label }}
            <span v-if="field.required" class="text-red-500">*</span>
          </label>
          
          <!-- Read-only fields -->
          <div v-if="isReadOnlyField(field.key)" class="relative">
            <input
              :value="getFieldValue(field.key)"
              readonly
              class="w-full px-3 py-2 text-sm border border-yellow-300 bg-yellow-50 text-gray-700 rounded-md cursor-not-allowed pr-10"
            />
            <div class="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg class="w-4 h-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          
          <!-- Text input -->
          <input
            v-else-if="field.type === 'string'"
            v-model="editData[field.key]"
            :type="getInputType(field.key)"
            :placeholder="field.placeholder"
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          
          <!-- Number input -->
          <input
            v-else-if="field.type === 'number'"
            v-model.number="editData[field.key]"
            type="number"
            :placeholder="field.placeholder"
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          
          <!-- Textarea -->
          <textarea
            v-else-if="field.type === 'textarea'"
            v-model="editData[field.key]"
            :placeholder="field.placeholder"
            rows="3"
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
          
          <!-- Array input (for GIF) -->
          <div v-else-if="field.type === 'array'" class="space-y-2">
            <div v-for="(item, index) in editData[field.key]" :key="index" class="flex items-center space-x-2">
              <input
                v-model="editData[field.key][index]"
                type="text"
                :placeholder="field.placeholder"
                class="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                @click="removeArrayItem(field.key, index)"
                class="px-2 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
            <button
              @click="addArrayItem(field.key)"
              class="w-full px-3 py-2 text-sm text-blue-600 border border-blue-300 border-dashed rounded-md hover:bg-blue-50 transition-colors"
            >
              + Add {{ field.label }}
            </button>
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
import { ProfileField } from '../enums/db.js'

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
const editData = ref({})
const saving = ref(false)

// Profile fields configuration
const profileFields = [
  { key: ProfileField.REG_ID, label: 'Registration ID', type: 'string', required: true, readonly: true },
  { key: ProfileField.FULL_NAME, label: 'Full Name', type: 'string', required: true },
  { key: ProfileField.DISTRICT, label: 'District', type: 'string', required: true, readonly: true },
  { key: ProfileField.YEAR_OF_BIRTH, label: 'Year of Birth', type: 'number', placeholder: 'e.g., 1990' },
  { key: ProfileField.ADDRESS, label: 'Address', type: 'textarea', placeholder: 'Enter full address' },
  { key: ProfileField.NIC, label: 'NIC Number', type: 'string', placeholder: 'e.g., 123456789V' },
  { key: ProfileField.PHONE_NUMBER, label: 'Phone Number', type: 'string', placeholder: 'e.g., 0771234567' },
  { key: ProfileField.TOTAL_CHILDREN, label: 'Total Children', type: 'number', placeholder: '0' },
  { key: ProfileField.SCHOOL_GOING_CHILDREN, label: 'School Going Children', type: 'number', placeholder: '0' },
  { key: ProfileField.OTHER_DEPENDENTS, label: 'Other Dependents', type: 'number', placeholder: '0' },
  { key: ProfileField.DESCRIPTION, label: 'Description', type: 'textarea', placeholder: 'Personal description' },
  { key: ProfileField.OCCUPATION, label: 'Occupation', type: 'string', placeholder: 'e.g., Farmer, Teacher' },
  { key: ProfileField.PROFILE_IMAGE_DRIVE_ID, label: 'Profile Image Drive ID', type: 'string', placeholder: 'Google Drive file ID' },
  { key: ProfileField.GIF, label: 'Give It Forward', type: 'array', placeholder: 'GIF description' }
]

// Computed properties
const isReadOnlyField = (key) => {
  return key === ProfileField.REG_ID || key === ProfileField.DISTRICT
}

const getInputType = (key) => {
  if (key === ProfileField.PHONE_NUMBER) return 'tel'
  if (key === ProfileField.NIC) return 'text'
  if (key === ProfileField.YEAR_OF_BIRTH) return 'number'
  return 'text'
}

const getFieldValue = (key) => {
  return props.profile.data[key] || ''
}

// Methods
const initializeEditData = () => {
  editData.value = {}
  profileFields.forEach(field => {
    if (field.type === 'array') {
      editData.value[field.key] = Array.isArray(props.profile.data[field.key]) 
        ? [...props.profile.data[field.key]] 
        : []
    } else {
      editData.value[field.key] = props.profile.data[field.key] || ''
    }
  })
}

const addArrayItem = (key) => {
  if (!editData.value[key]) {
    editData.value[key] = []
  }
  editData.value[key].push('')
}

const removeArrayItem = (key, index) => {
  editData.value[key].splice(index, 1)
}

const saveChanges = async () => {
  try {
    saving.value = true
    
    // Filter out read-only fields
    const dataToSave = { ...editData.value }
    delete dataToSave[ProfileField.REG_ID]
    delete dataToSave[ProfileField.DISTRICT]
    
    // Remove empty array items
    Object.keys(dataToSave).forEach(key => {
      if (Array.isArray(dataToSave[key])) {
        dataToSave[key] = dataToSave[key].filter(item => item.trim() !== '')
      }
    })
    
    emit('save', dataToSave)
  } catch (error) {
    console.error('Error saving profile:', error)
  } finally {
    saving.value = false
  }
}

// Watchers
watch(() => props.isEditing, (newValue) => {
  if (newValue) {
    initializeEditData()
  }
})

watch(() => props.profile, () => {
  if (props.isEditing) {
    initializeEditData()
  }
}, { deep: true })
</script>

<style scoped>
.profile-info-editor {
  max-width: 100%;
}
</style>

