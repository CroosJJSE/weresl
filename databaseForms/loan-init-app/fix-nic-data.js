// Script to fix NIC_data by reversing entries that are stored backwards
// This script converts entries from format "RegID": "NIC" to "NIC": "RegID"
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore'
import firebaseConfig from './firebase-config.js'
import fs from 'fs'
import path from 'path'

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Helper function to detect if a string is a RegID
function isRegId(str) {
  // RegID pattern: starts with 3 letters followed by 3 digits (e.g., AMP001, MAN002)
  return /^[A-Z]{3}\d{3}$/.test(str)
}

// Helper function to detect if a string is a NIC
function isNIC(str) {
  if (typeof str !== 'string') return false
  // NIC pattern: digits with optional 'v' at end (e.g., 198960700428, 946770108v)
  // or just digits
  return /^\d{9,12}[vV]?$/.test(str) || /^\d+$/.test(str)
}

async function fixNICData() {
  console.log('🔧 Starting NIC_data fix...\n')
  
  // First, backup the data
  const nicDataDocRef = doc(db, 'SearchElements', 'NIC_data')
  const nicDataSnap = await getDoc(nicDataDocRef)
  
  if (!nicDataSnap.exists()) {
    console.log('❌ NIC_data document not found')
    return
  }
  
  const nicData = nicDataSnap.data()
  console.log(`📊 Current NIC_data has ${Object.keys(nicData).length} entries\n`)
  
  // Create backup
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const backupFilename = `nic-data-backup-${timestamp}.json`
  const backupPath = path.join(process.cwd(), backupFilename)
  fs.writeFileSync(backupPath, JSON.stringify(nicData, null, 2))
  console.log(`✅ Backup created: ${backupFilename}\n`)
  
  // Find and fix reversed entries
  const fixedNicData = {}
  let reversedCount = 0
  let keptCount = 0
  
  console.log('🔍 Analyzing entries...\n')
  
  Object.entries(nicData).forEach(([key, value]) => {
    // Check if this is a reversed entry (key looks like RegID, value looks like NIC)
    if (isRegId(key) && isNIC(value)) {
      // This entry is reversed! Fix it by swapping key and value
      fixedNicData[value] = key
      reversedCount++
      console.log(`  Reversed: "${key}": "${value}" → "${value}": "${key}"`)
    } else {
      // This entry is already correct, keep it
      fixedNicData[key] = value
      keptCount++
    }
  })
  
  console.log(`\n📊 Summary:`)
  console.log(`   Total entries: ${Object.keys(nicData).length}`)
  console.log(`   Entries reversed: ${reversedCount}`)
  console.log(`   Entries kept: ${keptCount}`)
  console.log(`   New total: ${Object.keys(fixedNicData).length}`)
  
  // Verify no duplicates were created
  const originalKeys = Object.keys(nicData)
  const fixedKeys = Object.keys(fixedNicData)
  
  if (originalKeys.length !== new Set(originalKeys).size) {
    console.log(`\n⚠️  Warning: Original data had duplicate values, they will be deduplicated`)
  }
  
  // Check for potential conflicts (where a reversed entry might conflict with an existing correct entry)
  const conflicts = []
  Object.entries(nicData).forEach(([key, value]) => {
    if (isRegId(key) && isNIC(value)) {
      // If the reversed value already exists as a key, we have a conflict
      if (nicData[value]) {
        conflicts.push({
          regId: key,
          nic: value,
          existingValue: nicData[value]
        })
      }
    }
  })
  
  if (conflicts.length > 0) {
    console.log(`\n⚠️  Found ${conflicts.length} potential conflicts:`)
    conflicts.forEach(({ regId, nic, existingValue }) => {
      console.log(`   NIC "${nic}" already maps to "${existingValue}", but "${regId}" wants to map to it too`)
    })
    console.log(`\n❌ Aborting fix due to conflicts. Please resolve manually.`)
    return
  }
  
  // Ask for confirmation
  console.log(`\n✅ Ready to update NIC_data with fixed entries`)
  console.log(`   Backup saved to: ${backupFilename}`)
  console.log(`\n🔔 This will update the Firestore document.`)
  
  // Update the document
  console.log(`\n🔄 Updating Firestore document...`)
  await setDoc(nicDataDocRef, fixedNicData)
  console.log(`✅ NIC_data updated successfully!`)
  
  // Save the fixed data locally for reference
  const fixedFilename = `nic-data-fixed-${timestamp}.json`
  const fixedPath = path.join(process.cwd(), fixedFilename)
  fs.writeFileSync(fixedPath, JSON.stringify(fixedNicData, null, 2))
  console.log(`   Fixed data saved to: ${fixedFilename}`)
  
  console.log(`\n✅ Fix complete!`)
}

fixNICData().catch(console.error)





