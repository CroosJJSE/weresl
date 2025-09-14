<template>
  <div class="database-explorer">
    <!-- Mobile Header with Back Navigation -->
    <div class="mb-6">
      <div class="flex items-center justify-between mb-4">
        <button
          v-if="currentPath.value || selectedDocument"
          @click="goBack"
          class="flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <h2 v-else class="text-lg font-semibold text-gray-900">Database Explorer</h2>
        
        <!-- Current Path Display -->
        <div v-if="currentPath.value || selectedDocument" class="text-sm text-gray-600 truncate max-w-48">
          {{ getCurrentPathDisplay() }}
        </div>
      </div>
      
      <!-- Breadcrumb Navigation (Hidden on mobile, shown on larger screens) -->
      <nav class="hidden md:flex" aria-label="Breadcrumb">
        <ol class="flex items-center space-x-2">
          <li>
            <button
              @click="navigateToPath('')"
              class="text-blue-600 hover:text-blue-800 font-medium"
              :class="{ 'text-gray-900': currentPath.value === '' }"
            >
              Root
            </button>
          </li>
          <template v-for="(segment, index) in pathSegments" :key="index">
            <li>
              <div class="flex items-center">
                <svg class="w-4 h-4 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
                <button
                  @click="navigateToPath(getPathUpTo(index))"
                  class="text-blue-600 hover:text-blue-800 font-medium"
                  :class="{ 'text-gray-900': getPathUpTo(index) === currentPath.value }"
                >
                  {{ segment }}
                </button>
              </div>
            </li>
          </template>
        </ol>
      </nav>
    </div>

    <!-- Single Panel Layout -->
    <div class="w-full">

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center py-12">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span class="ml-3 text-gray-600">Loading...</span>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">Error loading data</h3>
              <div class="mt-2 text-sm text-red-700">{{ error }}</div>
            </div>
          </div>
        </div>

      <!-- Content -->
      <div v-else>
        <!-- Document Details View -->
        <div v-if="selectedDocument" class="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <!-- Document Header -->
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">
              {{ selectedDocument.name }}
            </h3>
            <div class="flex space-x-2">
              <button
                @click="toggleEditMode"
                class="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                {{ isEditing ? 'Cancel' : 'Edit' }}
              </button>
              <button
                @click="selectedDocument = null"
                class="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
          
          <!-- Subcollections Section -->
          <div v-if="selectedDocument.subcollections && selectedDocument.subcollections.length > 0" class="mb-6">
            <h4 class="text-md font-medium text-gray-800 mb-3">Subcollections:</h4>
            <div class="grid grid-cols-1 gap-2">
              <div
                v-for="subcollection in selectedDocument.subcollections"
                :key="subcollection.id"
                @click="navigateToPath(subcollection.path)"
                class="bg-blue-50 border border-blue-200 rounded-lg p-3 hover:bg-blue-100 cursor-pointer transition-colors"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <svg class="w-5 h-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <div>
                      <p class="text-sm font-medium text-blue-900">{{ subcollection.name }}</p>
                      <p class="text-xs text-blue-600">{{ subcollection.documentCount }} documents</p>
                    </div>
                  </div>
                  <svg class="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Document Data Section -->
          <div class="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
            <div v-if="isEditing" class="space-y-4">
              <div v-for="(value, key) in editData" :key="key" class="flex flex-col">
                <label class="text-sm font-medium text-gray-700 mb-1">{{ key }}</label>
                <textarea
                  v-if="typeof value === 'object'"
                  v-model="editData[key]"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  rows="3"
                >{{ JSON.stringify(value, null, 2) }}</textarea>
                <input
                  v-else
                  v-model="editData[key]"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <div class="flex space-x-3 pt-4">
                <button
                  @click="saveDocument"
                  :disabled="saving"
                  class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                >
                  {{ saving ? 'Saving...' : 'Save Changes' }}
                </button>
                <button
                  @click="deleteDocument"
                  :disabled="saving"
                  class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                >
                  Delete Document
                </button>
              </div>
            </div>
            <pre v-else class="text-sm text-gray-800 whitespace-pre-wrap">{{ JSON.stringify(selectedDocument.data, null, 2) }}</pre>
          </div>
        </div>

        <!-- Items List View -->
        <div v-else>
          <!-- Empty State -->
          <div v-if="items.length === 0" class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">No items found</h3>
            <p class="mt-1 text-sm text-gray-500">This location appears to be empty.</p>
          </div>

          <!-- Items Grid -->
          <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div
              v-for="item in items"
              :key="item.id"
              @click="handleItemClick(item)"
              class="relative bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <!-- Item Icon -->
              <div class="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 group-hover:bg-blue-100 transition-colors duration-200">
                <svg v-if="item.type === 'collection'" class="w-6 h-6 text-gray-600 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <svg v-else-if="item.type === 'subcollection'" class="w-6 h-6 text-gray-600 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <svg v-else class="w-6 h-6 text-gray-600 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>

              <!-- Item Details -->
              <div class="mt-3">
                <h3 class="text-sm font-medium text-gray-900 group-hover:text-blue-600 truncate">
                  {{ item.name }}
                </h3>
                <p class="text-xs text-gray-500 capitalize">
                  {{ item.type }}
                  <span v-if="item.documentCount !== undefined" class="ml-1">
                    ({{ item.documentCount }})
                  </span>
                </p>
                <!-- Subcollections indicator for documents -->
                <div v-if="item.type === 'document' && item.subcollections" class="mt-1">
                  <span class="text-xs text-blue-600">
                    {{ item.subcollections.length }} subcollection(s)
                  </span>
                </div>
              </div>

              <!-- Click Indicator -->
              <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <svg class="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { DatabaseExplorerService } from '../services/databaseExplorerService.js'

