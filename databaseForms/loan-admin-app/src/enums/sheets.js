/**
 * Google Sheets Integration Enums for Loan Admin App
 * Defines tab names, field mappings, and data structures for GAS integration
 */

// Google Sheets Tab Names
export const SHEET_TABS = {
  MAIN: 'Main',
  RF_RETURN: 'RF_return',
  LOAN_INITIATION: 'Loan_initiation'
}

// Main Tab Field Mappings
export const MAIN_TAB_FIELDS = {
  REG_ID: 'Reg_ID',
  DISTRICT: 'District',
  NAME: 'Name',
  AGE: 'Age',
  ADDRESS: 'Address',
  NIC: 'NIC',
  CONTACT: 'contact',
  BACKGROUND_DESCRIPTION: 'Background_Description',
  OCCUPATION: 'Occupation',
  RF_LOAN: 'RF loan',
  GRANT: 'Grant'
}

// RF Return Tab Field Mappings
export const RF_RETURN_TAB_FIELDS = {
  TIMESTAMP: 'Timestamp',
  REG_ID: 'RegID',
  NAME: 'Name',
  AMOUNT_DEPOSITED: 'Amount_Deposited',
  RECEIVER: 'Receiver',
  RECEIPT: 'Receipt'
}

// Loan Initiation Tab Field Mappings
export const LOAN_INITIATION_TAB_FIELDS = {
  TIMESTAMP: 'Timestamp',
  REG_ID: 'RegID',
  NAME: 'Name',
  AGE: 'Age',
  NIC: 'NIC',
  PHONE_NUMBER: 'Phone number',
  DISTRICT: 'District',
  ADDRESS: 'Address',
  DESCRIPTION: 'Description',
  INDUSTRY: 'Industry',
  LOAN_TYPE: 'Loan_type',
  AMOUNT: 'Amount',
  PURPOSE: 'Purpose',
  SOURCE: 'Source'
}

// GAS Action Types
export const GAS_ACTION_TYPES = {
  UPDATE_SHEET_ROW: 'updateSheetRow',
  CREATE_SHEET_ROW: 'createSheetRow',
  SEND_EMAIL: 'sendEmail',
  LOG_ACTIVITY: 'logActivity'
}

// Data Parcel Interface
export const DATA_PARCEL_STRUCTURE = {
  action: 'string',
  tabName: 'string',
  regId: 'string',
  data: 'object',
  timestamp: 'date',
  source: 'string'
}

// Helper functions
export const getTabFields = (tabName) => {
  switch (tabName) {
    case SHEET_TABS.MAIN:
      return MAIN_TAB_FIELDS
    case SHEET_TABS.RF_RETURN:
      return RF_RETURN_TAB_FIELDS
    case SHEET_TABS.LOAN_INITIATION:
      return LOAN_INITIATION_TAB_FIELDS
    default:
      return {}
  }
}

export const isValidTabName = (tabName) => {
  const validTabs = [...Object.values(SHEET_TABS), 'System Log']
  return validTabs.includes(tabName)
}

export default {
  SHEET_TABS,
  MAIN_TAB_FIELDS,
  RF_RETURN_TAB_FIELDS,
  LOAN_INITIATION_TAB_FIELDS,
  GAS_ACTION_TYPES,
  getTabFields,
  isValidTabName
} 