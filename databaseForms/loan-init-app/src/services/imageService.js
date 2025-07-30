import { uploadToDrive, validateFile, createImagePreview } from './driveUploadService.js';

export const imageService = {
  // Get logo image (static or placeholder)
  async getLogoImage() {
    // You can set a static logo URL here, or use a placeholder
    return '/placeholder-logo.png';
  },

  // Get profile image by URL (Google Drive URL)
  async getProfileImage(url) {
    try {
      if (!url) return '/placeholder-profile.jpg';
      // Google Drive URLs work directly, no conversion needed
      return url;
    } catch (error) {
      console.error('Error fetching profile image:', error);
      return '/placeholder-profile.jpg';
    }
  },

  // Get profile image with fallback (Google Drive URL)
  async getProfileImageWithFallback(url) {
    try {
      if (!url) return '/placeholder-profile.jpg';
      // Google Drive URLs work directly, no conversion needed
      return url;
    } catch (error) {
      console.error('Error fetching profile image with fallback:', error);
      return '/placeholder-profile.jpg';
    }
  },

  // Upload image to Google Drive
  async uploadImage(file, Reg_ID) {
    try {
      // Validate file first
      const validation = validateFile(file);
      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
      }

      // Upload to Google Drive
      const result = await uploadToDrive(file);
      
      if (result.success) {
        // Return the drive URL for storage in database
        return result.driveUrl;
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  // Upload image with progress callback
  async uploadImageWithProgress(file, Reg_ID, onProgress) {
    try {
      // Validate file first
      const validation = validateFile(file);
      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
      }

      // Import the progress function
      const { uploadImageWithProgress: uploadWithProgress } = await import('./driveUploadService.js');
      
      // Upload to Google Drive with progress
      const result = await uploadWithProgress(file, onProgress);
      
      if (result.success) {
        // Return the drive URL for storage in database
        return result.driveUrl;
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  // Create image preview
  async createImagePreview(file) {
    try {
      return await createImagePreview(file);
    } catch (error) {
      console.error('Error creating image preview:', error);
      throw error;
    }
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
  },

  // Validate file using drive service
  validateFile(file) {
    return validateFile(file);
  }
};

export default imageService; 