/**
 * Google Apps Script (GAS) Integration Utilities
 * Handles data parceling, email notifications, and sheet operations
 */

import { 
  SHEET_TABS, 
  MAIN_TAB_FIELDS, 
  RF_RETURN_TAB_FIELDS, 
  LOAN_INITIATION_TAB_FIELDS,
  EMAIL_NOTIFICATION_TYPES,
  GAS_ACTION_TYPES,
  getTabFields,
  isValidTabName,
  isValidEmailType,
  getEmailTemplate
} from '../enums/sheets.js'
import { ProfileField, RF_LOAN_FIELD, GRANT_FIELD } from '../enums/db.js'
import { convertGoogleDriveUrl, extractFileId } from './driveUtils.js'

// GAS Web App URL - Update this with your actual GAS deployment URL
const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzaXn7q0Ze-I-s8zw18RxFJxHuDxSrVFbq8WLiaZgRaHhn8aBvl4Nc55HsCJS-dfd3zzg/exec'

/**
 * Send data parcel to GAS for sheet operations
 * @param {Object} dataParcel - The data parcel to send
 * @param {string} dataParcel.action - Action type (updateSheetRow, createSheetRow, etc.)
 * @param {string} dataParcel.tabName - Target sheet tab name
 * @param {string} dataParcel.regId - Registration ID
 * @param {Object} dataParcel.data - Data to be processed
 * @param {string} dataParcel.source - Source application
 * @returns {Promise<Object>} Response from GAS
 */
