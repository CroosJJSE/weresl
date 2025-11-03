// Script to rebuild NIC_data from profiles collection
// This ensures the correct structure: { "NIC": "RegID" }
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore'
import firebaseConfig from './firebase-config.js'
import fs from 'fs'
import path from 'path'

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function rebuildNICData() {
  console.log('🔄 Starting NIC_data rebuild from profiles collection...\n')
  
  // First, backup the current NIC_data
  try {
    const currentNicDataRef = doc(db, 'SearchElements', 'NIC_data')
    const currentNicDataSnap = await getDoc(currentNicDataRef)
    
    if (currentNicDataSnap.exists()) {
      const currentNicData = currentNicDataSnap.data()
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
      const backupFilename = `nic-data-backup-before-rebuild-${timestamp}.json`
      const backupPath = path.join(process.cwd(), backupFilename)
      fs.writeFileSync(backupPath, JSON.stringify(currentNicData, null, 2))
      console.log(`✅ Current NIC_data backed up to: ${backupFilename}\n`)
    }
  } catch (error) {
    console.log('⚠️  Could not backup current NIC_data:', error.message)
  }
  
  // Fetch all profiles
  console.log('📥 Fetching all profiles from Firestore...')
  const profilesCol = collection(db, 'profiles')
  const snapshot = await getDocs(profilesCol)
  
  console.log(`   Found ${snapshot.size} profiles\n`)
  
  const nicData = {}
  let processedCount = 0
  let skippedCount = 0
  
  // Build NIC_data map: { "NIC": "RegID" }
  snapshot.forEach(docSnap => {
    const data = docSnap.data()
    const regId = data.Reg_ID || data.regId || data.reg_id || docSnap.id
    const nic = data.NIC || data.nic
    
    if (nic && regId) {
      // Correct structure: NIC as key, RegID as value
      nicData[nic] = regId
      processedCount++
      
      // Show first few examples
      if (processedCount <= 5) {
        console.log(`   ✓ "${nic}": "${regId}"`)
      }
    } else {
      skippedCount++
      if (skippedCount <= 3) {
        console.log(`   ⚠️  Skipping profile ${regId || docSnap.id}: missing NIC`)
      }
    }
  })
  
  console.log(`\n📊 Summary:`)
  console.log(`   Processed: ${processedCount}`)
  console.log(`   Skipped: ${skippedCount}`)
  console.log(`   Total entries in NIC_data: ${Object.keys(nicData).length}\n`)
  
  // Show some sample entries
  console.log('🔍 Sample entries (first 10):')
  Object.entries(nicData).slice(0, 10).forEach(([nic, regId]) => {
    console.log(`   "${nic}": "${regId}"`)
  })
  
  if (Object.keys(nicData).length > 10) {
    console.log(`   ... and ${Object.keys(nicData).length - 10} more`)
  }
  
  // Save to local file for reference
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const referenceFilename = `nic-data-rebuilt-${timestamp}.json`
  const referencePath = path.join(process.cwd(), referenceFilename)
  fs.writeFileSync(referencePath, JSON.stringify(nicData, null, 2))
  console.log(`\n💾 Local copy saved: ${referenceFilename}`)
  
  // Update Firestore
  console.log(`\n🔄 Updating Firestore document...`)
  const nicDataRef = doc(db, 'SearchElements', 'NIC_data')
  await setDoc(nicDataRef, nicData)
  console.log(`✅ NIC_data updated in Firestore!`)
  
  console.log(`\n✅ Rebuild complete!`)
  console.log(`   Total NIC entries: ${Object.keys(nicData).length}`)
  console.log(`   Backup: ${referenceFilename}`)
}

rebuildNICData().catch(console.error)





