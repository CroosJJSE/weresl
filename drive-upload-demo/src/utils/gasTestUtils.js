/**
 * GAS Integration Test Utilities
 * Comprehensive test cases for GAS integration functionality
 */

import { 
  SHEET_TABS, 
  EMAIL_NOTIFICATION_TYPES,
  GAS_ACTION_TYPES 
} from '../enums/sheets.js'
import { ProfileField, RF_LOAN_FIELD } from '../enums/db.js'
import gasUtils from './gasUtils.js'

/**
 * Test data generators
 */
export const generateTestProfile = () => ({
  [ProfileField.REG_ID]: 'TEST001',
  [ProfileField.FULL_NAME]: 'John Doe',
  [ProfileField.YEAR_OF_BIRTH]: 1990,
  [ProfileField.DISTRICT]: 'Colombo',
  [ProfileField.ADDRESS]: '123 Test Street, Colombo',
  [ProfileField.NIC]: '901234567V',
  [ProfileField.PHONE_NUMBER]: '0771234567',
  [ProfileField.DESCRIPTION]: 'Test background description',
  [ProfileField.OCCUPATION]: 'Software Engineer',
  [ProfileField.TOTAL_CHILDREN]: 2
})

export const generateTestLoanData = () => ({
  [RF_LOAN_FIELD.TYPE]: 'RF',
  [RF_LOAN_FIELD.AMOUNT]: 50000,
  [RF_LOAN_FIELD.PURPOSE]: 'Business expansion',
  [RF_LOAN_FIELD.PROJECT_DESCRIPTION]: 'Expanding small business',
  [RF_LOAN_FIELD.SOURCE]: 'Bank Account 1'
})

export const generateTestReturnRecord = () => ({
  [RF_LOAN_FIELD.PAID_AMOUNT]: 10000,
  [RF_LOAN_FIELD.RECEIPT_DRIVE_LINK_ID]: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
  [RF_LOAN_FIELD.RECEIVER]: 'Bank Account 1'
})

/**
 * Test GAS connection
 */