// Reactive state
const loading = ref(false)
const error = ref(null)
const items = ref([])
const currentPath = ref('')
const selectedDocument = ref(null)
const isEditing = ref(false)
const editData = ref({})
const saving = ref(false)

// Service instance
const explorerService = new DatabaseExplorerService()

// Computed properties
const pathSegments = computed(() => {
  if (!currentPath.value || typeof currentPath.value !== 'string') return []
  return currentPath.value.split('/')
})

// Methods
const loadItems = async (path = '') => {
  try {
    loading.value = true
    error.value = null
    
    console.log('Loading items for path:', path)
    const result = await explorerService.explorePath(path)
    items.value = result
    
    console.log('Loaded items:', result)
    console.log('First item details:', result[0])
    if (result[0]) {
      console.log('First item type:', result[0].type)
      console.log('First item data:', result[0].data)
    }
  } catch (err) {
    console.error('Error loading items:', err)
    error.value = err.message || 'Failed to load items'
  } finally {
    loading.value = false
  }
}

const navigateToPath = async (path) => {
  console.log('Navigating to path:', path)
  currentPath.value = path
  // Clear selected document when navigating
  selectedDocument.value = null
  isEditing.value = false
  editData.value = {}
  await loadItems(path)
}

const handleItemClick = async (item) => {
  console.log('Item clicked:', item)
  console.log('Item type:', item.type)
  console.log('Item path:', item.path)
  
  if (item.type === 'collection' || item.type === 'subcollection') {
    // Navigate into the collection/subcollection
    console.log('Navigating to collection/subcollection:', item.path)
    await navigateToPath(item.path)
  } else if (item.type === 'document') {
    // Show document data in modal with subcollections
    console.log('Loading document details for:', item.name)
    console.log('Document data:', item.data)
    await loadDocumentWithSubcollections(item)
  } else {
    console.log('Unknown item type:', item.type)
  }
}

const getPathUpTo = (index) => {
  return pathSegments.value.slice(0, index + 1).join('/')
}

