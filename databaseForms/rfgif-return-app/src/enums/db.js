/**
 * MASTER DATABASE ENUMS REFERENCE
 * ================================
 * 
 * This is the SINGLE SOURCE OF TRUTH for all database enums.
 * When you need to add/modify enums, update THIS FILE FIRST.
 * 
 * Then run: ./sync-enums.sh to propagate changes to all webapps.
 * 
 * IMPORTANT: Never modify individual webapp enum files directly!
 * Always modify this master file and sync.
 */

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
  GRANT: 'Grant',
  ARMS: 'arms'
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
  GIF: 'object', //{will have the documents as the name of the GIF}
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
  PURPOSE : 'purpose',
  SOURCE : 'source',
  STATUS : 'status',
  CREATED_AT : 'createdAt',
  LAST_UPDATED : 'lastUpdated',
  APPROVED_BY : 'approvedBy',
  APPROVED_AT : 'approvedAt',
  REJECTED_BY : 'rejectedBy',
  REJECTED_AT : 'rejectedAt',
  REJECTION_REASON : 'rejectionReason',
  LOAN_ID : 'loanId',
  INTEREST_RATE : 'interestRate',
  REPAYMENT_PERIOD : 'repaymentPeriod',
  MONTHLY_PAYMENT : 'monthlyPayment',
  TOTAL_REPAYMENT : 'totalRepayment',
  PAID_AMOUNT : 'paidAmount',
  REMAINING_AMOUNT : 'remainingAmount',
  CURRENT_BALANCE : 'currentBalance',
  NEXT_PAYMENT_DATE : 'nextPaymentDate',
  LAST_PAYMENT_DATE : 'lastPaymentDate',
  PAYMENT_HISTORY : 'paymentHistory',
  COLLATERAL : 'collateral',
  GUARANTOR : 'guarantor',
  NOTES : 'notes'
}

export const RF_LOAN_FIELD_TYPES = {
  AMOUNT : 'number',
  PURPOSE : 'string',
  SOURCE : 'string',
  STATUS : 'string',
  CREATED_AT : 'date',
  LAST_UPDATED : 'date',
  APPROVED_BY : 'string',
  APPROVED_AT : 'date',
  REJECTED_BY : 'string',
  REJECTED_AT : 'date',
  REJECTION_REASON : 'string',
  LOAN_ID : 'string',
  INTEREST_RATE : 'number',
  REPAYMENT_PERIOD : 'number',
  MONTHLY_PAYMENT : 'number',
  TOTAL_REPAYMENT : 'number',
  PAID_AMOUNT : 'number',
  REMAINING_AMOUNT : 'number',
  CURRENT_BALANCE : 'number',
  NEXT_PAYMENT_DATE : 'date',
  LAST_PAYMENT_DATE : 'date',
  PAYMENT_HISTORY : 'array',
  COLLATERAL : 'string',
  GUARANTOR : 'string',
  NOTES : 'string'
}

export const GRANT_FIELD = { 
  AMOUNT : 'amount',
  PURPOSE : 'purpose',
  SOURCE : 'source',
  STATUS : 'status',
  CREATED_AT : 'createdAt',
  LAST_UPDATED : 'lastUpdated',
  APPROVED_BY : 'approvedBy',
  APPROVED_AT : 'approvedAt',
  REJECTED_BY : 'rejectedBy',
  REJECTED_AT : 'rejectedAt',
  REJECTION_REASON : 'rejectionReason',
  GRANT_ID : 'grantId',
  GRANT_TYPE : 'grantType',
  CONDITIONS : 'conditions',
  COMPLETION_DATE : 'completionDate',
  VERIFICATION_STATUS : 'verificationStatus',
  VERIFIED_BY : 'verifiedBy',
  VERIFIED_AT : 'verifiedAt',
  NOTES : 'notes'
}

export const GRANT_FIELD_TYPES = {
  AMOUNT : 'number',
  PURPOSE : 'string',
  SOURCE : 'string',
  STATUS : 'string',
  CREATED_AT : 'date',
  LAST_UPDATED : 'date',
  APPROVED_BY : 'string',
  APPROVED_AT : 'date',
  REJECTED_BY : 'string',
  REJECTED_AT : 'date',
  REJECTION_REASON : 'string',
  GRANT_ID : 'string',
  GRANT_TYPE : 'string',
  CONDITIONS : 'array',
  COMPLETION_DATE : 'date',
  VERIFICATION_STATUS : 'string',
  VERIFIED_BY : 'string',
  VERIFIED_AT : 'date',
  NOTES : 'string'
}

export const RF_RETURN_RECORD_FIELD = {
  REG_ID : 'Reg_ID',
  AMOUNT : 'amount',
  RETURN_DATE : 'returnDate',
  RETURN_TYPE : 'returnType',
  NOTES : 'notes',
  CREATED_AT : 'createdAt',
  CREATED_BY : 'createdBy',
  VERIFIED_BY : 'verifiedBy',
  VERIFIED_AT : 'verifiedAt',
  STATUS : 'status'
}

export const RF_RETURN_RECORD_FIELD_TYPES = {
  REG_ID : 'string',
  AMOUNT : 'number',
  RETURN_DATE : 'date',
  RETURN_TYPE : 'string',
  NOTES : 'string',
  CREATED_AT : 'date',
  CREATED_BY : 'string',
  VERIFIED_BY : 'string',
  VERIFIED_AT : 'date',
  STATUS : 'string'
}

