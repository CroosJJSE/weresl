<template>
  <div class="container">
    <!-- Header with Logo -->
    <div class="header">
      <img 
        src="https://drive.google.com/thumbnail?id=1AEEWccjf_sMoXJgAaYIPZZm5rM-OCFe2" 
        alt="WERESL Logo" 
        class="logo"
      />
      <h1 class="title">WERESL Top View</h1>
      <p class="subtitle">Central Hub for All Project Links</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading">
      Loading links...
    </div>

    <!-- Error Message -->
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <!-- Success Message -->
    <div v-if="successMessage" class="success-message">
      {{ successMessage }}
    </div>

    <!-- Links Grid -->
    <div v-if="!loading && links.length > 0" class="links-grid">
      <div v-for="link in links" :key="link.id" class="link-card">
        <div class="link-title">
          {{ link.title }}
          <span v-if="link.secure" class="secure-badge">🔒 Secure</span>
          <span v-if="link.button" class="button-badge">🔘 Button</span>
        </div>
        <p class="link-description">{{ link.description }}</p>
        <a :href="link.url" class="link-url" target="_blank" rel="noopener noreferrer">
          {{ link.url }}
        </a>
        <div class="link-actions">
          <button 
            v-if="link.secure" 
            @click="showPasswordModalForLink(link)" 
            class="btn btn-primary"
          >
            🔒 Access Secure Link
          </button>
          <a 
            v-else 
            :href="link.url" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="btn btn-primary"
          >
            🌐 Visit Link
          </a>
          <button @click="copyLink(link.url)" class="btn btn-secondary">
            📋 Copy Link
          </button>
        </div>
      </div>
    </div>

    <!-- No Links Message -->
    <div v-if="!loading && links.length === 0" class="loading">
      <p>No links available at the moment.</p>
    </div>

    <!-- Feedback Section -->
    <div class="feedback-section">
      <h2 class="feedback-title">Send Feedback to Developer</h2>
      <form @submit.prevent="submitFeedback" class="feedback-form">
        <div class="form-group">
          <label for="name">Your Name</label>
          <input 
            type="text" 
            id="name" 
            v-model="feedbackData.name" 
            class="form-control" 
            required
          />
        </div>
        <div class="form-group">
          <label for="email">Your Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="feedbackData.email" 
            class="form-control" 
            required
          />
        </div>
        <div class="form-group">
          <label for="subject">Subject</label>
          <input 
            type="text" 
            id="subject" 
            v-model="feedbackData.subject" 
            class="form-control" 
            required
          />
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea 
            id="message" 
            v-model="feedbackData.message" 
            class="form-control" 
            required
            placeholder="Please describe your feedback, suggestions, or report any issues..."
          ></textarea>
        </div>
        <button type="submit" class="btn btn-success" :disabled="submittingFeedback">
          {{ submittingFeedback ? 'Sending...' : 'Send Feedback' }}
        </button>
      </form>
    </div>

    <!-- Password Modal -->
    <div v-if="showPasswordModal" class="password-modal" @click="closePasswordModal">
      <div class="modal-content" @click.stop>
        <h3 class="modal-title">Enter Password</h3>
        <div class="form-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            v-model="passwordInput" 
            class="form-control" 
            @keyup.enter="checkPassword"
            autofocus
          />
        </div>
        <div class="modal-actions">
          <button @click="closePasswordModal" class="btn btn-secondary">
            Cancel
          </button>
          <button @click="checkPassword" class="btn btn-primary">
            Access Link
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { db } from './firebase/index.js'
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'

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
    
    // Feedback state
    const submittingFeedback = ref(false)
    const feedbackData = reactive({
      name: '',
      email: '',
      subject: '',
      message: ''
    })

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

    // Show password modal for secure links
    const showPasswordModalForLink = (link) => {
      currentSecureLink.value = link
      showPasswordModal.value = true
      passwordInput.value = ''
    }

    // Close password modal
    const closePasswordModal = () => {
      showPasswordModal.value = false
      currentSecureLink.value = null
      passwordInput.value = ''
    }

    // Check password and access secure link
    const checkPassword = () => {
      // For now, using a dummy password "weresl123"
      if (passwordInput.value === 'weresl123') {
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

    // Submit feedback
    const submitFeedback = async () => {
      try {
        submittingFeedback.value = true
        errorMessage.value = ''
        
        const feedbackDoc = {
          name: feedbackData.name,
          email: feedbackData.email,
          subject: feedbackData.subject,
          message: feedbackData.message,
          date: serverTimestamp(),
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString()
        }
        
        await addDoc(collection(db, 'webapp-feedback'), feedbackDoc)
        
        // Reset form
        feedbackData.name = ''
        feedbackData.email = ''
        feedbackData.subject = ''
        feedbackData.message = ''
        
        successMessage.value = 'Thank you for your feedback! We will get back to you soon.'
        setTimeout(() => {
          successMessage.value = ''
        }, 5000)
      } catch (error) {
        console.error('Error submitting feedback:', error)
        errorMessage.value = 'Error submitting feedback. Please try again.'
        setTimeout(() => {
          errorMessage.value = ''
        }, 5000)
      } finally {
        submittingFeedback.value = false
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
      submittingFeedback,
      feedbackData,
      showPasswordModalForLink,
      closePasswordModal,
      checkPassword,
      copyLink,
      submitFeedback
    }
  }
}
</script> 