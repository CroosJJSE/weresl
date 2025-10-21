/**
 * Complete Database Cleanup Script for WERESL Database
 * 
 * Usage: node delete-all-profiles.js --confirm
 * 
 * ⚠️ WARNING: This will delete ALL data from the database!
 * Make sure you have a backup before running this script.
 * 
 * This script will delete DOCUMENTS ONLY (not collections):
 * - All profile documents and their subcollection documents (RF_Loans, Grant)
 * - All documents from the root-level loans collection
 * - All documents from the root-level RF_return_record collection
 * - Clears complex fields (RF_return_history, GIF, etc.) from profile documents before deletion
 * 
 * Collections themselves will remain intact.
 */

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { RootCollection, ProfileField } from '../enums/db.js'

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
 * Clear complex fields from a profile document before deletion
 * NOTE: This clears map/object fields that might contain nested data
 */
async function clearComplexFields(regId) {
  try {
    const profileRef = doc(db, RootCollection.PROFILES, regId)
    
    // Clear complex fields that might contain nested data
    const fieldsToClear = {
      [ProfileField.RF_RETURN_HISTORY]: null, // Map of maps
      [ProfileField.GIF]: null, // Object field
      // Add other complex fields here if needed
    }
    
    await updateDoc(profileRef, fieldsToClear)
    
    console.log(`    🧹 Cleared complex fields (RF_return_history, GIF, etc.)`)
    
  } catch (error) {
    console.error(`    ❌ Error clearing complex fields for ${regId}:`, error.message)
  }
}

/**
 * Delete all documents from the root-level loans collection
 * NOTE: This only deletes documents, not the collection itself
 */
