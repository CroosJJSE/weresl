# Google Apps Script Setup Guide

This guide will help you set up the Google Apps Script to handle image uploads to Google Drive and optionally store links in a Google Sheet.

## Step 1: Create Google Apps Script Project

1. Go to [Google Apps Script](https://script.google.com/)
2. Click "New Project"
3. Delete the default `Code.gs` content
4. Copy and paste the code from `code.gs` file
5. Save the project with a name like "Drive Upload Handler"

## Step 2: Configure the Script

Edit the `CONFIG` object in the script:

```javascript
const CONFIG = {
  // Google Drive folder ID (optional)
  // Leave empty to store in root, or provide a folder ID
  DRIVE_FOLDER_ID: '',
  
  // Google Sheet ID for storing links (optional)
  // Leave empty to disable sheet logging
  SHEET_ID: '',
  
  // Sheet name where links will be stored
  SHEET_NAME: 'Uploaded Images',
  
  // Authentication token (optional)
  AUTH_TOKEN: 'test-token'
};
```

### Getting Google Drive Folder ID:
1. Create a folder in Google Drive
2. Open the folder
3. Copy the ID from the URL: `https://drive.google.com/drive/folders/FOLDER_ID_HERE`

### Getting Google Sheet ID:
1. Create a new Google Sheet
2. Copy the ID from the URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`

## Step 3: Deploy as Web App

1. Click "Deploy" → "New deployment"
2. Choose "Web app" as the type
3. Set the following options:
   - **Execute as**: "Me" (your Google account)
   - **Who has access**: "Anyone" (for testing) or "Anyone with Google Account" (for production)
4. Click "Deploy"
5. Copy the Web App URL (you'll need this for your Vue app)

## Step 4: Test the Deployment

1. Open the Web App URL in a browser
2. You should see: `{"success":true,"message":"GAS Web App is running!"}`

## Step 5: Update Your Vue App

In your `drive-upload-demo/src/App.vue`, update the GAS URL:

```javascript
const GAS_WEBAPP_URL = 'YOUR_WEB_APP_URL_HERE'
```

## Step 6: Test the Complete Flow

1. Run your Vue app: `npm run dev`
2. Upload an image
3. Check Google Drive for the uploaded file
4. Check Google Sheet (if configured) for the link entry

## Optional: Google Sheet Setup

If you want to use a Google Sheet to log uploads:

1. Create a new Google Sheet
2. Copy the Sheet ID from the URL
3. Update `CONFIG.SHEET_ID` in the script
4. Run the `setupSheet()` function once to create the headers
5. Redeploy the script

## Security Considerations

### For Production:
1. Change `AUTH_TOKEN` to a strong, unique token
2. Set "Who has access" to "Anyone with Google Account"
3. Consider implementing additional authentication
4. Monitor usage and set quotas if needed

### For Testing:
- Use "Anyone" access for easy testing
- Use the default `test-token`

## Troubleshooting

### Common Issues:

1. **CORS Errors**: 
   - Make sure the Web App is deployed with proper access settings
   - Check that the URL is correct in your Vue app

2. **Permission Errors**:
   - Ensure the script has permission to access Drive and Sheets
   - Check that the folder/sheet IDs are correct

3. **File Size Errors**:
   - The script enforces a 1MB limit
   - Check that your images are under this limit

4. **Authentication Errors**:
   - Make sure the token in your Vue app matches the one in the GAS script

### Testing Functions:

The script includes these test functions:

- `testUpload()`: Tests the upload functionality
- `setupSheet()`: Sets up the Google Sheet with headers
- `doGet()`: Tests basic connectivity

## File Structure

```
google-apps-script/
├── code.gs              # Main script code
└── SETUP_GUIDE.md      # This guide
```

## Response Format

The script returns JSON responses in this format:

```json
{
  "success": true,
  "message": "Upload successful",
  "driveUrl": "https://drive.google.com/file/d/.../view",
  "fileId": "file_id_here",
  "fileName": "image.jpg",
  "fileSize": 12345
}
```

## Error Responses

```json
{
  "success": false,
  "message": "Error description"
}
``` 