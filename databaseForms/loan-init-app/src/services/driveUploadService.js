/**
 * Modular Google Drive Upload Service for Loan Init App
 * Replaces Cloudinary service with Google Drive
 */

// Configuration - Update these for your specific use case
const DRIVE_CONFIG = {
  // Google Apps Script Web App URL
  GAS_WEBAPP_URL: 'https://script.google.com/macros/s/AKfycbynGkTSjRG2jFRcyinfWsEYbD_H0x7Pfl_DEZuJmuh2BfxpuCM_T3AxpHvKVNJ7N4Le5Q/exec',
  
  // Authentication token
  AUTH_TOKEN: 'test-token',
  
  // Maximum file size in bytes (1MB = 1024 * 1024)
  MAX_FILE_SIZE: 1024 * 1024,
  
  // Allowed image types
  ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
};

/**
 * Convert file to base64
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Validate file
 */
export const validateFile = (file) => {
  const errors = [];
  
  // Check file size
  if (file.size > DRIVE_CONFIG.MAX_FILE_SIZE) {
    errors.push(`File size exceeds ${DRIVE_CONFIG.MAX_FILE_SIZE / (1024 * 1024)}MB limit`);
  }
  
  // Check file type
  if (!DRIVE_CONFIG.ALLOWED_TYPES.includes(file.type)) {
    errors.push('Please select a valid image file (JPEG, PNG, GIF, WebP)');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Upload image to Google Drive via Apps Script
 */
export const uploadToDrive = async (file, retryCount = 0) => {
  try {
    // Validate file
    const validation = validateFile(file);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }
    
    // Convert to base64
    const base64 = await fileToBase64(file);
    
    // Prepare form data
    const formData = new FormData();
    formData.append('action', 'uploadImage');
    formData.append('filename', file.name);
    formData.append('mimeType', file.type);
    formData.append('imageBase64', base64);
    formData.append('token', DRIVE_CONFIG.AUTH_TOKEN);
    
    // Send request
    const response = await fetch(DRIVE_CONFIG.GAS_WEBAPP_URL, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    
    if (result.success && result.driveUrl) {
      return {
        success: true,
        driveUrl: result.driveUrl,
        fileId: result.fileId,
        fileName: result.fileName,
        fileSize: result.fileSize
      };
    } else {
      throw new Error(result.message || 'Upload failed');
    }
    
  } catch (error) {
    console.error('Drive upload error:', error);
    
    // Retry logic for network errors or 5xx status
    if (retryCount < 3 && (error.message.includes('5') || error.message.includes('network'))) {
      const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay));
      return uploadToDrive(file, retryCount + 1);
    }
    
    throw error;
  }
};

/**
 * Upload image with progress callback
 */
export const uploadImageWithProgress = async (file, onProgress) => {
  try {
    // Simulate progress for base64 conversion
    onProgress && onProgress(10, 'Converting image...');
    await new Promise(resolve => setTimeout(resolve, 100));
    
    onProgress && onProgress(30, 'Uploading to Google Drive...');
    const result = await uploadToDrive(file);
    
    onProgress && onProgress(90, 'Finalizing...');
    await new Promise(resolve => setTimeout(resolve, 100));
    
    onProgress && onProgress(100, 'Upload complete!');
    
    return result;
  } catch (error) {
    onProgress && onProgress(0, `Upload failed: ${error.message}`);
    throw error;
  }
};

/**
 * Create image preview URL
 */
export const createImagePreview = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Format file size for display
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Test connection to GAS web app
 */
export const testConnection = async () => {
  try {
    const response = await fetch(DRIVE_CONFIG.GAS_WEBAPP_URL, {
      method: 'GET'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Connection test failed:', error);
    return false;
  }
};

export default {
  uploadToDrive,
  uploadImageWithProgress,
  validateFile,
  createImagePreview,
  formatFileSize,
  testConnection,
  DRIVE_CONFIG
}; 