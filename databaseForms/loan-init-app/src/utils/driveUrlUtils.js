/**
 * Utility functions for handling Google Drive URLs
 */

/**
 * Extract file ID from Google Drive URL
 * Supports both old and new URL formats
 */
export const extractDriveFileId = (url) => {
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
export const convertToImageUrl = (driveUrl, size = 'w300') => {
  const fileId = extractDriveFileId(driveUrl);
  if (!fileId) return null;
  
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=${size}`;
};

/**
 * Generate multiple URL formats for fallback
 */
export const generateImageUrls = (driveUrl) => {
  const fileId = extractDriveFileId(driveUrl);
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

export default {
  extractDriveFileId,
  convertToImageUrl,
  generateImageUrls,
  isGoogleDriveUrl
}; 