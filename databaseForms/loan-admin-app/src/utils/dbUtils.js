/**
 * Database Utility Functions
 * Common Firestore operations used across all projects
 */

import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  setDoc,
  query, 
  where, 
  orderBy,
  writeBatch,
  serverTimestamp 
} from 'firebase/firestore'
import { db } from '../firebase/index.js'
import { RootCollection, SearchElementDoc, ProfileField, RF_LOAN_FIELD, GRANT_FIELD, BANK_ACCOUNT_FIELD, BANK_ACCOUNT_FIELD_TYPES } from '../enums/db.js'

/**
 * Get profile by Registration ID
 */
export const getProfileByRegId = async (regId) => {
  try {
    const profileRef = doc(db, RootCollection.PROFILES, regId)
    const profileDoc = await getDoc(profileRef)
    
    if (!profileDoc.exists()) {
      return { success: false, message: 'Profile not found', data: null }
    }
    
    return { success: true, data: { id: profileDoc.id, ...profileDoc.data() } }
  } catch (error) {
    console.error('Error getting profile:', error)
    return { success: false, message: 'Failed to get profile', error }
  }
}

/**
 * Get all profiles with optional filtering
 */
export const getAllProfiles = async (filters = {}) => {
  try {
    let q = collection(db, RootCollection.PROFILES)
    
    // Apply filters
    if (filters.district) {
      q = query(q, where('district', '==', filters.district))
    }
    
    if (filters.searchTerm) {
      q = query(q, where('fullName', '>=', filters.searchTerm), where('fullName', '<=', filters.searchTerm + '\uf8ff'))
    }
    
    // Add ordering
    q = query(q, orderBy('createdAt', 'desc'))
    
    const snapshot = await getDocs(q)
    const profiles = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    
    return { success: true, data: profiles }
  } catch (error) {
    console.error('Error getting profiles:', error)
    return { success: false, message: 'Failed to get profiles', error }
  }
}

/**
 * Create or update profile
 */
export const saveProfile = async (profileData, regId = null) => {
  try {
    const profileToSave = {
      ...profileData,
      lastUpdated: serverTimestamp()
    }
    
    if (!regId) {
      // Create new profile
      profileToSave.createdAt = serverTimestamp()
      const docRef = await addDoc(collection(db, RootCollection.PROFILES), profileToSave)
      return { success: true, data: { id: docRef.id, ...profileToSave } }
    } else {
      // Update existing profile
      const profileRef = doc(db, RootCollection.PROFILES, regId)
      await updateDoc(profileRef, profileToSave)
      return { success: true, data: { id: regId, ...profileToSave } }
    }
  } catch (error) {
    console.error('Error saving profile:', error)
    return { success: false, message: 'Failed to save profile', error }
  }
}

/**
 * Get RF loans for a profile
 */
export const getRFLoans = async (regId) => {
  try {
    const rfLoansQuery = query(collection(db, RootCollection.PROFILES, regId, ProfileField.RF_LOANS))
    const snapshot = await getDocs(rfLoansQuery)
    
    const loans = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    
    return { success: true, data: loans }
  } catch (error) {
    console.error('Error getting RF loans:', error)
    return { success: false, message: 'Failed to get RF loans', error }
  }
}

/**
 * Get Grant loans for a profile
 */
export const getGrantLoans = async (regId) => {
  try {
    const grantQuery = query(collection(db, RootCollection.PROFILES, regId, ProfileField.GRANT))
    const snapshot = await getDocs(grantQuery)
    
    const loans = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    
    return { success: true, data: loans }
  } catch (error) {
    console.error('Error getting Grant loans:', error)
    return { success: false, message: 'Failed to get Grant loans', error }
  }
}

/**
 * Add loan to profile
 */
