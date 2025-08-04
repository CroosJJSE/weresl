/**
 * Firestore Collection Enums and Types
 * Collection names and document types
 */

export enum RootCollection {
  PROFILES = 'profiles', //{will have the documents as the name of the Reg_ID}	
  BANK_ACCOUNTS = 'bank_accounts', //{will have the documents of bank accounts}
  SEARCH_ELEMENTS = 'SearchElements', //{will have the documents of search elements covered below}
  RF_RETURN_RECORD = 'RF_return_record', //{will have the documents of RF return record in timestamp format}
  TOPVIEW_LINKS = 'topview-links', //{will have the documents of topview links}
  CONFIG = 'config',
  UPLOADED_IMAGES = 'uploadedImages',
  COORDINATORS = 'coordinators' //{will have the documents as the NIC number}
}

export enum SearchElementDoc {
  PENDING_LOAN = 'pending-loan',
  NIC_DATA = 'NIC_data'
}

export enum ConfigDoc {
    DISTRICT_MAPPINGS = 'districtMappings',
}
export enum DistrictMappingField {
    DISTRICT_MAPPINGS = 'districtMapping',
    DISTRICT_CODES = 'districtCodes'
}
// fields in all profile documents
export enum ProfileField {
  REG_ID = 'Reg_ID',
  FULL_NAME = 'fullName',
  DISTRICT = 'district',
  YEAR_OF_BIRTH = 'yearOfBirth',
  ADDRESS = 'address',
  NIC = 'nic',
  PHONE_NUMBER = 'phoneNumber',
  TOTAL_CHILDREN = 'totalChildren',
  SCHOOL_GOING_CHILDREN = 'schoolGoingChildren',
  OTHER_DEPENDENTS = 'otherDependents',
  DESCRIPTION = 'description',
  OCCUPATION = 'occupation',
  PROFILE_IMAGE_DRIVE_ID = 'profileImageDriveId',
  CREATED_AT = 'createdAt',
  LAST_UPDATED = 'lastUpdated',
  GIF = 'GIF', // Give It Forward
  RF_RETURN_HISTORY = 'RF_return_history',
  RF_LOANS = 'RF_Loans',
  GRANT = 'Grant'
}
export enum ProfileFieldTypes {
  REG_ID = 'string',
  FULL_NAME = 'string',
  DISTRICT = 'string',
  YEAR_OF_BIRTH = 'number',
  ADDRESS = 'string',
  NIC = 'string',
  PHONE_NUMBER = 'string',
  TOTAL_CHILDREN = 'number',
  SCHOOL_GOING_CHILDREN = 'number',
  OTHER_DEPENDENTS = 'number',
  DESCRIPTION = 'string',
  OCCUPATION = 'string',
  PROFILE_IMAGE_DRIVE_ID = 'string',
  CREATED_AT = 'date',
  LAST_UPDATED = 'date',
  GIF = 'array', //{timestamp : description}
  RF_RETURN_HISTORY = 'array', //{timestamp : returned amount}
  RF_LOANS = 'collection', //{will have the documents as the name of the loan}
  GRANT = 'collection' //{will have the documents as the name of the grant}
}

