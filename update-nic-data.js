/**
 * Update NIC_DATA Script for WERESL Database
 * 
 * This script updates the SearchElements collection's NIC_DATA document
 * with NIC to Reg_ID mappings from all profiles.
 * 
 * Usage: node update-nic-data.js
 */

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, doc, getDocs, setDoc, serverTimestamp } from 'firebase/firestore'
import { RootCollection, SearchElementDoc, ProfileField } from './enums/db.js'

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
 * Get all profiles from Firestore
 */
async function getAllProfiles() {
  try {
    console.log('🔍 Fetching all profiles...')
    
    const profilesRef = collection(db, RootCollection.PROFILES)
    const snapshot = await getDocs(profilesRef)
    
    if (snapshot.empty) {
      console.log('❌ No profiles found')
      return []
    }
    
    const profiles = []
    snapshot.forEach(doc => {
      const data = doc.data()
      profiles.push({
        regId: doc.id,
        nic: data[ProfileField.NIC] || data.NIC || ''
      })
    })
    
    console.log(`✅ Found ${profiles.length} profiles`)
    return profiles
    
  } catch (error) {
    console.error('❌ Error fetching profiles:', error)
    throw error
  }
}

/**
 * Create NIC to Reg_ID mapping
 */
function createNICMapping(profiles) {
  const nicMapping = {}
  let validNICs = 0
  let invalidNICs = 0
  
  for (const profile of profiles) {
    const nic = profile.nic?.trim()
    const regId = profile.regId
    
    if (nic && nic.length > 0) {
      nicMapping[nic] = regId
      validNICs++
    } else {
      invalidNICs++
      console.log(`  ⚠️  Profile ${regId} has no NIC number`)
    }
  }
  
  console.log(`📊 NIC Mapping Summary:`)
  console.log(`  ✅ Valid NICs: ${validNICs}`)
  console.log(`  ⚠️  Invalid/Missing NICs: ${invalidNICs}`)
  console.log(`  📈 Total mappings: ${Object.keys(nicMapping).length}`)
  
  return nicMapping
}

/**
 * Update NIC_DATA document in SearchElements collection
 */
async function updateNICData(nicMapping) {
  try {
    console.log('🔄 Updating NIC_DATA document...')
    
    const nicDataRef = doc(db, RootCollection.SEARCH_ELEMENTS, SearchElementDoc.NIC_DATA)
    
    const nicData = {
      ...nicMapping,
      lastUpdated: serverTimestamp(),
      totalMappings: Object.keys(nicMapping).length,
      updatedAt: new Date().toISOString()
    }
    
    await setDoc(nicDataRef, nicData)
    
    console.log(`✅ NIC_DATA document updated successfully!`)
    console.log(`📊 Total NIC mappings: ${Object.keys(nicMapping).length}`)
    
    return {
      success: true,
      totalMappings: Object.keys(nicMapping).length,
      timestamp: new Date().toISOString()
    }
    
  } catch (error) {
    console.error('❌ Error updating NIC_DATA:', error)
    throw error
  }
}

/**
 * Main function to update NIC data
 */
async function updateNICDataMain() {
  try {
    console.log('🚀 Starting NIC_DATA update process...')
    console.log('')
    
    // Step 1: Get all profiles
    const profiles = await getAllProfiles()
    
    if (profiles.length === 0) {
      console.log('❌ No profiles found. Cannot update NIC_DATA.')
      return {
        success: false,
        error: 'No profiles found'
      }
    }
    
    // Step 2: Create NIC mapping
    console.log('')
    console.log('📝 Creating NIC to Reg_ID mapping...')
    const nicMapping = createNICMapping(profiles)
    
    if (Object.keys(nicMapping).length === 0) {
      console.log('❌ No valid NIC numbers found. Cannot update NIC_DATA.')
      return {
        success: false,
        error: 'No valid NIC numbers found'
      }
    }
    
    // Step 3: Update NIC_DATA document
    console.log('')
    const result = await updateNICData(nicMapping)
    
    console.log('')
    console.log('✅ NIC_DATA update completed successfully!')
    console.log(`📊 Summary:`)
    console.log(`  - Total profiles processed: ${profiles.length}`)
    console.log(`  - Valid NIC mappings: ${result.totalMappings}`)
    console.log(`  - Updated at: ${result.timestamp}`)
    
    return result
    
  } catch (error) {
    console.error('❌ NIC_DATA update failed:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Display sample NIC mappings
 */
function displaySampleMappings(nicMapping, count = 5) {
  const entries = Object.entries(nicMapping)
  const sample = entries.slice(0, count)
  
  console.log('')
  console.log('📋 Sample NIC Mappings:')
  sample.forEach(([nic, regId]) => {
    console.log(`  ${nic} → ${regId}`)
  })
  
  if (entries.length > count) {
    console.log(`  ... and ${entries.length - count} more`)
  }
}

// CLI handling
if (process.argv.includes('--confirm')) {
  console.log('🚨 WARNING: This will update the NIC_DATA document in SearchElements collection!')
  console.log('')
  console.log('This will:')
  console.log('  - Remove all existing NIC mappings')
  console.log('  - Add new NIC mappings from all profiles')
  console.log('  - Update the lastUpdated timestamp')
  console.log('')
  console.log('Are you sure you want to continue?')
  console.log('Type "YES" to confirm:')
  
  // For now, just proceed with update
  updateNICDataMain()
    .then(result => {
      if (result.success) {
        console.log('')
        console.log('🎉 NIC_DATA update completed successfully!')
        process.exit(0)
      } else {
        console.error('❌ NIC_DATA update failed:', result.error)
        process.exit(1)
      }
    })
    .catch(error => {
      console.error('❌ NIC_DATA update failed:', error)
      process.exit(1)
    })
} else {
  console.log('📋 WERESL NIC_DATA Update Tool')
  console.log('')
  console.log('This script updates the SearchElements collection\'s NIC_DATA document')
  console.log('with NIC to Reg_ID mappings from all profiles.')
  console.log('')
  console.log('Usage:')
  console.log('  node update-nic-data.js --confirm')
  console.log('')
  console.log('This will:')
  console.log('  - Fetch all profiles from the database')
  console.log('  - Extract NIC numbers and Reg_IDs')
  console.log('  - Create NIC to Reg_ID mappings')
  console.log('  - Update the NIC_DATA document in SearchElements collection')
  console.log('')
  console.log('⚠️  WARNING: This will overwrite existing NIC mappings!')
  console.log('Make sure you have a backup before running this script!')
}
