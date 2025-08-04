/**
 * Google Drive Utility Functions
 * Handles Google Drive file operations and URL conversions
 */

/**
 * Extract file ID from Google Drive URL
 * Supports both old and new URL formats
 */
export const extractFileId = (url) => {
  if (!url) return null;
  
  // New format: https://drive.google.com/file/d/FILE_ID/view?usp=drivesdk
  const newFormatMatch = url.match(/\/file\/d\/([-\w]{25,})\/view/);
  if (newFormatMatch) {
    return newFormatMatch[1];
  }
  
  // Old format: try to extract any 25+ character ID
  const oldFormatMatch = url.match(/[-\w]{25,}/);
  if (oldFormatMatch) {
    return oldFormatMatch[0];
  }
  
  return null;
};

/**
 * Convert Google Drive URL to direct image URL
 */
export const convertGoogleDriveUrl = (driveUrl, size = 'w300') => {
  const fileId = extractFileId(driveUrl);
  if (!fileId) return null;
  
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=${size}`;
};

/**
 * Convert to image URL (alias for convertGoogleDriveUrl)
 */
export const convertToImageUrl = (driveUrl, size = 'w300') => {
  return convertGoogleDriveUrl(driveUrl, size);
};

/**
 * Convert to high-quality image URL for receipts and documents
 */
export const convertToHighQualityUrl = (driveUrl) => {
  return convertGoogleDriveUrl(driveUrl, 'w800');
};

/**
 * Generate multiple URL formats for fallback
 */
export const generateImageUrls = (driveUrl) => {
  const fileId = extractFileId(driveUrl);
  if (!fileId) return [];
  
  return [
    `https://drive.google.com/thumbnail?id=${fileId}&sz=w300`,
    `https://drive.google.com/uc?export=view&id=${fileId}`,
    `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`,
    `https://drive.google.com/thumbnail?id=${fileId}&sz=w200`
  ];
};

/**
 * Check if URL is a Google Drive URL
 */
export const isGoogleDriveUrl = (url) => {
  return url && url.includes('drive.google.com');
};

/**
 * Validate Google Drive file ID format
 */
export const validateFileId = (fileId) => {
  if (!fileId) return false;
  // Google Drive file IDs are typically 25-44 characters long
  return /^[-\w]{25,44}$/.test(fileId);
};

export default {
  extractFileId,
  convertGoogleDriveUrl,
  convertToImageUrl,
  generateImageUrls,
  isGoogleDriveUrl,
  validateFileId
}; 