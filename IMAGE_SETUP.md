# Image Setup Guide

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

### **2. Profile Images**

Profile images are automatically handled by the application:
- **Upload**: When creating profiles, images are uploaded to your Google Drive folder
- **Display**: Images are fetched from Google Drive using the same folder
- **Processing**: HEIC conversion and compression (same as your Google Sheets)

### **3. Image Processing**

The application includes the same image processing as your Google Sheets:
- **HEIC to JPEG conversion**
- **Image compression** (max 800px width/height)
- **File naming**: `{RegID}_{timestamp}.jpg`
- **Storage**: Same Google Drive folder as your original system

### **4. Current Status**

✅ **Working Features**:
- Placeholder images for development
- Image processing and compression
- Google Drive integration ready
- Error handling for missing images

🔄 **To Complete Setup**:
1. Upload your logo to Google Drive
2. Get the file ID
3. Update `src/services/imageService.js`
4. Test the application

### **5. Testing Images**

1. **Start the application**: `npm run dev`
2. **Check logo**: Should display "WERESL" text or your logo
3. **Test profile images**: Upload images in loan initialization form
4. **Verify processing**: Images should be compressed and stored

### **6. File Structure**

```
Google Drive Folder: 1l8yBRcK_QHMSjrdxwYHgVjwyBSM
├── logo.png (your logo)
├── placeholder-profile.jpg (default profile image)
└── profile-images/
    ├── COL001_1234567890.jpg
    ├── GAM002_1234567891.jpg
    └── ...
```

### **7. Troubleshooting**

**Logo not showing**:
- Check if file ID is correct in `imageService.js`
- Verify the file is in the correct Google Drive folder
- Check browser console for errors

**Profile images not loading**:
- Verify Google Drive folder permissions
- Check if images were uploaded successfully
- Review error logs in browser console

**Image processing errors**:
- Ensure images are valid formats (JPG, PNG, HEIC)
- Check file size (should be under 10MB)
- Verify Google Drive API access

## 🎯 **Quick Start**

1. **For immediate testing**: The app works with placeholder images
2. **For production**: Upload your logo and update the file ID
3. **For full functionality**: Set up Google Drive API credentials

The application is ready to use with your existing Google Drive setup! 🚀 