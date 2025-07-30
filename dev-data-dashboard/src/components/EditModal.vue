<template>
  <div v-if="show" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div class="relative top-4 sm:top-20 mx-auto p-4 sm:p-5 border w-11/12 sm:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
      <div class="mt-3">
        <!-- Header -->
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">
            Edit Document
          </h3>
          <button
            @click="closeModal"
            class="text-gray-400 hover:text-gray-600 p-2"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Loading State -->
        <div v-if="saving" class="text-center py-4">
          <div class="inline-flex items-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="text-gray-600">Saving...</span>
          </div>
        </div>

        <!-- Form -->
        <form v-else @submit.prevent="saveDocument" class="space-y-4">
          <!-- Essential Fields Only -->
          <div class="grid grid-cols-1 gap-4">
            <div>
              <label for="Name" class="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                id="Name"
                v-model="formData.Name"
                type="text"
                class="input w-full text-base"
                placeholder="Enter name"
              />
            </div>

            <div>
              <label for="NIC" class="block text-sm font-medium text-gray-700 mb-2">
                NIC {{ isNicEditable ? '(Add NIC)' : '(Read Only)' }}
              </label>
              <input
                id="NIC"
                v-model="formData.NIC"
                type="text"
                class="input w-full text-base"
                :class="isNicEditable ? '' : 'bg-gray-100'"
                :readonly="!isNicEditable"
                :disabled="!isNicEditable"
                placeholder="Enter NIC number"
              />
              <p v-if="isNicEditable" class="text-xs text-blue-600 mt-1">
                NIC number can be added if not already present
              </p>
            </div>

            <div>
              <label for="Reg_ID" class="block text-sm font-medium text-gray-700 mb-2">
                Reg ID (Read Only)
              </label>
              <input
                id="Reg_ID"
                v-model="displayRegId"
                type="text"
                class="input w-full text-base bg-gray-100"
                readonly
                disabled
              />
              <p v-if="regIdPreview" class="text-xs text-yellow-600 mt-1">
                New Reg ID will be assigned when you save changes
              </p>
            </div>

            <div>
              <label for="contact" class="block text-sm font-medium text-gray-700 mb-2">
                Contact
              </label>
              <input
                id="contact"
                v-model="formData.contact"
                type="tel"
                class="input w-full text-base"
                placeholder="Enter contact number"
              />
            </div>

            <div>
              <label for="District" class="block text-sm font-medium text-gray-700 mb-2">
                District
              </label>
              <select
                id="District"
                v-model="formData.District"
                @change="handleDistrictChange"
                class="input w-full text-base"
              >
                <option value="">Select District</option>
                <option v-for="district in districts" :key="district" :value="district">
                  {{ district }}
                </option>
              </select>
            </div>

            <div>
              <label for="occupation" class="block text-sm font-medium text-gray-700 mb-2">
                Occupation
              </label>
              <input
                id="occupation"
                v-model="formData.occupation"
                type="text"
                class="input w-full text-base"
                placeholder="Enter occupation"
              />
            </div>
          </div>

          <!-- Success/Error Messages -->
          <div v-if="message" class="p-3 rounded-md" :class="messageClass">
            {{ message }}
          </div>

          <!-- Actions -->
          <div class="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
            <button
              type="button"
              @click="closeModal"
              class="btn btn-secondary w-full sm:w-auto px-6 py-3 text-base"
              :disabled="saving"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="btn btn-primary w-full sm:w-auto px-6 py-3 text-base"
              :disabled="saving"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firestoreService from '../services/firestoreService.js';

export default {
  name: 'EditModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    document: {
      type: Object,
      default: null
    },
    collectionName: {
      type: String,
      default: 'profiles'
    }
  },
  data() {
    return {
      formData: {},
      saving: false,
      message: '',
      messageType: '',
      districts: firestoreService.getDistricts(),
      regIdPreview: null,
      originalDistrict: null,
      originalNic: null
    }
  },
  computed: {
    messageClass() {
      return {
        'bg-green-50 text-green-800 border border-green-200': this.messageType === 'success',
        'bg-red-50 text-red-800 border border-red-200': this.messageType === 'error'
      }
    },
    displayRegId() {
      return this.regIdPreview || this.formData.Reg_ID || '';
    },
    isNicEditable() {
      // Allow editing if NIC is empty, null, or undefined
      return !this.formData.NIC || this.formData.NIC.trim() === '';
    }
  },
  watch: {
    document: {
      handler(newDoc) {
        if (newDoc) {
          console.log('EditModal: Document received for editing:', newDoc);
          this.formData = { ...newDoc };
          this.originalDistrict = newDoc.District;
          this.originalNic = newDoc.NIC;
          this.regIdPreview = null;
          this.message = '';
        }
      },
      immediate: true
    }
  },
  methods: {
    async saveDocument() {
      console.log('EditModal: Saving document with data:', this.formData);
      this.saving = true;
      this.message = '';
      
      try {
        // Remove id from formData as it shouldn't be updated
        const { id, ...updateData } = this.formData;
        
        // If district changed, use the preview Reg_ID
        if (this.regIdPreview) {
          updateData.Reg_ID = this.regIdPreview;
          console.log('EditModal: Using preview Reg_ID:', this.regIdPreview);
        }
        
        const result = await firestoreService.updateDocument(this.collectionName, id, updateData);
        
        this.message = 'Document updated successfully!';
        this.messageType = 'success';
        
        // Emit success event with updated data
        const updatedDocument = { ...this.formData, id };
        if (this.regIdPreview) {
          updatedDocument.Reg_ID = this.regIdPreview;
          // If document ID changed, update it
          if (result.newDocumentId) {
            updatedDocument.id = result.newDocumentId;
            console.log('EditModal: Document ID changed from', id, 'to', result.newDocumentId);
          }
        }
        this.$emit('document-updated', updatedDocument);
        
        // Close modal after a short delay
        setTimeout(() => {
          this.closeModal();
        }, 1500);
        
      } catch (error) {
        console.error('EditModal: Error updating document:', error);
        this.message = error.message || 'Error updating document. Please try again.';
        this.messageType = 'error';
      } finally {
        this.saving = false;
      }
    },
    closeModal() {
      console.log('EditModal: Closing modal');
      this.regIdPreview = null;
      this.originalDistrict = null;
      this.originalNic = null;
      this.$emit('close');
    },
    async handleDistrictChange() {
      console.log('EditModal: District changed to:', this.formData.District);
      
      // Only generate preview if district actually changed
      if (this.formData.District && this.formData.District !== this.originalDistrict) {
        try {
          this.regIdPreview = await firestoreService.generateRegIdPreview(this.formData.District);
          console.log('EditModal: Generated Reg_ID preview:', this.regIdPreview);
        } catch (error) {
          console.error('EditModal: Error generating Reg_ID preview:', error);
          this.regIdPreview = null;
        }
      } else {
        this.regIdPreview = null;
      }
    }
  }
}
</script> 