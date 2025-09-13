# WERESL CSV Migration Guide

This guide explains how to migrate data from CSV to the WERESL Firestore database.

## 🎯 Overview

The migration process handles the following data transformations:

1. **Age → Birth Year**: Converts age to birth year for `ProfileField.YEAR_OF_BIRTH`
2. **Image URLs**: Extracts Google Drive file IDs from image URLs using `extractFileId()`
3. **RF Loans**: Parses loan data from multiple columns into structured loan records
4. **Grant Loans**: Parses grant data and handles remaining amounts
5. **RF Return History**: Converts payment history to structured format
6. **GIF Data**: Copies GIFor data to `ProfileField.GIF`

## 📋 Prerequisites

1. **Node.js** installed (version 16 or higher)
2. **CSV file** with the required columns
3. **Firebase project** configured
4. **Access to the codebase** with utils and enums

## 📊 CSV Format Requirements

Your CSV should have the following columns (in any order):

```csv
Reg_ID,District,Name,Age,Address,NIC,contact,total children,School kids,others,Description,Occupation,RF_Loan,RF_Paid_History,RF_Cur_Prj,Com_prjs,Image,GRANT,GIFor,GRANT_Cur_Prj
```

### Column Descriptions

| Column | Description | Example | Required |
|--------|-------------|---------|----------|
| `Reg_ID` | Registration ID | `MAN001` | ✅ |
| `District` | District name | `Matara` | ✅ |
| `Name` | Full name | `John Doe` | ✅ |
| `Age` | Age in years | `35` | ✅ |
| `Address` | Full address | `123 Main St, Matara` | ✅ |
| `NIC` | National ID | `123456789V` | ✅ |
| `contact` | Phone number | `0771234567` | ✅ |
| `total children` | Total children | `3` | ✅ |
| `School kids` | School-going children | `2` | ✅ |
| `others` | Other dependents | `1` | ✅ |
| `Description` | Description | `Farmer` | ✅ |
| `Occupation` | Occupation | `Agriculture` | ✅ |
| `RF_Loan` | RF loan history | `Cow [10-04-2022](100000) + Shed [20-05-2023](50000)` | ❌ |
| `RF_Paid_History` | Payment history | `50000 - 15-06-2022, 25000 - 20-07-2022` | ❌ |
| `RF_Cur_Prj` | Current RF projects | `Cow (50000)` | ❌ |
| `Com_prjs` | Completed projects | `Shed (50000)` | ❌ |
| `Image` | Google Drive image URL | `https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view` | ❌ |
| `GRANT` | Total grant amount | `267000` | ❌ |
| `GIFor` | Give It Forward | `Helped neighbor with farming` | ❌ |
| `GRANT_Cur_Prj` | Current grant projects | `Cow (100000) [10-04-2022] + Cow Shed (167000) [20-05-2025]` | ❌ |

## 🚀 Migration Steps

### Step 1: Prepare Your CSV File

1. **Export from Google Sheets**:
   - Open your Google Sheet
   - Go to `File → Download → CSV`
   - Save the file as `data.csv` in your project root

2. **Verify CSV Format**:
   - Ensure all required columns are present
   - Check that data is properly formatted
   - Remove any empty rows

### Step 2: Test Migration Logic

Before running the actual migration, test the logic:

```bash
node test-migration-logic.js
```

This will validate:
- ✅ Birth year calculation
- ✅ Image URL parsing
- ✅ RF loan parsing
- ✅ Grant loan parsing
- ✅ Return history parsing
- ✅ Complete record processing

### Step 3: Run Migration

Execute the migration script:

```bash
node migrate-csv-data.js data.csv
```

**Example Output:**
```
🚀 Starting CSV to Firestore migration...
📊 Found 150 records to migrate
🔄 Processing batch 1/3...
📝 Processing record: MAN001
  ✅ Profile saved: MAN001
  ✅ RF loan saved for: MAN001
  ✅ GRANT loan saved for: MAN001
✅ Successfully processed: MAN001
...
✅ Migration completed!
📈 Processed: 150 records
❌ Errors: 0 records
```

## 🔧 Data Processing Details

### 1. Age to Birth Year Conversion

```javascript
function calculateBirthYear(age) {
  if (!age || isNaN(age)) return null
  const currentYear = new Date().getFullYear()
  return currentYear - parseInt(age)
}
```

### 2. Image URL Processing

Extracts Google Drive file IDs from various URL formats:

