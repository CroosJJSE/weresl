/**
 * Firestore Collection Enums and Types
 * Collection names and document types
 */

export const RootCollection = {
  PROFILES : 'profiles', //{will have the documents as the name of the Reg_ID}	
  BANK_ACCOUNTS : 'bank_accounts', //{will have the documents of bank accounts}
  SEARCH_ELEMENTS : 'SearchElements', //{will have the documents of search elements covered below}
  RF_RETURN_RECORD : 'RF_return_record', //{will have the documents of RF return record in timestamp format}
  GIF_RETURN_RECORD : 'GIF_return_record', //{will have the documents of GIF return record in timestamp format}
  TOPVIEW_LINKS : 'topview-links', //{will have the documents of topview links}
  CONFIG : 'config',
  UPLOADED_IMAGES : 'uploadedImages',
  LOANS : 'loans' //{will have the documents as loanId for all approved loans}
}

export const SearchElementDoc = {
  PENDING_LOAN : 'pending-loan',
  NIC_DATA : 'NIC_data'
}

export const ConfigDoc = {
    DISTRICT_MAPPINGS : 'districtMappings',
}
export const DistrictMappingField = {
    DISTRICT_MAPPINGS : 'districtMapping',
    DISTRICT_CODES : 'districtCodes'
}
// fields in all profile documents
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
  GIF: 'GIF', // Give It Forward
  RF_RETURN_HISTORY: 'RF_return_history',
  RF_LOANS: 'RF_Loans',
  GRANT: 'Grant'
}

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
  GIF: 'array', //{timestamp : description}
  RF_RETURN_HISTORY: 'array', //{timestamp : returned amount}
  RF_LOANS: 'collection', //{will have the documents as the name of the loan}
  GRANT: 'collection' //{will have the documents as the name of the grant}
}

// Collection constants for backward compatibility
export const ROOT_COLLECTIONS = {
  [RootCollection.PROFILES]: 'profiles',
  [RootCollection.BANK_ACCOUNTS]: 'bank_accounts',
  [RootCollection.SEARCH_ELEMENTS]: 'SearchElements',
  [RootCollection.RF_RETURN_RECORD]: 'RF_return_record',
  [RootCollection.GIF_RETURN_RECORD]: 'GIF_return_record',
  [RootCollection.TOPVIEW_LINKS]: 'topview-links',
  [RootCollection.CONFIG]: 'config',
  [RootCollection.UPLOADED_IMAGES]: 'uploadedImages',
  [RootCollection.LOANS]: 'loans'
}

// Search element document constants for backward compatibility
export const SEARCH_ELEMENT_DOCS = {
  [SearchElementDoc.PENDING_LOAN]: 'pending-loan',
  [SearchElementDoc.NIC_DATA]: 'NIC_data'
}



