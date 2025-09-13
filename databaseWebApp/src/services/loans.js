import { dbOperations } from '@/firebase/db.js'
import { RootCollection, LOAN_FIELD, BANK_ACCOUNT_FIELD } from '@/enums/db.js'
import { getAllCoordinators } from '@/utils/dbUtils.js'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import { db } from '@/firebase/index.js'

export const loansService = {
  // Get all loans with filtering
  async getLoans(filters = {}) {
    try {
      console.log('🔍 Getting loans with filters:', filters)
      const loans = await this.getLoansFromDatabase(filters)
      console.log(`✅ Found ${loans.length} loans`)
      return loans
    } catch (error) {
      console.error('❌ Error getting loans:', error)
      throw error
    }
  },

  // Get loans from database with filters - using dedicated loans collection
  async getLoansFromDatabase(filters = {}) {
    try {
      console.log('📊 Getting loans from dedicated loans collection with filters:', filters)
      
      // Get all loans without any where clauses to avoid index requirements
      let q = collection(db, RootCollection.LOANS)
      
      // Only add ordering by approved date (this alone doesn't require composite index)
      q = query(q, orderBy(LOAN_FIELD.APPROVED_AT, 'desc'))
      
      const snapshot = await getDocs(q)
      let loans = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      
      console.log(`Found ${loans.length} loans from database`)
      
      // Debug: Log the first loan to see its structure
      if (loans.length > 0) {
        console.log('First loan structure:', loans[0])
        console.log('Available fields:', Object.keys(loans[0]))
      }
      
      // Apply all filters after fetching (client-side filtering)
      
      // Type filter
      if (filters.type) {
        loans = loans.filter(loan => {
          const type = loan[LOAN_FIELD.TYPE] || loan.type
          return type === filters.type
        })
        console.log(`After type filter (${filters.type}): ${loans.length} loans`)
      }
      
      // Status filter
      if (filters.status) {
        loans = loans.filter(loan => {
          const status = loan[LOAN_FIELD.STATUS] || loan.status
          return status === filters.status
        })
        console.log(`After status filter (${filters.status}): ${loans.length} loans`)
      }
      
      // Coordinator filter
      if (filters.coordinator) {
        loans = loans.filter(loan => {
          const source = loan[LOAN_FIELD.SOURCE] || loan.source
          return source === filters.coordinator
        })
        console.log(`After coordinator filter (${filters.coordinator}): ${loans.length} loans`)
      }
      
      // ARMS filter
      if (filters.arms) {
        loans = loans.filter(loan => {
          const arms = loan[LOAN_FIELD.ARMS] || loan.arms
          return arms === filters.arms
        })
        console.log(`After ARMS filter (${filters.arms}): ${loans.length} loans`)
      }
      
      // Year filter
      if (filters.year) {
        const targetYear = parseInt(filters.year)
        loans = loans.filter(loan => {
          const approvedAt = loan[LOAN_FIELD.APPROVED_AT]
          if (!approvedAt) return false
          
          let approvedYear
          
          // Handle Firestore timestamp
          if (approvedAt && typeof approvedAt === 'object' && approvedAt.seconds) {
            approvedYear = new Date(approvedAt.seconds * 1000).getFullYear()
          }
          // Handle regular Date object
          else if (approvedAt instanceof Date) {
            approvedYear = approvedAt.getFullYear()
          }
          // Handle string or number
          else if (typeof approvedAt === 'string' || typeof approvedAt === 'number') {
            approvedYear = new Date(approvedAt).getFullYear()
          }
          // Handle Firestore timestamp with toDate method
          else if (approvedAt && typeof approvedAt === 'object' && approvedAt.toDate) {
            approvedYear = approvedAt.toDate().getFullYear()
          }
          else {
            return false
          }
          
          return approvedYear === targetYear
        })
        console.log(`After year filter (${targetYear}): ${loans.length} loans`)
      }
      
      return loans
      
    } catch (error) {
      console.error('❌ Error getting loans from database:', error)
      throw error
    }
  },

  // Get all coordinators from bank accounts
  async getCoordinators() {
    try {
      console.log('🔍 Getting coordinators from bank accounts')
      
      const coordinatorsResult = await getAllCoordinators()
      if (!coordinatorsResult.success) {
        console.error('Failed to get coordinators:', coordinatorsResult.message)
        return []
      }
      
      // Filter to only show coordinators and treasurers
      const coordinators = coordinatorsResult.data.filter(coord => 
        coord.position === 'Coordinator' || coord.position === 'Treasurer'
      )
      
      return coordinators
      
    } catch (error) {
      console.error('❌ Error getting coordinators:', error)
      throw error
    }
  },

  // Get loans by specific criteria
  async getLoansByType(loanType) {
    try {
      console.log(`🔍 Getting loans by type: ${loanType}`)
      const loans = await this.getLoansFromDatabase({ type: loanType })
      return loans
    } catch (error) {
      console.error('❌ Error getting loans by type:', error)
      throw error
    }
  },

  // Get loans by status
  async getLoansByStatus(status) {
    try {
      console.log(`🔍 Getting loans by status: ${status}`)
      const loans = await this.getLoansFromDatabase({ status })
      return loans
    } catch (error) {
      console.error('❌ Error getting loans by status:', error)
      throw error
    }
  },

  // Get loans by coordinator
  async getLoansByCoordinator(coordinatorId) {
    try {
      console.log(`🔍 Getting loans by coordinator: ${coordinatorId}`)
      const loans = await this.getLoansFromDatabase({ coordinator: coordinatorId })
      return loans
    } catch (error) {
      console.error('❌ Error getting loans by coordinator:', error)
      throw error
    }
  },

  // Get loans by ARMS
  async getLoansByArms(arms) {
    try {
      console.log(`🔍 Getting loans by ARMS: ${arms}`)
      const loans = await this.getLoansFromDatabase({ arms })
      return loans
    } catch (error) {
      console.error('❌ Error getting loans by ARMS:', error)
      throw error
    }
  },

  // Get loans by year
  async getLoansByYear(year) {
    try {
      console.log(`🔍 Getting loans by year: ${year}`)
      const loans = await this.getLoansFromDatabase({ year })
      return loans
    } catch (error) {
      console.error('❌ Error getting loans by year:', error)
      throw error
    }
  },

  // Search loans by text
  async searchLoans(searchText) {
    try {
      console.log(`🔍 Searching loans by text: ${searchText}`)
      const allLoans = await this.getLoansFromDatabase({})
      
      if (!searchText.trim()) {
        return allLoans
      }
      
      const query = searchText.toLowerCase().trim()
      const searchResults = allLoans.filter(loan => {
        const regId = loan[LOAN_FIELD.REG_ID] || ''
        const loanId = loan[LOAN_FIELD.LOAN_ID] || ''
        const projectDescription = ''
        const purpose = loan[LOAN_FIELD.PURPOSE] || ''
        
        return regId.toLowerCase().includes(query) ||
               loanId.toLowerCase().includes(query) ||
               projectDescription.toLowerCase().includes(query) ||
               purpose.toLowerCase().includes(query)
      })
      
      console.log(`Found ${searchResults.length} loans matching "${searchText}"`)
      return searchResults
      
    } catch (error) {
      console.error('❌ Error searching loans:', error)
      throw error
    }
  }
}
