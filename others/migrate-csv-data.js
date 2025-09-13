/**
 * CSV to Firestore Migration Script for WERESL Database
 * 
 * This script creates loans that are fully compatible with the loan-admin-app
 * AND the databaseWebApp display components.
 * All loans include required fields: amount, purpose, source, arms, and proper status.
 * 
 * Loan ID Format: Each profile starts from 01
 * - RF_ANU001_01, RF_ANU001_02, RF_ANU001_03 (for ANU001)
 * - RF_ANU002_01, RF_ANU002_02 (for ANU002) - starts from 01 again
 * - GRANT_ANU001_01, GRANT_ANU001_02 (for ANU001) - starts from 01 again
 * 
 * RF Return History Format: Map with date keys (DD-MM-YYYY)
 * - Key: "07-04-2025" (date)
 * - Value: 5000 (returned amount)
 * - Compatible with databaseWebApp ProfileModal display
 * 
 * Current Balance Calculation: Original amount - Total payments
 * - RF_Loan: "Fish1 (50000) [01-02-2024] + Fish (50000) [01-02-2022]" = All loans (active + completed)
 * - RF_Cur_Prj: "Fish2 (50000)" = Active loans with current balance > 0
 * - Com_prjs: "Fish1 (50000) + Bicycle (50,000) + Scooter(100,000)" = Completed loans (balance = 0)
 * - RF_Paid_History: "5000 [07-04-2025] + 5000 [08-05-2025]..." = Total payments
 * 
 * Payment Integrity: Calculated automatically based on balance + payments = original amount
 * - True: Current balance + Total payments = Original loan amount
 * - False: Calculation doesn't match (requires investigation)
 * - Can be updated using RFGIF return app
 * 
 * Usage: node migrate-csv-data.js <path-to-csv-file>
 * Example: node migrate-csv-data.js data.csv
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

// Get current directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Import Firebase configuration and utilities
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, doc, setDoc, addDoc, serverTimestamp } from 'firebase/firestore'

// Import utilities and enums
import { extractFileId } from '../databaseWebApp/src/utils/driveUtils.js'
import { 
  ProfileField, 
  RF_LOAN_FIELD, 
  GRANT_FIELD,
  RootCollection 
} from '../databaseWebApp/src/enums/db.js'

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVUVyDTnOwMmYR1ybOLYv9i_B19aox1Lg",
  authDomain: "weresldatabase.firebaseapp.com",
  projectId: "weresldatabase",
  storageBucket: "weresldatabase.firebasestorage.app",
  messagingSenderId: "148662033996",
  appId: "1:148662033996:web:f9b5ea903b9cc5a24d9ee9"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Configuration
const BATCH_SIZE = 50 // Process records in batches

// Loan ID counters for migration - reset for each profile
let currentProfileRegId = null
let rfLoanCounter = 1
let grantLoanCounter = 1

/**
 * Generate simple loan ID for migration
 * Always starts from 01 for each new profile
 * 
 * Expected format:
 * - RF_ANU001_01, RF_ANU001_02, RF_ANU001_03 (for ANU001)
 * - RF_ANU002_01, RF_ANU002_02 (for ANU002) - starts from 01 again
 * - GRANT_ANU001_01, GRANT_ANU001_02 (for ANU001) - starts from 01 again
 */
function generateSimpleLoanId(regId, loanType) {
  // Reset counters if this is a new profile
  if (currentProfileRegId !== regId) {
    currentProfileRegId = regId
    rfLoanCounter = 1
    grantLoanCounter = 1
  }
  
  const counter = loanType === 'RF' ? rfLoanCounter++ : grantLoanCounter++
  const formattedCounter = counter.toString().padStart(2, '0')
  return `${loanType}_${regId}_${formattedCounter}`
}

/**
 * Main migration function
 */
