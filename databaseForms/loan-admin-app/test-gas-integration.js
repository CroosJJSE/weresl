/**
 * Test GAS Integration for Loan Admin App
 * This script tests the GAS integration functions
 */

// GAS Web App URL
const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzaXn7q0Ze-I-s8zw18RxFJxHuDxSrVFbq8WLiaZgRaHhn8aBvl4Nc55HsCJS-dfd3zzg/exec'

// Mock data for testing
const mockProfile = {
  regId: 'TEST001',
  fullName: 'John Doe',
  district: 'Colombo',
  address: '123 Test Street',
  nic: '123456789V',
  contact: '+94123456789',
  description: 'Test profile description',
  occupation: 'Software Developer',
  yearOfBirth: 1990
}

const mockLoanData = {
  type: 'RF',
  amount: 50000,
  purpose: 'Business expansion',
  source: 'Admin Approval'
}

const mockPaymentData = {
  amount: 10000,
  receiver: 'Admin'
}

// Helper function to send data to GAS
async function sendDataParcelToGAS(dataParcel) {
  try {
    const requestData = {
      action: dataParcel.action,
      tabName: dataParcel.tabName,
      regId: dataParcel.regId,
      data: JSON.stringify(dataParcel.data),
      timestamp: new Date().toISOString(),
      source: dataParcel.source || 'test-script',
      token: 'test-token'
    }

    const response = await fetch(GAS_WEB_APP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(requestData)
    })

    if (!response.ok) {
      throw new Error(`GAS request failed: ${response.status} ${response.statusText}`)
    }

    const result = await response.json()
    return result

  } catch (error) {
    console.error('Error sending data parcel to GAS:', error)
    throw error
  }
}

// Test loan initiation record
async function testLoanInitiationRecord() {
  const data = {
    'Timestamp': new Date().toISOString(),
    'RegID': mockProfile.regId,
    'Name': mockProfile.fullName,
    'Age': new Date().getFullYear() - mockProfile.yearOfBirth,
    'NIC': mockProfile.nic,
    'Phone number': mockProfile.contact,
    'District': mockProfile.district,
    'Address': mockProfile.address,
    'Description': mockProfile.description,
    'Industry': mockProfile.occupation,
    'Loan_type': mockLoanData.type,
    'Amount': mockLoanData.amount,
    'Purpose': mockLoanData.purpose,
    'Source': mockLoanData.source
  }

  const dataParcel = {
    action: 'createSheetRow',
    tabName: 'Loan_initiation',
    regId: mockProfile.regId,
    data: data,
    source: 'test-script'
  }

  return await sendDataParcelToGAS(dataParcel)
}

// Test RF return record
async function testRFReturnRecord() {
  const data = {
    'Timestamp': new Date().toISOString(),
    'RegID': mockProfile.regId,
    'Name': mockProfile.fullName,
    'Amount_Deposited': mockPaymentData.amount,
    'Receiver': mockPaymentData.receiver
  }

  const dataParcel = {
    action: 'createSheetRow',
    tabName: 'RF_return',
    regId: mockProfile.regId,
    data: data,
    source: 'test-script'
  }

  return await sendDataParcelToGAS(dataParcel)
}

// Test activity logging
async function testActivityLogging() {
  const requestData = {
    action: 'logActivity',
    activity: 'Test Activity',
    data: JSON.stringify({ regId: 'TEST001', test: true }),
    timestamp: new Date().toISOString(),
    source: 'test-script',
    token: 'test-token'
  }

  const response = await fetch(GAS_WEB_APP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(requestData)
  })

  if (!response.ok) {
    throw new Error(`GAS request failed: ${response.status} ${response.statusText}`)
  }

  const result = await response.json()
  return result
}

// Main test function
async function testGASIntegration() {
  console.log('🧪 Testing GAS Integration for Loan Admin App...')
  
  try {
    // Test loan initiation record
    console.log('\n📋 Testing Loan Initiation Record...')
    const loanResult = await testLoanInitiationRecord()
    console.log('✅ Loan initiation record result:', loanResult)
    
    // Test RF return record
    console.log('\n💰 Testing RF Return Record...')
    const paymentResult = await testRFReturnRecord()
    console.log('✅ RF return record result:', paymentResult)
    
    // Test activity logging
    console.log('\n📝 Testing Activity Logging...')
    const logResult = await testActivityLogging()
    console.log('✅ Activity log result:', logResult)
    
    console.log('\n🎉 All GAS integration tests passed!')
    
  } catch (error) {
    console.error('❌ GAS integration test failed:', error)
  }
}

// Run the test
testGASIntegration() 