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
import { RootCollection, ProfileField, RF_LOAN_FIELD, GRANT_FIELD } from '../enums/db.js'
import { LoanStatus } from '../enums/loans.js'
import { getRFLoans } from '../utils/dbUtils.js'
import { DISTRICT_MAPPING, DISTRICT_CODES } from '../enums/districts.js'

// Database operations
export const dbOperations = {
  // Get all profiles with filtering
  async getAllProfiles(filters = {}) {
    try {
      let q = collection(db, RootCollection.PROFILES)
      
      // Apply filters - handle both old flat structure and new nested structure
      if (filters.district) {
        // Try both field structures
        q = query(q, where(ProfileField.DISTRICT, '==', filters.district))
      }
      if (filters.type) {
        // For now, we'll filter after fetching since the structure varies
        q = query(q)
      }
      if (filters.year) {
        q = query(q, where(ProfileField.CREATED_AT, '>=', new Date(filters.year, 0, 1)))
      }
      
      const snapshot = await getDocs(q)
      const profiles = []
      
      snapshot.forEach(doc => {
        const data = doc.data()
        
        // Transform the data structure to match what the components expect
        const transformedProfile = {
          id: doc.id,
          // Map flat fields to nested structure - handle both old and new field names
          basicInfo: {
            name: data[ProfileField.FULL_NAME] || data.Name || data.basicInfo?.name || 'N/A',
            age: data[ProfileField.YEAR_OF_BIRTH] || data.Age || data.basicInfo?.age || 'N/A',
            district: data[ProfileField.DISTRICT] || data.District || data.basicInfo?.district || 'N/A',
            phone: data[ProfileField.PHONE_NUMBER] || data.contact || data.basicInfo?.phone || 'N/A',
            address: data[ProfileField.ADDRESS] || data.Address || data.basicInfo?.address || 'N/A',
            nic: data[ProfileField.NIC] || data.NIC || data.basicInfo?.nic || 'N/A',
            totalChildren: data[ProfileField.TOTAL_CHILDREN] || data.total_children || data.basicInfo?.totalChildren || 0,
            schoolKids: data[ProfileField.SCHOOL_GOING_CHILDREN] || data.school_kids || data.basicInfo?.schoolKids || 0,
            others: data[ProfileField.OTHER_DEPENDENTS] || data.others || data.basicInfo?.others || 0,
            occupation: data[ProfileField.OCCUPATION] || data.Occupation || data.basicInfo?.occupation || 'N/A'
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
          Description: data[ProfileField.DESCRIPTION] || data.Description,
          Reg_ID: data[ProfileField.REG_ID] || data.Reg_ID,
          contact: data[ProfileField.PHONE_NUMBER] || data.contact,
          total_children: data[ProfileField.TOTAL_CHILDREN] || data.total_children,
          school_kids: data[ProfileField.SCHOOL_GOING_CHILDREN] || data.school_kids,
          others: data[ProfileField.OTHER_DEPENDENTS] || data.others,
          createdAt: data[ProfileField.CREATED_AT] || data.createdAt,
          updatedAt: data[ProfileField.LAST_UPDATED] || data.updatedAt,
          // Add enum-based field mappings for components
          [ProfileField.REG_ID]: data[ProfileField.REG_ID] || data.Reg_ID,
          [ProfileField.FULL_NAME]: data[ProfileField.FULL_NAME] || data.Name,
          [ProfileField.NIC]: data[ProfileField.NIC] || data.NIC,
          [ProfileField.PHONE_NUMBER]: data[ProfileField.PHONE_NUMBER] || data.contact,
          [ProfileField.DISTRICT]: data[ProfileField.DISTRICT] || data.District,
          [ProfileField.ADDRESS]: data[ProfileField.ADDRESS] || data.Address,
          [ProfileField.YEAR_OF_BIRTH]: data[ProfileField.YEAR_OF_BIRTH] || data.Age,
          [ProfileField.TOTAL_CHILDREN]: data[ProfileField.TOTAL_CHILDREN] || data.total_children,
          [ProfileField.SCHOOL_GOING_CHILDREN]: data[ProfileField.SCHOOL_GOING_CHILDREN] || data.school_kids,
          [ProfileField.OTHER_DEPENDENTS]: data[ProfileField.OTHER_DEPENDENTS] || data.others,
          [ProfileField.OCCUPATION]: data[ProfileField.OCCUPATION] || data.Occupation,
          [ProfileField.DESCRIPTION]: data[ProfileField.DESCRIPTION] || data.Description,
          [ProfileField.PROFILE_IMAGE_DRIVE_ID]: data[ProfileField.PROFILE_IMAGE_DRIVE_ID] || data.Image,
          [ProfileField.CREATED_AT]: data[ProfileField.CREATED_AT] || data.createdAt,
          [ProfileField.LAST_UPDATED]: data[ProfileField.LAST_UPDATED] || data.updatedAt,
          [ProfileField.RF_RETURN_HISTORY]: data[ProfileField.RF_RETURN_HISTORY] || data.RF_return_history,
          [ProfileField.GIF]: data[ProfileField.GIF] || data.GIF
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
      const docRef = doc(db, RootCollection.PROFILES, regId)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        const data = docSnap.data()
        
        // Transform the data structure to match what the components expect
        const transformedProfile = {
          id: docSnap.id,
          // Map flat fields to nested structure - handle both old and new field names
          basicInfo: {
            name: data.Name || data[ProfileField.FULL_NAME] || data.basicInfo?.name || 'N/A',
            age: data.Age || data[ProfileField.YEAR_OF_BIRTH] || data.basicInfo?.age || 'N/A',
            district: data.District || data[ProfileField.DISTRICT] || data.basicInfo?.district || 'N/A',
            phone: data.contact || data[ProfileField.PHONE_NUMBER] || data.basicInfo?.phone || 'N/A',
            address: data.Address || data[ProfileField.ADDRESS] || data.basicInfo?.address || 'N/A',
            nic: data.NIC || data[ProfileField.NIC] || data.basicInfo?.nic || 'N/A',
            totalChildren: data.total_children || data[ProfileField.TOTAL_CHILDREN] || data.basicInfo?.totalChildren || 0,
            schoolKids: data.school_kids || data[ProfileField.SCHOOL_GOING_CHILDREN] || data.basicInfo?.schoolKids || 0,
            others: data.others || data[ProfileField.OTHER_DEPENDENTS] || data.basicInfo?.others || 0,
            occupation: data.Occupation || data[ProfileField.OCCUPATION] || data.basicInfo?.occupation || 'N/A'
          },
          // Map loans and grants
          loans: data.loans || [],
          grants: data.grants || [],
          paymentHistory: data.paymentHistory || [],
          arms: data.ArmsArray || data.arms || [],
          // Essential fields for backward compatibility
          Reg_ID: data.Reg_ID || data[ProfileField.REG_ID],
          contact: data.contact || data[ProfileField.PHONE_NUMBER],
          total_children: data.total_children || data[ProfileField.TOTAL_CHILDREN],
          createdAt: data.createdAt || data[ProfileField.CREATED_AT],
          updatedAt: data.updatedAt || data[ProfileField.LAST_UPDATED],
          // Add fields for RF/GIF return functionality
          RF_return_history: data.RF_return_history || data[ProfileField.RF_RETURN_HISTORY] || {},
          GIF: data.GIF || data[ProfileField.GIF] || {},
          Grant_return: data.Grant_return || false,
          RF_payment_history_integrity: data.RF_payment_history_integrity || false,
          // Add new field names for components
          fullName: data.Name || data[ProfileField.FULL_NAME],
          nic: data.NIC || data[ProfileField.NIC],
          phoneNumber: data.contact || data[ProfileField.PHONE_NUMBER],
          district: data.District || data[ProfileField.DISTRICT],
          address: data.Address || data[ProfileField.ADDRESS],
          yearOfBirth: data.Age || data[ProfileField.YEAR_OF_BIRTH],
          totalChildren: data.total_children || data[ProfileField.TOTAL_CHILDREN],
          occupation: data.Occupation || data[ProfileField.OCCUPATION],
          description: data.Description || data[ProfileField.DESCRIPTION],
          profileImageDriveId: data.Image || data[ProfileField.PROFILE_IMAGE_DRIVE_ID],
          lastUpdated: data.updatedAt || data[ProfileField.LAST_UPDATED]
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
        const rfQuery = query(collection(db, RootCollection.PROFILES, profileId, ProfileField.RF_LOANS))
        const rfSnapshot = await getDocs(rfQuery)
        rfSnapshot.docs.forEach(doc => {
          loans.push({ id: doc.id, ...doc.data(), type: 'RF' })
        })
      } catch (error) {
        console.log('No RF_Loans collection found')
      }
      
      // Get GRANT loans from subcollection
      try {
        const grantQuery = query(collection(db, RootCollection.PROFILES, profileId, ProfileField.GRANT))
        const grantSnapshot = await getDocs(grantQuery)
        grantSnapshot.docs.forEach(doc => {
          loans.push({ id: doc.id, ...doc.data(), type: 'GRANT' })
        })
      } catch (error) {
        console.log('No GRANT collection found')
      }
      
      return loans.sort((a, b) => b[ProfileField.CREATED_AT]?.toDate() - a[ProfileField.CREATED_AT]?.toDate())
    } catch (error) {
      console.error('Error getting loans:', error)
      throw error
    }
  },

  // Create new profile
  async createProfile(profileData) {
    try {
      const regId = profileData.regId
      const docRef = doc(db, RootCollection.PROFILES, regId)
      
      const profile = {
        basicInfo: profileData.basicInfo,
        loans: profileData.loans || [],
        grants: profileData.grants || [],
        paymentHistory: profileData.paymentHistory || [],
        arms: profileData.arms || [],
        imageUrl: profileData.imageUrl || '',
        meta: {
          [ProfileField.CREATED_AT]: serverTimestamp(),
          [ProfileField.LAST_UPDATED]: serverTimestamp()
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
      const docRef = doc(db, RootCollection.PROFILES, regId)
      const updateData = {
        ...updates,
        meta: {
          [ProfileField.LAST_UPDATED]: serverTimestamp()
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
        status: LoanStatus.ACTIVE,
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

  // Process RF payment with proper current balance calculation
  async processRFPayment(profile, payment) {
    const { amount } = payment
    let remainingPayment = parseFloat(amount) || 0
    
    console.log('[PAYMENT DEBUG] Processing RF payment:', { amount, remainingPayment })
    
    // Get current RF loans from subcollection
    const rfLoansResult = await getRFLoans(profile.id)
    if (!rfLoansResult.success) {
      throw new Error('Failed to get RF loans')
    }
    
    const activeLoans = rfLoansResult.data.filter(loan => loan[RF_LOAN_FIELD.STATUS] === LoanStatus.ACTIVE)
    console.log('[PAYMENT DEBUG] Active loans found:', activeLoans.length)
    
    const updatedLoans = []
    const completedLoans = []
    
    for (const loan of activeLoans) {
      console.log('[PAYMENT DEBUG] Processing loan:', {
        id: loan.id,
        amount: loan[RF_LOAN_FIELD.AMOUNT],
        currentBalance: loan[RF_LOAN_FIELD.CURRENT_BALANCE],
        status: loan[RF_LOAN_FIELD.STATUS]
      })
      
      if (remainingPayment > 0) {
        const currentBalance = parseFloat(loan[RF_LOAN_FIELD.CURRENT_BALANCE]) || 0
        const loanAmount = parseFloat(loan[RF_LOAN_FIELD.AMOUNT]) || 0
        
        console.log('[PAYMENT DEBUG] Loan calculation:', {
          currentBalance,
          loanAmount,
          remainingPayment,
          paymentNeeded: currentBalance
        })
        
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
          
          console.log('[PAYMENT DEBUG] Loan completed:', { loanId: loan.id, remainingPayment })
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
          
          console.log('[PAYMENT DEBUG] Loan partially paid:', { 
            loanId: loan.id, 
            newCurrentBalance, 
            remainingPayment 
          })
        }
      } else {
        updatedLoans.push(loan)
      }
    }
    
    // Update all loans in the subcollection
    const batch = writeBatch(db)
    
    // Update existing loans
    for (const loan of [...updatedLoans, ...completedLoans]) {
      const loanRef = doc(db, RootCollection.PROFILES, profile.id, ProfileField.RF_LOANS, loan.id)
      batch.update(loanRef, loan)
    }
    
    // Update profile payment history
    const updatedPaymentHistory = [...(profile.paymentHistory || []), payment]
    const profileRef = doc(db, RootCollection.PROFILES, profile.id)
    batch.update(profileRef, {
      paymentHistory: updatedPaymentHistory,
      [ProfileField.LAST_UPDATED]: serverTimestamp()
    })
    
    await batch.commit()
    
    console.log('[PAYMENT DEBUG] Payment processing completed:', {
      totalLoansProcessed: updatedLoans.length + completedLoans.length,
      remainingPayment
    })
    
    return { 
      ...profile, 
      paymentHistory: updatedPaymentHistory,
      updatedLoans: [...updatedLoans, ...completedLoans]
    }
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
      
      await addDoc(collection(db, RootCollection.LOGS), logEntry)
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