# Data Migration Guide

This guide will help you migrate your data from Google Sheets to Firebase Firestore.

## Prerequisites

1. **Firebase Project Setup**: Make sure your Firebase project is properly configured
2. **Node.js**: Ensure you have Node.js installed
3. **Google Sheets Access**: You need access to your Google Sheets with the data

## Method 1: CSV Export (Recommended - Easier)

### Step 1: Export Data from Google Sheets

1. **Open your Google Sheets**
2. **Export Main Sheet**:
   - Go to `File` → `Download` → `CSV (.csv)`
   - Save as `data/main.csv`
3. **Export Projects Sheet** (if you have one):
   - Go to `File` → `Download` → `CSV (.csv)`
   - Save as `data/projects.csv`

### Step 2: Install Dependencies

```bash
npm install csv-parser
```

### Step 3: Update Firebase Configuration

Edit `migrate-from-csv.js` and update the Firebase configuration with your actual values:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

### Step 4: Create Data Directory

```bash
mkdir data
```

### Step 5: Place CSV Files

Place your exported CSV files in the `data/` directory:
- `data/main.csv` - Main sheet data
- `data/projects.csv` - Projects sheet data (optional)

### Step 6: Run Migration

```bash
node migrate-from-csv.js
```

## Method 2: Google Sheets API (Advanced)

### Step 1: Set up Google Sheets API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google Sheets API
4. Create credentials (Service Account or OAuth 2.0)
5. Download credentials as `credentials.json`

### Step 2: Install Dependencies

```bash
npm install googleapis
```

### Step 3: Update Configuration

1. Update Firebase config in `migrate-data.js`
2. Update `SPREADSHEET_ID` with your Google Sheets ID
3. Place `credentials.json` in the project root

### Step 4: Run Migration

```bash
node migrate-data.js
```

## Data Structure

The migration will create the following collections in Firestore:

### Profiles Collection
- Document ID: RegID
- Fields:
  - `Reg_ID`: Registration ID
  - `District`: District name
  - `Name`: Person's name
  - `Age`: Age
  - `Address`: Address
  - `NIC`: National ID
  - `contact`: Phone number
  - `total_children`: Total children
  - `school_kids`: School-going children
  - `others`: Other dependents
  - `Description`: Description
  - `Occupation`: Occupation
  - `RF_Loan`: RF Loan details
  - `RF_Paid_History`: Payment history
  - `RF_Cur_Prj`: Current projects
  - `Com_prjs`: Completed projects
  - `Image`: Image URL
  - `GRANT`: Grant amount
  - `GIFor`: Grant information
  - `GRANT_Cur_Prj`: Current grant projects
  - `ArmsArray`: Array of arms from projects
  - `createdAt`: Creation timestamp
  - `updatedAt`: Last update timestamp

### Projects Collection
- Auto-generated document IDs
- Fields:
  - `Reg_ID`: Registration ID
  - `Project_Name`: Project name
  - `Project_Type`: Project type
  - `Project_Status`: Project status
  - `Project_Amount`: Project amount
  - `Arms`: Arms information
  - `createdAt`: Creation timestamp
  - `updatedAt`: Last update timestamp

### Config Collection
- Document ID: `districtMappings`
- Fields:
  - `districtMapping`: District code to name mapping
  - `districtCodes`: District name to code mapping
  - `createdAt`: Creation timestamp
  - `updatedAt`: Last update timestamp

## Troubleshooting

### Common Issues

1. **Firebase Permission Error**:
   - Ensure your Firebase project has Firestore enabled
   - Check your Firebase configuration

2. **CSV Format Issues**:
   - Make sure CSV files are properly formatted
   - Check column headers match expected names

3. **Missing Data**:
   - Verify all required fields are present in CSV
   - Check for empty rows or malformed data

### Error Messages

- `"Main CSV file not found"`: Place your main.csv file in the data/ directory
- `"Firebase configuration error"`: Update the Firebase config with your actual values
- `"Permission denied"`: Check your Firebase project permissions

## Verification

After migration, you can verify the data by:

1. **Check Firebase Console**:
   - Go to your Firebase project
   - Navigate to Firestore Database
   - Verify collections and documents are created

2. **Check Web App**:
   - Run your web app: `npm run dev`
   - Verify data is loading correctly
   - Check profile cards and analytics

## Rollback

If you need to rollback the migration:

1. **Delete Collections**:
   - Go to Firebase Console
   - Delete the `profiles`, `projects`, and `config` collections

2. **Re-run Migration**:
   - Fix any issues
   - Run the migration script again

## Support

If you encounter issues:

1. Check the console output for error messages
2. Verify your CSV files are properly formatted
3. Ensure Firebase configuration is correct
4. Check Firebase project permissions

## Next Steps

After successful migration:

1. Test your web application
2. Verify all functionality works correctly
3. Update any hardcoded data references
4. Consider setting up automated backups 