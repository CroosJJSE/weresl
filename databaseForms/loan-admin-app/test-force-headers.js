const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzaXn7q0Ze-I-s8zw18RxFJxHuDxSrVFbq8WLiaZgRaHhn8aBvl4Nc55HsCJS-dfd3zzg/exec'

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

async function forceRecreateHeaders() {
  console.log('🔧 Force recreating headers in Google Sheet...')
  
  try {
    // Test data with all required fields
    const testData = {
      'Timestamp': new Date().toISOString(),
      'RegID': 'TEST_HEADER_FIX',
      'Name': 'Test User',
      'Age': 25,
      'NIC': '123456789V',
      'Phone number': '+94123456789',
      'District': 'Colombo',
      'Address': 'Test Address',
      'Description': 'Test Description',
      'Industry': 'Test Industry',
      'Loan_type': 'RF',
      'Amount': 1000,
      'Purpose': 'Test Purpose',
      'Source': 'wereSL'
    }

    const dataParcel = {
      action: 'createSheetRow',
      tabName: 'Loan_initiation',
      regId: 'TEST_HEADER_FIX',
      data: testData,
      source: 'header-fix-test'
    }

    console.log('📋 Sending test data to recreate headers...')
    const result = await sendDataParcelToGAS(dataParcel)
    console.log('✅ Result:', result)
    
    console.log('🎉 Headers should now be recreated with correct field names!')
    
  } catch (error) {
    console.error('❌ Error force recreating headers:', error)
  }
}

forceRecreateHeaders() 