export const addLoan = async (regId, loanData, loanType = 'RF') => {
  try {
    console.log('🔧 addLoan called with:', { regId, loanType, loanData })
    
    if (!regId) {
      throw new Error('Registration ID is required')
    }
    
    if (!loanData.loanId) {
      throw new Error('Loan ID is required')
    }
    
    const collectionName = loanType === 'RF' ? ProfileField.RF_LOANS : ProfileField.GRANT
    console.log('📁 Using collection name:', collectionName)
    console.log('📁 RootCollection.PROFILES:', RootCollection.PROFILES)
    
    // Debug: Log the enum values
    console.log('🔍 RF_LOAN_FIELD.LOAN_HISTORY:', RF_LOAN_FIELD.LOAN_HISTORY)
    console.log('🔍 RF_LOAN_FIELD.PAYMENT_INTEGRITY:', RF_LOAN_FIELD.PAYMENT_INTEGRITY)
    
    const loanToSave = {
      ...loanData,
      createdAt: serverTimestamp(),
      lastUpdated: serverTimestamp()
    }
    
    // Only add loanHistory and paymentIntegrity for RF loans
    if (loanType === 'RF') {
      loanToSave.loanHistory = [] // Initialize empty loan history array
      loanToSave.paymentIntegrity = true // Initialize payment integrity as true (no payments yet)
    }
    
    console.log('📝 Creating collection path:', [RootCollection.PROFILES, regId, collectionName])
    // Use setDoc with the loanId as document ID instead of addDoc
    const loanRef = doc(db, RootCollection.PROFILES, regId, collectionName, loanData.loanId)
    await setDoc(loanRef, loanToSave)
    
    console.log('✅ Loan added successfully with ID:', loanData.loanId)
    return { success: true, data: { id: loanData.loanId, ...loanToSave } }
  } catch (error) {
    console.error('❌ Error adding loan:', error)
    return { success: false, message: 'Failed to add loan', error }
  }
}

/**
 * Update loan
 */
export const updateLoan = async (regId, loanId, loanData, loanType = 'RF') => {
  try {
    const collectionName = loanType === 'RF' ? ProfileField.RF_LOANS : ProfileField.GRANT
    const loanRef = doc(db, RootCollection.PROFILES, regId, collectionName, loanId)
    
    const updateData = {
      ...loanData,
      lastUpdated: serverTimestamp()
    }
    
    await updateDoc(loanRef, updateData)
    
    return { success: true, data: { id: loanId, ...updateData } }
  } catch (error) {
    console.error('Error updating loan:', error)
    return { success: false, message: 'Failed to update loan', error }
  }
}

/**
 * Get pending loans from SearchElements
 */
export const getPendingLoans = async () => {
  try {
    const pendingLoanRef = doc(db, RootCollection.SEARCH_ELEMENTS, SearchElementDoc.PENDING_LOAN)
    const pendingLoanDoc = await getDoc(pendingLoanRef)
    
    if (!pendingLoanDoc.exists()) {
      return { success: true, data: [] }
    }
    
    const pendingData = pendingLoanDoc.data()
    console.log('📋 Pending loan data:', pendingData)
    
    // Extract loan objects from the pending data
    // The structure is now: { regId: { loanId: 'RF_MAN001_01', regId: 'MAN001', ... } }
    const pendingLoans = Object.entries(pendingData).map(([regId, loanData]) => ({
      regId,
      ...loanData
    })).filter(loan => loan.regId && loan.loanId)
    
    console.log('📋 Extracted pending loans:', pendingLoans)
    
    return { success: true, data: pendingLoans }
  } catch (error) {
    console.error('Error getting pending loans:', error)
    return { success: false, message: 'Failed to get pending loans', error }
  }
}

/**
 * Add system log
 */
export const addSystemLog = async (logData) => {
  try {
    const logToSave = {
      ...logData,
      logTimestamp: serverTimestamp()
    }
    
    const docRef = await addDoc(collection(db, 'systemLogs'), logToSave)
    
    return { success: true, data: { id: docRef.id, ...logToSave } }
  } catch (error) {
    console.error('Error adding system log:', error)
    return { success: false, message: 'Failed to add system log', error }
  }
}

/**
 * Search profiles by NIC
 */
