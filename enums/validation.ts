/**
 * Validation Enums and Types
 * Validation rules, types, and helper functions
 */

// Validation rule types
export enum ValidationRule {
  REQUIRED = 'required',
  MIN_LENGTH = 'minLength',
  MAX_LENGTH = 'maxLength',
  EMAIL = 'email',
  PHONE = 'phone',
  NIC = 'nic',
  AMOUNT = 'amount',
  AGE = 'age',
  DISTRICT = 'district',
  FILE_ID = 'fileId',
  REG_ID = 'regId'
}

// Validation error types
export enum ValidationError {
  REQUIRED = 'This field is required',
  MIN_LENGTH = 'Minimum length not met',
  MAX_LENGTH = 'Maximum length exceeded',
  INVALID_EMAIL = 'Invalid email format',
  INVALID_PHONE = 'Invalid phone number format',
  INVALID_NIC = 'Invalid NIC format',
  INVALID_AMOUNT = 'Invalid amount',
  INVALID_AGE = 'Invalid age',
  INVALID_DISTRICT = 'Invalid district',
  INVALID_FILE_ID = 'Invalid file ID',
  INVALID_REG_ID = 'Invalid registration ID'
}

// Validation success types
export enum ValidationSuccess {
  VALID = 'Valid',
  VALID_EMAIL = 'Valid email',
  VALID_PHONE = 'Valid phone number',
  VALID_NIC = 'Valid NIC',
  VALID_AMOUNT = 'Valid amount',
  VALID_AGE = 'Valid age',
  VALID_DISTRICT = 'Valid district',
  VALID_FILE_ID = 'Valid file ID',
  VALID_REG_ID = 'Valid registration ID'
}

// Validation result interface
export interface ValidationResult {
  isValid: boolean
  message: string
  error?: string
}

// Validation rule interface
export interface ValidationRuleConfig {
  type: ValidationRule
  value?: any
  message?: string
}

// Helper functions
export const createValidationResult = (
  isValid: boolean, 
  message: string, 
  error?: string
): ValidationResult => {
  return { isValid, message, error }
}

export const createSuccessResult = (message: string): ValidationResult => {
  return createValidationResult(true, message)
}

export const createErrorResult = (message: string, error?: string): ValidationResult => {
  return createValidationResult(false, message, error)
}

export const getValidationErrorMessage = (rule: ValidationRule): string => {
  return ValidationError[rule.toUpperCase() as keyof typeof ValidationError] || 'Invalid field'
}

export const getValidationSuccessMessage = (rule: ValidationRule): string => {
  return ValidationSuccess[rule.toUpperCase() as keyof typeof ValidationSuccess] || 'Valid'
}

export const isValidValidationRule = (rule: string): rule is ValidationRule => {
  return Object.values(ValidationRule).includes(rule as ValidationRule)
}

export const getValidationRules = (): Array<{ value: ValidationRule; label: string }> => {
  return Object.entries(ValidationRule).map(([key, value]) => ({
    value,
    label: key.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
  }))
} 