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
  BANK_ACCOUNT_FIELD,
  LOAN_FIELD
} from '../enums/db.js'
import { 
  getProfileByRegId, 
  getRFLoans, 
  getGrantLoans, 
  updateLoan as updateLoanUtil,
  getPendingLoans as getPendingLoansUtil,
  generateLoanId,
  getAllBankAccounts as getAllBankAccountsUtil,
  getBankBalanceByName as getBankBalanceByNameUtil,
  updateBankBalance as updateBankBalanceUtil,
  transferMoneyBetweenAccounts as transferMoneyBetweenAccountsUtil,
  getWereSLTransactionHistory as getWereSLTransactionHistoryUtil
} from '../utils/dbUtils.js'
import { convertGoogleDriveUrl, convertToHighQualityUrl, extractFileId } from '../utils/driveUtils.js'
import { createTimestamp } from '../utils/regIdUtils.js'
import { getDistrictName } from '../enums/districts.js'
import { addLoanInitiationRecord, addRFReturnRecord } from '../utils/gasUtils.js'

// RRH ID counter for generating unique RRH IDs per regID
let rrhIdCounter = {}

// Generate RRH ID for RF return history records
function generateRRHId(regId) {
  if (!rrhIdCounter[regId]) {
    rrhIdCounter[regId] = 1
  }
  
  const counter = String(rrhIdCounter[regId]).padStart(3, '0')
  const rrhId = `RRH_${regId}_${counter}`
  
  rrhIdCounter[regId]++
  return rrhId
}

