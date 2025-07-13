// Image Service for Google Drive Integration
// This service handles fetching images from your Google Drive folder

const GOOGLE_DRIVE_FOLDER_ID = "1l8yBRcK_QHMSjrdxwYHgVjwyBSM"

export const imageService = {
  // Get logo image from Google Drive
  async getLogoImage() {
    try {
      const logoFileId = '1AEEWccjf_sMoXJgAaYIPZZm5rM-OCFe2' // Replace with actual file ID
      
      if (logoFileId === 'YOUR_LOGO_FILE_ID') {
        // Return placeholder if not configured
        return '/placeholder-logo.png'
      }
      
      // Use thumbnail format like the original system
      return `https://drive.google.com/thumbnail?id=${logoFileId}&sz=w400`
    } catch (error) {
      console.error('Error fetching logo:', error)
      return '/placeholder-logo.png'
    }
  },

  // Get profile image by RegID
  async getProfileImage(regId) {
    try {
      // Use direct image URL instead of thumbnail to avoid CORS
      const directUrl = `https://drive.google.com/uc?export=view&id=${regId}`
      return directUrl
    } catch (error) {
      console.error('Error fetching profile image:', error)
      return '/placeholder-profile.jpg'
    }
  },

  // Get profile image with fallback options (extract file ID from existing URL)
  async getProfileImageWithFallback(regId, driveUrl = null) {
    try {
      let fileId = null;
      
      // If we have a driveUrl (like the thumbnail URL from your data), extract the file ID
      if (driveUrl) {
        fileId = this.extractFileId(driveUrl);
        console.log('Extracted file ID from URL:', fileId);
      }
      
      // If no file ID from URL, try using regId as file ID
      if (!fileId && regId) {
        fileId = this.extractFileId(regId) || regId;
        console.log('Using regId as file ID:', fileId);
      }
      
      if (fileId) {
        // Try multiple URL formats to find one that works
        const urlFormats = [
          `https://drive.google.com/thumbnail?id=${fileId}&sz=w300`,
          `https://drive.google.com/uc?export=view&id=${fileId}`,
          `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`,
          `https://drive.google.com/thumbnail?id=${fileId}&sz=w200`
        ];
        
        console.log('Trying URL formats for file ID:', fileId);
        console.log('URL formats:', urlFormats);
        
        // Return the first format (thumbnail) as primary, let the image error handler try others
        return urlFormats[0];
      }
      
      return '/placeholder-profile.jpg';
    } catch (error) {
      console.error('Error fetching profile image with fallback:', error);
      return '/placeholder-profile.jpg';
    }
  },

  // Get all images from Google Drive folder
  async getAllImages() {
    try {
      // This would list all images in your Google Drive folder
      // For now, return placeholder data
      return [
        {
          id: 'logo',
          name: 'WERESL Logo',
          url: 'https://drive.google.com/uc?export=view&id=YOUR_LOGO_FILE_ID',
          type: 'logo'
        },
        {
          id: 'placeholder',
          name: 'Profile Placeholder',
          url: '/placeholder-profile.jpg',
          type: 'profile'
        }
      ]
    } catch (error) {
      console.error('Error fetching images:', error)
      return []
    }
  },

  // Extract file ID from Google Drive URL - using the same method as the original system
  extractFileId(url) {
    if (!url) return null;
    const match = url.match(/[-\w]{25,}/);
    return match ? match[0] : null;
  },

  // Convert Google Drive URL to direct image URL (no thumbnail to avoid CORS)
  convertToDirectUrl(driveUrl) {
    const fileId = this.extractFileId(driveUrl)
    if (fileId) {
      return `https://drive.google.com/uc?export=view&id=${fileId}`
    }
    return driveUrl
  },

  // Get placeholder images for development
  getPlaceholderImages() {
    return {
      logo: '/placeholder-logo.png',
      profile: '/placeholder-profile.jpg',
      logoText: 'WERESL'
    }
  },

  // Test if an image URL is accessible (simplified to avoid CORS)
  async testImageUrl(url) {
    // Skip testing for Google Drive URLs to avoid CORS issues
    if (url.includes('drive.google.com')) {
      return true
    }
    
    try {
      const response = await fetch(url, { method: 'HEAD' })
      return response.ok
    } catch (error) {
      return false
    }
  }
}

export default imageService 