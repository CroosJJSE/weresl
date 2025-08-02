/**
 * Formatting Utility Functions
 * Common formatting functions used across all projects
 */

/**
 * Format amount to Sri Lankan Rupees
 */
export const formatAmount = (amount) => {
  if (!amount && amount !== 0) return 'Rs. 0.00'
  
  const numAmount = parseFloat(amount)
  if (isNaN(numAmount)) return 'Rs. 0.00'
  
  return new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(numAmount)
}

/**
 * Format date to readable string
 */
export const formatDate = (date) => {
  if (!date) return 'N/A'
  
  try {
    const dateObj = date.toDate ? date.toDate() : new Date(date)
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch (error) {
    return 'Invalid Date'
  }
}

/**
 * Format date for input fields (YYYY-MM-DD)
 */
export const formatDateForInput = (date) => {
  if (!date) return ''
  
  try {
    const dateObj = date.toDate ? date.toDate() : new Date(date)
    return dateObj.toISOString().split('T')[0]
  } catch (error) {
    return ''
  }
}

/**
 * Get initials from full name
 */
export const getInitials = (name) => {
  if (!name) return '?'
  
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

/**
 * Format file size in bytes to human readable format
 */
export const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Format timestamp to relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (timestamp) => {
  if (!timestamp) return 'Unknown'
  
  try {
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    const now = new Date()
    const diffInSeconds = Math.floor((now - date) / 1000)
    
    if (diffInSeconds < 60) return 'Just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`
    
    return formatDate(timestamp)
  } catch (error) {
    return 'Invalid Date'
  }
}

/**
 * Format phone number with proper spacing
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return ''
  
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '')
  
  // Format Sri Lankan phone numbers
  if (cleaned.length === 10) {
    return `+94 ${cleaned.slice(1, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`
  }
  
  if (cleaned.length === 11 && cleaned.startsWith('94')) {
    return `+94 ${cleaned.slice(2, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`
  }
  
  return phone
}

/**
 * Format NIC number with proper spacing
 */
export const formatNIC = (nic) => {
  if (!nic) return ''
  
  // Remove all non-alphanumeric characters
  const cleaned = nic.replace(/[^A-Za-z0-9]/g, '')
  
  // Format Sri Lankan NIC (12 digits or 9 digits + V)
  if (cleaned.length === 12) {
    return `${cleaned.slice(0, 5)} ${cleaned.slice(5, 9)} ${cleaned.slice(9)}`
  }
  
  if (cleaned.length === 10 && cleaned.endsWith('V')) {
    return `${cleaned.slice(0, 5)} ${cleaned.slice(5, 9)} ${cleaned.slice(9)}`
  }
  
  return nic
} 
// create timestamp - system wide function to be used in all the documents
export const createTimestamp = (): string => {
  const date = new Date()
  const timestamp : string = `${date.getMinutes()}${date.getHours()}_${date.getDate()}_${date.getMonth()}_${date.getFullYear()}`
  return timestamp
}





