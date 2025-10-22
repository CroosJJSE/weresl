/**
 * Add Coordinator Field to All Profiles Script
 * 
 * This script adds a coordinator field to all existing profiles in the database.
 * The coordinator field references a bank account from the bank_accounts collection.
 * 
 * Additionally, it populates bank accounts with:
 * 1. profiles array - containing profile objects assigned to each coordinator
 * 2. activeRF_loan array - containing active RF loan information for each assigned profile
 * 
 * The coordinator.csv file contains:
 * - Column 1: Reg_ID (profile registration ID)
 * - Column 2: Coordinator name (bank account name)
 * 
 * Usage: node add-coordinator-field.js
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
import { getFirestore, collection, doc, getDocs, getDoc, updateDoc, serverTimestamp, arrayUnion } from 'firebase/firestore'

// Import utilities and enums
import { 
  ProfileField, 
  RootCollection,
  BANK_ACCOUNT_FIELD,
  RF_LOAN_FIELD
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
const BATCH_SIZE = 50 // Process profiles in batches

// Coordinator mapping from CSV
let coordinatorMapping = {}

/**
 * Load coordinator mapping from coordinator.csv
 */
async function loadCoordinatorMapping() {
  try {
    const csvPath = path.resolve(__dirname, 'coordinator.csv')
    
    if (!fs.existsSync(csvPath)) {
      throw new Error('coordinator.csv file not found')
    }
    
    const csvContent = fs.readFileSync(csvPath, 'utf8')
    const lines = csvContent.split('\n').filter(line => line.trim())
    
    if (lines.length === 0) {
      throw new Error('coordinator.csv is empty')
    }
    
    // Parse CSV lines
    for (const line of lines) {
      const [regId, coordinatorName] = line.split(',').map(field => field.trim())
      
      if (regId && coordinatorName) {
        coordinatorMapping[regId] = coordinatorName
      }
    }
    
    console.log(`📋 Loaded ${Object.keys(coordinatorMapping).length} coordinator mappings`)
    
  } catch (error) {
    console.error('❌ Error loading coordinator.csv:', error.message)
    throw error
  }
}

/**
 * Get bank account document ID by coordinator name
 */
async function getBankAccountIdByCoordinatorName(coordinatorName) {
  try {
    const bankAccountsRef = collection(db, RootCollection.BANK_ACCOUNTS)
    const snapshot = await getDocs(bankAccountsRef)
    
    for (const docSnapshot of snapshot.docs) {
      const bankAccountData = docSnapshot.data()
      
      // First check if document ID matches coordinator name
      if (docSnapshot.id === coordinatorName) {
        return docSnapshot.id
      }
      
      // Then check if full name matches coordinator name
      const fullName = `${bankAccountData[BANK_ACCOUNT_FIELD.FIRST_NAME] || ''} ${bankAccountData[BANK_ACCOUNT_FIELD.LAST_NAME] || ''}`.trim()
      
      if (fullName === coordinatorName) {
        return docSnapshot.id
      }
    }
    
    console.warn(`⚠️  Bank account not found for coordinator: ${coordinatorName}`)
    return null
    
  } catch (error) {
    console.error(`❌ Error finding bank account for ${coordinatorName}:`, error.message)
    return null
  }
}

/**
 * Add coordinator field to a single profile and update bank account profiles array
 */
async function addCoordinatorToProfile(regId, coordinatorName) {
  try {
    // Get bank account ID for the coordinator
    const bankAccountId = await getBankAccountIdByCoordinatorName(coordinatorName)
    
    if (!bankAccountId) {
      console.warn(`⚠️  Skipping ${regId} - coordinator bank account not found: ${coordinatorName}`)
      return false
    }
    
    // Update profile with coordinator field
    const profileRef = doc(db, RootCollection.PROFILES, regId)
    await updateDoc(profileRef, {
      coordinator: bankAccountId, // Use direct field name since ProfileField.COORDINATOR is 'coordinator'
      [ProfileField.LAST_UPDATED]: serverTimestamp()
    })
    
    // Update bank account with profiles array
    await addProfileToBankAccount(bankAccountId, regId)
    
    console.log(`✅ Added coordinator to ${regId}: ${coordinatorName} (${bankAccountId})`)
    return true
    
  } catch (error) {
    console.error(`❌ Error adding coordinator to ${regId}:`, error.message)
    return false
  }
}

/**
 * Get active RF loans for a profile
 * @param {string} regId - Profile Reg_ID
 * @returns {Array} Array of active RF loan objects
 */
