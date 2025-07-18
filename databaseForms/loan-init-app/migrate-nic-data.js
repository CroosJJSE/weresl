// Script to populate /SearchElements/NIC_data with all NICs and Reg_IDs
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore'
import firebaseConfig from './firebase-config.js'

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function migrateNICData() {
  const profilesCol = collection(db, 'profiles')
  const snapshot = await getDocs(profilesCol)
  const nicData = {}

  snapshot.forEach(docSnap => {
    const data = docSnap.data()
    const regId = data.Reg_ID || data.regId || data.reg_id || docSnap.id
    const nic = data.NIC || data.nic
    if (nic && regId) {
      nicData[nic] = regId
    }
  })

  const nicDataRef = doc(db, 'SearchElements', 'NIC_data')
  await setDoc(nicDataRef, nicData)
  console.log('✅ NIC_data map updated in /SearchElements/NIC_data')
}

migrateNICData().catch(console.error) 