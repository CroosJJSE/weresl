/**
 * Google Drive Utility Functions
 * Handles file ID extraction, URL conversion, and image display
 */

/**
 * Extract file ID from Google Drive URL
 * Supports multiple Google Drive URL formats
 */
export const extractFileId = (url) => {
  if (!url) return null
  
  // Handle different Google Drive URL formats
  const patterns = [
    /\/d\/([a-zA-Z0-9-_]+)/,  // /d/fileId
    /id=([a-zA-Z0-9-_]+)/,    // ?id=fileId
    /\/file\/d\/([a-zA-Z0-9-_]+)/, // /file/d/fileId
    /^([a-zA-Z0-9-_]+)$/      // Just the fileId
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

/**
 * Convert Google Drive file ID to display URL
 */
export const convertGoogleDriveUrl = (fileId) => {
  if (!fileId) return null
  return `https://drive.google.com/uc?export=view&id=${fileId}`
}

/**
 * Convert Google Drive file ID to thumbnail URL
 */
export const convertToThumbnailUrl = (fileId, size = 'w300') => {
  if (!fileId) return null
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=${size}`
}

/**
 * Generate multiple URL formats for fallback
 */
export const generateImageUrls = (fileId) => {
  if (!fileId) return []
  
  return [
    `https://drive.google.com/thumbnail?id=${fileId}&sz=w300`,
    `https://drive.google.com/uc?export=view&id=${fileId}`,
    `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`,
    `https://drive.google.com/thumbnail?id=${fileId}&sz=w200`
  ]
}

/**
 * Check if URL is a Google Drive URL
 */
export const isGoogleDriveUrl = (url) => {
  return url && url.includes('drive.google.com')
}

/**
 * Convert Google Drive URL to direct image URL
 */
export const convertToImageUrl = (driveUrl, size = 'w300') => {
  const fileId = extractFileId(driveUrl)
  if (!fileId) return null
  
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=${size}`
}

/**
 * Get preview URL for Google Drive file
 */
export const getPreviewUrl = (fileId) => {
  if (!fileId) return null
  return `https://drive.google.com/file/d/${fileId}/preview`
}

/**
 * Get download URL for Google Drive file
 */
export const getDownloadUrl = (fileId) => {
  if (!fileId) return null
  return `https://drive.google.com/uc?export=download&id=${fileId}`
} 