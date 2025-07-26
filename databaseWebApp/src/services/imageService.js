// Image Service for Google Drive and Cloudinary Integration
// This service handles fetching images from Google Drive or Cloudinary

export const imageService = {
  // Detect if the URL is a Google Drive link
  isGoogleDriveUrl(url) {
    return url && (url.includes('drive.google.com') || url.includes('googleusercontent.com'));
  },

  // Detect if the URL is a Cloudinary link
  isCloudinaryUrl(url) {
    return url && url.includes('res.cloudinary.com');
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

  // Get profile image (direct or thumbnail, supports both providers)
  async getProfileImage(url) {
    try {
      if (!url) {
        return '/placeholder-profile.jpg';
      }

      if (this.isCloudinaryUrl(url)) {
        const directUrl = this.convertCloudinaryToDirectUrl(url);
        return directUrl;
      } else if (this.isGoogleDriveUrl(url)) {
        
        // Check if it's already a thumbnail URL with sz parameter
        if (url.includes('thumbnail') && url.includes('sz=')) {
          return url;
        }
        
        // For non-thumbnail URLs, convert to thumbnail format which is more reliable
        const fileId = this.extractDriveFileId(url);
        if (fileId) {
          const thumbnailUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w800-h600`;
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

  // Get profile image thumbnail (supports both providers)
  async getProfileImageThumbnail(url) {
    try {
      if (!url) return '/placeholder-profile.jpg';
      
      if (this.isCloudinaryUrl(url)) {
        return this.convertCloudinaryToThumbnailUrl(url);
      } else if (this.isGoogleDriveUrl(url)) {
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
    const fileId = this.extractDriveFileId(driveUrl);
    if (fileId) {
      // Use more reliable URL formats for Google Drive images
      const urlFormats = [
        `https://drive.google.com/thumbnail?id=${fileId}&sz=w800-h600`,
        `https://drive.google.com/file/d/${fileId}/preview`,
        `https://drive.google.com/uc?export=view&id=${fileId}`
      ];
      
      // Return the thumbnail format as primary since it's more reliable
      return urlFormats[0];
    }
    console.warn('[ImageService] Could not extract file ID from Drive URL:', driveUrl);
    return driveUrl;
  },

  // Convert Google Drive URL to thumbnail URL
  convertDriveToThumbnailUrl(driveUrl) {
    const fileId = this.extractDriveFileId(driveUrl);
    if (fileId) {
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w200-h200`;
    }
    return driveUrl;
  },

  // Extract file ID from Google Drive URL
  extractDriveFileId(url) {
    // Handle different Google Drive URL formats
    let match = url.match(/\/d\/([\w-]+)/);
    if (match) return match[1];
    
    match = url.match(/id=([\w-]+)/);
    if (match) return match[1];
    
    // Handle thumbnail URLs
    match = url.match(/thumbnail\?id=([\w-]+)/);
    if (match) return match[1];
    
    // Handle file URLs
    match = url.match(/\/file\/d\/([\w-]+)/);
    if (match) return match[1];
    
    console.warn('[ImageService] Could not extract file ID from URL:', url);
    return null;
  },

  // Convert Cloudinary URL to direct/optimized URL
  convertCloudinaryToDirectUrl(cloudinaryUrl) {
    if (!cloudinaryUrl) return cloudinaryUrl;
    // Add optimization parameters for better performance
    return cloudinaryUrl.replace('/upload/', '/upload/f_auto,q_auto/');
  },

  // Convert Cloudinary URL to thumbnail URL (200x200 crop)
  convertCloudinaryToThumbnailUrl(cloudinaryUrl) {
    if (!cloudinaryUrl) return cloudinaryUrl;
    return cloudinaryUrl.replace('/upload/', '/upload/c_thumb,w_200,h_200/');
  },

  // Get placeholder images for development
  getPlaceholderImages() {
    return {
      logo: '/placeholder-logo.png',
      profile: '/placeholder-profile.jpg',
      logoText: 'WERESL'
    };
  },

  // Test if an image URL is accessible
  async testImageUrl(url) {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      console.error('[ImageService] Error testing image URL:', error);
      return false;
    }
  },

  // Test and debug image URL processing
  async debugImageUrl(url) {
    if (!url) {
      return null;
    }

    if (this.isGoogleDriveUrl(url)) {
      
      // Check if it's already a thumbnail URL with sz parameter
      if (url.includes('thumbnail') && url.includes('sz=')) {
        return url;
      }
      
      const fileId = this.extractDriveFileId(url);
      
      if (fileId) {
        // Convert to thumbnail format which is more reliable
        const thumbnailUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w800-h600`;
        return thumbnailUrl;
      } else {
        console.error('[ImageService] Failed to extract file ID from Drive URL');
        return url; // Return original URL as fallback
      }
    } else if (this.isCloudinaryUrl(url)) {
      const directUrl = this.convertCloudinaryToDirectUrl(url);
      return directUrl;
    } else {
      return url;
    }
  },

  // Test image URL processing with sample URLs
  async testImageProcessing() {
    const testUrls = [
      'https://drive.google.com/thumbnail?id=1dYQWpBI6-SoR25zo8tLbJopKdnoAhLao&sz=w200-h200',
      'https://drive.google.com/thumbnail?id=1nfm4XtqAfMEGhyCuCMn0ZIGJvMI7xsNI&sz=w200-h200',
      'https://res.cloudinary.com/db1jrcyun/image/upload/v1752847108/profile_images/profile-photos_1752847106583.jpg',
      'https://drive.google.com/file/d/1dYQWpBI6-SoR25zo8tLbJopKdnoAhLao/view',
      'https://drive.google.com/uc?id=1dYQWpBI6-SoR25zo8tLbJopKdnoAhLao'
    ];
    
    for (const url of testUrls) {
      await this.debugImageUrl(url);
    }
  },

  // Test specific problematic thumbnail URL
  async testThumbnailUrl() {
    const problematicUrl = 'https://drive.google.com/thumbnail?id=1nfm4XtqAfMEGhyCuCMn0ZIGJvMI7xsNI&sz=w200-h200';
    
    const isDrive = this.isGoogleDriveUrl(problematicUrl);
    
    const hasThumbnail = problematicUrl.includes('thumbnail') && problematicUrl.includes('sz=');
    
    const fileId = this.extractDriveFileId(problematicUrl);
    
    const result = await this.debugImageUrl(problematicUrl);
    
    return result;
  }
};

export default imageService; 