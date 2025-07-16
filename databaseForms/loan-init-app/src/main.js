import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from './App.vue'

// Import pages
import LoanInitForm from './pages/LoanInitForm.vue'

// Create router
const routes = [
  {
    path: '/',
    name: 'LoanInit',
    component: LoanInitForm
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Create Pinia store
const pinia = createPinia()

// Create and mount app
const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app') 