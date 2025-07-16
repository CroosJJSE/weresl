import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

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

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app 