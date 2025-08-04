<template>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1 class="title">WERESL Links</h1>
      <p class="subtitle">Access your project links</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading">
      Loading...
    </div>

    <!-- Error Message -->
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <!-- Success Message -->
    <div v-if="successMessage" class="success-message">
      {{ successMessage }}
    </div>

    <!-- Links List -->
    <div v-if="!loading && links.length > 0" class="links-list">
      <div v-for="link in links" :key="link.id" class="link-item">
        <div class="link-content">
          <h3 class="link-title">{{ link.title }}</h3>
          <p class="link-description">{{ link.description }}</p>
        </div>
        <div class="link-actions">
          <button 
            @click="copyLink(link.url)" 
            class="btn btn-copy"
            title="Copy link"
          >
            Copy
          </button>
          <button 
            @click="openLink(link)" 
            class="btn btn-open"
            title="Open link"
          >
            Open
          </button>
        </div>
      </div>
    </div>

    <!-- No Links Message -->
    <div v-if="!loading && links.length === 0" class="no-links">
      <p>No links available.</p>
    </div>

    <!-- Password Modal -->
    <div v-if="showPasswordModal" class="modal-overlay" @click="closePasswordModal">
      <div class="modal-content" @click.stop>
        <h3 class="modal-title">Enter Password</h3>
        <div class="form-group">
          <input 
            type="password" 
            v-model="passwordInput" 
            class="form-control" 
            @keyup.enter="checkPassword"
            placeholder="Enter password"
            autofocus
          />
        </div>
        <div class="modal-actions">
          <button @click="closePasswordModal" class="btn btn-secondary">
            Cancel
          </button>
          <button @click="checkPassword" class="btn btn-primary">
            Access
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { db } from './firebase/index.js'
import { collection, getDocs } from 'firebase/firestore'

export default {
  name: 'App',
  setup() {
    const loading = ref(false)
    const links = ref([])
    const errorMessage = ref('')
    const successMessage = ref('')
    
    // Password modal state
    const showPasswordModal = ref(false)
    const passwordInput = ref('')
    const currentSecureLink = ref(null)

    // Load links from Firestore
    const loadLinks = async () => {
      try {
        loading.value = true
        errorMessage.value = ''
        
        const linksQuery = collection(db, 'topview-links')
        const linksSnapshot = await getDocs(linksQuery)
        
        links.value = linksSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        
        console.log('Loaded links:', links.value)
      } catch (error) {
        console.error('Error loading links:', error)
        errorMessage.value = 'Error loading links. Please try again later.'
      } finally {
        loading.value = false
      }
    }

    // Copy link to clipboard
    const copyLink = async (url) => {
      try {
        await navigator.clipboard.writeText(url)
        successMessage.value = 'Link copied to clipboard!'
        setTimeout(() => {
          successMessage.value = ''
        }, 3000)
      } catch (error) {
        console.error('Error copying link:', error)
        errorMessage.value = 'Failed to copy link to clipboard.'
        setTimeout(() => {
          errorMessage.value = ''
        }, 3000)
      }
    }

    // Open link (with password check if secure)
    const openLink = (link) => {
      if (link.secure) {
        currentSecureLink.value = link
        showPasswordModal.value = true
        passwordInput.value = ''
      } else {
        window.open(link.url, '_blank', 'noopener,noreferrer')
      }
    }

    // Close password modal
    const closePasswordModal = () => {
      showPasswordModal.value = false
      currentSecureLink.value = null
      passwordInput.value = ''
    }

    // Check password and access secure link
    const checkPassword = () => {
      if (passwordInput.value === '1234') {
        if (currentSecureLink.value) {
          window.open(currentSecureLink.value.url, '_blank', 'noopener,noreferrer')
        }
        closePasswordModal()
        successMessage.value = 'Access granted!'
        setTimeout(() => {
          successMessage.value = ''
        }, 3000)
      } else {
        errorMessage.value = 'Incorrect password. Please try again.'
        setTimeout(() => {
          errorMessage.value = ''
        }, 3000)
        passwordInput.value = ''
      }
    }

    // Load links on component mount
    onMounted(() => {
      loadLinks()
    })

    return {
      loading,
      links,
      errorMessage,
      successMessage,
      showPasswordModal,
      passwordInput,
      copyLink,
      openLink,
      closePasswordModal,
      checkPassword
    }
  }
}
</script> 