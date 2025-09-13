/**
 * Verify Root Collections Script
 * 
 * This script checks if all root collections actually exist in Firebase
 */

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { RootCollection } from '../databaseWebApp/src/enums/db.js'

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
 * Check if a collection exists by trying to read from it
 */
async function checkCollectionExists(collectionName) {
  try {
    const collectionRef = collection(db, collectionName)
    const snapshot = await getDocs(collectionRef)
    return { exists: true, docCount: snapshot.size }
  } catch (error) {
    return { exists: false, error: error.message }
  }
}

/**
 * Verify all root collections
 */
async function verifyRootCollections() {
  try {
    console.log('🔍 Verifying root collections...')
    console.log('')
    
    const rootCollections = [
      RootCollection.PROFILES,
      RootCollection.BANK_ACCOUNTS,
      RootCollection.SEARCH_ELEMENTS,
      RootCollection.RF_RETURN_RECORD,
      RootCollection.GIF_RETURN_RECORD,
      RootCollection.LOANS,
      RootCollection.TOPVIEW_LINKS,
      RootCollection.CONFIG,
      RootCollection.UPLOADED_IMAGES
    ]
    
    let existingCount = 0
    let missingCount = 0
    
    for (const collectionName of rootCollections) {
      const result = await checkCollectionExists(collectionName)
      
      if (result.exists) {
        console.log(`✅ ${collectionName} - EXISTS (${result.docCount} documents)`)
        existingCount++
      } else {
        console.log(`❌ ${collectionName} - MISSING (${result.error})`)
        missingCount++
      }
    }
    
    console.log('')
    console.log('📊 Verification Summary:')
    console.log(`✅ Existing collections: ${existingCount}`)
    console.log(`❌ Missing collections: ${missingCount}`)
    console.log(`📁 Total expected: ${rootCollections.length}`)
    
    return {
      success: true,
      existingCount,
      missingCount,
      totalExpected: rootCollections.length
    }
    
  } catch (error) {
    console.error('❌ Error verifying collections:', error)
    return { success: false, error: error.message }
  }
}

// Run verification
verifyRootCollections()
  .then(result => {
    if (result.success) {
      console.log('✅ Collection verification completed!')
      process.exit(0)
    } else {
      console.error('❌ Collection verification failed:', result.error)
      process.exit(1)
    }
  })
  .catch(error => {
    console.error('❌ Collection verification failed:', error)
    process.exit(1)
  })