async function getActiveRFLoans(regId) {
  try {
    const rfLoansRef = collection(db, RootCollection.PROFILES, regId, 'RF_Loans')
    const snapshot = await getDocs(rfLoansRef)
    
    const activeLoans = []
    
    for (const docSnapshot of snapshot.docs) {
      const loanData = docSnapshot.data()
      const loanId = docSnapshot.id
      
      // Check if loan is active (status is 'active' or 'approved')
      const status = loanData[RF_LOAN_FIELD.STATUS] || loanData.status
      if (status === 'active' || status === 'approved') {
        activeLoans.push({
          loanId: loanId,
          regId: regId,
          amount: loanData[RF_LOAN_FIELD.AMOUNT] || loanData.amount || 0,
          purpose: loanData[RF_LOAN_FIELD.PURPOSE] || loanData.purpose || '',
          currentBalance: loanData[RF_LOAN_FIELD.CURRENT_BALANCE] || loanData.currentBalance || 0,
          paymentHistory: [] // Empty for now, will be populated later
        })
      }
    }
    
    return activeLoans
  } catch (error) {
    console.error(`❌ Error getting active RF loans for ${regId}:`, error.message)
    return []
  }
}

/**
 * Add profile object to bank account profiles array
 */
async function addProfileToBankAccount(bankAccountId, regId) {
  try {
    const bankAccountRef = doc(db, RootCollection.BANK_ACCOUNTS, bankAccountId)
    
    // Get profile name for the active RF loan record
    const profileRef = doc(db, RootCollection.PROFILES, regId)
    const profileSnapshot = await getDoc(profileRef)
    let profileName = regId // Default to regId if name not found
    
    if (profileSnapshot.exists()) {
      const profileData = profileSnapshot.data()
      profileName = profileData[ProfileField.FULL_NAME] || profileData.fullName || regId
    }
    
    // Get active RF loans for this profile
    const activeRFLoans = await getActiveRFLoans(regId)
    
    // Create profile object with Reg_ID (can be extended later with more properties)
    const profileObject = {
      regId: regId,
      assignedAt: new Date() // Use regular Date instead of serverTimestamp for arrayUnion
    }
    
    // Create active RF loan objects
    const activeRFLoanObjects = activeRFLoans.map(loan => ({
      regId: regId,
      rfLoanId: loan.loanId,
      profileName: profileName,
      paymentHistory: loan.paymentHistory // Empty array for now
    }))
    
    // Use arrayUnion to add the profile object to the profiles array
    await updateDoc(bankAccountRef, {
      profiles: arrayUnion(profileObject),
      [BANK_ACCOUNT_FIELD.LAST_UPDATED]: serverTimestamp()
    })
    
    // Add active RF loans to the activeRF_loan array
    if (activeRFLoanObjects.length > 0) {
      await updateDoc(bankAccountRef, {
        [BANK_ACCOUNT_FIELD.ACTIVE_RF_LOAN]: arrayUnion(...activeRFLoanObjects),
        [BANK_ACCOUNT_FIELD.LAST_UPDATED]: serverTimestamp()
      })
      console.log(`  ✅ Added ${activeRFLoanObjects.length} active RF loan(s) for ${regId} to bank account ${bankAccountId}`)
    }
    
    console.log(`  ✅ Added profile object for ${regId} to bank account ${bankAccountId} profiles array`)
    
  } catch (error) {
    console.error(`❌ Error adding profile object for ${regId} to bank account ${bankAccountId}:`, error.message)
    throw error
  }
}

/**
 * Main function to add coordinator field to all profiles
 */
