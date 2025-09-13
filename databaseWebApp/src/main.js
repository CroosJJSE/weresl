import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from './App.vue'

// Import pages
import HomePage from './pages/main/HomePage.vue'
import PdfExportPage from './pages/PdfExportPage.vue'

// Create router
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/pdf-export',
    name: 'PdfExport',
    component: PdfExportPage
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