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
import { RootCollection, SearchElementDoc, ProfileField, RF_LOAN_FIELD } from '../enums/db.js'
import { LoanType, LoanStatus } from '../enums/loans.js'

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
      q = query(q, where(ProfileField.DISTRICT, '==', filters.district))
    }
    
    if (filters.searchTerm) {
      q = query(q, where(ProfileField.FULL_NAME, '>=', filters.searchTerm), where(ProfileField.FULL_NAME, '<=', filters.searchTerm + '\uf8ff'))
    }
    
    // Add ordering
    q = query(q, orderBy(ProfileField.CREATED_AT, 'desc'))
    
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
      [ProfileField.LAST_UPDATED]: serverTimestamp()
    }
    
    if (!regId) {
      // Create new profile
      profileToSave[ProfileField.CREATED_AT] = serverTimestamp()
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
    const rfLoansRef = collection(db, RootCollection.PROFILES, regId, ProfileField.RF_LOANS)
    const snapshot = await getDocs(rfLoansRef)
    
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
    const grantLoansRef = collection(db, RootCollection.PROFILES, regId, ProfileField.GRANT)
    const snapshot = await getDocs(grantLoansRef)
    
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
export const addLoan = async (regId, loanData, loanType = LoanType.RF) => {
  try {
    const subcollection = loanType === LoanType.RF ? ProfileField.RF_LOANS : ProfileField.GRANT
    const loanRef = collection(db, RootCollection.PROFILES, regId, subcollection)
    
    const loanToSave = {
      ...loanData,
      [ProfileField.REG_ID]: regId,
      [ProfileField.CREATED_AT]: serverTimestamp(),
      [ProfileField.LAST_UPDATED]: serverTimestamp()
    }
    
    const docRef = await addDoc(loanRef, loanToSave)
    return { success: true, data: { id: docRef.id, ...loanToSave } }
  } catch (error) {
    console.error('Error adding loan:', error)
    return { success: false, message: 'Failed to add loan', error }
  }
}

/**
 * Update loan
 */
export const updateLoan = async (regId, loanId, loanData, loanType = LoanType.RF) => {
  try {
    const subcollection = loanType === LoanType.RF ? ProfileField.RF_LOANS : ProfileField.GRANT
    const loanRef = doc(db, RootCollection.PROFILES, regId, subcollection, loanId)
    
    const loanToUpdate = {
      ...loanData,
      [ProfileField.LAST_UPDATED]: serverTimestamp()
    }
    
    await updateDoc(loanRef, loanToUpdate)
    return { success: true, data: { id: loanId, ...loanToUpdate } }
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
    // Extract regIds from the loan objects (each loan has a regId field)
    const pendingRegIds = Object.values(pendingData).map(loan => loan.regId).filter(Boolean)
    
    return { success: true, data: pendingRegIds }
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
    const logRef = collection(db, 'system_logs')
    const logToSave = {
      ...logData,
      timestamp: serverTimestamp()
    }
    
    const docRef = await addDoc(logRef, logToSave)
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
  try {
    console.log('🔍 [searchProfilesByNIC] Starting search for NIC:', nic)
    
    // Search in the SearchElements collection, NIC_data document
    // The NIC_data document has fields where field name = NIC and field value = Reg_ID
    const nicDataDocRef = doc(db, RootCollection.SEARCH_ELEMENTS, SearchElementDoc.NIC_DATA)
    const nicDataDoc = await getDoc(nicDataDocRef)
    
    console.log('📊 [searchProfilesByNIC] NIC data document exists:', nicDataDoc.exists())
    
    if (!nicDataDoc.exists()) {
      console.log('❌ [searchProfilesByNIC] NIC_data document not found')
      return { success: false, message: 'NIC search data not available', data: null }
    }
    
    const nicData = nicDataDoc.data()
    console.log('📋 [searchProfilesByNIC] NIC data fields:', Object.keys(nicData))
    
    // Look for the NIC in the document fields
    const regId = nicData[nic]
    console.log('🔍 [searchProfilesByNIC] Found RegID for NIC', nic, ':', regId)
    
    if (!regId) {
      console.log('❌ [searchProfilesByNIC] No RegID found for NIC:', nic)
      return { success: false, message: 'No profile found with that NIC', data: null }
    }
    
    // Get the profile using the Reg_ID
    console.log('🔍 [searchProfilesByNIC] Fetching profile for RegID:', regId)
    const profileResult = await getProfileByRegId(regId)
    
    if (profileResult.success && profileResult.data) {
      console.log('✅ [searchProfilesByNIC] Profile found:', profileResult.data[ProfileField.FULL_NAME] || profileResult.data.Name || 'N/A')
      return { success: true, data: profileResult.data }
    } else {
      console.log('❌ [searchProfilesByNIC] Profile not found for RegID:', regId)
      return { success: false, message: 'Profile not found', data: null }
    }
    
  } catch (error) {
    console.error('❌ [searchProfilesByNIC] Error searching profiles by NIC:', error)
    return { success: false, message: 'Failed to search profiles by NIC', error }
  }
}

/**
 * Search profiles by name (partial match) - returns all matching profiles
 */
export const searchProfilesByName = async (name) => {
  try {
    console.log('🔍 [searchProfilesByName] Starting search for name:', name)
    
    if (!name || name.trim().length < 2) {
      console.log('❌ [searchProfilesByName] Name too short:', name)
      return { success: false, message: 'Name must be at least 2 characters long', data: null }
    }

    const searchTerm = name.trim().toLowerCase()
    console.log('🔍 [searchProfilesByName] Search term:', searchTerm)
    
    // Get all profiles and filter client-side for partial matches
    // This is necessary because Firestore doesn't support case-insensitive partial matching
    console.log('🔍 [searchProfilesByName] Fetching all profiles for client-side filtering...')
    const q = query(collection(db, RootCollection.PROFILES))
    const snapshot = await getDocs(q)
    console.log('📊 [searchProfilesByName] Total profiles fetched:', snapshot.size)
    
    if (snapshot.empty) {
      console.log('❌ [searchProfilesByName] No profiles in database')
      return { success: false, message: 'No profiles found in database', data: null }
    }

    // Filter profiles client-side for partial name matches
    const allProfiles = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    
    console.log('🔍 [searchProfilesByName] Filtering profiles for partial match...')
    const matchingProfiles = allProfiles.filter(profile => {
      const profileName = (profile[ProfileField.FULL_NAME] || profile.Name || '').toLowerCase()
      const matches = profileName.includes(searchTerm)
      if (matches) {
        console.log('✅ [searchProfilesByName] Match found:', profileName, 'contains', searchTerm)
      }
      return matches
    })
    
    console.log('📊 [searchProfilesByName] Filtering completed. Found matches:', matchingProfiles.length)
    
    if (matchingProfiles.length === 0) {
      console.log('❌ [searchProfilesByName] No profiles found with name:', searchTerm)
      return { success: false, message: 'No profiles found with that name', data: null }
    }

    console.log('✅ [searchProfilesByName] Found profiles:', matchingProfiles.length)
    console.log('📋 [searchProfilesByName] Profile names:', matchingProfiles.map(p => p[ProfileField.FULL_NAME] || p.Name || 'N/A'))
    
    return { success: true, data: matchingProfiles }
  } catch (error) {
    console.error('❌ [searchProfilesByName] Error searching profiles by name:', error)
    return { success: false, message: 'Failed to search profiles by name', error }
  }
}

/**
 * Batch update operations
 */
export const batchUpdate = async (operations) => {
  try {
    const batch = writeBatch(db)
    
    operations.forEach(operation => {
      const { type, path, data } = operation
      const docRef = doc(db, ...path)
      
      if (type === 'set') {
        batch.set(docRef, data)
      } else if (type === 'update') {
        batch.update(docRef, data)
      } else if (type === 'delete') {
        batch.delete(docRef)
      }
    })
    
    await batch.commit()
    return { success: true, message: 'Batch update completed' }
  } catch (error) {
    console.error('Error in batch update:', error)
    return { success: false, message: 'Failed to perform batch update', error }
  }
}

/**
 * Delete profile
 */
export const deleteProfile = async (regId) => {
  try {
    const profileRef = doc(db, RootCollection.PROFILES, regId)
    await deleteDoc(profileRef)
    return { success: true, message: 'Profile deleted successfully' }
  } catch (error) {
    console.error('Error deleting profile:', error)
    return { success: false, message: 'Failed to delete profile', error }
  }
}

/**
 * Generate RF loan ID
 */
export const generateRFLoanId = async (regId) => {
  try {
    const loansResult = await getRFLoans(regId)
    const existingLoans = loansResult.success ? loansResult.data : []
    
    let counter = 1
    let loanId = `RF_${regId}_${counter.toString().padStart(3, '0')}`
    
    while (existingLoans.some(loan => loan.id === loanId)) {
      counter++
      loanId = `RF_${regId}_${counter.toString().padStart(3, '0')}`
    }
    
    return loanId
  } catch (error) {
    console.error('Error generating RF loan ID:', error)
    throw new Error('Failed to generate RF loan ID')
  }
}

/**
 * Generate Grant loan ID
 */
export const generateGrantLoanId = async (regId) => {
  try {
    const loansResult = await getGrantLoans(regId)
    const existingLoans = loansResult.success ? loansResult.data : []
    
    let counter = 1
    let loanId = `GRANT_${regId}_${counter.toString().padStart(3, '0')}`
    
    while (existingLoans.some(loan => loan.id === loanId)) {
      counter++
      loanId = `GRANT_${regId}_${counter.toString().padStart(3, '0')}`
    }
    
    return loanId
  } catch (error) {
    console.error('Error generating Grant loan ID:', error)
    throw new Error('Failed to generate Grant loan ID')
  }
}

/**
 * Generate loan ID based on type
 */
export const generateLoanId = async (regId, loanType = LoanType.RF) => {
  if (loanType === LoanType.RF) {
    return await generateRFLoanId(regId)
  } else if (loanType === LoanType.GRANT) {
    return await generateGrantLoanId(regId)
  } else {
    throw new Error('Invalid loan type')
  }
}

/**
 * Approve pending payment request and update loan balances
 */
export const approvePaymentRequest = async (regId, paymentAmount, loanIds = []) => {
  try {
    console.log('[PAYMENT APPROVAL] Starting approval process:', { regId, paymentAmount, loanIds })
    
    // Get current RF loans
    const rfLoansResult = await getRFLoans(regId)
    if (!rfLoansResult.success) {
      throw new Error('Failed to get RF loans')
    }
    
    const activeLoans = rfLoansResult.data.filter(loan => loan[RF_LOAN_FIELD.STATUS] === LoanStatus.ACTIVE)
    console.log('[PAYMENT APPROVAL] Active loans found:', activeLoans.length)
    
    let remainingPayment = parseFloat(paymentAmount) || 0
    const updatedLoans = []
    const completedLoans = []
    
    // Process each active loan
    for (const loan of activeLoans) {
      const currentBalance = parseFloat(loan[RF_LOAN_FIELD.CURRENT_BALANCE]) || 0
      const loanAmount = parseFloat(loan[RF_LOAN_FIELD.AMOUNT]) || 0
      
      console.log('[PAYMENT APPROVAL] Processing loan:', {
        loanId: loan.id,
        currentBalance,
        loanAmount,
        remainingPayment
      })
      
      if (remainingPayment > 0 && currentBalance > 0) {
        if (currentBalance <= remainingPayment) {
          // Loan completed
          const updatedLoan = {
            ...loan,
            [RF_LOAN_FIELD.CURRENT_BALANCE]: 0,
            [RF_LOAN_FIELD.STATUS]: LoanStatus.COMPLETED,
            [RF_LOAN_FIELD.LAST_UPDATED]: serverTimestamp()
          }
          completedLoans.push(updatedLoan)
          remainingPayment -= currentBalance
          
          console.log('[PAYMENT APPROVAL] Loan completed:', { loanId: loan.id, remainingPayment })
        } else {
          // Partial payment
          const newCurrentBalance = currentBalance - remainingPayment
          const updatedLoan = {
            ...loan,
            [RF_LOAN_FIELD.CURRENT_BALANCE]: newCurrentBalance,
            [RF_LOAN_FIELD.LAST_UPDATED]: serverTimestamp()
          }
          updatedLoans.push(updatedLoan)
          remainingPayment = 0
          
          console.log('[PAYMENT APPROVAL] Loan partially paid:', { 
            loanId: loan.id, 
            newCurrentBalance, 
            remainingPayment 
          })
        }
      } else {
        updatedLoans.push(loan)
      }
    }
    
    // Update all loans using batch write
    const batch = writeBatch(db)
    
    for (const loan of [...updatedLoans, ...completedLoans]) {
      const loanRef = doc(db, RootCollection.PROFILES, regId, ProfileField.RF_LOANS, loan.id)
      batch.update(loanRef, loan)
    }
    
    // Update return history in profile
    const profileRef = doc(db, RootCollection.PROFILES, regId)
    const timestamp = new Date().toISOString()
    const returnEntry = {
      [timestamp]: {
        amount: parseFloat(paymentAmount) - remainingPayment,
        timestamp: serverTimestamp()
      }
    }
    
    batch.update(profileRef, {
      [`${ProfileField.RF_RETURN_HISTORY}.${timestamp}`]: returnEntry[timestamp],
      [ProfileField.LAST_UPDATED]: serverTimestamp()
    })
    
    await batch.commit()
    
    console.log('[PAYMENT APPROVAL] Approval completed:', {
      totalLoansProcessed: updatedLoans.length + completedLoans.length,
      remainingPayment,
      paymentProcessed: parseFloat(paymentAmount) - remainingPayment
    })
    
    return { 
      success: true, 
      message: 'Payment approved successfully',
      data: {
        updatedLoans: [...updatedLoans, ...completedLoans],
        remainingPayment,
        paymentProcessed: parseFloat(paymentAmount) - remainingPayment
      }
    }
  } catch (error) {
    console.error('[PAYMENT APPROVAL] Error:', error)
    return { success: false, message: 'Failed to approve payment', error }
  }
}

export default {
  getProfileByRegId,
  getAllProfiles,
  saveProfile,
  getRFLoans,
  getGrantLoans,
  addLoan,
  updateLoan,
  getPendingLoans,
  addSystemLog,
  searchProfilesByNIC,
  batchUpdate,
  deleteProfile,
  generateRFLoanId,
  generateGrantLoanId,
  generateLoanId,
  approvePaymentRequest
}

