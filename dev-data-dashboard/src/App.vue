<template>
  <div id="app">
    <!-- Password Protection Screen -->
    <PasswordProtection 
      v-if="!isAuthenticated" 
      @authenticated="handleAuthentication" 
    />
    
    <!-- Main Dashboard -->
    <div v-else class="h-screen bg-gray-50 flex flex-col">
      <header class="bg-white shadow-sm">
        <div class="px-2">
          <div class="flex justify-between items-center h-12">
            <div class="flex items-center">
              <h1 class="text-sm font-semibold text-gray-900">
                Dev Data Dashboard
              </h1>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs text-gray-500">
                Internal Use Only
              </span>
              <button
                @click="handleLogout"
                class="px-2 py-1 text-xs text-gray-600 hover:text-gray-800 border border-gray-300 rounded hover:bg-gray-50"
                title="Logout"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main class="px-2 py-2 flex-1 overflow-y-auto">
        <Dashboard />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Dashboard from './pages/Dashboard.vue'
import PasswordProtection from './components/PasswordProtection.vue'

// Authentication state
const isAuthenticated = ref(false)

// Handle successful authentication
const handleAuthentication = () => {
  isAuthenticated.value = true
}

// Handle logout
const handleLogout = () => {
  if (confirm('Are you sure you want to logout?')) {
    // Clear authentication data
    sessionStorage.removeItem('dev-dashboard-authenticated')
    sessionStorage.removeItem('dev-dashboard-auth-time')
    
    // Reset authentication state
    isAuthenticated.value = false
  }
}

// Check authentication status on app load
onMounted(() => {
  const isAuth = sessionStorage.getItem('dev-dashboard-authenticated')
  const authTime = sessionStorage.getItem('dev-dashboard-auth-time')
  
  if (isAuth && authTime) {
    // Check if authentication is still valid (24 hours)
    const timeDiff = Date.now() - parseInt(authTime)
    const hoursDiff = timeDiff / (1000 * 60 * 60)
    
    if (hoursDiff < 24) {
      isAuthenticated.value = true
    } else {
      // Clear expired authentication
      sessionStorage.removeItem('dev-dashboard-authenticated')
      sessionStorage.removeItem('dev-dashboard-auth-time')
    }
  }
})
</script> 