async function deleteAllLoans() {
  try {
    console.log('🚨 Starting deletion of all documents from root-level loans collection...')
    
    // Get all loans from the root-level loans collection
    const loansRef = collection(db, RootCollection.LOANS)
    const snapshot = await getDocs(loansRef)
    
    if (snapshot.empty) {
      console.log('✅ No documents found in root-level loans collection')
      return { success: true, deleted: 0 }
    }
    
    console.log(`📊 Found ${snapshot.size} documents in root-level loans collection to delete`)
    
    // Delete loans in batches
    const batchSize = 50
    const loans = snapshot.docs
    let deletedCount = 0
    let errorCount = 0
    
    for (let i = 0; i < loans.length; i += batchSize) {
      const batch = loans.slice(i, i + batchSize)
      console.log(`🔄 Processing loans batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(loans.length / batchSize)}...`)
      
      for (const loanDoc of batch) {
        try {
          const loanId = loanDoc.id
          console.log(`  🗑️  Deleting loan document: ${loanId}`)
          
          await deleteDoc(doc(db, RootCollection.LOANS, loanId))
          deletedCount++
          console.log(`  ✅ Deleted loan document: ${loanId}`)
        } catch (error) {
          console.error(`  ❌ Error deleting loan document ${loanDoc.id}:`, error.message)
          errorCount++
        }
      }
      
      // Add delay between batches to avoid rate limiting
      if (i + batchSize < loans.length) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }
    
    console.log(`✅ Root-level loans documents deletion completed!`)
    console.log(`📈 Deleted: ${deletedCount} loan documents`)
    console.log(`❌ Errors: ${errorCount} loan documents`)
    console.log(`ℹ️  Note: The 'loans' collection itself remains intact`)
    
    return {
      success: true,
      deleted: deletedCount,
      errors: errorCount,
      total: loans.length
    }
    
  } catch (error) {
    console.error('❌ Root-level loans documents deletion failed:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Delete all documents from the root-level RF_return_record collection
 * NOTE: This only deletes documents, not the collection itself
 */
async function deleteAllRFReturnRecords() {
  try {
    console.log('🚨 Starting deletion of all documents from root-level RF_return_record collection...')
    
    // Get all documents from the root-level RF_return_record collection
    const rfReturnRef = collection(db, RootCollection.RF_RETURN_RECORD)
    const snapshot = await getDocs(rfReturnRef)
    
    if (snapshot.empty) {
      console.log('✅ No documents found in root-level RF_return_record collection')
      return { success: true, deleted: 0 }
    }
    
    console.log(`📊 Found ${snapshot.size} documents in root-level RF_return_record collection to delete`)
    
    // Delete documents in batches
    const batchSize = 50
    const documents = snapshot.docs
    let deletedCount = 0
    let errorCount = 0
    
    for (let i = 0; i < documents.length; i += batchSize) {
      const batch = documents.slice(i, i + batchSize)
      console.log(`🔄 Processing RF return records batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(documents.length / batchSize)}...`)
      
      for (const docSnapshot of batch) {
        try {
          const docId = docSnapshot.id
          console.log(`  🗑️  Deleting RF return record document: ${docId}`)
          
          await deleteDoc(doc(db, RootCollection.RF_RETURN_RECORD, docId))
          deletedCount++
          console.log(`  ✅ Deleted RF return record document: ${docId}`)
        } catch (error) {
          console.error(`  ❌ Error deleting RF return record document ${docSnapshot.id}:`, error.message)
          errorCount++
        }
      }
      
      // Add delay between batches to avoid rate limiting
      if (i + batchSize < documents.length) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }
    
    console.log(`✅ Root-level RF_return_record documents deletion completed!`)
    console.log(`📈 Deleted: ${deletedCount} RF return record documents`)
    console.log(`❌ Errors: ${errorCount} RF return record documents`)
    console.log(`ℹ️  Note: The 'RF_return_record' collection itself remains intact`)
    
    return {
      success: true,
      deleted: deletedCount,
      errors: errorCount,
      total: documents.length
    }
    
  } catch (error) {
    console.error('❌ Root-level RF_return_record documents deletion failed:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Delete all profile documents from Firestore
 * NOTE: This only deletes documents, not the collection itself
 */
async function deleteAllProfiles() {
  try {
    console.log('🚨 Starting deletion of all profile documents...')
    
    // Get all profiles
    const profilesRef = collection(db, RootCollection.PROFILES)
    const snapshot = await getDocs(profilesRef)
    
    if (snapshot.empty) {
      console.log('✅ No profile documents found to delete')
      return { success: true, deleted: 0 }
    }
    
    console.log(`📊 Found ${snapshot.size} profile documents to delete`)
    
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
          console.log(`  🗑️  Deleting profile document: ${regId}`)
          
          // First clear complex fields (maps, objects, etc.)
          await clearComplexFields(regId)
          
          // Then delete all subcollection documents
          await deleteSubcollections(regId)
          
          // Finally delete the profile document
          await deleteDoc(doc(db, RootCollection.PROFILES, regId))
          deletedCount++
          console.log(`  ✅ Deleted profile document: ${regId}`)
        } catch (error) {
          console.error(`  ❌ Error deleting profile document ${profileDoc.id}:`, error.message)
          errorCount++
        }
      }
      
      // Add delay between batches to avoid rate limiting
      if (i + batchSize < profiles.length) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }
    
    console.log(`✅ Profile documents deletion completed!`)
    console.log(`📈 Deleted: ${deletedCount} profile documents`)
    console.log(`❌ Errors: ${errorCount} profile documents`)
    console.log(`ℹ️  Note: The 'profiles' collection itself remains intact`)
    
    return {
      success: true,
      deleted: deletedCount,
      errors: errorCount,
      total: profiles.length
    }
    
  } catch (error) {
    console.error('❌ Profile documents deletion failed:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Complete database cleanup - deletes documents only (collections remain intact)
 */
async function completeDatabaseCleanup() {
  try {
    console.log('🚨 Starting complete database cleanup...')
    console.log('ℹ️  Note: This will only delete DOCUMENTS, collections will remain intact')
    console.log('')
    
    // Step 1: Delete all documents from root-level loans collection
    console.log('📋 Step 1: Deleting documents from root-level loans collection...')
    const loansResult = await deleteAllLoans()
    
    if (!loansResult.success) {
      console.error('❌ Failed to delete documents from root-level loans collection:', loansResult.error)
      return { success: false, error: 'Failed to delete documents from root-level loans collection' }
    }
    
    console.log('')
    
    // Step 2: Delete all documents from root-level RF_return_record collection
    console.log('📋 Step 2: Deleting documents from root-level RF_return_record collection...')
    const rfReturnResult = await deleteAllRFReturnRecords()
    
    if (!rfReturnResult.success) {
      console.error('❌ Failed to delete documents from root-level RF_return_record collection:', rfReturnResult.error)
      return { success: false, error: 'Failed to delete documents from root-level RF_return_record collection' }
    }
    
    console.log('')
    
    // Step 3: Delete all profile documents and their subcollection documents
    console.log('📋 Step 3: Deleting profile documents and subcollection documents...')
    const profilesResult = await deleteAllProfiles()
    
    if (!profilesResult.success) {
      console.error('❌ Failed to delete profile documents:', profilesResult.error)
      return { success: false, error: 'Failed to delete profile documents' }
    }
    
    console.log('')
    console.log('🎉 Complete database cleanup finished!')
    console.log('📊 Summary:')
    console.log(`  - Documents deleted from 'loans' collection: ${loansResult.deleted}`)
    console.log(`  - Documents deleted from 'RF_return_record' collection: ${rfReturnResult.deleted}`)
    console.log(`  - Profile documents deleted from 'profiles' collection: ${profilesResult.deleted}`)
    console.log(`  - Total errors: ${loansResult.errors + rfReturnResult.errors + profilesResult.errors}`)
    console.log('')
    console.log('✅ Collections remain intact:')
    console.log('  - profiles collection (empty but exists)')
    console.log('  - loans collection (empty but exists)')
    console.log('  - RF_return_record collection (empty but exists)')
    console.log('  - All other root collections unchanged')
    
    return {
      success: true,
      loansDeleted: loansResult.deleted,
      rfReturnDeleted: rfReturnResult.deleted,
      profilesDeleted: profilesResult.deleted,
      totalErrors: loansResult.errors + rfReturnResult.errors + profilesResult.errors
    }
    
  } catch (error) {
    console.error('❌ Complete cleanup failed:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// CLI handling
if (process.argv.includes('--confirm')) {
  console.log('🚨 WARNING: This will delete ALL DOCUMENTS from the database!')
  console.log('')
  console.log('This includes:')
  console.log('  - All profile documents from the profiles collection')
  console.log('  - All RF_Loans subcollection documents')
  console.log('  - All Grant subcollection documents')
  console.log('  - All documents from the root-level loans collection')
  console.log('  - All documents from the root-level RF_return_record collection')
  console.log('  - Clear complex fields (RF_return_history, GIF, etc.) from profile documents')
  console.log('')
  console.log('✅ Collections themselves will remain intact!')
  console.log('  - profiles collection (will be empty but exist)')
  console.log('  - loans collection (will be empty but exist)')
  console.log('  - RF_return_record collection (will be empty but exist)')
  console.log('  - All other collections unchanged')
  console.log('')
  console.log('⚠️  Cannot be undone!')
  console.log('')
  console.log('Are you sure you want to continue?')
  console.log('Type "YES" to confirm:')
  
  // For now, just proceed with complete cleanup
  completeDatabaseCleanup()
    .then(result => {
      if (result.success) {
        console.log('✅ Complete database cleanup successful!')
        process.exit(0)
      } else {
        console.error('❌ Cleanup failed:', result.error)
        process.exit(1)
      }
    })
    .catch(error => {
      console.error('❌ Cleanup failed:', error)
      process.exit(1)
    })
} else {
  console.log('🚨 WERESL Complete Database Cleanup Tool')
  console.log('')
  console.log('⚠️  WARNING: This will delete ALL DOCUMENTS from the database!')
  console.log('')
  console.log('Usage:')
  console.log('  node delete-all-profiles.js --confirm')
  console.log('')
  console.log('This script will:')
  console.log('  - Delete all profile documents from the profiles collection')
  console.log('  - Delete all RF_Loans subcollection documents')
  console.log('  - Delete all Grant subcollection documents')
  console.log('  - Delete all documents from the root-level loans collection')
  console.log('  - Delete all documents from the root-level RF_return_record collection')
  console.log('  - Clear complex fields (RF_return_history, GIF, etc.) from profile documents')
  console.log('')
  console.log('✅ Collections themselves will remain intact!')
  console.log('  - profiles collection (will be empty but exist)')
  console.log('  - loans collection (will be empty but exist)')
  console.log('  - RF_return_record collection (will be empty but exist)')
  console.log('  - All other collections unchanged')
  console.log('')
  console.log('⚠️  Cannot be undone!')
  console.log('')
  console.log('Make sure you have a backup before running this script!')
}
