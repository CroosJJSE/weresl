/**
 * Test Migration Logic Script
 * Validates migration logic without saving to database
 */

import { extractFileId } from './utils/driveUtils.js'

// Test data
const testRecord = {
  Reg_ID: 'MAN001',
  District: 'Matara',
  Name: 'John Doe',
  Age: '35',
  Address: '123 Main St, Matara',
  NIC: '123456789V',
  contact: '0771234567',
  totalChildren: '3',
  schoolKids: '2',
  others: '1',
  Description: 'Farmer',
  Occupation: 'Agriculture',
  RF_Loan: 'Cow [10-04-2022](100000) + Shed [20-05-2023](50000)',
  RF_Paid_History: '50000 - 15-06-2022, 25000 - 20-07-2022',
  RF_Cur_Prj: 'Cow (50000)',
  Com_prjs: 'Shed (50000)',
  Image: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view',
  GRANT: '267000',
  GIFor: 'Helped neighbor with farming',
  GRANT_Cur_Prj: 'Cow (100000) [10-04-2022] + Cow Shed (167000) [20-05-2025]'
}

/**
 * Test functions
 */
function testCalculateBirthYear() {
  console.log('🧪 Testing birth year calculation...')
  
  const testCases = [
    { age: '35', expected: new Date().getFullYear() - 35 },
    { age: '25', expected: new Date().getFullYear() - 25 },
    { age: '', expected: null },
    { age: 'invalid', expected: null }
  ]
  
  testCases.forEach(({ age, expected }) => {
    const result = calculateBirthYear(age)
    const passed = result === expected
    console.log(`  Age: ${age} -> ${result} ${passed ? '✅' : '❌'}`)
  })
}

function testExtractFileId() {
  console.log('🧪 Testing file ID extraction...')
  
  const testCases = [
    {
      url: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view',
      expected: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms'
    },
    {
      url: 'https://drive.google.com/open?id=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
      expected: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms'
    },
    {
      url: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
      expected: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms'
    },
    {
      url: '',
      expected: null
    }
  ]
  
  testCases.forEach(({ url, expected }) => {
    const result = extractFileId(url)
    const passed = result === expected
    console.log(`  URL: ${url.substring(0, 50)}... -> ${result} ${passed ? '✅' : '❌'}`)
  })
}

function testParseRFLoans() {
  console.log('🧪 Testing RF loan parsing...')
  
  const rfLoanStr = 'Cow [10-04-2022](100000) + Shed [20-05-2023](50000)'
  const rfCurPrjStr = 'Cow (50000)'
  const comPrjsStr = 'Shed (50000)'
  
  const loans = parseRFLoans(rfLoanStr, rfCurPrjStr, comPrjsStr)
  
  console.log(`  Found ${loans.length} loans:`)
  loans.forEach((loan, index) => {
    console.log(`    ${index + 1}. ${loan.purpose} - ${loan.amount || loan.currentBalance} - ${loan.status}`)
  })
}

function testParseGrantLoans() {
  console.log('🧪 Testing Grant loan parsing...')
  
  const grantStr = '267000'
  const grantCurPrjStr = 'Cow (100000) [10-04-2022] + Cow Shed (167000) [20-05-2025]'
  
  const loans = parseGrantLoans(grantStr, grantCurPrjStr)
  
  console.log(`  Found ${loans.length} grants:`)
  loans.forEach((loan, index) => {
    console.log(`    ${index + 1}. ${loan.purpose} - ${loan.approvedAmount} - ${loan.status}`)
  })
}

function testParseRFReturnHistory() {
  console.log('🧪 Testing RF return history parsing...')
  
  const rfPaidHistoryStr = '50000 - 15-06-2022, 25000 - 20-07-2022'
  
  const history = parseRFReturnHistory(rfPaidHistoryStr)
  
  console.log(`  Found ${history.length} payments:`)
  history.forEach((payment, index) => {
    console.log(`    ${index + 1}. ${payment.returnedAmount} - ${payment.timestamp}`)
  })
}