export const searchProfilesByNIC = async (nic) => {
  // Search in the search elements collection NIC_data document which has ${nic} as the field name and value as ${regId} 
  try {
    const q = query(collection(db, RootCollection.SEARCH_ELEMENTS, SearchElementDoc.NIC_DATA), where(`${nic}`, '==', nic))
    const snapshot = await getDocs(q)
    
    const profiles = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    
    return { success: true, data: profiles }
  } catch (error) {
    console.error('Error searching profiles by NIC:', error)
    return { success: false, message: 'Failed to search profiles', error }
  }
}

/**
 * Batch operations for multiple updates
 */
export const batchUpdate = async (operations) => {
  try {
    const batch = writeBatch(db)
    
    operations.forEach(operation => {
      const { type, path, data } = operation
      const docRef = doc(db, ...path)
      
      switch (type) {
        case 'set':
          batch.set(docRef, data)
          break
        case 'update':
          batch.update(docRef, data)
          break
        case 'delete':
          batch.delete(docRef)
          break
      }
    })
    
    await batch.commit()
    
    return { success: true, message: 'Batch operation completed' }
  } catch (error) {
    console.error('Error in batch operation:', error)
    return { success: false, message: 'Failed to complete batch operation', error }
  }
}

/**
 * Delete profile and all subcollections
 */
export const deleteProfile = async (regId) => {
  try {
    // Delete RF loans
    const rfLoans = await getRFLoans(regId)
    if (rfLoans.success) {
      const batch = writeBatch(db)
      rfLoans.data.forEach(loan => {
        const loanRef = doc(db, RootCollection.PROFILES, regId, ProfileField.RF_LOANS, loan.id)
        batch.delete(loanRef)
      })
      await batch.commit()
    }
    
    // Delete Grant loans
    const grantLoans = await getGrantLoans(regId)
    if (grantLoans.success) {
      const batch = writeBatch(db)
      grantLoans.data.forEach(loan => {
        const loanRef = doc(db, RootCollection.PROFILES, regId, ProfileField.GRANT, loan.id)
        batch.delete(loanRef)
      })
      await batch.commit()
    }    
    // Delete profile
          const profileRef = doc(db, RootCollection.PROFILES, regId)
    await deleteDoc(profileRef)
    // delete from search elements in pending loans 
    const pendingLoans = await getPendingLoans()
    if (pendingLoans.success && pendingLoans.data.includes(regId)) {
      const batch = writeBatch(db)
              batch.delete(doc(db, RootCollection.SEARCH_ELEMENTS, SearchElementDoc.PENDING_LOAN, regId))
      await batch.commit()
    }

    // delete from search elements in NIC data
    const nicData = await searchProfilesByNIC(regId)
    if (nicData.success && nicData.data.length > 0) {
      const batch = writeBatch(db)
      nicData.data.forEach(nic => {
        batch.delete(doc(db, RootCollection.SEARCH_ELEMENTS, SearchElementDoc.NIC_DATA, nic.id))
      })
      await batch.commit()
    }
    return { success: true, message: 'Profile deleted successfully' }
  } catch (error) {
    console.error('Error deleting profile:', error)
    return { success: false, message: 'Failed to delete profile', error }
  }
}

/**
 * Generate RF Loan ID based on registration ID and existing loans
 * @param {string} regId - Registration ID (e.g., 'MAN001')
 * @returns {Promise<string>} Generated RF Loan ID (e.g., 'RF_MAN001_01')
 */
export const generateRFLoanId = async (regId) => {
  try {
    if (!regId || typeof regId !== 'string') {
      throw new Error('Invalid registration ID provided')
    }
    const rfLoansResult = await getRFLoans(regId)
    
    if (!rfLoansResult.success) {
      throw new Error('Failed to fetch existing RF loans')
    }
    const existingLoans = rfLoansResult.data || []
    const nextLoanNumber = existingLoans.length + 1
    const formattedLoanNumber = nextLoanNumber.toString().padStart(2, '0')
    const rfLoanId = `RF_${regId}_${formattedLoanNumber}`
    return rfLoanId
  } catch (error) {
    console.error('Error generating RF Loan ID:', error)
    throw error
  }
}

