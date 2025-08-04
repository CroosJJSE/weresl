# Image Setup Guide for RFGIF Return App

## 🖼️ **Setting Up Images from Google Drive**

The application is configured to use images from your Google Drive folder: `1l8yBRcK_QHMSjrdxwYHgVjwyBSM`

### **1. Logo Setup**

#### Option A: Use Text Logo (Current)
The application currently displays "WERESL" as text logo. This works fine for development.

#### Option B: Use Actual Logo Image
1. **Upload your logo** to the Google Drive folder: `1l8yBRcK_QHMSjrdxwYHgVjwyBSM`
2. **Get the file ID**:
   - Right-click the logo file in Google Drive
   - Select "Get link"
   - Copy the file ID from the URL (the long string after `/d/` and before `/view`)
3. **Update the code**:
   - Open `src/services/imageService.js`
   - Replace `'YOUR_LOGO_FILE_ID'` with your actual file ID
   - Example: `const logoFileId = '1ABC123DEF456'`

### **2. Bill Image Uploads**

Bill images are automatically handled by the application:
- **Upload**: When submitting RF repayments, bill images are uploaded to your Google Drive folder
- **Display**: Images are fetched from Google Drive using the same folder
- **Processing**: HEIC conversion and compression (same as your Google Sheets)

### **3. Google Apps Script Integration**

The application uses Google Apps Script (GAS) for image uploads:

#### **GAS Web App URL**
The current configuration uses:
```
https://script.google.com/macros/s/AKfycbynGkTSjRG2jFRcyinfWsEYbD_H0x7Pfl_DEZuJmuh2BfxpuCM_T3AxpHvKVNJ7N4Le5Q/exec
```

#### **To Update GAS URL**:
1. Open `src/services/driveUploadService.js`
2. Update the `GAS_WEBAPP_URL` in the `DRIVE_CONFIG` object
3. Update the `AUTH_TOKEN` if needed

### **4. Image Processing**

The application includes the same image processing as your Google Sheets:
- **HEIC to JPEG conversion**
- **Image compression** (max 800px width/height)
- **File naming**: `{RegID}_{timestamp}.jpg`
- **Storage**: Same Google Drive folder as your original system

### **5. Current Status**

✅ **Working Features**:
- Placeholder images for development
- Image processing and compression
- Google Drive integration ready
- Error handling for missing images
- Bill upload functionality via GAS

🔄 **To Complete Setup**:
1. Upload your logo to Google Drive
2. Get the file ID
3. Update `src/services/imageService.js`
4. Test the application
5. Verify GAS web app is accessible

### **6. Testing Images**

1. **Start the application**: `npm run dev`
2. **Check logo**: Should display "WERESL" text or your logo
3. **Test bill uploads**: Upload images in RF repayment form
4. **Verify processing**: Images should be compressed and stored

### **7. File Structure**

```
Google Drive Folder: 1l8yBRcK_QHMSjrdxwYHgVjwyBSM
├── logo.png (your logo)
├── placeholder-profile.jpg (default profile image)
└── bill-images/
    ├── COL001_1234567890.jpg
    ├── GAM002_1234567891.jpg
    └── ...
```

### **8. Troubleshooting**

**Logo not showing**:
- Check if file ID is correct in `imageService.js`
- Verify the file is in the correct Google Drive folder
- Check browser console for errors

**Bill images not uploading**:
- Verify Google Drive folder permissions
- Check if GAS web app is accessible
- Review error logs in browser console
- Test GAS connection using `testConnection()`

**Image processing errors**:
- Ensure images are valid formats (JPG, PNG, HEIC)
- Check file size (should be under 10MB)
- Verify Google Drive API access

**GAS Connection Issues**:
- Test connection using the `testConnection()` function
- Check if the GAS web app URL is correct
- Verify the authentication token is valid

### **9. GAS Configuration**

The application uses the same GAS setup as the loan-init-app:

#### **Required GAS Functions**:
- `uploadImage`: Handles image upload to Google Drive
- `processImage`: Converts HEIC to JPEG and compresses
- `validateToken`: Validates authentication token

#### **GAS Response Format**:
```json
{
  "success": true,
  "driveUrl": "https://drive.google.com/file/d/FILE_ID/view",
  "fileId": "FILE_ID",
  "fileName": "original_filename.jpg",
  "fileSize": 12345
}
```

### **10. Testing GAS Connection**

You can test the GAS connection using the browser console:

```javascript
// Test connection
import { testConnection } from './src/services/driveUploadService.js'
testConnection().then(result => console.log('Connection test:', result))

// Test image upload
import { uploadToDrive } from './src/services/driveUploadService.js'
// Create a test file and upload
```

## 🎯 **Quick Start**

1. **For immediate testing**: The app works with placeholder images
2. **For production**: Upload your logo and update the file ID
3. **For full functionality**: Verify GAS web app is accessible
4. **For bill uploads**: Test the RF repayment form with image upload

The application is ready to use with your existing Google Drive setup! 🚀 