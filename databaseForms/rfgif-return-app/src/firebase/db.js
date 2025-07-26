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
import { db } from './index.js'

// Collection names
const COLLECTIONS = {
  PROFILES: 'profiles',
  LOANS: 'loans',
  GRANTS: 'grants',
  PAYMENTS: 'payments',
  PROJECTS: 'projects',
  LOGS: 'system_logs'
}

// District mapping (replicated from code.gs)
const DISTRICT_MAPPING = {
  "MAN": "Mannar", "COL": "Colombo", "BAT": "Batticaloa", "GAM": "Gampaha", "KAL": "Kalutara",
  "KAN": "Kandy", "KUR": "Kurunegala", "JAF": "Jaffna", "VAV": "Vavuniya", "TRI": "Trincomalee",
  "MTR": "Matara", "HAM": "Hambantota", "MON": "Monaragala", "ANU": "Anuradhapura", "POL": "Polonnaruwa",
  "PUT": "Puttalam", "RAT": "Ratnapura", "NUW": "Nuwara Eliya", "BAD": "Badulla", "KEG": "Kegalle",
  "MUL": "Mullaitivu", "MTL": "Matale", "AMP": "Ampara", "KIL": "Kilinochchi", "GAE": "Galle"
}

const DISTRICT_CODES = {
  "Mannar": "MAN", "Colombo": "COL", "Batticaloa": "BAT", "Gampaha": "GAM", 
  "Kalutara": "KAL", "Kandy": "KAN", "Kurunegala": "KUR", "Jaffna": "JAF", 
  "Vavuniya": "VAV", "Trincomalee": "TRI", "Matara": "MTR", "Hambantota": "HAM", 
  "Monaragala": "MON", "Anuradhapura": "ANU", "Polonnaruwa": "POL", "Puttalam": "PUT", 
  "Ratnapura": "RAT", "Nuwara Eliya": "NUW", "Badulla": "BAD", "Kegalle": "KEG", 
  "Mullaitivu": "MUL", "Matale": "MTL", "Ampara": "AMP", "Kilinochchi": "KIL", 
  "Galle": "GAE"
}

