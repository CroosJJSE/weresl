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
  setDoc,
  writeBatch
} from 'firebase/firestore'
import { db } from '../firebase/index.js'
import { 
  RootCollection, 
  SearchElementDoc, 
  ProfileField, 
  RF_LOAN_FIELD, 
  GRANT_FIELD,
  RF_RETURN_RECORD_FIELD,
  GIF_RETURN_RECORD_FIELD,
  BANK_ACCOUNT_FIELDS
} from '../enums/db.js'
import { 
  getProfileByRegId, 
  getRFLoans, 
  getGrantLoans, 
  updateLoan as updateLoanUtil,
  getPendingLoans as getPendingLoansUtil,
  generateLoanId,
  getAllBankAccounts,
  getBankBalanceByName,
  updateBankBalance,
  transferMoneyBetweenAccounts,
  getWereSLTransactionHistory
} from '../utils/dbUtils.js'
import { convertGoogleDriveUrl, convertToHighQualityUrl } from '../utils/driveUtils.js'
import { createTimestamp } from '../utils/regIdUtils.js'
import { getDistrictName } from '../enums/districts.js'
import { addLoanInitiationRecord, addRFReturnRecord } from '../utils/gasUtils.js'

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
      
      // Get the loan data to find the source account and amount
      const collectionName = loanType === 'RF' ? ProfileField.RF_LOANS : ProfileField.GRANT
      const loanRef = doc(db, RootCollection.PROFILES, regId, collectionName, loanId)
      const loanDoc = await getDoc(loanRef)
      
      if (!loanDoc.exists()) {
        throw new Error('Loan not found')
      }
      
      const loanData = loanDoc.data()
      const loanAmount = loanData.amount || loanData.loanAmount || 0
      const sourceAccount = loanData.source || loanData.loanSource || ''
      
      console.log('📋 Loan data:', {
        amount: loanAmount,
        source: sourceAccount,
        loanType: loanType
      })
      
      // Validate source account and amount
      if (!sourceAccount) {
        throw new Error('No source account specified for this loan')
      }
      
      if (loanAmount <= 0) {
        throw new Error('Invalid loan amount')
      }
      
      // Check if source account has sufficient balance
      const sourceAccountResult = await getBankBalanceByName(sourceAccount)
      if (!sourceAccountResult.success) {
        throw new Error(`Source account '${sourceAccount}' not found`)
      }
      
      const sourceAccountBalance = sourceAccountResult.data.balance
      if (sourceAccountBalance < loanAmount) {
        throw new Error(`Insufficient balance in ${sourceAccount}. Available: Rs. ${sourceAccountBalance.toLocaleString()}, Required: Rs. ${loanAmount.toLocaleString()}`)
      }
      
      // Use batch operation to ensure atomicity
      const batch = writeBatch(db)
      
      // 1. Update loan status to active
      const updateData = {
        status: 'active',
        approvedAt: serverTimestamp(),
        lastUpdated: serverTimestamp()
      }
      
      batch.update(loanRef, updateData)
      
      // 2. Reduce money from source account
      const sourceAccountRef = doc(db, RootCollection.BANK_ACCOUNTS, sourceAccount)
      batch.update(sourceAccountRef, {
        [BANK_ACCOUNT_FIELDS.currentBankBalance]: sourceAccountBalance - loanAmount,
        [BANK_ACCOUNT_FIELDS.lastUpdated]: serverTimestamp()
      })
      
      // 3. Add transaction to wereSL transaction history
      const transactionData = {
        type: 'loan_approval',
        loanId: loanId,
        regId: regId,
        loanType: loanType,
        amount: loanAmount,
        sourceAccount: sourceAccount,
        sourceAccountPreviousBalance: sourceAccountBalance,
        sourceAccountNewBalance: sourceAccountBalance - loanAmount,
        timestamp: serverTimestamp(),
        description: `External Transaction: Rs. ${loanAmount.toLocaleString()} from ${sourceAccount} for loan approval (${regId} - ${loanType})`
      }
      
      const transactionRef = doc(collection(db, RootCollection.BANK_ACCOUNTS, 'wereSL', 'transactions'))
      batch.set(transactionRef, transactionData)
      
      // 4. Remove from pending loans
      const pendingLoanRef = doc(db, RootCollection.SEARCH_ELEMENTS, SearchElementDoc.PENDING_LOAN)
      const pendingLoanDoc = await getDoc(pendingLoanRef)
      
      if (pendingLoanDoc.exists()) {
        const pendingData = pendingLoanDoc.data()
        
        // Find and remove the specific loan entry
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
        
        batch.set(pendingLoanRef, pendingData)
      }
      
      // Commit all changes
      await batch.commit()
      
      // 5. Send loan approval data to Google Sheets
      try {
        console.log('📊 Sending loan approval data to Google Sheets...')
        
        // Get profile data for Google Sheets
        const profileResult = await getProfileByRegId(regId)
        if (!profileResult.success) {
          console.warn('⚠️ Could not get profile data for Google Sheets:', profileResult.message)
        } else {
          const profileData = profileResult.data
          
          // Prepare loan data for Google Sheets
          const loanSheetData = {
            type: loanType,
            amount: loanAmount,
            purpose: loanData.purpose || loanData.loanPurpose || '',
            source: sourceAccount
          }
          
          // Send to Google Sheets
          const sheetResult = await addLoanInitiationRecord(loanSheetData, profileData)
          console.log('✅ Loan approval data sent to Google Sheets:', sheetResult)
        }
      } catch (sheetError) {
        console.error('❌ Error sending loan data to Google Sheets:', sheetError)
        // Don't throw error - Google Sheets integration is not critical for loan approval
      }
      
      console.log('✅ Loan approved successfully:', regId, loanId)
      console.log('💰 Reduced Rs.', loanAmount, 'from', sourceAccount)
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
        if (paymentData[RF_RETURN_RECORD_FIELD.STATUS] === 'pending') {
          console.log('📋 Processing payment:', paymentData.regId)
          console.log('💰 Payment data:', {
            regId: paymentData.regId,
            amount: paymentData.amount,
            totalBalance: paymentData.totalBalance,
            paidAmount: paymentData.paidAmount,
            receiver: paymentData.receiver,
            status: paymentData.status,
            timestamp: paymentData.timestamp,
            receiptDriveLinkId: paymentData.receiptDriveLinkId
          })
          
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
              
              // Convert receipt image using utils - use high quality for receipts
              const receiptUrl = paymentData.receiptDriveLinkId ? 
                convertToHighQualityUrl(paymentData.receiptDriveLinkId) : 
                paymentData.driveLink
              
              const paymentObject = {
                id: paymentDoc.id,
                regId: paymentData.regId,
                name: profileData.fullName || profileData.Name || 'Unknown',
                district: profileData.district || profileData.District || 'Unknown',
                profilePicture: profileData.profileImageDriveId ? 
                  convertGoogleDriveUrl(profileData.profileImageDriveId) : 
                  (profileData.Image || profileData.profilePicture),
                contact: profileData.phoneNumber || profileData.contact || 'Not provided',
                age: age,
                amount: paymentData.amount || paymentData.totalBalance || 0,
                [RF_RETURN_RECORD_FIELD.PAID_AMOUNT]: paymentData[RF_RETURN_RECORD_FIELD.PAID_AMOUNT] || 0,
                driveLink: receiptUrl,
                receiver: paymentData.receiver,
                totalBalance: paymentData.totalBalance,
                createdAt: paymentData.createdAt,
                timestamp: paymentData.timestamp,
                activeLoans: activeLoans
              }
              
              console.log('✅ Created payment object:', paymentObject)
              pendingPayments.push(paymentObject)
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
      const paidAmount = paymentData[RF_RETURN_RECORD_FIELD.PAID_AMOUNT] || 0
      const receiverAccount = paymentData.receiver || ''
      
      console.log('📋 Payment data:', {
        regId: paymentData.regId,
        amount: paymentData.amount,
        totalBalance: paymentData.totalBalance,
        paidAmount: paidAmount,
        receiver: receiverAccount,
        status: paymentData.status,
        timestamp: paymentData.timestamp
      })
      
      // Validate receiver account and amount
      if (!receiverAccount) {
        throw new Error('No receiver account specified for this payment')
      }
      
      if (paidAmount <= 0) {
        throw new Error('Invalid payment amount')
      }
      
      // Check if receiver account exists
      const receiverAccountResult = await getBankBalanceByName(receiverAccount)
      if (!receiverAccountResult.success) {
        throw new Error(`Receiver account '${receiverAccount}' not found`)
      }
      
      const receiverAccountBalance = receiverAccountResult.data.balance
      
      // Get active RF loans for this profile using utils
      const rfLoansResult = await getRFLoans(paymentData.regId)
      
      if (!rfLoansResult.success) {
        throw new Error('Failed to get RF loans')
      }
      
      const activeLoans = rfLoansResult.data
        .filter(loan => loan.status === 'active')
        .sort((a, b) => a.createdAt?.toDate() - b.createdAt?.toDate()) // Sort by creation date (oldest first)
      
      console.log('💰 Active loans to process:', activeLoans.length)
      console.log('💰 Payment processing:', {
        paymentAmount: paymentData.amount,
        paidAmount: paidAmount,
        totalBalance: paymentData.totalBalance,
        receiverAccount: receiverAccount,
        receiverBalance: receiverAccountBalance
      })
      
      // Use batch operation to ensure atomicity
      const batch = writeBatch(db)
      
      // 1. Process each active loan in order (oldest first)
      let remainingAmount = paidAmount
      for (const loan of activeLoans) {
        console.log('🔄 Processing loan:', loan.id, 'Current balance:', loan.currentBalance, 'Remaining amount:', remainingAmount)
        
        if (remainingAmount <= 0) break
        
        const loanRef = doc(db, RootCollection.PROFILES, paymentData.regId, ProfileField.RF_LOANS, loan.id)
        
        if (remainingAmount >= loan.currentBalance) {
          // Pay off this loan completely
          const amountToDeduct = loan.currentBalance
          remainingAmount -= amountToDeduct
          
          console.log('✅ Paying off loan completely:', loan.id, 'Amount:', amountToDeduct)
          
          batch.update(loanRef, {
            currentBalance: 0,
            status: 'completed',
            lastUpdated: serverTimestamp()
          })
        } else {
          // Partial payment
          console.log('✅ Partial payment for loan:', loan.id, 'Amount:', remainingAmount)
          
          batch.update(loanRef, {
            currentBalance: loan.currentBalance - remainingAmount,
            lastUpdated: serverTimestamp()
          })
          
          remainingAmount = 0
        }
      }
      
      // 2. Add money to receiver account
      batch.update(doc(db, RootCollection.BANK_ACCOUNTS, receiverAccount), {
        [BANK_ACCOUNT_FIELDS.currentBankBalance]: receiverAccountBalance + paidAmount,
        [BANK_ACCOUNT_FIELDS.lastUpdated]: serverTimestamp()
      })
      
      // 3. Add transaction to wereSL transaction history
      const transactionData = {
        type: 'payment_approval',
        paymentId: paymentId,
        regId: paymentData.regId,
        amount: paidAmount,
        receiverAccount: receiverAccount,
        receiverAccountPreviousBalance: receiverAccountBalance,
        receiverAccountNewBalance: receiverAccountBalance + paidAmount,
        timestamp: serverTimestamp(),
        description: `External Transaction: Rs. ${paidAmount.toLocaleString()} to ${receiverAccount} for payment approval (${paymentData.regId})`
      }
      
      const transactionRef = doc(collection(db, RootCollection.BANK_ACCOUNTS, 'wereSL', 'transactions'))
      batch.set(transactionRef, transactionData)
      
      // 4. Update payment status to approved
      batch.update(paymentRef, {
        [RF_RETURN_RECORD_FIELD.STATUS]: 'approved',
        [RF_RETURN_RECORD_FIELD.PAID_AMOUNT]: paidAmount,
        approvedAt: serverTimestamp(),
        lastUpdated: serverTimestamp()
      })
      
      // 5. Add payment to profile's RF_RETURN_HISTORY
      const profileRef = doc(db, RootCollection.PROFILES, paymentData.regId)
      const profileDoc = await getDoc(profileRef)
      
      if (profileDoc.exists()) {
        const profileData = profileDoc.data()
        const currentHistory = profileData[ProfileField.RF_RETURN_HISTORY] || {}
        
        // Add new payment entry with timestamp as key and amount as value
        const paymentTimestamp = createTimestamp()
        console.log('📊 Adding payment to history:', {
          timestamp: paymentTimestamp,
          amount: paidAmount,
          originalAmount: paymentData.amount,
          totalBalance: paymentData.totalBalance
        })
        const updatedHistory = {
          ...currentHistory,
          [paymentTimestamp]: paidAmount
        }
        
        batch.update(profileRef, {
          [ProfileField.RF_RETURN_HISTORY]: updatedHistory,
          lastUpdated: serverTimestamp()
        })
        
        console.log('✅ Payment history updated for profile:', paymentData.regId)
      }
      
      // Commit all changes
      await batch.commit()
      
      // 6. Send payment approval data to Google Sheets
      try {
        console.log('📊 Sending payment approval data to Google Sheets...')
        
        // Get profile data for Google Sheets
        const profileResult = await getProfileByRegId(paymentData.regId)
        if (!profileResult.success) {
          console.warn('⚠️ Could not get profile data for Google Sheets:', profileResult.message)
        } else {
          const profileData = profileResult.data
          
          // Prepare payment data for Google Sheets
          const paymentSheetData = {
            amount: paidAmount,
            receiver: receiverAccount,
            receiptDriveLinkId: paymentData.receiptDriveLinkId || paymentData.driveLink || ''
          }
          
          // Send to Google Sheets
          const sheetResult = await addRFReturnRecord(paymentSheetData, profileData)
          console.log('✅ Payment approval data sent to Google Sheets:', sheetResult)
        }
      } catch (sheetError) {
        console.error('❌ Error sending payment data to Google Sheets:', sheetError)
        // Don't throw error - Google Sheets integration is not critical for payment approval
      }
      
      console.log('✅ Payment approved successfully. Remaining amount:', remainingAmount)
      console.log('💰 Added Rs.', paidAmount, 'to', receiverAccount)
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
      console.log('🔄 Getting all profiles...')
      const profilesQuery = query(collection(db, RootCollection.PROFILES))
      const querySnapshot = await getDocs(profilesQuery)
      
      const profiles = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      
      console.log(`✅ Found ${profiles.length} profiles`)
      return { success: true, data: profiles }
    } catch (error) {
      console.error('❌ Error getting all profiles:', error)
      return { success: false, message: 'Failed to get profiles', error }
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

  // Update payment
  async updatePayment(paymentId, updateData) {
    try {
      console.log('🔄 Updating payment:', paymentId, updateData)
      
      const paymentRef = doc(db, RootCollection.RF_RETURN_RECORD, paymentId)
      const paymentDoc = await getDoc(paymentRef)
      
      if (!paymentDoc.exists()) {
        throw new Error('Payment not found')
      }
      
      const paymentData = paymentDoc.data()
      
      // Update the payment with new data
      const finalUpdateData = {
        ...updateData,
        [RF_RETURN_RECORD_FIELD.LAST_UPDATED]: serverTimestamp()
      }
      
      await updateDoc(paymentRef, finalUpdateData)
      
      console.log('✅ Payment updated successfully')
      return { success: true }
    } catch (error) {
      console.error('❌ Error updating payment:', error)
      throw error
    }
  },

  // Get pending GIF return records
  async getPendingGIFReturns() {
    try {
      console.log('🔄 Loading pending GIF returns from GIF_return_record...')
      const gifReturnsQuery = query(collection(db, RootCollection.GIF_RETURN_RECORD))
      const gifReturnsSnapshot = await getDocs(gifReturnsQuery)
      
      const pendingGIFReturns = []
      
      for (const gifReturnDoc of gifReturnsSnapshot.docs) {
        const gifReturnData = gifReturnDoc.data()
        
        // Only process pending GIF returns
        if (gifReturnData[GIF_RETURN_RECORD_FIELD.STATUS] === 'pending') {
          console.log('📋 Processing GIF return:', gifReturnData.regId)
          
          try {
            // Get profile data using utils
            const profileResult = await getProfileByRegId(gifReturnData.regId)
            
            if (profileResult.success && profileResult.data) {
              const profileData = profileResult.data
              
              // Calculate age from yearOfBirth
              const currentYear = new Date().getFullYear()
              const age = profileData.yearOfBirth ? currentYear - profileData.yearOfBirth : 'Unknown'
              
              const gifReturnObject = {
                id: gifReturnDoc.id,
                regId: gifReturnData.regId,
                name: profileData.fullName || profileData.Name || 'Unknown',
                district: profileData.district || profileData.District || 'Unknown',
                profilePicture: profileData.profileImageDriveId ? 
                  convertGoogleDriveUrl(profileData.profileImageDriveId) : 
                  (profileData.Image || profileData.profilePicture),
                contact: profileData.phoneNumber || profileData.contact || 'Not provided',
                age: age,
                description: gifReturnData.description || 'No description provided',
                timestamp: gifReturnData.timestamp,
                createdAt: gifReturnData.createdAt,
                status: gifReturnData.status
              }
              
              console.log('✅ Created GIF return object:', gifReturnObject)
              pendingGIFReturns.push(gifReturnObject)
            }
          } catch (error) {
            console.error('❌ Error processing GIF return for', gifReturnData.regId, ':', error)
          }
        }
      }
      
      console.log('✅ Loaded pending GIF returns:', pendingGIFReturns.length)
      return pendingGIFReturns
    } catch (error) {
      console.error('❌ Error getting pending GIF returns:', error)
      throw error
    }
  },

  // Approve GIF return
  async approveGIFReturn(gifReturnId) {
    try {
      console.log('🔄 Approving GIF return:', gifReturnId)
      
      // Get the GIF return data
      const gifReturnRef = doc(db, RootCollection.GIF_RETURN_RECORD, gifReturnId)
      const gifReturnDoc = await getDoc(gifReturnRef)
      
      if (!gifReturnDoc.exists()) {
        throw new Error('GIF return not found')
      }
      
      const gifReturnData = gifReturnDoc.data()
      console.log('📋 GIF return data:', {
        regId: gifReturnData.regId,
        description: gifReturnData.description,
        status: gifReturnData.status,
        timestamp: gifReturnData.timestamp
      })
      
      // Update GIF return status to approved
      await updateDoc(gifReturnRef, {
        [GIF_RETURN_RECORD_FIELD.STATUS]: 'approved',
        approvedAt: serverTimestamp(),
        lastUpdated: serverTimestamp()
      })
      
      // Add GIF return to profile's GIF array
      const profileRef = doc(db, RootCollection.PROFILES, gifReturnData.regId)
      const profileDoc = await getDoc(profileRef)
      
      if (profileDoc.exists()) {
        const profileData = profileDoc.data()
        const currentGIF = profileData[ProfileField.GIF] || {}
        
        // Add new GIF return entry with timestamp as key and description as value
        const gifTimestamp = createTimestamp()
        const gifDescription = gifReturnData.description || 'GIF return approved'
        console.log('📊 Adding GIF return to profile:', {
          timestamp: gifTimestamp,
          description: gifDescription
        })
        
        const updatedGIF = {
          ...currentGIF,
          [gifTimestamp]: gifDescription
        }
        
        await updateDoc(profileRef, {
          [ProfileField.GIF]: updatedGIF,
          lastUpdated: serverTimestamp()
        })
        
        console.log('✅ GIF return added to profile:', gifReturnData.regId)
      }
      
      console.log('✅ GIF return approved successfully')
      return { success: true }
    } catch (error) {
      console.error('❌ Error approving GIF return:', error)
      throw error
    }
  },

  // Update GIF return
  async updateGIFReturn(gifReturnId, updateData) {
    try {
      console.log('🔄 Updating GIF return:', gifReturnId, updateData)
      
      const gifReturnRef = doc(db, RootCollection.GIF_RETURN_RECORD, gifReturnId)
      const gifReturnDoc = await getDoc(gifReturnRef)
      
      if (!gifReturnDoc.exists()) {
        throw new Error('GIF return not found')
      }
      
      // Update the GIF return with new data
      const finalUpdateData = {
        ...updateData,
        lastUpdated: serverTimestamp()
      }
      
      await updateDoc(gifReturnRef, finalUpdateData)
      
      console.log('✅ GIF return updated successfully')
      return { success: true }
    } catch (error) {
      console.error('❌ Error updating GIF return:', error)
      throw error
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
  },

  // Bank Account Management Functions
  
  // Get all bank accounts
  async getAllBankAccounts() {
    try {
      console.log('🔄 Getting all bank accounts...')
      const result = await getAllBankAccounts()
      
      if (!result.success) {
        console.error('❌ Failed to get bank accounts:', result.message)
        return []
      }
      
      console.log('✅ Loaded bank accounts:', result.data.length)
      return result.data
    } catch (error) {
      console.error('❌ Error getting bank accounts:', error)
      throw error
    }
  },

  // Get bank balance by name
  async getBankBalanceByName(name) {
    try {
      console.log('🔄 Getting bank balance for:', name)
      const result = await getBankBalanceByName(name)
      
      if (!result.success) {
        console.error('❌ Failed to get bank balance:', result.message)
        return null
      }
      
      console.log('✅ Bank balance for', name, ':', result.data.balance)
      return result.data
    } catch (error) {
      console.error('❌ Error getting bank balance:', error)
      throw error
    }
  },

  // Update bank balance
  async updateBankBalance(name, newAmount) {
    try {
      console.log('🔄 Updating bank balance for:', name, 'to:', newAmount)
      const result = await updateBankBalance(name, newAmount)
      
      if (!result.success) {
        console.error('❌ Failed to update bank balance:', result.message)
        throw new Error(result.message)
      }
      
      console.log('✅ Bank balance updated successfully for', name)
      return result.data
    } catch (error) {
      console.error('❌ Error updating bank balance:', error)
      throw error
    }
  },

  // Transfer money between accounts
  async transferMoneyBetweenAccounts(fromAccount, toAccount, amount) {
    try {
      console.log('🔄 Transferring money:', amount, 'from', fromAccount, 'to', toAccount)
      const result = await transferMoneyBetweenAccounts(fromAccount, toAccount, amount)
      
      if (!result.success) {
        console.error('❌ Failed to transfer money:', result.message)
        throw new Error(result.message)
      }
      
      console.log('✅ Money transferred successfully')
      return result.data
    } catch (error) {
      console.error('❌ Error transferring money:', error)
      throw error
    }
  },

  // Get WereSL Transaction History
  async getWereSLTransactionHistory() {
    try {
      console.log('🔄 Getting WereSL Transaction History...')
      const result = await getWereSLTransactionHistory()
      
      if (!result.success) {
        console.error('❌ Failed to get transaction history:', result.message)
        return []
      }
      
      console.log('✅ Loaded transaction history:', result.data.length, 'transactions')
      return result.data
    } catch (error) {
      console.error('❌ Error getting transaction history:', error)
      throw error
    }
  }
}

export default adminDbService 