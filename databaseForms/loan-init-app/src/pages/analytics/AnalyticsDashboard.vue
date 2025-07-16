<template>
  <div class="analytics-container">
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">{{ analytics.stats?.totalProfiles || 0 }}</div>
        <div class="stat-label">Total Profiles</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ analytics.stats?.totalLoans || 0 }}</div>
        <div class="stat-label">Total Loans</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">Rs. {{ formatAmount(analytics.stats?.totalAmount || 0) }}</div>
        <div class="stat-label">Total Amount</div>
      </div>
    </div>

    <div class="charts-grid">
      <div class="chart-card">
        <div class="chart-title">
          <span class="chart-icon">📊</span>
          District Distribution
        </div>
        <div class="district-chart">
          <div 
            v-for="(count, district) in analytics.districtStats" 
            :key="district"
            class="district-item"
          >
            <div class="district-label">
              <span>{{ district }}</span>
              <span>{{ count }}</span>
            </div>
            <div class="district-bar">
              <div 
                class="district-fill"
                :style="{ width: getDistrictPercentage(count) + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div class="chart-card">
        <div class="chart-title">
          <span class="chart-icon">📈</span>
          Yearly Growth
        </div>
        <div class="year-chart">
          <div 
            v-for="(count, year) in analytics.yearStats" 
            :key="year"
            class="year-item"
          >
            <div 
              class="year-bar"
              :style="{ height: getYearBarHeight(count) + 'px' }"
            ></div>
            <div class="year-label">{{ year }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="detailed-stats">
      <h3>Detailed Statistics</h3>
      <div class="stats-table">
        <div class="stats-row header">
          <div>District</div>
          <div>Profiles</div>
          <div>Loans</div>
          <div>Grants</div>
          <div>Total Amount</div>
        </div>
        <div 
          v-for="(stats, district) in districtDetailedStats" 
          :key="district"
          class="stats-row"
        >
          <div>{{ district }}</div>
          <div>{{ stats.profiles }}</div>
          <div>{{ stats.loans }}</div>
          <div>{{ stats.grants }}</div>
          <div>Rs. {{ formatAmount(stats.totalAmount) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { dbOperations } from '@/firebase/db.js'

export default {
  name: 'AnalyticsDashboard',
  setup() {
    const analytics = ref({
      stats: {},
      districtStats: {},
      yearStats: {}
    })
    const loading = ref(false)
    const error = ref(null)

    const loadAnalytics = async () => {
      loading.value = true
      error.value = null
      
      try {
        analytics.value = await dbOperations.getAnalyticsData()
      } catch (err) {
        error.value = 'Failed to load analytics: ' + err.message
      } finally {
        loading.value = false
      }
    }

    const formatAmount = (amount) => {
      if (!amount) return '0'
      return new Intl.NumberFormat('en-IN').format(amount)
    }

    const getDistrictPercentage = (count) => {
      const total = Object.values(analytics.value.districtStats || {}).reduce((sum, val) => sum + val, 0)
      if (total === 0) return 0
      return Math.round((count / total) * 100)
    }

    const getYearBarHeight = (count) => {
      const maxCount = Math.max(...Object.values(analytics.value.yearStats || {}))
      if (maxCount === 0) return 0
      return Math.round((count / maxCount) * 150) + 20
    }

    const districtDetailedStats = computed(() => {
      // This would be calculated from the actual data
      // For now, returning mock data
      return {
        'Colombo': { profiles: 25, loans: 30, grants: 5, totalAmount: 1500000 },
        'Gampaha': { profiles: 20, loans: 25, grants: 3, totalAmount: 1200000 },
        'Kandy': { profiles: 15, loans: 18, grants: 2, totalAmount: 900000 }
      }
    })

    onMounted(() => {
      loadAnalytics()
    })

    return {
      analytics,
      loading,
      error,
      formatAmount,
      getDistrictPercentage,
      getYearBarHeight,
      districtDetailedStats
    }
  }
}
</script>

<style scoped>
.analytics-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 30px;
}

.stat-card {
  background-color: #e3f2fd;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.stat-value {
  font-size: 32px;
  font-weight: 600;
  color: #1565c0;
}

.stat-label {
  color: #555;
  margin-top: 5px;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.chart-card {
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.chart-title {
  font-weight: 600;
  margin-bottom: 15px;
  color: #333;
  display: flex;
  align-items: center;
}

.chart-icon {
  margin-right: 8px;
  color: #1565c0;
}

.district-chart {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.district-item {
  margin-bottom: 10px;
}

.district-label {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 5px;
}

.district-bar {
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
}

.district-fill {
  height: 100%;
  background-color: #1565c0;
  border-radius: 10px;
  transition: width 0.3s ease;
}

.year-chart {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 200px;
  padding-top: 20px;
}

.year-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.year-bar {
  background-color: #1976d2;
  border-radius: 4px 4px 0 0;
  width: 30px;
  transition: height 0.3s ease;
}

.year-bar:hover {
  background-color: #0d47a1;
}

.year-label {
  margin-top: 8px;
  text-align: center;
  font-size: 12px;
}

.detailed-stats {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
}

.detailed-stats h3 {
  color: #1565c0;
  margin-bottom: 15px;
}

.stats-table {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 2fr;
  gap: 10px;
  font-size: 14px;
}

.stats-row {
  display: contents;
}

.stats-row > div {
  padding: 10px;
  border-bottom: 1px solid #dee2e6;
}

.stats-row.header > div {
  font-weight: 600;
  background-color: #e3f2fd;
  color: #1565c0;
}

@media screen and (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .charts-grid {
    grid-template-columns: 1fr;
  }

  .stats-table {
    grid-template-columns: 1fr;
    font-size: 12px;
  }

  .stats-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
  }

  .stats-row.header {
    display: none;
  }
}
</style> 