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
    // Return the WERESL logo from Google Drive
    return 'https://drive.google.com/thumbnail?id=1AEEWccjf_sMoXJgAaYIPZZm5rM-OCFe2';
  },

  // Get profile image (direct or thumbnail, supports both providers)
  async getProfileImage(url) {
    try {
      if (!url) return '/placeholder-profile.jpg';
      if (this.isCloudinaryUrl(url)) {
        // Use Cloudinary optimized direct URL
        return this.convertCloudinaryToDirectUrl(url);
      } else if (this.isGoogleDriveUrl(url)) {
        // Use Google Drive direct URL
        return this.convertDriveToDirectUrl(url);
      }
      return url;
    } catch (error) {
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
      return '/placeholder-profile.jpg';
    }
  },

  // Convert Google Drive URL to direct image URL
  convertDriveToDirectUrl(driveUrl) {
    const fileId = this.extractDriveFileId(driveUrl);
    if (fileId) {
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
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
    const match = url.match(/\/d\/([\w-]+)/) || url.match(/id=([\w-]+)/);
    return match ? match[1] : null;
  },

  // Convert Cloudinary URL to direct/optimized URL
  convertCloudinaryToDirectUrl(cloudinaryUrl) {
    if (!cloudinaryUrl) return cloudinaryUrl;
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
      return false;
    }
  }
};

export default imageService; 