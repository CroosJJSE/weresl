/**
 * Firestore Collection Enums and Types
 * Collection names and document types
 */

// Root Collection Enum
export const RootCollection = {
  PROFILES: 'profiles',
  BANK_ACCOUNTS: 'bank_accounts',
  SEARCH_ELEMENTS: 'SearchElements',
  RF_RETURN_RECORD: 'RF_return_record',
  TOPVIEW_LINKS: 'topview-links',
  CONFIG: 'config',
  UPLOADED_IMAGES: 'uploadedImages',
  COORDINATORS: 'coordinators'
}

// Search Element Document Enum
export const SearchElementDoc = {
  PENDING_LOAN: 'pending-loan',
  NIC_DATA: 'NIC_data'
}

// Config Document Enum
export const ConfigDoc = {
  DISTRICT_MAPPINGS: 'districtMappings'
}

// District Mapping Field Enum
export const DistrictMappingField = {
  DISTRICT_MAPPINGS: 'districtMapping',
  DISTRICT_CODES: 'districtCodes'
}

// Profile Field Enum
export const ProfileField = {
  REG_ID: 'Reg_ID',
  FULL_NAME: 'fullName',
  DISTRICT: 'district',
  YEAR_OF_BIRTH: 'yearOfBirth',
  ADDRESS: 'address',
  NIC: 'nic',
  PHONE_NUMBER: 'phoneNumber',
  TOTAL_CHILDREN: 'totalChildren',
  SCHOOL_GOING_CHILDREN: 'schoolGoingChildren',
  OTHER_DEPENDENTS: 'otherDependents',
  DESCRIPTION: 'description',
  OCCUPATION: 'occupation',
  PROFILE_IMAGE_DRIVE_ID: 'profileImageDriveId',
  CREATED_AT: 'createdAt',
  LAST_UPDATED: 'lastUpdated',
  GIF: 'GIF',
  RF_RETURN_HISTORY: 'RF_return_history',
  RF_LOANS: 'RF_Loans',
  GRANT: 'Grant'
}

// Profile Field Types Enum
export const ProfileFieldTypes = {
  REG_ID: 'string',
  FULL_NAME: 'string',
  DISTRICT: 'string',
  YEAR_OF_BIRTH: 'number',
  ADDRESS: 'string',
  NIC: 'string',
  PHONE_NUMBER: 'string',
  TOTAL_CHILDREN: 'number',
  SCHOOL_GOING_CHILDREN: 'number',
  OTHER_DEPENDENTS: 'number',
  DESCRIPTION: 'string',
  OCCUPATION: 'string',
  PROFILE_IMAGE_DRIVE_ID: 'string',
  CREATED_AT: 'date',
  LAST_UPDATED: 'date',
  GIF: 'array',
  RF_RETURN_HISTORY: 'array',
  RF_LOANS: 'collection',
  GRANT: 'collection'
}

// RF Loan Field Enum
export const RF_LOAN_FIELD = {
  AMOUNT: 'amount',
  APPROVED_AT: 'approvedAt',
  CREATED_AT: 'createdAt',
  CURRENT_BALANCE: 'currentBalance',
  INITIATION_DATE: 'initiationDate',
  LAST_UPDATED: 'lastUpdated',
  PROJECT_DESCRIPTION: 'projectDescription',
  PURPOSE: 'purpose',
  REG_ID: 'Reg_ID',
  SOURCE: 'source',
  STATUS: 'status',
  TYPE: 'type'
}

// RF Loan Field Types Enum
export const RF_LOAN_FIELD_TYPES = {
  AMOUNT: 'number',
  APPROVED_AT: 'date',
  CREATED_AT: 'date',
  CURRENT_BALANCE: 'number',
  INITIATION_DATE: 'date',
  LAST_UPDATED: 'date',
  PROJECT_DESCRIPTION: 'string',
  PURPOSE: 'string',
  REG_ID: 'string',
  SOURCE: 'string',
  STATUS: 'string',
  TYPE: 'string'
}

// Grant Field Enum
export const GRANT_FIELD = {
  APPROVED_AMOUNT: 'approvedAmount',
  APPROVED_AT: 'approvedAt',
  CREATED_AT: 'createdAt',
  REQUESTED_DATE: 'requestedDate',
  LAST_UPDATED: 'lastUpdated',
  PROJECT_DESCRIPTION: 'projectDescription',
  PURPOSE: 'purpose',
  REG_ID: 'Reg_ID',
  SOURCE: 'source',
  STATUS: 'status',
  TYPE: 'type'
}

