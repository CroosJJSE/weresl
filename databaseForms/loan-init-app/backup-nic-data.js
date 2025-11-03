// Script to backup /SearchElements/NIC_data before modification
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, getDoc, writeBatch } from 'firebase/firestore'
import firebaseConfig from './firebase-config.js'
import fs from 'fs'
import path from 'path'

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function backupNICData() {
  console.log('📦 Starting backup of NIC_data...')
  
  const nicDataDocRef = doc(db, 'SearchElements', 'NIC_data')
  const nicDataSnap = await getDoc(nicDataDocRef)
  
  if (!nicDataSnap.exists()) {
    console.log('❌ NIC_data document not found')
    return
  }
  
  const nicData = nicDataSnap.data()
  console.log(`📊 Found ${Object.keys(nicData).length} entries in NIC_data`)
  
  // Create backup with timestamp
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const backupFilename = `nic-data-backup-${timestamp}.json`
  const backupPath = path.join(process.cwd(), backupFilename)
  
  // Save to JSON file
  fs.writeFileSync(backupPath, JSON.stringify(nicData, null, 2))
  console.log(`✅ Backup saved to: ${backupFilename}`)
  
  // Also save a simplified version showing the issue
  const stats = {
    timestamp,
    totalEntries: Object.keys(nicData).length,
    sampleEntries: Object.entries(nicData).slice(0, 20),
    reversedEntries: []
  }
  
  // Find entries that are reversed (where key looks like RegID and value looks like NIC)
  Object.entries(nicData).forEach(([key, value]) => {
    // RegID pattern: starts with 3 letters followed by 3 digits (e.g., AMP001, MAN002)
    const regIdPattern = /^[A-Z]{3}\d{3}$/
    // NIC pattern: digits with optional 'v' at end, or just digits (e.g., 198960700428, 946770108v)
    const nicPattern = /^\d{9,12}[vV]?$/
    
    if (regIdPattern.test(key) && (typeof value === 'string' && (nicPattern.test(value) || value.match(/^\d+$/)))) {
      stats.reversedEntries.push({ key, value })
    }
  })
  
  console.log(`\n📈 Statistics:`)
  console.log(`   Total entries: ${stats.totalEntries}`)
  console.log(`   Reversed entries (need fixing): ${stats.reversedEntries.length}`)
  console.log(`\n🔍 Sample reversed entries:`)
  stats.reversedEntries.slice(0, 10).forEach(({ key, value }) => {
    console.log(`   "${key}": "${value}"  →  Should be: "${value}": "${key}"`)
  })
  
  // Save statistics
  const statsFilename = `nic-data-stats-${timestamp}.json`
  const statsPath = path.join(process.cwd(), statsFilename)
  fs.writeFileSync(statsPath, JSON.stringify(stats, null, 2))
  console.log(`\n✅ Statistics saved to: ${statsFilename}`)
  
  console.log(`\n✅ Backup complete!`)
}

backupNICData().catch(console.error)





