// Image Service for Google Drive and Cloudinary Integration
// This service handles fetching images from Google Drive or Cloudinary

import { isGoogleDriveUrl as isDriveUrl, extractFileId, convertGoogleDriveUrl, convertToImageUrl, convertToHighQualityUrl } from '../utils/driveUtils.js'

export const imageService = {
  // Detect if the URL is a Google Drive link
  isGoogleDriveUrl(url) {
    return isDriveUrl(url);
  },



  // Get logo image (static or placeholder)
  async getLogoImage() {
    try {
      const logoUrl = 'https://drive.google.com/thumbnail?id=1AEEWccjf_sMoXJgAaYIPZZm5rM-OCFe2';
      return logoUrl;
    } catch (error) {
      console.error('[ImageService] Error loading logo:', error);
      return '/placeholder-logo.png';
    }
  },

  // Get profile image (direct or thumbnail)
  async getProfileImage(url) {
    try {
      if (!url) {
        return '/placeholder-profile.jpg';
      }

      // Check if it's just a file ID (no URL structure)
      if (url && !url.includes('http') && !url.includes('drive.google.com')) {
        const fileId = url.trim();
        if (fileId && fileId.length > 10) {
          // It's likely just a file ID, convert to Google Drive thumbnail URL
          return `https://drive.google.com/thumbnail?id=${fileId}&sz=w400-h400`;
        }
      }

      if (this.isGoogleDriveUrl(url)) {
        // Check if it's already a thumbnail URL with sz parameter
        if (url.includes('thumbnail') && url.includes('sz=')) {
          return url;
        }
        
        // For non-thumbnail URLs, convert to thumbnail format which is more reliable
        const fileId = this.extractDriveFileId(url);
        if (fileId) {
          const thumbnailUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w400-h400`;
          return thumbnailUrl;
        }
        
        return url;
      }

      return url;
    } catch (error) {
      console.error('[ImageService] Error processing image URL:', error);
      return '/placeholder-profile.jpg';
    }
  },

  // Get profile image thumbnail
  async getProfileImageThumbnail(url) {
    try {
      if (!url) return '/placeholder-profile.jpg';
      
      if (this.isGoogleDriveUrl(url)) {
        return this.convertDriveToThumbnailUrl(url);
      }
      return url;
    } catch (error) {
      console.error('[ImageService] Error processing thumbnail:', error);
      return '/placeholder-profile.jpg';
    }
  },

  // Convert Google Drive URL to direct image URL
  convertDriveToDirectUrl(driveUrl) {
    return convertToHighQualityUrl(driveUrl) || driveUrl;
  },

  // Convert Google Drive URL to thumbnail URL
  convertDriveToThumbnailUrl(driveUrl) {
    return convertGoogleDriveUrl(driveUrl, 'w200') || driveUrl;
  },

  // Extract file ID from Google Drive URL
  extractDriveFileId(url) {
    return extractFileId(url);
  },







  // Test and debug image URL processing
  async debugImageUrl(url) {
    if (!url) {
      return null;
    }

    // Check if it's just a file ID (no URL structure)
    if (url && !url.includes('http') && !url.includes('drive.google.com')) {
      const fileId = url.trim();
      if (fileId && fileId.length > 10) {
        // It's likely just a file ID, convert to Google Drive thumbnail URL
        return `https://drive.google.com/thumbnail?id=${fileId}&sz=w400-h400`;
      }
    }

    if (this.isGoogleDriveUrl(url)) {
      // Check if it's already a thumbnail URL with sz parameter
      if (url.includes('thumbnail') && url.includes('sz=')) {
        return url;
      }
      
      const fileId = this.extractDriveFileId(url);
      
      if (fileId) {
        // Convert to thumbnail format which is more reliable
        const thumbnailUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w400-h400`;
        return thumbnailUrl;
      } else {
        console.error('[ImageService] Failed to extract file ID from Drive URL');
        return url; // Return original URL as fallback
      }
    } else {
      return url;
    }
  },


};

export default imageService; 