const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzaXn7q0Ze-I-s8zw18RxFJxHuDxSrVFbq8WLiaZgRaHhn8aBvl4Nc55HsCJS-dfd3zzg/exec'

async function debugHeaders(tabName) {
  const requestData = {
    action: 'debugHeaders',
    tabName: tabName,
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

async function testHeaders() {
  console.log('🔍 Debugging Google Sheet Headers...')
  
  try {
    // Check Loan_initiation headers
    console.log('\n📋 Checking Loan_initiation headers...')
    const loanHeaders = await debugHeaders('Loan_initiation')
    console.log('✅ Loan_initiation headers:', loanHeaders)
    
    // Check RF_return headers
    console.log('\n💰 Checking RF_return headers...')
    const rfHeaders = await debugHeaders('RF_return')
    console.log('✅ RF_return headers:', rfHeaders)
    
    // Check Main headers
    console.log('\n📊 Checking Main headers...')
    const mainHeaders = await debugHeaders('Main')
    console.log('✅ Main headers:', mainHeaders)
    
  } catch (error) {
    console.error('❌ Error debugging headers:', error)
  }
}

testHeaders() 