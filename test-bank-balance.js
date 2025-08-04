/**
 * Test Bank Balance Functions
 * Demonstrates the getBankBalanceByName and updateBankBalance functions
 */

import { getBankBalanceByName, updateBankBalance } from './utils/dbUtils.js'

const testBankBalanceFunctions = async () => {
  console.log('🏦 Testing Bank Balance Functions\n')
  
  // Test getting balance for "wereSL" (formerly Tabitha Jayanthakumar)
  console.log('1. Getting bank balance for "wereSL"...')
  const balanceResult = await getBankBalanceByName('wereSL')
  
  if (balanceResult.success) {
    console.log('✅ Bank balance retrieved successfully')
    console.log(`   Name: ${balanceResult.data.name}`)
    console.log(`   Balance: ${balanceResult.data.balance}`)
    console.log(`   Position: ${balanceResult.data.position}`)
    console.log(`   Full Name: ${balanceResult.data.firstName} ${balanceResult.data.lastName}`)
  } else {
    console.log('❌ Failed to get bank balance:', balanceResult.message)
  }
  
  console.log('\n2. Updating bank balance for "wereSL"...')
  const newAmount = 5000
  const updateResult = await updateBankBalance('wereSL', newAmount)
  
  if (updateResult.success) {
    console.log('✅ Bank balance updated successfully')
    console.log(`   Name: ${updateResult.data.name}`)
    console.log(`   New Balance: ${updateResult.data.newBalance}`)
    console.log(`   Position: ${updateResult.data.position}`)
    console.log(`   Full Name: ${updateResult.data.firstName} ${updateResult.data.lastName}`)
  } else {
    console.log('❌ Failed to update bank balance:', updateResult.message)
  }
  
  console.log('\n3. Getting updated bank balance for "wereSL"...')
  const updatedBalanceResult = await getBankBalanceByName('wereSL')
  
  if (updatedBalanceResult.success) {
    console.log('✅ Updated bank balance retrieved successfully')
    console.log(`   Name: ${updatedBalanceResult.data.name}`)
    console.log(`   Balance: ${updatedBalanceResult.data.balance}`)
    console.log(`   Position: ${updatedBalanceResult.data.position}`)
  } else {
    console.log('❌ Failed to get updated bank balance:', updatedBalanceResult.message)
  }
  
  // Test with a non-existent account
  console.log('\n4. Testing with non-existent account "NonExistent"...')
  const nonExistentResult = await getBankBalanceByName('NonExistent')
  
  if (!nonExistentResult.success) {
    console.log('✅ Correctly handled non-existent account:', nonExistentResult.message)
  } else {
    console.log('❌ Unexpected success for non-existent account')
  }
  
  // Test updating with invalid amount
  console.log('\n5. Testing with invalid amount...')
  const invalidAmountResult = await updateBankBalance('wereSL', 'invalid')
  
  if (!invalidAmountResult.success) {
    console.log('✅ Correctly handled invalid amount:', invalidAmountResult.message)
  } else {
    console.log('❌ Unexpected success for invalid amount')
  }
  
  console.log('\n✅ Bank balance function tests completed!')
}

// Run the tests
testBankBalanceFunctions().catch(console.error) 