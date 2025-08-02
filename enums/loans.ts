/**
 * Loan Enums and Types
 * Loan statuses, types, and related constants
 */

export enum LoanStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  COMPLETED = 'completed',
  ACTIVE = 'active'
}

export enum LoanType {
  REVOLVING_FUND = 'RF',
  GRANT = 'GRANT',
}

// Loan status constants for backward compatibility
export const LOAN_STATUSES: Record<LoanStatus, string> = {
  [LoanStatus.PENDING]: 'Pending',
  [LoanStatus.APPROVED]: 'Approved',
  [LoanStatus.REJECTED]: 'Rejected',
  [LoanStatus.COMPLETED]: 'Completed',
  [LoanStatus.ACTIVE]: 'Active'
}

// Loan type constants for backward compatibility
export const LOAN_TYPES: Record<LoanType, string> = {
  [LoanType.REVOLVING_FUND]: 'Revolving Fund',
  [LoanType.GRANT]: 'Grant'
}


// Helper functions
export const getLoanStatusName = (status: LoanStatus): string => {
  return LOAN_STATUSES[status] || 'Unknown'
}

export const getLoanTypeName = (type: LoanType): string => {
  return LOAN_TYPES[type] || 'Unknown'
}

export const isValidLoanStatus = (status: string): status is LoanStatus => {
  return Object.values(LoanStatus).includes(status as LoanStatus)
}

export const isValidLoanType = (type: string): type is LoanType => {
  return Object.values(LoanType).includes(type as LoanType)
}

export const getLoanStatuses = (): Array<{ value: LoanStatus; label: string }> => {
  return Object.entries(LOAN_STATUSES).map(([value, label]) => ({
    value: value as LoanStatus,
    label
  }))
}

export const getLoanTypes = (): Array<{ value: LoanType; label: string }> => {
  return Object.entries(LOAN_TYPES).map(([value, label]) => ({
    value: value as LoanType,
    label
  }))
} 