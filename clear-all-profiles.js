/**
 * Clear ALL Profiles Script
 * Removes ALL profiles from the database (use with extreme caution)
 */

import { initializeApp } from 'firebase/app'
import { 
  getFirestore, 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  deleteDoc,
  query, 
  where, 
  orderBy,
  writeBatch,
  serverTimestamp 
} from 'firebase/firestore'

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

// Database constants
const COLLECTIONS = {
  PROFILES: 'profiles',
  SEARCH_ELEMENTS: 'SearchElements',
  PENDING_LOAN: 'pending-loan',
  NIC_DATA: 'NIC_data'
}

const PROFILE_FIELDS = {
  RF_LOANS: 'RF_Loans',
  GRANT: 'Grant'
}

/**
 * Get all profiles
 */
const getAllProfiles = async () => {
  try {
    const q = query(collection(db, COLLECTIONS.PROFILES), orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)
    const profiles = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    
    return { success: true, data: profiles }
  } catch (error) {
    console.error('Error getting profiles:', error)
    return { success: false, message: 'Failed to get profiles', error }
  }
}

/**
 * Get RF loans for a profile
 */
const getRFLoans = async (regId) => {
  try {
    const rfLoansQuery = query(collection(db, COLLECTIONS.PROFILES, regId, PROFILE_FIELDS.RF_LOANS))
    const snapshot = await getDocs(rfLoansQuery)
    
    const loans = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    
    return { success: true, data: loans }
  } catch (error) {
    console.error('Error getting RF loans:', error)
    return { success: false, message: 'Failed to get RF loans', error }
  }
}

/**
 * Get Grant loans for a profile
 */
const getGrantLoans = async (regId) => {
  try {
    const grantQuery = query(collection(db, COLLECTIONS.PROFILES, regId, PROFILE_FIELDS.GRANT))
    const snapshot = await getDocs(grantQuery)
    
    const loans = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    
    return { success: true, data: loans }
  } catch (error) {
    console.error('Error getting Grant loans:', error)
    return { success: false, message: 'Failed to get Grant loans', error }
  }
}

/**
 * Get pending loans from SearchElements
 */
const getPendingLoans = async () => {
  try {
    const pendingLoanRef = doc(db, COLLECTIONS.SEARCH_ELEMENTS, COLLECTIONS.PENDING_LOAN)
    const pendingLoanDoc = await getDoc(pendingLoanRef)
    
    if (!pendingLoanDoc.exists()) {
      return { success: true, data: [] }
    }
    
    const pendingData = pendingLoanDoc.data()
    const pendingRegIds = Object.keys(pendingData).filter(regId => pendingData[regId] === true)
    
    return { success: true, data: pendingRegIds }
  } catch (error) {
    console.error('Error getting pending loans:', error)
    return { success: false, message: 'Failed to get pending loans', error }
  }
}

/**
 * Delete profile and all subcollections
 */
const deleteProfile = async (regId) => {
  try {
    // Delete RF loans
    const rfLoans = await getRFLoans(regId)
    if (rfLoans.success) {
      const batch = writeBatch(db)
      rfLoans.data.forEach(loan => {
        const loanRef = doc(db, COLLECTIONS.PROFILES, regId, PROFILE_FIELDS.RF_LOANS, loan.id)
        batch.delete(loanRef)
      })
      await batch.commit()
    }
    
    // Delete Grant loans
    const grantLoans = await getGrantLoans(regId)
    if (grantLoans.success) {
      const batch = writeBatch(db)
      grantLoans.data.forEach(loan => {
        const loanRef = doc(db, COLLECTIONS.PROFILES, regId, PROFILE_FIELDS.GRANT, loan.id)
        batch.delete(loanRef)
      })
      await batch.commit()
    }    
    
    // Delete profile
    const profileRef = doc(db, COLLECTIONS.PROFILES, regId)
    await deleteDoc(profileRef)
    
    // Delete from search elements in pending loans 
    const pendingLoans = await getPendingLoans()
    if (pendingLoans.success && pendingLoans.data.includes(regId)) {
      const batch = writeBatch(db)
      batch.delete(doc(db, COLLECTIONS.SEARCH_ELEMENTS, COLLECTIONS.PENDING_LOAN, regId))
      await batch.commit()
    }

    return { success: true, message: 'Profile deleted successfully' }
  } catch (error) {
    console.error('Error deleting profile:', error)
    return { success: false, message: 'Failed to delete profile', error }
  }
}

/**
 * Get all profiles
 */
const getAllProfilesToDelete = async () => {
  try {
    console.log('🔍 Searching for all profiles...')
    
    const result = await getAllProfiles()
    
    if (!result.success) {
      console.error('❌ Failed to get profiles:', result.message)
      return []
    }
    
    console.log(`📊 Found ${result.data.length} total profiles`)
    
    return result.data
  } catch (error) {
    console.error('❌ Error getting profiles:', error)
    return []
  }
}

