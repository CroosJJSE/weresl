/**
 * Loan Enums and Types
 * Loan statuses, types, and related constants
 */

export const LoanStatus = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  COMPLETED: 'completed',
  ACTIVE: 'active'
}

export const LoanType = {
  REVOLVING_FUND: 'RF',
  GRANT: 'GRANT'
}

// Loan status constants for backward compatibility
export const LOAN_STATUSES = {
  [LoanStatus.PENDING]: 'Pending',
  [LoanStatus.APPROVED]: 'Approved',
  [LoanStatus.REJECTED]: 'Rejected',
  [LoanStatus.COMPLETED]: 'Completed',
  [LoanStatus.ACTIVE]: 'Active'
}

// Loan type constants for backward compatibility
export const LOAN_TYPES = {
  [LoanType.REVOLVING_FUND]: 'Revolving Fund',
  [LoanType.GRANT]: 'Grant'
}

// Helper functions
export const getLoanStatusName = (status) => {
  return LOAN_STATUSES[status] || 'Unknown'
}

export const getLoanTypeName = (type) => {
  return LOAN_TYPES[type] || 'Unknown'
}

export const isValidLoanStatus = (status) => {
  return Object.values(LoanStatus).includes(status)
}

export const isValidLoanType = (type) => {
  return Object.values(LoanType).includes(type)
}

export const getLoanStatuses = () => {
  return Object.entries(LOAN_STATUSES).map(([value, label]) => ({
    value,
    label
  }))
}

export const getLoanTypes = () => {
  return Object.entries(LOAN_TYPES).map(([value, label]) => ({
    value,
    label
  }))
} 