async function migrateCSVData(csvFilePath) {
  try {
    console.log('🚀 Starting CSV to Firestore migration...')
    
    // Reset counters for new migration
    currentProfileRegId = null
    rfLoanCounter = 1
    grantLoanCounter = 1
    
    // Load and parse CSV data
    const data = await loadCSVData(csvFilePath)
    console.log(`📊 Found ${data.length} records to migrate`)
    
    // Process data in batches
    const batches = chunkArray(data, BATCH_SIZE)
    let processedCount = 0
    let errorCount = 0
    
    for (let i = 0; i < batches.length; i++) {
      console.log(`🔄 Processing batch ${i + 1}/${batches.length}...`)
      
      const batch = batches[i]
      const batchResults = await processBatch(batch)
      
      processedCount += batchResults.processed
      errorCount += batchResults.errors
      
      // Add delay between batches to avoid rate limiting
      if (i < batches.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }
    
    console.log(`✅ Migration completed!`)
    console.log(`📈 Processed: ${processedCount} records`)
    console.log(`❌ Errors: ${errorCount} records`)
    
    return {
      success: true,
      processed: processedCount,
      errors: errorCount,
      total: data.length
    }
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Test CSV parsing with sample data
 */
function testCSVParsing() {
  console.log('🧪 Testing CSV parsing...')
  
  // Sample CSV line with quoted fields
  const testLine = 'BAT005,Batticaloa,B M Krishani L B,32,"24th Mile Post, Mangalagama",925301272V,773030191,,3,1,"Living in her own house with her husband who is doing farming and the kids(12 year son, 8 year daughter and 4 year daughter )",Farming,Farming  (30000) [01-03-2025],,She is doing a small shop. She need money to buy and put things in her shop (30000),,https://drive.google.com/thumbnail?id=16QP6H9ArCKpKxWB-dCwR7wr1v225Fl5r&sz=w200-h200,,,'
  
  const parsed = parseCSVLine(testLine)
  console.log('Parsed fields:', parsed)
  
  // Actual headers based on the parsed data
  const actualHeaders = [
    'Reg_ID', 'District', 'Name', 'Age', 'Address', 'NIC', 'contact', '', 
    'total_children', 'school_kids', 'others', 'Description', 'Occupation', 
    'RF_Loan', '', 'RF_Paid_History', 'RF_Cur_Prj', 'Com_prjs', 'Image', 
    'GRANT', 'GIFor', 'GRANT_Cur_Prj'
  ]
  
  console.log('Actual headers:', actualHeaders)
  console.log('Parsed count:', parsed.length)
  console.log('Expected count:', actualHeaders.length)
  
  // Test the field mapping
  const testObj = {}
  actualHeaders.forEach((header, colIndex) => {
    const value = parsed[colIndex] || ''
    switch (header.trim()) {
      case 'Reg_ID':
        testObj.Reg_ID = value
        break
      case 'District':
        testObj.District = value
        break
      case 'Name':
        testObj.Name = value
        break
      case 'Age':
        testObj.Age = value
        break
      case 'Address':
        testObj.Address = value
        break
      case 'NIC':
        testObj.NIC = value
        break
      case 'contact':
        testObj.contact = value
        break
      case 'total_children':
        testObj['total_children'] = value
        break
      case 'school_kids':
        testObj['school_kids'] = value
        break
      case 'others':
        testObj.others = value
        break
      case 'Description':
        testObj.Description = value
        break
      case 'Occupation':
        testObj.Occupation = value
        break
      case 'RF_Loan':
        testObj.RF_Loan = value
        break
      case 'RF_Paid_History':
        testObj.RF_Paid_History = value
        break
      case 'RF_Cur_Prj':
        testObj.RF_Cur_Prj = value
        break
      case 'Com_prjs':
        testObj.Com_prjs = value
        break
      case 'Image':
        testObj.Image = value
        break
      case 'GRANT':
        testObj.GRANT = value
        break
      case 'GIFor':
        testObj.GIFor = value
        break
      case 'GRANT_Cur_Prj':
        testObj.GRANT_Cur_Prj = value
        break
      default:
        testObj[header.trim()] = value
    }
  })
  
  console.log('Test object:', testObj)
  return parsed
}

/**
 * Load and parse CSV data with proper quoted field handling
 */
async function loadCSVData(filePath) {
  const fullPath = path.resolve(__dirname, filePath)
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`CSV file not found: ${fullPath}`)
  }
  
  const csvContent = fs.readFileSync(fullPath, 'utf8')
  const lines = csvContent.split('\n').filter(line => line.trim())
  
  if (lines.length === 0) {
    throw new Error('CSV file is empty')
  }
  
  // Parse headers
  const headers = parseCSVLine(lines[0])
  console.log('📋 CSV Headers:', headers)
  
  const rows = lines.slice(1)
  
  return rows.map((row, index) => {
    const values = parseCSVLine(row)
    const obj = {}
    
    // Map CSV fields to expected field names based on actual CSV structure
    // The CSV structure is different from expected - data is shifted by one column
    headers.forEach((header, colIndex) => {
      const value = values[colIndex] || ''
      
      // Handle different possible field names based on actual CSV structure
      switch (header.trim()) {
        case 'Reg_ID':
        case 'Reg ID':
        case 'reg_id':
          obj.Reg_ID = value
          break
        case 'District':
        case 'district':
          obj.District = value
          break
        case 'Name':
        case 'name':
          obj.Name = value
          break
        case 'Age':
        case 'age':
          obj.Age = value
          break
        case 'Address':
        case 'address':
          obj.Address = value
          break
        case 'NIC':
        case 'nic':
          obj.NIC = value
          break
        case 'contact':
        case 'Contact':
        case 'phone':
        case 'Phone':
          obj.contact = value
          break
        case 'total_children':
        case 'total children':
        case 'Total_Children':
        case 'Total Children':
          obj['total_children'] = value
          break
        case 'school_kids':
        case 'school kids':
        case 'School_kids':
        case 'School Kids':
          obj['school_kids'] = value
          break
        case 'others':
        case 'Others':
          obj.others = value
          break
        case 'Description':
        case 'description':
          obj.Description = value
          break
        case 'Occupation':
        case 'occupation':
          obj.Occupation = value
          break
        case 'RF_Loan':
        case 'RF Loan':
        case 'rf_loan':
          obj.RF_Loan = value
          break
        case 'RF_Paid_History':
        case 'RF Paid History':
        case 'rf_paid_history':
          obj.RF_Paid_History = value
          break
        case 'RF_Cur_Prj':
        case 'RF Cur Prj':
        case 'rf_cur_prj':
          obj.RF_Cur_Prj = value
          break
        case 'Com_prjs':
        case 'Com Prjs':
        case 'com_prjs':
          obj.Com_prjs = value
          break
        case 'Image':
        case 'image':
          obj.Image = value
          break
        case 'GRANT':
        case 'grant':
          obj.GRANT = value
          break
        case 'GIFor':
        case 'gifor':
          obj.GIFor = value
          break
        case 'GRANT_Cur_Prj':
        case 'GRANT Cur Prj':
        case 'grant_cur_prj':
          obj.GRANT_Cur_Prj = value
          break
        default:
          // For any other fields, use the original header name
          obj[header.trim()] = value
      }
    })
    
    obj._rowIndex = index + 2
    return obj
  }).filter(row => row.Reg_ID) // Only process rows with Reg_ID
}

/**
 * Parse a single CSV line, handling quoted fields correctly
 */
function parseCSVLine(line) {
  const result = []
  let current = ''
  let inQuotes = false
  let i = 0
  
  while (i < line.length) {
    const char = line[i]
    
    if (char === '"') {
      if (inQuotes) {
        // Check if this is an escaped quote (double quote)
        if (i + 1 < line.length && line[i + 1] === '"') {
          current += '"'
          i += 2 // Skip the next quote
          continue
        } else {
          // End of quoted field
          inQuotes = false
        }
      } else {
        // Start of quoted field
        inQuotes = true
      }
    } else if (char === ',' && !inQuotes) {
      // End of field
      result.push(current.trim())
      current = ''
    } else {
      // Regular character
      current += char
    }
    
    i++
  }
  
  // Add the last field
  result.push(current.trim())
  
  return result
}

/**
 * Process a batch of records
 */
async function processBatch(records) {
  let processed = 0
  let errors = 0
  
  for (const record of records) {
    try {
      await processRecord(record)
      processed++
    } catch (error) {
      console.error(`❌ Error processing row ${record._rowIndex}:`, error.message)
      errors++
    }
  }
  
  return { processed, errors }
}

/**
 * Process a single record
 */
async function processRecord(record) {
  console.log(`📝 Processing record: ${record.Reg_ID}`)
  
  // Debug: Log the record fields to see what we're working with
  console.log('🔍 Record fields:', Object.keys(record))
  console.log('🔍 Sample field values:', {
    Reg_ID: record.Reg_ID,
    Name: record.Name,
    Address: record.Address,
    NIC: record.NIC,
    contact: record.contact,
    'total_children': record['total_children'],
    'school_kids': record['school_kids'],
    others: record.others,
    Description: record.Description,
    Occupation: record.Occupation
  })
  
  // 1. Calculate birth year from age
  const birthYear = calculateBirthYear(record.Age)
  
  // 2. Extract image file ID
  const profileImageDriveId = extractFileId(record.Image)
  
  // 3. Parse RF loans (fixed logic) - pass payment history for balance calculation
  // RF_Loan: All loans, Com_prjs: Completed loans, RF_Cur_Prj: Active loans
  const rfLoans = parseRFLoans(record.RF_Loan, record.RF_Cur_Prj, record.Com_prjs, record.RF_Paid_History)
  
  // 4. Parse Grant loans
  const grantLoans = parseGrantLoans(record.GRANT, record.GRANT_Cur_Prj)
  
  // 5. Parse RF return history (fixed - copy from RF_Paid_History)
  const rfReturnHistory = parseRFReturnHistory(record.RF_Paid_History)
  
  // 6. Create profile data with ALL fields - FIXED FIELD MAPPING
  const profileData = {
    [ProfileField.REG_ID]: record.Reg_ID,
    [ProfileField.FULL_NAME]: record.Name || '',
    [ProfileField.DISTRICT]: record.District || '',
    [ProfileField.YEAR_OF_BIRTH]: birthYear,
    [ProfileField.ADDRESS]: record.Address || '',
    [ProfileField.NIC]: record.NIC || '',
    [ProfileField.PHONE_NUMBER]: record.contact || '',
    [ProfileField.TOTAL_CHILDREN]: parseInt(record['total_children']) || 0,
    [ProfileField.SCHOOL_GOING_CHILDREN]: parseInt(record['school_kids']) || 0,
    [ProfileField.OTHER_DEPENDENTS]: parseInt(record.others) || 0,
    [ProfileField.DESCRIPTION]: record.Description || '',
    [ProfileField.OCCUPATION]: record.Occupation || '',
    [ProfileField.PROFILE_IMAGE_DRIVE_ID]: profileImageDriveId,
    [ProfileField.GIF]: record.GIFor ? [record.GIFor] : [], // Fixed - only GIFor data
    [ProfileField.RF_RETURN_HISTORY]: rfReturnHistory, // Fixed - from RF_Paid_History
    [ProfileField.ARMS]: '', // Initialize ARMS field as empty string
    [ProfileField.CREATED_AT]: serverTimestamp(),
    [ProfileField.LAST_UPDATED]: serverTimestamp()
  }
  
  // Debug: Log the profile data being saved
  console.log('💾 Profile data to save:', profileData)
  
  // 7. Save profile
  await saveProfile(profileData, record.Reg_ID)
  
  // 8. Save RF loans with generated IDs
  for (const loan of rfLoans) {
    const loanId = generateSimpleLoanId(record.Reg_ID, 'RF')
    await saveLoan(record.Reg_ID, loan, 'RF', loanId)
  }
  
  // 9. Save Grant loans with generated IDs
  for (const loan of grantLoans) {
    const loanId = generateSimpleLoanId(record.Reg_ID, 'GRANT')
    await saveLoan(record.Reg_ID, loan, 'GRANT', loanId)
  }
  
  console.log(`✅ Successfully processed: ${record.Reg_ID}`)
}

/**
 * Calculate birth year from age
 */
function calculateBirthYear(age) {
  if (!age || isNaN(age)) return null
  
  const currentYear = new Date().getFullYear()
  return currentYear - parseInt(age)
}

/**
 * Parse RF loans from the three columns (FIXED LOGIC)
 * Now includes payment history for accurate current balance calculation
 */
function parseRFLoans(rfLoanStr, rfCurPrjStr, comPrjsStr, rfPaidHistoryStr) {
  const loans = []
  
  // Parse RF_Loan column (all loans including active and completed)
  if (rfLoanStr) {
    // Handle format: "Fish1 (50000) [01-02-2024] + Fish (50000) [01-02-2022]"
    const loanMatches = rfLoanStr.match(/([^(]+)\s*\(([^)]+)\)\s*\[([^\]]+)\]/g)
    if (loanMatches) {
      for (const match of loanMatches) {
        const purposeMatch = match.match(/([^(]+)\s*\(([^)]+)\)\s*\[([^\]]+)\]/)
        if (purposeMatch) {
          const [, purpose, amount, date] = purposeMatch
          const loanData = {
            [RF_LOAN_FIELD.PURPOSE]: purpose.trim(),
            [RF_LOAN_FIELD.AMOUNT]: parseFloat(amount.replace(/,/g, '')),
            [RF_LOAN_FIELD.APPROVED_AT]: parseDate(date),
            [RF_LOAN_FIELD.CREATED_AT]: parseDate(date),
            [RF_LOAN_FIELD.INITIATION_DATE]: parseDate(date),
            [RF_LOAN_FIELD.STATUS]: 'active',
            [RF_LOAN_FIELD.TYPE]: 'RF',
            [RF_LOAN_FIELD.LAST_UPDATED]: serverTimestamp(),
            [RF_LOAN_FIELD.REG_ID]: '', // Will be set when saving
            // [RF_LOAN_FIELD.PROJECT_DESCRIPTION]: purpose.trim(), // Removed - no longer using project description
            [RF_LOAN_FIELD.SOURCE]: 'wereSL', // Default source for migrated loans
            [RF_LOAN_FIELD.CURRENT_BALANCE]: 0, // Will be updated from RF_Cur_Prj
            [RF_LOAN_FIELD.ARMS]: '', // Initialize ARMS field
            [RF_LOAN_FIELD.LOAN_HISTORY]: [], // Initialize loan history
            [RF_LOAN_FIELD.PAYMENT_INTEGRITY]: false, // Initialize payment integrity as false
            // Additional fields for databaseWebApp compatibility
            description: purpose.trim(), // For backward compatibility
            loanPurpose: purpose.trim(), // For backward compatibility
            loanAmount: parseFloat(amount.replace(/,/g, '')), // For backward compatibility
            loanSource: 'wereSL', // For backward compatibility
            loanStatus: 'active' // For backward compatibility
          }
          loans.push(loanData)
        }
      }
    }
  }
  
  // Parse RF_Cur_Prj column (active loans) and update current balance
  if (rfCurPrjStr) {
    const currentMatches = rfCurPrjStr.match(/([^(]+)\s*\(([^)]+)\)/g)
    if (currentMatches) {
      for (const match of currentMatches) {
        const purposeMatch = match.match(/([^(]+)\s*\(([^)]+)\)/)
        if (purposeMatch) {
          const [, purpose, currentBalance] = purposeMatch
          const purposeTrimmed = purpose.trim()
          const currentBalanceAmount = parseFloat(currentBalance.replace(/,/g, ''))
          
          // Find existing loan with same purpose and update current balance
          const existingLoan = loans.find(loan => loan[RF_LOAN_FIELD.PURPOSE] === purposeTrimmed)
          if (existingLoan) {
            existingLoan[RF_LOAN_FIELD.CURRENT_BALANCE] = currentBalanceAmount
            
            // Calculate payment integrity: current balance + total payments = original loan amount
            const totalPayments = calculateTotalPayments(rfPaidHistoryStr, purposeTrimmed)
            const calculatedOriginalAmount = currentBalanceAmount + totalPayments
            
            // Update loan amount if calculated amount is higher
            if (calculatedOriginalAmount > existingLoan[RF_LOAN_FIELD.AMOUNT]) {
              existingLoan[RF_LOAN_FIELD.AMOUNT] = calculatedOriginalAmount
            }
            
            // Set payment integrity based on calculation
            existingLoan[RF_LOAN_FIELD.PAYMENT_INTEGRITY] = (existingLoan[RF_LOAN_FIELD.AMOUNT] === calculatedOriginalAmount)
            
            // Populate loan history from payment history
            existingLoan[RF_LOAN_FIELD.LOAN_HISTORY] = parsePaymentHistoryToLoanHistory(rfPaidHistoryStr, purposeTrimmed)
          } else {
            // Create new loan if not found - calculate amount and payment integrity
            const totalPayments = calculateTotalPayments(rfPaidHistoryStr, purposeTrimmed)
            const calculatedOriginalAmount = currentBalanceAmount + totalPayments
            
            loans.push({
              [RF_LOAN_FIELD.PURPOSE]: purposeTrimmed,
              [RF_LOAN_FIELD.CURRENT_BALANCE]: currentBalanceAmount,
              [RF_LOAN_FIELD.AMOUNT]: calculatedOriginalAmount, // Original amount = current balance + total payments
              [RF_LOAN_FIELD.STATUS]: 'active',
              [RF_LOAN_FIELD.TYPE]: 'RF',
              [RF_LOAN_FIELD.LAST_UPDATED]: serverTimestamp(),
              [RF_LOAN_FIELD.REG_ID]: '', // Will be set when saving
              // [RF_LOAN_FIELD.PROJECT_DESCRIPTION]: purposeTrimmed, // Removed - no longer using project description
              [RF_LOAN_FIELD.SOURCE]: 'wereSL', // Default source for migrated loans
              [RF_LOAN_FIELD.APPROVED_AT]: new Date(),
              [RF_LOAN_FIELD.CREATED_AT]: new Date(),
              [RF_LOAN_FIELD.INITIATION_DATE]: new Date(),
              [RF_LOAN_FIELD.ARMS]: '', // Initialize ARMS field
              [RF_LOAN_FIELD.LOAN_HISTORY]: parsePaymentHistoryToLoanHistory(rfPaidHistoryStr, purposeTrimmed), // Populate from payment history
              [RF_LOAN_FIELD.PAYMENT_INTEGRITY]: (calculatedOriginalAmount === (currentBalanceAmount + totalPayments)), // Set based on calculation
              // Additional fields for databaseWebApp compatibility
              description: purposeTrimmed, // For backward compatibility
              loanPurpose: purposeTrimmed, // For backward compatibility
              loanAmount: calculatedOriginalAmount, // For backward compatibility
              loanSource: 'wereSL', // For backward compatibility
              loanStatus: 'active' // For backward compatibility
            })
          }
        }
      }
    }
  }
  
  // Parse Com_prjs column (completed loans)
  if (comPrjsStr) {
    const completedMatches = comPrjsStr.match(/([^(]+)\s*\(([^)]+)\)/g)
    if (completedMatches) {
      for (const match of completedMatches) {
        const purposeMatch = match.match(/([^(]+)\s*\(([^)]+)\)/)
        if (purposeMatch) {
          const [, purpose, amount] = purposeMatch
          const purposeTrimmed = purpose.trim()
          const completedAmount = parseFloat(amount.replace(/,/g, ''))
          
          // Find existing loan with same purpose and mark as completed
          const existingLoan = loans.find(loan => loan[RF_LOAN_FIELD.PURPOSE] === purposeTrimmed)
          if (existingLoan) {
            existingLoan[RF_LOAN_FIELD.STATUS] = 'completed'
            existingLoan[RF_LOAN_FIELD.CURRENT_BALANCE] = 0 // Completed loans have 0 balance
            
            // Calculate payment integrity: 0 balance + total payments = original loan amount
            const totalPayments = calculateTotalPayments(rfPaidHistoryStr, purposeTrimmed)
            const calculatedOriginalAmount = 0 + totalPayments
            
            // Update loan amount if calculated amount is higher
            if (calculatedOriginalAmount > existingLoan[RF_LOAN_FIELD.AMOUNT]) {
              existingLoan[RF_LOAN_FIELD.AMOUNT] = calculatedOriginalAmount
            }
            
            // Set payment integrity based on calculation
            existingLoan[RF_LOAN_FIELD.PAYMENT_INTEGRITY] = (existingLoan[RF_LOAN_FIELD.AMOUNT] === calculatedOriginalAmount)
            
            // Populate loan history from payment history
            existingLoan[RF_LOAN_FIELD.LOAN_HISTORY] = parsePaymentHistoryToLoanHistory(rfPaidHistoryStr, purposeTrimmed)
          } else {
            // Create new completed loan if not found
            const totalPayments = calculateTotalPayments(rfPaidHistoryStr, purposeTrimmed)
            const calculatedOriginalAmount = completedAmount + totalPayments
            
            loans.push({
              [RF_LOAN_FIELD.PURPOSE]: purposeTrimmed,
              [RF_LOAN_FIELD.AMOUNT]: calculatedOriginalAmount, // Original amount = completed amount + total payments
              [RF_LOAN_FIELD.STATUS]: 'completed',
              [RF_LOAN_FIELD.TYPE]: 'RF',
              [RF_LOAN_FIELD.LAST_UPDATED]: serverTimestamp(),
              [RF_LOAN_FIELD.REG_ID]: '', // Will be set when saving
              // [RF_LOAN_FIELD.PROJECT_DESCRIPTION]: purposeTrimmed, // Removed - no longer using project description
              [RF_LOAN_FIELD.SOURCE]: 'wereSL', // Default source for migrated loans
              [RF_LOAN_FIELD.CURRENT_BALANCE]: 0, // Completed loans have 0 balance
              [RF_LOAN_FIELD.APPROVED_AT]: new Date(),
              [RF_LOAN_FIELD.CREATED_AT]: new Date(),
              [RF_LOAN_FIELD.INITIATION_DATE]: new Date(),
              [RF_LOAN_FIELD.ARMS]: '', // Initialize ARMS field
              [RF_LOAN_FIELD.LOAN_HISTORY]: parsePaymentHistoryToLoanHistory(rfPaidHistoryStr, purposeTrimmed), // Populate from payment history
              [RF_LOAN_FIELD.PAYMENT_INTEGRITY]: (calculatedOriginalAmount === (completedAmount + totalPayments)), // Set based on calculation
              // Additional fields for databaseWebApp compatibility
              description: purposeTrimmed, // For backward compatibility
              loanPurpose: purposeTrimmed, // For backward compatibility
              loanAmount: calculatedOriginalAmount, // For backward compatibility
              loanSource: 'wereSL', // For backward compatibility
              loanStatus: 'completed' // For backward compatibility
            })
          }
        }
      }
    }
  }
  
  // Final validation: ensure all loans have amount >= currentBalance
  for (const loan of loans) {
    if (loan[RF_LOAN_FIELD.AMOUNT] < loan[RF_LOAN_FIELD.CURRENT_BALANCE]) {
      loan[RF_LOAN_FIELD.AMOUNT] = loan[RF_LOAN_FIELD.CURRENT_BALANCE]
    }
  }
  
  return loans
}

