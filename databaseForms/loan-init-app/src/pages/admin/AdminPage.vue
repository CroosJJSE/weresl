<template>
  <div class="admin-page">
    <div class="admin-header">
      <h1>Admin Dashboard</h1>
      <p>System management and data operations</p>
    </div>

    <div class="admin-content">
      <div class="admin-section">
        <h2>Data Management</h2>
        <div class="admin-actions">
          <button @click="exportData" class="btn btn-primary">Export Data</button>
          <button @click="importData" class="btn btn-secondary">Import Data</button>
          <button @click="backupData" class="btn btn-secondary">Backup Data</button>
        </div>
      </div>

      <div class="admin-section">
        <h2>System Logs</h2>
        <div class="logs-container">
          <div v-for="log in systemLogs" :key="log.id" class="log-entry">
            <span class="log-level" :class="log.level">{{ log.level }}</span>
            <span class="log-message">{{ log.details }}</span>
            <span class="log-time">{{ formatDate(log.timestamp) }}</span>
          </div>
        </div>
      </div>

      <div class="admin-section">
        <h2>Quick Actions</h2>
        <div class="quick-actions">
          <router-link to="/loan-init" class="btn btn-primary">New Loan</router-link>
          <router-link to="/analytics" class="btn btn-secondary">View Analytics</router-link>
          <button @click="clearLogs" class="btn btn-danger">Clear Logs</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { dbOperations } from '@/firebase/db.js'

export default {
  Name: 'AdminPage',
  setup() {
    const systemLogs = ref([])

    const loadSystemLogs = async () => {
      try {
        // This would load actual system logs from Firebase
        systemLogs.value = [
          { id: 1, level: 'info', details: 'System initialized', timestamp: new Date() },
          { id: 2, level: 'info', details: 'Admin page loaded', timestamp: new Date() }
        ]
      } catch (err) {
        console.error('Error loading system logs:', err)
      }
    }

    const exportData = async () => {
      try {
        const profiles = await dbOperations.getAllProfiles()
        const dataStr = JSON.stringify(profiles, null, 2)
        const dataBlob = new Blob([dataStr], { type: 'application/json' })
        const url = URL.createObjectURL(dataBlob)
        const link = document.createElement('a')
        link.href = url
        link.download = `weresl-data-${new Date().toISOString().split('T')[0]}.json`
        link.click()
        URL.revokeObjectURL(url)
      } catch (err) {
        console.error('Error exporting data:', err)
      }
    }

    const importData = () => {
      // Implementation for data import
      console.log('Import data functionality')
    }

    const backupData = async () => {
      try {
        await dbOperations.logOperation('BACKUP_DATA', 'Manual backup initiated')
        // Implementation for data backup
        console.log('Backup data functionality')
      } catch (err) {
        console.error('Error backing up data:', err)
      }
    }

    const clearLogs = async () => {
      try {
        systemLogs.value = []
        await dbOperations.logOperation('CLEAR_LOGS', 'System logs cleared')
      } catch (err) {
        console.error('Error clearing logs:', err)
      }
    }

    const formatDate = (date) => {
      return new Date(date).toLocaleString()
    }

    onMounted(() => {
      loadSystemLogs()
    })

    return {
      systemLogs,
      exportData,
      importData,
      backupData,
      clearLogs,
      formatDate
    }
  }
}
</script>

<style scoped>
.admin-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.admin-header {
  text-align: center;
  margin-bottom: 40px;
}

.admin-header h1 {
  color: #1565c0;
  margin-bottom: 10px;
}

.admin-content {
  display: grid;
  gap: 30px;
}

.admin-section {
  background-color: #f8f9fa;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.admin-section h2 {
  color: #1565c0;
  margin-bottom: 20px;
  font-size: 20px;
}

.admin-actions,
.quick-actions {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.logs-container {
  max-height: 400px;
  overflow-y: auto;
  background-color: white;
  border-radius: 5px;
  padding: 15px;
}

.log-entry {
  display: flex;
  gap: 15px;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}

.log-level {
  font-weight: 600;
  min-width: 60px;
  padding: 2px 8px;
  border-radius: 3px;
  text-transform: uppercase;
  font-size: 12px;
}

.log-level.info {
  background-color: #e3f2fd;
  color: #1565c0;
}

.log-level.error {
  background-color: #ffebee;
  color: #c62828;
}

.log-level.warning {
  background-color: #fff3e0;
  color: #f57c00;
}

.log-message {
  flex: 1;
}

.log-time {
  color: #666;
  font-size: 12px;
  min-width: 120px;
}

@media screen and (max-width: 768px) {
  .admin-actions,
  .quick-actions {
    flex-direction: column;
  }

  .log-entry {
    flex-direction: column;
    gap: 5px;
  }

  .log-time {
    min-width: auto;
  }
}
</style> 