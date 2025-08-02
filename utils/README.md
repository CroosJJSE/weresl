# WERESL Utils

Centralized utility functions for all WERESL projects. This folder contains essential functions that are used across multiple applications to avoid code duplication and ensure consistency.

## Structure

```
utils/
├── index.js          # Main export file
├── driveUtils.js     # Google Drive utilities
├── formatUtils.ts    # Formatting functions
├── validationUtils.js # Validation functions
├── dbUtils.js        # Database operations
├── regIdUtils.js     # Registration ID utilities
└── README.md         # This file
```

## Usage

### Import in your projects:

```javascript
// Import specific functions
import { convertGoogleDriveUrl, formatAmount, validateRegId } from '../utils/index.js'

// Import all utilities
import * as utils from '../utils/index.js'

// Import constants
import { DISTRICT_MAPPING, LOAN_STATUSES } from '../enums/index.js'
```

## Available Functions

### Drive Utilities (`driveUtils.js`)

- `extractFileId(url)` - Extract Google Drive file ID from URL
- `convertGoogleDriveUrl(fileId)` - Convert file ID to display URL
- `convertToThumbnailUrl(fileId, size)` - Convert to thumbnail URL
- `generateImageUrls(fileId)` - Generate multiple URL formats for fallback
- `isGoogleDriveUrl(url)` - Check if URL is Google Drive
- `getPreviewUrl(fileId)` - Get preview URL
- `getDownloadUrl(fileId)` - Get download URL

### Format Utilities (`formatUtils.js`)

- `formatAmount(amount)` - Format to Sri Lankan Rupees
- `formatDate(date)` - Format date to readable string
- `formatDateForInput(date)` - Format date for input fields
- `getInitials(name)` - Get initials from full name
- `formatFileSize(bytes)` - Format file size
- `formatRelativeTime(timestamp)` - Format relative time
- `formatPhoneNumber(phone)` - Format phone number
- `formatNIC(nic)` - Format NIC number

### Validation Utilities (`validationUtils.js`)

- `validateRegId(regId)` - Validate Registration ID
- `validateDistrict(district)` - Validate district
- `validateNIC(nic)` - Validate NIC number
- `validatePhoneNumber(phone)` - Validate phone number
- `validateEmail(email)` - Validate email
- `validateAge(age)` - Validate age
- `validateAmount(amount)` - Validate amount
- `validateRequired(value, fieldName)` - Validate required field
- `validateFileId(fileId)` - Validate Google Drive file ID

### Database Utilities (`dbUtils.js`)

- `getProfileByRegId(regId)` - Get profile by Registration ID
- `getAllProfiles(filters)` - Get all profiles with filtering
- `saveProfile(profileData, regId)` - Create or update profile
- `getRFLoans(regId)` - Get RF loans for a profile
- `getGrantLoans(regId)` - Get Grant loans for a profile
- `addLoan(regId, loanData, loanType)` - Add loan to profile
- `updateLoan(regId, loanId, loanData, loanType)` - Update loan
- `getPendingLoans()` - Get pending loans from SearchElements
- `addSystemLog(logData)` - Add system log
- `searchProfilesByNIC(nic)` - Search profiles by NIC
- `batchUpdate(operations)` - Batch operations for multiple updates
- `deleteProfile(regId)` - Delete profile and all subcollections
- `generateRFLoanId(regId)` - Generate RF loan ID based on registration ID
- `generateGrantLoanId(regId)` - Generate Grant loan ID based on registration ID
- `generateLoanId(regId, loanType)` - Generate loan ID based on type and registration ID

### Registration ID Utilities (`regIdUtils.js`)

- `getDistrictCode(districtName)` - Get district code from district name
- `getExistingRegIds(districtCode)` - Get existing registration IDs for a district
- `generateNextRegId(districtCode)` - Generate next available registration ID
- `generateRegIdFromDistrict(districtName)` - Generate registration ID from district name
- `validateRegIdFormat(regId)` - Validate registration ID format
- `extractDistrictCodeFromRegId(regId)` - Extract district code from registration ID
- `extractNumberFromRegId(regId)` - Extract number from registration ID
- `checkRegIdExists(regId)` - Check if registration ID already exists
- `getRegIdsWithDetails(districtCode)` - Get registration IDs with profile details

### Enums and Constants