- `https://drive.google.com/file/d/FILE_ID/view`
- `https://drive.google.com/open?id=FILE_ID`
- `https://docs.google.com/document/d/FILE_ID/edit`
- Direct file ID: `FILE_ID`

### 3. RF Loan Parsing

Parses three columns to create structured loan records:

#### RF_Loan Column Format
```
purpose1 [date1](amount1) + purpose2 [date2](amount2)
```

#### RF_Cur_Prj Column Format
```
purpose1 (current_balance)
```

#### Com_prjs Column Format
```
purpose2 (amount2)
```

### 4. Grant Loan Parsing

#### GRANT_Cur_Prj Column Format
```
Cow (100,000) [10-04-2022] + Cow Shed (167,000) [20-05-2025]
```

**Note**: If the sum of amounts in `GRANT_Cur_Prj` doesn't equal the `GRANT` column, an additional grant record is created for the remaining amount.

### 5. RF Return History Parsing

#### RF_Paid_History Column Format
```
amount1 - date1, amount2 - date2
```

## 🗄️ Database Structure

### Profile Document
```javascript
{
  Reg_ID: "MAN001",
  fullName: "John Doe",
  district: "Matara",
  yearOfBirth: 1988,
  address: "123 Main St, Matara",
  nic: "123456789V",
  phoneNumber: "0771234567",
  totalChildren: 3,
  schoolGoingChildren: 2,
  otherDependents: 1,
  description: "Farmer",
  occupation: "Agriculture",
  profileImageDriveId: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
  GIF: ["Helped neighbor with farming"],
  RF_return_history: [
    {
      timestamp: "2022-06-15T00:00:00.000Z",
      returnedAmount: 50000
    }
  ],
  createdAt: "2024-01-01T00:00:00.000Z",
  lastUpdated: "2024-01-01T00:00:00.000Z"
}
```

### RF Loan Document
```javascript
{
  purpose: "Cow",
  amount: 100000,
  approvedAt: "2022-04-10T00:00:00.000Z",
  createdAt: "2022-04-10T00:00:00.000Z",
  initiationDate: "2022-04-10T00:00:00.000Z",
  status: "active",
  type: "RF",
  lastUpdated: "2024-01-01T00:00:00.000Z"
}
```

### Grant Loan Document
```javascript
{
  purpose: "Cow",
  approvedAmount: 100000,
  approvedAt: "2022-04-10T00:00:00.000Z",
  createdAt: "2022-04-10T00:00:00.000Z",
  requestedDate: "2022-04-10T00:00:00.000Z",
  status: "active",
  type: "GRANT",
  lastUpdated: "2024-01-01T00:00:00.000Z"
}
```

## ⚠️ Error Handling

The migration script includes comprehensive error handling:

- **Missing Reg_ID**: Records without Reg_ID are skipped
- **Invalid data**: Invalid data is logged but doesn't stop the migration
- **Batch processing**: Records are processed in batches to avoid timeouts
- **Rate limiting**: Delays between batches to avoid API limits

## 🔍 Troubleshooting

### Common Issues

1. **CSV not found**: Ensure the CSV file path is correct
2. **Invalid column names**: Check that column names match exactly
3. **Firebase connection**: Ensure Firebase is properly configured
4. **Permission errors**: Check Firebase security rules

### Debug Mode

To enable debug logging, modify the script to include more detailed console output:

```javascript
const DEBUG = true

if (DEBUG) {
  console.log('Processing record:', record)
}
```

## ✅ Validation

After migration, validate the data:

1. **Check profile count**: Ensure all profiles were created
2. **Verify loan data**: Check that loans were created correctly
3. **Test image display**: Verify images load properly
4. **Review error logs**: Check for any processing errors

## 📁 Files

- `migrate-csv-data.js` - Main migration script
- `test-migration-logic.js` - Test script for validation
- `MIGRATION_GUIDE.md` - This documentation

## 🆘 Support

If you encounter issues:

1. Check the console output for error messages
2. Verify your data format matches the requirements
3. Ensure Firebase is properly configured
4. Review the error logs for specific issues

## 🎯 Next Steps

1. **Run the test script** to validate your data format
2. **Execute the migration** with your CSV file
3. **Verify the results** in your Firebase console
4. **Test the application** to ensure data is working correctly

## 📞 Contact

For additional support or questions about the migration process, please refer to the project documentation or contact the development team. 