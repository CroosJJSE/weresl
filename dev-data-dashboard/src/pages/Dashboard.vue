<template>
  <div class="space-y-4 sm:space-y-6">
    <!-- Page Header -->
    <div class="mb-4 sm:mb-6">
      <h1 class="text-xl sm:text-2xl font-bold text-gray-900">Firestore Data Dashboard</h1>
      <p class="text-sm sm:text-base text-gray-600 mt-1">Search, view, and edit documents from your Firestore collections</p>
    </div>

    <!-- Search Bar -->
    <SearchBar
      @search="handleSearch"
    />

    <!-- Data Table -->
    <DataTable
      :documents="documents"
      :loading="loading"
      :search-term="searchTerm"
      @edit-document="openEditModal"
    />

    <!-- Load More Button and Page Info -->
    <div v-if="!searchTerm && !selectedDistrict" class="text-center space-y-4">
      <!-- Page Count Display -->
      <div class="text-sm text-gray-600">
        <span v-if="currentPage > 1">
          Loaded {{ currentPage }} pages ({{ documents.length }} documents total)
        </span>
        <span v-else>
          Showing {{ documents.length }} documents
        </span>
      </div>
      
      <!-- Load More Button -->
      <div v-if="hasMore">
        <button
          @click="loadMoreDocuments"
          :disabled="loadingMore"
          class="btn btn-primary w-full sm:w-auto px-8 py-3 text-base"
        >
          <span v-if="loadingMore" class="inline-flex items-center">
            <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
          </span>
          <span v-else>Load More Documents (Page {{ currentPage + 1 }})</span>
        </button>
      </div>
      
      <!-- No More Documents Message -->
      <div v-else-if="currentPage > 1" class="text-sm text-gray-500">
        All documents loaded ({{ documents.length }} total)
      </div>
    </div>

    <!-- Edit Modal -->
    <EditModal
      :show="showEditModal"
      :document="selectedDocument"
      :collection-name="currentCollection"
      @close="closeEditModal"
      @document-updated="handleDocumentUpdated"
    />
  </div>
</template>

<script>
import SearchBar from '../components/SearchBar.vue';
import DataTable from '../components/DataTable.vue';
import EditModal from '../components/EditModal.vue';
import firestoreService from '../services/firestoreService.js';

export default {
  name: 'Dashboard',
  components: {
    SearchBar,
    DataTable,
    EditModal
  },
  data() {
    return {
      documents: [],
      loading: false,
      loadingMore: false,
      searchTerm: '',
      selectedDistrict: '',
      currentCollection: 'profiles',
      showEditModal: false,
      selectedDocument: null,
      lastDocument: null,
      hasMore: false,
      currentPage: 1
    }
  },
  async mounted() {
    console.log('Dashboard mounted, loading documents from profiles collection...');
    await this.loadDocuments();
  },
  methods: {
    async loadDocuments() {
      console.log('Loading documents from collection:', this.currentCollection);
      this.loading = true;
      try {
        const result = await firestoreService.getDocuments(this.currentCollection);
        this.documents = result.documents;
        this.lastDocument = result.lastDocument;
        this.hasMore = result.hasMore;
        this.currentPage = 1;
        
        console.log('Documents loaded:', this.documents);
        console.log('Document count:', this.documents.length);
        console.log('Has more documents:', this.hasMore);
        console.log('Current page:', this.currentPage);
        
        // Log first document structure if available
        if (this.documents.length > 0) {
          console.log('First document structure:', this.documents[0]);
        }
      } catch (error) {
        console.error('Error loading documents:', error);
        // You could add a toast notification here
      } finally {
        this.loading = false;
      }
    },

    async loadMoreDocuments() {
      console.log('Loading more documents...');
      this.loadingMore = true;
      try {
        const result = await firestoreService.getDocuments(this.currentCollection, 100, this.lastDocument);
        
        // Append new documents to existing ones
        this.documents = [...this.documents, ...result.documents];
        this.lastDocument = result.lastDocument;
        this.hasMore = result.hasMore;
        this.currentPage++;
        
        console.log('More documents loaded:', result.documents.length);
        console.log('Total documents now:', this.documents.length);
        console.log('Has more documents:', this.hasMore);
        console.log('Current page:', this.currentPage);
      } catch (error) {
        console.error('Error loading more documents:', error);
      } finally {
        this.loadingMore = false;
      }
    },

    async handleSearch(searchTerm, selectedDistrict) {
      console.log('Search triggered with term:', searchTerm, 'and district:', selectedDistrict);
      this.searchTerm = searchTerm;
      this.selectedDistrict = selectedDistrict;
      this.loading = true;
      
      // Reset pagination for search results
      this.lastDocument = null;
      this.hasMore = false;
      this.currentPage = 1;
      
      try {
        if (searchTerm.trim() || selectedDistrict) {
          console.log('Searching for:', searchTerm, 'in district:', selectedDistrict, 'in collection:', this.currentCollection);
          
          // Get all documents and filter by search term and district
          const allDocuments = await firestoreService.getDocuments(this.currentCollection, 500);
          
          let filteredDocuments = allDocuments.documents;
          
          // Filter by district if selected
          if (selectedDistrict) {
            filteredDocuments = filteredDocuments.filter(doc => 
              doc.District === selectedDistrict
            );
            console.log('Filtered by district:', selectedDistrict, 'results:', filteredDocuments.length);
          }
          
          // Filter by search term if provided
          if (searchTerm.trim()) {
            const searchLower = searchTerm.toLowerCase();
            const searchFields = ['Name', 'NIC', 'Reg_ID', 'contact'];
            
            filteredDocuments = filteredDocuments.filter(doc => {
              return searchFields.some(field => {
                const value = doc[field];
                if (value) {
                  return value.toString().toLowerCase().includes(searchLower);
                }
                return false;
              });
            });
            console.log('Filtered by search term:', searchTerm, 'results:', filteredDocuments.length);
          }
          
          this.documents = filteredDocuments;
          console.log('Final search results:', this.documents);
        } else {
          console.log('Empty search term and no district filter, loading all documents');
          await this.loadDocuments();
        }
      } catch (error) {
        console.error('Error searching documents:', error);
      } finally {
        this.loading = false;
      }
    },

    openEditModal(document) {
      console.log('Opening edit modal for document:', document);
      this.selectedDocument = document;
      this.showEditModal = true;
    },

    closeEditModal() {
      console.log('Closing edit modal');
      this.showEditModal = false;
      this.selectedDocument = null;
    },

    async handleDocumentUpdated(updatedDocument) {
      console.log('Document updated:', updatedDocument);
      // Update the document in the local array
      const index = this.documents.findIndex(doc => doc.id === updatedDocument.id);
      if (index !== -1) {
        this.documents[index] = updatedDocument;
        console.log('Updated document in local array');
      }
      
      // Reload documents to ensure we have the latest data
      await this.loadDocuments();
    }
  }
}
</script> 