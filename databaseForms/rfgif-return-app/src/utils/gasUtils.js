/**
 * Google Apps Script Integration Utilities
 * Handles email notifications and GAS operations
 */

import { ProfileField } from '../enums/db.js'

// GAS Configuration
const GAS_CONFIG = {
  WEBAPP_URL: 'https://script.google.com/macros/s/AKfycbzaXn7q0Ze-I-s8zw18RxFJxHuDxSrVFbq8WLiaZgRaHhn8aBvl4Nc55HsCJS-dfd3zzg/exec',
  AUTH_TOKEN: 'test-token',
  ADMIN_EMAIL: 'tabitha@weresl.org', // Replace with actual admin email
  LOAN_ADMIN_URL: 'https://loan-admin-weresl.web.app/'
}

/**
 * Send data to Google Apps Script
 */
export const sendToGAS = async (data) => {
  try {
    // Add authentication token to all requests
    const requestData = {
      ...data,
      token: GAS_CONFIG.AUTH_TOKEN
    }

    const response = await fetch(GAS_CONFIG.WEBAPP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(requestData)
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('GAS request failed:', error)
    throw new Error(`GAS request failed: ${error.message}`)
  }
}

/**
 * Send email notification for repayment request
 */
export const sendRepaymentRequestEmail = async (profileData, repaymentData) => {
  try {
    // Handle both old and new field names
    const fullName = profileData.fullName || profileData.Name || profileData[ProfileField.FULL_NAME] || 'N/A'
    const district = profileData.district || profileData.District || profileData[ProfileField.DISTRICT] || 'N/A'
    const phoneNumber = profileData.phoneNumber || profileData.contact || profileData[ProfileField.PHONE_NUMBER] || 'N/A'
    const regId = profileData.Reg_ID || profileData.regId || profileData[ProfileField.REG_ID] || 'N/A'
    
    const { amount, type, description } = repaymentData

    // Prepare email content
    const emailContent = {
      action: 'sendEmail',
      emailType: 'REPAYMENT_REQUEST',
      subject: `Payment Request - ${type} Loan`,
      body: generateRepaymentRequestEmailBody({
        name: fullName,
        loanType: type,
        amount: amount,
        description: description,
        phoneNumber: phoneNumber,
        district: district,
        regId: regId
      }),
      timestamp: new Date().toISOString()
    }

    const result = await sendToGAS(emailContent)
    
    if (!result.success) {
      throw new Error(result.message || 'Failed to send email notification')
    }

    return result
  } catch (error) {
    console.error('Error sending repayment request email:', error)
    throw error
  }
}

/**
 * Send email notification for GIF return request
 */
export const sendGIFReturnRequestEmail = async (profileData, gifData) => {
  try {
    // Handle both old and new field names
    const fullName = profileData.fullName || profileData.Name || profileData[ProfileField.FULL_NAME] || 'N/A'
    const district = profileData.district || profileData.District || profileData[ProfileField.DISTRICT] || 'N/A'
    const phoneNumber = profileData.phoneNumber || profileData.contact || profileData[ProfileField.PHONE_NUMBER] || 'N/A'
    const regId = profileData.Reg_ID || profileData.regId || profileData[ProfileField.REG_ID] || 'N/A'
    
    const { description } = gifData

    // Prepare email content
    const emailContent = {
      action: 'sendEmail',
      emailType: 'GIF_RETURN_REQUEST',
      subject: `GIF Return Request - ${fullName}`,
      body: generateGIFReturnRequestEmailBody({
        name: fullName,
        loanType: 'GIF',
        description: description,
        phoneNumber: phoneNumber,
        district: district,
        regId: regId
      }),
      timestamp: new Date().toISOString()
    }

    const result = await sendToGAS(emailContent)
    
    if (!result.success) {
      throw new Error(result.message || 'Failed to send email notification')
    }

    return result
  } catch (error) {
    console.error('Error sending GIF return request email:', error)
    throw error
  }
}

/**
 * Generate repayment request email body
 */
const generateRepaymentRequestEmailBody = (data) => {
  const { name, loanType, amount, description, phoneNumber, district, regId } = data
  
  let emailBody = `Dear Tabitha,\n\n`
  emailBody += `${name} has requested a ${loanType} payment.\n\n`
  
  if (loanType === 'RF' && amount) {
    emailBody += `amount: ${formatCurrency(amount)} (applicable for RF loans only)\n`
  }
  
  if (loanType === 'GIF' && description) {
    emailBody += `description: ${description} (applicable for GIF only)\n`
  }
  
  emailBody += `contact: ${phoneNumber}\n`
  emailBody += `district: ${district}\n`
  emailBody += `regID: ${regId}\n\n`
  emailBody += `please click this link(${GAS_CONFIG.LOAN_ADMIN_URL}) to approve.\n\n`
  emailBody += `with love&respect\nsubi :)`

  return emailBody
}

/**
 * Generate GIF return request email body
 */
const generateGIFReturnRequestEmailBody = (data) => {
  const { name, loanType, description, phoneNumber, district, regId } = data
  
  let emailBody = `Dear Tabitha,\n\n`
  emailBody += `${name} has requested a ${loanType} return.\n\n`
  emailBody += `description: ${description} (applicable for GIF only)\n`
  emailBody += `contact: ${phoneNumber}\n`
  emailBody += `district: ${district}\n`
  emailBody += `regID: ${regId}\n\n`
  emailBody += `please click this link(${GAS_CONFIG.LOAN_ADMIN_URL}) to approve.\n\n`
  emailBody += `with love&respect\nsubi :)`

  return emailBody
}

/**
 * Format currency for email
 */
const formatCurrency = (amount) => {
  if (!amount) return '0'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 2
  }).format(amount)
}

/**
 * Test GAS connection
 */
export const testGASConnection = async () => {
  try {
    const result = await sendToGAS({
      action: 'test',
      message: 'Testing GAS connection from RFGIF Return App',
      timestamp: new Date().toISOString()
    })
    
    return result
  } catch (error) {
    console.error('GAS connection test failed:', error)
    throw error
  }
}

/**
 * Log activity to GAS
 */
export const logActivity = async (activity, data = {}) => {
  try {
    const result = await sendToGAS({
      action: 'logActivity',
      activity: activity,
      data: JSON.stringify(data),
      timestamp: new Date().toISOString()
    })
    
    return result
  } catch (error) {
    console.error('Error logging activity:', error)
    throw error
  }
}

/**
 * Update GAS configuration
 */
export const updateGASConfig = (newConfig) => {
  Object.assign(GAS_CONFIG, newConfig)
}

/**
 * Get current GAS configuration
 */
export const getGASConfig = () => {
  return { ...GAS_CONFIG }
} 