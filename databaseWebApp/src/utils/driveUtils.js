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
  
  // If it's just a file ID (no URL structure)
  if (!url.includes('http') && !url.includes('drive.google.com')) {
    const fileId = url.trim();
    if (fileId && fileId.length > 10 && /^[-\w]{25,44}$/.test(fileId)) {
      return fileId;
    }
  }
  
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
  
  // If size is just a number or simple format, convert to proper thumbnail format
  let thumbnailSize = size;
  if (typeof size === 'string' && !size.includes('w') && !size.includes('h')) {
    thumbnailSize = `w${size}-h${size}`;
  }
  
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=${thumbnailSize}`;
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