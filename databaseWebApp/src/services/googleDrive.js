// Google Drive API Service
// This service handles file uploads to Google Drive using the same folder as your Google Sheets

import { extractFileId as extractFileIdFromUtils } from '../utils/driveUtils.js'

const GOOGLE_DRIVE_FOLDER_ID = "1l8yBRcK_QHMSjrdxwYHgVjwyBSM"

export const googleDriveService = {
  // Initialize Google Drive API
  async initializeDriveAPI() {
    try {
      // Load the Google Drive API
      await new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = 'https://apis.google.com/js/api.js'
        script.onload = resolve
        script.onerror = reject
        document.head.appendChild(script)
      })

      // Initialize the API
      await new Promise((resolve, reject) => {
        gapi.load('client:auth2', resolve)
      })

      await gapi.client.init({
        apiKey: 'YOUR_GOOGLE_API_KEY', // You'll need to get this from Google Cloud Console
        clientId: 'YOUR_GOOGLE_CLIENT_ID', // You'll need to get this from Google Cloud Console
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
        scope: 'https://www.googleapis.com/auth/drive.file'
      })

      return true
    } catch (error) {
      console.error('Error initializing Google Drive API:', error)
      return false
    }
  },

  // Upload file to Google Drive
  async uploadFile(file, regId) {
    try {
      // Check if user is authenticated
      if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
        await gapi.auth2.getAuthInstance().signIn()
      }

      const timestamp = Date.now()
      const fileName = `${regId}_${timestamp}.jpg`
      
      // Create file metadata
      const metadata = {
        name: fileName,
        parents: [GOOGLE_DRIVE_FOLDER_ID]
      }

      // Create FormData for upload
      const form = new FormData()
      form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }))
      form.append('file', file)

      // Upload to Google Drive
      const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${gapi.auth.getToken().access_token}`
        },
        body: form
      })

      const result = await response.json()
      
      if (result.id) {
        // Return the Google Drive file URL
        return `https://drive.google.com/file/d/${result.id}/view`
      } else {
        throw new Error('Upload failed')
      }
    } catch (error) {
      console.error('Error uploading to Google Drive:', error)
      throw error
    }
  },

  // Delete file from Google Drive
  async deleteFile(fileId) {
    try {
      if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
        await gapi.auth2.getAuthInstance().signIn()
      }

      await gapi.client.drive.files.delete({
        fileId: fileId
      })

      return true
    } catch (error) {
      console.error('Error deleting from Google Drive:', error)
      throw error
    }
  },

  // Get file info from Google Drive
  async getFileInfo(fileId) {
    try {
      if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
        await gapi.auth2.getAuthInstance().signIn()
      }

      const response = await gapi.client.drive.files.get({
        fileId: fileId
      })

      return response.result
    } catch (error) {
      console.error('Error getting file info from Google Drive:', error)
      throw error
    }
  },

  // Extract file ID from Google Drive URL
  extractFileId(url) {
    return extractFileIdFromUtils(url);
  },

  // Check if file exists in Google Drive
  async fileExists(fileId) {
    try {
      await this.getFileInfo(fileId)
      return true
    } catch (error) {
      return false
    }
  }
}

// Fallback implementation for when Google Drive API is not available
export const fallbackDriveService = {
  async uploadFile(file, regId) {
    // For development/testing, return a placeholder URL
    const timestamp = Date.now()
    const fileName = `${regId}_${timestamp}.jpg`
    
    console.log('Google Drive upload (fallback) for:', regId, fileName)
    
    // Return a placeholder URL that would be the actual Google Drive URL
    return `https://drive.google.com/file/d/placeholder_${fileName}/view`
  },

  async deleteFile(fileId) {
    console.log('Google Drive delete (fallback) for:', fileId)
    return true
  },

  extractFileId(url) {
    return extractFileIdFromUtils(url);
  }
}

export default googleDriveService 