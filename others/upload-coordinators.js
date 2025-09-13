/**
 * Upload Coordinators Script
 * Uploads coordinator information to the Firestore database
 */

import { saveCoordinator } from './utils/dbUtils.js'
import { extractFileId } from './utils/driveUtils.js'
import { BANK_ACCOUNT_FIELDS, COORDINATOR_POSITION } from './enums/db.js'

// Coordinator data to upload
const coordinatorData = [
  {
    firstName: 'Subitson',
    lastName: 'Croos',
    phoneNumber: '772415545',
    nic: '200034302632',
    signatureUrl: 'https://drive.google.com/file/d/1TFJ-9K51W3odnOVtRkgG4to_IAxURiOi/view?usp=drive_link',
    position: COORDINATOR_POSITION.COORDINATOR
  },
  {
    firstName: 'Tabitha',
    lastName: 'Jayanthakumar',
    phoneNumber: '777342685',
    nic: '866671460',
    signatureUrl: 'https://drive.google.com/file/d/1D0tBWPO5mfMocRRevG2tviJkmJ7ZcqBH/view?usp=sharing',
    position: COORDINATOR_POSITION.TREASURER
  },
  {
    firstName: 'Nayomi',
    lastName: 'Nilusha',
    phoneNumber: '75 328 1426',
    nic: '937381611',
    signatureUrl: 'https://drive.google.com/file/d/1C9StWsuAnYHFeBm9FkrQRbxeHvup5ijT/view?usp=sharing',
    position: COORDINATOR_POSITION.COORDINATOR
  },
  {
    firstName: 'Thirnavakarasu',
    lastName: 'Dixon',
    phoneNumber: '771784812',
    nic: '841012593',
    signatureUrl: 'https://drive.google.com/file/d/17u9XmSKTw1PmnqknaCqW6aybnIEKg9Q9/view?usp=drive_link',
    position: COORDINATOR_POSITION.COORDINATOR
  },
  {
    firstName: 'Beulah',
    lastName: 'Muraleetharan',
    phoneNumber: '766429172',
    nic: '987361492',
    signatureUrl: 'https://drive.google.com/file/d/1ID6r0fMcN-i-E39mtnyff86oi_unMY-Z/view?usp=drive_link',
    position: COORDINATOR_POSITION.COORDINATOR
  },
  {
    firstName: 'Surain',
    lastName: 'Fernando',
    phoneNumber: '773083664',
    nic: '842144191',
    signatureUrl: 'https://drive.google.com/uc?id=1lUBUCBY45TF0wXH7W4O8rOhpU94mHm_F',
    position: COORDINATOR_POSITION.COORDINATOR
  },
  {
    firstName: 'Gogerly',
    lastName: 'Mayuri Nadeesani',
    phoneNumber: '766170938',
    nic: '198852801095',
    signatureUrl: 'https://drive.google.com/uc?id=1YIYhjijyjC639NQQ0mb-hNhh-nUWr8H_',
    position: COORDINATOR_POSITION.COORDINATOR
  },
  {
    firstName: 'Markkandu',
    lastName: 'Premkumar payas',
    phoneNumber: '752024999',
    nic: '199206604180',
    signatureUrl: 'https://drive.google.com/uc?id=1MY4ImQtzmN0j_rPnFvdPo-xpNd7_aX25',
    position: COORDINATOR_POSITION.COORDINATOR
  },
  {
    firstName: 'Shanthiny',
    lastName: '',
    phoneNumber: '775798749',
    nic: 'XXRandom2',
    signatureUrl: 'https://drive.google.com/file/d/1snyg0zSJsj9h_wqMQoOi6TwMusWh1IK8/view?usp=drivesdk',
    position: COORDINATOR_POSITION.COORDINATOR
  },
  {
    firstName: 'Nilany',
    lastName: 'Nadhan',
    phoneNumber: '760301865',
    nic: '986243100',
    signatureUrl: 'https://drive.google.com/uc?id=1xNO7K7mg-8_RF3-yA1g-pgaiCXRP-Jq6',
    position: COORDINATOR_POSITION.COORDINATOR
  },
  {
    firstName: 'Amanda',
    lastName: 'Himalshi',
    phoneNumber: '776069396',
    nic: '947824155',
    signatureUrl: 'https://drive.google.com/uc?id=1bUu0a7whfpEnlob9YbB7wBrcw4DuXsMK',
    position: COORDINATOR_POSITION.COORDINATOR
  },
  {
    firstName: 'Jemima',
    lastName: 'Mariyathas',
    phoneNumber: '776703722',
    nic: '200054902845',
    signatureUrl: 'https://drive.google.com/uc?id=1kh7wTiIGMvd5VQvOzkWHBPyE5iS00Qrb',
    position: COORDINATOR_POSITION.COORDINATOR
  },
  {
    firstName: 'Felix',
    lastName: '',
    phoneNumber: '777392336',
    nic: 'xxRANDOM1',
    signatureUrl: 'https://drive.google.com/file/d/1MRO-aBls4LFQdDQP0__tZSxjz4nCy2n0/view?usp=drivesdk',
    position: COORDINATOR_POSITION.COORDINATOR
  }
]

/**
 * Generate document ID from name
 */
const generateDocumentId = (firstName, lastName) => {
  if (lastName && lastName.trim()) {
    return `${firstName} ${lastName}`.trim()
  }
  return firstName.trim()
}

/**
 * Process coordinator data and upload to database
 */
const uploadCoordinators = async () => {
  console.log('Starting coordinator upload...')
  
  let successCount = 0
  let errorCount = 0
  
  for (const coordinator of coordinatorData) {
    try {
      // Extract file ID from Google Drive URL
      const signatureDriveId = extractFileId(coordinator.signatureUrl)
      
      if (!signatureDriveId) {
        console.error(`❌ Failed to extract file ID from signature URL for ${coordinator.firstName} ${coordinator.lastName}`)
        errorCount++
        continue
      }
      
      // Generate document ID from name
      const documentId = generateDocumentId(coordinator.firstName, coordinator.lastName)
      
      // Prepare coordinator data for database
      const coordinatorToSave = {
        [BANK_ACCOUNT_FIELDS.firstName]: coordinator.firstName,
        [BANK_ACCOUNT_FIELDS.lastName]: coordinator.lastName,
        [BANK_ACCOUNT_FIELDS.phoneNumber]: coordinator.phoneNumber,
        [BANK_ACCOUNT_FIELDS.nic]: coordinator.nic,
        [BANK_ACCOUNT_FIELDS.signatureDriveId]: signatureDriveId,
        [BANK_ACCOUNT_FIELDS.position]: coordinator.position
      }
      
      // Save coordinator to database using name as document ID
      const result = await saveCoordinator(coordinatorToSave, documentId)
      
      if (result.success) {
        console.log(`✅ Successfully uploaded: ${coordinator.firstName} ${coordinator.lastName} (${documentId})`)
        successCount++
      } else {
        console.error(`❌ Failed to upload ${coordinator.firstName} ${coordinator.lastName}: ${result.message}`)
        errorCount++
      }
      
    } catch (error) {
      console.error(`❌ Error uploading ${coordinator.firstName} ${coordinator.lastName}:`, error)
      errorCount++
    }
  }
  
  console.log('\n📊 Upload Summary:')
  console.log(`✅ Successful uploads: ${successCount}`)
  console.log(`❌ Failed uploads: ${errorCount}`)
  console.log(`📝 Total processed: ${coordinatorData.length}`)
}

// Run the upload
uploadCoordinators().catch(console.error) 