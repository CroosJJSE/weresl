import { cloudinaryService } from './cloudinaryService.js';

export const imageService = {
  // Get logo image (static or placeholder)
  async getLogoImage() {
    // You can set a static logo URL here, or use a placeholder
    return '/placeholder-logo.png';
  },

  // Get profile image by URL (Cloudinary direct URL)
  async getProfileImage(url) {
    try {
      if (!url) return '/placeholder-profile.jpg';
      return cloudinaryService.convertToDirectUrl(url);
    } catch (error) {
      console.error('Error fetching profile image:', error);
      return '/placeholder-profile.jpg';
    }
  },

  // Get profile image with fallback (Cloudinary thumbnail)
  async getProfileImageWithFallback(url) {
    try {
      if (!url) return '/placeholder-profile.jpg';
      return cloudinaryService.convertToThumbnailUrl(url);
    } catch (error) {
      console.error('Error fetching profile image with fallback:', error);
      return '/placeholder-profile.jpg';
    }
  },

  // Upload image to Cloudinary
  async uploadImage(file, Reg_ID) {
    try {
      return await cloudinaryService.uploadFile(file, Reg_ID);
    } catch (error) {
      console.error('Error uploading image:', error);
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
  }
};

export default imageService; 