function testProcessRecord() {
  console.log('🧪 Testing complete record processing...')
  
  const processedData = processRecord(testRecord)
  
  console.log('  Profile data:')
  console.log(`    Reg_ID: ${processedData.profile.Reg_ID}`)
  console.log(`    Name: ${processedData.profile.fullName}`)
  console.log(`    Birth Year: ${processedData.profile.yearOfBirth}`)
  console.log(`    Image ID: ${processedData.profile.profileImageDriveId}`)
  
  console.log(`  RF Loans: ${processedData.rfLoans.length}`)
  console.log(`  Grant Loans: ${processedData.grantLoans.length}`)
  console.log(`  Return History: ${processedData.rfReturnHistory.length}`)
}

/**
 * Helper functions (copied from migration script)
 */
function calculateBirthYear(age) {
  if (!age || isNaN(age)) return null
  
  const currentYear = new Date().getFullYear()
  return currentYear - parseInt(age)
}

function parseRFLoans(rfLoanStr, rfCurPrjStr, comPrjsStr) {
  const loans = []
  
  // Parse RF_Loan column
  if (rfLoanStr) {
    const loanMatches = rfLoanStr.match(/([^[]+)\s*\[([^\]]+)\]\(([^)]+)\)/g)
    if (loanMatches) {
      for (const match of loanMatches) {
        const purposeMatch = match.match(/([^[]+)\s*\[([^\]]+)\]\(([^)]+)\)/)
        if (purposeMatch) {
          const [, purpose, date, amount] = purposeMatch
          loans.push({
            purpose: purpose.trim(),
            amount: parseFloat(amount.replace(/,/g, '')),
            approvedAt: parseDate(date),
            createdAt: parseDate(date),
            initiationDate: parseDate(date),
            status: 'active',
            type: 'RF',
            lastUpdated: new Date()
          })
        }
      }
    }
  }
  
  // Parse RF_Cur_Prj column
  if (rfCurPrjStr) {
    const currentMatches = rfCurPrjStr.match(/([^(]+)\s*\(([^)]+)\)/g)
    if (currentMatches) {
      for (const match of currentMatches) {
        const purposeMatch = match.match(/([^(]+)\s*\(([^)]+)\)/)
        if (purposeMatch) {
          const [, purpose, currentBalance] = purposeMatch
          loans.push({
            purpose: purpose.trim(),
            currentBalance: parseFloat(currentBalance.replace(/,/g, '')),
            status: 'active',
            type: 'RF',
            lastUpdated: new Date()
          })
        }
      }
    }
  }
  
  // Parse Com_prjs column
  if (comPrjsStr) {
    const completedMatches = comPrjsStr.match(/([^(]+)\s*\(([^)]+)\)/g)
    if (completedMatches) {
      for (const match of completedMatches) {
        const purposeMatch = match.match(/([^(]+)\s*\(([^)]+)\)/)
        if (purposeMatch) {
          const [, purpose, amount] = purposeMatch
          loans.push({
            purpose: purpose.trim(),
            amount: parseFloat(amount.replace(/,/g, '')),
            status: 'completed',
            type: 'RF',
            lastUpdated: new Date()
          })
        }
      }
    }
  }
  
  return loans
}

