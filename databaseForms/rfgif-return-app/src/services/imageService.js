// Image Service for Google Drive Integration
// This service handles fetching images from your Google Drive folder and uploading via Google Apps Script

import { uploadToDrive, uploadImageWithProgress } from './driveUploadService.js'

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
  },

  // Upload file to Google Drive via Apps Script (replaces Cloudinary)
  // Now supports images and PDFs for bill uploads
  async uploadImage(file, regId) {
    try {
      console.log('📤 Uploading file to Google Drive via Apps Script...')
      console.log('📁 File:', file.name, 'Size:', file.size, 'Type:', file.type)
      console.log('🆔 RegID:', regId)
      
      // Use the drive upload service
      const result = await uploadToDrive(file)
      
      if (result.success && result.driveUrl) {
        console.log('✅ File uploaded successfully to Google Drive')
        console.log('🔗 Drive URL:', result.driveUrl)
        console.log('🆔 File ID:', result.fileId)
        
        // Return the drive URL for storage in database
        return result.driveUrl
      } else {
        throw new Error('Upload failed - no drive URL returned')
      }
    } catch (error) {
      console.error('❌ Error uploading to Google Drive:', error)
      throw error
    }
  },

  // Upload file with progress callback
  async uploadImageWithProgress(file, regId, onProgress) {
    try {
      console.log('📤 Uploading file with progress tracking...')
      
      const result = await uploadImageWithProgress(file, onProgress)
      
      if (result.success && result.driveUrl) {
        console.log('✅ File uploaded successfully with progress tracking')
        return result.driveUrl
      } else {
        throw new Error('Upload failed - no drive URL returned')
      }
    } catch (error) {
      console.error('❌ Error uploading with progress:', error)
      throw error
    }
  },

  // Convert Google Drive URL to thumbnail URL (200x200 crop)
  convertToThumbnailUrl(driveUrl) {
    if (!driveUrl) return driveUrl;
    const fileId = this.extractFileId(driveUrl)
    if (fileId) {
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w200`
    }
    return driveUrl
  },

  // Convert Google Drive URL to direct/optimized URL
  convertToOptimizedUrl(driveUrl) {
    if (!driveUrl) return driveUrl;
    const fileId = this.extractFileId(driveUrl)
    if (fileId) {
      return `https://drive.google.com/uc?export=view&id=${fileId}`
    }
    return driveUrl
  },

  // Check if URL is a Google Drive URL
  isGoogleDriveUrl(url) {
    return url && (url.includes('drive.google.com') || url.includes('docs.google.com'))
  },

  // Check if URL is a Cloudinary URL (for backward compatibility)
  isCloudinaryUrl(url) {
    return url && url.includes('cloudinary.com')
  },

  // Check if file is an image
  isImageFile(file) {
    return file && file.type && file.type.startsWith('image/')
  },

  // Check if file is a PDF
  isPdfFile(file) {
    return file && file.type && file.type === 'application/pdf'
  },

  // Extract file ID from various URL formats
  extractDriveFileId(url) {
    return this.extractFileId(url)
  },

  // Debug image URL (for troubleshooting)
  async debugImageUrl(url) {
    console.log('🔍 Debugging image URL:', url)
    
    if (this.isGoogleDriveUrl(url)) {
      const fileId = this.extractFileId(url)
      console.log('📁 Google Drive file ID:', fileId)
      return url
    } else if (this.isCloudinaryUrl(url)) {
      console.log('☁️ Cloudinary URL detected')
      return url
    } else {
      console.log('❓ Unknown URL format')
      return url
    }
  },

  // Test image processing functionality
  async testImageProcessing() {
    console.log('🧪 Testing image processing...')
    
    // Test file ID extraction
    const testUrl = 'https://drive.google.com/thumbnail?id=1ABC123DEF456&sz=w300'
    const fileId = this.extractFileId(testUrl)
    console.log('📁 Test file ID extraction:', fileId === '1ABC123DEF456' ? '✅ PASS' : '❌ FAIL')
    
    // Test URL format detection
    console.log('🔗 Google Drive URL detection:', this.isGoogleDriveUrl(testUrl) ? '✅ PASS' : '❌ FAIL')
    console.log('☁️ Cloudinary URL detection:', this.isCloudinaryUrl('https://res.cloudinary.com/test/image/upload/v123/test.jpg') ? '✅ PASS' : '❌ FAIL')
  },

  // Test thumbnail URL conversion
  testThumbnailUrl() {
    console.log('🖼️ Testing thumbnail URL conversion...')
    
    const testUrl = 'https://drive.google.com/uc?export=view&id=1ABC123DEF456'
    const thumbnailUrl = this.convertToThumbnailUrl(testUrl)
    console.log('📸 Thumbnail URL:', thumbnailUrl)
    
    return thumbnailUrl
  }
}

export default imageService 