// Grant Field Types Enum
export const GRANT_FIELD_TYPES = {
  APPROVED_AMOUNT: 'number',
  APPROVED_AT: 'date',
  CREATED_AT: 'date',
  REQUESTED_DATE: 'date',
  LAST_UPDATED: 'date',
  PROJECT_DESCRIPTION: 'string',
  PURPOSE: 'string',
  REG_ID: 'string',
  SOURCE: 'string',
  STATUS: 'string',
  TYPE: 'string'
}

// System Log Field Enum
export const SystemLogField = {
  LOG_ACTION: 'logAction',
  LOG_USER_ID: 'logUserId',
  LOG_TIMESTAMP: 'logTimestamp',
  LOG_DETAILS: 'logDetails'
}

// RF Return Record Field Enum
export const RF_RETURN_RECORD_FIELD = {
  RECEIPT_DRIVE_LINK_ID: 'receiptDriveLinkId',
  LAST_UPDATED: 'lastUpdated',
  LOAN_ID: 'loanId',
  RECEIVER: 'receiver',
  REG_ID: 'regId',
  STATUS: 'status',
  TIMESTAMP: 'timestamp',
  TOTAL_BALANCE: 'totalBalance'
}

// RF Return Record Field Types Enum
export const RF_RETURN_RECORD_FIELD_TYPES = {
  RECEIPT_DRIVE_LINK_ID: 'string',
  LAST_UPDATED: 'date',
  LOAN_ID: 'string',
  RECEIVER: 'string',
  REG_ID: 'string',
  STATUS: 'string',
  TIMESTAMP: 'date',
  TOTAL_BALANCE: 'number'
}

// Coordinator Field Enum
export const COORDINATOR_FIELD = {
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  PHONE_NUMBER: 'phoneNumber',
  NIC: 'nic',
  SIGNATURE_DRIVE_ID: 'signatureDriveId',
  POSITION: 'position',
  CREATED_AT: 'createdAt',
  LAST_UPDATED: 'lastUpdated'
}

// Coordinator Field Types Enum
export const COORDINATOR_FIELD_TYPES = {
  FIRST_NAME: 'string',
  LAST_NAME: 'string',
  PHONE_NUMBER: 'string',
  NIC: 'string',
  SIGNATURE_DRIVE_ID: 'string',
  POSITION: 'string',
  CREATED_AT: 'date',
  LAST_UPDATED: 'date'
}

// Bank Account Field Enum
export const BANK_ACCOUNT_FIELD = {
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  PHONE_NUMBER: 'phoneNumber',
  NIC: 'nic',
  SIGNATURE_DRIVE_ID: 'signatureDriveId',
  POSITION: 'position',
  CURRENT_BANK_BALANCE: 'currentBankBalance',
  CREATED_AT: 'createdAt',
  LAST_UPDATED: 'lastUpdated'
}

// Bank Account Field Types Enum
export const BANK_ACCOUNT_FIELD_TYPES = {
  FIRST_NAME: 'string',
  LAST_NAME: 'string',
  PHONE_NUMBER: 'string',
  NIC: 'string',
  SIGNATURE_DRIVE_ID: 'string',
  POSITION: 'string',
  CURRENT_BANK_BALANCE: 'number',
  CREATED_AT: 'date',
  LAST_UPDATED: 'date'
}

// Coordinator Position Enum
export const COORDINATOR_POSITION = {
  COORDINATOR: 'Coordinator',
  TREASURER: 'Treasurer'
}

// Collection constants for backward compatibility
export const ROOT_COLLECTIONS = {
  [RootCollection.PROFILES]: 'profiles',
  [RootCollection.BANK_ACCOUNTS]: 'bank_accounts',
  [RootCollection.SEARCH_ELEMENTS]: 'SearchElements',
  [RootCollection.RF_RETURN_RECORD]: 'RF_return_record',
  [RootCollection.TOPVIEW_LINKS]: 'topview-links',
  [RootCollection.CONFIG]: 'config',
  [RootCollection.UPLOADED_IMAGES]: 'uploadedImages',
  [RootCollection.COORDINATORS]: 'coordinators'
}

