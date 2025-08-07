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
        <!-- Profile Photo and Info Row -->
        <div class="flex items-start space-x-4 mb-4">
          <!-- Profile Photo Section -->
          <div class="flex-shrink-0">
            <div class="relative">
              <!-- Profile Photo Display -->
              <div class="w-16 h-16 rounded-full overflow-hidden bg-gray-200 border-2 border-gray-300">
                <img 
                  v-if="getProfileImageUrl(document)" 
                  :src="getProfileImageUrl(document)" 
                  :alt="document[ProfileField.FULL_NAME] || 'Profile'"
                  class="w-full h-full object-cover"
                  @error="handleImageError"
                />
                <div v-else class="w-full h-full flex items-center justify-center bg-gray-300">
                  <svg class="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              
              <!-- Upload Button Overlay -->
              <button
                @click="openFileInput(document.id)"
                class="absolute -bottom-1 -right-1 bg-primary-600 text-white rounded-full p-1.5 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
                :disabled="uploadingStates[document.id]"
                :title="uploadingStates[document.id] ? 'Uploading...' : 'Upload Photo'"
              >
                <svg v-if="!uploadingStates[document.id]" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <svg v-else class="w-3 h-3 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
            
            <!-- Hidden File Input -->
            <input
              :data-file-input="document.id"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleFileSelect($event, document)"
            />
          </div>

          <!-- Profile Info -->
          <div class="flex-1 min-w-0">
            <h3 class="text-lg font-semibold text-gray-900 truncate">
              {{ document[ProfileField.FULL_NAME] || document.fullName || document.Name || 'No Name' }}
            </h3>
            
            <!-- NIC and Reg ID Row -->
            <div class="grid grid-cols-2 gap-4 text-sm mt-2">
              <div>
                <span class="font-medium text-gray-700">NIC:</span>
                <span class="text-gray-900 ml-1">{{ document[ProfileField.NIC] || document.nic || document.NIC || 'Not provided' }}</span>
              </div>
              <div>
                <span class="font-medium text-gray-700">Reg ID:</span>
                <span class="text-gray-900 ml-1 font-mono">{{ document[ProfileField.REG_ID] || document.regId || document.Reg_ID || 'N/A' }}</span>
              </div>
            </div>

            <!-- Additional Info (if available) -->
            <div v-if="document[ProfileField.OCCUPATION] || document.occupation || document[ProfileField.DISTRICT] || document.district || document.District" class="mt-2 pt-2 border-t border-gray-100">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div v-if="document[ProfileField.OCCUPATION] || document.occupation">
                  <span class="font-medium text-gray-700">Occupation:</span>
                  <span class="text-gray-900 ml-1">{{ document[ProfileField.OCCUPATION] || document.occupation }}</span>
                </div>
                <div v-if="document[ProfileField.DISTRICT] || document.district || document.District">
                  <span class="font-medium text-gray-700">District:</span>
                  <span class="text-gray-900 ml-1">{{ document[ProfileField.DISTRICT] || document.district || document.District }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex-shrink-0 flex gap-2">
            <button
              @click="emit('view-loans', document)"
              class="bg-green-600 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            >
              Loans
            </button>
            <button
              @click="emit('edit-document', document)"
              class="bg-primary-600 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
            >
              Edit
            </button>
          </div>
        </div>

        <!-- Upload Progress (if uploading) -->
        <div v-if="uploadingStates[document.id]" class="mt-2">
          <div class="bg-gray-200 rounded-full h-2">
            <div 
              class="bg-primary-600 h-2 rounded-full transition-all duration-300"
              :style="{ width: uploadProgress[document.id] + '%' }"
            ></div>
          </div>
          <p class="text-xs text-gray-600 mt-1">{{ uploadMessages[document.id] || 'Uploading...' }}</p>
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

<script setup>
import { ref, reactive } from 'vue';
import { ProfileField } from '../enums/db.js';
import { convertGoogleDriveUrl } from '../utils/driveUtils.js';
import { uploadToDrive, validateFile, createImagePreview } from '../services/gasUploadService.js';

// Props
const props = defineProps({
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
});

// Emits
const emit = defineEmits(['edit-document', 'view-loans', 'update-profile-image']);

// Reactive state
const uploadingStates = reactive({});
const uploadProgress = reactive({});
const uploadMessages = reactive({});

/**
 * Get profile image URL
 */
const getProfileImageUrl = (document) => {
  const imageDriveId = document[ProfileField.PROFILE_IMAGE_DRIVE_ID] || document.profileImageDriveId;
  if (imageDriveId) {
    return convertGoogleDriveUrl(imageDriveId, 'w200');
  }
  return null;
};

/**
 * Handle image error
 */
const handleImageError = (event) => {
  event.target.style.display = 'none';
  event.target.nextElementSibling.style.display = 'flex';
};

/**
 * Open file input for specific document
 */
const openFileInput = (documentId) => {
  const fileInput = document.querySelector(`[data-file-input="${documentId}"]`);
  if (fileInput) {
    fileInput.click();
  }
};

/**
 * Handle file selection
 */
const handleFileSelect = async (event, document) => {
  const file = event.target.files[0];
  if (!file) return;

  // Validate file
  const validation = validateFile(file);
  if (!validation.isValid) {
    alert(validation.errors.join(', '));
    return;
  }

  // Set uploading state
  uploadingStates[document.id] = true;
  uploadProgress[document.id] = 0;
  uploadMessages[document.id] = 'Preparing upload...';

  try {
    // Create preview
    const preview = await createImagePreview(file);
    
    // Upload to Google Drive
    const regId = document[ProfileField.REG_ID] || document.regId || document.Reg_ID;
    const result = await uploadToDrive(file, regId);

    if (result.success) {
      // Update the document with the new image drive ID
      const fileId = result.fileId || extractFileId(result.driveUrl);
      
      // Emit event to update the document
      emit('update-profile-image', {
        documentId: document.id,
        imageDriveId: fileId,
        driveUrl: result.driveUrl
      });

      uploadMessages[document.id] = 'Upload successful!';
      uploadProgress[document.id] = 100;
      
      // Clear after 2 seconds
      setTimeout(() => {
        uploadingStates[document.id] = false;
        uploadProgress[document.id] = 0;
        uploadMessages[document.id] = '';
      }, 2000);

    } else {
      throw new Error('Upload failed');
    }

  } catch (error) {
    console.error('Upload error:', error);
    uploadMessages[document.id] = `Upload failed: ${error.message}`;
    
    // Clear error after 3 seconds
    setTimeout(() => {
      uploadingStates[document.id] = false;
      uploadProgress[document.id] = 0;
      uploadMessages[document.id] = '';
    }, 3000);
  }

  // Clear the file input
  event.target.value = '';
};

/**
 * Extract file ID from Google Drive URL
 */
const extractFileId = (url) => {
  if (!url) return null;
  
  // New format: https://drive.google.com/file/d/FILE_ID/view?usp=drivesdk
  const newFormatMatch = url.match(/\/file\/d\/([-\w]{25,})\/view/);
  if (newFormatMatch) {
    return newFormatMatch[1];
  }
  
  // Old format: try to extract any 25+ character ID
  const oldFormatMatch = url.match(/[-\w]{25,}/);
  if (oldFormatMatch) {
    return oldFormatMatch[0];
  }
  
  return null;
};
</script> 