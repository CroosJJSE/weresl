<template>
  <div class="card">
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <div class="inline-flex items-center">
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span class="text-gray-600">Loading documents...</span>
      </div>
    </div>

    <!-- No Results -->
    <div v-else-if="documents.length === 0" class="text-center py-8">
      <div class="text-gray-500">
        <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p class="text-lg font-medium">No documents found</p>
        <p class="text-sm">Try adjusting your search criteria</p>
      </div>
    </div>

    <!-- Mobile-Friendly Document List -->
    <div v-else class="space-y-3">
      <div v-for="document in documents" :key="document.id" class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
        <!-- Name and Action Buttons Row -->
        <div class="flex items-start justify-between mb-2">
          <div class="flex-1 min-w-0">
            <h3 class="text-lg font-semibold text-gray-900 truncate">
              {{ document.Name || 'No Name' }}
            </h3>
          </div>
          <div class="ml-3 flex-shrink-0 flex gap-2">
            <button
              @click="$emit('view-loans', document)"
              class="bg-green-600 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            >
              Loans
            </button>
            <button
              @click="$emit('edit-document', document)"
              class="bg-primary-600 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
            >
              Edit
            </button>
          </div>
        </div>

        <!-- NIC and Reg ID Row -->
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span class="font-medium text-gray-700">NIC:</span>
            <span class="text-gray-900 ml-1">{{ document.NIC || 'Not provided' }}</span>
          </div>
          <div>
            <span class="font-medium text-gray-700">Reg ID:</span>
            <span class="text-gray-900 ml-1 font-mono">{{ document.Reg_ID || 'N/A' }}</span>
          </div>
        </div>

        <!-- Additional Info (if available) -->
        <div v-if="document.occupation || document.District" class="mt-2 pt-2 border-t border-gray-100">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <div v-if="document.occupation">
              <span class="font-medium text-gray-700">Occupation:</span>
              <span class="text-gray-900 ml-1">{{ document.occupation }}</span>
            </div>
            <div v-if="document.District">
              <span class="font-medium text-gray-700">District:</span>
              <span class="text-gray-900 ml-1">{{ document.District }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Results Count -->
    <div v-if="documents.length > 0" class="mt-4 text-sm text-gray-500 text-center">
      Showing {{ documents.length }} document{{ documents.length !== 1 ? 's' : '' }}
      <span v-if="searchTerm"> for "{{ searchTerm }}"</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataTable',
  props: {
    documents: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    searchTerm: {
      type: String,
      default: ''
    }
  },
  emits: ['edit-document', 'view-loans']
}
</script> 