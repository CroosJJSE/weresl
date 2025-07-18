import { imageService } from '@/services/imageService.js';

export const storageOperations = {
  // Upload image using imageService (Cloudinary)
  async uploadImage(file, Reg_ID) {
    return imageService.uploadImage(file, Reg_ID);
  },

  // Process image (HEIC conversion and compression)
  async processImage(file) {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Set canvas size (max 800px width/height for compression)
        const maxSize = 800;
        let { width, height } = img;

        if (width > height) {
          if (width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/jpeg', 0.8); // 80% quality
      };

      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  }
};

export default storageOperations; 