/**
 * Delete a single profile
 */
const deleteSingleProfile = async (profile) => {
  try {
    const regId = profile.Reg_ID || profile.id
    
    if (!regId) {
      console.warn('⚠️  Profile has no Reg_ID, skipping:', profile)
      return false
    }
    
    console.log(`🗑️  Deleting profile: ${regId} (${profile.fullName || profile.Name || 'Unknown'})`)
    
    const result = await deleteProfile(regId)
    
    if (result.success) {
      console.log(`✅ Successfully deleted profile: ${regId}`)
      return true
    } else {
      console.error(`❌ Failed to delete profile ${regId}:`, result.message)
      return false
    }
  } catch (error) {
    console.error(`❌ Error deleting profile ${profile.Reg_ID || profile.id}:`, error)
    return false
  }
}

/**
 * Clear ALL profiles
 */
const clearAllProfiles = async (dryRun = false) => {
  try {
    console.log('🧹 Starting ALL profiles cleanup...')
    console.log(dryRun ? '🔍 DRY RUN MODE - No profiles will be deleted' : '⚠️  LIVE MODE - ALL profiles will be deleted')
    
    const allProfiles = await getAllProfilesToDelete()
    
    if (allProfiles.length === 0) {
      console.log('✅ No profiles found to delete')
      return
    }
    
    console.log('\n📋 ALL profiles found:')
    allProfiles.forEach((profile, index) => {
      const regId = profile.Reg_ID || profile.id
      const name = profile.fullName || profile.Name || 'Unknown'
      console.log(`${index + 1}. ${regId} - ${name}`)
    })
    
    if (dryRun) {
      console.log('\n🔍 DRY RUN: Would delete', allProfiles.length, 'profiles')
      console.log('⚠️  WARNING: This would delete ALL profiles from the database!')
      return
    }
    
    console.log(`\n🗑️  Proceeding to delete ALL ${allProfiles.length} profiles...`)
    console.log('⚠️  WARNING: This will permanently delete ALL profiles from the database!')
    
    let deletedCount = 0
    let failedCount = 0
    
    for (const profile of allProfiles) {
      const success = await deleteSingleProfile(profile)
      if (success) {
        deletedCount++
      } else {
        failedCount++
      }
      
      // Add a small delay between deletions to avoid overwhelming the database
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
    
    console.log('\n📊 Cleanup Summary:')
    console.log(`✅ Successfully deleted: ${deletedCount} profiles`)
    console.log(`❌ Failed to delete: ${failedCount} profiles`)
    console.log(`📋 Total processed: ${allProfiles.length} profiles`)
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error)
  }
}

/**
 * Interactive mode - ask for confirmation before deleting
 */
const interactiveMode = async () => {
  const allProfiles = await getAllProfilesToDelete()
  
  if (allProfiles.length === 0) {
    console.log('✅ No profiles found')
    return
  }
  
  console.log('\n📋 ALL profiles to be deleted:')
  allProfiles.forEach((profile, index) => {
    const regId = profile.Reg_ID || profile.id
    const name = profile.fullName || profile.Name || 'Unknown'
    console.log(`${index + 1}. ${regId} - ${name}`)
  })
  
  console.log(`\n⚠️  WARNING: This will permanently delete ALL ${allProfiles.length} profiles from the database!`)
  console.log('This action cannot be undone!')
  console.log('Type "DELETE ALL" to confirm, or anything else to cancel:')
  
  // In a real environment, you would use readline or similar
  // For now, we'll simulate the confirmation
  const confirmation = process.argv.includes('--confirm')
  
  if (confirmation) {
    console.log('✅ Confirmed. Proceeding with deletion of ALL profiles...')
    await clearAllProfiles(false)
  } else {
    console.log('❌ Cancelled. No profiles were deleted.')
    console.log('Run with --confirm flag to actually delete ALL profiles.')
  }
}

// Main execution
const main = async () => {
  const args = process.argv.slice(2)
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
🧹 ALL Profiles Cleanup Script (DANGEROUS)

⚠️  WARNING: This script will delete ALL profiles from the database!
⚠️  This action cannot be undone!

Usage:
  node clear-all-profiles.js [options]

Options:
  --dry-run     Show what would be deleted without actually deleting
  --confirm     Actually delete ALL profiles (use with extreme caution)
  --interactive Run in interactive mode (default)
  --help        Show this help message

Examples:
  node clear-all-profiles.js --dry-run
  node clear-all-profiles.js --confirm
  node clear-all-profiles.js --interactive
`)
    return
  }
  
  if (args.includes('--dry-run')) {
    await clearAllProfiles(true)
  } else if (args.includes('--confirm')) {
    await clearAllProfiles(false)
  } else {
    await interactiveMode()
  }
}

// Run the script
main().catch(console.error)

export { clearAllProfiles, getAllProfilesToDelete } 