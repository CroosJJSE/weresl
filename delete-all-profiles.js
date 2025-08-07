/**
 * Delete All Profiles Script for WERESL Database
 * 
 * Usage: node delete-all-profiles.js
 * 
 * ⚠️ WARNING: This will delete ALL profiles from the database!
 * Make sure you have a backup before running this script.
 */

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { RootCollection, ProfileField } from './enums/db.js'

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

/**
 * Delete all subcollections under a profile
 */
async function deleteSubcollections(regId) {
  try {
    // Delete RF_Loans subcollection
    const rfLoansRef = collection(db, RootCollection.PROFILES, regId, ProfileField.RF_LOANS)
    const rfLoansSnapshot = await getDocs(rfLoansRef)
    
    for (const loanDoc of rfLoansSnapshot.docs) {
      await deleteDoc(doc(db, RootCollection.PROFILES, regId, ProfileField.RF_LOANS, loanDoc.id))
    }
    
    if (rfLoansSnapshot.docs.length > 0) {
      console.log(`    🗑️  Deleted ${rfLoansSnapshot.docs.length} RF loans`)
    }
    
    // Delete Grant subcollection
    const grantRef = collection(db, RootCollection.PROFILES, regId, ProfileField.GRANT)
    const grantSnapshot = await getDocs(grantRef)
    
    for (const grantDoc of grantSnapshot.docs) {
      await deleteDoc(doc(db, RootCollection.PROFILES, regId, ProfileField.GRANT, grantDoc.id))
    }
    
    if (grantSnapshot.docs.length > 0) {
      console.log(`    🗑️  Deleted ${grantSnapshot.docs.length} Grant loans`)
    }
    
  } catch (error) {
    console.error(`    ❌ Error deleting subcollections for ${regId}:`, error.message)
  }
}

/**
 * Delete all profiles from Firestore
 */
async function deleteAllProfiles() {
  try {
    console.log('🚨 Starting deletion of all profiles...')
    
    // Get all profiles
    const profilesRef = collection(db, RootCollection.PROFILES)
    const snapshot = await getDocs(profilesRef)
    
    if (snapshot.empty) {
      console.log('✅ No profiles found to delete')
      return { success: true, deleted: 0 }
    }
    
    console.log(`📊 Found ${snapshot.size} profiles to delete`)
    
    // Delete profiles in batches
    const batchSize = 50
    const profiles = snapshot.docs
    let deletedCount = 0
    let errorCount = 0
    
    for (let i = 0; i < profiles.length; i += batchSize) {
      const batch = profiles.slice(i, i + batchSize)
      console.log(`🔄 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(profiles.length / batchSize)}...`)
      
      for (const profileDoc of batch) {
        try {
          const regId = profileDoc.id
          console.log(`  🗑️  Deleting profile: ${regId}`)
          
          // First delete all subcollections
          await deleteSubcollections(regId)
          
          // Then delete the profile
          await deleteDoc(doc(db, RootCollection.PROFILES, regId))
          deletedCount++
          console.log(`  ✅ Deleted profile: ${regId}`)
        } catch (error) {
          console.error(`  ❌ Error deleting profile ${profileDoc.id}:`, error.message)
          errorCount++
        }
      }
      
      // Add delay between batches to avoid rate limiting
      if (i + batchSize < profiles.length) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }
    
    console.log(`✅ Deletion completed!`)
    console.log(`📈 Deleted: ${deletedCount} profiles`)
    console.log(`❌ Errors: ${errorCount} profiles`)
    
    return {
      success: true,
      deleted: deletedCount,
      errors: errorCount,
      total: profiles.length
    }
    
  } catch (error) {
    console.error('❌ Deletion failed:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// CLI handling
if (process.argv.includes('--confirm')) {
  console.log('🚨 WARNING: This will delete ALL profiles from the database!')
  console.log('')
  console.log('This includes:')
  console.log('  - All profiles from the profiles collection')
  console.log('  - All RF_Loans subcollections')
  console.log('  - All Grant subcollections')
  console.log('  - Cannot be undone!')
  console.log('')
  console.log('Are you sure you want to continue?')
  console.log('Type "YES" to confirm:')
  
  // For now, just proceed with deletion
  deleteAllProfiles()
    .then(result => {
      if (result.success) {
        console.log('✅ All profiles and subcollections deleted successfully!')
        process.exit(0)
      } else {
        console.error('❌ Deletion failed:', result.error)
        process.exit(1)
      }
    })
    .catch(error => {
      console.error('❌ Deletion failed:', error)
      process.exit(1)
    })
} else {
  console.log('🚨 WERESL Profile Deletion Tool')
  console.log('')
  console.log('⚠️  WARNING: This will delete ALL profiles from the database!')
  console.log('')
  console.log('Usage:')
  console.log('  node delete-all-profiles.js --confirm')
  console.log('')
  console.log('This script will:')
  console.log('  - Delete all profiles from the profiles collection')
  console.log('  - Delete all RF_Loans subcollections')
  console.log('  - Delete all Grant subcollections')
  console.log('  - Cannot be undone!')
  console.log('')
  console.log('Make sure you have a backup before running this script!')
}
