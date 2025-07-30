# Drive Upload Demo

A simple Firebase web app for testing end-to-end image upload flow to Google Drive via Google Apps Script.

## Features

- ✅ File input field optimized for mobile browsers
- ✅ Image file validation (type and size limits)
- ✅ Base64 conversion using FileReader
- ✅ POST request to Google Apps Script Web App
- ✅ Retry logic with exponential backoff
- ✅ Loading/progress indicators
- ✅ Firestore integration for metadata storage
- ✅ Mobile responsive design
- ✅ 1MB file size limit with warnings

## Setup

1. **Install dependencies:**
   ```bash
   cd drive-upload-demo
   npm install
   ```

2. **Update Google Apps Script URL:**
   - Open `src/App.vue`
   - Replace `YOUR_SCRIPT_ID` in the `GAS_WEBAPP_URL` constant with your actual Google Apps Script Web App URL

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Google Apps Script Requirements

Your Google Apps Script Web App should:

1. Accept POST requests with the following parameters:
   - `action`: "uploadImage"
   - `filename`: The original filename
   - `mimeType`: The file's MIME type
   - `imageBase64`: Base64 encoded image data
   - `token`: Optional authentication token

2. Return a JSON response in this format:
   ```json
   {
     "success": true,
     "driveUrl": "https://drive.google.com/file/d/.../view"
   }
   ```

## Usage

1. Enter a title for your image
2. Select an image file (max 1MB)
3. Click "Upload to Drive"
4. The app will:
   - Convert the image to base64
   - Send it to your Google Apps Script
   - Receive the Drive URL
   - Save metadata to Firestore
   - Display the uploaded image

## File Structure

```
drive-upload-demo/
├── src/
│   ├── App.vue              # Main application component
│   ├── main.js              # Vue app entry point
│   └── firebase-config.js   # Firebase configuration
├── public/
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.js          # Vite configuration
└── README.md               # This file
```

## Firebase Configuration

The app uses the same Firebase project as the main WERESL application:
- Project ID: `weresldatabase`
- Firestore collection: `uploadedImages`

## Error Handling

- File size validation (1MB limit)
- Image type validation
- Network error retry logic (max 3 attempts)
- 5xx status code retry logic
- User-friendly error messages

## Mobile Optimization

- Touch-friendly file input
- Responsive design
- Optimized for mobile browsers
- Loading indicators for better UX

## Testing

1. Start the development server
2. Open in a mobile browser or use browser dev tools
3. Test with various image types and sizes
4. Verify Firestore data is saved correctly
5. Test network error scenarios

## Troubleshooting

- **CORS errors**: Ensure your Google Apps Script is deployed as a web app with proper CORS headers
- **Firebase errors**: Check that the Firebase configuration is correct
- **Upload failures**: Verify the Google Apps Script URL is correct and the script is deployed 