// Database operations
export const dbOperations = {
  // Get all profiles with filtering
  async getAllProfiles(filters = {}) {
    try {
      let q = collection(db, COLLECTIONS.PROFILES)
      
      // Apply filters - handle both old flat structure and new nested structure
      if (filters.district) {
        // Try both field structures
        q = query(q, where('District', '==', filters.district))
      }
      if (filters.type) {
        // For now, we'll filter after fetching since the structure varies
        q = query(q)
      }
      if (filters.year) {
        q = query(q, where('createdAt', '>=', new Date(filters.year, 0, 1)))
      }
      
      const snapshot = await getDocs(q)
      const profiles = []
      
      snapshot.forEach(doc => {
        const data = doc.data()
        
        // Transform the data structure to match what the components expect
        const transformedProfile = {
          id: doc.id,
          // Map flat fields to nested structure
          basicInfo: {
            name: data.Name || data.basicInfo?.name || 'N/A',
            age: data.Age || data.basicInfo?.age || 'N/A',
            district: data.District || data.basicInfo?.district || 'N/A',
            phone: data.contact || data.basicInfo?.phone || 'N/A',
            address: data.Address || data.basicInfo?.address || 'N/A',
            nic: data.NIC || data.basicInfo?.nic || 'N/A',
            totalChildren: data.total_children || data.basicInfo?.totalChildren || 0,
            schoolKids: data.school_kids || data.basicInfo?.schoolKids || 0,
            others: data.others || data.basicInfo?.others || 0,
            occupation: data.Occupation || data.basicInfo?.occupation || 'N/A'
          },
          // Map loans and grants
          loans: data.loans || [],
          grants: data.grants || [],
          paymentHistory: data.paymentHistory || [],
          arms: data.ArmsArray || data.arms || [],
          // Keep original fields for backward compatibility
          Image: data.Image,
          imageUrl: data.imageUrl,
          // Additional fields from migration
          RF_Loan: data.RF_Loan,
          RF_Paid_History: data.RF_Paid_History,
          RF_Cur_Prj: data.RF_Cur_Prj,
          Com_prjs: data.Com_prjs,
          GRANT: data.GRANT,
          GIFor: data.GIFor,
          GRANT_Cur_Prj: data.GRANT_Cur_Prj,
          Description: data.Description,
          Reg_ID: data.Reg_ID,
          contact: data.contact,
          total_children: data.total_children,
          school_kids: data.school_kids,
          others: data.others,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt
        }
        
        profiles.push(transformedProfile)
      })
      
      // Apply type filter after transformation
      if (filters.type) {
        return profiles.filter(profile => {
          if (filters.type === 'RF') {
            return profile.RF_Loan || profile.RF_Paid_History
          } else if (filters.type === 'GRANT') {
            return profile.GRANT
          } else if (filters.type === 'GIF') {
            return profile.GIFor
          }
          return true
        })
      }
      
      return profiles
    } catch (error) {
      console.error('Error getting profiles:', error)
      throw error
    }
  },

  // Get single profile by RegID
  async getProfileByRegId(regId) {
    try {
      const docRef = doc(db, COLLECTIONS.PROFILES, regId)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        const data = docSnap.data()
        
        // Transform the data structure to match what the components expect
        const transformedProfile = {
          id: docSnap.id,
          // Map flat fields to nested structure
          basicInfo: {
            name: data.Name || data.basicInfo?.name || 'N/A',
            age: data.Age || data.basicInfo?.age || 'N/A',
            district: data.District || data.basicInfo?.district || 'N/A',
            phone: data.contact || data.basicInfo?.phone || 'N/A',
            address: data.Address || data.basicInfo?.address || 'N/A',
            nic: data.NIC || data.basicInfo?.nic || 'N/A',
            totalChildren: data.total_children || data.basicInfo?.totalChildren || 0,
            schoolKids: data.school_kids || data.basicInfo?.schoolKids || 0,
            others: data.others || data.basicInfo?.others || 0,
            occupation: data.Occupation || data.basicInfo?.occupation || 'N/A'
          },
          // Map loans and grants
          loans: data.loans || [],
          grants: data.grants || [],
          paymentHistory: data.paymentHistory || [],
          arms: data.ArmsArray || data.arms || [],
          // Keep original fields for backward compatibility
          Image: data.Image,
          imageUrl: data.imageUrl,
          // Additional fields from migration
          RF_Loan: data.RF_Loan,
          RF_Paid_History: data.RF_Paid_History,
          RF_Cur_Prj: data.RF_Cur_Prj,
          Com_prjs: data.Com_prjs,
          GRANT: data.GRANT,
          GIFor: data.GIFor,
          GRANT_Cur_Prj: data.GRANT_Cur_Prj,
          Description: data.Description,
          Reg_ID: data.Reg_ID,
          contact: data.contact,
          total_children: data.total_children,
          school_kids: data.school_kids,
          others: data.others,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          // Add fields for RF/GIF return functionality
          RF_return_history: data.RF_return_history || {},
          GIF: data.GIF || {},
          Grant_return: data.Grant_return || false,
          RF_payment_history_integrity: data.RF_payment_history_integrity || false
        }
        
        return transformedProfile
      } else {
        return null
      }
    } catch (error) {
      console.error('Error getting profile:', error)
      throw error
    }
  },

  // Get loans for a profile (including RF_Loans subcollection)
  async getLoans(profileId) {
    try {
      const loans = []
      
      // Get RF_Loans from subcollection
      try {
        const rfQuery = query(collection(db, 'profiles', profileId, 'RF_Loans'))
        const rfSnapshot = await getDocs(rfQuery)
        rfSnapshot.docs.forEach(doc => {
          loans.push({ id: doc.id, ...doc.data(), type: 'RF' })
        })
      } catch (error) {
        console.log('No RF_Loans collection found')
      }
      
      // Get GRANT loans from subcollection
      try {
        const grantQuery = query(collection(db, 'profiles', profileId, 'GRANT'))
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

  // Create new profile
  async createProfile(profileData) {
    try {
      const regId = profileData.regId
      const docRef = doc(db, COLLECTIONS.PROFILES, regId)
      
      const profile = {
        basicInfo: profileData.basicInfo,
        loans: profileData.loans || [],
        grants: profileData.grants || [],
        paymentHistory: profileData.paymentHistory || [],
        arms: profileData.arms || [],
        imageUrl: profileData.imageUrl || '',
        meta: {
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        }
      }
      
      await setDoc(docRef, profile)
      return regId
    } catch (error) {
      console.error('Error creating profile:', error)
      throw error
    }
  },

  // Update profile
  async updateProfile(regId, updates) {
    try {
      const docRef = doc(db, COLLECTIONS.PROFILES, regId)
      const updateData = {
        ...updates,
        meta: {
          updatedAt: serverTimestamp()
        }
      }
      
      await updateDoc(docRef, updateData)
      return regId
    } catch (error) {
      console.error('Error updating profile:', error)
      throw error
    }
  },

  // Add loan to profile
  async addLoan(regId, loanData) {
    try {
      const profile = await this.getProfileByRegId(regId)
      if (!profile) throw new Error('Profile not found')
      
      const newLoan = {
        id: Date.now().toString(),
        type: loanData.type,
        amount: loanData.amount,
        purpose: loanData.purpose,
        date: loanData.date,
        status: 'active',
        ...loanData
      }
      
      const updatedLoans = [...profile.loans, newLoan]
      await this.updateProfile(regId, { loans: updatedLoans })
      
      return newLoan
    } catch (error) {
      console.error('Error adding loan:', error)
      throw error
    }
  },

  // Process payment (replicates onRFGIFReturnSubmit logic)
  async processPayment(paymentData) {
    try {
      const { regId, type, amount, details, date } = paymentData
      const profile = await this.getProfileByRegId(regId)
      
      if (!profile) throw new Error('Profile not found')
      
      const payment = {
        id: Date.now().toString(),
        type,
        amount: parseFloat(amount) || 0,
        details,
        date: date || new Date(),
        timestamp: serverTimestamp()
      }
      
      // Update payment history
      const updatedPaymentHistory = [...profile.paymentHistory, payment]
      
      if (type === 'RF') {
        // Process RF loan payment logic (replicated from code.gs)
        const updatedProfile = await this.processRFPayment(profile, payment)
        return updatedProfile
      } else if (type === 'GRANT') {
        // Process grant payment
        const updatedProfile = await this.processGrantPayment(profile, payment)
        return updatedProfile
      }
      
    } catch (error) {
      console.error('Error processing payment:', error)
      throw error
    }
  },

  // Process RF payment (replicates RF payment logic from code.gs)
  async processRFPayment(profile, payment) {
    const { amount } = payment
    let remainingPayment = amount
    
    // Update current projects based on payment
    const updatedProjects = []
    const completedProjects = []
    
    for (const project of profile.loans.filter(loan => loan.status === 'active')) {
      if (remainingPayment > 0) {
        const projectRemaining = project.amount - (project.paidAmount || 0)
        
        if (projectRemaining <= remainingPayment) {
          // Project completed
          completedProjects.push({
            ...project,
            paidAmount: project.amount,
            status: 'completed',
            completedDate: new Date()
          })
          remainingPayment -= projectRemaining
        } else {
          // Partial payment
          const newPaidAmount = (project.paidAmount || 0) + remainingPayment
          updatedProjects.push({
            ...project,
            paidAmount: newPaidAmount
          })
          remainingPayment = 0
        }
      } else {
        updatedProjects.push(project)
      }
    }
    
    // Update profile with new data
    const updatedLoans = [...updatedProjects, ...completedProjects]
    const updatedPaymentHistory = [...profile.paymentHistory, payment]
    
    await this.updateProfile(profile.id, {
      loans: updatedLoans,
      paymentHistory: updatedPaymentHistory
    })
    
    return { ...profile, loans: updatedLoans, paymentHistory: updatedPaymentHistory }
  },

  // Process grant payment
  async processGrantPayment(profile, payment) {
    const updatedPaymentHistory = [...profile.paymentHistory, payment]
    
    await this.updateProfile(profile.id, {
      paymentHistory: updatedPaymentHistory
    })
    
    return { ...profile, paymentHistory: updatedPaymentHistory }
  },

  // Get analytics data
  async getAnalyticsData() {
    try {
      const profiles = await this.getAllProfiles()
      
      const stats = {
        totalProfiles: profiles.length,
        totalLoans: profiles.reduce((sum, p) => sum + p.loans.length, 0),
        totalGrants: profiles.reduce((sum, p) => sum + p.grants.length, 0),
        totalAmount: profiles.reduce((sum, p) => {
          const loanAmount = p.loans.reduce((lSum, l) => lSum + (l.amount || 0), 0)
          const grantAmount = p.grants.reduce((gSum, g) => gSum + (g.amount || 0), 0)
          return sum + loanAmount + grantAmount
        }, 0)
      }
      
      // District breakdown
      const districtStats = {}
      profiles.forEach(profile => {
        const district = profile.basicInfo?.district || 'Unknown'
        districtStats[district] = (districtStats[district] || 0) + 1
      })
      
      // Year breakdown
      const yearStats = {}
      profiles.forEach(profile => {
        const year = new Date(profile.meta?.createdAt?.toDate()).getFullYear()
        yearStats[year] = (yearStats[year] || 0) + 1
      })
      
      return {
        stats,
        districtStats,
        yearStats
      }
    } catch (error) {
      console.error('Error getting analytics:', error)
      throw error
    }
  },

  // Log system operations
  async logOperation(operation, details, level = 'info') {
    try {
      const logEntry = {
        operation,
        details,
        level,
        timestamp: serverTimestamp(),
        userId: 'system' // TODO: Add user authentication
      }
      
      await addDoc(collection(db, COLLECTIONS.LOGS), logEntry)
    } catch (error) {
      console.error('Error logging operation:', error)
    }
  }
}

// Utility functions
export const utils = {
  getDistrictFromRegID(regID) {
    const districtPrefix = regID.substring(0, 3).toUpperCase()
    return DISTRICT_MAPPING[districtPrefix] || "Unknown"
  },

  getDistrictCodeFromName(districtName) {
    return DISTRICT_CODES[districtName] || "UNK"
  },

  generateRegId(district, existingIds = []) {
    const districtCode = this.getDistrictCodeFromName(district)
    let counter = 1
    
    while (true) {
      const regId = `${districtCode}${counter.toString().padStart(3, '0')}`
      if (!existingIds.includes(regId)) {
        return regId
      }
      counter++
    }
  }
}

export default dbOperations 