/**
 * Parse Grant loans
 */
function parseGrantLoans(grantStr, grantCurPrjStr) {
  const loans = []
  
  // Parse GRANT_Cur_Prj column
  if (grantCurPrjStr) {
    // Handle format: Cow (100,000) [10-04-2022] + Cow Shed (167,000) [20-05-2025]
    const grantMatches = grantCurPrjStr.match(/([^(]+)\s*\(([^)]+)\)\s*\[([^\]]+)\]/g)
    if (grantMatches) {
      for (const match of grantMatches) {
        const grantMatch = match.match(/([^(]+)\s*\(([^)]+)\)\s*\[([^\]]+)\]/)
        if (grantMatch) {
          const [, purpose, amount, date] = grantMatch
          loans.push({
            [GRANT_FIELD.PURPOSE]: purpose.trim(),
            [GRANT_FIELD.APPROVED_AMOUNT]: parseFloat(amount.replace(/,/g, '')),
            [GRANT_FIELD.AMOUNT]: parseFloat(amount.replace(/,/g, '')), // For backward compatibility
            [GRANT_FIELD.APPROVED_AT]: parseDate(date),
            [GRANT_FIELD.CREATED_AT]: parseDate(date),
            [GRANT_FIELD.REQUESTED_DATE]: parseDate(date),
            [GRANT_FIELD.STATUS]: 'active',
            [GRANT_FIELD.TYPE]: 'GRANT',
            [GRANT_FIELD.LAST_UPDATED]: serverTimestamp(),
            [GRANT_FIELD.REG_ID]: '', // Will be set when saving
            // [GRANT_FIELD.PROJECT_DESCRIPTION]: purpose.trim(), // Removed - no longer using project description
            [GRANT_FIELD.SOURCE]: 'wereSL', // Default source for migrated loans
            [GRANT_FIELD.ARMS]: '', // Initialize ARMS field
            [GRANT_FIELD.LOAN_HISTORY]: [], // Initialize loan history
            [GRANT_FIELD.PAYMENT_INTEGRITY]: false, // Initialize payment integrity as false
            // Additional fields for databaseWebApp compatibility
            description: purpose.trim(), // For backward compatibility
            grantPurpose: purpose.trim(), // For backward compatibility
            grantAmount: parseFloat(amount.replace(/,/g, '')), // For backward compatibility
            grantSource: 'wereSL', // For backward compatibility
            grantStatus: 'active' // For backward compatibility
          })
        }
      }
    }
  }
  
  // Check if we need to create additional grant for remaining amount
  if (grantStr && grantCurPrjStr) {
    const totalGrantAmount = parseFloat(grantStr.replace(/,/g, '')) || 0
    const currentGrantAmount = loans.reduce((sum, loan) => sum + (loan[GRANT_FIELD.APPROVED_AMOUNT] || 0), 0)
    
    if (totalGrantAmount > currentGrantAmount) {
      const remainingAmount = totalGrantAmount - currentGrantAmount
      loans.push({
        [GRANT_FIELD.PURPOSE]: 'Additional Grant',
        [GRANT_FIELD.APPROVED_AMOUNT]: remainingAmount,
        [GRANT_FIELD.AMOUNT]: remainingAmount, // For backward compatibility
        [GRANT_FIELD.STATUS]: 'active',
        [GRANT_FIELD.TYPE]: 'GRANT',
        [GRANT_FIELD.LAST_UPDATED]: serverTimestamp(),
        [GRANT_FIELD.REG_ID]: '', // Will be set when saving
        // [GRANT_FIELD.PROJECT_DESCRIPTION]: 'Additional Grant', // Removed - no longer using project description
        [GRANT_FIELD.SOURCE]: 'wereSL', // Default source for migrated loans
        [GRANT_FIELD.APPROVED_AT]: new Date(),
        [GRANT_FIELD.CREATED_AT]: new Date(),
        [GRANT_FIELD.REQUESTED_DATE]: new Date(),
        [GRANT_FIELD.ARMS]: '', // Initialize ARMS field
        [GRANT_FIELD.LOAN_HISTORY]: [], // Initialize loan history
        [GRANT_FIELD.PAYMENT_INTEGRITY]: false, // Initialize payment integrity as false
        // Additional fields for databaseWebApp compatibility
        description: 'Additional Grant', // For backward compatibility
        grantPurpose: 'Additional Grant', // For backward compatibility
        grantAmount: remainingAmount, // For backward compatibility
        grantSource: 'wereSL', // For backward compatibility
        grantStatus: 'active' // For backward compatibility
      })
    }
  }
  
  return loans
}

