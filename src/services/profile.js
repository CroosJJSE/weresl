import { dbOperations, utils } from '@/firebase/db.js'
import { storageOperations } from '@/firebase/storage.js'

export const profileService = {
  // Get all profiles with filtering
  async getProfiles(filters = {}) {
    try {
      const profiles = await dbOperations.getAllProfiles(filters)
      
      // Add computed properties
      return profiles.map(profile => ({
        ...profile,
        computed: this.computeProfileStats(profile)
      }))
    } catch (error) {
      console.error('Error getting profiles:', error)
      throw error
    }
  },

  // Get single profile
  async getProfile(regId) {
    try {
      const profile = await dbOperations.getProfileByRegId(regId)
      if (!profile) return null
      
      return {
        ...profile,
        computed: this.computeProfileStats(profile)
      }
    } catch (error) {
      console.error('Error getting profile:', error)
      throw error
    }
  },

  // Create new profile
  async createProfile(profileData) {
    try {
      // Generate RegID if not provided
      if (!profileData.regId) {
        const existingProfiles = await dbOperations.getAllProfiles()
        const existingIds = existingProfiles.map(p => p.id)
        profileData.regId = utils.generateRegId(profileData.basicInfo.district, existingIds)
      }

      // Process image if provided
      if (profileData.imageFile) {
        const imageUrl = await storageOperations.uploadImage(profileData.imageFile, profileData.regId)
        profileData.imageUrl = imageUrl
      }

      const regId = await dbOperations.createProfile(profileData)
      
      // Log operation
      await dbOperations.logOperation('CREATE_PROFILE', {
        regId,
        basicInfo: profileData.basicInfo
      })

      return regId
    } catch (error) {
      console.error('Error creating profile:', error)
      throw error
    }
  },

  // Update profile
  async updateProfile(regId, updates) {
    try {
      // Process image if provided
      if (updates.imageFile) {
        const imageUrl = await storageOperations.uploadImage(updates.imageFile, regId)
        updates.imageUrl = imageUrl
        delete updates.imageFile
      }

      await dbOperations.updateProfile(regId, updates)
      
      // Log operation
      await dbOperations.logOperation('UPDATE_PROFILE', {
        regId,
        updates
      })

      return regId
    } catch (error) {
      console.error('Error updating profile:', error)
      throw error
    }
  },

  // Add loan to profile
  async addLoan(regId, loanData) {
    try {
      const loan = await dbOperations.addLoan(regId, loanData)
      
      // Log operation
      await dbOperations.logOperation('ADD_LOAN', {
        regId,
        loan
      })

      return loan
    } catch (error) {
      console.error('Error adding loan:', error)
      throw error
    }
  },

  // Process payment
  async processPayment(paymentData) {
    try {
      const updatedProfile = await dbOperations.processPayment(paymentData)
      
      // Log operation
      await dbOperations.logOperation('PROCESS_PAYMENT', {
        regId: paymentData.regId,
        payment: paymentData
      })

      return updatedProfile
    } catch (error) {
      console.error('Error processing payment:', error)
      throw error
    }
  },

  // Compute profile statistics
  computeProfileStats(profile) {
    // Handle both old and new data structures
    const activeLoans = profile.loans?.filter(loan => loan.status === 'active') || []
    const completedLoans = profile.loans?.filter(loan => loan.status === 'completed') || []
    const grants = profile.grants || []
    const payments = profile.paymentHistory || []

    // Calculate loan amounts from RF_Loan field if available
    let totalLoanAmount = activeLoans.reduce((sum, loan) => sum + (loan.amount || 0), 0)
    if (profile.RF_Loan && !totalLoanAmount) {
      // Try to parse RF_Loan amount
      const rfAmount = parseFloat(profile.RF_Loan) || 0
      totalLoanAmount = rfAmount
    }

    // Calculate grant amounts from GRANT field if available
    let totalGrantAmount = grants.reduce((sum, grant) => sum + (grant.amount || 0), 0)
    if (profile.GRANT && !totalGrantAmount) {
      totalGrantAmount = parseFloat(profile.GRANT) || 0
    }

    // Calculate paid amounts from RF_Paid_History if available
    let totalPaidAmount = payments.reduce((sum, payment) => sum + (payment.amount || 0), 0)
    if (profile.RF_Paid_History && !totalPaidAmount) {
      // Try to parse RF_Paid_History amount
      const paidAmount = parseFloat(profile.RF_Paid_History) || 0
      totalPaidAmount = paidAmount
    }

    return {
      activeLoansCount: activeLoans.length || (profile.RF_Loan ? 1 : 0),
      completedLoansCount: completedLoans.length,
      grantsCount: grants.length || (profile.GRANT ? 1 : 0),
      totalLoanAmount,
      totalGrantAmount,
      totalPaidAmount,
      remainingLoanAmount: totalLoanAmount - totalPaidAmount,
      district: utils.getDistrictFromRegID(profile.id)
    }
  },

  // Get profile types for filtering
  getProfileTypes(profile) {
    const types = []
    
    // Check for RF loans (both new and old structure)
    if (profile.loans?.some(loan => loan.type === 'RF') || profile.RF_Loan) {
      types.push('RF')
    }
    
    // Check for grants (both new and old structure)
    if (profile.grants?.length > 0 || profile.GRANT) {
      types.push('GRANT')
    }
    
    // Check for GIF loans (both new and old structure)
    if (profile.loans?.some(loan => loan.type === 'GIF') || profile.GIFor) {
      types.push('GIF')
    }
    
    return types
  },

  // Validate profile data
  validateProfileData(profileData) {
    const errors = []
    
    if (!profileData.basicInfo?.name) {
      errors.push('Name is required')
    }
    
    if (!profileData.basicInfo?.district) {
      errors.push('District is required')
    }
    
    if (!profileData.basicInfo?.age || profileData.basicInfo.age < 0) {
      errors.push('Valid age is required')
    }
    
    return errors
  },

  // Validate loan data
  validateLoanData(loanData) {
    const errors = []
    
    if (!loanData.type || !['RF', 'GRANT', 'GIF'].includes(loanData.type)) {
      errors.push('Valid loan type is required')
    }
    
    if (!loanData.amount || loanData.amount <= 0) {
      errors.push('Valid amount is required')
    }
    
    if (!loanData.purpose) {
      errors.push('Purpose is required')
    }
    
    return errors
  },

  // Validate payment data
  validatePaymentData(paymentData) {
    const errors = []
    
    if (!paymentData.regId) {
      errors.push('RegID is required')
    }
    
    if (!paymentData.type || !['RF', 'GRANT'].includes(paymentData.type)) {
      errors.push('Valid payment type is required')
    }
    
    if (paymentData.type === 'RF' && (!paymentData.amount || paymentData.amount <= 0)) {
      errors.push('Valid amount is required for RF payments')
    }
    
    if (paymentData.type === 'GRANT' && !paymentData.details) {
      errors.push('Details are required for GRANT payments')
    }
    
    return errors
  }
}

export default profileService 