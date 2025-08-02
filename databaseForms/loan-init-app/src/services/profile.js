import { dbOperations } from '@/firebase/db.js'
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
  async getProfile(Reg_ID) {
    try {
      const profile = await dbOperations.getProfileByRegId(Reg_ID)
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
      console.log('📝 Starting profile creation...')
      
      // Generate RegID if not provided
      if (!profileData.Reg_ID) {
        console.log('🔧 Generating RegID...')
        profileData.Reg_ID = await dbOperations.generateRegID(profileData.District || profileData.basicInfo?.District)
        console.log('✅ Generated RegID:', profileData.Reg_ID)
      }

      // Process image if provided
      if (profileData.imageFile) {
        console.log('📤 Processing image upload...')
        const imageUrl = await storageOperations.uploadImage(profileData.imageFile, profileData.Reg_ID)
        profileData.Image = imageUrl // Use "Image" field Name
        delete profileData.imageFile // Remove the file object, keep only the URL
        console.log('✅ Image processed and stored:', imageUrl)
      }

      console.log('📝 Creating profile with final data:', profileData)
      const Reg_ID = await dbOperations.createProfile(profileData)
      console.log('✅ Profile created successfully with RegID:', Reg_ID)
      
      // Log operation
      await dbOperations.logOperation('CREATE_PROFILE', {
        Reg_ID,
        basicInfo: profileData.basicInfo
      })

      return Reg_ID
    } catch (error) {
      console.error('❌ Error creating profile:', error)
      throw error
    }
  },

  // Update profile
  async updateProfile(Reg_ID, updates) {
    try {
      // Process image if provided
      if (updates.imageFile) {
        const imageUrl = await storageOperations.uploadImage(updates.imageFile, Reg_ID)
        updates.imageUrl = imageUrl
        delete updates.imageFile
      }

      await dbOperations.updateProfile(Reg_ID, updates)
      
      // Log operation
      await dbOperations.logOperation('UPDATE_PROFILE', {
        Reg_ID,
        updates
      })

      return Reg_ID
    } catch (error) {
      console.error('Error updating profile:', error)
      throw error
    }
  },

  // Add loan to profile
  async addLoan(Reg_ID, loanData, loanType = 'RF') {
    try {
      const loan = await dbOperations.addLoan(Reg_ID, loanData, loanType)
      
      // Log operation
      await dbOperations.logOperation('ADD_LOAN', {
        Reg_ID,
        loan,
        loanType
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
        Reg_ID: paymentData.Reg_ID,
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
    
    return types
  },

  // Validate profile data
  validateProfileData(profileData) {
    const errors = []
    
    if (!profileData.basicInfo?.Name) {
      errors.push('Name is required')
    }
    
    if (!profileData.basicInfo?.NIC) {
      errors.push('NIC is required')
    }
    
    if (!profileData.basicInfo?.contact) {
      errors.push('Contact number is required')
    }
    
    if (!profileData.basicInfo?.District) {
      errors.push('District is required')
    }
    
    if (!profileData.basicInfo?.Address) {
      errors.push('Address is required')
    }
    
    if (!profileData.basicInfo?.age || profileData.basicInfo.age < 0) {
      errors.push('Valid age is required')
    }
    
    if (!profileData.basicInfo?.totalChildren || profileData.basicInfo.totalChildren < 0) {
      errors.push('Total children is required')
    }
    
    if (!profileData.basicInfo?.schoolKids || profileData.basicInfo.schoolKids < 0) {
      errors.push('School-going children is required')
    }
    
    return errors
  },

  // Validate loan data
  validateLoanData(loanData) {
    const errors = []
    
    if (!loanData.type || !['RF', 'GRANT'].includes(loanData.type)) {
      errors.push('Valid loan type is required (RF or GRANT)')
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
    
    if (!paymentData.Reg_ID) {
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