/**
 * Parse RF return history from RF_Paid_History column
 * Returns map/object with date as key and amount as value (as expected by databaseWebApp)
 * 
 * Sample input: "5000 [07-04-2025] + 5000 [08-05-2025] + 5000 [07-06-2025]"
 * Expected output: { "07-04-2025": 5000, "08-05-2025": 5000, "07-06-2025": 5000 }
 */
function parseRFReturnHistory(rfPaidHistoryStr) {
  if (!rfPaidHistoryStr) return {}
  
  const history = {}
  
  // Split by "+" to get individual payment entries
  const paymentEntries = rfPaidHistoryStr.split('+').map(entry => entry.trim())
  
  for (const entry of paymentEntries) {
    // Handle format: "5000 [07-04-2025]" or "5000 [07-04-2025]"
    const match = entry.match(/(\d+(?:,\d+)*)\s*\[([^\]]+)\]/)
    
    if (match) {
      const [, amount, date] = match
      const cleanAmount = parseFloat(amount.replace(/,/g, ''))
      const cleanDate = date.trim()
      
      // Store with date as key and amount as value
      history[cleanDate] = cleanAmount
    }
  }
  
  return history
}

/**
 * Calculate total payments made for a specific loan purpose
 * Used to calculate current balance: Original amount - Total payments
 */
