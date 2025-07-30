<template>
  <div id="app">
    <div class="container">
      <header>
        <h1>Drive Upload Demo</h1>
        <p>Test image upload to Google Drive via Apps Script</p>
      </header>

      <main>
        <div class="upload-form">
          <div class="form-group">
            <label for="title">Title:</label>
            <input 
              id="title"
              v-model="title" 
              type="text" 
              placeholder="Enter image title"
              required
            />
          </div>

          <div class="form-group">
            <label for="imageInput">Select Image:</label>
            <div class="file-input-wrapper">
              <input 
                id="imageInput"
                ref="fileInput"
                type="file" 
                accept="image/*"
                @change="handleFileSelect"
                :disabled="isUploading"
              />
              <div class="file-input-display">
                <span v-if="selectedFile">{{ selectedFile.name }}</span>
                <span v-else>Choose an image file (max 1MB)</span>
              </div>
            </div>
            <div v-if="fileError" class="error-message">
              {{ fileError }}
            </div>
          </div>

          <div v-if="selectedFile" class="image-preview">
            <img :src="imagePreview" alt="Preview" />
            <div class="file-info">
              <p>Size: {{ formatFileSize(selectedFile.size) }}</p>
              <p>Type: {{ selectedFile.type }}</p>
            </div>
          </div>

          <button 
            @click="uploadImage" 
            :disabled="!canUpload || isUploading"
            class="upload-btn"
          >
            <span v-if="isUploading" class="loading">
              <div class="spinner"></div>
              Uploading...
            </span>
            <span v-else>Upload to Drive</span>
          </button>

          <div v-if="uploadStatus" class="status-message" :class="uploadStatus.type">
            {{ uploadStatus.message }}
          </div>
        </div>

        <div v-if="uploadedImages.length > 0" class="uploaded-images">
          <h3>Uploaded Images</h3>
          <div class="image-grid">
            <div 
              v-for="image in uploadedImages" 
              :key="image.id" 
              class="image-card"
            >
              <img :src="image.imageURL" :alt="image.title" />
              <div class="image-info">
                <h4>{{ image.title }}</h4>
                <p>Uploaded: {{ formatDate(image.uploadedAt) }}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { collection, addDoc, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase-config.js'
import { 
  uploadImageWithProgress, 
  validateFile, 
  createImagePreview, 
  formatFileSize 
} from './services/driveUploadService.js'

export default {
  name: 'App',
  setup() {
    const title = ref('')
    const selectedFile = ref(null)
    const imagePreview = ref('')
    const fileError = ref('')
    const isUploading = ref(false)
    const uploadStatus = ref(null)
    const uploadedImages = ref([])
    const fileInput = ref(null)

    const canUpload = computed(() => {
      return title.value.trim() && selectedFile.value && !fileError.value
    })

    const handleFileSelect = async (event) => {
      const file = event.target.files[0]
      if (!file) return

      // Validate file using modular service
      const validation = validateFile(file)
      if (!validation.isValid) {
        fileError.value = validation.errors.join(', ')
        selectedFile.value = null
        imagePreview.value = ''
        return
      }

      fileError.value = ''
      selectedFile.value = file

      // Create preview using modular service
      try {
        imagePreview.value = await createImagePreview(file)
      } catch (error) {
        console.error('Error creating preview:', error)
        fileError.value = 'Error creating image preview'
      }
    }

    const formatDate = (timestamp) => {
      if (!timestamp) return ''
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
      return date.toLocaleString()
    }

    const saveToFirestore = async (imageURL, title) => {
      try {
        const docRef = await addDoc(collection(db, 'uploadedImages'), {
          imageURL,
          title,
          uploadedAt: serverTimestamp()
        })
        return docRef.id
      } catch (error) {
        console.error('Firestore save error:', error)
        throw error
      }
    }

    const uploadImage = async () => {
      if (!canUpload.value) return

      isUploading.value = true
      uploadStatus.value = { type: 'info', message: 'Starting upload...' }

      try {
        // Use modular upload service with progress
        const result = await uploadImageWithProgress(selectedFile.value, (progress, message) => {
          uploadStatus.value = { type: 'info', message }
        })

        // Save to Firestore
        uploadStatus.value = { type: 'info', message: 'Saving to database...' }
        const docId = await saveToFirestore(result.driveUrl, title.value)

        // Update UI
        uploadStatus.value = { type: 'success', message: 'Upload successful!' }
        
        // Add to uploaded images list
        uploadedImages.value.unshift({
          id: docId,
          imageURL: result.driveUrl,
          title: title.value,
          uploadedAt: new Date()
        })

        // Reset form
        title.value = ''
        selectedFile.value = null
        imagePreview.value = ''
        fileInput.value.value = ''

      } catch (error) {
        console.error('Upload error:', error)
        uploadStatus.value = { 
          type: 'error', 
          message: `Upload failed: ${error.message}` 
        }
      } finally {
        isUploading.value = false
      }
    }

    const loadUploadedImages = async () => {
      try {
        const q = query(collection(db, 'uploadedImages'), orderBy('uploadedAt', 'desc'))
        const querySnapshot = await getDocs(q)
        uploadedImages.value = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      } catch (error) {
        console.error('Error loading images:', error)
      }
    }

    onMounted(() => {
      loadUploadedImages()
    })

    return {
      title,
      selectedFile,
      imagePreview,
      fileError,
      isUploading,
      uploadStatus,
      uploadedImages,
      fileInput,
      canUpload,
      handleFileSelect,
      formatFileSize,
      formatDate,
      uploadImage
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #f5f5f5;
  color: #333;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

header {
  text-align: center;
  margin-bottom: 40px;
}

header h1 {
  color: #2c3e50;
  margin-bottom: 10px;
}

header p {
  color: #7f8c8d;
  font-size: 16px;
}

.upload-form {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #2c3e50;
}

input[type="text"] {
  width: 100%;
  padding: 12px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
}

input[type="text"]:focus {
  outline: none;
  border-color: #3498db;
}

.file-input-wrapper {
  position: relative;
}

input[type="file"] {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.file-input-display {
  padding: 12px;
  border: 2px dashed #e1e8ed;
  border-radius: 8px;
  text-align: center;
  color: #7f8c8d;
  background: #f8f9fa;
  transition: all 0.3s;
}

.file-input-wrapper:hover .file-input-display {
  border-color: #3498db;
  background: #f0f8ff;
}

.error-message {
  color: #e74c3c;
  font-size: 14px;
  margin-top: 5px;
}

.image-preview {
  margin: 20px 0;
  text-align: center;
}

.image-preview img {
  max-width: 100%;
  max-height: 300px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.file-info {
  margin-top: 10px;
  font-size: 14px;
  color: #7f8c8d;
}

.file-info p {
  margin: 2px 0;
}

.upload-btn {
  width: 100%;
  padding: 15px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.upload-btn:hover:not(:disabled) {
  background: #2980b9;
}

.upload-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

.loading {
  display: flex;
  align-items: center;
  gap: 10px;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #ffffff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.status-message {
  margin-top: 15px;
  padding: 12px;
  border-radius: 8px;
  font-weight: 500;
}

.status-message.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.status-message.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.status-message.info {
  background: #d1ecf1;
  color: #0c5460;
  border: 1px solid #bee5eb;
}

.uploaded-images {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.uploaded-images h3 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.image-card {
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s;
}

.image-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.image-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.image-info {
  padding: 15px;
}

.image-info h4 {
  margin-bottom: 5px;
  color: #2c3e50;
}

.image-info p {
  font-size: 14px;
  color: #7f8c8d;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .container {
    padding: 15px;
  }
  
  .upload-form {
    padding: 20px;
  }
  
  .image-grid {
    grid-template-columns: 1fr;
  }
  
  header h1 {
    font-size: 24px;
  }
  
  .upload-btn {
    padding: 12px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 10px;
  }
  
  .upload-form {
    padding: 15px;
  }
  
  input[type="text"] {
    font-size: 14px;
  }
}
</style> 