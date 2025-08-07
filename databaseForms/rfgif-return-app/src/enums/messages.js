/**
 * Message Enums and Types
 * Error and success message constants
 */

// Error message types
export const ErrorMessage = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  UPLOAD_ERROR: 'Failed to upload file. Please try again.',
  SAVE_ERROR: 'Failed to save data. Please try again.',
  DELETE_ERROR: 'Failed to delete item. Please try again.',
  LOAD_ERROR: 'Failed to load data. Please refresh the page.',
  SERVER_ERROR: 'Server error. Please try again later.',
  TIMEOUT_ERROR: 'Request timeout. Please try again.',
  PERMISSION_ERROR: 'You do not have permission to perform this action.',
  CONNECTION_ERROR: 'Connection lost. Please check your internet.',
  FILE_TOO_LARGE: 'File size is too large. Please choose a smaller file.',
  INVALID_FILE_TYPE: 'Invalid file type. Please choose a valid file.',
  DUPLICATE_ENTRY: 'This entry already exists.',
  INVALID_CREDENTIALS: 'Invalid credentials. Please check your input.',
  SESSION_EXPIRED: 'Your session has expired. Please login again.',
  RATE_LIMIT_EXCEEDED: 'Too many requests. Please try again later.',
  EMAIL_SEND_ERROR: 'Failed to send email notification. Please try again.',
  GAS_INTEGRATION_ERROR: 'Failed to connect to Google Apps Script. Please try again.'
}

// Success message types
export const SuccessMessage = {
  SAVE_SUCCESS: 'Data saved successfully.',
  DELETE_SUCCESS: 'Item deleted successfully.',
  UPLOAD_SUCCESS: 'File uploaded successfully.',
  APPROVE_SUCCESS: 'Loan approved successfully.',
  UPDATE_SUCCESS: 'Data updated successfully.',
  CREATE_SUCCESS: 'Item created successfully.',
  LOGIN_SUCCESS: 'Login successful.',
  LOGOUT_SUCCESS: 'Logout successful.',
  PASSWORD_CHANGED: 'Password changed successfully.',
  PROFILE_UPDATED: 'Profile updated successfully.',
  SETTINGS_SAVED: 'Settings saved successfully.',
  BACKUP_CREATED: 'Backup created successfully.',
  RESTORE_SUCCESS: 'Data restored successfully.',
  EXPORT_SUCCESS: 'Data exported successfully.',
  IMPORT_SUCCESS: 'Data imported successfully.',
  VALIDATION_SUCCESS: 'Validation successful.',
  OPERATION_COMPLETED: 'Operation completed successfully.',
  EMAIL_SENT_SUCCESS: 'Email notification sent successfully.',
  PAYMENT_REQUEST_SUBMITTED: 'Payment request submitted successfully. Email notification sent.',
  REPAYMENT_REQUEST_SUBMITTED: 'Repayment request submitted successfully. Email notification sent.'
}

// Info message types
export const InfoMessage = {
  LOADING: 'Loading...',
  PROCESSING: 'Processing...',
  SAVING: 'Saving...',
  UPLOADING: 'Uploading...',
  DELETING: 'Deleting...',
  SEARCHING: 'Searching...',
  VALIDATING: 'Validating...',
  CONNECTING: 'Connecting...',
  SYNCING: 'Syncing...',
  BACKING_UP: 'Creating backup...',
  RESTORING: 'Restoring data...',
  EXPORTING: 'Exporting data...',
  IMPORTING: 'Importing data...',
  SENDING_EMAIL: 'Sending email notification...',
  PROCESSING_PAYMENT: 'Processing payment request...'
}

// Warning message types
export const WarningMessage = {
  UNSAVED_CHANGES: 'You have unsaved changes. Are you sure you want to leave?',
  DELETE_CONFIRMATION: 'Are you sure you want to delete this item?',
  OVERWRITE_CONFIRMATION: 'This will overwrite existing data. Are you sure?',
  LARGE_FILE: 'This file is large and may take time to upload.',
  SLOW_CONNECTION: 'Your connection seems slow. Please wait.',
  LIMITED_FUNCTIONALITY: 'Some features may not work properly.',
  DATA_OUTDATED: 'Your data may be outdated. Please refresh.',
  STORAGE_LOW: 'Storage space is running low.',
  BACKUP_RECOMMENDED: 'It is recommended to create a backup.',
  UPDATE_AVAILABLE: 'A new version is available.',
  EMAIL_NOTIFICATION_DISABLED: 'Email notifications are currently disabled.',
  GAS_INTEGRATION_DISABLED: 'Google Apps Script integration is currently disabled.'
}

// Email notification types
export const EmailType = {
  NEW_LOAN_APPROVAL: 'NEW_LOAN_APPROVAL',
  PAYMENT_APPROVAL: 'PAYMENT_APPROVAL',
  REPAYMENT_REQUEST: 'REPAYMENT_REQUEST',
  GIF_RETURN_REQUEST: 'GIF_RETURN_REQUEST',
  SYSTEM_NOTIFICATION: 'SYSTEM_NOTIFICATION'
}

// Email template types
export const EmailTemplate = {
  REPAYMENT_REQUEST: 'REPAYMENT_REQUEST',
  GIF_RETURN_REQUEST: 'GIF_RETURN_REQUEST',
  PAYMENT_APPROVAL: 'PAYMENT_APPROVAL'
}

// Helper functions
export const getErrorMessage = (type) => {
  return ErrorMessage[type] || type
}

export const getSuccessMessage = (type) => {
  return SuccessMessage[type] || type
}

export const getInfoMessage = (type) => {
  return InfoMessage[type] || type
}

export const getWarningMessage = (type) => {
  return WarningMessage[type] || type
}

export const isValidErrorMessage = (message) => {
  return Object.values(ErrorMessage).includes(message)
}

export const isValidSuccessMessage = (message) => {
  return Object.values(SuccessMessage).includes(message)
}

export const isValidInfoMessage = (message) => {
  return Object.values(InfoMessage).includes(message)
}

export const isValidWarningMessage = (message) => {
  return Object.values(WarningMessage).includes(message)
}

export const getErrorMessages = () => {
  return Object.entries(ErrorMessage).map(([key, value]) => ({
    value,
    label: key.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
  }))
}

export const getSuccessMessages = () => {
  return Object.entries(SuccessMessage).map(([key, value]) => ({
    value,
    label: key.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
  }))
} 