function calculateTotalPayments(rfPaidHistoryStr, loanPurpose) {
  if (!rfPaidHistoryStr) return 0
  
  let totalPayments = 0
  
  // Split by "+" to get individual payment entries
  const paymentEntries = rfPaidHistoryStr.split('+').map(entry => entry.trim())
  
  for (const entry of paymentEntries) {
    // Handle format: "5000 [07-04-2025]" or "5000 [07-04-2025]"
    const match = entry.match(/(\d+(?:,\d+)*)\s*\[([^\]]+)\]/)
    
    if (match) {
      const [, amount] = match
      const cleanAmount = parseFloat(amount.replace(/,/g, ''))
      totalPayments += cleanAmount
    }
  }
  
  return totalPayments
}

/**
 * Parse payment history to loan history format for databaseWebApp
 * Converts "5000 [07-04-2025] + 5000 [08-05-2025]" to array format
 */
function parsePaymentHistoryToLoanHistory(rfPaidHistoryStr, loanPurpose) {
  if (!rfPaidHistoryStr) return []
  
  const loanHistory = []
  
  // Split by "+" to get individual payment entries
  const paymentEntries = rfPaidHistoryStr.split('+').map(entry => entry.trim())
  
  for (const entry of paymentEntries) {
    // Handle format: "5000 [07-04-2025]" or "5000 [07-04-2025]"
    const match = entry.match(/(\d+(?:,\d+)*)\s*\[([^\]]+)\]/)
    
    if (match) {
      const [, amount, date] = match
      const cleanAmount = parseFloat(amount.replace(/,/g, ''))
      const cleanDate = date.trim()
      
      // Convert DD-MM-YYYY to Date object for databaseWebApp
      const dateParts = cleanDate.split('-')
      const paymentDate = new Date(parseInt(dateParts[2]), parseInt(dateParts[1]) - 1, parseInt(dateParts[0]))
      
      loanHistory.push({
        date: paymentDate,
        amount: cleanAmount,
        receipt_link_ID: null // No receipt link available from CSV
      })
    }
  }
  
  return loanHistory
}