/**
 * Generate Grant Loan ID based on registration ID and existing loans
 * @param {string} regId - Registration ID (e.g., 'MAN001')
 * @returns {Promise<string>} Generated Grant Loan ID (e.g., 'GRANT_MAN001_01')
 */
export const generateGrantLoanId = async (regId) => {
  try {
    if (!regId || typeof regId !== 'string') {
      throw new Error('Invalid registration ID provided')
    }

    const grantLoansResult = await getGrantLoans(regId)
    
    if (!grantLoansResult.success) {
      throw new Error('Failed to fetch existing Grant loans')
    }

    const existingLoans = grantLoansResult.data || []
    
    const nextLoanNumber = existingLoans.length + 1
    
    const formattedLoanNumber = nextLoanNumber.toString().padStart(2, '0')
    
    const grantLoanId = `GRANT_${regId}_${formattedLoanNumber}`
    
    return grantLoanId
  } catch (error) {
    console.error('Error generating Grant Loan ID:', error)
    throw error
  }
}

/**
 * Generate Loan ID based on loan type and registration ID
 * @param {string} regId - Registration ID (e.g., 'MAN001')
 * @param {string} loanType - Loan type ('RF' or 'GRANT')
 * @returns {Promise<string>} Generated Loan ID
 */
export const generateLoanId = async (regId, loanType = 'RF') => {
  try {
    switch (loanType.toUpperCase()) {
      case 'RF':
        return await generateRFLoanId(regId)
      case 'GRANT':
        return await generateGrantLoanId(regId)
      default:
        throw new Error(`Invalid loan type: ${loanType}. Must be 'RF' or 'GRANT'`)
    }
  } catch (error) {
    console.error('Error generating loan ID:', error)
    throw error
  }
}

/**
 * Get all bank accounts
 */
export const getAllBankAccounts = async () => {
  try {
    const bankAccountsQuery = query(collection(db, RootCollection.BANK_ACCOUNTS))
    const snapshot = await getDocs(bankAccountsQuery)
    
    const bankAccounts = snapshot.docs.map(doc => ({
      name: doc.id,
      ...doc.data()
    }))
    
    return { success: true, data: bankAccounts }
  } catch (error) {
    console.error('Error getting bank accounts:', error)
    return { success: false, message: 'Failed to get bank accounts', error }
  }
}

/**
 * Transfer money between bank accounts
 */
