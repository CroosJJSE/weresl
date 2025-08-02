import { initializeApp } from 'firebase/app'
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBVUVyDTnOwMmYR1ybOLYv9i_B19aox1Lg",
  authDomain: "weresldatabase.firebaseapp.com",
  projectId: "weresldatabase",
  storageBucket: "weresldatabase.firebasestorage.app",
  messagingSenderId: "148662033996",
  appId: "1:148662033996:web:2e0d369279a1dde44d9ee9"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Sample links data
const sampleLinks = [
  {
    id: 'loan-init-app',
    title: 'Loan Initiation App',
    description: 'Register new loans for existing or new users with profile management and loan tracking.',
    url: 'https://loaninitweresl.web.app',
    secure: false,
    button: true
  },
  {
    id: 'rfgif-return-app',
    title: 'RF/GIF Return App',
    description: 'Process RF repayments and GIF returns with bill upload and payment tracking.',
    url: 'https://rfgifreturnweresl.web.app',
    secure: false,
    button: true
  },
  {
    id: 'loan-admin-app',
    title: 'Loan Admin Dashboard',
    description: 'Admin panel for approving loan requests and managing repayment approvals.',
    url: 'https://loan-admin-weresl.web.app',
    secure: true,
    button: false
  },
  {
    id: 'database-webapp',
    title: 'Database Web App',
    description: 'Main database management system for profiles, loans, and analytics.',
    url: 'https://weresldatabase.web.app',
    secure: false,
    button: true
  },
  {
    id: 'dev-data-dashboard',
    title: 'Developer Data Dashboard',
    description: 'Advanced data visualization and management tools for developers.',
    url: 'https://dev-data-dashboard.web.app',
    secure: true,
    button: false
  }
]

// Function to add sample links
async function addSampleLinks() {
  try {
    console.log('Adding sample links to topview-links collection...')
    
    for (const link of sampleLinks) {
      const { id, ...linkData } = link
      await setDoc(doc(db, 'topview-links', id), {
        ...linkData,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      console.log(`✅ Added link: ${link.title}`)
    }
    
    console.log('🎉 All sample links added successfully!')
  } catch (error) {
    console.error('❌ Error adding sample links:', error)
  }
}

// Run the function
addSampleLinks() 