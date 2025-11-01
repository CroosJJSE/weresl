<template>
  <div class="mobile-database-editor min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div class="px-4 py-3">
        <div class="flex items-center justify-between">
          <h1 class="text-lg font-bold text-gray-900">WERESL Database Editor</h1>
        <button
            v-if="selectedProfile"
          @click="goBack"
            class="flex items-center px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
            <svg class="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        </div>
      </div>
    </div>

        <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-16">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
      <p class="mt-4 text-gray-600">Loading...</p>
        </div>

        <!-- Error State -->
    <div v-else-if="error" class="p-4">
      <div class="bg-red-50 border border-red-200 rounded-lg p-4">
          <div class="flex">
          <svg class="w-5 h-5 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
          <div>
            <h3 class="text-sm font-medium text-red-800">Error</h3>
            <p class="text-sm text-red-700 mt-1">{{ error }}</p>
            </div>
            </div>
          </div>
        </div>

    <!-- Profile List View -->
    <div v-else-if="!selectedProfile" class="p-4">
      <div class="mb-4">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by Reg ID or Name..."
            class="w-full px-4 py-3 pl-10 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <svg class="absolute left-3 top-3.5 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
            </div>
          </div>
          
      <div class="space-y-3">
        <div
          v-for="profile in filteredProfiles"
          :key="profile.id"
          @click="selectProfile(profile)"
          class="bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
              >
                <div class="flex items-center justify-between">
            <div class="flex-1">
              <h3 class="text-sm font-semibold text-gray-900">{{ profile.data.fullName || profile.id }}</h3>
              <p class="text-xs text-gray-500 mt-1">{{ profile.id }} • {{ profile.data.district || 'No District' }}</p>
              <div class="flex items-center mt-2 space-x-4 text-xs text-gray-500">
                <span v-if="profile.data.nic">NIC: {{ profile.data.nic }}</span>
                <span v-if="profile.data.phoneNumber">Phone: {{ profile.data.phoneNumber }}</span>
                    </div>
                  </div>
            <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

      <div v-if="filteredProfiles.length === 0" class="text-center py-8">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No profiles found</h3>
        <p class="mt-1 text-sm text-gray-500">Try adjusting your search criteria.</p>
          </div>
                  </div>
                  
    <!-- Profile Detail View -->
    <div v-else class="flex flex-col h-full">
      <!-- Profile Header -->
      <div class="bg-white border-b border-gray-200 px-4 py-3">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-lg font-semibold text-gray-900">{{ selectedProfile.data.fullName || selectedProfile.id }}</h2>
            <p class="text-sm text-gray-500">{{ selectedProfile.id }} • {{ selectedProfile.data.district || 'No District' }}</p>
                  </div>
          <div class="flex items-center space-x-2">
            <!-- Add Entry Button - Always visible for RF Returns, RF Loans, and Grant Loans -->
                          <button
              v-if="showAddButton"
              @click="handleAddEntry"
              class="flex items-center px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
            >
              <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Entry
                          </button>
            
            <!-- Edit/Cancel Button -->
                          <button
              @click="toggleEditMode"
              class="flex items-center px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                          >
              <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              {{ isEditing ? 'Cancel' : 'Edit' }}
                          </button>
          </div>
                        </div>
                      </div>
                      
      <!-- Tab Navigation -->
      <div class="bg-white border-b border-gray-200">
        <div class="flex">
                            <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors',
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600 bg-blue-50'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            {{ tab.label }}
                            </button>
                  </div>
                </div>
                
      <!-- Tab Content -->
      <div class="flex-1 overflow-y-auto">
        <!-- Profile Information Tab -->
        <div v-if="activeTab === 'profile'" class="p-4">
          <ProfileInfoEditor
            ref="profileEditorRef"
            :profile="selectedProfile"
            :is-editing="isEditing"
            @save="saveProfile"
            @update="updateProfileData"
          />
                </div>
                
        <!-- RF Return History Tab -->
        <div v-if="activeTab === 'rf-returns'" class="p-4">
          <RFReturnEditor
            ref="rfReturnEditorRef"
            :profile="selectedProfile"
            :is-editing="isEditing"
            :show-add-modal="showAddModal && activeTab === 'rf-returns'"
            @save="saveProfile"
            @update="updateProfileData"
            @close-add-modal="showAddModal = false"
          />
        </div>
              
        <!-- RF Loans Tab -->
        <div v-if="activeTab === 'rf-loans'" class="p-4">
          <RFLoansEditor
            ref="rfLoansEditorRef"
            :profile="selectedProfile"
            :is-editing="isEditing"
            :show-add-modal="showAddModal && activeTab === 'rf-loans'"
            @save="saveProfile"
            @update="updateProfileData"
            @close-add-modal="showAddModal = false"
          />
        </div>

        <!-- Grant Loans Tab -->
        <div v-if="activeTab === 'grant-loans'" class="p-4">
          <GrantLoansEditor
            ref="grantLoansEditorRef"
            :profile="selectedProfile"
            :is-editing="isEditing"
            :show-add-modal="showAddModal && activeTab === 'grant-loans'"
            @save="saveProfile"
            @update="updateProfileData"
            @close-add-modal="showAddModal = false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { 
  RootCollection, 
  ProfileField, 
  RF_LOAN_FIELD, 
  GRANT_FIELD,
  RRH_OBJECT_FIELD,
  ARMS_VALUES 
} from '../enums/db.js'
import ProfileInfoEditor from './ProfileInfoEditor.vue'
import RFReturnEditor from './RFReturnEditor.vue'
import RFLoansEditor from './RFLoansEditor.vue'
import GrantLoansEditor from './GrantLoansEditor.vue'