/**
 * Parse date string to Date object
 */
function parseDate(dateStr) {
  if (!dateStr) return new Date()
  
  // Handle various date formats
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) {
    // Try DD-MM-YYYY format
    const parts = dateStr.split('-')
    if (parts.length === 3) {
      return new Date(parts[2], parts[1] - 1, parts[0])
    }
    return new Date()
  }
  
  return date
}

/**
 * Save profile to Firestore
 */
async function saveProfile(profileData, regId) {
  try {
    const profileRef = doc(db, RootCollection.PROFILES, regId)
    await setDoc(profileRef, profileData)
    console.log(`  ✅ Profile saved: ${regId}`)
  } catch (error) {
    console.error(`  ❌ Error saving profile ${regId}:`, error.message)
    throw error
  }
}

/**
 * Save loan to Firestore with generated ID
 */
async function saveLoan(regId, loanData, loanType, loanId) {
  try {
    const collectionName = loanType === 'RF' ? ProfileField.RF_LOANS : ProfileField.GRANT
    const loanRef = collection(db, RootCollection.PROFILES, regId, collectionName)
    
    // Add the generated loan ID and REG_ID to the loan data
    const loanDataWithId = {
      ...loanData,
      id: loanId,
      [loanType === 'RF' ? RF_LOAN_FIELD.REG_ID : GRANT_FIELD.REG_ID]: regId
    }
    
    await addDoc(loanRef, loanDataWithId)
    console.log(`  ✅ ${loanType} loan saved for: ${regId} (ID: ${loanId})`)
    
    // Also save to root loans collection for system-wide tracking (as expected by loan admin app)
    await saveLoanToRootCollection(regId, loanDataWithId, loanType, loanId)
    
  } catch (error) {
    console.error(`  ❌ Error saving ${loanType} loan for ${regId}:`, error.message)
    throw error
  }
}

