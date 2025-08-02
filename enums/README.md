# WERESL Enums

TypeScript enums and constants for all WERESL projects. This folder contains type-safe enums that provide better IntelliSense support and prevent runtime errors.

## Structure

```
enums/
├── index.ts          # Main export file
├── districts.ts      # District enums and mappings
├── loans.ts          # Loan statuses and types
├── db.ts            # Firestore collection enums
├── ui.ts            # UI configuration and constants
├── validation.ts    # Validation rules and types
├── messages.ts      # Error and success messages
└── README.md        # This file
```

## Usage

### Import in your projects:

```typescript
// Import specific enums
import { District, LoanStatus} from '../enums/index.ts'

// Import all enums
import * as enums from '../enums/index.ts'

// Import constants
import { DISTRICT_MAPPING, LOAN_STATUSES } from '../enums/index.ts'
```

## Available Enums

### District Enums (`districts.ts`)

- `District` - Enum for all Sri Lankan districts
- `DISTRICT_MAPPING` - District code to name mapping
- `DISTRICT_CODES` - District name to code mapping
- `getDistrictName(code)` - Get district name from code
- `getDistrictCode(name)` - Get district code from name
- `getAllDistricts()` - Get all districts with codes and names

### Loan Enums (`loans.ts`)

- `LoanStatus` - Enum for loan statuses
- `LoanType` - Enum for loan types
- `LoanPurpose` - Enum for loan purposes
- `LoanSource` - Enum for loan sources
- `LOAN_STATUSES` - Loan status constants
- `LOAN_TYPES` - Loan type constants
- `getLoanStatusName(status)` - Get loan status display name
- `getLoanTypeName(type)` - Get loan type display name



### Collection Enums (`db.ts`)

- `Collection` - Enum for Firestore collection names
- `SearchElementDoc` - Enum for search element documents
- `ProfileField` - Enum for profile field names
- `LoanField` - Enum for loan field names
- `SystemLogField` - Enum for system log field names
- `COLLECTIONS` - Collection constants
- `SEARCH_ELEMENT_DOCS` - Search element document constants

### UI Enums (`ui.ts`)

- `ComponentType` - Enum for UI component types
- `Theme` - Enum for UI themes
- `Language` - Enum for supported languages
- `Currency` - Enum for supported currencies
- `Size` - Enum for UI sizes
- `Variant` - Enum for UI variants
- `FileUpload` - File upload configuration
- `Validation` - Validation rules
- `UI` - UI configuration
- `DEFAULTS` - Default values

### Validation Enums (`validation.ts`)

- `ValidationRule` - Enum for validation rules
- `ValidationError` - Enum for validation error messages
- `ValidationSuccess` - Enum for validation success messages
- `ValidationResult` - Interface for validation results
- `ValidationRuleConfig` - Interface for validation rule configuration
- `createValidationResult()` - Create validation result
- `createSuccessResult()` - Create success result
- `createErrorResult()` - Create error result

### Message Enums (`messages.ts`)

- `ErrorMessage` - Enum for error messages
- `SuccessMessage` - Enum for success messages
- `InfoMessage` - Enum for info messages
- `WarningMessage` - Enum for warning messages
- `getErrorMessage()` - Get error message
- `getSuccessMessage()` - Get success message
- `getInfoMessage()` - Get info message
- `getWarningMessage()` - Get warning message

## Examples

### Using District Enums

```typescript
import { District, getDistrictName, getDistrictCode } from '../enums/index.ts'

// Use enum for type safety
const profileData = {
  fullName: 'John Doe',
  district: District.COLOMBO
}

// Get district name
const districtName = getDistrictName(District.COLOMBO) // 'Colombo'

// Get district code
const districtCode = getDistrictCode('Colombo') // District.COLOMBO
```

### Using Loan Enums

```typescript
import { LoanStatus, LoanType, getLoanStatusName } from '../enums/index.ts'

// Use enums for type safety
const loanData = {
  loanType: LoanType.RF,
  loanStatus: LoanStatus.PENDING,
  loanAmount: 50000
}

// Get display name
const statusName = getLoanStatusName(LoanStatus.APPROVED) // 'Approved'
```

### Using Collection Enums

```typescript
import { Collection, ProfileField } from '../enums/index.ts'

// Use enums for database operations
const profileRef = collection(db, Collection.PROFILES)
const profileData = {
  [ProfileField.FULL_NAME]: 'John Doe',
  [ProfileField.DISTRICT]: 'COL',
  [ProfileField.NIC]: '123456789V'
}
```

### Using Validation Enums

```typescript
import { ValidationRule, createSuccessResult, createErrorResult } from '../enums/index.ts'

// Create validation results
const validateEmail = (email: string) => {
  if (email.includes('@')) {
    return createSuccessResult('Valid email')
  }
  return createErrorResult('Invalid email format')
}
```

### Using Message Enums

```typescript
import { ErrorMessage, SuccessMessage, getErrorMessage } from '../enums/index.ts'

// Use message enums
const handleError = (error: Error) => {
  const message = getErrorMessage(ErrorMessage.NETWORK_ERROR)
  showToast(message)
}

const handleSuccess = () => {
  showToast(SuccessMessage.SAVE_SUCCESS)
}
```

## Type Safety Benefits

### 1. **Compile-time Error Detection**
```typescript
// ❌ This will cause a TypeScript error
const district = 'INVALID_DISTRICT' // Error: Type '"INVALID_DISTRICT"' is not assignable to type 'District'

// ✅ This is type-safe
const district = District.COLOMBO // No error
```

### 2. **IntelliSense Support**
```typescript
// You'll get autocomplete for all enum values
const status = LoanStatus. // Shows all available loan statuses
```

### 3. **Refactoring Safety**
```typescript
// If you rename an enum value, TypeScript will catch all usages
// and help you update them automatically
```

## Migration Guide

When migrating from constants to enums:

1. **Replace string constants** with enum values
2. **Update function parameters** to use enum types
3. **Update database queries** to use collection enums
4. **Update validation** to use validation enums
5. **Update UI components** to use UI enums

## Benefits

- **Type Safety**: Compile-time error detection
- **IntelliSense**: Better autocomplete and suggestions
- **Refactoring**: Safe refactoring with automatic updates
- **Documentation**: Self-documenting code
- **Consistency**: Standardized values across all projects
- **Maintainability**: Single source of truth for all enums

## Contributing

When adding new enums:

1. Create a new file in the appropriate category
2. Export from `index.ts`
3. Add TypeScript interfaces if needed
4. Include helper functions for common operations
5. Add JSDoc documentation
6. Update this README if needed

## Notes

- All enums are string-based for better serialization
- Helper functions provide backward compatibility
- Type guards ensure runtime type safety
- Constants are provided for backward compatibility
- All enums follow consistent naming conventions 