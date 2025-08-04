/**
 * Verify Coordinators Script
 * Verifies that coordinator data was uploaded correctly to the database
 */

import { getAllCoordinators, getCoordinatorByNIC } from './utils/dbUtils.js'
import { convertGoogleDriveUrl } from './utils/driveUtils.js'
import { BANK_ACCOUNT_FIELDS } from './enums/db.js'

/**
 * Verify all coordinators in the database
 */
const verifyCoordinators = async () => {
  console.log('🔍 Verifying coordinator data...\n')
  
  try {
    // Get all coordinators
    const result = await getAllCoordinators()
    
    if (!result.success) {
      console.error('❌ Failed to fetch coordinators:', result.message)
      return
    }
    
    const coordinators = result.data
    
    if (coordinators.length === 0) {
      console.log('⚠️  No coordinators found in database')
      return
    }
    
    console.log(`📊 Found ${coordinators.length} coordinators in database\n`)
    
    // Display each coordinator
    coordinators.forEach((coordinator, index) => {
      console.log(`${index + 1}. ${coordinator[BANK_ACCOUNT_FIELDS.firstName]} ${coordinator[BANK_ACCOUNT_FIELDS.lastName]}`)
      console.log(`   📱 Phone: ${coordinator[BANK_ACCOUNT_FIELDS.phoneNumber]}`)
      console.log(`   🆔 NIC: ${coordinator[BANK_ACCOUNT_FIELDS.nic]}`)
      console.log(`   💼 Position: ${coordinator[BANK_ACCOUNT_FIELDS.position]}`)
      console.log(`   💰 Bank Balance: ${coordinator[BANK_ACCOUNT_FIELDS.currentBankBalance] || 0}`)
      console.log(`   📝 Signature ID: ${coordinator[BANK_ACCOUNT_FIELDS.signatureDriveId]}`)
      
      if (coordinator[BANK_ACCOUNT_FIELDS.signatureDriveId]) {
        const signatureUrl = convertGoogleDriveUrl(coordinator[BANK_ACCOUNT_FIELDS.signatureDriveId])
        console.log(`   🔗 Signature URL: ${signatureUrl}`)
      }
      
      console.log(`   📅 Created: ${coordinator[BANK_ACCOUNT_FIELDS.createdAt]?.toDate?.() || 'N/A'}`)
      console.log(`   🔄 Updated: ${coordinator[BANK_ACCOUNT_FIELDS.lastUpdated]?.toDate?.() || 'N/A'}`)
      console.log('')
    })
    
    // Test fetching a specific coordinator
    if (coordinators.length > 0) {
      const firstCoordinator = coordinators[0]
      const nic = firstCoordinator[BANK_ACCOUNT_FIELDS.nic]
      
      console.log(`🔍 Testing individual coordinator fetch for NIC: ${nic}`)
      const individualResult = await getCoordinatorByNIC(nic)
      
      if (individualResult.success) {
        console.log('✅ Individual coordinator fetch successful')
        console.log(`   Name: ${individualResult.data[BANK_ACCOUNT_FIELDS.firstName]} ${individualResult.data[BANK_ACCOUNT_FIELDS.lastName]}`)
      } else {
        console.log('❌ Individual coordinator fetch failed:', individualResult.message)
      }
    }
    
    console.log('\n✅ Verification complete!')
    
  } catch (error) {
    console.error('❌ Error during verification:', error)
  }
}

// Run the verification
verifyCoordinators().catch(console.error) 