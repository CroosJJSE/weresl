import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from './App.vue'

// Import pages
import RFGIFReturnForm from './pages/RFGIFReturnForm.vue'

// Create router
const routes = [
  {
    path: '/',
    name: 'RFGIFReturn',
    component: RFGIFReturnForm
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