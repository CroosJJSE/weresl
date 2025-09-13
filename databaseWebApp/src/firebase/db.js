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
import { 
  RootCollection, 
  ProfileField, 
  SearchElementDoc,
  RF_LOAN_FIELD,
  GRANT_FIELD
} from '../enums/db.js'
import { DISTRICT_MAPPING, DISTRICT_CODES } from '../enums/districts.js'
import { generateNextRegId, generateRegIdFromDistrict, validateRegId } from '../utils/regIdUtils.js'

// Database operations
export const dbOperations = {
  // Get all profiles with filtering
  async getAllProfiles(filters = {}) {
    try {
      let q = collection(db, RootCollection.PROFILES)
      
      // Apply filters - handle both old flat structure and new nested structure
      if (filters.District) {
        // Try both field structures
        q = query(q, where(ProfileField.DISTRICT, '==', filters.District))
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
          // Map fields using enums
          basicInfo: {
            name: data[ProfileField.FULL_NAME] || data.Name || data.basicInfo?.name || 'N/A',
            age: data[ProfileField.YEAR_OF_BIRTH] || data.Age || data.basicInfo?.age || 'N/A',
            District: data[ProfileField.DISTRICT] || data.District || data.basicInfo?.District || 'N/A',
            phone: data[ProfileField.PHONE_NUMBER] || data.contact || data.basicInfo?.phone || 'N/A',
            address: data[ProfileField.ADDRESS] || data.Address || data.basicInfo?.address || 'N/A',
            nic: data[ProfileField.NIC] || data.NIC || data.basicInfo?.nic || 'N/A',
            totalChildren: data[ProfileField.TOTAL_CHILDREN] || data.total_children || data.basicInfo?.totalChildren || 0,
            schoolKids: data[ProfileField.SCHOOL_GOING_CHILDREN] || data.school_kids || data.basicInfo?.schoolKids || 0,
            others: data[ProfileField.OTHER_DEPENDENTS] || data.others || data.basicInfo?.others || 0,
            occupation: data[ProfileField.OCCUPATION] || data.Occupation || data.basicInfo?.occupation || 'N/A'
          },
          // Map loans and grants using enums
          loans: data[ProfileField.RF_LOANS] || data.loans || [],
          grants: data[ProfileField.GRANT] || data.grants || [],
          paymentHistory: data.paymentHistory || [],
          arms: data.ArmsArray || data.arms || [],
          // Keep original fields for backward compatibility
          Image: data[ProfileField.PROFILE_IMAGE_DRIVE_ID] || data.Image,
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
          contact: data.contact,
          total_children: data.total_children,
          school_kids: data.school_kids,
          others: data.others,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          // Add enum field mapping for description
          [ProfileField.DESCRIPTION]: data[ProfileField.DESCRIPTION] || data.Description || data.description
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
        
        // Create profile with both enum field names and transformed structure
        const profile = {
          id: docSnap.id,
          
          // Enum field names (what ProfileModal expects)
          [ProfileField.REG_ID]: data[ProfileField.REG_ID] || data.Reg_ID || regId,
          [ProfileField.FULL_NAME]: data[ProfileField.FULL_NAME] || data.Name || data.basicInfo?.name || 'N/A',
          [ProfileField.DISTRICT]: data[ProfileField.DISTRICT] || data.District || data.basicInfo?.district || 'N/A',
          [ProfileField.YEAR_OF_BIRTH]: data[ProfileField.YEAR_OF_BIRTH] || data.Age || data.basicInfo?.age || 'N/A',
          [ProfileField.ADDRESS]: data[ProfileField.ADDRESS] || data.Address || data.basicInfo?.address || 'N/A',
          [ProfileField.NIC]: data[ProfileField.NIC] || data.NIC || data.basicInfo?.nic || 'N/A',
          [ProfileField.PHONE_NUMBER]: data[ProfileField.PHONE_NUMBER] || data.contact || data.basicInfo?.phone || 'N/A',
          [ProfileField.TOTAL_CHILDREN]: data[ProfileField.TOTAL_CHILDREN] || data.total_children || data.basicInfo?.totalChildren || 0,
          [ProfileField.SCHOOL_GOING_CHILDREN]: data[ProfileField.SCHOOL_GOING_CHILDREN] || data.school_kids || data.basicInfo?.schoolKids || 0,
          [ProfileField.OTHER_DEPENDENTS]: data[ProfileField.OTHER_DEPENDENTS] || data.others || data.basicInfo?.others || 0,
          [ProfileField.OCCUPATION]: data[ProfileField.OCCUPATION] || data.Occupation || data.basicInfo?.occupation || 'N/A',
          [ProfileField.DESCRIPTION]: data[ProfileField.DESCRIPTION] || data.Description || data.description || 'N/A',
          [ProfileField.PROFILE_IMAGE_DRIVE_ID]: data[ProfileField.PROFILE_IMAGE_DRIVE_ID] || data.Image,
          [ProfileField.CREATED_AT]: data[ProfileField.CREATED_AT] || data.createdAt,
          [ProfileField.LAST_UPDATED]: data[ProfileField.LAST_UPDATED] || data.updatedAt,
          
          // Subcollections
          [ProfileField.RF_LOANS]: data[ProfileField.RF_LOANS] || data.loans || [],
          [ProfileField.GRANT]: data[ProfileField.GRANT] || data.grants || [],
          [ProfileField.RF_RETURN_HISTORY]: data[ProfileField.RF_RETURN_HISTORY] || data.RF_return_history || {},
          [ProfileField.GIF]: data[ProfileField.GIF] || data.GIF || {},
          
          // Additional fields for backward compatibility
          basicInfo: {
            name: data[ProfileField.FULL_NAME] || data.Name || data.basicInfo?.name || 'N/A',
            age: data[ProfileField.YEAR_OF_BIRTH] || data.Age || data.basicInfo?.age || 'N/A',
            District: data[ProfileField.DISTRICT] || data.District || data.basicInfo?.District || 'N/A',
            phone: data[ProfileField.PHONE_NUMBER] || data.contact || data.basicInfo?.phone || 'N/A',
            address: data[ProfileField.ADDRESS] || data.Address || data.basicInfo?.address || 'N/A',
            nic: data[ProfileField.NIC] || data.NIC || data.basicInfo?.nic || 'N/A',
            totalChildren: data[ProfileField.TOTAL_CHILDREN] || data.total_children || data.basicInfo?.totalChildren || 0,
            schoolKids: data[ProfileField.SCHOOL_GOING_CHILDREN] || data.school_kids || data.basicInfo?.schoolKids || 0,
            others: data[ProfileField.OTHER_DEPENDENTS] || data.others || data.basicInfo?.others || 0,
            occupation: data[ProfileField.OCCUPATION] || data.Occupation || data.basicInfo?.occupation || 'N/A'
          },
          loans: data[ProfileField.RF_LOANS] || data.loans || [],
          grants: data[ProfileField.GRANT] || data.grants || [],
          paymentHistory: data.paymentHistory || [],
          arms: data.ArmsArray || data.arms || [],
          Image: data[ProfileField.PROFILE_IMAGE_DRIVE_ID] || data.Image,
          imageUrl: data.imageUrl,
          RF_Loan: data.RF_Loan,
          RF_Paid_History: data.RF_Paid_History,
          RF_Cur_Prj: data.RF_Cur_Prj,
          Com_prjs: data.Com_prjs,
          GRANT: data.GRANT,
          GIFor: data.GIFor,
          GRANT_Cur_Prj: data.GRANT_Cur_Prj,
          Description: data[ProfileField.DESCRIPTION] || data.Description,
          Reg_ID: data[ProfileField.REG_ID] || data.Reg_ID,
          contact: data.contact,
          total_children: data.total_children,
          school_kids: data.school_kids,
          others: data.others,
          createdAt: data[ProfileField.CREATED_AT] || data.createdAt,
          updatedAt: data[ProfileField.LAST_UPDATED] || data.updatedAt
        }
        
        return profile
      } else {
        return null
      }
    } catch (error) {
      console.error('Error getting profile:', error)
      throw error
    }
  },

  // Get loans for a profile (including RF_Loans subcollection)
  async getProfileLoans(profileId) {
    try {
      const loans = [];
      
      // Get RF_Loans from subcollection
      try {
        const rfQuery = query(collection(db, RootCollection.PROFILES, profileId, ProfileField.RF_LOANS));
        const rfSnapshot = await getDocs(rfQuery);
        
        rfSnapshot.forEach(doc => {
          const loanData = doc.data();
          loans.push({
            id: doc.id,
            ...loanData,
            type: 'RF',
            // Ensure new fields are properly mapped
            [RF_LOAN_FIELD.LOAN_HISTORY]: loanData[RF_LOAN_FIELD.LOAN_HISTORY] || [],
            [RF_LOAN_FIELD.PAYMENT_INTEGRITY]: loanData[RF_LOAN_FIELD.PAYMENT_INTEGRITY] || loanData.paymentIntegrity || false
          });
        });
      } catch (error) {
        // No RF_Loans collection found for profile
      }
      
      // Get GRANT loans from subcollection
      try {
        const grantQuery = query(collection(db, RootCollection.PROFILES, profileId, ProfileField.GRANT));
        const grantSnapshot = await getDocs(grantQuery);
        
        grantSnapshot.forEach(doc => {
          const loanData = doc.data();
          loans.push({
            id: doc.id,
            ...loanData,
            type: 'GRANT',
            // Ensure new fields are properly mapped
            [GRANT_FIELD.LOAN_HISTORY]: loanData[GRANT_FIELD.LOAN_HISTORY] || [],
            [GRANT_FIELD.PAYMENT_INTEGRITY]: loanData[GRANT_FIELD.PAYMENT_INTEGRITY] || loanData.paymentIntegrity || false
          });
        });
      } catch (error) {
        // No GRANT collection found for profile
      }
      
      return loans;
    } catch (error) {
      console.error('[dbOperations] Error loading loans:', error);
      return [];
    }
  },

  // Get RF return history for a profile
  async getRFReturnHistory(profileId) {
    try {
      const docRef = doc(db, RootCollection.PROFILES, profileId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        const returnHistory = data[ProfileField.RF_RETURN_HISTORY] || {};
        
        // Parse the return history structure - handle both map and array formats
        const parsedHistory = [];
        
        if (Array.isArray(returnHistory)) {
          // If it's already an array, use it directly
          parsedHistory.push(...returnHistory);
        } else if (typeof returnHistory === 'object' && returnHistory !== null) {
          // If it's a map/object, convert to array
          Object.entries(returnHistory).forEach(([key, value]) => {
            if (typeof value === 'object' && value !== null) {
              // If value is an object with amount and date
              parsedHistory.push({
                dateKey: key,
                amount: value.amount || value,
                parsedDate: this.parseDateFromKey(key),
                proofUrl: value.proofUrl || null
              });
            } else {
              // If value is just a number
              parsedHistory.push({
                dateKey: key,
                amount: value,
                parsedDate: this.parseDateFromKey(key)
              });
            }
          });
        }
        
        return parsedHistory;
      }
      
      return [];
    } catch (error) {
      console.error('[dbOperations] Error loading RF return history:', error);
      return [];
    }
  },

  // Parse date from key format (1421_3_7_2025 -> 03-07-2025)
  parseDateFromKey(dateKey) {
    try {
      // Handle format: 1421_3_7_2025 or 514_3_7_2025
      // Format is: minutes_hours_day_month_year (from createTimestamp function)
      const parts = dateKey.split('_');
      
      if (parts.length >= 4) {
        // Format: minutes_hours_day_month_year
        // But the first part might be combined minutes+hours
        const firstPart = parts[0];
        const day = parts[1];
        const month = parts[2];
        const year = parts[3];
        
        // Validate the parts
        if (day && month && year) {
          // Format as DD-MM-YYYY
          const formattedDate = `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`;
          return formattedDate;
        }
      } else if (parts.length >= 3) {
        // Alternative format: day_month_year
        const day = parts[0];
        const month = parts[1];
        const year = parts[2];
        
        if (day && month && year) {
          const formattedDate = `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`;
          return formattedDate;
        }
      }
      
      // Fallback: try the old format (441918072025 -> 18-07-2025)
      const oldFormat = dateKey.match(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{4})/);
      if (oldFormat) {
        const day = oldFormat[3];
        const month = oldFormat[4];
        const year = oldFormat[5];
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate;
      }
      
      return dateKey;
    } catch (error) {
      console.error('[dbOperations] Error parsing date key:', error, dateKey);
      return dateKey;
    }
  },

  // Parse full timestamp (date and time) from key format
  parseFullTimestamp(dateKey) {
    try {
      const parts = dateKey.split('_');
      
      if (parts.length >= 4) {
        // Format: minutes_hours_day_month_year
        const minutes = parts[0];
        const hours = parts[1];
        const day = parts[2];
        const month = parts[3];
        const year = parts[4];
        
        if (day && month && year && hours && minutes) {
          // Format as DD-MM-YYYY HH:MM
          const formattedDate = `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`;
          const formattedTime = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
          return `${formattedDate} ${formattedTime}`;
        }
      }
      
      // Fallback to just date
      return this.parseDateFromKey(dateKey);
    } catch (error) {
      console.error('[dbOperations] Error parsing full timestamp:', error, dateKey);
      return dateKey;
    }
  },

  // Get comprehensive profile details including projects and history
  async getProfileDetails(profileId) {
    try {
      const [loans, returnHistory] = await Promise.all([
        this.getProfileLoans(profileId),
        this.getRFReturnHistory(profileId)
      ]);
      
      // Get profile document for additional info
      const docRef = doc(db, RootCollection.PROFILES, profileId);
      const docSnap = await getDoc(docRef);
      const profileData = docSnap.exists() ? docSnap.data() : {};
      
      const details = {
        loans: loans,
        returnHistory: returnHistory,
        grantReturn: profileData.Grant_return || false,
        gifData: profileData[ProfileField.GIF] || {},
        // Calculate totals
        totalRFLoans: loans.filter(l => l.type === 'RF').length,
        totalGrants: loans.filter(l => l.type === 'GRANT').length,
        totalReturnAmount: returnHistory.reduce((sum, payment) => sum + (payment.amount || 0), 0),
        activeRFLoans: loans.filter(l => l.type === 'RF' && (l[RF_LOAN_FIELD.STATUS] === 'active' || l.status === 'active')),
        completedRFLoans: loans.filter(l => l.type === 'RF' && (l[RF_LOAN_FIELD.STATUS] === 'completed' || l.status === 'completed')),
        activeGrants: loans.filter(l => l.type === 'GRANT')
      };
      
      return details;
    } catch (error) {
      console.error('[dbOperations] Error loading comprehensive details:', error);
      return {
        loans: [],
        returnHistory: [],
        grantReturn: false,
        gifData: {},
        totalRFLoans: 0,
        totalGrants: 0,
        totalReturnAmount: 0,
        activeRFLoans: [],
        completedRFLoans: [],
        activeGrants: []
      };
    }
  },

  // Get loan history from subcollection
  async getLoanHistory(regId, loanType, loanId) {
    try {
      console.log(`[dbOperations] Fetching loan history for ${loanType} loan ${loanId} from profile ${regId}`)
      
      // Determine the subcollection name based on loan type
      let subcollectionName
      if (loanType === 'RF') {
        subcollectionName = ProfileField.RF_LOANS
      } else if (loanType === 'GRANT') {
        subcollectionName = ProfileField.GRANT
      } else {
        console.error('[dbOperations] Invalid loan type:', loanType)
        return []
      }
      
      // Get the loan document from the subcollection
      const loanDocRef = doc(db, RootCollection.PROFILES, regId, subcollectionName, loanId)
      const loanDoc = await getDoc(loanDocRef)
      
      if (!loanDoc.exists()) {
        console.log(`[dbOperations] Loan document not found: ${loanId}`)
        return []
      }
      
      const loanData = loanDoc.data()
      
      // Extract loan history from the loan document
      let loanHistory = []
      
      if (loanType === 'RF') {
        loanHistory = loanData[RF_LOAN_FIELD.LOAN_HISTORY] || []
      } else if (loanType === 'GRANT') {
        loanHistory = loanData[GRANT_FIELD.LOAN_HISTORY] || []
      }
      
      console.log(`[dbOperations] Found ${loanHistory.length} history entries for loan ${loanId}`)
      return Array.isArray(loanHistory) ? loanHistory : []
      
    } catch (error) {
      console.error('[dbOperations] Error fetching loan history:', error)
      return []
    }
  }
}

// Utility functions - now using centralized utils
export const utils = {
  getDistrictFromRegID(regID) {
    const districtPrefix = regID.substring(0, 3).toUpperCase()
    return DISTRICT_MAPPING[districtPrefix] || "Unknown"
  },

  getDistrictCodeFromName(districtName) {
    return DISTRICT_CODES[districtName] || "UNK"
  },

  generateRegId(district, existingIds = []) {
    return generateRegIdFromDistrict(district)
  }
}

export default dbOperations 