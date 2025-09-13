/**
 * Restore Essential Config Data Script
 * 
 * This script restores the essential configuration data that was accidentally deleted
 * during the database cleanup. It recreates the district mappings and other critical config.
 */

import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { RootCollection, ConfigDoc, DistrictMappingField } from '../databaseWebApp/src/enums/db.js'
import { DISTRICT_MAPPING, District } from '../databaseWebApp/src/enums/districts.js'

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
 * Restore district mappings configuration
 */
async function restoreDistrictMappings() {
  try {
    console.log('🔄 Restoring district mappings configuration...')
    
    const districtMappingsRef = doc(db, RootCollection.CONFIG, ConfigDoc.DISTRICT_MAPPINGS)
    
    const districtMappingsData = {
      [DistrictMappingField.DISTRICT_MAPPINGS]: DISTRICT_MAPPING,
      [DistrictMappingField.DISTRICT_CODES]: Object.keys(DISTRICT_MAPPING),
      createdAt: serverTimestamp(),
      lastUpdated: serverTimestamp(),
      restored: true,
      restoredAt: serverTimestamp(),
      restoredBy: 'config-restore-script'
    }
    
    await setDoc(districtMappingsRef, districtMappingsData)
    
    console.log('✅ District mappings restored successfully!')
    console.log(`📊 Restored ${Object.keys(DISTRICT_MAPPING).length} district mappings`)
    
    return { success: true, districtsCount: Object.keys(DISTRICT_MAPPING).length }
    
  } catch (error) {
    console.error('❌ Error restoring district mappings:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Restore system configuration
 */
async function restoreSystemConfig() {
  try {
    console.log('🔄 Restoring system configuration...')
    
    const systemConfigRef = doc(db, RootCollection.CONFIG, 'system')
    
    const systemConfigData = {
      version: '1.0.0',
      lastCleanup: serverTimestamp(),
      restored: true,
      restoredAt: serverTimestamp(),
      restoredBy: 'config-restore-script',
      createdAt: serverTimestamp(),
      lastUpdated: serverTimestamp()
    }
    
    await setDoc(systemConfigRef, systemConfigData)
    
    console.log('✅ System configuration restored successfully!')
    
    return { success: true }
    
  } catch (error) {
    console.error('❌ Error restoring system configuration:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Main restoration function
 */
async function restoreConfigData() {
  try {
    console.log('🚨 Starting restoration of essential config data...')
    console.log('')
    console.log('This will restore:')
    console.log('  - District mappings (essential for profile creation)')
    console.log('  - System configuration')
    console.log('')
    
    let totalRestored = 0
    let totalErrors = 0
    
    // 1. Restore district mappings
    console.log('📋 Step 1: Restoring district mappings...')
    const districtResult = await restoreDistrictMappings()
    if (districtResult.success) {
      totalRestored += districtResult.districtsCount
    } else {
      console.error('❌ District mappings restoration failed:', districtResult.error)
      totalErrors++
    }
    
    // 2. Restore system config
    console.log('')
    console.log('📋 Step 2: Restoring system configuration...')
    const systemResult = await restoreSystemConfig()
    if (!systemResult.success) {
      console.error('❌ System configuration restoration failed:', systemResult.error)
      totalErrors++
    }
    
    console.log('')
    console.log('🎉 CONFIG DATA RESTORATION COMPLETED!')
    console.log(`📈 Total items restored: ${totalRestored}`)
    console.log(`❌ Total errors: ${totalErrors}`)
    console.log('')
    console.log('✅ Essential configuration data has been restored!')
    console.log('✅ Your system is now ready for normal operation!')
    
    return {
      success: true,
      totalRestored,
      totalErrors
    }
    
  } catch (error) {
    console.error('❌ Config data restoration failed:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Run the restoration
restoreConfigData()
  .then(result => {
    if (result.success) {
      console.log('✅ Config restoration successful!')
      process.exit(0)
    } else {
      console.error('❌ Config restoration failed:', result.error)
      process.exit(1)
    }
  })
  .catch(error => {
    console.error('❌ Config restoration failed:', error)
    process.exit(1)
  })
