# WERESL Firebase Application

A modular Firebase web application that replicates the functionality of the existing Google Sheets/Apps Script solution with improved architecture and Firebase integration.

## 🚀 Features

### Core Functionalities
- **Profile Management**: Complete CRUD operations for user profiles
- **Loan Processing**: RF, GRANT, and GIF loan types with payment tracking
- **Payment Processing**: RF loan payments and Grant "Give It Forward" entries
- **Analytics Dashboard**: Real-time statistics and charts
- **Image Upload**: HEIC conversion and compression with Google Drive integration
- **Developer Tools**: Hidden developer mode with raw data access

### Technical Features
- **Modular Architecture**: Clean separation of concerns with Vue.js components
- **Firebase Integration**: Real-time database with Firestore
- **Responsive Design**: Mobile-friendly interface
- **Form Validation**: Comprehensive client-side and server-side validation
- **Error Handling**: Robust error logging and user feedback
- **System Logging**: Complete operation tracking

## 📁 Project Structure

```
src/
├── assets/           # Static files
├── components/       # Reusable UI components
│   ├── ProfileCard.vue
│   └── ProfileModal.vue
├── config/           # Configuration files
├── firebase/         # Firebase services
│   ├── auth.js       # Authentication
│   ├── db.js         # Database operations
│   ├── storage.js    # File storage
│   └── index.js      # Main Firebase initialization
├── pages/            # Application pages
│   ├── admin/        # Admin views
│   ├── analytics/    # Analytics dashboard
│   ├── forms/        # Data entry forms
│   └── main/         # Main profile views
├── services/         # Business logic
│   ├── profile.js    # Profile operations
│   ├── loan.js       # Loan processing
│   ├── grant.js      # Grant processing
│   └── utils.js      # Utility functions
├── styles/           # CSS files
└── App.js            # Main application entry
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd weresl-firebase-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Update `src/firebase/index.js` with your Firebase configuration
   - Set up Firestore database with the required collections
   - Configure Firebase Storage for image uploads

4. **Migrate Data from Google Sheets** (Optional)
   ```bash
   # Run setup to check configuration
   node setup-migration.js
   
   # Export your Google Sheets data as CSV
   # Place main.csv and projects.csv in the data/ directory
   
   # Run migration
   node migrate-from-csv.js
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### Firebase Setup
1. Create a Firebase project
2. Enable Firestore Database
3. Enable Firebase Storage
4. Update the configuration in `src/firebase/index.js`

### Database Collections
The application uses the following Firestore collections:
- `profiles`: User profile data
- `loans`: Loan records
- `grants`: Grant records
- `payments`: Payment history
- `system_logs`: System operation logs

## 📊 Data Migration

### From Google Sheets to Firebase

If you have existing data in Google Sheets, you can migrate it to Firebase:

1. **Export Data from Google Sheets**:
   - Go to your Google Sheets
   - Export the "Main" sheet as CSV: `File → Download → CSV`
   - Save as `data/main.csv`
   - If you have a "Projects" sheet, export it as `data/projects.csv`

2. **Run Migration Setup**:
   ```bash
   node setup-migration.js
   ```

3. **Install Migration Dependencies**:
   ```bash
   npm install
   ```

4. **Run Migration**:
   ```bash
   node migrate-from-csv.js
   ```

### Migration Features
- ✅ Automatic Firebase configuration detection
- ✅ Profile data migration with all fields
- ✅ Projects data migration (if available)
- ✅ District mappings and codes
- ✅ Arms data linking
- ✅ Error handling and progress tracking
- ✅ Data validation and cleanup

### Migration Files
- `migrate-from-csv.js`: Main migration script
- `setup-migration.js`: Setup and configuration checker
- `MIGRATION_GUIDE.md`: Detailed migration instructions

## 📊 Database Schema

### Profile Structure
```javascript
{
  id: "REGID", // Registration ID (e.g., "COL001")
  basicInfo: {
    name: "string",
    age: "number",
    district: "string",
    phone: "string",
    address: "string",
    nic: "string",
    totalChildren: "number",
    schoolKids: "number"
  },
  loans: [{
    id: "string",
    type: "RF|GRANT|GIF",
    amount: "number",
    purpose: "string",
    date: "Date",
    status: "active|completed",
    paidAmount: "number"
  }],
  grants: [{
    id: "string",
    amount: "number",
    purpose: "string",
    date: "Date"
  }],
  paymentHistory: [{
    id: "string",
    type: "RF|GRANT",
    amount: "number",
    details: "string",
    date: "Date"
  }],
  arms: ["string"], // Project names
  imageUrl: "string",
  meta: {
    createdAt: "Timestamp",
    updatedAt: "Timestamp"
  }
}
```

## 🎯 Usage

### Main Features

1. **Profile Viewing**
   - Browse all profiles with filtering by district, type, and year
   - Click on profile cards to view detailed information
   - Use the analytics dashboard for insights

2. **Loan Initialization**
   - Navigate to `/loan-init`
   - Choose between registered or new user
   - Fill in loan details and upload profile image
   - Submit to create new loan or add to existing profile

3. **Payment Processing**
   - Navigate to `/payment`
   - Enter RegID and payment details
   - Process RF loan payments or Grant "Give It Forward" entries
   - View profile preview during payment entry

4. **Analytics Dashboard**
   - View real-time statistics
   - District distribution charts
   - Yearly growth analysis
   - Detailed breakdown tables

5. **Developer Tools**
   - Triple-click the logo to access developer mode
   - View raw Firebase data
   - Access system logs
   - Data manipulation capabilities

### Admin Features
- Data export/import functionality
- System log management
- Backup operations
- Quick access to forms and analytics

## 🔒 Security

- Firebase Security Rules for data protection
- Input validation on all forms
- Error handling and logging
- User authentication (to be implemented)

## 🚀 Deployment

### Firebase Hosting
1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy to Firebase:
   ```bash
   firebase deploy
   ```

### Environment Variables
Create a `.env` file for environment-specific configuration:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_PROJECT_ID=your_project_id
```

## 📝 API Reference

### Database Operations
- `getAllProfiles(filters)`: Get profiles with optional filtering
- `getProfileByRegId(regId)`: Get single profile
- `createProfile(profileData)`: Create new profile
- `updateProfile(regId, updates)`: Update existing profile
- `addLoan(regId, loanData)`: Add loan to profile
- `processPayment(paymentData)`: Process payment

### Storage Operations
- `uploadImage(file, regId)`: Upload and process image
- `processImage(file)`: Convert HEIC and compress images
- `deleteImage(imageUrl)`: Delete image from storage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Migration from Google Sheets

This application is designed to replace the existing Google Sheets/Apps Script solution. Key migration points:

1. **Data Structure**: Maintains the same data structure as the original system
2. **Functionality**: Replicates all existing features
3. **Validation**: Same validation logic as the original code.gs
4. **Image Handling**: Maintains Google Drive integration
5. **District Mapping**: Preserves existing district code system

## 🎨 Styling

The application maintains the exact same color scheme and styling as the original `index.html`:
- Primary color: `#1565c0`
- Secondary colors: `#e3f2fd`, `#ffebee`, `#e8f5e9`
- Font: Poppins
- Responsive design with mobile breakpoints 