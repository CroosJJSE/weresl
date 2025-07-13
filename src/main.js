import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from './App.vue'

// Import pages
import HomePage from './pages/main/HomePage.vue'
import LoanInitForm from './pages/forms/LoanInitForm.vue'
import PaymentForm from './pages/forms/PaymentForm.vue'
import AnalyticsDashboard from './pages/analytics/AnalyticsDashboard.vue'

// Create router
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/loan-init',
    name: 'LoanInit',
    component: LoanInitForm
  },
  {
    path: '/payment',
    name: 'Payment',
    component: PaymentForm
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: AnalyticsDashboard
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('./pages/admin/AdminPage.vue')
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