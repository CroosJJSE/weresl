/**
 * Google Apps Script (GAS) Integration Utilities for Loan Admin App
 * Handles data parceling and sheet operations for admin approvals
 */

import { 
  SHEET_TABS, 
  MAIN_TAB_FIELDS, 
  RF_RETURN_TAB_FIELDS, 
  LOAN_INITIATION_TAB_FIELDS,
  GAS_ACTION_TYPES,
  getTabFields,
  isValidTabName
} from '../enums/sheets.js'
import { ProfileField, RF_LOAN_FIELD, GRANT_FIELD } from '../enums/db.js'
import { convertGoogleDriveUrl } from './driveUtils.js'
import { convertProfileToMainTabFormat } from './dbUtils.js'

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
    if (!dataParcel || !dataParcel.action) {
      throw new Error('Invalid data parcel structure')
    }

    // For logActivity, tabName and regId are optional
    if (dataParcel.action !== GAS_ACTION_TYPES.LOG_ACTIVITY) {
      if (!dataParcel.tabName || !dataParcel.regId) {
        throw new Error('Invalid data parcel structure: tabName and regId are required')
      }

      if (!isValidTabName(dataParcel.tabName)) {
        throw new Error(`Invalid tab name: ${dataParcel.tabName}`)
      }
    }

    // Prepare the request
    const requestData = {
      action: dataParcel.action,
      tabName: dataParcel.tabName,
      regId: dataParcel.regId,
      data: JSON.stringify(dataParcel.data), // Stringify the data object
      timestamp: new Date().toISOString(),
      source: dataParcel.source || 'loan-admin-app',
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
 * Prepare main tab data from profile
 * @param {Object} profile - Profile data from Firestore
 * @returns {Promise<Object>} Formatted data for Main tab
 */
export const prepareMainTabData = async (profile) => {
  try {
    // Use the new conversion function to get properly formatted data
    const conversionResult = await convertProfileToMainTabFormat(profile)
    
    if (!conversionResult.success) {
      return { success: false, message: conversionResult.message || 'Failed to convert profile data' }
    }

    const convertedData = conversionResult.data

    // Map the converted data to Main tab field names
    const mainTabData = {
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

    return { success: true, data: mainTabData }
  } catch (error) {
    console.error('Error preparing main tab data:', error)
    return { success: false, message: 'Failed to prepare main tab data', error }
  }
}

/**
 * Prepare RF return tab data from payment approval
 * @param {Object} paymentData - Payment data from admin approval
 * @param {Object} profile - Profile data
 * @returns {Object} Formatted data for RF_return tab
 */
export const prepareRFReturnTabData = (paymentData, profile) => {
  try {
    // Convert receipt drive link to viewable URL if available
    const receiptUrl = paymentData.receiptDriveLinkId ? 
      convertGoogleDriveUrl(paymentData.receiptDriveLinkId) : ''

    return {
      [RF_RETURN_TAB_FIELDS.TIMESTAMP]: new Date().toISOString(),
      [RF_RETURN_TAB_FIELDS.REG_ID]: profile[ProfileField.REG_ID] || profile.regId || profile.Reg_ID || '',
      [RF_RETURN_TAB_FIELDS.NAME]: profile[ProfileField.FULL_NAME] || profile.fullName || profile.Name || profile.name || '',
      [RF_RETURN_TAB_FIELDS.AMOUNT_DEPOSITED]: paymentData.amount || 0,
      [RF_RETURN_TAB_FIELDS.RECEIVER]: paymentData.receiver || 'Admin',
      [RF_RETURN_TAB_FIELDS.RECEIPT]: receiptUrl
    }
  } catch (error) {
    console.error('Error preparing RF return tab data:', error)
    throw error
  }
}

/**
 * Prepare loan initiation tab data from loan approval
 * @param {Object} loanData - Loan data from admin approval
 * @param {Object} profile - Profile data
 * @returns {Object} Formatted data for Loan_initiation tab
 */
export const prepareLoanInitiationTabData = (loanData, profile) => {
  try {
    // Calculate age from year of birth
    const currentYear = new Date().getFullYear()
    const yearOfBirth = profile[ProfileField.YEAR_OF_BIRTH] || profile.yearOfBirth || profile.YearOfBirth
    const age = yearOfBirth ? currentYear - yearOfBirth : 'N/A'

    const preparedData = {
      [LOAN_INITIATION_TAB_FIELDS.TIMESTAMP]: new Date().toISOString(),
      [LOAN_INITIATION_TAB_FIELDS.REG_ID]: profile[ProfileField.REG_ID] || profile.regId || profile.Reg_ID || '',
      [LOAN_INITIATION_TAB_FIELDS.NAME]: profile[ProfileField.FULL_NAME] || profile.fullName || profile.Name || profile.name || '',
      [LOAN_INITIATION_TAB_FIELDS.AGE]: age,
      [LOAN_INITIATION_TAB_FIELDS.NIC]: profile[ProfileField.NIC] || profile.nic || profile.NIC || '',
      [LOAN_INITIATION_TAB_FIELDS.PHONE_NUMBER]: profile[ProfileField.PHONE_NUMBER] || profile.phoneNumber || profile.contact || profile.phone || '',
      [LOAN_INITIATION_TAB_FIELDS.DISTRICT]: profile[ProfileField.DISTRICT] || profile.district || profile.District || '',
      [LOAN_INITIATION_TAB_FIELDS.ADDRESS]: profile[ProfileField.ADDRESS] || profile.address || profile.Address || '',
      [LOAN_INITIATION_TAB_FIELDS.DESCRIPTION]: profile[ProfileField.DESCRIPTION] || profile.description || profile.Description || '',
      [LOAN_INITIATION_TAB_FIELDS.INDUSTRY]: profile[ProfileField.OCCUPATION] || profile.occupation || profile.Occupation || '',
      [LOAN_INITIATION_TAB_FIELDS.LOAN_TYPE]: loanData.type || '',
      [LOAN_INITIATION_TAB_FIELDS.AMOUNT]: loanData.amount || 0,
      [LOAN_INITIATION_TAB_FIELDS.PURPOSE]: loanData.purpose || '',
      [LOAN_INITIATION_TAB_FIELDS.SOURCE]: loanData.source || 'Admin Approval'
    }
    
    console.log('🔍 DEBUG: Prepared data for Google Sheet:', preparedData)
    return preparedData
  } catch (error) {
    console.error('Error preparing loan initiation tab data:', error)
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
    const dataResult = await prepareMainTabData(profile)
    
    if (!dataResult.success) {
      throw new Error(dataResult.message || 'Failed to prepare profile data')
    }
    
    const dataParcel = {
      action: GAS_ACTION_TYPES.UPDATE_SHEET_ROW,
      tabName: SHEET_TABS.MAIN,
      regId: profile[ProfileField.REG_ID] || profile.regId || profile.id,
      data: dataResult.data,
      source: 'loan-admin-app'
    }

    return await sendDataParcelToGAS(dataParcel)

  } catch (error) {
    console.error('Error updating main tab row:', error)
    throw error
  }
}

/**
 * Add RF return record to sheet when payment is approved
 * @param {Object} paymentData - Payment data from admin approval
 * @param {Object} profile - Profile data
 * @returns {Promise<Object>} Response from GAS
 */
export const addRFReturnRecord = async (paymentData, profile) => {
  try {
    const data = prepareRFReturnTabData(paymentData, profile)
    
    const dataParcel = {
      action: GAS_ACTION_TYPES.CREATE_SHEET_ROW,
      tabName: SHEET_TABS.RF_RETURN,
      regId: profile[ProfileField.REG_ID] || profile.regId || profile.Reg_ID || '',
      data: data,
      source: 'admin-payment-approval'
    }

    return await sendDataParcelToGAS(dataParcel)

  } catch (error) {
    console.error('Error adding RF return record:', error)
    throw error
  }
}

/**
 * Add loan initiation record to sheet when loan is approved
 * @param {Object} loanData - Loan data from admin approval
 * @param {Object} profile - Profile data
 * @returns {Promise<Object>} Response from GAS
 */
export const addLoanInitiationRecord = async (loanData, profile) => {
  try {
    const data = prepareLoanInitiationTabData(loanData, profile)
    
    const dataParcel = {
      action: GAS_ACTION_TYPES.CREATE_SHEET_ROW,
      tabName: SHEET_TABS.LOAN_INITIATION,
      regId: profile[ProfileField.REG_ID] || profile.regId || profile.Reg_ID || '',
      data: data,
      source: 'admin-loan-approval'
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
      source: 'loan-admin-app',
      tabName: 'System Log', // Add required tabName
      regId: data.regId || 'SYSTEM' // Add required regId
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
      message: 'Testing GAS connection from loan admin app',
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
  updateMainTabRow,
  addRFReturnRecord,
  addLoanInitiationRecord,
  logActivity,
  testGASConnection
} 