import { collection, getDocs, query, orderBy, where } from 'firebase/firestore'
import { db } from '@/firebase/index.js'
import { RootCollection, RF_RETURN_RECORD_FIELD } from '@/enums/db.js'

export const rfReturnsService = {
  // Get all RF returns with filtering
  async getRFReturns(filters = {}) {
    try {
      console.log('🔍 Getting RF returns with filters:', filters)
      const returns = await this.getRFReturnsFromDatabase(filters)
      console.log(`✅ Found ${returns.length} RF returns`)
      return returns
    } catch (error) {
      console.error('❌ Error getting RF returns:', error)
      throw error
    }
  },

  // Get RF returns from database with filters
  async getRFReturnsFromDatabase(filters = {}) {
    try {
      console.log('📊 Getting RF returns from RF_return_record collection with filters:', filters)
      console.log('📊 Collection name:', RootCollection.RF_RETURN_RECORD)
      
      // Get all RF returns without any where clauses to avoid index requirements
      let q = collection(db, RootCollection.RF_RETURN_RECORD)
      
      // Remove orderBy to avoid index requirements - we'll sort client-side
      const snapshot = await getDocs(q)
      console.log('📊 Snapshot size:', snapshot.size)
      console.log('📊 Snapshot empty:', snapshot.empty)
      
      let returns = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      
      console.log(`Found ${returns.length} RF returns from database`)
      
      // Debug: Log the first return to see its structure
      if (returns.length > 0) {
        console.log('First RF return structure:', returns[0])
        console.log('Available fields:', Object.keys(returns[0]))
      }
      
      // Sort by timestamp descending (client-side)
      returns = returns.sort((a, b) => {
        const timestampA = a[RF_RETURN_RECORD_FIELD.TIMESTAMP]
        const timestampB = b[RF_RETURN_RECORD_FIELD.TIMESTAMP]
        
        if (!timestampA && !timestampB) return 0
        if (!timestampA) return 1
        if (!timestampB) return -1
        
        const dateA = timestampA.toDate ? timestampA.toDate() : new Date(timestampA)
        const dateB = timestampB.toDate ? timestampB.toDate() : new Date(timestampB)
        
        return dateB - dateA
      })
      
      // Apply all filters after fetching (client-side filtering)
      
      // Search filter (partial match on RRH_ID or regId)
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        returns = returns.filter(rfReturn => {
          const rrhId = (rfReturn[RF_RETURN_RECORD_FIELD.RRH_ID] || '').toLowerCase()
          const regId = (rfReturn[RF_RETURN_RECORD_FIELD.REG_ID] || '').toLowerCase()
          return rrhId.includes(searchTerm) || regId.includes(searchTerm)
        })
      }
      
      // Year filter
      if (filters.year) {
        returns = returns.filter(rfReturn => {
          // Try multiple date fields (same logic as getAvailableYears)
          let date = null
          
          // Try approvedDate first (new format)
          if (rfReturn.approvedDate) {
            date = new Date(rfReturn.approvedDate)
          }
          // Try timestamp field (legacy format)
          else if (rfReturn[RF_RETURN_RECORD_FIELD.TIMESTAMP]) {
            const timestamp = rfReturn[RF_RETURN_RECORD_FIELD.TIMESTAMP]
            date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
          }
          // Try createdAt field
          else if (rfReturn.createdAt) {
            const timestamp = rfReturn.createdAt
            date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
          }
          
          if (!date || isNaN(date.getTime())) return false
          return date.getFullYear() === parseInt(filters.year)
        })
      }
      
      // Month filter (only if year is selected)
      if (filters.month && filters.year) {
        returns = returns.filter(rfReturn => {
          // Try multiple date fields (same logic as getAvailableYears)
          let date = null
          
          // Try approvedDate first (new format)
          if (rfReturn.approvedDate) {
            date = new Date(rfReturn.approvedDate)
          }
          // Try timestamp field (legacy format)
          else if (rfReturn[RF_RETURN_RECORD_FIELD.TIMESTAMP]) {
            const timestamp = rfReturn[RF_RETURN_RECORD_FIELD.TIMESTAMP]
            date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
          }
          // Try createdAt field
          else if (rfReturn.createdAt) {
            const timestamp = rfReturn.createdAt
            date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
          }
          
          if (!date || isNaN(date.getTime())) return false
          return date.getMonth() === parseInt(filters.month) - 1 // Month is 0-indexed
        })
      }
      
      // Receiver filter
      if (filters.receiver) {
        returns = returns.filter(rfReturn => {
          const receiver = (rfReturn[RF_RETURN_RECORD_FIELD.RECEIVER] || '').toLowerCase()
          return receiver.includes(filters.receiver.toLowerCase())
        })
      }
      
      console.log(`After filtering: ${returns.length} RF returns`)
      return returns
    } catch (error) {
      console.error('❌ Error getting RF returns from database:', error)
      throw error
    }
  },

  // Get unique years from RF returns
  async getAvailableYears() {
    try {
      const returns = await this.getRFReturnsFromDatabase()
      const years = new Set()
      
      returns.forEach(rfReturn => {
        // Try multiple date fields
        let date = null
        
        // Try approvedDate first (new format)
        if (rfReturn.approvedDate) {
          date = new Date(rfReturn.approvedDate)
        }
        // Try timestamp field (legacy format)
        else if (rfReturn[RF_RETURN_RECORD_FIELD.TIMESTAMP]) {
          const timestamp = rfReturn[RF_RETURN_RECORD_FIELD.TIMESTAMP]
          date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
        }
        // Try createdAt field
        else if (rfReturn.createdAt) {
          const timestamp = rfReturn.createdAt
          date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
        }
        
        if (date && !isNaN(date.getTime())) {
          years.add(date.getFullYear())
        }
      })
      
      console.log('Available years found:', Array.from(years))
      return Array.from(years).sort((a, b) => b - a) // Sort descending
    } catch (error) {
      console.error('❌ Error getting available years:', error)
      return []
    }
  },

  // Get unique receivers from RF returns
  async getAvailableReceivers() {
    try {
      const returns = await this.getRFReturnsFromDatabase()
      const receivers = new Set()
      
      returns.forEach(rfReturn => {
        // Try multiple receiver fields
        const receiver = rfReturn.receiver || rfReturn[RF_RETURN_RECORD_FIELD.RECEIVER]
        if (receiver) {
          receivers.add(receiver)
        }
      })
      
      console.log('Available receivers found:', Array.from(receivers))
      return Array.from(receivers).sort()
    } catch (error) {
      console.error('❌ Error getting available receivers:', error)
      return []
    }
  },

  // Get RF return by ID
  async getRFReturnById(returnId) {
    try {
      const returns = await this.getRFReturnsFromDatabase()
      return returns.find(rfReturn => rfReturn.id === returnId)
    } catch (error) {
      console.error('❌ Error getting RF return by ID:', error)
      throw error
    }
  },

  // Get RF returns for a specific profile
  async getRFReturnsForProfile(regId) {
    try {
      const returns = await this.getRFReturnsFromDatabase()
      return returns.filter(rfReturn => 
        rfReturn[RF_RETURN_RECORD_FIELD.REG_ID] === regId
      )
    } catch (error) {
      console.error('❌ Error getting RF returns for profile:', error)
      throw error
    }
  }
}