// Profile fields constants for backward compatibility
export const PROFILE_FIELDS = {
  [ProfileField.REG_ID]: 'Reg_ID',
  [ProfileField.FULL_NAME]: 'fullName',
  [ProfileField.DISTRICT]: 'district',
  [ProfileField.YEAR_OF_BIRTH]: 'yearOfBirth',
  [ProfileField.ADDRESS]: 'address',
  [ProfileField.NIC]: 'nic',
  [ProfileField.PHONE_NUMBER]: 'phoneNumber',
  [ProfileField.TOTAL_CHILDREN]: 'totalChildren',
  [ProfileField.SCHOOL_GOING_CHILDREN]: 'schoolGoingChildren',
  [ProfileField.OTHER_DEPENDENTS]: 'otherDependents',
  [ProfileField.DESCRIPTION]: 'description',
  [ProfileField.OCCUPATION]: 'occupation',
  [ProfileField.PROFILE_IMAGE_DRIVE_ID]: 'profileImageDriveId',
  [ProfileField.CREATED_AT]: 'createdAt',
  [ProfileField.LAST_UPDATED]: 'lastUpdated',
  [ProfileField.GIF]: 'GIF',
  [ProfileField.RF_RETURN_HISTORY]: 'RF_return_history',
  [ProfileField.RF_LOANS]: 'RF_Loans',
  [ProfileField.GRANT]: 'Grant'
}

// Search element document constants for backward compatibility
export const SEARCH_ELEMENT_DOCS = {
  [SearchElementDoc.PENDING_LOAN]: 'pending-loan',
  [SearchElementDoc.NIC_DATA]: 'NIC_data'
}

// Coordinator field constants for backward compatibility
export const COORDINATOR_FIELDS = {
  [COORDINATOR_FIELD.FIRST_NAME]: 'firstName',
  [COORDINATOR_FIELD.LAST_NAME]: 'lastName',
  [COORDINATOR_FIELD.PHONE_NUMBER]: 'phoneNumber',
  [COORDINATOR_FIELD.NIC]: 'nic',
  [COORDINATOR_FIELD.SIGNATURE_DRIVE_ID]: 'signatureDriveId',
  [COORDINATOR_FIELD.POSITION]: 'position',
  [COORDINATOR_FIELD.CREATED_AT]: 'createdAt',
  [COORDINATOR_FIELD.LAST_UPDATED]: 'lastUpdated'
}

// Bank Account field constants for backward compatibility
export const BANK_ACCOUNT_FIELDS = {
  [BANK_ACCOUNT_FIELD.FIRST_NAME]: 'firstName',
  [BANK_ACCOUNT_FIELD.LAST_NAME]: 'lastName',
  [BANK_ACCOUNT_FIELD.PHONE_NUMBER]: 'phoneNumber',
  [BANK_ACCOUNT_FIELD.NIC]: 'nic',
  [BANK_ACCOUNT_FIELD.SIGNATURE_DRIVE_ID]: 'signatureDriveId',
  [BANK_ACCOUNT_FIELD.POSITION]: 'position',
  [BANK_ACCOUNT_FIELD.CURRENT_BANK_BALANCE]: 'currentBankBalance',
  [BANK_ACCOUNT_FIELD.CREATED_AT]: 'createdAt',
  [BANK_ACCOUNT_FIELD.LAST_UPDATED]: 'lastUpdated'
}

// Helper functions
export const getCollectionName = (collection) => {
  return ROOT_COLLECTIONS[collection]
}

export const getSearchElementDocName = (doc) => {
  return SEARCH_ELEMENT_DOCS[doc]
}

export const isValidCollection = (collection) => {
  return Object.values(RootCollection).includes(collection)
}

export const isValidSearchElementDoc = (doc) => {
  return Object.values(SearchElementDoc).includes(doc)
}

export const getCollections = () => {
  return Object.entries(ROOT_COLLECTIONS).map(([value, label]) => ({
    value: value,
    label: label.charAt(0).toUpperCase() + label.slice(1)
  }))
}

export const getSearchElementDocs = () => {
  return Object.entries(SEARCH_ELEMENT_DOCS).map(([value, label]) => ({
    value: value,
    label: label.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
  }))
} 