/**
 * Clear Coordinators Script
 * Clears all coordinator data from the database
 */

import { getAllCoordinators, deleteCoordinator } from './utils/dbUtils.js'

const clearCoordinators = async () => {
  console.log('🗑️  Clearing coordinator data...\n')
  
  try {
    // Get all coordinators
    const result = await getAllCoordinators()
    
    if (!result.success) {
      console.error('❌ Failed to fetch coordinators:', result.message)
      return
    }
    
    const coordinators = result.data
    
    if (coordinators.length === 0) {
      console.log('✅ No coordinators to clear')
      return
    }
    
    console.log(`📊 Found ${coordinators.length} coordinators to delete\n`)
    
    let successCount = 0
    let errorCount = 0
    
    // Delete each coordinator
    for (const coordinator of coordinators) {
      try {
        const deleteResult = await deleteCoordinator(coordinator.id)
        
        if (deleteResult.success) {
          console.log(`✅ Deleted coordinator: ${coordinator.id}`)
          successCount++
        } else {
          console.error(`❌ Failed to delete ${coordinator.id}: ${deleteResult.message}`)
          errorCount++
        }
      } catch (error) {
        console.error(`❌ Error deleting ${coordinator.id}:`, error)
        errorCount++
      }
    }
    
    console.log('\n📊 Clear Summary:')
    console.log(`✅ Successful deletions: ${successCount}`)
    console.log(`❌ Failed deletions: ${errorCount}`)
    console.log(`📝 Total processed: ${coordinators.length}`)
    
  } catch (error) {
    console.error('❌ Error during clear:', error)
  }
}

// Run the clear
clearCoordinators().catch(console.error) 