async function addCoordinatorFieldToAllProfiles() {
  try {
    console.log('🚀 Starting coordinator field addition...')
    
    // Load coordinator mapping
    await loadCoordinatorMapping()
    
    // Get all profiles
    const profilesRef = collection(db, RootCollection.PROFILES)
    const profilesSnapshot = await getDocs(profilesRef)
    
    console.log(`📊 Found ${profilesSnapshot.docs.length} profiles to process`)
    
    let processedCount = 0
    let successCount = 0
    let errorCount = 0
    let skippedCount = 0
    
    // Process profiles in batches
    const profiles = profilesSnapshot.docs
    const batches = []
    
    for (let i = 0; i < profiles.length; i += BATCH_SIZE) {
      batches.push(profiles.slice(i, i + BATCH_SIZE))
    }
    
    for (let i = 0; i < batches.length; i++) {
      console.log(`🔄 Processing batch ${i + 1}/${batches.length}...`)
      
      const batch = batches[i]
      
      for (const profileDoc of batch) {
        const regId = profileDoc.id
        const coordinatorName = coordinatorMapping[regId]
        
        processedCount++
        
        if (!coordinatorName) {
          console.warn(`⚠️  No coordinator mapping found for ${regId}`)
          skippedCount++
          continue
        }
        
        const success = await addCoordinatorToProfile(regId, coordinatorName)
        
        if (success) {
          successCount++
        } else {
          errorCount++
        }
        
        // Add small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100))
      }
      
      // Add delay between batches
      if (i < batches.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }
    
    console.log(`✅ Coordinator field addition completed!`)
    console.log(`📈 Processed: ${processedCount} profiles`)
    console.log(`✅ Success: ${successCount} profiles`)
    console.log(`❌ Errors: ${errorCount} profiles`)
    console.log(`⚠️  Skipped: ${skippedCount} profiles`)
    
    return {
      success: true,
      processed: processedCount,
      success: successCount,
      errors: errorCount,
      skipped: skippedCount
    }
    
  } catch (error) {
    console.error('❌ Coordinator field addition failed:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Test coordinator mapping loading
 */
function testCoordinatorMapping() {
  console.log('🧪 Testing coordinator mapping...')
  
  // Load coordinator mapping
  loadCoordinatorMapping()
    .then(() => {
      console.log('\n📋 Sample coordinator mappings:')
      const sampleEntries = Object.entries(coordinatorMapping).slice(0, 10)
      sampleEntries.forEach(([regId, coordinatorName]) => {
        console.log(`  ${regId}: ${coordinatorName}`)
      })
      
      console.log(`\n✅ Total mappings: ${Object.keys(coordinatorMapping).length}`)
    })
    .catch(error => {
      console.error('❌ Error testing coordinator mapping:', error.message)
    })
}

/**
 * Test bank account lookup
 */
async function testBankAccountLookup() {
  console.log('🧪 Testing bank account lookup...')
  
  try {
    // Load coordinator mapping first
    await loadCoordinatorMapping()
    
    // Test with specific coordinator names including wereSL
    const testCoordinators = ['wereSL', 'Tabitha Jayanthakumar', 'Krishayini Jeyaprakash', 'Amanda Himalshi', 'Nilany Nadhan']
    
    for (const coordinatorName of testCoordinators) {
      const bankAccountId = await getBankAccountIdByCoordinatorName(coordinatorName)
      console.log(`  ${coordinatorName}: ${bankAccountId || 'Not found'}`)
    }
    
  } catch (error) {
    console.error('❌ Error testing bank account lookup:', error.message)
  }
}

// CLI handling
if (process.argv.length > 2) {
  const command = process.argv[2]
  
  if (command === 'test-mapping') {
    testCoordinatorMapping()
    process.exit(0)
  }
  
  if (command === 'test-lookup') {
    testBankAccountLookup()
      .then(() => process.exit(0))
      .catch(error => {
        console.error('❌ Test failed:', error)
        process.exit(1)
      })
  }
}

// Run the main function if no specific command
if (process.argv.length === 2) {
  addCoordinatorFieldToAllProfiles()
    .then(result => {
      if (result.success) {
        console.log('✅ Coordinator field addition completed successfully!')
        process.exit(0)
      } else {
        console.error('❌ Coordinator field addition failed:', result.error)
        process.exit(1)
      }
    })
    .catch(error => {
      console.error('❌ Coordinator field addition failed:', error)
      process.exit(1)
    })
} else {
  console.log('📋 WERESL Coordinator Field Addition Tool')
  console.log('')
  console.log('Usage:')
  console.log('  node add-coordinator-field.js                    # Add coordinator field to all profiles')
  console.log('  node add-coordinator-field.js test-mapping      # Test coordinator mapping loading')
  console.log('  node add-coordinator-field.js test-lookup       # Test bank account lookup')
  console.log('')
  console.log('Requirements:')
  console.log('  - coordinator.csv file in the same directory')
  console.log('  - Bank accounts must exist in the bank_accounts collection')
  console.log('  - Coordinator names in CSV must match bank account full names')
  console.log('')
  console.log('CSV Format:')
  console.log('  Reg_ID,CoordinatorName')
  console.log('  ANU001,wereSL')
  console.log('  BAD001,Tabitha Jayanthakumar')
  console.log('')
  console.log('✅ This script adds coordinator field to all profiles')
  console.log('   - Field name: coordinator (references bank account document ID)')
  console.log('   - Updates lastUpdated timestamp')
  console.log('   - Skips profiles without coordinator mapping')
}
