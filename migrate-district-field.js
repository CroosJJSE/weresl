// migrate-district-field.js
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function migrateDistrictField() {
  const profilesRef = db.collection('profiles');
  const snapshot = await profilesRef.get();
  let updated = 0;
  let removed = 0;
  const batch = db.batch();

  snapshot.forEach(doc => {
    const data = doc.data();
    if ('district' in data) {
      const docRef = profilesRef.doc(doc.id);
      batch.update(docRef, {
        District: data.district,
        district: admin.firestore.FieldValue.delete()
      });
      updated++;
    }
  });

  if (updated > 0) {
    await batch.commit();
    console.log(`✅ Migrated ${updated} documents: 'district' → 'District' and removed old field.`);
  } else {
    console.log('No documents needed migration.');
  }
}

migrateDistrictField().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
}); 