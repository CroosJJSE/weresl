/**
 * Fix Undefined Coordinator Field Script
 * 
 * This script fixes profiles that have an "undefined" field containing coordinator names.
 * It renames the "undefined" field to "coordinator" (the correct field name).
 * 
 * Usage: node fix-undefined-coordinator-field.js
 */

import { initializeApp } from 'firebase/app'
import { 
  getFirestore, 
  collection, 
  doc, 
  getDocs, 
  getDoc,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore'

// Import utilities and enums
import { 
  ProfileField, 
  RootCollection,
  BANK_ACCOUNT_FIELD
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

const BATCH_SIZE = 50

/**
 * Get bank account document ID by coordinator name
 */
async function getBankAccountIdByCoordinatorName(coordinatorName) {
  try {
    const bankAccountsRef = collection(db, RootCollection.BANK_ACCOUNTS)
    const snapshot = await getDocs(bankAccountsRef)
    
    for (const docSnapshot of snapshot.docs) {
      // First check if document ID matches coordinator name
      if (docSnapshot.id === coordinatorName) {
        return docSnapshot.id
      }
      
      // Then check if full name matches coordinator name
      const bankAccountData = docSnapshot.data()
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
 * Fix undefined field in a single profile
 */
async function fixProfileUndefinedField(profileDoc) {
  try {
    const regId = profileDoc.id
    const profileData = profileDoc.data()
    
    // Check if profile has "undefined" field
    if (profileData.undefined !== undefined) {
      const coordinatorName = profileData.undefined
      
      console.log(`🔧 Fixing ${regId}: Moving "undefined" field (${coordinatorName}) to "coordinator"`)
      
      // Try to find bank account ID for the coordinator name
      const bankAccountId = await getBankAccountIdByCoordinatorName(coordinatorName)
      
      // Update profile: remove undefined field and set coordinator field
      const profileRef = doc(db, RootCollection.PROFILES, regId)
      const updateData = {
        undefined: null, // Remove the undefined field
        [ProfileField.LAST_UPDATED]: serverTimestamp()
      }
      
      if (bankAccountId) {
        // Use bank account ID if found
        updateData[ProfileField.COORDINATOR] = bankAccountId
        console.log(`✅ Fixed ${regId}: Set coordinator to bank account ID "${bankAccountId}" (${coordinatorName})`)
      } else {
        // Fallback: use coordinator name if bank account not found
        updateData[ProfileField.COORDINATOR] = coordinatorName
        console.log(`⚠️  Fixed ${regId}: Set coordinator to name "${coordinatorName}" (bank account ID not found)`)
      }
      
      await updateDoc(profileRef, updateData)
      
      return { success: true, regId, coordinatorName, bankAccountId }
    }
    
    return { success: false, regId, reason: 'No undefined field found' }
  } catch (error) {
    console.error(`❌ Error fixing profile ${profileDoc.id}:`, error.message)
    return { success: false, regId: profileDoc.id, error: error.message }
  }
}

/**
 * Main function to fix all profiles with undefined field
 */
async function fixAllUndefinedFields() {
  try {
    console.log('🚀 Starting undefined field fix...')
    console.log('📋 This script will:')
    console.log('   1. Find all profiles with "undefined" field')
    console.log('   2. Move the value to "coordinator" field')
    console.log('   3. Remove the "undefined" field')
    console.log('')
    
    // Get all profiles
    const profilesRef = collection(db, RootCollection.PROFILES)
    const profilesSnapshot = await getDocs(profilesRef)
    
    console.log(`📊 Found ${profilesSnapshot.docs.length} profiles to check`)
    console.log('')
    
    let processedCount = 0
    let fixedCount = 0
    let skippedCount = 0
    let errorCount = 0
    const fixedProfiles = []
    
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
        const result = await fixProfileUndefinedField(profileDoc)
        processedCount++
        
        if (result.success) {
          fixedCount++
          fixedProfiles.push({
            regId: result.regId,
            coordinatorName: result.coordinatorName
          })
        } else if (result.reason === 'No undefined field found') {
          skippedCount++
        } else {
          errorCount++
        }
        
        // Add small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 50))
      }
      
      // Add delay between batches
      if (i < batches.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    }
    
    console.log('')
    console.log('✅ Undefined field fix completed!')
    console.log('')
    console.log('📈 Summary:')
    console.log(`   Processed: ${processedCount} profiles`)
    console.log(`   Fixed: ${fixedCount} profiles`)
    console.log(`   Skipped: ${skippedCount} profiles (no undefined field)`)
    console.log(`   Errors: ${errorCount} profiles`)
    console.log('')
    
    if (fixedProfiles.length > 0) {
      console.log('📋 Fixed Profiles:')
      fixedProfiles.forEach(({ regId, coordinatorName }) => {
        console.log(`   ${regId}: ${coordinatorName}`)
      })
      console.log('')
    }
    
    return {
      success: true,
      processed: processedCount,
      fixed: fixedCount,
      skipped: skippedCount,
      errors: errorCount,
      fixedProfiles
    }
  } catch (error) {
    console.error('❌ Undefined field fix failed:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Test function to check how many profiles have undefined field
 */
async function checkUndefinedFields() {
  try {
    console.log('🔍 Checking for profiles with "undefined" field...')
    console.log('')
    
    const profilesRef = collection(db, RootCollection.PROFILES)
    const profilesSnapshot = await getDocs(profilesRef)
    
    const profilesWithUndefined = []
    
    profilesSnapshot.docs.forEach(doc => {
      const data = doc.data()
      if (data.undefined !== undefined) {
        profilesWithUndefined.push({
          regId: doc.id,
          coordinatorName: data.undefined,
          fullName: data[ProfileField.FULL_NAME] || data.fullName || 'N/A'
        })
      }
    })
    
    console.log(`📊 Found ${profilesWithUndefined.length} profiles with "undefined" field:`)
    console.log('')
    
    if (profilesWithUndefined.length > 0) {
      profilesWithUndefined.forEach(({ regId, coordinatorName, fullName }) => {
        console.log(`   ${regId}: ${fullName} -> Coordinator: ${coordinatorName}`)
      })
      console.log('')
    }
    
    return profilesWithUndefined
  } catch (error) {
    console.error('❌ Error checking undefined fields:', error)
    return []
  }
}

// Main execution
const command = process.argv[2]

if (command === 'check') {
  checkUndefinedFields()
    .then(() => {
      console.log('✅ Check completed')
      process.exit(0)
    })
    .catch(error => {
      console.error('❌ Check failed:', error)
      process.exit(1)
    })
} else if (command === 'fix' || !command) {
  fixAllUndefinedFields()
    .then(result => {
      if (result.success) {
        console.log('✅ Fix completed successfully!')
        process.exit(0)
      } else {
        console.error('❌ Fix failed:', result.error)
        process.exit(1)
      }
    })
    .catch(error => {
      console.error('❌ Fix failed:', error)
      process.exit(1)
    })
} else {
  console.log('📋 WERESL Undefined Field Fix Tool')
  console.log('')
  console.log('Usage:')
  console.log('  node fix-undefined-coordinator-field.js check    # Check for profiles with undefined field')
  console.log('  node fix-undefined-coordinator-field.js fix      # Fix all profiles with undefined field')
  console.log('  node fix-undefined-coordinator-field.js          # Same as "fix"')
  console.log('')
  process.exit(0)
}

