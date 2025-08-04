/**
 * Registration ID Utility Functions
 * Handles RegID generation and validation
 */

import { getFirestore, doc, getDoc, setDoc, collection, query, getDocs, orderBy, limit } from 'firebase/firestore'
import { getDistrictCode } from '../enums/districts.js'
import { RootCollection, SearchElementDoc } from '../enums/db.js'

const db = getFirestore()

/**
 * Generate next RegID for a district
 */
export const generateNextRegId = async (districtCode) => {
  try {
    console.log('🔧 Generating next RegID for district code:', districtCode)
    
    // Get the last RegID for this district
    const lastRegId = await getLastRegIdForDistrict(districtCode)
    
    if (!lastRegId) {
      // First RegID for this district
      const newRegId = `${districtCode}001`
      console.log('✅ First RegID for district:', newRegId)
      return newRegId
    }
    
    // Extract the number part and increment
    const numberPart = parseInt(lastRegId.slice(districtCode.length))
    const nextNumber = numberPart + 1
    
    // Format with leading zeros (3 digits)
    const formattedNumber = nextNumber.toString().padStart(3, '0')
    const newRegId = `${districtCode}${formattedNumber}`
    
    console.log('✅ Generated next RegID:', newRegId, '(previous was:', lastRegId, ')')
    return newRegId
  } catch (error) {
    console.error('❌ Error generating next RegID:', error)
    throw new Error('Failed to generate RegID')
  }
}

/**
 * Generate RegID from district name
 */
export const generateRegIdFromDistrict = async (districtName) => {
  try {
    const districtCode = getDistrictCode(districtName)
    if (!districtCode) {
      throw new Error(`Invalid district name: ${districtName}`)
    }
    
    return await generateNextRegId(districtCode)
  } catch (error) {
    console.error('Error generating RegID from district:', error)
    throw error
  }
}

/**
 * Get the last RegID for a specific district
 */
export const getLastRegIdForDistrict = async (districtCode) => {
  try {
    console.log('🔍 Searching for existing RegIDs with district code:', districtCode)
    
    // Get all profiles and filter by district code
    const profilesRef = collection(db, RootCollection.PROFILES)
    const q = query(profilesRef)
    const snapshot = await getDocs(q)
    
    if (snapshot.empty) {
      console.log('📊 No profiles found in database')
      return null
    }
    
    // Find all RegIDs that start with the district code
    const existingRegIds = []
    snapshot.docs.forEach(doc => {
      const data = doc.data()
      const regId = data.Reg_ID || data.regId || data.reg_id || doc.id
      if (regId && regId.startsWith(districtCode)) {
        existingRegIds.push(regId)
      }
    })
    
    console.log('📋 Found existing RegIDs for district', districtCode, ':', existingRegIds)
    
    if (existingRegIds.length === 0) {
      console.log('📊 No existing RegIDs found for district:', districtCode)
      return null
    }
    
    // Find the highest number
    const numbers = existingRegIds.map(regId => {
      const numberPart = regId.replace(districtCode, '')
      return parseInt(numberPart) || 0
    })
    
    const maxNumber = Math.max(...numbers)
    const lastRegId = `${districtCode}${maxNumber.toString().padStart(3, '0')}`
    
    console.log('✅ Last RegID for district', districtCode, ':', lastRegId)
    return lastRegId
  } catch (error) {
    console.error('❌ Error getting last RegID for district:', error)
    throw new Error('Failed to get last RegID')
  }
}

/**
 * Validate RegID format
 */
export const validateRegId = (regId) => {
  if (!regId) return false
  
  // RegID format: XX### (2 letter district code + 3 digit number)
  const regIdPattern = /^[A-Z]{2}\d{3}$/
  return regIdPattern.test(regId)
}

/**
 * Extract district code from RegID
 */
export const extractDistrictFromRegId = (regId) => {
  if (!validateRegId(regId)) return null
  return regId.substring(0, 2)
}

/**
 * Extract number from RegID
 */
export const extractNumberFromRegId = (regId) => {
  if (!validateRegId(regId)) return null
  return parseInt(regId.substring(2))
}

/**
 * Check if RegID exists
 */
export const checkRegIdExists = async (regId) => {
  try {
    const profileRef = doc(db, RootCollection.PROFILES, regId)
    const profileDoc = await getDoc(profileRef)
    return profileDoc.exists()
  } catch (error) {
    console.error('Error checking RegID existence:', error)
    return false
  }
}

/**
 * Generate unique RegID (ensures no duplicates)
 */
export const generateUniqueRegId = async (districtName) => {
  let attempts = 0
  const maxAttempts = 10
  
  while (attempts < maxAttempts) {
    const regId = await generateRegIdFromDistrict(districtName)
    const exists = await checkRegIdExists(regId)
    
    if (!exists) {
      return regId
    }
    
    attempts++
  }
  
  throw new Error('Unable to generate unique RegID after maximum attempts')
}

// create timestamp - system wide function to be used in all the documents
export const createTimestamp = () => {
  const date = new Date()
  const timestamp = `${date.getMinutes()}${date.getHours()}_${date.getDate()}_${date.getMonth()}_${date.getFullYear()}`
  return timestamp
}



export default {
  generateNextRegId,
  generateRegIdFromDistrict,
  getLastRegIdForDistrict,
  validateRegId,
  extractDistrictFromRegId,
  extractNumberFromRegId,
  checkRegIdExists,
  generateUniqueRegId
} 