export const sendDataParcelToGAS = async (dataParcel) => {
  try {
    // Validate data parcel
    if (!dataParcel || !dataParcel.action || !dataParcel.tabName || !dataParcel.regId) {
      throw new Error('Invalid data parcel structure')
    }

    if (!isValidTabName(dataParcel.tabName)) {
      throw new Error(`Invalid tab name: ${dataParcel.tabName}`)
    }

    // Prepare the request
    const requestData = {
      action: dataParcel.action,
      tabName: dataParcel.tabName,
      regId: dataParcel.regId,
      data: dataParcel.data,
      timestamp: new Date().toISOString(),
      source: dataParcel.source || 'web-app'
    }

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
 * Prepare main tab data from profile
 * @param {Object} profile - Profile data from Firestore
 * @returns {Object} Formatted data for Main tab
 */
export const prepareMainTabData = (profile) => {
  try {
    // Calculate age from year of birth
    const currentYear = new Date().getFullYear()
    const age = profile[ProfileField.YEAR_OF_BIRTH] ? 
      currentYear - profile[ProfileField.YEAR_OF_BIRTH] : 'N/A'

    return {
      [MAIN_TAB_FIELDS.REG_ID]: profile[ProfileField.REG_ID] || '',
      [MAIN_TAB_FIELDS.DISTRICT]: profile[ProfileField.DISTRICT] || '',
      [MAIN_TAB_FIELDS.NAME]: profile[ProfileField.FULL_NAME] || '',
      [MAIN_TAB_FIELDS.AGE]: age,
      [MAIN_TAB_FIELDS.ADDRESS]: profile[ProfileField.ADDRESS] || '',
      [MAIN_TAB_FIELDS.NIC]: profile[ProfileField.NIC] || '',
      [MAIN_TAB_FIELDS.CONTACT]: profile[ProfileField.PHONE_NUMBER] || '',
      [MAIN_TAB_FIELDS.BACKGROUND_DESCRIPTION]: profile[ProfileField.DESCRIPTION] || '',
      [MAIN_TAB_FIELDS.OCCUPATION]: profile[ProfileField.OCCUPATION] || '',
      [MAIN_TAB_FIELDS.RF_LOAN]: 'Yes', // Placeholder - will be updated based on actual loans
      [MAIN_TAB_FIELDS.GRANT]: 'No' // Placeholder - will be updated based on actual grants
    }
  } catch (error) {
    console.error('Error preparing main tab data:', error)
    throw error
  }
}

/**
 * Prepare RF return tab data
 * @param {Object} returnRecord - RF return record data
 * @param {Object} profile - Profile data
 * @returns {Object} Formatted data for RF_return tab
 */
export const prepareRFReturnTabData = (returnRecord, profile) => {
  try {
    return {
      [RF_RETURN_TAB_FIELDS.TIMESTAMP]: new Date().toISOString(),
      [RF_RETURN_TAB_FIELDS.REG_ID]: profile[ProfileField.REG_ID] || '',
      [RF_RETURN_TAB_FIELDS.NAME]: profile[ProfileField.FULL_NAME] || '',
      [RF_RETURN_TAB_FIELDS.AMOUNT_DEPOSITED]: returnRecord[RF_LOAN_FIELD.PAID_AMOUNT] || 0,
      [RF_RETURN_TAB_FIELDS.RECEIVER]: returnRecord.receiver || 'Admin'
    }
  } catch (error) {
    console.error('Error preparing RF return tab data:', error)
    throw error
  }
}

/**
 * Prepare loan initiation tab data
 * @param {Object} loanData - Loan data
 * @param {Object} profile - Profile data
 * @returns {Object} Formatted data for Loan_initiation tab
 */
export const prepareLoanInitiationTabData = (loanData, profile) => {
  try {
    // Calculate age from year of birth
    const currentYear = new Date().getFullYear()
    const age = profile[ProfileField.YEAR_OF_BIRTH] ? 
      currentYear - profile[ProfileField.YEAR_OF_BIRTH] : 'N/A'

    return {
      [LOAN_INITIATION_TAB_FIELDS.TIMESTAMP]: new Date().toISOString(),
      [LOAN_INITIATION_TAB_FIELDS.REG_ID]: profile[ProfileField.REG_ID] || '',
      [LOAN_INITIATION_TAB_FIELDS.NAME]: profile[ProfileField.FULL_NAME] || '',
      [LOAN_INITIATION_TAB_FIELDS.AGE]: age,
      [LOAN_INITIATION_TAB_FIELDS.NIC]: profile[ProfileField.NIC] || '',
      [LOAN_INITIATION_TAB_FIELDS.PHONE_NUMBER]: profile[ProfileField.PHONE_NUMBER] || '',
      [LOAN_INITIATION_TAB_FIELDS.DISTRICT]: profile[ProfileField.DISTRICT] || '',
      [LOAN_INITIATION_TAB_FIELDS.ADDRESS]: profile[ProfileField.ADDRESS] || '',
      [LOAN_INITIATION_TAB_FIELDS.DESCRIPTION]: profile[ProfileField.DESCRIPTION] || '',
      [LOAN_INITIATION_TAB_FIELDS.INDUSTRY]: profile[ProfileField.OCCUPATION] || '',
      [LOAN_INITIATION_TAB_FIELDS.LOAN_TYPE]: loanData[RF_LOAN_FIELD.TYPE] || '',
      [LOAN_INITIATION_TAB_FIELDS.AMOUNT]: loanData[RF_LOAN_FIELD.AMOUNT] || 0,
      [LOAN_INITIATION_TAB_FIELDS.PURPOSE]: loanData[RF_LOAN_FIELD.PURPOSE] || '',
      [LOAN_INITIATION_TAB_FIELDS.SOURCE]: loanData.source || 'Web App'
    }
  } catch (error) {
    console.error('Error preparing loan initiation tab data:', error)
    throw error
  }
}

/**
 * Send email notification to admin
 * @param {string} emailType - Type of email notification
 * @param {Object} data - Data for email template
 * @returns {Promise<Object>} Response from GAS
 */
export const sendEmailNotification = async (emailType, data) => {
  try {
    if (!isValidEmailType(emailType)) {
      throw new Error(`Invalid email type: ${emailType}`)
    }

    const template = getEmailTemplate(emailType)
    if (!template) {
      throw new Error(`No template found for email type: ${emailType}`)
    }

    // Replace placeholders in template
    let subject = template.subject
    let body = template.body

    Object.keys(data).forEach(key => {
      const placeholder = `{${key}}`
      subject = subject.replace(placeholder, data[key] || '')
      body = body.replace(placeholder, data[key] || '')
    })

    const emailData = {
      action: GAS_ACTION_TYPES.SEND_EMAIL,
      emailType: emailType,
      subject: subject,
      body: body,
      timestamp: new Date().toISOString()
    }

    return await sendDataParcelToGAS(emailData)

  } catch (error) {
    console.error('Error sending email notification:', error)
    throw error
  }
}

/**
 * Update main tab row with profile data
 * @param {Object} profile - Profile data
 * @returns {Promise<Object>} Response from GAS
 */
export const updateMainTabRow = async (profile) => {
  try {
    const data = prepareMainTabData(profile)
    
    const dataParcel = {
      action: GAS_ACTION_TYPES.UPDATE_SHEET_ROW,
      tabName: SHEET_TABS.MAIN,
      regId: profile[ProfileField.REG_ID],
      data: data,
      source: 'profile-update'
    }

    return await sendDataParcelToGAS(dataParcel)

  } catch (error) {
    console.error('Error updating main tab row:', error)
    throw error
  }
}

/**
 * Add RF return record to sheet
 * @param {Object} returnRecord - RF return record
 * @param {Object} profile - Profile data
 * @returns {Promise<Object>} Response from GAS
 */
export const addRFReturnRecord = async (returnRecord, profile) => {
  try {
    const data = prepareRFReturnTabData(returnRecord, profile)
    
    const dataParcel = {
      action: GAS_ACTION_TYPES.CREATE_SHEET_ROW,
      tabName: SHEET_TABS.RF_RETURN,
      regId: profile[ProfileField.REG_ID],
      data: data,
      source: 'rf-return'
    }

    return await sendDataParcelToGAS(dataParcel)

  } catch (error) {
    console.error('Error adding RF return record:', error)
    throw error
  }
}

/**
 * Add loan initiation record to sheet
 * @param {Object} loanData - Loan data
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
      source: 'loan-initiation'
    }

    return await sendDataParcelToGAS(dataParcel)

  } catch (error) {
    console.error('Error adding loan initiation record:', error)
    throw error
  }
}

/**
 * Send new loan approval notification
 * @param {Object} loanData - Loan data
 * @param {Object} profile - Profile data
 * @returns {Promise<Object>} Response from GAS
 */
export const sendNewLoanApprovalNotification = async (loanData, profile) => {
  try {
    const emailData = {
      regId: profile[ProfileField.REG_ID] || '',
      name: profile[ProfileField.FULL_NAME] || '',
      loanType: loanData[RF_LOAN_FIELD.TYPE] || '',
      amount: loanData[RF_LOAN_FIELD.AMOUNT] || 0,
      purpose: loanData[RF_LOAN_FIELD.PURPOSE] || '',
      district: profile[ProfileField.DISTRICT] || '',
      timestamp: new Date().toLocaleString()
    }

    return await sendEmailNotification(EMAIL_NOTIFICATION_TYPES.NEW_LOAN_APPROVAL, emailData)

  } catch (error) {
    console.error('Error sending new loan approval notification:', error)
    throw error
  }
}

/**
 * Send payment approval notification
 * @param {Object} paymentData - Payment data
 * @param {Object} profile - Profile data
 * @returns {Promise<Object>} Response from GAS
 */
export const sendPaymentApprovalNotification = async (paymentData, profile) => {
  try {
    const emailData = {
      regId: profile[ProfileField.REG_ID] || '',
      name: profile[ProfileField.FULL_NAME] || '',
      paymentType: paymentData.paymentType || 'RF Repayment',
      amount: paymentData.amount || 0,
      receiver: paymentData.receiver || '',
      timestamp: new Date().toLocaleString()
    }

    return await sendEmailNotification(EMAIL_NOTIFICATION_TYPES.PAYMENT_APPROVAL, emailData)

  } catch (error) {
    console.error('Error sending payment approval notification:', error)
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
      source: 'web-app'
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
      message: 'Testing GAS connection',
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
  prepareMainTabData,
  prepareRFReturnTabData,
  prepareLoanInitiationTabData,
  sendEmailNotification,
  updateMainTabRow,
  addRFReturnRecord,
  addLoanInitiationRecord,
  sendNewLoanApprovalNotification,
  sendPaymentApprovalNotification,
  logActivity,
  testGASConnection
} 