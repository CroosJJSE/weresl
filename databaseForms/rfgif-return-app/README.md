# RF & GIF Return Web App

A comprehensive web application for recording RF (Revolving Fund) repayments and GIF (Give It Forward) returns for the WERESL organization.

## 🌟 Features

### 🔍 Profile Search
- Search by NIC or Reg_ID to find existing profiles
- Display profile information including name, district, contact details
- Show profile image if available

### 💰 RF (Revolving Fund) Repayment
- **Smart Repayment Logic**: Automatically applies payments to oldest loans first
- **Bill Upload**: Upload payment receipts (images/PDFs) to Cloudinary
- **Balance Tracking**: Real-time updates to loan balances
- **Payment History**: Complete audit trail of all repayments
- **Integrity Check**: Automatic verification of payment accuracy

### 🎁 GIF (Give It Forward) Returns
- **Description Entry**: Record what beneficiaries are giving forward
- **Return Tracking**: Mark profiles as having completed GIF returns
- **Timestamp Logging**: Track when GIF returns were made

### 🌐 Multi-Language Support
- **English**: Primary language
- **Tamil**: Full translation support
- **Sinhala**: Full translation support
- **Language Toggle**: Easy switching between languages

## 🏗️ Technical Architecture

### Frontend
- **Vue 3**: Modern reactive framework
- **Vite**: Fast build tool
- **Tailwind CSS**: Utility-first styling
- **Vue Router**: Client-side routing

### Backend
- **Firebase Firestore**: NoSQL database
- **Firebase Storage**: File storage (via Cloudinary)
- **Cloudinary**: Image/PDF upload service

### Key Components
- `RFGIFReturnForm.vue`: Main form component
- `LanguageToggle.vue`: Language switching component
- `db.js`: Firebase database operations
- `imageService.js`: File upload handling
- `i18n.ts`: Internationalization system

## 📊 Database Schema

### Profile Document
```javascript
{
  Reg_ID: "string",
  Name: "string",
  NIC: "string",
  District: "string",
  contact: "string",
  // RF Return fields
  RF_return_history: {
    [timestamp]: {
      amount: number,
      billUrl: string
    }
  },
  RF_payment_history_integrity: boolean,
  // GIF Return fields
  GIF: {
    [timestamp]: "description"
  },
  Grant_return: boolean
}
```

### RF_Loans Subcollection
```javascript
{
  purpose: "string",
  amount: number,
  currentBalance: number,
  status: "active" | "completed",
  initiationDate: timestamp,
  lastUpdated: timestamp
}
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Firebase project configured
- Cloudinary account

### 1. Clone and Install
```bash
cd databaseForms/rfgif-return-app
npm install
```

### 2. Firebase Configuration
Create `firebase-config.js` in the root directory:
```javascript
export default {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
}
```

### 3. Cloudinary Setup
The app uses Cloudinary for bill uploads. Configuration is in `src/services/imageService.js`:
```javascript
const CLOUDINARY_CLOUD_NAME = 'your-cloud-name';
const CLOUDINARY_UPLOAD_PRESET = 'your-upload-preset';
```

### 4. Run Development Server
```bash
npm run dev
```

### 5. Build for Production
```bash
npm run build
```

## 🔧 Core Features Explained

### RF Repayment Algorithm
The app implements a sophisticated repayment algorithm:

1. **Sort by Date**: Loans are sorted by initiation date (oldest first)
2. **Sequential Payment**: Payment is applied to each loan in order
3. **Full vs Partial**: 
   - If payment ≥ loan balance: Mark as completed
   - If payment < loan balance: Reduce balance
4. **Integrity Check**: 
   ```
   Sum(Return History) + Sum(Current Balances) = Sum(Original Loan Amounts)
   ```

### GIF Return Process
1. **Search Profile**: Find user by NIC or Reg_ID
2. **Enter Description**: Describe what they're giving forward
3. **Record Return**: Add to GIF map with timestamp
4. **Mark Complete**: Set Grant_return = true

## 🎨 UI/UX Features

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interface

### Visual Feedback
- Loading states during operations
- Success/error messages
- Real-time form validation
- Bill preview functionality

### Accessibility
- Keyboard navigation support
- Screen reader compatibility
- High contrast color scheme
- Clear visual hierarchy

## 🔒 Security Considerations

### Data Validation
- Input sanitization
- File type validation
- File size limits (5MB max)
- Server-side validation

### Firebase Security Rules
Ensure your Firestore rules allow:
- Read access to profiles
- Write access for RF/GIF updates
- Subcollection access for loans

## 📈 Monitoring & Analytics

### Error Tracking
- Console logging for debugging
- User-friendly error messages
- Graceful fallbacks

### Performance
- Lazy loading of components
- Optimized image delivery
- Efficient database queries

## 🚀 Deployment

### Firebase Hosting
```bash
npm run build
firebase deploy
```

### Environment Variables
Set up environment variables for:
- Firebase configuration
- Cloudinary credentials
- API endpoints

## 🤝 Contributing

### Code Style
- Vue 3 Composition API
- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting

### Testing
- Unit tests for utilities
- Integration tests for forms
- E2E tests for workflows

## 📝 License

MIT License - see LICENSE file for details

## 🆘 Support

For technical support or feature requests, please contact the WERESL development team.

---

**Built with ❤️ for WERESL** 