<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Dev Data Dashboard
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Internal Use Only - Password Required
        </p>
      </div>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div class="mt-1">
              <input
                id="password"
                v-model="password"
                type="password"
                autocomplete="current-password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter password"
                :class="{ 'border-red-500': error }"
              />
            </div>
            <div v-if="error" class="mt-2 text-sm text-red-600">
              {{ error }}
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="loading" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </span>
              <span v-else>Access Dashboard</span>
            </button>
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Security Notice</span>
            </div>
          </div>

          <div class="mt-6 text-center">
            <p class="text-xs text-gray-500">
              This dashboard contains sensitive database information.<br>
              Unauthorized access is prohibited.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Reactive state
const password = ref('')
const error = ref('')
const loading = ref(false)

// Emit events
const emit = defineEmits(['authenticated'])

// Password validation
const CORRECT_PASSWORD = '7777'

const handleLogin = async () => {
  if (!password.value.trim()) {
    error.value = 'Please enter a password'
    return
  }

  loading.value = true
  error.value = ''

  // Simulate a brief delay for better UX
  await new Promise(resolve => setTimeout(resolve, 500))

  if (password.value === CORRECT_PASSWORD) {
    // Store authentication state in sessionStorage
    sessionStorage.setItem('dev-dashboard-authenticated', 'true')
    sessionStorage.setItem('dev-dashboard-auth-time', Date.now().toString())
    
    emit('authenticated')
  } else {
    error.value = 'Incorrect password. Please try again.'
    password.value = ''
  }

  loading.value = false
}

// Check if already authenticated
const checkExistingAuth = () => {
  const isAuthenticated = sessionStorage.getItem('dev-dashboard-authenticated')
  const authTime = sessionStorage.getItem('dev-dashboard-auth-time')
  
  if (isAuthenticated && authTime) {
    // Check if authentication is still valid (24 hours)
    const timeDiff = Date.now() - parseInt(authTime)
    const hoursDiff = timeDiff / (1000 * 60 * 60)
    
    if (hoursDiff < 24) {
      emit('authenticated')
    } else {
      // Clear expired authentication
      sessionStorage.removeItem('dev-dashboard-authenticated')
      sessionStorage.removeItem('dev-dashboard-auth-time')
    }
  }
}

// Check authentication on component mount
import { onMounted } from 'vue'
onMounted(() => {
  checkExistingAuth()
})
</script>
