import { initializeApp } from 'firebase/app'
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  updateDoc,
  query,
  deleteField
} from 'firebase/firestore'
import firebaseConfig from './firebase-config.js'

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function removeProfileImageUrl() {
  try {
    console.log('🔄 Starting profileImageUrl field removal...')
    
    // Get all profiles
    const profilesQuery = query(collection(db, 'profiles'))
    const profilesSnapshot = await getDocs(profilesQuery)
    
    console.log(`📊 Found ${profilesSnapshot.size} profiles to check`)
    
    let updatedCount = 0
    let skippedCount = 0
    
    for (const profileDoc of profilesSnapshot.docs) {
      const profileData = profileDoc.data()
      const profileId = profileDoc.id
      
      console.log(`\n🔍 Checking profile: ${profileId}`)
      console.log('Current profileImageUrl:', profileData.profileImageUrl)
      
      // Check if profile has profileImageUrl field (including null values)
      const hasProfileImageUrl = 'profileImageUrl' in profileData
      
      if (hasProfileImageUrl) {
        console.log(`🗑️ Completely removing profileImageUrl field from profile ${profileId}`)
        
        // Update the profile to completely remove profileImageUrl field
        const profileRef = doc(db, 'profiles', profileId)
        await updateDoc(profileRef, {
          profileImageUrl: deleteField(), // This completely removes the field
          lastUpdated: new Date()
        })
        
        updatedCount++
        console.log(`✅ Completely removed profileImageUrl field from profile ${profileId}`)
      } else {
        console.log(`⏭️ Skipping profile ${profileId} - no profileImageUrl field`)
        skippedCount++
      }
    }
    
    console.log('\n🎉 Removal completed!')
    console.log(`📊 Summary:`)
    console.log(`   - Total profiles: ${profilesSnapshot.size}`)
    console.log(`   - Updated: ${updatedCount}`)
    console.log(`   - Skipped: ${skippedCount}`)
    
  } catch (error) {
    console.error('❌ Error removing profileImageUrl:', error)
    throw error
  }
}

// Run the removal
removeProfileImageUrl()
  .then(() => {
    console.log('✅ Script completed successfully')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Script failed:', error)
    process.exit(1)
  }) 