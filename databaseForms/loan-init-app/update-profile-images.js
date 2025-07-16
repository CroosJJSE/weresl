import { initializeApp } from 'firebase/app'
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  updateDoc,
  query,
  where
} from 'firebase/firestore'
import firebaseConfig from './firebase-config.js'

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const PLACEHOLDER_IMAGE_URL = "https://drive.google.com/file/d/1ZgXsSuEMpzHS4as_wZ3ZRyR5Mpw9an05/view?usp=sharing"

async function updateProfileImages() {
  try {
    console.log('🔄 Starting profile image update...')
    
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
      console.log('Current Image field:', profileData.Image)
      
      // Check if profile has no Image URL or null/empty Image field
      const hasImage = profileData.Image && 
                      profileData.Image !== null && 
                      profileData.Image !== '' &&
                      profileData.Image !== 'null'
      
      if (!hasImage) {
        console.log(`📝 Updating profile ${profileId} with placeholder image in Image field`)
        
        // Update the profile with placeholder image in the Image field
        const profileRef = doc(db, 'profiles', profileId)
        await updateDoc(profileRef, {
          Image: PLACEHOLDER_IMAGE_URL,
          lastUpdated: new Date()
        })
        
        updatedCount++
        console.log(`✅ Updated profile ${profileId}`)
      } else {
        console.log(`⏭️ Skipping profile ${profileId} - already has image`)
        skippedCount++
      }
    }
    
    console.log('\n🎉 Update completed!')
    console.log(`📊 Summary:`)
    console.log(`   - Total profiles: ${profilesSnapshot.size}`)
    console.log(`   - Updated: ${updatedCount}`)
    console.log(`   - Skipped: ${skippedCount}`)
    
  } catch (error) {
    console.error('❌ Error updating profile images:', error)
    throw error
  }
}

// Run the update
updateProfileImages()
  .then(() => {
    console.log('✅ Script completed successfully')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Script failed:', error)
    process.exit(1)
  }) 