// Reactive state
const loading = ref(false)
const error = ref(null)
const profiles = ref([])
const selectedProfile = ref(null)
const isEditing = ref(false)
const searchQuery = ref('')
const activeTab = ref('profile')
const showAddModal = ref(false)

// Tabs configuration
const tabs = [
  { id: 'profile', label: 'Profile' },
  { id: 'rf-returns', label: 'RF Returns' },
  { id: 'rf-loans', label: 'RF Loans' },
  { id: 'grant-loans', label: 'Grant Loans' }
]

// Template refs for child components
const rfReturnEditorRef = ref(null)
const rfLoansEditorRef = ref(null)
const grantLoansEditorRef = ref(null)

// Computed properties
const filteredProfiles = computed(() => {
  if (!searchQuery.value) return profiles.value
  
  const query = searchQuery.value.toLowerCase()
  return profiles.value.filter(profile => 
    profile.id.toLowerCase().includes(query) ||
    (profile.data.fullName && profile.data.fullName.toLowerCase().includes(query)) ||
    (profile.data.nic && profile.data.nic.toLowerCase().includes(query))
  )
})

// Show Add Entry button only for RF Returns, RF Loans, and Grant Loans tabs
const showAddButton = computed(() => {
  return activeTab.value === 'rf-returns' || 
         activeTab.value === 'rf-loans' || 
         activeTab.value === 'grant-loans'
})

// Methods
const loadProfiles = async () => {
  try {
    loading.value = true
    error.value = null
    
    // Import Firebase dynamically to avoid SSR issues
    const { getFirestore, collection, getDocs } = await import('firebase/firestore')
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
    
    const profilesRef = collection(db, RootCollection.PROFILES)
    const snapshot = await getDocs(profilesRef)
    
    profiles.value = snapshot.docs.map(doc => ({
      id: doc.id,
      data: doc.data(),
      ref: doc.ref
    }))
    
    console.log(`Loaded ${profiles.value.length} profiles`)
  } catch (err) {
    console.error('Error loading profiles:', err)
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const selectProfile = (profile) => {
  selectedProfile.value = profile
  isEditing.value = false
  activeTab.value = 'profile'
}

const goBack = () => {
  selectedProfile.value = null
    isEditing.value = false
  activeTab.value = 'profile'
}

const toggleEditMode = () => {
  isEditing.value = !isEditing.value
}

const handleAddEntry = () => {
  console.log('🔘 DatabaseExplorer: Add Entry clicked for tab:', activeTab.value)
  showAddModal.value = true
}

const updateProfileData = (updatedData) => {
  if (selectedProfile.value) {
    selectedProfile.value.data = { ...selectedProfile.value.data, ...updatedData }
  }
}

const saveProfile = async (updatedData) => {
  try {
    loading.value = true
    
    // Import Firebase dynamically
    const { getFirestore, doc, updateDoc, serverTimestamp } = await import('firebase/firestore')
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
    
    const profileRef = doc(db, RootCollection.PROFILES, selectedProfile.value.id)
    await updateDoc(profileRef, {
      ...updatedData,
      [ProfileField.LAST_UPDATED]: serverTimestamp()
    })
    
    // Update local data
    selectedProfile.value.data = { ...selectedProfile.value.data, ...updatedData }
    isEditing.value = false
    
    console.log('Profile updated successfully')
  } catch (err) {
    console.error('Error saving profile:', err)
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(() => {
  loadProfiles()
})
</script>

<style scoped>
.mobile-database-editor {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
</style>