/**
 * Google Apps Script (GAS) Integration Utilities for Loan Init App
 * Handles email notifications and data parceling for loan requests
 */

import { 
  SHEET_TABS, 
  MAIN_TAB_FIELDS, 
  RF_RETURN_TAB_FIELDS, 
  LOAN_INITIATION_TAB_FIELDS,
  GAS_ACTION_TYPES,
  EMAIL_TYPES,
  getTabFields,
  isValidTabName
} from '../enums/sheets.js'
import { ProfileField, RF_LOAN_FIELD, GRANT_FIELD } from '../enums/db.js'
import { convertGoogleDriveUrl } from './driveUtils.js'
import { convertProfileToMainTabFormat } from './dbUtils.js'

// GAS Web App URL - Update this with your actual GAS deployment URL
const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzaXn7q0Ze-I-s8zw18RxFJxHuDxSrVFbq8WLiaZgRaHhn8aBvl4Nc55HsCJS-dfd3zzg/exec'

/**
 * Send data parcel to GAS for operations
 * @param {Object} dataParcel - The data parcel to send
 * @param {string} dataParcel.action - Action type (sendEmail, logActivity, etc.)
 * @param {string} dataParcel.emailType - Email type for email actions
 * @param {string} dataParcel.subject - Email subject
 * @param {string} dataParcel.body - Email body
 * @param {Object} dataParcel.data - Additional data
 * @returns {Promise<Object>} Response from GAS
 */
export const sendDataParcelToGAS = async (dataParcel) => {
  try {
    // Validate data parcel
    if (!dataParcel || !dataParcel.action) {
      throw new Error('Invalid data parcel structure')
    }

    // Prepare the request
    const requestData = {
      action: dataParcel.action,
      emailType: dataParcel.emailType,
      subject: dataParcel.subject,
      body: dataParcel.body,
      data: dataParcel.data ? JSON.stringify(dataParcel.data) : '',
      timestamp: new Date().toISOString(),
      source: dataParcel.source || 'loan-init-app',
      token: 'test-token' // Add authentication token
    }
    
    console.log('🔍 DEBUG: Sending data parcel to GAS:', requestData)

    // Send to GAS
    const response = await fetch(GAS_WEB_APP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(requestData)
    })

    if (!response.ok) {
      throw new Error(`GAS request failed: ${response.status} ${response.statusText}`)
    }

    const result = await response.json()
    return result

  } catch (error) {
    console.error('Error sending data parcel to GAS:', error)
    throw error
  }
}

/**
 * Send email notification for new loan request
 * @param {Object} profile - Profile data
 * @param {Object} loanData - Loan data
 * @returns {Promise<Object>} Response from GAS
 */
export const sendLoanRequestEmail = async (profile, loanData) => {
  try {
    // Prepare email content
    const emailSubject = `New Loan Request - ${profile[ProfileField.FULL_NAME] || profile.fullName || profile.Name}`
    
    const emailBody = `Dear Tabitha,

${profile[ProfileField.FULL_NAME] || profile.fullName || profile.Name} has requested a ${loanData.type} loan.

Amount: ${loanData.amount}
Contact: ${profile[ProfileField.PHONE_NUMBER] || profile.contact || profile.phoneNumber}
District: ${profile[ProfileField.DISTRICT] || profile.district || profile.District}
RegID: ${profile[ProfileField.REG_ID] || profile.regId || profile.Reg_ID}

Please click this link to review: https://loan-admin-weresl.web.app/

With love & respect,
Subi :)`

    const dataParcel = {
      action: GAS_ACTION_TYPES.SEND_EMAIL,
      emailType: EMAIL_TYPES.NEW_LOAN_REQUEST,
      subject: emailSubject,
      body: emailBody,
      data: {
        profile: profile,
        loanData: loanData,
        timestamp: new Date().toISOString()
      },
      source: 'loan-init-app'
    }

    console.log('📧 Sending loan request email notification...')
    const result = await sendDataParcelToGAS(dataParcel)
    
    if (result.success) {
      console.log('✅ Email notification sent successfully')
    } else {
      console.warn('⚠️ Email notification failed:', result.message)
    }

    return result

  } catch (error) {
    console.error('❌ Error sending loan request email:', error)
    throw error
  }
}

/**
 * Prepare main tab data from profile
 * @param {Object} profile - Profile data from Firestore
 * @returns {Promise<Object>} Formatted data for Main tab
 */
export const prepareMainTabData = async (profile) => {
  try {
    // Use the conversion function to get properly formatted data
    const conversionResult = await convertProfileToMainTabFormat(profile)
    
    if (!conversionResult.success) {
      throw new Error(conversionResult.message || 'Failed to convert profile data')
    }

    const convertedData = conversionResult.data

    // Map the converted data to Main tab field names
    return {
      [MAIN_TAB_FIELDS.REG_ID]: convertedData[ProfileField.REG_ID] || '',
      [MAIN_TAB_FIELDS.DISTRICT]: convertedData[ProfileField.DISTRICT] || '',
      [MAIN_TAB_FIELDS.NAME]: convertedData[ProfileField.FULL_NAME] || '',
      [MAIN_TAB_FIELDS.AGE]: convertedData.age || 'N/A',
      [MAIN_TAB_FIELDS.ADDRESS]: convertedData[ProfileField.ADDRESS] || '',
      [MAIN_TAB_FIELDS.NIC]: convertedData[ProfileField.NIC] || '',
      [MAIN_TAB_FIELDS.CONTACT]: convertedData[ProfileField.PHONE_NUMBER] || '',
      [MAIN_TAB_FIELDS.BACKGROUND_DESCRIPTION]: convertedData[ProfileField.DESCRIPTION] || '',
      [MAIN_TAB_FIELDS.OCCUPATION]: convertedData[ProfileField.OCCUPATION] || '',
      [MAIN_TAB_FIELDS.RF_LOAN]: convertedData.rfLoan || 'No',
      [MAIN_TAB_FIELDS.GRANT]: convertedData.grant || 'No'
    }
  } catch (error) {
    console.error('Error preparing main tab data:', error)
    throw error
  }
}

