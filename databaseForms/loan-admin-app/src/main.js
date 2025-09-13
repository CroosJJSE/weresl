import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import AdminDashboard from './pages/AdminDashboard.vue'
import BankAccountsPage from './pages/BankAccountsPage.vue'

const routes = [
  {
    path: '/',
    name: 'AdminDashboard',
    component: AdminDashboard
  },
  {
    path: '/bank-accounts',
    name: 'BankAccounts',
    component: BankAccountsPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app') 