// Script to populate /config/SearchElements/NIC_data with all NICs and Reg_IDs
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore'
import firebaseConfig from '../../firebase-config.js'

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function updateNICData() {
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

  const nicDataRef = doc(db, 'config', 'SearchElements')
  await setDoc(nicDataRef, { NIC_data: nicData }, { merge: true })
  console.log('✅ NIC_data map updated in /config/SearchElements/NIC_data')
}

updateNICData().catch(console.error) 