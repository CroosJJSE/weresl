/**
 * Validation Utility Functions
 * Common validation functions used across all projects
 */

import { DISTRICT_MAPPING, DISTRICT_CODES } from '../enums/index.js'

/**
 * Validate Registration ID format
 */
export const validateRegId = (regId) => {
  if (!regId) return { isValid: false, message: 'Registration ID is required' }
  
  // Check if it's a string
  if (typeof regId !== 'string') {
    return { isValid: false, message: 'Registration ID must be a string' }
  }
  
  // Check length (adjust based on your requirements)
  if (regId.length < 3 || regId.length > 20) {
    return { isValid: false, message: 'Registration ID must be between 3 and 20 characters' }
  }
  
  // Check for valid characters (alphanumeric and hyphens)
  if (!/^[A-Za-z0-9-]+$/.test(regId)) {
    return { isValid: false, message: 'Registration ID can only contain letters, numbers, and hyphens' }
  }
  
  return { isValid: true, message: 'Valid Registration ID' }
}

/**
 * Validate district name or code
 */
export const validateDistrict = (district) => {
  if (!district) return { isValid: false, message: 'District is required' }
  
  // Check if it's a valid district name
  if (DISTRICT_MAPPING[district] || Object.values(DISTRICT_MAPPING).includes(district)) {
    return { isValid: true, message: 'Valid district' }
  }
  
  return { isValid: false, message: 'Invalid district' }
}

/**
 * Validate NIC (National Identity Card) number
 */
export const validateNIC = (nic) => {
  if (!nic) return { isValid: false, message: 'NIC is required' }
  
  // Remove spaces and convert to uppercase
  const cleaned = nic.replace(/\s/g, '').toUpperCase()
  
  // Check for old format (9 digits + V)
  if (/^\d{9}V$/.test(cleaned)) {
    return { isValid: true, message: 'Valid NIC (old format)' }
  }
  
  // Check for new format (12 digits)
  if (/^\d{12}$/.test(cleaned)) {
    return { isValid: true, message: 'Valid NIC (new format)' }
  }
  
  return { isValid: false, message: 'Invalid NIC format' }
}

/**
 * Validate phone number
 */
export const validatePhoneNumber = (phone) => {
  if (!phone) return { isValid: false, message: 'Phone number is required' }
  
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '')
  
  // Check Sri Lankan phone number formats
  if (cleaned.length === 10 && cleaned.startsWith('0')) {
    return { isValid: true, message: 'Valid phone number' }
  }
  
  if (cleaned.length === 11 && cleaned.startsWith('94')) {
    return { isValid: true, message: 'Valid phone number' }
  }
  
  if (cleaned.length === 12 && cleaned.startsWith('94')) {
    return { isValid: true, message: 'Valid phone number' }
  }
  
  return { isValid: false, message: 'Invalid phone number format' }
}

/**
 * Validate email address
 */
export const validateEmail = (email) => {
  if (!email) return { isValid: false, message: 'Email is required' }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Invalid email format' }
  }
  
  return { isValid: true, message: 'Valid email' }
}

/**
 * Validate age
 */
export const validateAge = (age) => {
  if (!age && age !== 0) return { isValid: false, message: 'Age is required' }
  
  const numAge = parseInt(age)
  
  if (isNaN(numAge)) {
    return { isValid: false, message: 'Age must be a number' }
  }
  
  if (numAge < 0 || numAge > 150) {
    return { isValid: false, message: 'Age must be between 0 and 150' }
  }
  
  return { isValid: true, message: 'Valid age' }
}

/**
 * Validate amount
 */
export const validateAmount = (amount) => {
  if (!amount && amount !== 0) return { isValid: false, message: 'Amount is required' }
  
  const numAmount = parseFloat(amount)
  
  if (isNaN(numAmount)) {
    return { isValid: false, message: 'Amount must be a number' }
  }
  
  if (numAmount < 0) {
    return { isValid: false, message: 'Amount cannot be negative' }
  }
  
  return { isValid: true, message: 'Valid amount' }
}

/**
 * Validate required field
 */
export const validateRequired = (value, fieldName) => {
  if (!value && value !== 0) {
    return { isValid: false, message: `${fieldName} is required` }
  }
  
  if (typeof value === 'string' && value.trim() === '') {
    return { isValid: false, message: `${fieldName} is required` }
  }
  
  return { isValid: true, message: 'Valid field' }
}

/**
 * Validate Google Drive file ID
 */
export const validateFileId = (fileId) => {
  if (!fileId) return { isValid: false, message: 'File ID is required' }
  
  // Google Drive file IDs are typically 25+ characters
  if (fileId.length < 25) {
    return { isValid: false, message: 'Invalid file ID format' }
  }
  
  // Check for valid characters
  if (!/^[A-Za-z0-9-_]+$/.test(fileId)) {
    return { isValid: false, message: 'Invalid file ID characters' }
  }
  
  return { isValid: true, message: 'Valid file ID' }
} 