function parseGrantLoans(grantStr, grantCurPrjStr) {
  const loans = []
  
  // Parse GRANT_Cur_Prj column
  if (grantCurPrjStr) {
    const grantMatches = grantCurPrjStr.match(/([^(]+)\s*\(([^)]+)\)\s*\[([^\]]+)\]/g)
    if (grantMatches) {
      for (const match of grantMatches) {
        const grantMatch = match.match(/([^(]+)\s*\(([^)]+)\)\s*\[([^\]]+)\]/)
        if (grantMatch) {
          const [, purpose, amount, date] = grantMatch
          loans.push({
            purpose: purpose.trim(),
            approvedAmount: parseFloat(amount.replace(/,/g, '')),
            approvedAt: parseDate(date),
            createdAt: parseDate(date),
            requestedDate: parseDate(date),
            status: 'active',
            type: 'GRANT',
            lastUpdated: new Date()
          })
        }
      }
    }
  }
  
  // Check if we need to create additional grant for remaining amount
  if (grantStr && grantCurPrjStr) {
    const totalGrantAmount = parseFloat(grantStr.replace(/,/g, '')) || 0
    const currentGrantAmount = loans.reduce((sum, loan) => sum + (loan.approvedAmount || 0), 0)
    
    if (totalGrantAmount > currentGrantAmount) {
      const remainingAmount = totalGrantAmount - currentGrantAmount
      loans.push({
        purpose: 'Additional Grant',
        approvedAmount: remainingAmount,
        status: 'active',
        type: 'GRANT',
        lastUpdated: new Date()
      })
    }
  }
  
  return loans
}

function parseRFReturnHistory(rfPaidHistoryStr) {
  if (!rfPaidHistoryStr) return []
  
  const history = []
  const matches = rfPaidHistoryStr.match(/(\d+(?:,\d+)*)\s*-\s*([^,]+)/g)
  
  if (matches) {
    for (const match of matches) {
      const [, amount, date] = match.match(/(\d+(?:,\d+)*)\s*-\s*([^,]+)/)
      history.push({
        timestamp: parseDate(date),
        returnedAmount: parseFloat(amount.replace(/,/g, ''))
      })
    }
  }
  
  return history
}

function parseDate(dateStr) {
  if (!dateStr) return new Date()
  
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) {
    const parts = dateStr.split('-')
    if (parts.length === 3) {
      return new Date(parts[2], parts[1] - 1, parts[0])
    }
    return new Date()
  }
  
  return date
}

function processRecord(record) {
  const birthYear = calculateBirthYear(record.Age)
  const profileImageDriveId = extractFileId(record.Image)
  const rfLoans = parseRFLoans(record.RF_Loan, record.RF_Cur_Prj, record.Com_prjs)
  const grantLoans = parseGrantLoans(record.GRANT, record.GRANT_Cur_Prj)
  const rfReturnHistory = parseRFReturnHistory(record.RF_Paid_History)
  
  const profileData = {
    Reg_ID: record.Reg_ID,
    fullName: record.Name,
    district: record.District,
    yearOfBirth: birthYear,
    address: record.Address,
    nic: record.NIC,
    phoneNumber: record.contact,
    totalChildren: parseInt(record.totalChildren) || 0,
    schoolGoingChildren: parseInt(record.schoolKids) || 0,
    otherDependents: parseInt(record.others) || 0,
    description: record.Description,
    occupation: record.Occupation,
    profileImageDriveId: profileImageDriveId,
    GIF: record.GIFor ? [record.GIFor] : [],
    RF_return_history: rfReturnHistory,
    createdAt: new Date(),
    lastUpdated: new Date()
  }
  
  return {
    profile: profileData,
    rfLoans,
    grantLoans,
    rfReturnHistory
  }
}

/**
 * Run all tests
 */
function runTests() {
  console.log('🚀 Starting migration tests...\n')
  
  testCalculateBirthYear()
  console.log()
  
  testExtractFileId()
  console.log()
  
  testParseRFLoans()
  console.log()
  
  testParseGrantLoans()
  console.log()
  
  testParseRFReturnHistory()
  console.log()
  
  testProcessRecord()
  console.log()
  
  console.log('✅ All tests completed!')
}

// Run tests if this file is executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runTests()
}

export {
  calculateBirthYear,
  extractFileId,
  parseRFLoans,
  parseGrantLoans,
  parseRFReturnHistory,
  processRecord,
  runTests
} 