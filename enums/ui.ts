/**
 * UI Enums and Configuration
 * UI constants, validation rules, and configuration
 */

// File upload configuration
export const FileUpload = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'] as const,
  GOOGLE_DRIVE_FOLDER_ID: process.env.GOOGLE_DRIVE_FOLDER_ID || ''
} as const

// Validation rules
export const Validation = {
  MIN_REG_ID_LENGTH: 3,
  MAX_REG_ID_LENGTH: 20,
  MIN_AGE: 0,
  MAX_AGE: 150,
  MIN_AMOUNT: 0,
  MAX_AMOUNT: 999999999,
  MIN_PHONE_LENGTH: 10,
  MAX_PHONE_LENGTH: 12,
  MIN_NIC_LENGTH: 10,
  MAX_NIC_LENGTH: 12
} as const

// UI configuration
export const UI = {
  ITEMS_PER_PAGE: 20,
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 3000,
  LOADING_TIMEOUT: 10000,
  MAX_SEARCH_RESULTS: 50,
  PAGINATION_LIMIT: 100
} as const

// Default values
export const DEFAULTS = {
  PLACEHOLDER_IMAGE: '/placeholder-profile.jpg',
  PLACEHOLDER_LOGO: '/placeholder-logo.png',
  DEFAULT_DISTRICT: 'COL',
  DEFAULT_STATUS: 'pending',
  DEFAULT_LANGUAGE: 'en',
  DEFAULT_CURRENCY: 'LKR'
} as const

// UI component types
export enum ComponentType {
  BUTTON = 'button',
  INPUT = 'input',
  SELECT = 'select',
  TEXTAREA = 'textarea',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  DATE_PICKER = 'date-picker',
  FILE_UPLOAD = 'file-upload'
}

// UI theme types
export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  AUTO = 'auto'
}

// UI language types
export enum Language {
  ENGLISH = 'en',
  SINHALA = 'si',
  TAMIL = 'ta'
}

// UI currency types
export enum Currency {
  LKR = 'LKR',
  USD = 'USD',
  EUR = 'EUR'
}

// UI size types
export enum Size {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large'
}

// UI variant types
export enum Variant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info'
}

// Helper functions
export const getFileUploadConfig = () => FileUpload

export const getValidationRules = () => Validation

export const getUIConfig = () => UI

export const getDefaults = () => DEFAULTS

export const isValidFileType = (type: string): boolean => {
  return FileUpload.ALLOWED_TYPES.includes(type as any)
}

export const isValidFileSize = (size: number): boolean => {
  return size <= FileUpload.MAX_SIZE
}

export const getFileSizeInMB = (bytes: number): number => {
  return bytes / (1024 * 1024)
}

export const formatFileSize = (bytes: number): string => {
  const mb = getFileSizeInMB(bytes)
  return `${mb.toFixed(2)} MB`
} 