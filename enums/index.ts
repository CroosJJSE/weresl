/**
 * WERESL Enums - TypeScript enums for all projects
 * Centralized enums to ensure type safety and consistency
 */

// Export all enums
export * from './districts.ts'
export * from './loans.ts'
export * from './db.ts'
export * from './ui.ts'
export * from './validation.ts'
export * from './messages.ts'

// Explicitly re-export to resolve naming conflicts
export { getValidationRules as getUIValidationRules } from './ui.ts'
export { getValidationRules as getValidationRules } from './validation.ts'

// Re-export commonly used enums for convenience
export {
  District,
  DISTRICT_MAPPING,
  DISTRICT_CODES
} from './districts.ts'

export {
  LoanStatus,
  LoanType,
  LOAN_STATUSES,
  LOAN_TYPES
} from './loans.ts'

export {
  RootCollection,
  SearchElementDoc,
  ROOT_COLLECTIONS,
  SEARCH_ELEMENT_DOCS
} from './db.ts'

export {
  FileUpload,
  Validation,
  UI,
  DEFAULTS
} from './ui.ts'

export {
  ErrorMessage,
  SuccessMessage
} from './messages.ts' 