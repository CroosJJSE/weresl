# WERESL Database Test Profile Cleanup

This script safely removes test profiles from the WERESL database using Firebase Firestore operations.

## Features

- 🔍 **Smart Detection**: Automatically identifies test profiles based on common patterns
- 🛡️ **Safe Deletion**: Handles all subcollections and related data
- 📊 **Detailed Reporting**: Shows what will be deleted before proceeding
- 🔄 **Dry Run Mode**: Preview what would be deleted without actually deleting
- ⚡ **Batch Processing**: Handles multiple profiles efficiently

## Test Profile Detection

The script identifies test profiles based on:

### Registration ID Patterns
- Contains: `test`, `demo`, `sample`, `example`, `temp`, `temporary`, `dummy`, `fake`, `mock`

### Name Patterns
- Contains: `test user`, `demo user`, `sample user`, `example user`, `john doe`, `jane doe`
- Exact matches: `test`, `demo`, `sample`

### Description Patterns
- Contains any test indicator words in the description field

## Usage

### Prerequisites

1. Install dependencies:
```bash
npm install
```

2. Ensure you have access to the Firebase project

### Commands

#### 1. Dry Run (Recommended First)
```bash
npm run cleanup:dry-run
# or
node clear-test-profiles-standalone.js --dry-run
```

This shows what would be deleted without actually deleting anything.

#### 2. Interactive Mode (Default)
```bash
npm run cleanup:interactive
# or
node clear-test-profiles-standalone.js
```

Shows the test profiles and asks for confirmation.

#### 3. Direct Deletion (Use with Caution)
```bash
npm run cleanup:confirm
# or
node clear-test-profiles-standalone.js --confirm
```

Directly deletes all identified test profiles.

#### 4. Help
```bash
npm run cleanup:help
# or
node clear-test-profiles-standalone.js --help
```

Shows usage information.

## Example Output

```
🧹 Starting test profile cleanup...
🔍 DRY RUN MODE - No profiles will be deleted
🔍 Searching for test profiles...
📊 Found 319 total profiles
🧪 Found 6 test profiles

📋 Test profiles found:
1. MAN010 - subitson croos
2. MAN009 - subitson croos
3. MAN008 - subitson croos
4. MAN007 - subitson croos
5. MAN006 - subitson croos
6. MAN005 - subitson croos

🔍 DRY RUN: Would delete 6 test profiles
```

## What Gets Deleted

The script safely deletes:

1. **RF Loans**: Removes all documents in `profiles/{regId}/RF_Loans`
2. **Grant Loans**: Removes all documents in `profiles/{regId}/Grant`
3. **Profile**: Removes the main profile document
4. **Search Elements**: Removes entries from `SearchElements/pending-loan` and `SearchElements/NIC_data`

## Safety Features

- ✅ **Dry run mode** to preview changes
- ✅ **Confirmation prompts** before deletion
- ✅ **Detailed logging** of all operations
- ✅ **Error handling** for failed deletions
- ✅ **Batch processing** with delays to avoid overwhelming the database
- ✅ **Comprehensive cleanup** of all related data

## Customization

You can modify the test profile detection by editing the arrays in `clear-test-profiles-standalone.js`:

```javascript
const TEST_PROFILE_INDICATORS = [
  'test', 'demo', 'sample', 'example', 'temp', 'temporary', 'dummy', 'fake', 'mock'
]

const TEST_NAMES = [
  'test user', 'demo user', 'sample user', 'example user', 'john doe', 'jane doe'
]
```

## Troubleshooting

### Common Issues

1. **Import Errors**: Make sure you're running from the root directory
2. **Firebase Connection**: Check your internet connection and Firebase permissions
3. **Permission Errors**: Ensure you have write access to the Firestore database

### Debug Mode

To see more detailed logs, you can modify the script to add more console.log statements.

## Files

- `clear-test-profiles-standalone.js` - Main cleanup script (working)
- `clear-test-profiles.js` - Original script (requires utils)
- `firebase-config.js` - Firebase configuration
- `package.json` - Dependencies and scripts
- `CLEANUP_README.md` - This documentation

## Notes

- The script uses ES modules, so Node.js version 14+ is required
- All operations are logged for audit purposes
- The script respects the existing database structure
- Test profiles are identified based on common patterns, but you can customize the detection logic
- The standalone version works independently without requiring the utils/enums structure

## Current Status

✅ **Script is working and ready to use**
- Found 6 test profiles in the database
- Dry run mode confirmed working
- Ready for actual deletion when needed 