export const RF_LOAN_FIELD = {
  AMOUNT : 'amount',
  APPROVED_AT : 'approvedAt',
  CREATED_AT : 'createdAt',
  CURRENT_BALANCE : 'currentBalance',
  INITIATION_DATE : 'initiationDate',
  LAST_UPDATED : 'lastUpdated',
  PROJECT_DESCRIPTION : 'projectDescription',
  PURPOSE : 'purpose',
  REG_ID : 'Reg_ID',
  SOURCE : 'source',
  STATUS : 'status',
  TYPE : 'type',
  ARMS : 'arms',
  PAYMENT_INTEGRITY : 'paymentIntegrity'
}
export const RF_LOAN_FIELD_TYPES = {
  AMOUNT : 'number',
  APPROVED_AT : 'date',
  CREATED_AT : 'date',
  CURRENT_BALANCE : 'number',
  INITIATION_DATE : 'date',
  LAST_UPDATED : 'date',
  PROJECT_DESCRIPTION : 'string',
  PURPOSE : 'string',
  REG_ID : 'string',
  SOURCE : 'string',
  STATUS : 'string',
  TYPE : 'string',
  ARMS : 'string',
  PAYMENT_INTEGRITY : 'boolean'
}
export const GRANT_FIELD = { 
  APPROVED_AMOUNT : 'approvedAmount',
  APPROVED_AT : 'approvedAt',
  CREATED_AT : 'createdAt',
  REQUESTED_DATE : 'requestedDate',
  LAST_UPDATED : 'lastUpdated',
  PROJECT_DESCRIPTION : 'projectDescription',
  PURPOSE : 'purpose',
  REG_ID : 'Reg_ID',
  SOURCE : 'source',
  STATUS : 'status',
  TYPE : 'type',
  ARMS : 'arms',
  PAYMENT_INTEGRITY : 'paymentIntegrity'
}
export const GRANT_FIELD_TYPES = {
  APPROVED_AMOUNT : 'number',
  APPROVED_AT : 'date',
  CREATED_AT : 'date',
  REQUESTED_DATE : 'date',
  LAST_UPDATED : 'date',
    PROJECT_DESCRIPTION : 'string',
  PURPOSE : 'string',
  REG_ID : 'string',
  SOURCE : 'string',
  STATUS : 'string',
  TYPE : 'string',
  ARMS : 'string',
  PAYMENT_INTEGRITY : 'boolean'
}
export const SystemLogField = {
  LOG_ACTION : 'logAction',
  LOG_USER_ID : 'logUserId',
  LOG_TIMESTAMP : 'logTimestamp',
  LOG_DETAILS : 'logDetails'
}
export const RF_RETURN_RECORD_FIELD = {
  RECEIPT_DRIVE_LINK_ID : 'receiptDriveLinkId',// use extractFileId from driveUtils
  LAST_UPDATED : 'lastUpdated',
  LOAN_ID : 'loanId', // added new field to the document
  RECEIVER : 'receiver',  // a bank account object
  REG_ID : 'regId',
  STATUS : 'status',
  TIMESTAMP : 'timestamp',
  TOTAL_BALANCE : 'totalBalance',
  PAID_AMOUNT : 'paidAmount' // amount that was paid in this repayment
}

export const RF_RETURN_RECORD_FIELD_TYPES = {
  RECEIPT_DRIVE_LINK_ID : 'string',
  LAST_UPDATED : 'date',
  LOAN_ID : 'string', // added new field to the document 
  RECEIVER : 'string',  
  REG_ID : 'string',
  STATUS : 'string',
  TIMESTAMP : 'date',
  TOTAL_BALANCE : 'number',
  PAID_AMOUNT : 'number'
}

// Loan fields for root/loans collection
export const LOAN_FIELD = {
  REG_ID : 'regId',
  AMOUNT : 'amount',
  APPROVED_AT : 'approvedAt',
  ARMS : 'arms',
  CREATED_AT : 'createdAt',
  INITIATION_DATE : 'initiationDate',
  LOAN_ID : 'loanId',
  PROJECT_DESCRIPTION : 'projectDescription',
  PURPOSE : 'purpose',
  SOURCE : 'source',
  STATUS : 'status',
  TYPE : 'type',
  PAYMENT_INTEGRITY : 'paymentIntegrity'
}

export const LOAN_FIELD_TYPES = {
  REG_ID : 'string',
  AMOUNT : 'number',
  APPROVED_AT : 'date',
  ARMS : 'string',
  CREATED_AT : 'date',
  INITIATION_DATE : 'date',
  LOAN_ID : 'string',
  PROJECT_DESCRIPTION : 'string',
  PURPOSE : 'string',
  SOURCE : 'string',
  STATUS : 'string',
  TYPE : 'string',
  PAYMENT_INTEGRITY : 'boolean'
}
export const GIF_RETURN_RECORD_FIELD = {
  REG_ID : 'regId',
  TIMESTAMP : 'timestamp',
  STATUS : 'status',
  DESCRIPTION : 'description',
  CREATED_AT : 'createdAt'
}

export const GIF_RETURN_RECORD_FIELD_TYPES = {
  REG_ID : 'string',
  TIMESTAMP : 'date',
  STATUS : 'string',
  DESCRIPTION : 'string',
  CREATED_AT : 'date'
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
  LAST_UPDATED: 'lastUpdated',
  RF_LOANS: 'RF_LOANS'
}
//RF_LOANS is a map where Field is regId, Value is a map of field(DDMMYYYY:amount) and value is boolean

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



export const ARMS = {
  Eden : 'EDEN',
  Ark : 'ARK',
  Metamorphosis : 'Metamorphosis',
  Keystone : 'Keystone'
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
    value,
    label: label.charAt(0).toUpperCase() + label.slice(1)
  }))
}

export const getSearchElementDocs = () => {
  return Object.entries(SEARCH_ELEMENT_DOCS).map(([value, label]) => ({
    value,
    label: label.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
  }))
}
