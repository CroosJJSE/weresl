import { 
  doc, 
  getDoc, 
  getDocs, 
  collection, 
  query, 
  where, 
  updateDoc,
  deleteDoc,
  serverTimestamp,
  setDoc
} from 'firebase/firestore'
import { db } from '../firebase/index.js'
import { 
  RootCollection, 
  SearchElementDoc, 
  ProfileField, 
  RF_LOAN_FIELD, 
  GRANT_FIELD,
  RF_RETURN_RECORD_FIELD 
} from '../enums/db.js'
import { 
  getProfileByRegId, 
  getRFLoans, 
  getGrantLoans, 
  updateLoan as updateLoanUtil,
  getPendingLoans as getPendingLoansUtil,
  generateLoanId
} from '../utils/dbUtils.js'
import { convertGoogleDriveUrl } from '../utils/driveUtils.js'
import { getDistrictName } from '../enums/districts.js'

export const adminDbService = {
  // Get pending loans from SearchElements/pending-loan
  async getPendingLoans() {
    try {
      console.log('🔄 Getting pending loans using utils...')
      const pendingResult = await getPendingLoansUtil()
      
      if (!pendingResult.success) {
        console.error('❌ Failed to get pending loans:', pendingResult.message)
        return []
      }
      
      const pendingLoans = pendingResult.data
      console.log('📋 Found pending loans:', pendingLoans)
      
      const loanPromises = pendingLoans.map(async (pendingLoan) => {
        const regId = pendingLoan.regId
        const loanId = pendingLoan.loanId
        const loanType = pendingLoan.loanType || 'RF'
        try {
          // Get profile data using utils
          const profileResult = await getProfileByRegId(regId)
          
          if (!profileResult.success || !profileResult.data) {
            console.log('⚠️ Profile not found for RegID:', regId)
            return null
          }
          
          const profileData = profileResult.data
          
          // Get the specific loan using the loanId from pending data
          const collectionName = loanType === 'RF' ? ProfileField.RF_LOANS : ProfileField.GRANT
          const loanRef = doc(db, RootCollection.PROFILES, regId, collectionName, loanId)
          const loanDoc = await getDoc(loanRef)
          
          if (!loanDoc.exists()) {
            console.log('⚠️ Loan not found for RegID:', regId, 'LoanID:', loanId)
            return null
          }
          
          const latestLoan = { id: loanDoc.id, ...loanDoc.data() }
          
          if (latestLoan) {
                         console.log('📋 Loan data for', regId, ':', {
               name: profileData.fullName || profileData.Name || 'Unknown',
               district: profileData.district || profileData.District,
               profilePicture: profileData.profileImageDriveId || profileData.Image || profileData.profilePicture,
               loanType,
               amount: latestLoan.amount || latestLoan.loanAmount || 0,
               source: latestLoan.source || latestLoan.loanSource || ''
             })
            
            // Calculate age from yearOfBirth
            const currentYear = new Date().getFullYear()
            const age = profileData.yearOfBirth ? currentYear - profileData.yearOfBirth : 'Unknown'
            
            // Convert profile image using utils
            const profileImageUrl = profileData.profileImageDriveId ? 
              convertGoogleDriveUrl(profileData.profileImageDriveId) : 
              (profileData.Image || profileData.profilePicture)
            
                         // District is already stored as full name (e.g., "Mannar"), no need for mapping
             const districtName = profileData.district || profileData.District || 'Unknown'
             console.log('🗺️ District value:', districtName)
             
             return {
               regId,
               name: profileData.fullName || profileData.Name || 'Unknown',
               district: districtName,
               profilePicture: profileImageUrl,
               contact: profileData.phoneNumber || profileData.contact || 'Not provided',
               age: age,
               loanType,
               amount: latestLoan.amount || latestLoan.loanAmount || 0,
               purpose: latestLoan.purpose || latestLoan.loanPurpose || 'No purpose specified',
               source: latestLoan.source || latestLoan.loanSource || '',
               createdAt: latestLoan.createdAt,
               loanId
             }
          }
        } catch (error) {
          console.error(`Error loading loan for RegID ${regId}:`, error)
        }
        return null
      })
      
      const results = await Promise.all(loanPromises)
      return results.filter(loan => loan !== null)
    } catch (error) {
      console.error('Error getting pending loans:', error)
      throw error
    }
  },

  // Approve loan and remove from pending
  async approveLoan(regId, loanType, loanId) {
    try {
      console.log('🔄 Approving loan:', regId, loanType, loanId)
      
      // First, update the loan status to active
      const updateData = {
        status: 'active',
        approvedAt: serverTimestamp(),
        lastUpdated: serverTimestamp()
      }
      
      const updateResult = await updateLoanUtil(regId, loanId, updateData, loanType)
      
      if (!updateResult.success) {
        throw new Error(updateResult.message || 'Failed to update loan')
      }
      
      console.log('✅ Loan status updated to active:', regId, loanId)
      
      // Then, remove from pending loans
      const pendingLoanRef = doc(db, RootCollection.SEARCH_ELEMENTS, SearchElementDoc.PENDING_LOAN)
      const pendingLoanDoc = await getDoc(pendingLoanRef)
      
      if (pendingLoanDoc.exists()) {
        const pendingData = pendingLoanDoc.data()
        
        // Find and remove the specific loan entry
        // The structure is: { loanId: { regId, loanId, loanType, ... } }
        let foundAndRemoved = false
        for (const [key, loanData] of Object.entries(pendingData)) {
          if (loanData.regId === regId && loanData.loanId === loanId) {
            delete pendingData[key]
            foundAndRemoved = true
            console.log('✅ Removed specific loan from pending list:', regId, loanId)
            break
          }
        }
        
        if (!foundAndRemoved) {
          // Fallback: remove by regId if specific loan not found
          delete pendingData[regId]
          console.log('✅ Removed regId from pending list (fallback):', regId)
        }
        
        await setDoc(pendingLoanRef, pendingData)
      }
      
      console.log('✅ Loan approved successfully:', regId, loanId)
      return { success: true }
    } catch (error) {
      console.error('Error approving loan:', error)
      throw error
    }
  },

  // Update loan details
  async updateLoan(regId, loanType, loanId, updateData) {
    try {
      console.log('🔄 Updating loan:', regId, loanType, loanId, updateData)
      
      // If amount is being updated, also update currentBalance for RF loans
      const finalUpdateData = { ...updateData }
      if (loanType === 'RF' && updateData.amount !== undefined) {
        finalUpdateData.currentBalance = updateData.amount
        console.log('💰 Updating both amount and currentBalance to:', updateData.amount)
      }
      
      const updateResult = await updateLoanUtil(regId, loanId, finalUpdateData, loanType)
      
      if (!updateResult.success) {
        throw new Error(updateResult.message || 'Failed to update loan')
      }
      
      console.log('✅ Loan updated successfully')
      return { success: true }
    } catch (error) {
      console.error('❌ Error updating loan:', error)
      throw error
    }
  },

  // Get pending payments from RF_return_record collection
  async getPendingPayments() {
    try {
      console.log('🔄 Loading pending payments from RF_return_record...')
      const paymentsQuery = query(collection(db, RootCollection.RF_RETURN_RECORD))
      const paymentsSnapshot = await getDocs(paymentsQuery)
      
      const pendingPayments = []
      
      for (const paymentDoc of paymentsSnapshot.docs) {
        const paymentData = paymentDoc.data()
        
        // Only process pending payments
        if (paymentData.status === 'pending') {
          console.log('📋 Processing payment:', paymentData.regId, 'Amount:', paymentData.amount)
          
          try {
            // Get profile data using utils
            const profileResult = await getProfileByRegId(paymentData.regId)
            
            if (profileResult.success && profileResult.data) {
              const profileData = profileResult.data
              
              // Calculate age from yearOfBirth
              const currentYear = new Date().getFullYear()
              const age = profileData.yearOfBirth ? currentYear - profileData.yearOfBirth : 'Unknown'
              
              // Get active RF loans for this profile using utils
              const rfLoansResult = await getRFLoans(paymentData.regId)
              
              const activeLoans = rfLoansResult.success && rfLoansResult.data ? 
                rfLoansResult.data
                  .filter(loan => loan.status === 'active')
                  .sort((a, b) => a.createdAt?.toDate() - b.createdAt?.toDate()) : []
              
              console.log('💰 Active loans for', paymentData.regId, ':', activeLoans.length)
              
              // Convert receipt image using utils
              const receiptUrl = paymentData.receiptDriveLinkId ? 
                convertGoogleDriveUrl(paymentData.receiptDriveLinkId) : 
                paymentData.driveLink
              
                             pendingPayments.push({
                 id: paymentDoc.id,
                 regId: paymentData.regId,
                 name: profileData.fullName || profileData.Name || 'Unknown',
                 district: profileData.district || profileData.District || 'Unknown',
                profilePicture: profileData.profileImageDriveId ? 
                  convertGoogleDriveUrl(profileData.profileImageDriveId) : 
                  (profileData.Image || profileData.profilePicture),
                contact: profileData.phoneNumber || profileData.contact || 'Not provided',
                age: age,
                amount: paymentData.amount,
                driveLink: receiptUrl,
                receiver: paymentData.receiver,
                totalBalance: paymentData.totalBalance,
                createdAt: paymentData.createdAt,
                timestamp: paymentData.timestamp,
                activeLoans: activeLoans
              })
            }
          } catch (error) {
            console.error('❌ Error processing payment for', paymentData.regId, ':', error)
          }
        }
      }
      
      console.log('✅ Loaded pending payments:', pendingPayments.length)
      return pendingPayments
    } catch (error) {
      console.error('❌ Error getting pending payments:', error)
      throw error
    }
  },

  // Approve payment and update loan balances
  async approvePayment(paymentId) {
    try {
      console.log('🔄 Approving payment:', paymentId)
      
      // Get the payment data
      const paymentRef = doc(db, RootCollection.RF_RETURN_RECORD, paymentId)
      const paymentDoc = await getDoc(paymentRef)
      
      if (!paymentDoc.exists()) {
        throw new Error('Payment not found')
      }
      
      const paymentData = paymentDoc.data()
      console.log('📋 Payment data:', paymentData)
      
      // Get active RF loans for this profile using utils
      const rfLoansResult = await getRFLoans(paymentData.regId)
      
      if (!rfLoansResult.success) {
        throw new Error('Failed to get RF loans')
      }
      
      const activeLoans = rfLoansResult.data
        .filter(loan => loan.status === 'active')
        .sort((a, b) => a.createdAt?.toDate() - b.createdAt?.toDate()) // Sort by creation date (oldest first)
      
      console.log('💰 Active loans to process:', activeLoans.length)
      
      let remainingAmount = paymentData.amount
      
      // Process each active loan in order (oldest first)
      for (const loan of activeLoans) {
        console.log('🔄 Processing loan:', loan.id, 'Current balance:', loan.currentBalance, 'Remaining amount:', remainingAmount)
        
        if (remainingAmount <= 0) break
        
        const loanRef = doc(db, RootCollection.PROFILES, paymentData.regId, ProfileField.RF_LOANS, loan.id)
        
        if (remainingAmount >= loan.currentBalance) {
          // Pay off this loan completely
          const amountToDeduct = loan.currentBalance
          remainingAmount -= amountToDeduct
          
          console.log('✅ Paying off loan completely:', loan.id, 'Amount:', amountToDeduct)
          
          await updateDoc(loanRef, {
            currentBalance: 0,
            status: 'completed',
            lastUpdated: serverTimestamp()
          })
        } else {
          // Partial payment
          console.log('✅ Partial payment for loan:', loan.id, 'Amount:', remainingAmount)
          
          await updateDoc(loanRef, {
            currentBalance: loan.currentBalance - remainingAmount,
            lastUpdated: serverTimestamp()
          })
          
          remainingAmount = 0
        }
      }
      
      // Update payment status to approved
      await updateDoc(paymentRef, {
        status: 'approved',
        approvedAt: serverTimestamp(),
        lastUpdated: serverTimestamp()
      })
      
      console.log('✅ Payment approved successfully. Remaining amount:', remainingAmount)
      return { success: true }
    } catch (error) {
      console.error('❌ Error approving payment:', error)
      throw error
    }
  },

  // Get profile by RegID using utils
  async getProfileByRegId(regId) {
    try {
      const profileResult = await getProfileByRegId(regId)
      return profileResult.success ? profileResult.data : null
    } catch (error) {
      console.error('Error getting profile by RegID:', error)
      throw error
    }
  },

  // Get all profiles (for search functionality)
  async getAllProfiles() {
    try {
      const profilesQuery = query(collection(db, RootCollection.PROFILES))
      const querySnapshot = await getDocs(profilesQuery)
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    } catch (error) {
      console.error('Error getting all profiles:', error)
      throw error
    }
  },

  // Search profiles by name or RegID
  async searchProfiles(searchTerm) {
    try {
      const profiles = await this.getAllProfiles()
      
      return profiles.filter(profile => {
        const name = (profile.fullName || profile.Name || profile.name || '').toLowerCase()
        const regId = (profile.Reg_ID || profile.regId || '').toLowerCase()
        const search = searchTerm.toLowerCase()
        
        return name.includes(search) || regId.includes(search)
      })
    } catch (error) {
      console.error('Error searching profiles:', error)
      throw error
    }
  },

  // Get available sources from BANK_ACCOUNTS collection
  async getAvailableSources() {
    try {
      console.log('🔄 Getting available sources from BANK_ACCOUNTS collection...')
      const sourcesQuery = query(collection(db, RootCollection.BANK_ACCOUNTS))
      const sourcesSnapshot = await getDocs(sourcesQuery)
      
      const sources = sourcesSnapshot.docs.map(doc => doc.id)
      console.log('✅ Available sources:', sources)
      
      return sources
    } catch (error) {
      console.error('❌ Error getting available sources:', error)
      return []
    }
  },

  // Generate new loan ID
  async generateNewLoanId(regId, loanType = 'RF') {
    try {
      console.log('🔄 Generating new loan ID for:', regId, loanType)
      const loanId = await generateLoanId(regId, loanType)
      console.log('✅ Generated loan ID:', loanId)
      return loanId
    } catch (error) {
      console.error('❌ Error generating loan ID:', error)
      throw error
    }
  }
}

export default adminDbService 