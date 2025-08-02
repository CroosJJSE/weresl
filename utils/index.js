/**
 * WERESL Utils - Essential functions for all projects
 * Centralized utility functions to avoid duplication across projects
 */

// Import all utility modules
export * from './driveUtils.js'
export * from './formatUtils.ts'
export * from './validationUtils.js'
export * from './dbUtils.js'
export * from './regIdUtils.js'

// Re-export commonly used functions for convenience
export {
  convertGoogleDriveUrl,
  extractFileId,
  isGoogleDriveUrl,
  generateImageUrls
} from './driveUtils.js'

export {
  formatAmount,
  formatDate,
  formatDateForInput,
  getInitials,
  formatFileSize
} from './formatUtils.js'

export {
  validateRegId,
  validateDistrict,
  validateNIC,
  validatePhoneNumber
} from './validationUtils.js'

export {
  DISTRICT_MAPPING,
  DISTRICT_CODES,
  LOAN_STATUSES
} from '../enums/index.js'

export {
  getProfileByRegId,
  getAllProfiles,
  saveProfile,
  getRFLoans,
  getGrantLoans,
  addLoan,
  updateLoan,
  getPendingLoans,
  addSystemLog,
  searchProfilesByNIC,
  batchUpdate,
  deleteProfile,
  generateRFLoanId,
  generateGrantLoanId,
  generateLoanId
} from './dbUtils.js'

export {
  getDistrictCode,
  getExistingRegIds,
  generateNextRegId,
  generateRegIdFromDistrict,
  validateRegIdFormat,
  extractDistrictCodeFromRegId,
  extractNumberFromRegId,
  checkRegIdExists,
  getRegIdsWithDetails
} from './regIdUtils.js' 