export const adminDbService = {
  // Get pending loans from SearchElements/pending-loan
  async getPendingLoans() {
    try {
      const pendingResult = await getPendingLoansUtil()
      
      if (!pendingResult.success) {
        return []
      }
      
      const pendingLoans = pendingResult.data
      
      const loanPromises = pendingLoans.map(async (pendingLoan) => {
        const regId = pendingLoan.regId
        const loanId = pendingLoan.loanId
        const loanType = pendingLoan.loanType || 'RF'
        try {
          // Get profile data using utils
          const profileResult = await getProfileByRegId(regId)
          
          if (!profileResult.success || !profileResult.data) {
            return null
          }
          
          const profileData = profileResult.data
          
          // Get the specific loan using the loanId from pending data
          const collectionName = loanType === 'RF' ? ProfileField.RF_LOANS : ProfileField.GRANT
          const loanRef = doc(db, RootCollection.PROFILES, regId, collectionName, loanId)
          const loanDoc = await getDoc(loanRef)
          
          if (!loanDoc.exists()) {
            return null
          }
          
          const latestLoan = { id: loanDoc.id, ...loanDoc.data() }
          
          if (latestLoan) {
            // Calculate age from yearOfBirth
            const currentYear = new Date().getFullYear()
            const age = profileData.yearOfBirth ? currentYear - profileData.yearOfBirth : 'Unknown'
            
            // Convert profile image using utils
            const profileImageUrl = profileData.profileImageDriveId ? 
              convertGoogleDriveUrl(profileData.profileImageDriveId) : 
              (profileData.Image || profileData.profilePicture)
            
            // District is already stored as full name (e.g., "Mannar"), no need for mapping
            const districtName = profileData.district || profileData.District || 'Unknown'
            
            return {
              regId,
              name: profileData.fullName || profileData.Name || 'Unknown',
              district: districtName,
              profilePicture: profileImageUrl,
              contact: profileData.phoneNumber || profileData.contact || 'Not provided',
              age: age,
              loanId: latestLoan.id,
              loanType: loanType,
              amount: latestLoan.amount || latestLoan.loanAmount || 0,
              purpose: latestLoan.purpose || latestLoan.loanPurpose || 'No purpose provided',
              source: latestLoan.source || latestLoan.loanSource || 'No source provided',
              arms: latestLoan.arms || '',
              status: latestLoan.status || 'pending',
              createdAt: latestLoan.createdAt,
              initiationDate: latestLoan.initiationDate,
              projectDescription: latestLoan.projectDescription || latestLoan.description || 'No description provided'
            }
          }
        } catch (error) {
          console.error('❌ Error processing pending loan for', regId, ':', error)
          return null
        }
      })
      
      const resolvedLoans = await Promise.all(loanPromises)
      const validLoans = resolvedLoans.filter(loan => loan !== null)
      
      return validLoans
    } catch (error) {
      console.error('❌ Error getting pending loans:', error)
      throw error
    }
  },

  // Get RF loans for a specific profile
  async getProfileRFLoans(regId) {
    try {
      const result = await getRFLoans(regId)
      return result
    } catch (error) {
      console.error('❌ Error getting RF loans:', error)
      throw error
    }
  },

  // Approve loan and remove from pending
  async approveLoan(regId, loanType, loanId) {
    try {
      console.log('🚀 Starting loan approval in dbService...')
      console.log('📋 Approval parameters:', { regId, loanType, loanId })
      
      // Get the loan data to find the source account and amount
      const collectionName = loanType === 'RF' ? ProfileField.RF_LOANS : ProfileField.GRANT
      console.log('📁 Collection name:', collectionName)
      
      const loanRef = doc(db, RootCollection.PROFILES, regId, collectionName, loanId)
      console.log('📄 Loan reference path:', [RootCollection.PROFILES, regId, collectionName, loanId])
      
      const loanDoc = await getDoc(loanRef)
      console.log('📊 Loan document exists:', loanDoc.exists())
      
      if (!loanDoc.exists()) {
        console.log('❌ Loan document not found')
        throw new Error('Loan not found')
      }
      
      const loanData = loanDoc.data()
      console.log('📋 Loan data:', loanData)
      
      const loanAmount = loanData.amount || loanData.loanAmount || 0
      const sourceAccount = loanData.source || loanData.loanSource || ''
      
      console.log('💰 Loan amount:', loanAmount)
      console.log('🏦 Source account:', sourceAccount)
      
      // Validate source account and amount
      if (!sourceAccount) {
        console.log('❌ No source account specified')
        throw new Error('No source account specified for this loan')
      }
      
      if (loanAmount <= 0) {
        console.log('❌ Invalid loan amount:', loanAmount)
        throw new Error('Invalid loan amount')
      }
      
      // Check if source account has sufficient balance
      console.log('🔄 Checking source account balance...')
      const sourceAccountResult = await getBankBalanceByNameUtil(sourceAccount)
      console.log('📊 Source account result:', sourceAccountResult)
      
      if (!sourceAccountResult.success) {
        console.log('❌ Source account not found:', sourceAccount)
        throw new Error(`Source account '${sourceAccount}' not found`)
      }
      
      const sourceAccountBalance = sourceAccountResult.data.balance
      console.log('💰 Source account balance:', sourceAccountBalance)
      
      if (sourceAccountBalance < loanAmount) {
        console.log('❌ Insufficient balance:', { available: sourceAccountBalance, required: loanAmount })
        throw new Error(`Insufficient balance in ${sourceAccount}. Available: Rs. ${sourceAccountBalance.toLocaleString()}, Required: Rs. ${loanAmount.toLocaleString()}`)
      }
      
      console.log('✅ Balance check passed')
      
      // Use batch operation to ensure atomicity
      console.log('🔄 Starting batch operations...')
      const batch = writeBatch(db)
      
      // 1. Update loan status to active
      console.log('📝 Step 1: Updating loan status to active...')
      const updateData = {
        status: 'active',
        approvedAt: serverTimestamp(),
        lastUpdated: serverTimestamp()
      }
      
      // Only add loanHistory and paymentIntegrity for RF loans
      if (loanType === 'RF') {
        updateData.loanHistory = [] // Initialize empty loan history array
        updateData.paymentIntegrity = true // Initialize payment integrity as true (no payments yet)
      }
      
      console.log('📋 Loan update data:', updateData)
      batch.update(loanRef, updateData)
      console.log('✅ Loan status update added to batch')
      
      // 2. Reduce money from source account
      console.log('📝 Step 2: Reducing money from source account...')
      const sourceAccountRef = doc(db, RootCollection.BANK_ACCOUNTS, sourceAccount)
      const newBalance = sourceAccountBalance - loanAmount
      console.log('💰 New source account balance:', newBalance)
      
      batch.update(sourceAccountRef, {
        [BANK_ACCOUNT_FIELD.CURRENT_BANK_BALANCE]: newBalance,
        [BANK_ACCOUNT_FIELD.LAST_UPDATED]: serverTimestamp()
      })
      console.log('✅ Source account balance update added to batch')
      
      // 3. Create null type with REG_ID as field in BANK_ACCOUNT.RF_LOANS
      if (loanType === 'RF') {
        const sourceAccountDoc = await getDoc(sourceAccountRef)
        if (sourceAccountDoc.exists()) {
          const accountData = sourceAccountDoc.data()
          const currentRFLoans = accountData[BANK_ACCOUNT_FIELD.RF_LOANS] || {}
          
          // Add the reg ID with null value (will be updated during payment approval)
          const updatedRFLoans = {
            ...currentRFLoans,
            [regId]: null
          }
          
          batch.update(sourceAccountRef, {
            [BANK_ACCOUNT_FIELD.RF_LOANS]: updatedRFLoans,
            [BANK_ACCOUNT_FIELD.LAST_UPDATED]: serverTimestamp()
          })
        }
      }
      
      // 4. Add transaction to wereSL transaction history
      const transactionData = {
        type: 'loan_approval',
        loanId: loanId,
        regId: regId,
        amount: loanAmount,
        sourceAccount: sourceAccount,
        sourceAccountPreviousBalance: sourceAccountBalance,
        sourceAccountNewBalance: sourceAccountBalance - loanAmount,
        timestamp: serverTimestamp(),
        description: `External Transaction: Rs. ${loanAmount.toLocaleString()} from ${sourceAccount} for loan approval (${regId} - ${loanType})`
      }
      
      const transactionRef = doc(collection(db, RootCollection.BANK_ACCOUNTS, 'wereSL', 'transactions'))
      batch.set(transactionRef, transactionData)
      
      // 5. Save loan information to root/loans collection
      const loanInfoData = {
        regId: regId,
        amount: loanAmount,
        approvedAt: serverTimestamp(),
        arms: loanData.arms || '',
        createdAt: loanData.createdAt || loanData.initiationDate || serverTimestamp(),
        initiationDate: loanData.initiationDate || loanData.createdAt || serverTimestamp(),
        loanId: loanId,
        projectDescription: loanData.projectDescription || loanData.purpose || '',
        purpose: loanData.purpose || loanData.loanPurpose || '',
        source: sourceAccount,
        status: 'active',
        type: loanType
      }
      
      // Only add loanHistory and paymentIntegrity for RF loans
      if (loanType === 'RF') {
        loanInfoData.loanHistory = [] // Initialize empty loan history array
        loanInfoData.paymentIntegrity = true // Initialize payment integrity as true (no payments yet)
      }
      
      const rootLoanRef = doc(db, RootCollection.LOANS, loanId)
      batch.set(rootLoanRef, loanInfoData)
      
      // 6. Remove from pending loans
      console.log('📝 Step 6: Removing from pending loans...')
      const pendingLoanRef = doc(db, RootCollection.SEARCH_ELEMENTS, SearchElementDoc.PENDING_LOAN)
      console.log('📄 Pending loan reference:', [RootCollection.SEARCH_ELEMENTS, SearchElementDoc.PENDING_LOAN])
      
      const pendingLoanDoc = await getDoc(pendingLoanRef)
      console.log('📊 Pending loan document exists:', pendingLoanDoc.exists())
      
      if (pendingLoanDoc.exists()) {
        const pendingData = pendingLoanDoc.data()
        console.log('📋 Current pending data:', pendingData)
        console.log('🔍 Looking for loan to remove:', { regId, loanId })
        
        // Find and remove the specific loan entry
        let foundAndRemoved = false
        for (const [key, loanData] of Object.entries(pendingData)) {
          console.log('🔍 Checking pending entry:', { key, loanData })
          if (loanData.regId === regId && loanData.loanId === loanId) {
            console.log('✅ Found matching loan entry, removing:', key)
            delete pendingData[key]
            foundAndRemoved = true
            break
          }
        }
        
        if (!foundAndRemoved) {
          console.log('⚠️ Specific loan not found, trying fallback removal by regId')
          // Fallback: remove by regId if specific loan not found
          if (pendingData[regId]) {
            console.log('✅ Found regId entry, removing:', regId)
            delete pendingData[regId]
          } else {
            console.log('❌ No regId entry found either')
          }
        }
        
        console.log('📋 Updated pending data:', pendingData)
        batch.set(pendingLoanRef, pendingData)
        console.log('✅ Pending loan removal added to batch')
      } else {
        console.log('⚠️ Pending loan document does not exist')
      }
      
      // Commit all changes
      console.log('🚀 Committing batch operations...')
      await batch.commit()
      console.log('✅ Batch operations committed successfully')
      
      // 6. Send loan approval data to Google Sheets
      try {
        // Get profile data for Google Sheets
        const profileResult = await getProfileByRegId(regId)
        if (profileResult.success) {
          const profileData = profileResult.data
          
          // Prepare loan data for Google Sheets
          const loanSheetData = {
            type: loanType,
            amount: loanAmount,
            purpose: loanData.purpose || loanData.loanPurpose || '',
            source: sourceAccount
          }
          
          // Send to Google Sheets
          await addLoanInitiationRecord(loanSheetData, profileData)
        }
      } catch (sheetError) {
        // Don't throw error - Google Sheets integration is not critical for loan approval
      }
      
      console.log('🎉 Loan approval completed successfully')
      return { success: true }
    } catch (error) {
      console.error('❌ Error in loan approval:', error)
      console.error('❌ Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      })
      return { success: false, message: error.message }
    }
  },

  // Update loan
  async updateLoan(regId, loanType, loanId, updateData) {
    try {
      const collectionName = loanType === 'RF' ? ProfileField.RF_LOANS : ProfileField.GRANT
      const loanRef = doc(db, RootCollection.PROFILES, regId, collectionName, loanId)
      
      // If amount is being updated, also update currentBalance (only for RF loans)
      if (updateData.amount !== undefined && loanType === 'RF') {
        updateData.currentBalance = updateData.amount
      }
      
      // Update profile loan
      await updateDoc(loanRef, {
        ...updateData,
        lastUpdated: serverTimestamp()
      })
      
      // If status is being updated, also update root loan collection
      if (updateData.status !== undefined) {
        try {
          const rootLoanRef = doc(db, RootCollection.LOANS, loanId)
          const rootLoanDoc = await getDoc(rootLoanRef)
          
          if (rootLoanDoc.exists()) {
            await updateDoc(rootLoanRef, {
              [LOAN_FIELD.STATUS]: updateData.status,
              [LOAN_FIELD.LAST_UPDATED]: serverTimestamp()
            })
            console.log('✅ Updated loan status in root/loans collection:', loanId)
          } else {
            console.log('⚠️ Loan not found in root/loans collection:', loanId)
          }
        } catch (rootLoanError) {
          console.log('⚠️ Could not update root loan status:', loanId, rootLoanError.message)
        }
      }
      
      return { success: true }
    } catch (error) {
      return { success: false, message: error.message }
    }
  },

  // Get pending payments from RF_return_record
  async getPendingPayments() {
    try {
      const paymentsQuery = query(collection(db, RootCollection.RF_RETURN_RECORD))
      const paymentsSnapshot = await getDocs(paymentsQuery)
      
      const pendingPayments = []
      
      for (const paymentDoc of paymentsSnapshot.docs) {
        const paymentData = paymentDoc.data()
        
        // Only include pending payments
        if (paymentData.status === 'pending') {
          try {
            // Get profile data
            const profileResult = await getProfileByRegId(paymentData.regId)
            
            if (!profileResult.success || !profileResult.data) {
              continue
            }
            
            const profileData = profileResult.data
            
            // Get active RF loans for this profile
            const rfLoansResult = await getRFLoans(paymentData.regId)
            
            if (!rfLoansResult.success) {
              continue
            }
            
            const activeLoans = rfLoansResult.data.filter(loan => loan.status === 'active')
            
            // Convert profile image using utils
            const profileImageUrl = profileData.profileImageDriveId ? 
              convertGoogleDriveUrl(profileData.profileImageDriveId) : 
              (profileData.Image || profileData.profilePicture)
            
            const paymentObject = {
              id: paymentDoc.id,
              regId: paymentData.regId,
              name: profileData.fullName || profileData.Name || 'Unknown',
              district: profileData.district || profileData.District || 'Unknown',
              profilePicture: profileImageUrl,
              contact: profileData.phoneNumber || profileData.contact || 'Not provided',
              amount: paymentData.amount || 0,
              totalBalance: paymentData.totalBalance || 0,
              paidAmount: paymentData[RF_RETURN_RECORD_FIELD.PAID_AMOUNT] || 0,
              receiver: paymentData.receiver || '',
              status: paymentData.status || 'pending',
              timestamp: paymentData.timestamp || paymentData.createdAt,
              createdAt: paymentData.timestamp || paymentData.createdAt,
              activeLoans: activeLoans.length,
              receiptDriveLinkId: paymentData[RF_RETURN_RECORD_FIELD.RECEIPT_DRIVE_LINK_ID] || null
            }
            
            pendingPayments.push(paymentObject)
          } catch (error) {
            continue
          }
        }
      }
      
      return pendingPayments
    } catch (error) {
      return []
    }
  },

  // Approve payment and update loan balances
  // Also updates loan status in root/loans collection when loans are completed
  async approvePayment(paymentId) {
    try {
      console.log('🔄 Starting payment approval for paymentId:', paymentId)
      
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
        paidAmount,
        receiverAccount,
        loanId: paymentData[RF_RETURN_RECORD_FIELD.LOAN_ID]
      })
      
      // Validate receiver account and amount
      if (!receiverAccount) {
        throw new Error('No receiver account specified for this payment')
      }
      
      if (paidAmount <= 0) {
        throw new Error('Invalid payment amount')
      }
      
      // Check if receiver account exists
      const receiverAccountResult = await getBankBalanceByNameUtil(receiverAccount)
      if (!receiverAccountResult.success) {
        throw new Error(`Receiver account '${receiverAccount}' not found`)
      }
      
      const receiverAccountBalance = receiverAccountResult.data.balance
      console.log('💰 Receiver account balance:', receiverAccountBalance)
      
      // Get active RF loans for this profile using utils
      const rfLoansResult = await getRFLoans(paymentData.regId)
      
      if (!rfLoansResult.success) {
        throw new Error('Failed to get RF loans')
      }
      
      const activeLoans = rfLoansResult.data
        .filter(loan => loan.status === 'active')
        .sort((a, b) => a.createdAt?.toDate() - b.createdAt?.toDate()) // Sort by creation date (oldest first)
      
      console.log('📊 Active loans found:', activeLoans.length, activeLoans.map(l => ({ id: l.id, currentBalance: l.currentBalance })))
      
      // Check if there's a targetLoanId specified in the payment
      let targetLoanId = paymentData.targetLoanId
      
      // If no targetLoanId specified, use the first active loan (oldest first)
      if (!targetLoanId && activeLoans.length > 0) {
        targetLoanId = activeLoans[0].id
        console.log('📋 No target loan specified, using oldest active loan:', targetLoanId)
      }
      
      if (!targetLoanId) {
        throw new Error('No target loan specified and no active loans found')
      }
      
      // Find the target loan
      const targetLoan = activeLoans.find(loan => loan.id === targetLoanId)
      if (!targetLoan) {
        throw new Error(`Target loan ${targetLoanId} not found or not active`)
      }
      
      console.log('🎯 Target loan for payment:', { id: targetLoanId, currentBalance: targetLoan.currentBalance })
      
      // Use batch operation to ensure atomicity
      const batch = writeBatch(db)
      
      // 1. Process each active loan in order (oldest first)
      let remainingAmount = paidAmount
      const processedLoans = []
      
      // Process only the target loan
      const loan = targetLoan
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
        
        // Update loan status in root/loans collection
        const rootLoanRef = doc(db, RootCollection.LOANS, loan.id)
        // Check if the loan exists in root collection before updating
        const rootLoanDoc = await getDoc(rootLoanRef)
        if (rootLoanDoc.exists()) {
          batch.update(rootLoanRef, {
            [LOAN_FIELD.STATUS]: 'completed',
            [LOAN_FIELD.LAST_UPDATED]: serverTimestamp()
          })
          console.log('✅ Updated loan status in root/loans collection:', loan.id)
        } else {
          console.log('⚠️ Loan not found in root/loans collection:', loan.id)
        }
        
        processedLoans.push({
          loanId: loan.id,
          amount: amountToDeduct
        })
      } else {
        // Partial payment
        console.log('✅ Partial payment for loan:', loan.id, 'Amount:', remainingAmount)
        
        batch.update(loanRef, {
          currentBalance: loan.currentBalance - remainingAmount,
          lastUpdated: serverTimestamp()
        })
        
        processedLoans.push({
          loanId: loan.id,
          amount: remainingAmount
        })
        
        remainingAmount = 0
      }
      
      console.log('📋 Processed loans:', processedLoans)
      
      // 2. Add money to receiver account
      batch.update(doc(db, RootCollection.BANK_ACCOUNTS, receiverAccount), {
        [BANK_ACCOUNT_FIELD.CURRENT_BANK_BALANCE]: receiverAccountBalance + paidAmount,
        [BANK_ACCOUNT_FIELD.LAST_UPDATED]: serverTimestamp()
      })
      
      // 3. Store payment data in BANK_ACCOUNT.RF_LOANS.LOANID for each processed loan
      if (processedLoans.length > 0) {
        console.log('🔄 Storing payment data in BANK_ACCOUNT.RF_LOANS.LOANID')
        
        const receiverAccountRef = doc(db, RootCollection.BANK_ACCOUNTS, receiverAccount)
        const receiverAccountDoc = await getDoc(receiverAccountRef)
        
        if (receiverAccountDoc.exists()) {
          const accountData = receiverAccountDoc.data()
          const currentRFLoans = accountData[BANK_ACCOUNT_FIELD.RF_LOANS] || {}
          
          console.log('📊 Current RF_LOANS in account:', currentRFLoans)
          
          // Create DDMMYYYY format for current date
          const now = new Date()
          const day = String(now.getDate()).padStart(2, '0')
          const month = String(now.getMonth() + 1).padStart(2, '0')
          const year = String(now.getFullYear())
          const dateKey = `${day}${month}${year}`
          
          console.log('📅 Date key for payment:', dateKey)
          
          // Update each processed loan's payment history
          const updatedRFLoans = { ...currentRFLoans }
          
          for (const processedLoan of processedLoans) {
            console.log('🔄 Processing loan for payment storage:', processedLoan.loanId, 'Amount:', processedLoan.amount)
            
            // Get the regId for this loan
            const loanRef = doc(db, RootCollection.PROFILES, paymentData.regId, ProfileField.RF_LOANS, processedLoan.loanId)
            const loanDoc = await getDoc(loanRef)
            if (!loanDoc.exists()) continue
            
            const loanData = loanDoc.data()
            const regId = loanData[RF_LOAN_FIELD.REG_ID] || paymentData.regId
            
            console.log('📊 Processing payment for regId:', regId, 'Amount:', processedLoan.amount)
            
            // Check if there's already a payment for this regId on this date
            const existingDateKey = Object.keys(updatedRFLoans[regId] || {}).find(key => key.startsWith(dateKey))
            
            if (existingDateKey) {
              // Extract existing amount and add new amount
              const existingAmount = parseInt(existingDateKey.split(':')[1]) || 0
              const newAmount = existingAmount + processedLoan.amount
              const newDateKey = `${dateKey}:${newAmount}`
              
              // Remove old entry and add new one
              delete updatedRFLoans[regId][existingDateKey]
              if (!updatedRFLoans[regId]) updatedRFLoans[regId] = {}
              updatedRFLoans[regId][newDateKey] = true
              
              console.log('💰 Updated existing payment:', { existingAmount, newAmount, newDateKey })
            } else {
              // Create new payment entry
              if (!updatedRFLoans[regId]) updatedRFLoans[regId] = {}
              const newDateKey = `${dateKey}:${processedLoan.amount}`
              updatedRFLoans[regId][newDateKey] = true
              
              console.log('💰 Created new payment:', { newDateKey })
            }
            
            console.log('✅ Updated regId data for', regId, ':', updatedRFLoans[regId])
          }
          
          console.log('📊 Final updated RF_LOANS:', updatedRFLoans)
          
          batch.update(receiverAccountRef, {
            [BANK_ACCOUNT_FIELD.RF_LOANS]: updatedRFLoans,
            [BANK_ACCOUNT_FIELD.LAST_UPDATED]: serverTimestamp()
          })
          
          console.log('✅ Successfully updated BANK_ACCOUNT.RF_LOANS with payment data')
        } else {
          console.log('⚠️ Receiver account document does not exist')
        }
      } else {
        console.log('⚠️ No processed loans to store payment data for')
      }
      
      // 4. Add transaction to wereSL transaction history
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
      
      // 5. Update payment status to approved
      batch.update(paymentRef, {
        [RF_RETURN_RECORD_FIELD.STATUS]: 'approved',
        [RF_RETURN_RECORD_FIELD.PAID_AMOUNT]: paidAmount,
        approvedAt: serverTimestamp(),
        lastUpdated: serverTimestamp()
      })
      
      // 6. Add payment to profile's RF_RETURN_HISTORY as RRH object
      const profileRef = doc(db, RootCollection.PROFILES, paymentData.regId)
      const profileDoc = await getDoc(profileRef)
      
      if (profileDoc.exists()) {
        const profileData = profileDoc.data()
        const currentHistory = profileData[ProfileField.RF_RETURN_HISTORY] || {}
        
        // Generate RRH ID
        const rrhId = generateRRHId(paymentData.regId)
        
        // Create RRH object
        const rrhObject = {
          RRH_ID: rrhId,
          approvedDate: new Date().toISOString(),
          amount: paidAmount,
          receiver: paymentData.receiver || 'weresl',
          regID: paymentData.regId,
          DRIVE_LINK_ID: paymentData.receiptLinkId || ''
        }
        
        // Add RRH object to history
        const updatedHistory = {
          ...currentHistory,
          [rrhId]: rrhObject
        }
        
        batch.update(profileRef, {
          [ProfileField.RF_RETURN_HISTORY]: updatedHistory,
          lastUpdated: serverTimestamp()
        })
      }
      
      // Commit all changes
      await batch.commit()
      
      console.log('✅ Payment approval completed successfully')
      return { success: true }
    } catch (error) {
      console.error('❌ Error in payment approval:', error)
      return { success: false, message: error.message }
    }
  },

  // Approve payment to a specific loan
  async approvePaymentToSpecificLoan(paymentId, loanId) {
    try {
      console.log('🔄 Starting payment approval for paymentId:', paymentId, 'to loanId:', loanId)
      
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
        paidAmount,
        receiverAccount,
        loanId: paymentData[RF_RETURN_RECORD_FIELD.LOAN_ID]
      })
      
      // Validate receiver account and amount
      if (!receiverAccount) {
        throw new Error('No receiver account specified for this payment')
      }
      
      if (paidAmount <= 0) {
        throw new Error('Invalid payment amount')
      }
      
      // Check if receiver account exists
      const receiverAccountResult = await getBankBalanceByNameUtil(receiverAccount)
      if (!receiverAccountResult.success) {
        throw new Error(`Receiver account '${receiverAccount}' not found`)
      }
      
      const receiverAccountBalance = receiverAccountResult.data.balance
      console.log('💰 Receiver account balance:', receiverAccountBalance)
      
      // Get the specific loan using the loanId parameter
      const loanRef = doc(db, RootCollection.PROFILES, paymentData.regId, ProfileField.RF_LOANS, loanId)
      const loanDoc = await getDoc(loanRef)
      
      if (!loanDoc.exists()) {
        throw new Error('Specified loan not found')
      }
      
      const loan = loanDoc.data()
      console.log('📊 Target loan:', { id: loanId, currentBalance: loan.currentBalance, status: loan.status })
      
      // Check if loan is active
      if (loan.status !== 'active') {
        throw new Error('Specified loan is not active')
      }
      
      // Use batch operation to ensure atomicity
      const batch = writeBatch(db)
      
      // 1. Process the payment to the specific loan
      let remainingAmount = paidAmount
      const processedLoans = []
      
      if (remainingAmount >= loan.currentBalance) {
        // Pay off this loan completely
        const amountToDeduct = loan.currentBalance
        remainingAmount -= amountToDeduct
        
        console.log('✅ Paying off loan completely:', loanId, 'Amount:', amountToDeduct)
        
        batch.update(loanRef, {
          currentBalance: 0,
          status: 'completed',
          lastUpdated: serverTimestamp()
        })
        
        // Update loan status in root/loans collection
        const rootLoanRef = doc(db, RootCollection.LOANS, loanId)
        // Check if the loan exists in root collection before updating
        const rootLoanDoc = await getDoc(rootLoanRef)
        if (rootLoanDoc.exists()) {
          batch.update(rootLoanRef, {
            [LOAN_FIELD.STATUS]: 'completed',
            [LOAN_FIELD.LAST_UPDATED]: serverTimestamp()
          })
          console.log('✅ Updated loan status in root/loans collection:', loanId)
        } else {
          console.log('⚠️ Loan not found in root/loans collection:', loanId)
        }
        
        processedLoans.push({
          loanId: loanId,
          amount: amountToDeduct,
          newCurrentBalance: 0
        })
      } else {
        // Partial payment
        console.log('✅ Partial payment for loan:', loanId, 'Amount:', remainingAmount)
        
        const newCurrentBalance = loan.currentBalance - remainingAmount
        
        batch.update(loanRef, {
          currentBalance: newCurrentBalance,
          lastUpdated: serverTimestamp()
        })
        
        processedLoans.push({
          loanId: loanId,
          amount: remainingAmount,
          newCurrentBalance: newCurrentBalance
        })
        
        remainingAmount = 0
      }
      
      console.log('📋 Processed loans:', processedLoans)
      
      // 2. Add money to receiver account
      batch.update(doc(db, RootCollection.BANK_ACCOUNTS, receiverAccount), {
        [BANK_ACCOUNT_FIELD.CURRENT_BANK_BALANCE]: receiverAccountBalance + paidAmount,
        [BANK_ACCOUNT_FIELD.LAST_UPDATED]: serverTimestamp()
      })
      
      // 3. Store payment data in BANK_ACCOUNT.RF_LOANS.LOANID
      if (processedLoans.length > 0) {
        console.log('🔄 Storing payment data in BANK_ACCOUNT.RF_LOANS.LOANID')
        
        const receiverAccountRef = doc(db, RootCollection.BANK_ACCOUNTS, receiverAccount)
        const receiverAccountDoc = await getDoc(receiverAccountRef)
        
        if (receiverAccountDoc.exists()) {
          const accountData = receiverAccountDoc.data()
          const currentRFLoans = accountData[BANK_ACCOUNT_FIELD.RF_LOANS] || {}
          
          console.log('📊 Current RF_LOANS in account:', currentRFLoans)
          
          // Create DDMMYYYY format for current date
          const now = new Date()
          const day = String(now.getDate()).padStart(2, '0')
          const month = String(now.getMonth() + 1).padStart(2, '0')
          const year = String(now.getFullYear())
          const dateKey = `${day}${month}${year}`
          
          console.log('📅 Date key for payment:', dateKey)
          
          // Update the specific loan's payment history
          const updatedRFLoans = { ...currentRFLoans }
          
          for (const processedLoan of processedLoans) {
            console.log('🔄 Processing loan for payment storage:', processedLoan.loanId, 'Amount:', processedLoan.amount)
            
            // Get the regId for this loan
            const loanRef = doc(db, RootCollection.PROFILES, paymentData.regId, ProfileField.RF_LOANS, processedLoan.loanId)
            const loanDoc = await getDoc(loanRef)
            if (!loanDoc.exists()) continue
            
            const loanData = loanDoc.data()
            const regId = loanData[RF_LOAN_FIELD.REG_ID] || paymentData.regId
            
            console.log('📊 Processing payment for regId:', regId, 'Amount:', processedLoan.amount)
            
            // Check if there's already a payment for this regId on this date
            const existingDateKey = Object.keys(updatedRFLoans[regId] || {}).find(key => key.startsWith(dateKey))
            
            if (existingDateKey) {
              // Extract existing amount and add new amount
              const existingAmount = parseInt(existingDateKey.split(':')[1]) || 0
              const newAmount = existingAmount + processedLoan.amount
              const newDateKey = `${dateKey}:${newAmount}`
              
              // Remove old entry and add new one
              delete updatedRFLoans[regId][existingDateKey]
              if (!updatedRFLoans[regId]) updatedRFLoans[regId] = {}
              updatedRFLoans[regId][newDateKey] = true
              
              console.log('💰 Updated existing payment:', { existingAmount, newAmount, newDateKey })
            } else {
              // Create new payment entry
              if (!updatedRFLoans[regId]) updatedRFLoans[regId] = {}
              const newDateKey = `${dateKey}:${processedLoan.amount}`
              updatedRFLoans[regId][newDateKey] = true
              
              console.log('💰 Created new payment:', { newDateKey })
            }
            
            console.log('✅ Updated regId data for', regId, ':', updatedRFLoans[regId])
          }
          
          console.log('📊 Final updated RF_LOANS:', updatedRFLoans)
          
          batch.update(receiverAccountRef, {
            [BANK_ACCOUNT_FIELD.RF_LOANS]: updatedRFLoans,
            [BANK_ACCOUNT_FIELD.LAST_UPDATED]: serverTimestamp()
          })
          
          console.log('✅ Successfully updated BANK_ACCOUNT.RF_LOANS with payment data')
        } else {
          console.log('⚠️ Receiver account document does not exist')
        }
      } else {
        console.log('⚠️ No processed loans to store payment data for')
      }
      
      // 4. Add transaction to wereSL transaction history
      const transactionData = {
        type: 'payment_approval',
        paymentId: paymentId,
        regId: paymentData.regId,
        loanId: loanId, // Add the specific loan ID
        amount: paidAmount,
        receiverAccount: receiverAccount,
        receiverAccountPreviousBalance: receiverAccountBalance,
        receiverAccountNewBalance: receiverAccountBalance + paidAmount,
        timestamp: serverTimestamp(),
        description: `External Transaction: Rs. ${paidAmount.toLocaleString()} to ${receiverAccount} for payment approval (${paymentData.regId} - ${loanId})`
      }
      
      const transactionRef = doc(collection(db, RootCollection.BANK_ACCOUNTS, 'wereSL', 'transactions'))
      batch.set(transactionRef, transactionData)
      
      // 5. Update payment status to approved
      batch.update(paymentRef, {
        [RF_RETURN_RECORD_FIELD.STATUS]: 'approved',
        [RF_RETURN_RECORD_FIELD.PAID_AMOUNT]: paidAmount,
        approvedAt: serverTimestamp(),
        lastUpdated: serverTimestamp()
      })
      
      // 6. Add payment to profile's RF_RETURN_HISTORY as RRH object
      const profileRef = doc(db, RootCollection.PROFILES, paymentData.regId)
      const profileDoc = await getDoc(profileRef)
      
      if (profileDoc.exists()) {
        const profileData = profileDoc.data()
        const currentHistory = profileData[ProfileField.RF_RETURN_HISTORY] || {}
        
        // Generate RRH ID
        const rrhId = generateRRHId(paymentData.regId)
        
        // Create RRH object
        const rrhObject = {
          RRH_ID: rrhId,
          approvedDate: new Date().toISOString(),
          amount: paidAmount,
          receiver: paymentData.receiver || 'weresl',
          regID: paymentData.regId,
          DRIVE_LINK_ID: paymentData.receiptLinkId || ''
        }
        
        // Add RRH object to history
        const updatedHistory = {
          ...currentHistory,
          [rrhId]: rrhObject
        }
        
        batch.update(profileRef, {
          [ProfileField.RF_RETURN_HISTORY]: updatedHistory,
          lastUpdated: serverTimestamp()
        })
      }

      // 7. Add payment to loan's loanHistory array and update paymentIntegrity
      for (const processedLoan of processedLoans) {
        const loanRef = doc(db, RootCollection.PROFILES, paymentData.regId, ProfileField.RF_LOANS, processedLoan.loanId)
        const loanDoc = await getDoc(loanRef)
        
        if (loanDoc.exists()) {
          const loanData = loanDoc.data()
          const currentLoanHistory = loanData.loanHistory || []
          
          // Create new payment record
          const now = new Date()
          const day = String(now.getDate()).padStart(2, '0')
          const month = String(now.getMonth() + 1).padStart(2, '0')
          const year = now.getFullYear()
          const dateString = `${day}-${month}-${year}`
          
          const newPaymentRecord = {
            amount: processedLoan.amount.toString(),
            date: dateString,
            receipt_link_ID: extractFileId(paymentData[RF_RETURN_RECORD_FIELD.RECEIPT_DRIVE_LINK_ID]) || ''
          }
          
          // Add to loanHistory array
          const updatedLoanHistory = [...currentLoanHistory, newPaymentRecord]
          
          // Calculate payment integrity using the new current balance from processed loan
          const originalLoanAmount = loanData.amount || 0
          const totalPayments = updatedLoanHistory.reduce((sum, payment) => sum + parseFloat(payment.amount), 0)
          const newCurrentBalance = processedLoan.newCurrentBalance || 0
          const paymentIntegrity = (newCurrentBalance + totalPayments) === originalLoanAmount
          
          console.log('📊 Payment integrity calculation:', {
            originalAmount: originalLoanAmount,
            totalPayments,
            newCurrentBalance,
            paymentIntegrity
          })
          
          // Update loan with new history and integrity
          batch.update(loanRef, {
            loanHistory: updatedLoanHistory,
            paymentIntegrity: paymentIntegrity,
            lastUpdated: serverTimestamp()
          })
          
          console.log('✅ Updated loan with payment history and integrity check')
        }
      }
      
      // Commit all changes
      await batch.commit()
      
      console.log('✅ Payment approval completed successfully for specific loan')
      return { success: true }
    } catch (error) {
      console.error('❌ Error in payment approval for specific loan:', error)
      return { success: false, message: error.message }
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
      
      const profiles = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      
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
      const sourcesQuery = query(collection(db, RootCollection.BANK_ACCOUNTS))
      const sourcesSnapshot = await getDocs(sourcesQuery)
      
      const sources = sourcesSnapshot.docs.map(doc => doc.id)
      
      return sources
    } catch (error) {
      console.error('❌ Error getting available sources:', error)
      return []
    }
  },

  // Update payment
  async updatePayment(paymentId, updateData) {
    try { 
      
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
      
      return { success: true }
    } catch (error) {
      console.error('❌ Error updating payment:', error)
      throw error
    }
  },

  // Get pending GIF return records
  async getPendingGIFReturns() {
    try {
      const gifReturnsQuery = query(collection(db, RootCollection.GIF_RETURN_RECORD))
      const gifReturnsSnapshot = await getDocs(gifReturnsQuery)
      
      const pendingGIFReturns = []
      
      for (const gifReturnDoc of gifReturnsSnapshot.docs) {
        const gifReturnData = gifReturnDoc.data()
        
        // Only process pending GIF returns
        if (gifReturnData[GIF_RETURN_RECORD_FIELD.STATUS] === 'pending') {
          
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
              
              pendingGIFReturns.push(gifReturnObject)
            }
          } catch (error) {
            console.error('❌ Error processing GIF return for', gifReturnData.regId, ':', error)
          }
        }
      }
      
      return pendingGIFReturns
    } catch (error) {
      console.error('❌ Error getting pending GIF returns:', error)
      throw error
    }
  },

  // Approve GIF return
  async approveGIFReturn(gifReturnId) {
    try {
      
      // Get the GIF return data
      const gifReturnRef = doc(db, RootCollection.GIF_RETURN_RECORD, gifReturnId)
      const gifReturnDoc = await getDoc(gifReturnRef)
      
      if (!gifReturnDoc.exists()) {
        throw new Error('GIF return not found')
      }
      
      const gifReturnData = gifReturnDoc.data()
      
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
        
        const updatedGIF = {
          ...currentGIF,
          [gifTimestamp]: gifDescription
        }
        
        await updateDoc(profileRef, {
          [ProfileField.GIF]: updatedGIF,
          lastUpdated: serverTimestamp()
        })
        
      }
      
      return { success: true }
    } catch (error) {
      console.error('❌ Error approving GIF return:', error)
      throw error
    }
  },

  // Update GIF return
  async updateGIFReturn(gifReturnId, updateData) {
    try {
      
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
      
      return { success: true }
    } catch (error) {
      console.error('❌ Error updating GIF return:', error)
      throw error
    }
  },

  // Generate new loan ID
  async generateNewLoanId(regId, loanType = 'RF') {
    try {
      const loanId = await generateLoanId(regId, loanType)
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
      console.log('🔄 Getting all bank accounts from utils...')
      const result = await getAllBankAccountsUtil()
      console.log('📊 Bank accounts result:', result)
      
      if (!result.success) {
        console.error('❌ Failed to get bank accounts:', result.message)
        return { success: false, message: result.message }
      }
      
      console.log('✅ Successfully got bank accounts:', result.data.length, 'accounts')
      return { success: true, data: result.data }
    } catch (error) {
      console.error('❌ Error getting bank accounts:', error)
      return { success: false, message: error.message }
    }
  },

  // Get bank balance by name
  async getBankBalanceByName(name) {
    try {
      const result = await getBankBalanceByNameUtil(name)
      
      if (!result.success) {
        console.error('❌ Failed to get bank balance:', result.message)
        return null
      }
      
      return result.data
    } catch (error) {
      console.error('❌ Error getting bank balance:', error)
      throw error
    }
  },

  // Update bank balance
  async updateBankBalance(name, newAmount) {
    try {
      const result = await updateBankBalanceUtil(name, newAmount)
      
      if (!result.success) {
        console.error('❌ Failed to update bank balance:', result.message)
        throw new Error(result.message)
      }
      
      return result.data
    } catch (error) {
      console.error('❌ Error updating bank balance:', error)
      throw error
    }
  },

  // Transfer money between accounts
  async transferMoneyBetweenAccounts(fromAccount, toAccount, amount) {
    try {
      const result = await transferMoneyBetweenAccountsUtil(fromAccount, toAccount, amount)
      
      if (!result.success) {
        console.error('❌ Failed to transfer money:', result.message)
        throw new Error(result.message)
      }
      
      return result.data
    } catch (error) {
      console.error('❌ Error transferring money:', error)
      throw error
    }
  },

  // Get wereSL Transaction History
  async getWereSLTransactionHistory() {
    try {
      const result = await getWereSLTransactionHistoryUtil()
      
      if (!result.success) {
        console.error('❌ Failed to get transaction history:', result.message)
        return []
      }
      
      return result.data
    } catch (error) {
      console.error('❌ Error getting transaction history:', error)
      throw error
    }
  }
}

export default adminDbService 