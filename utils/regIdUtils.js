/**
 * Registration ID Generation Utilities
 * Functions to generate unique registration IDs based on district codes
 */

import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase-config.js'
import { District, DISTRICT_MAPPING } from '../enums/index.js'

/**
 * Get district code from district name
 * @param {string} districtName - Full district name (e.g., 'Colombo', 'Mannar')
 * @returns {string} District code (e.g., 'COL', 'MAN')
 */
export const getDistrictCode = (districtName) => {
  // Find the district code by name
  const districtEntry = Object.entries(DISTRICT_MAPPING).find(
    ([code, name]) => name.toLowerCase() === districtName.toLowerCase()
  )
  
  if (!districtEntry) {
    throw new Error(`Invalid district name: ${districtName}`)
  }
  
  return districtEntry[0]
}

/**
 * Get existing registration IDs for a specific district
 * @param {string} districtCode - District code (e.g., 'MAN', 'COL')
 * @returns {Promise<string[]>} Array of existing registration IDs
 */
export const getExistingRegIds = async (districtCode) => {
  try {
    // Validate district code
    if (!Object.values(District).includes(districtCode)) {
      throw new Error(`Invalid district code: ${districtCode}`)
    }

    // Query profiles collection for documents where Reg_ID starts with district code
    const profilesRef = collection(db, 'profiles')
    const q = query(profilesRef, where('Reg_ID', '>=', districtCode), where('Reg_ID', '<=', districtCode + '\uf8ff'))
    
    const querySnapshot = await getDocs(q)
    const existingRegIds = []
    
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      if (data.Reg_ID && data.Reg_ID.startsWith(districtCode)) {
        existingRegIds.push(data.Reg_ID)
      }
    })
    
    return existingRegIds.sort() // Sort alphabetically
  } catch (error) {
    console.error('Error fetching existing registration IDs:', error)
    throw error
  }
}

/**
 * Generate next available registration ID for a district
 * @param {string} districtCode - District code (e.g., 'MAN', 'COL')
 * @returns {Promise<string>} Next available registration ID
 */
export const generateNextRegId = async (districtCode) => {
  try {
    const existingRegIds = await getExistingRegIds(districtCode)
    
    if (existingRegIds.length === 0) {
      return `${districtCode}001`
    }
    
    // Extract numbers from existing IDs and sort them
    const numbers = existingRegIds.map(regId => {
      const match = regId.match(new RegExp(`^${districtCode}(\\d+)$`))
      return match ? parseInt(match[1]) : 0
    }).filter(num => num > 0).sort((a, b) => a - b)
    
    if (numbers.length === 0) {
      return `${districtCode}001`
    }
    
    // Find the first missing number in the sequence
    let expectedNumber = 1
    for (const existingNumber of numbers) {
      if (existingNumber !== expectedNumber) {
        // Found a gap, return the missing number
        return `${districtCode}${expectedNumber.toString().padStart(3, '0')}`
      }
      expectedNumber++
    }
    
    // No gaps found, return the next number after the highest
    const nextNumber = Math.max(...numbers) + 1
    return `${districtCode}${nextNumber.toString().padStart(3, '0')}`
  } catch (error) {
    console.error('Error generating next registration ID:', error)
    throw error
  }
}

/**
 * Generate registration ID from district name
 * @param {string} districtName - Full district name (e.g., 'Colombo', 'Mannar')
 * @returns {Promise<string>} Next available registration ID
 */
export const generateRegIdFromDistrict = async (districtName) => {
  try {
    const districtCode = getDistrictCode(districtName)
    return await generateNextRegId(districtCode)
  } catch (error) {
    console.error('Error generating registration ID from district:', error)
    throw error
  }
}

/**
 * Validate registration ID format
 * @param {string} regId - Registration ID to validate
 * @returns {boolean} True if valid format
 */
export const validateRegIdFormat = (regId) => {
  if (!regId || typeof regId !== 'string') {
    return false
  }
  
  // Check if it matches pattern: DISTRICT_CODE + 3 digits
  const pattern = /^[A-Z]{3}\d{3}$/
  return pattern.test(regId)
}

/**
 * Extract district code from registration ID
 * @param {string} regId - Registration ID
 * @returns {string} District code
 */
export const extractDistrictCodeFromRegId = (regId) => {
  if (!validateRegIdFormat(regId)) {
    throw new Error(`Invalid registration ID format: ${regId}`)
  }
  
  return regId.substring(0, 3)
}

/**
 * Extract number from registration ID
 * @param {string} regId - Registration ID
 * @returns {number} Number part of registration ID
 */
export const extractNumberFromRegId = (regId) => {
  if (!validateRegIdFormat(regId)) {
    throw new Error(`Invalid registration ID format: ${regId}`)
  }
  
  return parseInt(regId.substring(3))
}

/**
 * Check if registration ID already exists
 * @param {string} regId - Registration ID to check
 * @returns {Promise<boolean>} True if exists
 */
export const checkRegIdExists = async (regId) => {
  try {
    if (!validateRegIdFormat(regId)) {
      throw new Error(`Invalid registration ID format: ${regId}`)
    }
    
    const existingRegIds = await getExistingRegIds(extractDistrictCodeFromRegId(regId))
    return existingRegIds.includes(regId)
  } catch (error) {
    console.error('Error checking registration ID existence:', error)
    throw error
  }
}

/**
 * Get all registration IDs for a district with their details
 * @param {string} districtCode - District code
 * @returns {Promise<Array>} Array of registration IDs with profile details
 */
export const getRegIdsWithDetails = async (districtCode) => {
  try {
    const existingRegIds = await getExistingRegIds(districtCode)
    const profilesRef = collection(db, 'profiles')
    
    const profiles = []
    
    for (const regId of existingRegIds) {
      const q = query(profilesRef, where('Reg_ID', '==', regId))
      const querySnapshot = await getDocs(q)
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0]
        profiles.push({
          regId: doc.data().Reg_ID,
          fullName: doc.data().fullName || doc.data().Name,
          district: doc.data().district || doc.data().District,
          nic: doc.data().nic || doc.data().NIC,
          createdAt: doc.data().createdAt
        })
      }
    }
    
    return profiles.sort((a, b) => a.regId.localeCompare(b.regId))
  } catch (error) {
    console.error('Error fetching registration IDs with details:', error)
    throw error
  }
}


