/**
 * Clear Test Profiles Script - Standalone Version
 * Safely removes test profiles from the database
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

// Test profile identifiers
const TEST_PROFILE_INDICATORS = [
  'test',
  'demo',
  'sample',
  'example',
  'temp',
  'temporary',
  'dummy',
  'fake',
  'mock'
]

// Test names that indicate test profiles
const TEST_NAMES = [
  'test user',
  'demo user',
  'sample user',
  'example user',
  'john doe',
  'jane doe',
  'test person',
  'demo person'
]

/**
 * Check if a profile is a test profile
 */
const isTestProfile = (profile) => {
  const fullName = (profile.fullName || profile.Name || '').toLowerCase()
  const regId = (profile.Reg_ID || profile.id || '').toLowerCase()
  const description = (profile.description || profile.Description || '').toLowerCase()
  
  // Check registration ID for test indicators
  for (const indicator of TEST_PROFILE_INDICATORS) {
    if (regId.includes(indicator)) {
      return true
    }
  }
  
  // Check full name for test indicators
  for (const testName of TEST_NAMES) {
    if (fullName.includes(testName)) {
      return true
    }
  }
  
  // Check description for test indicators
  for (const indicator of TEST_PROFILE_INDICATORS) {
    if (description.includes(indicator)) {
      return true
    }
  }
  
  // Check for obvious test data patterns
  if (fullName.includes('test') || fullName.includes('demo')) {
    return true
  }
  
  // Check for placeholder data
  if (fullName === 'test' || fullName === 'demo' || fullName === 'sample') {
    return true
  }
  
  return false
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
 * Get all test profiles
 */
const getTestProfiles = async () => {
  try {
    console.log('🔍 Searching for test profiles...')
    
    const result = await getAllProfiles()
    
    if (!result.success) {
      console.error('❌ Failed to get profiles:', result.message)
      return []
    }
    
    const testProfiles = result.data.filter(isTestProfile)
    
    console.log(`📊 Found ${result.data.length} total profiles`)
    console.log(`🧪 Found ${testProfiles.length} test profiles`)
    
    return testProfiles
  } catch (error) {
    console.error('❌ Error getting test profiles:', error)
    return []
  }
}

/**
 * Delete a single test profile
 */
const deleteTestProfile = async (profile) => {
  try {
    const regId = profile.Reg_ID || profile.id
    
    if (!regId) {
      console.warn('⚠️  Profile has no Reg_ID, skipping:', profile)
      return false
    }
    
    console.log(`🗑️  Deleting test profile: ${regId} (${profile.fullName || profile.Name})`)
    
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
 * Clear all test profiles
 */
const clearTestProfiles = async (dryRun = false) => {
  try {
    console.log('🧹 Starting test profile cleanup...')
    console.log(dryRun ? '🔍 DRY RUN MODE - No profiles will be deleted' : '⚠️  LIVE MODE - Profiles will be deleted')
    
    const testProfiles = await getTestProfiles()
    
    if (testProfiles.length === 0) {
      console.log('✅ No test profiles found to delete')
      return
    }
    
    console.log('\n📋 Test profiles found:')
    testProfiles.forEach((profile, index) => {
      const regId = profile.Reg_ID || profile.id
      const name = profile.fullName || profile.Name || 'Unknown'
      console.log(`${index + 1}. ${regId} - ${name}`)
    })
    
    if (dryRun) {
      console.log('\n🔍 DRY RUN: Would delete', testProfiles.length, 'test profiles')
      return
    }
    
    console.log(`\n🗑️  Proceeding to delete ${testProfiles.length} test profiles...`)
    
    let deletedCount = 0
    let failedCount = 0
    
    for (const profile of testProfiles) {
      const success = await deleteTestProfile(profile)
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
    console.log(`📋 Total processed: ${testProfiles.length} profiles`)
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error)
  }
}

/**
 * Interactive mode - ask for confirmation before deleting
 */
const interactiveMode = async () => {
  const testProfiles = await getTestProfiles()
  
  if (testProfiles.length === 0) {
    console.log('✅ No test profiles found')
    return
  }
  
  console.log('\n📋 Test profiles to be deleted:')
  testProfiles.forEach((profile, index) => {
    const regId = profile.Reg_ID || profile.id
    const name = profile.fullName || profile.Name || 'Unknown'
    console.log(`${index + 1}. ${regId} - ${name}`)
  })
  
  console.log(`\n⚠️  This will permanently delete ${testProfiles.length} test profiles`)
  console.log('Type "DELETE" to confirm, or anything else to cancel:')
  
  // In a real environment, you would use readline or similar
  // For now, we'll simulate the confirmation
  const confirmation = process.argv.includes('--confirm')
  
  if (confirmation) {
    console.log('✅ Confirmed. Proceeding with deletion...')
    await clearTestProfiles(false)
  } else {
    console.log('❌ Cancelled. No profiles were deleted.')
    console.log('Run with --confirm flag to actually delete the profiles.')
  }
}

// Main execution
const main = async () => {
  const args = process.argv.slice(2)
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
🧹 Test Profile Cleanup Script (Standalone)

Usage:
  node clear-test-profiles-standalone.js [options]

Options:
  --dry-run     Show what would be deleted without actually deleting
  --confirm     Actually delete the test profiles (use with caution)
  --interactive Run in interactive mode (default)
  --help        Show this help message

Examples:
  node clear-test-profiles-standalone.js --dry-run
  node clear-test-profiles-standalone.js --confirm
  node clear-test-profiles-standalone.js --interactive
`)
    return
  }
  
  if (args.includes('--dry-run')) {
    await clearTestProfiles(true)
  } else if (args.includes('--confirm')) {
    await clearTestProfiles(false)
  } else {
    await interactiveMode()
  }
}

// Run the script
main().catch(console.error)

export { clearTestProfiles, getTestProfiles, isTestProfile } 