export const transferMoneyBetweenAccounts = async (fromAccount, toAccount, amount) => {
  try {
    // Validate inputs
    if (!fromAccount || !toAccount || !amount) {
      return { success: false, message: 'All parameters are required' }
    }
    
    if (fromAccount === toAccount) {
      return { success: false, message: 'Cannot transfer to the same account' }
    }
    
    if (typeof amount !== 'number' || amount <= 0) {
      return { success: false, message: 'Amount must be a positive number' }
    }
    
    // Get source account balance
    const fromAccountResult = await getBankBalanceByName(fromAccount)
    if (!fromAccountResult.success) {
      return { success: false, message: `Source account '${fromAccount}' not found` }
    }
    
    const fromAccountBalance = fromAccountResult.data.balance
    
    // Check if sufficient balance
    if (fromAccountBalance < amount) {
      return { 
        success: false, 
        message: `Insufficient balance. Available: Rs. ${fromAccountBalance.toLocaleString()}, Required: Rs. ${amount.toLocaleString()}` 
      }
    }
    
    // Get destination account
    const toAccountResult = await getBankBalanceByName(toAccount)
    if (!toAccountResult.success) {
      return { success: false, message: `Destination account '${toAccount}' not found` }
    }
    
    // Perform the transfer using batch operation
    const batch = writeBatch(db)
    
    // Update source account balance
    const fromAccountRef = doc(db, RootCollection.BANK_ACCOUNTS, fromAccount)
    batch.update(fromAccountRef, {
      [BANK_ACCOUNT_FIELD.CURRENT_BANK_BALANCE]: fromAccountBalance - amount,
      [BANK_ACCOUNT_FIELD.LAST_UPDATED]: serverTimestamp()
    })
    
    // Update destination account balance
    const toAccountRef = doc(db, RootCollection.BANK_ACCOUNTS, toAccount)
    const toAccountBalance = toAccountResult.data.balance
    batch.update(toAccountRef, {
      [BANK_ACCOUNT_FIELD.CURRENT_BANK_BALANCE]: toAccountBalance + amount,
      [BANK_ACCOUNT_FIELD.LAST_UPDATED]: serverTimestamp()
    })
    
    // Add transaction to wereSL transaction history
    const transactionData = {
      type: 'transfer',
      fromAccount: fromAccount,
      toAccount: toAccount,
      amount: amount,
      fromAccountPreviousBalance: fromAccountBalance,
      fromAccountNewBalance: fromAccountBalance - amount,
      toAccountPreviousBalance: toAccountBalance,
      toAccountNewBalance: toAccountBalance + amount,
      timestamp: serverTimestamp(),
      description: `Internal Transaction: Rs. ${amount.toLocaleString()} from ${fromAccount} to ${toAccount}`
    }
    
    const transactionRef = doc(collection(db, RootCollection.BANK_ACCOUNTS, 'wereSL', 'transactions'))
    batch.set(transactionRef, transactionData)
    
    // Commit the batch
    await batch.commit()
    
    return { 
      success: true, 
      message: `Successfully transferred Rs. ${amount.toLocaleString()} from ${fromAccount} to ${toAccount}`,
      data: {
        fromAccount: {
          name: fromAccount,
          previousBalance: fromAccountBalance,
          newBalance: fromAccountBalance - amount
        },
        toAccount: {
          name: toAccount,
          previousBalance: toAccountBalance,
          newBalance: toAccountBalance + amount
        },
        transferAmount: amount,
        transactionId: transactionRef.id
      }
    }
  } catch (error) {
    console.error('Error transferring money:', error)
    return { success: false, message: 'Failed to transfer money', error }
  }
}

/**
 * Get bank account balance by name
 */
export const getBankBalanceByName = async (name) => {
  try {
    const bankAccountRef = doc(db, RootCollection.BANK_ACCOUNTS, name)
    const bankAccountDoc = await getDoc(bankAccountRef)
    
    if (!bankAccountDoc.exists()) {
      return { success: false, message: 'Bank account not found', data: null }
    }
    
    const data = bankAccountDoc.data()
    const balance = data[BANK_ACCOUNT_FIELD.CURRENT_BANK_BALANCE] || 0
    
    return { 
      success: true, 
      data: { 
        name: bankAccountDoc.id,
        balance: balance,
        firstName: data[BANK_ACCOUNT_FIELD.FIRST_NAME],
        lastName: data[BANK_ACCOUNT_FIELD.LAST_NAME],
        position: data[BANK_ACCOUNT_FIELD.POSITION]
      } 
    }
  } catch (error) {
    console.error('Error getting bank balance:', error)
    return { success: false, message: 'Failed to get bank balance', error }
  }
}

/**
 * Update bank balance by name
 */
