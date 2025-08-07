<template>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1 class="title">WERESL Links</h1>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading">
      Loading...
    </div>

    <!-- Links List -->
    <div v-if="!loading && links.length > 0" class="links-list">
      <div v-for="link in links" :key="link.id" class="link-item">
        <h3 class="link-title">{{ link.title }}</h3>
        <p class="link-description">{{ link.description }}</p>
        <div class="link-actions">
          <button 
            @click="copyLink(link.url)" 
            class="btn btn-copy"
          >
            Copy
          </button>
          <button 
            @click="openLink(link)" 
            class="btn btn-open"
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
            :class="{ 'error': passwordError }"
            @keyup.enter="checkPassword"
            placeholder="Enter password"
            autofocus
          />
          <div v-if="passwordError" class="error-message">
            Incorrect password. Please try again.
          </div>
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
    
    // Password modal state
    const showPasswordModal = ref(false)
    const passwordInput = ref('')
    const currentSecureLink = ref(null)
    const passwordError = ref(false)

    // Load links from Firestore
    const loadLinks = async () => {
      try {
        loading.value = true
        
        const linksQuery = collection(db, 'topview-links')
        const linksSnapshot = await getDocs(linksQuery)
        
        links.value = linksSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        
        console.log('Loaded links:', links.value)
        console.log('Links with secure property:', links.value.filter(link => link.secure))
        console.log('Links without secure property:', links.value.filter(link => !link.secure))
      } catch (error) {
        console.error('Error loading links:', error)
      } finally {
        loading.value = false
      }
    }

    // Copy link to clipboard
    const copyLink = async (url) => {
      try {
        await navigator.clipboard.writeText(url)
      } catch (error) {
        console.error('Error copying link:', error)
      }
    }

    // Open link (with password check if secure)
    const openLink = (link) => {
      console.log('Opening link:', link)
      console.log('Link secure status:', link.secure)
      
      if (link.secure) {
        console.log('Link is secure, showing password modal')
        currentSecureLink.value = link
        showPasswordModal.value = true
        passwordInput.value = ''
      } else {
        console.log('Link is not secure, opening directly')
        window.open(link.url, '_blank', 'noopener,noreferrer')
      }
    }

    // Close password modal
    const closePasswordModal = () => {
      console.log('Closing password modal')
      showPasswordModal.value = false
      currentSecureLink.value = null
      passwordInput.value = ''
      passwordError.value = false
    }

    // Check password and access secure link
    const checkPassword = () => {
      console.log('Checking password:', passwordInput.value)
      console.log('Password length:', passwordInput.value.length)
      console.log('Current secure link:', currentSecureLink.value)
      
      // Trim whitespace and check password
      const trimmedPassword = passwordInput.value.trim()
      console.log('Trimmed password:', trimmedPassword)
      
      if (trimmedPassword === '1234') {
        console.log('Password correct, opening secure link')
        passwordError.value = false
        if (currentSecureLink.value) {
          console.log('Opening URL:', currentSecureLink.value.url)
          window.open(currentSecureLink.value.url, '_blank', 'noopener,noreferrer')
        } else {
          console.error('No current secure link found')
        }
        closePasswordModal()
      } else {
        console.log('Password incorrect, clearing input')
        console.log('Expected: 1234, Got:', trimmedPassword)
        passwordInput.value = ''
        passwordError.value = true
        // Clear error after 3 seconds
        setTimeout(() => {
          passwordError.value = false
        }, 3000)
      }
    }

    // Load links on component mount
    onMounted(() => {
      loadLinks()
    })

    return {
      loading,
      links,
      showPasswordModal,
      passwordInput,
      copyLink,
      openLink,
      closePasswordModal,
      checkPassword,
      passwordError
    }
  }
}
</script> 