/**
 * Prepare loan initiation tab data from loan request
 * @param {Object} loanData - Loan data from loan request
 * @param {Object} profile - Profile data
 * @returns {Object} Formatted data for Loan_initiation tab
 */
export const prepareLoanInitiationTabData = (loanData, profile) => {
  try {
    // Calculate age from year of birth
    const currentYear = new Date().getFullYear()
    const yearOfBirth = profile[ProfileField.YEAR_OF_BIRTH] || profile.yearOfBirth
    const age = yearOfBirth ? currentYear - yearOfBirth : 'N/A'

    const preparedData = {
      [LOAN_INITIATION_TAB_FIELDS.TIMESTAMP]: new Date().toISOString(),
      [LOAN_INITIATION_TAB_FIELDS.REG_ID]: profile[ProfileField.REG_ID] || profile.regId || '',
      [LOAN_INITIATION_TAB_FIELDS.NAME]: profile[ProfileField.FULL_NAME] || profile.fullName || '',
      [LOAN_INITIATION_TAB_FIELDS.AGE]: age,
      [LOAN_INITIATION_TAB_FIELDS.NIC]: profile[ProfileField.NIC] || profile.nic || '',
      [LOAN_INITIATION_TAB_FIELDS.PHONE_NUMBER]: profile[ProfileField.PHONE_NUMBER] || profile.contact || '',
      [LOAN_INITIATION_TAB_FIELDS.DISTRICT]: profile[ProfileField.DISTRICT] || profile.district || '',
      [LOAN_INITIATION_TAB_FIELDS.ADDRESS]: profile[ProfileField.ADDRESS] || profile.address || '',
      [LOAN_INITIATION_TAB_FIELDS.DESCRIPTION]: profile[ProfileField.DESCRIPTION] || profile.description || '',
      [LOAN_INITIATION_TAB_FIELDS.INDUSTRY]: profile[ProfileField.OCCUPATION] || profile.occupation || '',
      [LOAN_INITIATION_TAB_FIELDS.LOAN_TYPE]: loanData.type || '',
      [LOAN_INITIATION_TAB_FIELDS.AMOUNT]: loanData.amount || 0,
      [LOAN_INITIATION_TAB_FIELDS.PURPOSE]: loanData.purpose || '',
      [LOAN_INITIATION_TAB_FIELDS.SOURCE]: loanData.source || 'Web App'
    }
    
    console.log('🔍 DEBUG: Prepared data for Google Sheet:', preparedData)
    return preparedData
  } catch (error) {
    console.error('Error preparing loan initiation tab data:', error)
    throw error
  }
}

/**
 * Add loan initiation record to sheet when loan is requested
 * @param {Object} loanData - Loan data from loan request
 * @param {Object} profile - Profile data
 * @returns {Promise<Object>} Response from GAS
 */
export const addLoanInitiationRecord = async (loanData, profile) => {
  try {
    const data = prepareLoanInitiationTabData(loanData, profile)
    
    const dataParcel = {
      action: GAS_ACTION_TYPES.CREATE_SHEET_ROW,
      tabName: SHEET_TABS.LOAN_INITIATION,
      regId: profile[ProfileField.REG_ID],
      data: data,
      source: 'loan-init-app'
    }

    return await sendDataParcelToGAS(dataParcel)

  } catch (error) {
    console.error('Error adding loan initiation record:', error)
    throw error
  }
}

/**
 * Log activity to GAS
 * @param {string} activity - Activity description
 * @param {Object} data - Additional data
 * @returns {Promise<Object>} Response from GAS
 */
export const logActivity = async (activity, data = {}) => {
  try {
    const logData = {
      action: GAS_ACTION_TYPES.LOG_ACTIVITY,
      activity: activity,
      data: data,
      timestamp: new Date().toISOString(),
      source: 'loan-init-app'
    }

    return await sendDataParcelToGAS(logData)

  } catch (error) {
    console.error('Error logging activity:', error)
    throw error
  }
}

/**
 * Test GAS connection
 * @returns {Promise<Object>} Test response
 */
export const testGASConnection = async () => {
  try {
    const testData = {
      action: 'test',
      message: 'Testing GAS connection from loan init app',
      timestamp: new Date().toISOString()
    }

    return await sendDataParcelToGAS(testData)

  } catch (error) {
    console.error('Error testing GAS connection:', error)
    throw error
  }
}

export default {
  sendDataParcelToGAS,
  sendLoanRequestEmail,
  prepareMainTabData,
  prepareLoanInitiationTabData,
  addLoanInitiationRecord,
  logActivity,
  testGASConnection
} 