export const updateBankBalance = async (name, newAmount) => {
  try {
    // Validate amount
    if (typeof newAmount !== 'number' || isNaN(newAmount)) {
      return { success: false, message: 'Invalid amount provided' }
    }
    
    const bankAccountRef = doc(db, RootCollection.BANK_ACCOUNTS, name)
    const bankAccountDoc = await getDoc(bankAccountRef)
    
    if (!bankAccountDoc.exists()) {
      return { success: false, message: 'Bank account not found' }
    }
    
    const currentBalance = bankAccountDoc.data()[BANK_ACCOUNT_FIELD.CURRENT_BANK_BALANCE] || 0
    const balanceChange = newAmount - currentBalance
    
    // Update the bank balance
    await updateDoc(bankAccountRef, {
      [BANK_ACCOUNT_FIELD.CURRENT_BANK_BALANCE]: newAmount,
      [BANK_ACCOUNT_FIELD.LAST_UPDATED]: serverTimestamp()
    })
    
    // Add transaction to wereSL transaction history if it's the wereSL account
    if (name === 'wereSL') {
      const transactionData = {
        type: 'balance_update',
        accountName: name,
        previousBalance: currentBalance,
        newBalance: newAmount,
        balanceChange: balanceChange,
        timestamp: serverTimestamp(),
        description: balanceChange > 0 
          ? `Balance increased by Rs. ${balanceChange.toLocaleString()}`
          : `Balance decreased by Rs. ${Math.abs(balanceChange).toLocaleString()}`
      }
      
      const transactionRef = doc(collection(db, RootCollection.BANK_ACCOUNTS, 'wereSL', 'transactions'))
      await setDoc(transactionRef, transactionData)
    }
    
    return { 
      success: true, 
      message: 'Bank balance updated successfully',
      data: {
        name: name,
        newBalance: newAmount,
        previousBalance: currentBalance,
        balanceChange: balanceChange,
        firstName: bankAccountDoc.data()[BANK_ACCOUNT_FIELD.FIRST_NAME],
        lastName: bankAccountDoc.data()[BANK_ACCOUNT_FIELD.LAST_NAME],
        position: bankAccountDoc.data()[BANK_ACCOUNT_FIELD.POSITION]
      }
    }
  } catch (error) {
    console.error('Error updating bank balance:', error)
    return { success: false, message: 'Failed to update bank balance', error }
  }
}

/**
 * Get transaction history for wereSL account
 */
export const getWereSLTransactionHistory = async (limit = 50) => {
  try {
    const transactionsQuery = query(
      collection(db, RootCollection.BANK_ACCOUNTS, 'wereSL', 'transactions'),
      orderBy('timestamp', 'desc')
    )
    const snapshot = await getDocs(transactionsQuery)
    
    const transactions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    
    return { success: true, data: transactions }
  } catch (error) {
    console.error('Error getting transaction history:', error)
    return { success: false, message: 'Failed to get transaction history', error }
  }
}

/**
 * Convert profile data to Google Sheet Main tab format
 * Formats RF loans and Grant loans according to GAS requirements
 * @param {Object} profile - Profile data from Firestore
 * @returns {Promise<Object>} Formatted data for Main tab
 */
