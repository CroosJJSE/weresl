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
import { getFirestore } from 'firebase/firestore'
import firebaseConfig from '../../firebase-config.js'
import { initializeApp } from 'firebase/app'

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
import { RootCollection, SearchElementDoc, ProfileField } from '../enums/db.js'

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
    
    const loanToSave = {
      ...loanData,
      createdAt: serverTimestamp(),
      lastUpdated: serverTimestamp()
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

