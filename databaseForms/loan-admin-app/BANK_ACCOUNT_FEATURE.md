# Bank Account Management Feature

## Overview

The Bank Account Management feature allows administrators to manage bank account balances and transfer money between accounts. This feature is integrated into the Admin Dashboard.

## Features

### 1. Bank Account Status Overview
- **Location**: Admin Dashboard - Fourth stats card
- **Display**: Shows total number of bank accounts and current wereSL balance
- **Action**: Click to open bank account management modal

### 2. wereSL Account Balance Management
- **Purpose**: Update the wereSL account balance directly
- **Features**:
  - Display current wereSL balance
  - Editable input field for new balance
  - Validation for positive amounts
  - Real-time balance updates

### 3. Inter-Account Money Transfer
- **Purpose**: Transfer money between different bank accounts
- **Features**:
  - Dropdown selection for source and destination accounts
  - Amount input with validation
  - Real-time balance checking
  - Prevention of transfers to same account
  - Insufficient balance validation

### 4. Account Balances Overview
- **Purpose**: View all account balances in one place
- **Display**: List of all accounts with their current balances

## Technical Implementation

### Database Functions (`src/utils/dbUtils.js`)

#### `getAllBankAccounts()`
- Fetches all bank accounts from the `bank_accounts` collection
- Returns account data with balances and metadata

#### `getBankBalanceByName(name)`
- Gets balance for a specific bank account
- Returns account details including balance, name, and position

#### `updateBankBalance(name, newAmount)`
- Updates the balance of a specific bank account
- Validates amount and updates timestamp

#### `transferMoneyBetweenAccounts(fromAccount, toAccount, amount)`
- Transfers money between two accounts using batch operations
- Validates sufficient balance and prevents same-account transfers
- Updates both accounts atomically

### Service Layer (`src/services/dbService.js`)

The service layer wraps the database functions with additional logging and error handling:

- `getAllBankAccounts()`
- `getBankBalanceByName(name)`
- `updateBankBalance(name, newAmount)`
- `transferMoneyBetweenAccounts(fromAccount, toAccount, amount)`

### UI Components (`src/pages/AdminDashboard.vue`)

#### Stats Card
- Displays bank account count and wereSL balance
- Clickable to open management modal

#### Bank Account Modal
- **wereSL Balance Section**: Update wereSL account balance
- **Transfer Section**: Transfer money between accounts
- **Overview Section**: Display all account balances

#### Validation Features
- Real-time transfer validation
- Balance sufficiency checking
- Same-account transfer prevention
- Positive amount validation

## Database Schema

### Bank Accounts Collection (`bank_accounts`)
```javascript
{
  firstName: string,
  lastName: string,
  phoneNumber: string,
  nic: string,
  signatureDriveId: string,
  position: string,
  currentBankBalance: number,
  createdAt: timestamp,
  lastUpdated: timestamp
}
```

## Usage Instructions

### For Administrators

1. **Access Bank Management**:
   - Open the Admin Dashboard
   - Click on the "Bank Accounts" stats card

2. **Update wereSL Balance**:
   - Enter new balance in the input field
   - Click "Update Balance"
   - Confirm the change

3. **Transfer Money**:
   - Select source account from dropdown
   - Select destination account from dropdown
   - Enter transfer amount
   - Review validation message
   - Click "Transfer Money"

### Validation Rules

- **wereSL Balance**: Must be a positive number
- **Transfer Amount**: Must be positive and not exceed source account balance
- **Account Selection**: Cannot transfer to the same account
- **Balance Check**: Source account must have sufficient funds

## Error Handling

The system provides comprehensive error handling:

- **Invalid Amounts**: Clear error messages for invalid inputs
- **Insufficient Balance**: Detailed balance information
- **Account Not Found**: Clear error messages for missing accounts
- **Network Errors**: Graceful handling of connection issues

## Security Considerations

- All operations use Firebase batch operations for atomicity
- Input validation on both client and server side
- Timestamp tracking for audit trails
- Error logging for debugging

## Future Enhancements

Potential improvements for future versions:

1. **Transaction History**: Track all transfers and balance changes
2. **Audit Logs**: Detailed logging of all bank operations
3. **Role-based Access**: Different permissions for different admin levels
4. **Bulk Operations**: Transfer to multiple accounts at once
5. **Export Features**: Export account balances and transaction history

## Testing

Use the provided test script to verify functionality:

```bash
node test-bank-accounts.js
```

This will test all bank account management functions and provide detailed output. 