<template>
  <div class="database-explorer">
    <!-- Breadcrumb Navigation -->
    <div class="mb-6">
      <nav class="flex" aria-label="Breadcrumb">
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
      <!-- Empty State -->
      <div v-if="items.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No items found</h3>
        <p class="mt-1 text-sm text-gray-500">This location appears to be empty.</p>
      </div>

      <!-- Items Grid -->
      <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

    <!-- Document Data Modal -->
    <div v-if="selectedDocument" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">
              Document: {{ selectedDocument.name }}
            </h3>
            <button
              @click="selectedDocument = null"
              class="text-gray-400 hover:text-gray-600"
            >
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
            <pre class="text-sm text-gray-800 whitespace-pre-wrap">{{ JSON.stringify(selectedDocument.data, null, 2) }}</pre>
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
  await loadItems(path)
}

const handleItemClick = async (item) => {
  console.log('Item clicked:', item)
  
  if (item.type === 'collection' || item.type === 'subcollection') {
    // Navigate into the collection/subcollection
    await navigateToPath(item.path)
  } else if (item.type === 'document') {
    // Show document data in modal
    selectedDocument.value = item
  }
}

const getPathUpTo = (index) => {
  return pathSegments.value.slice(0, index + 1).join('/')
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




