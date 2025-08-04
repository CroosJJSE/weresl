/**
 * Google Sheets Integration Enums
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
  RECEIVER: 'Receiver'
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

// Email Notification Types
export const EMAIL_NOTIFICATION_TYPES = {
  NEW_LOAN_APPROVAL: 'NEW_LOAN_APPROVAL',
  PAYMENT_APPROVAL: 'PAYMENT_APPROVAL',
  INVALID_FORM_ENTRY: 'INVALID_FORM_ENTRY'
}

// Email Templates
export const EMAIL_TEMPLATES = {
  [EMAIL_NOTIFICATION_TYPES.NEW_LOAN_APPROVAL]: {
    subject: '🚨 New Loan Approval Request - {regId}',
    body: `
      <h2>New Loan Approval Request</h2>
      <p><strong>Reg ID:</strong> {regId}</p>
      <p><strong>Applicant Name:</strong> {name}</p>
      <p><strong>Loan Type:</strong> {loanType}</p>
      <p><strong>Amount:</strong> LKR {amount}</p>
      <p><strong>Purpose:</strong> {purpose}</p>
      <p><strong>District:</strong> {district}</p>
      <p><strong>Timestamp:</strong> {timestamp}</p>
      <p><small>⏰ Action Required: Please review and approve/reject this loan request.</small></p>
    `
  },
  [EMAIL_NOTIFICATION_TYPES.PAYMENT_APPROVAL]: {
    subject: '💰 Payment Approval Request - {regId}',
    body: `
      <h2>Payment Approval Request</h2>
      <p><strong>Reg ID:</strong> {regId}</p>
      <p><strong>Applicant Name:</strong> {name}</p>
      <p><strong>Payment Type:</strong> {paymentType}</p>
      <p><strong>Amount:</strong> LKR {amount}</p>
      <p><strong>Receiver:</strong> {receiver}</p>
      <p><strong>Timestamp:</strong> {timestamp}</p>
      <p><small>⏰ Action Required: Please review and approve/reject this payment.</small></p>
    `
  }
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
  return Object.values(SHEET_TABS).includes(tabName)
}

export const isValidEmailType = (emailType) => {
  return Object.values(EMAIL_NOTIFICATION_TYPES).includes(emailType)
}

export const getEmailTemplate = (emailType) => {
  return EMAIL_TEMPLATES[emailType] || null
}

export default {
  SHEET_TABS,
  MAIN_TAB_FIELDS,
  RF_RETURN_TAB_FIELDS,
  LOAN_INITIATION_TAB_FIELDS,
  EMAIL_NOTIFICATION_TYPES,
  EMAIL_TEMPLATES,
  GAS_ACTION_TYPES,
  getTabFields,
  isValidTabName,
  isValidEmailType,
  getEmailTemplate
} 