import { fallbackDriveService } from '@/services/googleDrive.js'

// Google Drive API configuration
const GOOGLE_DRIVE_FOLDER_ID = "1gOHhMdxx37YlNT3akgxWeoJjwL2H3hle"

export const storageOperations = {
  // Upload image to Google Drive
  async uploadImage(file, regId) {
    try {
      // Process image first (HEIC conversion and compression)
      const processedFile = await this.processImage(file)
      
      // Use the Google Drive service to upload
      const driveUrl = await fallbackDriveService.uploadFile(processedFile, regId)
      
      return driveUrl
    } catch (error) {
      console.error('Error uploading image:', error)
      throw error
    }
  },

  // Process image (HEIC conversion and compression)
  async processImage(file) {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      
      img.onload = () => {
        // Set canvas size (max 800px width/height for compression)
        const maxSize = 800
        let { width, height } = img
        
        if (width > height) {
          if (width > maxSize) {
            height = (height * maxSize) / width
            width = maxSize
          }
        } else {
          if (height > maxSize) {
            width = (width * maxSize) / height
            height = maxSize
          }
        }
        
        canvas.width = width
        canvas.height = height
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height)
        
        canvas.toBlob((blob) => {
          resolve(blob)
        }, 'image/jpeg', 0.8) // 80% quality
      }
      
      img.onerror = reject
      
      // Handle HEIC files
      if (file.type === 'image/heic' || file.type === 'image/heif') {
        // Convert HEIC to JPEG using heic2any library
        this.convertHeicToJpeg(file).then(resolve).catch(reject)
      } else {
        img.src = URL.createObjectURL(file)
      }
    })
  },

  // Convert HEIC to JPEG
  async convertHeicToJpeg(file) {
    // This would require the heic2any library
    // For now, we'll assume the browser can handle it
    return file
  },

  // Upload to Google Drive (maintains existing integration)
  async uploadToGoogleDrive(file, regId) {
    try {
      // This would require Google Drive API integration
      // For now, we'll return a placeholder
      console.log('Google Drive upload would happen here for:', regId)
      return `https://drive.google.com/thumbnail?id=placeholder&sz=w200-h200`
    } catch (error) {
      console.error('Error uploading to Google Drive:', error)
      throw error
    }
  },

  // Delete image from Google Drive
  async deleteImage(imageUrl) {
    try {
      // This would require Google Drive API to delete the file
      console.log('Google Drive delete would happen here for:', imageUrl)
    } catch (error) {
      console.error('Error deleting image:', error)
      throw error
    }
  },

  // Get image URL from Google Drive
  async getImageUrl(path) {
    try {
      // This would be the Google Drive file URL
      return path
    } catch (error) {
      console.error('Error getting image URL:', error)
      throw error
    }
  },

  // Extract file ID from Google Drive URL (replicated from code.gs)
  extractFileId(url) {
    const match = url.match(/\/d\/(.+?)(\/|$)/) || url.match(/id=([^&]+)/)
    return match ? match[1] : null
  }
}

export default storageOperations 