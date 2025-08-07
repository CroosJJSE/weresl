import { initializeApp } from 'firebase/app'
import { 
  getFirestore, 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  serverTimestamp,
  arrayUnion,
  setDoc
} from 'firebase/firestore'
import firebaseConfig from '../../firebase-config.js'
import { RootCollection, ProfileField } from '../enums/db.js'

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export const dbOperations = {
  // Profile Operations
  async createProfile(profileData) {
    try {
      console.log('📝 Creating profile with data:', profileData)
        
      // Use Reg_ID as the document ID
      const regId = profileData.Reg_ID
      const docRef = doc(db, RootCollection.PROFILES, regId)
      
      // Add RF_return_history and GIF as empty maps
      const profileWithDefaults = {
        ...profileData,
        RF_return_history: {},
        GIF: {},
        createdAt: serverTimestamp(),
        lastUpdated: serverTimestamp()
      }
      
      await setDoc(docRef, profileWithDefaults)
      
      console.log('✅ Profile created with ID:', regId)
      return regId
    } catch (error) {
      console.error('❌ Error creating profile:', error)
      throw error
    }
  },

  async getAllProfiles(filters = {}) {
    try {
      let q = query(collection(db, RootCollection.PROFILES))
      
      // Apply filters if provided
      if (filters.district) {
        q = query(q, where('District', '==', filters.district))
      }
      
      if (filters.loanType) {
        // This would need to be handled differently since loans are in subcollections
        console.log('Loan type filtering not implemented yet')
      }
      
      const querySnapshot = await getDocs(q)
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    } catch (error) {
      console.error('Error getting all profiles:', error)
      throw error
    }
  },

  async getProfileByRegId(regId) {
    try {
      console.log('🔍 Searching for RegID:', regId)
      
      // Search by Reg_ID field only
      const q = query(collection(db, RootCollection.PROFILES), where(ProfileField.REG_ID, '==', regId))
      const querySnapshot = await getDocs(q)
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0]
        const profileData = { id: doc.id, ...doc.data() }
        console.log('✅ Found profile by Reg_ID:', profileData)
        return profileData
      }
      
      console.log('❌ No profile found with RegID:', regId)
      return null
    } catch (error) {
      console.error('❌ Error getting profile by RegID:', error)
      throw error
    }
  },

  async updateProfile(profileId, updateData) {
    try {
      const profileRef = doc(db, RootCollection.PROFILES, profileId)
      await updateDoc(profileRef, {
        ...updateData,
        lastUpdated: serverTimestamp()
      })
    } catch (error) {
      console.error('Error updating profile:', error)
      throw error
    }
  },

  // Loan Operations - Updated to handle separate collections
  async addLoan(regId, loanData, loanType = 'RF') {
    try {
      console.log('📝 Adding loan for RegID:', regId)
      console.log('📋 Loan data:', loanData)
      console.log('📋 Loan type:', loanType)
      
      if (!loanData.loanId) {
        throw new Error('Loan ID is required')
      }
      
      let collectionName
      if (loanType === 'RF' || loanData.type === 'RF') {
        collectionName = ProfileField.RF_LOANS
      } else if (loanType === 'GRANT' || loanData.type === 'GRANT') {
        collectionName = ProfileField.GRANT
      } else {
        throw new Error(`Invalid loan type: ${loanType}. Only RF and GRANT are supported.`)
      }
      
      console.log('📁 Using collection:', collectionName)
      
      // Use loanId as document ID
      const docId = loanData.loanId
      console.log('📄 Creating document with ID:', docId)
      
      const loanRef = doc(db, RootCollection.PROFILES, regId, collectionName, docId)
      
      const loanDocument = {
        ...loanData,
        regId: regId,
        loanType: loanType, // Add loan type to document
        createdAt: serverTimestamp(),
        lastUpdated: serverTimestamp()
      }
      
      console.log('📄 Loan document to save:', loanDocument)
      
      await setDoc(loanRef, loanDocument)
      
      console.log('✅ Loan added successfully to collection:', collectionName)
      console.log('✅ Document ID:', docId)
      console.log('✅ Full path:', `profiles/${regId}/${collectionName}/${docId}`)
      
      return { id: docId, ...loanDocument }
    } catch (error) {
      console.error('❌ Error adding loan:', error)
      console.error('❌ Error details:', {
        regId,
        loanType: loanType || loanData.type,
        loanId: loanData.loanId,
        error: error.message
      })
      throw error
    }
  },

  async getLoans(profileId) {
    try {
      const loans = []
      
      // Get RF_Loans
      try {
        const rfQuery = query(collection(db, RootCollection.PROFILES, profileId, 'RF_Loans'))
        const rfSnapshot = await getDocs(rfQuery)
        rfSnapshot.docs.forEach(doc => {
          loans.push({ id: doc.id, ...doc.data(), type: 'RF' })
        })
      } catch (error) {
        console.log('No RF_Loans collection found')
      }
      
      // Get GRANT loans
      try {
        const grantQuery = query(collection(db, RootCollection.PROFILES, profileId, 'GRANT'))
        const grantSnapshot = await getDocs(grantQuery)
        grantSnapshot.docs.forEach(doc => {
          loans.push({ id: doc.id, ...doc.data(), type: 'GRANT' })
        })
      } catch (error) {
        console.log('No GRANT collection found')
      }
      
      return loans.sort((a, b) => b.createdAt?.toDate() - a.createdAt?.toDate())
    } catch (error) {
      console.error('Error getting loans:', error)
      throw error
    }
  },

  async updateLoan(profileId, loanId, updateData) {
    try {
      // Determine which collection to update based on loan type
      const loanRef = doc(db, 'profiles', profileId, 'loans', loanId)
      await updateDoc(loanRef, {
        ...updateData,
        lastUpdated: serverTimestamp()
      })
    } catch (error) {
      console.error('Error updating loan:', error)
      throw error
    }
  },

  // Payment Operations
  async createPayment(profileId, loanId, paymentData) {
    try {
      const paymentRef = await addDoc(collection(db, 'profiles', profileId, 'loans', loanId, 'payments'), {
        ...paymentData,
        createdAt: serverTimestamp()
          })
      return paymentRef
    } catch (error) {
      console.error('Error creating payment:', error)
      throw error
    }
  },

  async getPayments(profileId, loanId) {
    try {
      const q = query(
        collection(db, 'profiles', profileId, 'loans', loanId, 'payments'),
        orderBy('createdAt', 'desc')
      )
      const querySnapshot = await getDocs(q)
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    } catch (error) {
      console.error('Error getting payments:', error)
      throw error
    }
  },

  // Completed Projects Operations
  async addCompletedProjects(profileId, completedProjects) {
    try {
      const profileRef = doc(db, RootCollection.PROFILES, profileId)
      await updateDoc(profileRef, {
        completedProjects: arrayUnion(...completedProjects),
        lastUpdated: serverTimestamp()
      })
    } catch (error) {
      console.error('Error adding completed projects:', error)
      throw error
    }
  },

  // Logging Operations
  async logOperation(operationType, data) {
    try {
      const logRef = await addDoc(collection(db, 'operationLogs'), {
        operationType,
        data,
        timestamp: serverTimestamp()
      })
      return logRef
    } catch (error) {
      console.error('Error logging operation:', error)
      // Don't throw error for logging failures
    }
  },

  // Process Payment
  async processPayment(paymentData) {
    try {
      const profileRef = doc(db, RootCollection.PROFILES, paymentData.regId)
      
      // Update payment history
      await updateDoc(profileRef, {
        [`Payment_history.${Date.now()}`]: {
          type: paymentData.type,
          amount: paymentData.amount || 0,
          details: paymentData.details || '',
          date: serverTimestamp()
        },
        lastUpdated: serverTimestamp()
      })
      
      return { success: true }
    } catch (error) {
      console.error('Error processing payment:', error)
      throw error
    }
  },

  // Utility Operations
  async getProfileById(profileId) {
    try {
      const profileRef = doc(db, RootCollection.PROFILES, profileId)
      const profileSnap = await getDoc(profileRef)
      
      if (profileSnap.exists()) {
        return { id: profileSnap.id, ...profileSnap.data() }
      }
      return null
    } catch (error) {
      console.error('Error getting profile by ID:', error)
      throw error
    }
  },

  // District-based RegID generation
  async generateRegID(district) {
    try {
      console.log('🔧 Generating RegID for district:', district)
      const districtCode = district.substring(0, 3).toUpperCase()
      
      // Get all existing RegIDs for this district - check both field name variations
      let querySnapshot
      
      // Try lowercase 'district' first
    try {
        const q1 = query(
          collection(db, RootCollection.PROFILES),
          where('district', '==', district)
        )
        querySnapshot = await getDocs(q1)
        console.log(`📊 Found ${querySnapshot.size} existing profiles with 'district' field for ${district}`)
      } catch (error) {
        console.log('❌ No profiles found with lowercase "district" field')
        querySnapshot = { size: 0, docs: [] }
      }
      
      // If no results, try uppercase 'District'
      if (querySnapshot.size === 0) {
        try {
          const q2 = query(
            collection(db, RootCollection.PROFILES),
            where('District', '==', district)
          )
          querySnapshot = await getDocs(q2)
          console.log(`📊 Found ${querySnapshot.size} existing profiles with 'District' field for ${district}`)
    } catch (error) {
          console.log('❌ No profiles found with uppercase "District" field')
          querySnapshot = { size: 0, docs: [] }
  }
}

      // If still no results, get all profiles and filter manually
      if (querySnapshot.size === 0) {
        console.log('🔍 Getting all profiles to filter manually...')
        const allProfilesQuery = query(collection(db, RootCollection.PROFILES))
        const allProfilesSnapshot = await getDocs(allProfilesQuery)
        
        const matchingProfiles = allProfilesSnapshot.docs.filter(doc => {
          const data = doc.data()
          return (data.district === district || data.District === district)
        })
        
        querySnapshot = {
          size: matchingProfiles.length,
          docs: matchingProfiles
        }
        console.log(`📊 Found ${querySnapshot.size} existing profiles for ${district} (manual filter)`)
      }
      
      // Extract existing RegIDs and find the highest number
      const existingRegIds = []
      querySnapshot.docs.forEach(doc => {
        const data = doc.data()
        const regId = data.Reg_ID || data.regId || data.reg_id || doc.id
        if (regId && regId.startsWith(districtCode)) {
          existingRegIds.push(regId)
        }
      })
      
      console.log('📋 Existing RegIDs:', existingRegIds)
      
      // Find the highest number
      let nextNumber = 1
      if (existingRegIds.length > 0) {
        const numbers = existingRegIds.map(regId => {
          const numberPart = regId.replace(districtCode, '')
          return parseInt(numberPart) || 0
        })
        nextNumber = Math.max(...numbers) + 1
      }
      
      const newRegId = `${districtCode}${nextNumber.toString().padStart(3, '0')}`
      console.log('✅ Generated new RegID:', newRegId)
      
      return newRegId
    } catch (error) {
      console.error('❌ Error generating RegID:', error)
      throw error
    }
  }
}

export const utils = {
  generateRegId(district, existingIds = []) {
    const districtCode = district.substring(0, 3).toUpperCase()
    
    // Find the highest number from existing IDs
    let nextNumber = 1
    if (existingIds.length > 0) {
      const numbers = existingIds
        .filter(id => id.startsWith(districtCode))
        .map(id => {
          const numberPart = id.replace(districtCode, '')
          return parseInt(numberPart) || 0
        })
      
      if (numbers.length > 0) {
        nextNumber = Math.max(...numbers) + 1
      }
    }
    
    return `${districtCode}${nextNumber.toString().padStart(3, '0')}`
  },

  getDistrictFromRegID(regId) {
    if (!regId) return ''
    return regId.substring(0, 3)
  }
}