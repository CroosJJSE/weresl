# GAS (Google Apps Script) Integration Guide

This document provides comprehensive guidance for the GAS Firebase integration system that handles email notifications and Google Sheets data management.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Setup Instructions](#setup-instructions)
4. [Configuration](#configuration)
5. [Usage Examples](#usage-examples)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)
8. [API Reference](#api-reference)

## 🎯 Overview

The GAS integration system provides:

- **Email Notifications**: Automatic email alerts for loan approvals and payment requests
- **Google Sheets Integration**: Real-time data synchronization with multiple tabs
- **Data Parceling**: Robust data transfer between web apps and GAS
- **Activity Logging**: Comprehensive audit trail of all operations

### Key Features

- ✅ **Email Notifications**: New loan approvals and payment requests
- ✅ **Sheet Management**: Main, RF_return, and Loan_initiation tabs
- ✅ **Data Validation**: Robust error handling and validation
- ✅ **Activity Logging**: Complete audit trail
- ✅ **Test Suite**: Comprehensive testing framework

## 🏗️ Architecture

### File Structure

```
drive-upload-demo/
├── src/
│   ├── enums/
│   │   ├── db.js          # Database enums
│   │   └── sheets.js      # Sheet integration enums
│   └── utils/
│       ├── gasUtils.js     # GAS integration utilities
│       ├── gasTestUtils.js # Test utilities
│       └── driveUtils.js   # Drive utilities
├── google-apps-script/
│   └── code.gs            # GAS script
├── test-gas-integration.html # Test runner
└── GAS_INTEGRATION_README.md # This file
```

### Data Flow

1. **Web App** → **GAS Utils** → **GAS Script** → **Google Sheets**
2. **GAS Script** → **Email Service** → **Admin Email**
3. **GAS Script** → **Activity Log** → **System Log Sheet**

## ⚙️ Setup Instructions

### 1. Google Apps Script Setup

1. **Create GAS Project**:
   - Go to [Google Apps Script](https://script.google.com/)
   - Create a new project
   - Copy the content from `google-apps-script/code.gs`

2. **Deploy as Web App**:
   - Click "Deploy" → "New deployment"
   - Choose "Web app"
   - Set access to "Anyone"
   - Copy the deployment URL

3. **Configure Settings**:
   - Update `CONFIG` object in `code.gs`
   - Set your Google Sheet ID
   - Set admin email address

### 2. Google Sheets Setup

1. **Create/Open Google Sheet**:
   - Create a new Google Sheet or use existing one
   - Copy the Sheet ID from the URL

2. **Run Setup Function**:
   - In GAS editor, run `setupSheet()` function
   - This creates all required tabs automatically

### 3. Web App Integration

1. **Update GAS URL**:
   - In `src/utils/gasUtils.js`, update `GAS_WEB_APP_URL`
   - Replace `YOUR_SCRIPT_ID` with actual deployment ID

2. **Test Connection**:
   - Open `test-gas-integration.html` in browser
   - Run connection test

## 🔧 Configuration

### GAS Script Configuration

```javascript
const CONFIG = {
  // Google Drive folder for images
  DRIVE_FOLDER_ID: '1BmH6p-1PCEqnqXHh9OZcc5Q3nEN01FWl',
  
  // Google Sheet ID
  SHEET_ID: '1mMLe8sa5gkBt-1n7G8-kg3TYP7ymGBhMG5WzM29mVJw',
  
  // Admin email for notifications
  ADMIN_EMAIL: 'projectsweresl@gmail.com',
  
  // Authentication token
  AUTH_TOKEN: 'test-token'
};
```

### Sheet Tab Structure

#### Main Tab
- Reg_ID, District, Name, Age, Address, NIC, contact, Background_Description, Occupation, RF loan, Grant

#### RF_return Tab
- Timestamp, RegID, Name, Amount_Deposited, Receipt

#### Loan_initiation Tab
- Timestamp, RegID, Name, Age, NIC, Phone number, District, Address, Description, Industry, Loan_type, Amount, Purpose

## 📝 Usage Examples

### 1. Send Email Notification

```javascript
import { sendNewLoanApprovalNotification } from './src/utils/gasUtils.js'

const loanData = {
  type: 'RF',
  amount: 50000,
  purpose: 'Business expansion'
}

const profile = {
  Reg_ID: 'COL001',
  fullName: 'John Doe',
  district: 'Colombo'
}

await sendNewLoanApprovalNotification(loanData, profile)
```

### 2. Update Sheet Row

```javascript
import { updateMainTabRow } from './src/utils/gasUtils.js'

const profile = {
  Reg_ID: 'COL001',
  fullName: 'John Doe',
  district: 'Colombo',
  // ... other fields
}

await updateMainTabRow(profile)
```

### 3. Add Loan Record

```javascript
import { addLoanInitiationRecord } from './src/utils/gasUtils.js'

const loanData = {
  type: 'RF',
  amount: 50000,
  purpose: 'Business expansion'
}

const profile = {
  Reg_ID: 'COL001',
  fullName: 'John Doe',
  // ... other fields
}

await addLoanInitiationRecord(loanData, profile)
```

### 4. Log Activity

```javascript
import { logActivity } from './src/utils/gasUtils.js'

await logActivity('Profile updated', {
  regId: 'COL001',
  changes: ['name', 'phone'],
  timestamp: new Date().toISOString()
})
```

## 🧪 Testing

### 1. Test Runner

Open `test-gas-integration.html` in your browser to run comprehensive tests:

- Connection tests
- Email notification tests
- Sheet operation tests
- Data preparation tests
- Activity logging tests

### 2. Individual Tests

```javascript
import { 
  testGASConnection,
  testEmailNotifications,
  testSheetOperations,
  runComprehensiveTestSuite
} from './src/utils/gasTestUtils.js'

// Test connection
const connectionResult = await testGASConnection()

// Test email notifications
const emailResults = await testEmailNotifications()

// Run all tests
const comprehensiveResults = await runComprehensiveTestSuite()
```

### 3. Test Data Generation

```javascript
import { 
  generateTestProfile,
  generateTestLoanData,
  generateTestReturnRecord
} from './src/utils/gasTestUtils.js'

const testProfile = generateTestProfile()
const testLoanData = generateTestLoanData()
const testReturnRecord = generateTestReturnRecord()
```

## 🔍 Troubleshooting

### Common Issues

#### 1. CORS Errors
**Problem**: Browser blocks requests to GAS
**Solution**: 
- Ensure GAS is deployed as web app
- Set access to "Anyone"
- Check CORS headers in GAS script

#### 2. Authentication Errors
**Problem**: Invalid token errors
**Solution**:
- Verify `AUTH_TOKEN` matches in both web app and GAS
- Check token in request parameters

#### 3. Sheet Not Found
**Problem**: Sheet tabs don't exist
**Solution**:
- Run `setupSheet()` function in GAS
- Verify Sheet ID is correct
- Check sheet permissions

#### 4. Email Not Sending
**Problem**: Email notifications not working
**Solution**:
- Verify admin email address
- Check GAS email quotas
- Ensure MailApp permissions

### Debug Steps

1. **Check GAS Logs**:
   - Open GAS editor
   - View execution logs
   - Check for errors

2. **Test Connection**:
   - Use test runner
   - Verify GAS URL
   - Check network connectivity

3. **Validate Data**:
   - Check data structure
   - Verify required fields
   - Test with sample data

## 📚 API Reference

### GAS Utils Functions

#### `sendDataParcelToGAS(dataParcel)`
Sends data parcel to GAS for processing.

**Parameters**:
- `dataParcel.action`: Action type (updateSheetRow, createSheetRow, etc.)
- `dataParcel.tabName`: Target sheet tab name
- `dataParcel.regId`: Registration ID
- `dataParcel.data`: Data to be processed
- `dataParcel.source`: Source application

**Returns**: Promise<Object>

#### `sendNewLoanApprovalNotification(loanData, profile)`
Sends email notification for new loan approval.

**Parameters**:
- `loanData`: Loan information object
- `profile`: Profile information object

**Returns**: Promise<Object>

#### `sendPaymentApprovalNotification(paymentData, profile)`
Sends email notification for payment approval.

**Parameters**:
- `paymentData`: Payment information object
- `profile`: Profile information object

**Returns**: Promise<Object>

#### `updateMainTabRow(profile)`
Updates main tab row with profile data.

**Parameters**:
- `profile`: Profile data object

**Returns**: Promise<Object>

#### `addLoanInitiationRecord(loanData, profile)`
Adds loan initiation record to sheet.

**Parameters**:
- `loanData`: Loan data object
- `profile`: Profile data object

**Returns**: Promise<Object>

#### `addRFReturnRecord(returnRecord, profile)`
Adds RF return record to sheet.

**Parameters**:
- `returnRecord`: Return record data object
- `profile`: Profile data object

**Returns**: Promise<Object>

#### `logActivity(activity, data)`
Logs activity to GAS.

**Parameters**:
- `activity`: Activity description string
- `data`: Additional data object

**Returns**: Promise<Object>

### GAS Script Functions

#### `doPost(e)`
Main handler for POST requests.

#### `handleUpdateSheetRow(params)`
Handles sheet row updates.

#### `handleCreateSheetRow(params)`
Handles sheet row creation.

#### `handleSendEmail(params)`
Handles email sending.

#### `handleLogActivity(params)`
Handles activity logging.

#### `updateSheetRow(tabName, regId, data)`
Updates existing sheet row.

#### `createSheetRow(tabName, regId, data)`
Creates new sheet row.

#### `sendEmailNotification(subject, body, emailType)`
Sends email notification.

#### `logActivity(activity, data)`
Logs activity to sheet.

## 🔐 Security Considerations

1. **Authentication**: Use secure tokens for API access
2. **Data Validation**: Validate all input data
3. **Error Handling**: Don't expose sensitive information in errors
4. **Rate Limiting**: Implement rate limiting for API calls
5. **Logging**: Log all activities for audit purposes

## 📈 Performance Optimization

1. **Batch Operations**: Group multiple operations when possible
2. **Caching**: Cache frequently accessed data
3. **Error Recovery**: Implement retry mechanisms
4. **Monitoring**: Monitor API usage and performance

## 🚀 Deployment Checklist

- [ ] GAS script deployed as web app
- [ ] Google Sheet created and configured
- [ ] Admin email address set
- [ ] GAS URL updated in web app
- [ ] Authentication token configured
- [ ] Test suite passed
- [ ] Email notifications working
- [ ] Sheet operations working
- [ ] Activity logging working

## 📞 Support

For issues and questions:

1. Check the troubleshooting section
2. Review GAS execution logs
3. Test with the provided test suite
4. Verify configuration settings

---

**Last Updated**: December 2024
**Version**: 1.0.0 