- `DISTRICT_MAPPING` - District code to name mapping
- `DISTRICT_CODES` - District name to code mapping
- `LOAN_STATUSES` - Loan status constants
- `LOAN_TYPES` - Loan type constants
- `COLLECTIONS` - Firestore collection names
- `ERROR_MESSAGES` - Standard error messages
- `SUCCESS_MESSAGES` - Standard success messages

## Examples

### Google Drive Image Display

```javascript
import { convertGoogleDriveUrl, extractFileId } from '../utils/index.js'

// Store only file ID in database
const profileData = {
  fullName: 'John Doe',
  profileImageDriveId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms'
}

// Display image
const imageUrl = convertGoogleDriveUrl(profileData.profileImageDriveId)
```

### Amount Formatting

```javascript
import { formatAmount } from '../utils/index.js'

const amount = 150000
const formatted = formatAmount(amount) // "Rs. 150,000.00"
```

### Validation

```javascript
import { validateRegId, validateDistrict } from '../utils/index.js'

const regIdValidation = validateRegId('REG001')
if (!regIdValidation.isValid) {
  console.error(regIdValidation.message)
}

const districtValidation = validateDistrict('COL')
if (districtValidation.isValid) {
  console.log('Valid district')
}
```

### Date Formatting

```javascript
import { formatDate, formatDateForInput } from '../utils/index.js'

const timestamp = new Date()
const displayDate = formatDate(timestamp) // "Jan 15, 2024, 02:30 PM"
const inputDate = formatDateForInput(timestamp) // "2024-01-15"
```

### Database Operations

```javascript
import { getProfileByRegId, saveProfile, addLoan } from '../utils/index.js'

// Get profile
const profileResult = await getProfileByRegId('REG001')
if (profileResult.success) {
  console.log('Profile:', profileResult.data)
}

// Save profile
const newProfile = {
  fullName: 'John Doe',
  district: 'COL',
  nic: '123456789V'
}
const saveResult = await saveProfile(newProfile)
if (saveResult.success) {
  console.log('Profile saved:', saveResult.data.id)
}

// Add loan
const loanData = {
  loanAmount: 50000,
  loanPurpose: 'Business',
  loanSource: 'RF Fund'
}
const loanResult = await addLoan('REG001', loanData, 'RF')
if (loanResult.success) {
  console.log('Loan added:', loanResult.data.id)
}

// Generate loan IDs
const rfLoanId = await generateRFLoanId('MAN001')
console.log('RF Loan ID:', rfLoanId) // 'RF_MAN001_01'

const grantLoanId = await generateGrantLoanId('MAN001')
console.log('Grant Loan ID:', grantLoanId) // 'GRANT_MAN001_01'

const loanId = await generateLoanId('MAN001', 'RF')
console.log('Loan ID:', loanId) // 'RF_MAN001_01'

### Registration ID Generation

```javascript
import { 
  generateRegIdFromDistrict, 
  getExistingRegIds, 
  generateNextRegId 
} from '../utils/index.js'

// Generate registration ID from district name
const regId = await generateRegIdFromDistrict('Mannar')
console.log('Generated Reg ID:', regId) // e.g., 'MAN001'

// Get existing registration IDs for a district
const existingIds = await getExistingRegIds('MAN')
console.log('Existing IDs:', existingIds) // ['MAN001', 'MAN003']

// Generate next available registration ID
const nextId = await generateNextRegId('MAN')
console.log('Next ID:', nextId) // 'MAN002'

// Check if registration ID exists
const exists = await checkRegIdExists('MAN001')
console.log('Exists:', exists) // true or false
```

## Migration Guide

When migrating existing code to use these utilities:

1. **Replace duplicate functions** with imports from utils
2. **Update field names** according to the new naming convention
3. **Use consistent validation** across all forms
4. **Standardize error messages** using constants

## Benefits

- **Consistency**: Same functions across all projects
- **Maintainability**: Single source of truth for utilities
- **Performance**: Optimized and tested functions
- **Type Safety**: Clear function signatures and return types
- **Documentation**: Well-documented functions with examples

## Contributing

When adding new utilities:

1. Add the function to the appropriate file
2. Export it from `index.js`
3. Add JSDoc documentation
4. Include usage examples
5. Update this README if needed

## Notes

- All functions are pure functions (no side effects)
- Functions handle null/undefined inputs gracefully
- Return consistent data structures for validation functions
- Use Sri Lankan standards for formatting (currency, phone numbers, etc.) 