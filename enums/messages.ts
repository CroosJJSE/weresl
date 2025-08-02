/**
 * Message Enums and Types
 * Error and success message constants
 */

// Error message types
export enum ErrorMessage {
  NETWORK_ERROR = 'Network error. Please check your connection.',
  UNAUTHORIZED = 'You are not authorized to perform this action.',
  NOT_FOUND = 'The requested resource was not found.',
  VALIDATION_ERROR = 'Please check your input and try again.',
  UPLOAD_ERROR = 'Failed to upload file. Please try again.',
  SAVE_ERROR = 'Failed to save data. Please try again.',
  DELETE_ERROR = 'Failed to delete item. Please try again.',
  LOAD_ERROR = 'Failed to load data. Please refresh the page.',
  SERVER_ERROR = 'Server error. Please try again later.',
  TIMEOUT_ERROR = 'Request timeout. Please try again.',
  PERMISSION_ERROR = 'You do not have permission to perform this action.',
  CONNECTION_ERROR = 'Connection lost. Please check your internet.',
  FILE_TOO_LARGE = 'File size is too large. Please choose a smaller file.',
  INVALID_FILE_TYPE = 'Invalid file type. Please choose a valid file.',
  DUPLICATE_ENTRY = 'This entry already exists.',
  INVALID_CREDENTIALS = 'Invalid credentials. Please check your input.',
  SESSION_EXPIRED = 'Your session has expired. Please login again.',
  RATE_LIMIT_EXCEEDED = 'Too many requests. Please try again later.'
}

// Success message types
export enum SuccessMessage {
  SAVE_SUCCESS = 'Data saved successfully.',
  DELETE_SUCCESS = 'Item deleted successfully.',
  UPLOAD_SUCCESS = 'File uploaded successfully.',
  APPROVE_SUCCESS = 'Loan approved successfully.',
  UPDATE_SUCCESS = 'Data updated successfully.',
  CREATE_SUCCESS = 'Item created successfully.',
  LOGIN_SUCCESS = 'Login successful.',
  LOGOUT_SUCCESS = 'Logout successful.',
  PASSWORD_CHANGED = 'Password changed successfully.',
  PROFILE_UPDATED = 'Profile updated successfully.',
  SETTINGS_SAVED = 'Settings saved successfully.',
  BACKUP_CREATED = 'Backup created successfully.',
  RESTORE_SUCCESS = 'Data restored successfully.',
  EXPORT_SUCCESS = 'Data exported successfully.',
  IMPORT_SUCCESS = 'Data imported successfully.',
  VALIDATION_SUCCESS = 'Validation successful.',
  OPERATION_COMPLETED = 'Operation completed successfully.'
}

// Info message types
export enum InfoMessage {
  LOADING = 'Loading...',
  PROCESSING = 'Processing...',
  SAVING = 'Saving...',
  UPLOADING = 'Uploading...',
  DELETING = 'Deleting...',
  SEARCHING = 'Searching...',
  VALIDATING = 'Validating...',
  CONNECTING = 'Connecting...',
  SYNCING = 'Syncing...',
  BACKING_UP = 'Creating backup...',
  RESTORING = 'Restoring data...',
  EXPORTING = 'Exporting data...',
  IMPORTING = 'Importing data...'
}

// Warning message types
export enum WarningMessage {
  UNSAVED_CHANGES = 'You have unsaved changes. Are you sure you want to leave?',
  DELETE_CONFIRMATION = 'Are you sure you want to delete this item?',
  OVERWRITE_CONFIRMATION = 'This will overwrite existing data. Are you sure?',
  LARGE_FILE = 'This file is large and may take time to upload.',
  SLOW_CONNECTION = 'Your connection seems slow. Please wait.',
  LIMITED_FUNCTIONALITY = 'Some features may not work properly.',
  DATA_OUTDATED = 'Your data may be outdated. Please refresh.',
  STORAGE_LOW = 'Storage space is running low.',
  BACKUP_RECOMMENDED = 'It is recommended to create a backup.',
  UPDATE_AVAILABLE = 'A new version is available.'
}

// Helper functions
export const getErrorMessage = (type: ErrorMessage): string => {
  return type
}

export const getSuccessMessage = (type: SuccessMessage): string => {
  return type
}

export const getInfoMessage = (type: InfoMessage): string => {
  return type
}

export const getWarningMessage = (type: WarningMessage): string => {
  return type
}

export const isValidErrorMessage = (message: string): message is ErrorMessage => {
  return Object.values(ErrorMessage).includes(message as ErrorMessage)
}

export const isValidSuccessMessage = (message: string): message is SuccessMessage => {
  return Object.values(SuccessMessage).includes(message as SuccessMessage)
}

export const isValidInfoMessage = (message: string): message is InfoMessage => {
  return Object.values(InfoMessage).includes(message as InfoMessage)
}

export const isValidWarningMessage = (message: string): message is WarningMessage => {
  return Object.values(WarningMessage).includes(message as WarningMessage)
}

export const getErrorMessages = (): Array<{ value: ErrorMessage; label: string }> => {
  return Object.entries(ErrorMessage).map(([key, value]) => ({
    value,
    label: key.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
  }))
}

export const getSuccessMessages = (): Array<{ value: SuccessMessage; label: string }> => {
  return Object.entries(SuccessMessage).map(([key, value]) => ({
    value,
    label: key.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
  }))
} 