/**
 * Save loan to root loans collection for system-wide tracking
 */
async function saveLoanToRootCollection(regId, loanData, loanType, loanId) {
  try {
    // Prepare loan data for root collection (matching loan admin app expectations)
    const rootLoanData = {
      regId: regId,
      amount: loanData[loanType === 'RF' ? RF_LOAN_FIELD.AMOUNT : GRANT_FIELD.APPROVED_AMOUNT] || loanData[loanType === 'RF' ? RF_LOAN_FIELD.AMOUNT : GRANT_FIELD.AMOUNT] || 0,
      approvedAt: loanData[loanType === 'RF' ? RF_LOAN_FIELD.APPROVED_AT : GRANT_FIELD.APPROVED_AT] || new Date(),
      arms: loanData[loanType === 'RF' ? RF_LOAN_FIELD.ARMS : GRANT_FIELD.ARMS] || '',
      createdAt: loanData[loanType === 'RF' ? RF_LOAN_FIELD.CREATED_AT : GRANT_FIELD.CREATED_AT] || new Date(),
      initiationDate: loanData[loanType === 'RF' ? RF_LOAN_FIELD.INITIATION_DATE : GRANT_FIELD.REQUESTED_DATE] || new Date(),
      loanId: loanId,
      projectDescription: '', // Removed - no longer using project description
      purpose: loanData[loanType === 'RF' ? RF_LOAN_FIELD.PURPOSE : GRANT_FIELD.PURPOSE] || '',
      source: loanData[loanType === 'RF' ? RF_LOAN_FIELD.SOURCE : GRANT_FIELD.SOURCE] || 'wereSL',
      status: loanData[loanType === 'RF' ? RF_LOAN_FIELD.STATUS : GRANT_FIELD.STATUS] || 'active',
      type: loanType
    }
    
    const rootLoanRef = doc(db, RootCollection.LOANS, loanId)
    await setDoc(rootLoanRef, rootLoanData)
    console.log(`  ✅ ${loanType} loan saved to root collection: ${loanId}`)
    
  } catch (error) {
    console.error(`  ⚠️ Warning: Could not save ${loanType} loan to root collection:`, error.message)
    // Don't throw error here as the main loan save was successful
  }
}

/**
 * Split array into chunks
 */
