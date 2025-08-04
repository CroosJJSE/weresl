/**
 * Test script for bank account management functions
 * Run this to test the bank account functionality
 */

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvVQvVQvVQvVQvVQvVQvVQvVQvVQvVQvVQ",
  authDomain: "weresl-database.firebaseapp.com",
  projectId: "weresl-database",
  storageBucket: "weresl-database.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdefghijklmnop"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Import the functions we want to test
import { 
  getAllBankAccounts, 
  getBankBalanceByName, 
  updateBankBalance, 
  transferMoneyBetweenAccounts 
} from './src/utils/dbUtils.js'

async function testBankAccountFunctions() {
  console.log('🧪 Testing Bank Account Management Functions...')
  
  try {
    // Test 1: Get all bank accounts
    console.log('\n📋 Test 1: Getting all bank accounts...')
    const accountsResult = await getAllBankAccounts()
    console.log('Result:', accountsResult)
    
    if (accountsResult.success) {
      console.log('✅ Successfully loaded', accountsResult.data.length, 'bank accounts')
      
      // Test 2: Get wereSL balance
      console.log('\n💰 Test 2: Getting wereSL balance...')
      const wereSLResult = await getBankBalanceByName('wereSL')
      console.log('wereSL Result:', wereSLResult)
      
      if (wereSLResult.success) {
        console.log('✅ wereSL balance:', wereSLResult.data.balance)
        
        // Test 3: Update wereSL balance (add 1000)
        console.log('\n🔄 Test 3: Updating wereSL balance...')
        const newBalance = wereSLResult.data.balance + 1000
        const updateResult = await updateBankBalance('wereSL', newBalance)
        console.log('Update Result:', updateResult)
        
        if (updateResult.success) {
          console.log('✅ Successfully updated wereSL balance to:', updateResult.data.newBalance)
          
          // Test 4: Transfer money (if there are other accounts)
          if (accountsResult.data.length > 1) {
            const otherAccount = accountsResult.data.find(acc => acc.name !== 'wereSL')
            if (otherAccount) {
              console.log('\n💸 Test 4: Transferring money...')
              const transferResult = await transferMoneyBetweenAccounts('wereSL', otherAccount.name, 500)
              console.log('Transfer Result:', transferResult)
              
              if (transferResult.success) {
                console.log('✅ Successfully transferred money')
              } else {
                console.log('❌ Transfer failed:', transferResult.message)
              }
            }
          }
        } else {
          console.log('❌ Update failed:', updateResult.message)
        }
      } else {
        console.log('❌ Failed to get wereSL balance:', wereSLResult.message)
      }
    } else {
      console.log('❌ Failed to get bank accounts:', accountsResult.message)
    }
    
  } catch (error) {
    console.error('❌ Test failed with error:', error)
  }
  
  console.log('\n🏁 Test completed!')
}

// Run the test
testBankAccountFunctions() 