export const testGASConnection = async () => {
  console.log('🧪 Testing GAS connection...')
  
  try {
    const result = await gasUtils.testGASConnection()
    console.log('✅ GAS connection test passed:', result)
    return { success: true, result }
  } catch (error) {
    console.error('❌ GAS connection test failed:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Test email notifications
 */
export const testEmailNotifications = async () => {
  console.log('🧪 Testing email notifications...')
  
  const testProfile = generateTestProfile()
  const testLoanData = generateTestLoanData()
  const testReturnRecord = generateTestReturnRecord()
  
  const tests = [
    {
      name: 'New Loan Approval Notification',
      test: async () => {
        return await gasUtils.sendNewLoanApprovalNotification(testLoanData, testProfile)
      }
    },
    {
      name: 'Payment Approval Notification',
      test: async () => {
        const paymentData = {
          paymentType: 'RF Repayment',
          amount: 10000,
          receiver: 'Bank Account 1'
        }
        return await gasUtils.sendPaymentApprovalNotification(paymentData, testProfile)
      }
    }
  ]
  
  const results = []
  
  for (const test of tests) {
    try {
      console.log(`  Testing: ${test.name}`)
      const result = await test.test()
      console.log(`  ✅ ${test.name} passed:`, result)
      results.push({ name: test.name, success: true, result })
    } catch (error) {
      console.error(`  ❌ ${test.name} failed:`, error)
      results.push({ name: test.name, success: false, error: error.message })
    }
  }
  
  return results
}

/**
 * Test sheet operations
 */
export const testSheetOperations = async () => {
  console.log('🧪 Testing sheet operations...')
  
  const testProfile = generateTestProfile()
  const testLoanData = generateTestLoanData()
  const testReturnRecord = generateTestReturnRecord()
  
  const tests = [
    {
      name: 'Update Main Tab Row',
      test: async () => {
        return await gasUtils.updateMainTabRow(testProfile)
      }
    },
    {
      name: 'Add Loan Initiation Record',
      test: async () => {
        return await gasUtils.addLoanInitiationRecord(testLoanData, testProfile)
      }
    },
    {
      name: 'Add RF Return Record',
      test: async () => {
        return await gasUtils.addRFReturnRecord(testReturnRecord, testProfile)
      }
    }
  ]
  
  const results = []
  
  for (const test of tests) {
    try {
      console.log(`  Testing: ${test.name}`)
      const result = await test.test()
      console.log(`  ✅ ${test.name} passed:`, result)
      results.push({ name: test.name, success: true, result })
    } catch (error) {
      console.error(`  ❌ ${test.name} failed:`, error)
      results.push({ name: test.name, success: false, error: error.message })
    }
  }
  
  return results
}

/**
 * Test data preparation functions
 */
export const testDataPreparation = () => {
  console.log('🧪 Testing data preparation functions...')
  
  const testProfile = generateTestProfile()
  const testLoanData = generateTestLoanData()
  const testReturnRecord = generateTestReturnRecord()
  
  const tests = [
    {
      name: 'Prepare Main Tab Data',
      test: () => {
        return gasUtils.prepareMainTabData(testProfile)
      }
    },
    {
      name: 'Prepare Loan Initiation Tab Data',
      test: () => {
        return gasUtils.prepareLoanInitiationTabData(testLoanData, testProfile)
      }
    },
    {
      name: 'Prepare RF Return Tab Data',
      test: () => {
        return gasUtils.prepareRFReturnTabData(testReturnRecord, testProfile)
      }
    }
  ]
  
  const results = []
  
  for (const test of tests) {
    try {
      console.log(`  Testing: ${test.name}`)
      const result = test.test()
      console.log(`  ✅ ${test.name} passed:`, result)
      results.push({ name: test.name, success: true, result })
    } catch (error) {
      console.error(`  ❌ ${test.name} failed:`, error)
      results.push({ name: test.name, success: false, error: error.message })
    }
  }
  
  return results
}

/**
 * Test activity logging
 */
export const testActivityLogging = async () => {
  console.log('🧪 Testing activity logging...')
  
  const tests = [
    {
      name: 'Log Simple Activity',
      test: async () => {
        return await gasUtils.logActivity('Test activity', { test: true })
      }
    },
    {
      name: 'Log Complex Activity',
      test: async () => {
        const complexData = {
          action: 'profile_update',
          userId: 'TEST001',
          changes: ['name', 'phone'],
          timestamp: new Date().toISOString()
        }
        return await gasUtils.logActivity('Profile updated', complexData)
      }
    }
  ]
  
  const results = []
  
  for (const test of tests) {
    try {
      console.log(`  Testing: ${test.name}`)
      const result = await test.test()
      console.log(`  ✅ ${test.name} passed:`, result)
      results.push({ name: test.name, success: true, result })
    } catch (error) {
      console.error(`  ❌ ${test.name} failed:`, error)
      results.push({ name: test.name, success: false, error: error.message })
    }
  }
  
  return results
}

/**
 * Run comprehensive test suite
 */
export const runComprehensiveTestSuite = async () => {
  console.log('🚀 Starting comprehensive GAS integration test suite...')
  console.log('=' * 60)
  
  const testResults = {
    connection: await testGASConnection(),
    emailNotifications: await testEmailNotifications(),
    sheetOperations: await testSheetOperations(),
    dataPreparation: testDataPreparation(),
    activityLogging: await testActivityLogging()
  }
  
  // Calculate overall success
  const allTests = [
    ...testResults.emailNotifications,
    ...testResults.sheetOperations,
    ...testResults.dataPreparation,
    ...testResults.activityLogging
  ]
  
  const passedTests = allTests.filter(test => test.success).length
  const totalTests = allTests.length
  const successRate = (passedTests / totalTests) * 100
  
  console.log('=' * 60)
  console.log('📊 Test Results Summary:')
  console.log(`  Total Tests: ${totalTests}`)
  console.log(`  Passed: ${passedTests}`)
  console.log(`  Failed: ${totalTests - passedTests}`)
  console.log(`  Success Rate: ${successRate.toFixed(2)}%`)
  
  if (successRate >= 80) {
    console.log('✅ Test suite passed! Ready for integration.')
  } else {
    console.log('❌ Test suite failed. Please fix issues before integration.')
  }
  
  return {
    success: successRate >= 80,
    successRate,
    results: testResults
  }
}

/**
 * Test specific functionality
 */
export const testSpecificFunctionality = async (functionName, testData) => {
  console.log(`🧪 Testing specific functionality: ${functionName}`)
  
  try {
    let result
    
    switch (functionName) {
      case 'sendNewLoanApprovalNotification':
        result = await gasUtils.sendNewLoanApprovalNotification(testData.loanData, testData.profile)
        break
      case 'sendPaymentApprovalNotification':
        result = await gasUtils.sendPaymentApprovalNotification(testData.paymentData, testData.profile)
        break
      case 'updateMainTabRow':
        result = await gasUtils.updateMainTabRow(testData.profile)
        break
      case 'addLoanInitiationRecord':
        result = await gasUtils.addLoanInitiationRecord(testData.loanData, testData.profile)
        break
      case 'addRFReturnRecord':
        result = await gasUtils.addRFReturnRecord(testData.returnRecord, testData.profile)
        break
      case 'logActivity':
        result = await gasUtils.logActivity(testData.activity, testData.data)
        break
      default:
        throw new Error(`Unknown function: ${functionName}`)
    }
    
    console.log(`✅ ${functionName} test passed:`, result)
    return { success: true, result }
    
  } catch (error) {
    console.error(`❌ ${functionName} test failed:`, error)
    return { success: false, error: error.message }
  }
}

export default {
  generateTestProfile,
  generateTestLoanData,
  generateTestReturnRecord,
  testGASConnection,
  testEmailNotifications,
  testSheetOperations,
  testDataPreparation,
  testActivityLogging,
  runComprehensiveTestSuite,
  testSpecificFunctionality
} 