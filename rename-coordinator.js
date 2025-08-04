/**
 * Rename Coordinator Script
 * Renames a specific coordinator document in the database
 */

import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore'
import { db } from './firebase-config.js'
import { RootCollection } from './enums/db.js'

const renameCoordinator = async () => {
  console.log('🔄 Renaming coordinator document...\n')
  
  try {
    const oldDocumentId = 'Tabitha Jayanthakumar'
    const newDocumentId = 'wereSL'
    
    // Get the old document
    const oldDocRef = doc(db, RootCollection.BANK_ACCOUNTS, oldDocumentId)
    const oldDoc = await getDoc(oldDocRef)
    
    if (!oldDoc.exists()) {
      console.error(`❌ Document "${oldDocumentId}" not found`)
      return
    }
    
    console.log(`📋 Found document: ${oldDocumentId}`)
    console.log(`📝 Data:`, oldDoc.data())
    
    // Create new document with the same data
    const newDocRef = doc(db, RootCollection.BANK_ACCOUNTS, newDocumentId)
    await setDoc(newDocRef, oldDoc.data())
    
    console.log(`✅ Created new document: ${newDocumentId}`)
    
    // Delete the old document
    await deleteDoc(oldDocRef)
    console.log(`🗑️  Deleted old document: ${oldDocumentId}`)
    
    console.log(`\n✅ Successfully renamed "${oldDocumentId}" to "${newDocumentId}"`)
    
  } catch (error) {
    console.error('❌ Error during rename:', error)
  }
}

// Run the rename
renameCoordinator().catch(console.error) 