export const LOAN_FIELD = {
  LOAN_ID : 'loanId',
  REG_ID : 'Reg_ID',
  AMOUNT : 'amount',
  PURPOSE : 'purpose',
  SOURCE : 'source',
  STATUS : 'status',
  CREATED_AT : 'createdAt',
  LAST_UPDATED : 'lastUpdated',
  APPROVED_BY : 'approvedBy',
  APPROVED_AT : 'approvedAt',
  REJECTED_BY : 'rejectedBy',
  REJECTED_AT : 'rejectedAt',
  REJECTION_REASON : 'rejectionReason',
  INTEREST_RATE : 'interestRate',
  REPAYMENT_PERIOD : 'repaymentPeriod',
  MONTHLY_PAYMENT : 'monthlyPayment',
  TOTAL_REPAYMENT : 'totalRepayment',
  PAID_AMOUNT : 'paidAmount',
  REMAINING_AMOUNT : 'remainingAmount',
  CURRENT_BALANCE : 'currentBalance',
  NEXT_PAYMENT_DATE : 'nextPaymentDate',
  LAST_PAYMENT_DATE : 'lastPaymentDate',
  PAYMENT_HISTORY : 'paymentHistory',
  COLLATERAL : 'collateral',
  GUARANTOR : 'guarantor',
  NOTES : 'notes',
  LOAN_TYPE : 'loanType'
}

export const LOAN_FIELD_TYPES = {
  LOAN_ID : 'string',
  REG_ID : 'string',
  AMOUNT : 'number',
  PURPOSE : 'string',
  SOURCE : 'string',
  STATUS : 'string',
  CREATED_AT : 'date',
  LAST_UPDATED : 'date',
  APPROVED_BY : 'string',
  APPROVED_AT : 'date',
  REJECTED_BY : 'string',
  REJECTED_AT : 'date',
  REJECTION_REASON : 'string',
  INTEREST_RATE : 'number',
  REPAYMENT_PERIOD : 'number',
  MONTHLY_PAYMENT : 'number',
  TOTAL_REPAYMENT : 'number',
  PAID_AMOUNT : 'number',
  REMAINING_AMOUNT : 'number',
  CURRENT_BALANCE : 'number',
  NEXT_PAYMENT_DATE : 'date',
  LAST_PAYMENT_DATE : 'date',
  PAYMENT_HISTORY : 'array',
  COLLATERAL : 'string',
  GUARANTOR : 'string',
  NOTES : 'string',
  LOAN_TYPE : 'string'
}

export const GIF_RETURN_RECORD_FIELD = {
  REG_ID : 'Reg_ID',
  AMOUNT : 'amount',
  RETURN_DATE : 'returnDate',
  RETURN_TYPE : 'returnType',
  NOTES : 'notes',
  CREATED_AT : 'createdAt',
  CREATED_BY : 'createdBy',
  VERIFIED_BY : 'verifiedBy',
  VERIFIED_AT : 'verifiedAt',
  STATUS : 'status'
}

export const GIF_RETURN_RECORD_FIELD_TYPES = {
  REG_ID : 'string',
  AMOUNT : 'number',
  RETURN_DATE : 'date',
  RETURN_TYPE : 'string',
  NOTES : 'string',
  CREATED_AT : 'date',
  CREATED_BY : 'string',
  VERIFIED_BY : 'string',
  VERIFIED_AT : 'date',
  STATUS : 'string'
}

export const BANK_ACCOUNT_FIELD = {
  FIRST_NAME : 'firstName',
  LAST_NAME : 'lastName',
  PHONE_NUMBER : 'phoneNumber',
  NIC : 'nic',
  SIGNATURE_DRIVE_ID : 'signatureDriveId',
  POSITION : 'position',
  CURRENT_BANK_BALANCE : 'currentBankBalance',
  CREATED_AT : 'createdAt',
  LAST_UPDATED : 'lastUpdated'
}

export const BANK_ACCOUNT_FIELD_TYPES = {
  FIRST_NAME : 'string',
  LAST_NAME : 'string',
  PHONE_NUMBER : 'string',
  NIC : 'string',
  SIGNATURE_DRIVE_ID : 'string',
  POSITION : 'string',
  CURRENT_BANK_BALANCE : 'number',
  CREATED_AT : 'date',
  LAST_UPDATED : 'date'
}

export const ARMS = {
  Eden : 'EDEN',
  Ark : 'ARK',
  Metamorphosis : 'Metamorphosis',
  Keystone : 'Keystone'
}

// Helper functions
export const getCollectionName = (collection) => {
  return RootCollection[collection] || collection
}

export const isValidCollection = (collection) => {
  return Object.values(RootCollection).includes(collection)
}

export const getProfileFieldName = (field) => {
  return ProfileField[field] || field
}

export const isValidProfileField = (field) => {
  return Object.values(ProfileField).includes(field)
}

export const getRFLoanFieldName = (field) => {
  return RF_LOAN_FIELD[field] || field
}

export const isValidRFLoanField = (field) => {
  return Object.values(RF_LOAN_FIELD).includes(field)
}

export const getGrantFieldName = (field) => {
  return GRANT_FIELD[field] || field
}

export const isValidGrantField = (field) => {
  return Object.values(GRANT_FIELD).includes(field)
}

export const getBankAccountFieldName = (field) => {
  return BANK_ACCOUNT_FIELD[field] || field
}

export const isValidBankAccountField = (field) => {
  return Object.values(BANK_ACCOUNT_FIELD).includes(field)
}