export const convertProfileToMainTabFormat = async (profile) => {
  try {
    if (!profile || !profile[ProfileField.REG_ID]) {
      throw new Error('Invalid profile data: missing Reg_ID')
    }

    const regId = profile[ProfileField.REG_ID] || profile.regId || profile.id

    // Get RF loans for the profile
    const rfLoansResult = await getRFLoans(regId)
    const rfLoans = rfLoansResult.success ? rfLoansResult.data : []

    // Get Grant loans for the profile
    const grantLoansResult = await getGrantLoans(regId)
    const grantLoans = grantLoansResult.success ? grantLoansResult.data : []

    console.log(`🔍 DEBUG: Found ${rfLoans.length} RF loans and ${grantLoans.length} Grant loans for ${regId}`)

    // Format loans: loan1[approvedAt date1](amount1)+loan2[date2](amount2)
    const formatLoans = (loans, loanType) => {
      if (!loans || loans.length === 0) {
        console.log(`🔍 DEBUG: No ${loanType} loans found for ${regId}`)
        return 'No'
      }

      console.log(`🔍 DEBUG: Processing ${loans.length} ${loanType} loans for ${regId}:`, loans)

      const formattedLoans = loans
        .filter(loan => {
          // Check for approved status - handle different field names
          const status = loan[RF_LOAN_FIELD.STATUS] || 
                        loan[GRANT_FIELD.STATUS] || 
                        loan.status || 
                        loan.loanStatus ||
                        loan.approvalStatus ||
                        'pending'
          
          console.log(`🔍 DEBUG: Loan ${loan.id} status: ${status}`)
          
          // Accept various approved status formats
          const isApproved = status === 'approved' || 
                           status === 'Approved' || 
                           status === 'APPROVED' ||
                           status === 'active' ||
                           status === 'Active' ||
                           status === 'ACTIVE'
          
          if (!isApproved) {
            console.log(`🔍 DEBUG: Skipping loan ${loan.id} - status: ${status}`)
          }
          
          return isApproved
        })
        .map(loan => {
          let purpose, amount, approvedAt

          if (loanType === 'RF') {
            purpose = loan[RF_LOAN_FIELD.PURPOSE] || 
                     loan.purpose || 
                     loan.projectDescription || 
                     loan.project_description ||
                     loan.description ||
                     'Unknown'
            amount = loan.amount || 
                    loan.amount || 
                    loan.loanAmount || 
                    loan.loan_amount ||
                    0
            approvedAt = loan[RF_LOAN_FIELD.APPROVED_AT] || 
                        loan.approvedAt || 
                        loan.approved_at ||
                        loan.createdAt || 
                        loan.created_at ||
                        loan.initiationDate ||
                        loan.initiation_date
          } else {
            // Grant loans
            purpose = loan[GRANT_FIELD.PURPOSE] || 
                     loan.purpose || 
                     loan.projectDescription || 
                     loan.project_description ||
                     loan.description ||
                     'Unknown'
            amount = loan[GRANT_FIELD.APPROVED_AMOUNT] || 
                    loan.approvedAmount || 
                    loan.approved_amount ||
                    loan.amount || 
                    loan.grantAmount ||
                    loan.grant_amount ||
                    0
            approvedAt = loan[GRANT_FIELD.APPROVED_AT] || 
                        loan.approvedAt || 
                        loan.approved_at ||
                        loan.createdAt || 
                        loan.created_at ||
                        loan.requestedDate ||
                        loan.requested_date
          }

          // Format date
          let dateStr = 'Unknown'
          if (approvedAt) {
            try {
              const date = approvedAt.toDate ? approvedAt.toDate() : new Date(approvedAt)
              dateStr = date.toLocaleDateString('en-GB', { 
                day: '2-digit', 
                month: '2-digit', 
                year: 'numeric' 
              })
            } catch (dateError) {
              console.warn(`⚠️ Error formatting date for loan ${loan.id}:`, dateError)
              dateStr = 'Unknown'
            }
          }

          const formattedLoan = `${purpose}[${dateStr}](${amount})`
          console.log(`🔍 DEBUG: Formatted ${loanType} loan: ${formattedLoan}`)
          return formattedLoan
        })
        .join('+')

      const result = formattedLoans || 'No'
      console.log(`🔍 DEBUG: Final ${loanType} result for ${regId}: ${result}`)
      return result
    }

    // Calculate age from year of birth
    const currentYear = new Date().getFullYear()
    const yearOfBirth = profile[ProfileField.YEAR_OF_BIRTH] || profile.yearOfBirth || profile.Age
    const age = yearOfBirth ? currentYear - yearOfBirth : 'N/A'

    // Prepare the formatted data
    const formattedData = {
      [ProfileField.REG_ID]: regId,
      [ProfileField.DISTRICT]: profile[ProfileField.DISTRICT] || profile.district || profile.District || '',
      [ProfileField.FULL_NAME]: profile[ProfileField.FULL_NAME] || profile.fullName || profile.Name || profile.name || '',
      age: age,
      [ProfileField.ADDRESS]: profile[ProfileField.ADDRESS] || profile.address || profile.Address || '',
      [ProfileField.NIC]: profile[ProfileField.NIC] || profile.nic || profile.NIC || '',
      [ProfileField.PHONE_NUMBER]: profile[ProfileField.PHONE_NUMBER] || profile.phoneNumber || profile.contact || profile.phone || '',
      [ProfileField.DESCRIPTION]: profile[ProfileField.DESCRIPTION] || profile.description || profile.Description || '',
      [ProfileField.OCCUPATION]: profile[ProfileField.OCCUPATION] || profile.occupation || profile.Occupation || '',
      rfLoan: formatLoans(rfLoans, 'RF'),
      grant: formatLoans(grantLoans, 'GRANT')
    }

    console.log('🔍 DEBUG: Converted profile to Main tab format:', formattedData)
    return { success: true, data: formattedData }

  } catch (error) {
    console.error('Error converting profile to Main tab format:', error)
    return { success: false, message: 'Failed to convert profile to Main tab format', error }
  }
}
