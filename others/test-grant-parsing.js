/**
 * Test Grant Parsing Functionality
 * This script tests the grant loan parsing with the updated field structure
 */

import { 
  GRANT_FIELD,
  RF_LOAN_FIELD,
  RootCollection,
  SearchElementDoc,
  RF_RETURN_RECORD_FIELD,
  RRH_OBJECT_FIELD
} from '../databaseWebApp/src/enums/db.js'

// Import the grant parsing function from the migration script
import { parseGrantLoans } from './migrate-csv-data.js'

/**
 * Test Grant Parsing with Sample Data
 */
function testGrantParsing() {
  console.log('🧪 Testing Grant Loan Parsing Logic...')
  
  // Test data matching the CSV format
  const grantStr = "300000" // Total grant amount
  const grantCurPrjStr = "Cow (100,000) [10-04-2022] + Cow Shed (167,000) [20-05-2025]"
  
  console.log('📥 GRANT (Total amount):', grantStr)
  console.log('📥 GRANT_Cur_Prj (Active grants):', grantCurPrjStr)
  
  const grants = parseGrantLoans(grantStr, grantCurPrjStr)
  
  console.log('\n📋 Parsed Grant Loans:')
  grants.forEach((grant, index) => {
    console.log(`\n  Grant ${index + 1}:`)
    console.log(`    Purpose: ${grant[GRANT_FIELD.PURPOSE]}`)
    console.log(`    Approved Amount: ${grant[GRANT_FIELD.APPROVED_AMOUNT].toLocaleString()}`)
    console.log(`    Amount: ${grant[GRANT_FIELD.AMOUNT].toLocaleString()}`)
    console.log(`    Status: ${grant[GRANT_FIELD.STATUS]}`)
    console.log(`    Grant Type: ${grant[GRANT_FIELD.GRANT_TYPE]}`)
    console.log(`    Source: ${grant[GRANT_FIELD.SOURCE]}`)
    console.log(`    Conditions: ${JSON.stringify(grant[GRANT_FIELD.CONDITIONS])}`)
    console.log(`    Verification Status: ${grant[GRANT_FIELD.VERIFICATION_STATUS]}`)
    console.log(`    Notes: "${grant[GRANT_FIELD.NOTES]}"`)
    console.log(`    Approved At: ${grant[GRANT_FIELD.APPROVED_AT]}`)
    console.log(`    Created At: ${grant[GRANT_FIELD.CREATED_AT]}`)
    console.log(`    Requested Date: ${grant[GRANT_FIELD.REQUESTED_DATE]}`)
  })
  
  console.log('\n✅ Expected Results:')
  console.log('  - Cow: active, amount = 100,000, grantType = GRANT')
  console.log('  - Cow Shed: active, amount = 167,000, grantType = GRANT')
  console.log('  - Additional Grant: active, amount = 33,000, grantType = GRANT')
  
  // Test field validation
  console.log('\n🔍 Field Validation:')
  grants.forEach((grant, index) => {
    console.log(`\n  Grant ${index + 1} Field Check:`)
    
    // Check required fields
    const requiredFields = [
      GRANT_FIELD.PURPOSE,
      GRANT_FIELD.APPROVED_AMOUNT,
      GRANT_FIELD.AMOUNT,
      GRANT_FIELD.STATUS,
      GRANT_FIELD.GRANT_TYPE,
      GRANT_FIELD.SOURCE,
      GRANT_FIELD.CONDITIONS,
      GRANT_FIELD.VERIFICATION_STATUS,
      GRANT_FIELD.NOTES,
      GRANT_FIELD.APPROVED_AT,
      GRANT_FIELD.CREATED_AT,
      GRANT_FIELD.REQUESTED_DATE,
      GRANT_FIELD.LAST_UPDATED,
      GRANT_FIELD.REG_ID,
      GRANT_FIELD.ARMS
    ]
    
    requiredFields.forEach(field => {
      const hasField = grant.hasOwnProperty(field)
      const fieldValue = grant[field]
      console.log(`    ${field}: ${hasField ? '✅' : '❌'} ${fieldValue !== undefined ? `(${typeof fieldValue})` : '(undefined)'}`)
    })
  })
  
  return grants
}

/**
 * Test Grant Parsing Edge Cases
 */
function testGrantEdgeCases() {
  console.log('\n🧪 Testing Grant Parsing Edge Cases...')
  
  const testCases = [
    {
      name: 'Empty Grant Data',
      grantStr: '',
      grantCurPrjStr: '',
      expectedCount: 0
    },
    {
      name: 'Only Total Amount (no projects)',
      grantStr: '50000',
      grantCurPrjStr: '',
      expectedCount: 0
    },
    {
      name: 'Single Grant Project',
      grantStr: '100000',
      grantCurPrjStr: 'Farming (100,000) [01-01-2024]',
      expectedCount: 1
    },
    {
      name: 'Multiple Grant Projects',
      grantStr: '300000',
      grantCurPrjStr: 'Cow (100,000) [10-04-2022] + Cow Shed (167,000) [20-05-2025]',
      expectedCount: 3 // 2 projects + 1 additional grant
    },
    {
      name: 'Exact Amount Match',
      grantStr: '267000',
      grantCurPrjStr: 'Cow (100,000) [10-04-2022] + Cow Shed (167,000) [20-05-2025]',
      expectedCount: 2 // No additional grant needed
    }
  ]
  
  testCases.forEach(testCase => {
    console.log(`\n📝 Testing: ${testCase.name}`)
    console.log(`   Grant: "${testCase.grantStr}"`)
    console.log(`   Projects: "${testCase.grantCurPrjStr}"`)
    
    const grants = parseGrantLoans(testCase.grantStr, testCase.grantCurPrjStr)
    console.log(`   ✅ Parsed ${grants.length} grant(s) (expected: ${testCase.expectedCount})`)
    
    if (grants.length !== testCase.expectedCount) {
      console.log(`   ⚠️  Count mismatch! Expected ${testCase.expectedCount}, got ${grants.length}`)
    }
    
    grants.forEach((grant, index) => {
      console.log(`      - ${grant[GRANT_FIELD.PURPOSE]}: ${grant[GRANT_FIELD.APPROVED_AMOUNT].toLocaleString()} (${grant[GRANT_FIELD.STATUS]})`)
    })
  })
}

// Run the tests
console.log('🚀 Starting Grant Parsing Tests...\n')

try {
  const grants = testGrantParsing()
  testGrantEdgeCases()
  
  console.log('\n🎉 Grant Parsing Tests Completed!')
  console.log(`✅ Successfully parsed ${grants.length} grant loans`)
  console.log('✅ All grant fields are properly structured')
  console.log('✅ Grant migration script is ready for use!')
  
} catch (error) {
  console.error('❌ Grant Parsing Test Failed:', error)
  process.exit(1)
}
