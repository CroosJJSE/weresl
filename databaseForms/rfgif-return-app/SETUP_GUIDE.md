# Setup Guide - WERESL Firebase Application

## 🚀 Quick Start (After npm install)

### 1. **Firebase Configuration** ✅ Already Done
The application is already configured with your Firebase project:
- Project ID: `weresldatabase`
- Firestore Database: Enabled
- Storage: Using Google Drive instead (free)

### 2. **Google Drive Setup** (Optional for now)
The application currently uses a fallback service that simulates Google Drive uploads. For full functionality:

#### Option A: Use Fallback (Recommended for testing)
- The app will work with placeholder URLs
- Images will be processed but not actually uploaded
- Perfect for testing the application

#### Option B: Set up Google Drive API (For production)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google Drive API
4. Create credentials (API Key and OAuth 2.0 Client ID)
5. Update `src/services/googleDrive.js` with your credentials

### 3. **Add Logo Image** (Optional)
Create a logo image for the application:
```bash
# Add your logo to the public folder
cp your-logo.png public/logo.png
```

### 4. **Start the Application**
```bash
npm run dev
```

The application will start at `http://localhost:3000`

## 🔧 **What's Ready to Use**

### ✅ **Working Features**
- **Profile Management**: View, create, and manage profiles
- **Loan Processing**: Add loans to profiles
- **Payment Processing**: Process RF payments and Grant entries
- **Analytics Dashboard**: View statistics and charts
- **Developer Tools**: Triple-click logo to access
- **Admin Panel**: System management features

### ✅ **Database Operations**
- All CRUD operations for profiles
- Loan and payment processing
- Analytics calculations
- System logging

### ✅ **Image Processing**
- HEIC to JPEG conversion
- Image compression (800px max)
- Google Drive integration (fallback mode)

## 🎯 **Testing the Application**

### 1. **Home Page**
- Browse profiles with filters
- Click profile cards to view details
- Switch between Profiles and Analytics views

### 2. **Loan Initialization**
- Navigate to `/loan-init`
- Test with both registered and new users
- Upload images (will use placeholder URLs)

### 3. **Payment Processing**
- Navigate to `/payment`
- Enter RegID and payment details
- Process RF payments or Grant entries

### 4. **Analytics Dashboard**
- View real-time statistics
- Check district distribution
- Review yearly growth data

### 5. **Developer Tools**
- Triple-click the logo
- View raw Firebase data
- Access system logs

## 🔄 **Migration from Google Sheets**

The application replicates your existing functionality:

### **Data Structure**
- Same profile fields as your Google Sheets
- Same loan types (RF, GRANT, GIF)
- Same payment processing logic
- Same district mapping system

### **Validation Logic**
- Replicates all validation from `code.gs`
- Same error handling and logging
- Same business rules for payments

### **Image Handling**
- Uses the same Google Drive folder: `1l8yBRcK_QHMSjrdxwYHgVjwyBSM`
- Same HEIC conversion and compression
- Same file naming convention

## 🚨 **Important Notes**

### **Firebase Security Rules**
For development, the app uses open rules. For production, update Firestore rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // Change for production
    }
  }
}
```

### **Google Drive Integration**
Currently using fallback mode. For full functionality:
1. Set up Google Drive API credentials
2. Update `src/services/googleDrive.js`
3. Replace `fallbackDriveService` with `googleDriveService`

### **Environment Variables** (Optional)
Create `.env` file for custom configuration:
```
VITE_GOOGLE_DRIVE_FOLDER_ID=1l8yBRcK_QHMSjrdxwYHgVjwyBSM
VITE_GOOGLE_API_KEY=your_api_key
VITE_GOOGLE_CLIENT_ID=your_client_id
```

## 🎉 **Ready to Run!**

The application is fully functional with:
- ✅ All core features working
- ✅ Database operations ready
- ✅ Form validation implemented
- ✅ Responsive design
- ✅ Error handling
- ✅ System logging

**Start the application:**
```bash
npm run dev
```

**Access the application:**
- Main page: `http://localhost:3000`
- Loan form: `http://localhost:3000/loan-init`
- Payment form: `http://localhost:3000/payment`
- Analytics: `http://localhost:3000/analytics`
- Admin: `http://localhost:3000/admin` 