// Google Drive API Service
// This service handles file uploads to Google Drive using the same folder as your Google Sheets

const GOOGLE_DRIVE_FOLDER_ID = "1gOHhMdxx37YlNT3akgxWeoJjwL2H3hle"

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
  async uploadFile(file, Reg_ID) {
    try {
      // Check if user is authenticated
      if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
        await gapi.auth2.getAuthInstance().signIn()
      }

      const timestamp = Date.now()
      const fileName = `${Reg_ID}_${timestamp}.jpg`
      
      // Create file metadata
      const metadata = {
        Name: fileName,
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
        // Return the Google Drive thumbnail URL format
        return `https://drive.google.com/thumbnail?id=${result.id}&sz=w200-h200`
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

  // Extract file ID from Google Drive URL
  extractFileId(url) {
    const match = url.match(/\/d\/(.+?)(\/|$)/) || url.match(/id=([^&]+)/)
    return match ? match[1] : null
  },

  // Convert Google Drive URL to thumbnail URL
  convertToThumbnailUrl(driveUrl) {
    const fileId = this.extractFileId(driveUrl)
    if (fileId) {
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w200-h200`
    }
    return driveUrl
  },

  // Convert Google Drive URL to direct image URL
  convertToDirectUrl(driveUrl) {
    const fileId = this.extractFileId(driveUrl)
    if (fileId) {
      return `https://drive.google.com/uc?export=view&id=${fileId}`
    }
    return driveUrl
  }
}

// Fallback implementation for when Google Drive API is not available
export const fallbackDriveService = {
  async uploadFile(file, Reg_ID) {
    // For development/testing, return a placeholder URL
    const timestamp = Date.now()
    const fileName = `${Reg_ID}_${timestamp}.jpg`
    
    console.log('Google Drive upload (fallback) for:', Reg_ID, fileName)
    
    // Return a placeholder URL that would be the actual Google Drive thumbnail URL
    return `https://drive.google.com/thumbnail?id=placeholder_${fileName}&sz=w200-h200`
  },

  async deleteFile(fileId) {
    console.log('Google Drive delete (fallback) for:', fileId)
    return true
  },

  extractFileId(url) {
    const match = url.match(/\/d\/(.+?)(\/|$)/) || url.match(/id=([^&]+)/)
    return match ? match[1] : null
  },

  convertToThumbnailUrl(driveUrl) {
    const fileId = this.extractFileId(driveUrl)
    if (fileId) {
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w200-h200`
    }
    return driveUrl
  },

  convertToDirectUrl(driveUrl) {
    const fileId = this.extractFileId(driveUrl)
    if (fileId) {
      return `https://drive.google.com/uc?export=view&id=${fileId}`
    }
    return driveUrl
  }
}

export default googleDriveService 