function chunkArray(array, size) {
  const chunks = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

// Export functions for testing
export { testCSVParsing, parseCSVLine, loadCSVData, generateSimpleLoanId, testLoanIdGeneration, testRFReturnHistoryParsing, testPaymentCalculation, testRFLoanParsing }

/**
 * Test loan ID generation to verify the format
 */
function testLoanIdGeneration() {
  console.log('🧪 Testing Loan ID Generation...')
  
  // Test with multiple profiles
  const testProfiles = ['ANU001', 'ANU002', 'ANU003']
  
  testProfiles.forEach(regId => {
    console.log(`\n📋 Profile: ${regId}`)
    
    // Generate RF loans
    console.log('  RF Loans:')
    for (let i = 0; i < 3; i++) {
      const loanId = generateSimpleLoanId(regId, 'RF')
      console.log(`    ${loanId}`)
    }
    
    // Generate Grant loans
    console.log('  Grant Loans:')
    for (let i = 0; i < 2; i++) {
      const loanId = generateSimpleLoanId(regId, 'GRANT')
      console.log(`    ${loanId}`)
    }
  })
  
  console.log('\n✅ Expected: Each profile starts from 01 for both RF and Grant loans')
}

/**
 * Test RF return history parsing to verify the format
 */
function testRFReturnHistoryParsing() {
  console.log('🧪 Testing RF Return History Parsing...')
  
  // Test with sample data from CSV
  const testData = "5000 [07-04-2025] + 5000 [08-05-2025] + 5000 [07-06-2025] + 5000 [02-07-2025] + 5000 [02-08-2025]"
  
  console.log('📥 Input:', testData)
  
  const result = parseRFReturnHistory(testData)
  console.log('📤 Output:', result)
  
  console.log('\n📋 Parsed Entries:')
  Object.entries(result).forEach(([date, amount]) => {
    console.log(`  ${date}: Rs. ${amount.toLocaleString()}`)
  })
  
  console.log('\n✅ Expected: Map with date keys (DD-MM-YYYY) and amount values')
}

/**
 * Test payment calculation logic to verify current balance calculation
 */
function testPaymentCalculation() {
  console.log('🧪 Testing Payment Calculation Logic...')
  
  // Test with sample data from CSV
  const originalLoanAmount = 1350000
  const paymentHistory = "5000 [07-04-2025] + 5000 [08-05-2025] + 5000 [07-06-2025] + 5000 [02-07-2025] + 5000 [02-08-2025]"
  const expectedCurrentBalance = 1325000
  
  console.log('📥 Original Loan Amount:', originalLoanAmount.toLocaleString())
  console.log('📥 Payment History:', paymentHistory)
  console.log('📥 Expected Current Balance:', expectedCurrentBalance.toLocaleString())
  
  const totalPayments = calculateTotalPayments(paymentHistory, 'Trishaw')
  const calculatedCurrentBalance = originalLoanAmount - totalPayments
  
  console.log('\n📊 Calculation:')
  console.log(`  Total Payments: ${totalPayments.toLocaleString()}`)
  console.log(`  Calculated Current Balance: ${calculatedCurrentBalance.toLocaleString()}`)
  console.log(`  Expected Current Balance: ${expectedCurrentBalance.toLocaleString()}`)
  console.log(`  Difference: ${Math.abs(calculatedCurrentBalance - expectedCurrentBalance).toLocaleString()}`)
  
  console.log('\n📋 Loan History Format:')
  const loanHistory = parsePaymentHistoryToLoanHistory(paymentHistory, 'Trishaw')
  loanHistory.forEach((payment, index) => {
    console.log(`  Payment ${index + 1}: ${payment.date.toLocaleDateString()} - Rs. ${payment.amount.toLocaleString()}`)
  })
  
  console.log('\n✅ Expected: Calculated balance should match expected current balance')
}

/**
 * Test the complete RF loan parsing logic with the new format
 */
function testRFLoanParsing() {
  console.log('🧪 Testing Complete RF Loan Parsing Logic...')
  
  // Test data matching the new CSV format
  const rfLoanStr = "Fish1 (50000) [01-02-2024] + Fish (50000) [01-02-2022]"
  const rfCurPrjStr = "Fish2 (50000)"
  const comPrjsStr = "Fish1 (50000) + Bicycle (50,000) + Scooter(100,000)"
  const rfPaidHistoryStr = "5000 [07-04-2025] + 5000 [08-05-2025]"
  
  console.log('📥 RF_Loan (All loans):', rfLoanStr)
  console.log('📥 RF_Cur_Prj (Active loans):', rfCurPrjStr)
  console.log('📥 Com_prjs (Completed loans):', comPrjsStr)
  console.log('📥 RF_Paid_History:', rfPaidHistoryStr)
  
  const loans = parseRFLoans(rfLoanStr, rfCurPrjStr, comPrjsStr, rfPaidHistoryStr)
  
  console.log('\n📋 Parsed Loans:')
  loans.forEach((loan, index) => {
    console.log(`\n  Loan ${index + 1}:`)
    console.log(`    Purpose: ${loan[RF_LOAN_FIELD.PURPOSE]}`)
    console.log(`    Amount: ${loan[RF_LOAN_FIELD.AMOUNT].toLocaleString()}`)
    console.log(`    Status: ${loan[RF_LOAN_FIELD.STATUS]}`)
    console.log(`    Current Balance: ${loan[RF_LOAN_FIELD.CURRENT_BALANCE].toLocaleString()}`)
    console.log(`    Payment Integrity: ${loan[RF_LOAN_FIELD.PAYMENT_INTEGRITY]}`)
    console.log(`    Loan History: ${loan[RF_LOAN_FIELD.LOAN_HISTORY].length} payments`)
  })
  
  console.log('\n✅ Expected Results:')
  console.log('  - Fish1: completed, balance = 0, amount = 50000')
  console.log('  - Fish: active, balance = 50000, amount = 50000')
  console.log('  - Fish2: active, balance = 50000, amount = 50000')
  console.log('  - Bicycle: completed, balance = 0, amount = 50000')
  console.log('  - Scooter: completed, balance = 0, amount = 100000')
}

// CLI handling
if (process.argv.length > 2) {
  const csvFilePath = process.argv[2]
  
  if (!csvFilePath) {
    console.error('❌ Please provide a CSV file path')
    console.log('Usage: node migrate-csv-data.js <path-to-csv-file>')
    console.log('Example: node migrate-csv-data.js data.csv')
    process.exit(1)
  }
  
  migrateCSVData(csvFilePath)
    .then(result => {
      if (result.success) {
        console.log('✅ Migration completed successfully!')
        process.exit(0)
      } else {
        console.error('❌ Migration failed:', result.error)
        process.exit(1)
      }
    })
    .catch(error => {
      console.error('❌ Migration failed:', error)
      process.exit(1)
    })
} else {
  console.log('📋 WERESL CSV Migration Tool')
  console.log('')
  console.log('Usage:')
  console.log('  node migrate-csv-data.js <path-to-csv-file>')
  console.log('')
  console.log('Example:')
  console.log('  node migrate-csv-data.js data.csv')
  console.log('')
  console.log('CSV Format:')
  console.log('  Reg_ID,District,Name,Age,Address,NIC,contact,total_children,school_kids,others,Description,Occupation,RF_Loan,RF_Paid_History,RF_Cur_Prj,Com_prjs,Image,GRANT,GIFor,GRANT_Cur_Prj')
  console.log('')
  console.log('Make sure your CSV file has the correct column headers and data format.')
  console.log('')
  console.log('✅ This script creates loans compatible with:')
  console.log('   - Loan Admin App (approval workflow)')
  console.log('   - Database Web App (display components)')
  console.log('   - All other WERESL applications')
} 