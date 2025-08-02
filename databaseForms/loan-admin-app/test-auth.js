// Test script to verify Firebase Authentication setup
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBVUVyDTnOwMmYR1ybOLYv9i_B19aox1Lg",
  authDomain: "weresldatabase.firebaseapp.com",
  projectId: "weresldatabase",
  storageBucket: "weresldatabase.firebasestorage.app",
  messagingSenderId: "148662033996",
  appId: "1:148662033996:web:2c91caab46b7c25b4d9ee9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log('Firebase initialized successfully');
console.log('Auth domain:', firebaseConfig.authDomain);
console.log('Project ID:', firebaseConfig.projectId);

// Test Google Sign-In
async function testGoogleSignIn() {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log('✅ Google Sign-In successful!');
    console.log('User:', result.user.email);
  } catch (error) {
    console.error('❌ Google Sign-In failed:', error.code, error.message);
    
    if (error.code === 'auth/operation-not-allowed') {
      console.log('🔧 Solution: Enable Google Sign-In in Firebase Console');
      console.log('Go to: Authentication > Sign-in method > Google > Enable');
    }
  }
}

// Run test if in browser
if (typeof window !== 'undefined') {
  window.testGoogleSignIn = testGoogleSignIn;
  console.log('Test function available: window.testGoogleSignIn()');
} 