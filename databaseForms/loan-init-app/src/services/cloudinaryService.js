// Cloudinary Service for Image Storage
// This service handles file uploads to Cloudinary using the wereSL/profile_images folder

const CLOUDINARY_CLOUD_NAME = 'db1jrcyun';
const CLOUDINARY_UPLOAD_PRESET = 'wereSL'; // unsigned preset
const CLOUDINARY_FOLDER = 'profile_images';

export const cloudinaryService = {
  // Upload file to Cloudinary (unsigned, client-side)
  async uploadFile(file, Reg_ID) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      formData.append('folder', CLOUDINARY_FOLDER);
      formData.append('public_id', `${Reg_ID}_${Date.now()}`);

      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const result = await response.json();
      // result.secure_url is the direct image URL
      return result.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw error;
    }
  },

  // Dummy delete (real delete requires secret, not safe for frontend)
  async deleteFile(/* publicId */) {
    // Not implemented for client-side (security)
    return true;
  },

  // Convert Cloudinary URL to thumbnail URL (200x200 crop)
  convertToThumbnailUrl(cloudinaryUrl) {
    if (!cloudinaryUrl) return cloudinaryUrl;
    // Insert transformation string after /upload/
    return cloudinaryUrl.replace('/upload/', '/upload/c_thumb,w_200,h_200/');
  },

  // Convert Cloudinary URL to direct/optimized URL (auto format/quality)
  convertToDirectUrl(cloudinaryUrl) {
    if (!cloudinaryUrl) return cloudinaryUrl;
    return cloudinaryUrl.replace('/upload/', '/upload/f_auto,q_auto/');
  }
};

export default cloudinaryService; 