// Mobile navigation methods
const goBack = () => {
  if (selectedDocument.value) {
    // If viewing a document, go back to the items list
    selectedDocument.value = null
    isEditing.value = false
    editData.value = {}
  } else if (currentPath.value) {
    // If in a subdirectory, go back to parent
    const pathParts = currentPath.value.split('/')
    if (pathParts.length > 1) {
      const parentPath = pathParts.slice(0, -1).join('/')
      navigateToPath(parentPath)
    } else {
      navigateToPath('')
    }
  }
}

const getCurrentPathDisplay = () => {
  if (!currentPath.value) return ''
  const pathParts = currentPath.value.split('/')
  if (pathParts.length === 1) {
    return pathParts[0]
  } else if (pathParts.length === 2) {
    return `${pathParts[0]} > ${pathParts[1]}`
  } else if (pathParts.length === 3) {
    return `${pathParts[0]} > ${pathParts[1]} > ${pathParts[2]}`
  }
  return pathParts.join(' > ')
}

// Load document with its subcollections
const loadDocumentWithSubcollections = async (item) => {
  try {
    loading.value = true
    console.log('Loading document with subcollections for:', item)
    
    const subcollections = await explorerService.getDocumentSubcollections(item.path)
    console.log('Found subcollections:', subcollections)
    
    selectedDocument.value = {
      ...item,
      subcollections: subcollections
    }
    
    console.log('Selected document set to:', selectedDocument.value)
  } catch (error) {
    console.error('Error loading document subcollections:', error)
    // Even if subcollections fail, still show the document
    selectedDocument.value = {
      ...item,
      subcollections: []
    }
    console.log('Selected document set to (fallback):', selectedDocument.value)
  } finally {
    loading.value = false
  }
}

// Toggle edit mode
const toggleEditMode = () => {
  if (isEditing.value) {
    // Cancel editing
    isEditing.value = false
    editData.value = {}
  } else {
    // Start editing
    isEditing.value = true
    editData.value = { ...selectedDocument.value.data }
  }
}

// Save document changes
const saveDocument = async () => {
  try {
    saving.value = true
    
    // Parse JSON strings back to objects
    const processedData = {}
    for (const [key, value] of Object.entries(editData.value)) {
      if (typeof value === 'string' && value.trim().startsWith('{')) {
        try {
          processedData[key] = JSON.parse(value)
        } catch {
          processedData[key] = value
        }
      } else {
        processedData[key] = value
      }
    }
    
    await explorerService.updateDocument(selectedDocument.value.path, processedData)
    
    // Update the selected document
    selectedDocument.value.data = processedData
    isEditing.value = false
    editData.value = {}
    
    // Refresh the current view
    await loadItems(currentPath.value)
    
    alert('Document updated successfully!')
  } catch (error) {
    console.error('Error saving document:', error)
    alert('Error saving document: ' + error.message)
  } finally {
    saving.value = false
  }
}

// Delete document
const deleteDocument = async () => {
  if (!confirm('Are you sure you want to delete this document? This action cannot be undone.')) {
    return
  }
  
  try {
    saving.value = true
    await explorerService.deleteDocument(selectedDocument.value.path)
    
    selectedDocument.value = null
    isEditing.value = false
    editData.value = {}
    
    // Refresh the current view
    await loadItems(currentPath.value)
    
    alert('Document deleted successfully!')
  } catch (error) {
    console.error('Error deleting document:', error)
    alert('Error deleting document: ' + error.message)
  } finally {
    saving.value = false
  }
}

// Lifecycle
onMounted(async () => {
  console.log('DatabaseExplorer mounted, loading root items')
  await loadItems('')
})

// Watch for path changes
watch(currentPath, (newPath) => {
  console.log('Path changed to:', newPath)
})
</script>

<style scoped>
.database-explorer {
  @apply w-full;
}

/* Custom scrollbar for document modal */
pre::-webkit-scrollbar {
  width: 8px;
}

pre::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

pre::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

pre::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>




