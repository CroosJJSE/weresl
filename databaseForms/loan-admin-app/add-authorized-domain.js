// Script to add authorized domain to Firebase Authentication
// This requires Firebase Admin SDK

const admin = require('firebase-admin');

// You'll need to download your service account key from Firebase Console
// Go to Project Settings > Service Accounts > Generate new private key
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function addAuthorizedDomain() {
  try {
    // Add the new domain to authorized domains
    const domain = 'loan-admin-wereSL.web.app';
    
    // Note: This is a simplified example
    // In practice, you would need to use the Firebase Admin SDK
    // to modify authentication settings
    
    console.log(`Domain ${domain} should be added to Firebase Console manually`);
    console.log('Go to: Firebase Console > Authentication > Settings > Authorized domains');
    console.log('Add: loan-admin-wereSL.web.app');
    
  } catch (error) {
    console.error('Error:', error);
  }
}

addAuthorizedDomain(); 