// Collection constants for backward compatibility
export const ROOT_COLLECTIONS: Record<RootCollection, string> = {
  [RootCollection.PROFILES]: 'profiles',
  [RootCollection.BANK_ACCOUNTS]: 'bank_accounts',
  [RootCollection.SEARCH_ELEMENTS]: 'SearchElements',
  [RootCollection.RF_RETURN_RECORD]: 'RF_return_record',
  [RootCollection.TOPVIEW_LINKS]: 'topview-links',
  [RootCollection.CONFIG]: 'config',
  [RootCollection.UPLOADED_IMAGES]: 'uploadedImages',
  [RootCollection.COORDINATORS]: 'coordinators'
}
export const PROFILE_FIELDS: Record<ProfileField, string> = {
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
export const SEARCH_ELEMENT_DOCS: Record<SearchElementDoc, string> = {
  [SearchElementDoc.PENDING_LOAN]: 'pending-loan',
  [SearchElementDoc.NIC_DATA]: 'NIC_data'
}





export enum RF_LOAN_FIELD {
  AMOUNT = 'amount',
  APPROVED_AT = 'approvedAt',
  CREATED_AT = 'createdAt',
  CURRENT_BALANCE = 'currentBalance',
  INITIATION_DATE = 'initiationDate',
  LAST_UPDATED = 'lastUpdated',
  PROJECT_DESCRIPTION = 'projectDescription',
  PURPOSE = 'purpose',
  REG_ID = 'Reg_ID',
  SOURCE = 'source',
  STATUS = 'status',
  TYPE = 'type'  
}
export enum RF_LOAN_FIELD_TYPES {
  AMOUNT = 'number',
  APPROVED_AT = 'date',
  CREATED_AT = 'date',
  CURRENT_BALANCE = 'number',
  INITIATION_DATE = 'date',
  LAST_UPDATED = 'date',
  PROJECT_DESCRIPTION = 'string',
  PURPOSE = 'string',
  REG_ID = 'string',
  SOURCE = 'string',
  STATUS = 'string',
  TYPE = 'string'  
}
export enum GRANT_FIELD { 
  APPROVED_AMOUNT = 'approvedAmount',
  APPROVED_AT = 'approvedAt',
  CREATED_AT = 'createdAt',
  REQUESTED_DATE = 'requestedDate',
  LAST_UPDATED = 'lastUpdated',
  PROJECT_DESCRIPTION = 'projectDescription',
  PURPOSE = 'purpose',
  REG_ID = 'Reg_ID',
  SOURCE = 'source',
  STATUS = 'status',
  TYPE = 'type'
}
export enum GRANT_FIELD_TYPES {
  APPROVED_AMOUNT = 'number',
  APPROVED_AT = 'date',
  CREATED_AT = 'date',
  REQUESTED_DATE = 'date',
  LAST_UPDATED = 'date',
  PROJECT_DESCRIPTION = 'string',
  PURPOSE = 'string',
  REG_ID = 'string',
  SOURCE = 'string',
  STATUS = 'string',
  TYPE = 'string'
}
export enum SystemLogField {
  LOG_ACTION = 'logAction',
  LOG_USER_ID = 'logUserId',
  LOG_TIMESTAMP = 'logTimestamp',
  LOG_DETAILS = 'logDetails'
}
export enum RF_RETURN_RECORD_FIELD {
  RECEIPT_DRIVE_LINK_ID = 'receiptDriveLinkId',// use extractFileId from driveUtils
  LAST_UPDATED = 'lastUpdated',
  LOAN_ID = 'loanId', // added new field to the document
  RECEIVER = 'receiver',  // a bank account object
  REG_ID = 'regId',
  STATUS = 'status',
  TIMESTAMP = 'timestamp',
  TOTAL_BALANCE = 'totalBalance'
}

export enum RF_RETURN_RECORD_FIELD_TYPES {
  RECEIPT_DRIVE_LINK_ID = 'string',
  LAST_UPDATED = 'date',
  LOAN_ID = 'string', // added new field to the document 
  RECEIVER = 'string',  
  REG_ID = 'string',
  STATUS = 'string',
  TIMESTAMP = 'date',
  TOTAL_BALANCE = 'number'
}

// Coordinator field enums
export enum COORDINATOR_FIELD {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  PHONE_NUMBER = 'phoneNumber',
  NIC = 'nic',
  SIGNATURE_DRIVE_ID = 'signatureDriveId',
  POSITION = 'position',
  CREATED_AT = 'createdAt',
  LAST_UPDATED = 'lastUpdated'
}

export enum COORDINATOR_FIELD_TYPES {
  FIRST_NAME = 'string',
  LAST_NAME = 'string',
  PHONE_NUMBER = 'string',
  NIC = 'string',
  SIGNATURE_DRIVE_ID = 'string',
  POSITION = 'string',
  CREATED_AT = 'date',
  LAST_UPDATED = 'date'
}

// Coordinator position options
export enum COORDINATOR_POSITION {
  COORDINATOR = 'Coordinator',
  TREASURER = 'Treasurer'
}

// Coordinator field constants for backward compatibility
export const COORDINATOR_FIELDS: Record<COORDINATOR_FIELD, string> = {
  [COORDINATOR_FIELD.FIRST_NAME]: 'firstName',
  [COORDINATOR_FIELD.LAST_NAME]: 'lastName',
  [COORDINATOR_FIELD.PHONE_NUMBER]: 'phoneNumber',
  [COORDINATOR_FIELD.NIC]: 'nic',
  [COORDINATOR_FIELD.SIGNATURE_DRIVE_ID]: 'signatureDriveId',
  [COORDINATOR_FIELD.POSITION]: 'position',
  [COORDINATOR_FIELD.CREATED_AT]: 'createdAt',
  [COORDINATOR_FIELD.LAST_UPDATED]: 'lastUpdated'
}

// Helper functions
export const getCollectionName = (collection: RootCollection): string => {
  return ROOT_COLLECTIONS[collection]
}

export const getSearchElementDocName = (doc: SearchElementDoc): string => {
  return SEARCH_ELEMENT_DOCS[doc]
}

export const isValidCollection = (collection: string): collection is RootCollection => {
  return Object.values(RootCollection).includes(collection as RootCollection)
}

export const isValidSearchElementDoc = (doc: string): doc is SearchElementDoc => {
  return Object.values(SearchElementDoc).includes(doc as SearchElementDoc)
}

export const getCollections = (): Array<{ value: RootCollection; label: string }> => {
  return Object.entries(ROOT_COLLECTIONS).map(([value, label]) => ({
    value: value as RootCollection,
    label: label.charAt(0).toUpperCase() + label.slice(1)
  }))
}

export const getSearchElementDocs = (): Array<{ value: SearchElementDoc; label: string }> => {
  return Object.entries(SEARCH_ELEMENT_DOCS).map(([value, label]) => ({
    value: value as SearchElementDoc,
    label: label.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
  }))
} 