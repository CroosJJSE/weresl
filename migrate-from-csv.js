const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, setDoc, doc } = require('firebase/firestore');
const fs = require('fs');
const csv = require('csv-parser');

// Firebase configuration - Update with your actual config
const firebaseConfig = {
  apiKey: "AIzaSyBVUVyDTnOwMmYR1ybOLYv9i_B19aox1Lg",
  authDomain: "weresldatabase.firebaseapp.com",
  projectId: "weresldatabase",
  storageBucket: "weresldatabase.firebasestorage.app",
  messagingSenderId: "148662033996",
  appId: "1:148662033996:web:f9b5ea903b9cc5a24d9ee9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Read CSV file
function readCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

// Migrate profiles from CSV
async function migrateProfilesFromCSV(csvPath) {
  console.log('Migrating profiles from CSV...');
  
  try {
    const data = await readCSV(csvPath);
    let successCount = 0;
    let errorCount = 0;

    for (const row of data) {
      try {
        const regId = row['Reg_ID'] || row['RegID'] || row['Reg ID'];
        if (!regId) continue;

        const profileData = {
          Reg_ID: regId,
          District: row['District'] || '',
          Name: row['Name'] || '',
          Age: row['Age'] || '',
          Address: row['Address'] || '',
          NIC: row['NIC'] || '',
          contact: row['contact'] || row['Phone'] || '',
          total_children: parseInt(row['total_children']) || 0,
          school_kids: parseInt(row['school_kids']) || 0,
          others: parseInt(row['others']) || 0,
          Description: row['Description'] || '',
          Occupation: row['Occupation'] || '',
          RF_Loan: row['RF_Loan'] || '',
          RF_Paid_History: row['RF_Paid_History'] || '',
          RF_Cur_Prj: row['RF_Cur_Prj'] || '',
          Com_prjs: row['Com_prjs'] || '',
          Image: row['Image'] || '',
          GRANT: parseFloat(row['GRANT']) || 0,
          GIFor: row['GIFor'] || '',
          GRANT_Cur_Prj: row['GRANT_Cur_Prj'] || '',
          ArmsArray: [], // Will be populated from projects data
          createdAt: new Date(),
          updatedAt: new Date()
        };

        // Use RegID as document ID for easy lookup
        await setDoc(doc(db, 'profiles', regId), profileData);
        successCount++;
        
        if (successCount % 10 === 0) {
          console.log(`Migrated ${successCount} profiles...`);
        }
      } catch (error) {
        console.error(`Error migrating profile ${row['Reg_ID'] || 'unknown'}:`, error.message);
        errorCount++;
      }
    }

    console.log(`Profiles migration completed: ${successCount} successful, ${errorCount} errors`);
  } catch (error) {
    console.error('Error reading CSV file:', error.message);
  }
}

// Migrate projects from CSV
async function migrateProjectsFromCSV(csvPath) {
  console.log('Migrating projects from CSV...');
  
  try {
    const data = await readCSV(csvPath);
    let successCount = 0;
    let errorCount = 0;

    for (const row of data) {
      try {
        const projectData = {
          Reg_ID: row['Reg_ID'] || row['RegID'] || '',
          Project_Name: row['Project_Name'] || row['Project Name'] || '',
          Project_Type: row['Project_Type'] || row['Project Type'] || '',
          Project_Status: row['Project_Status'] || row['Project Status'] || '',
          Project_Amount: parseFloat(row['Project_Amount']) || 0,
          Arms: row['Arms'] || '',
          createdAt: new Date(),
          updatedAt: new Date()
        };

        await addDoc(collection(db, 'projects'), projectData);
        successCount++;
      } catch (error) {
        console.error(`Error migrating project for ${row['Reg_ID'] || 'unknown'}:`, error.message);
        errorCount++;
      }
    }

    console.log(`Projects migration completed: ${successCount} successful, ${errorCount} errors`);
  } catch (error) {
    console.error('Error reading projects CSV file:', error.message);
  }
}

// Update profiles with arms data from projects
async function updateProfilesWithArms() {
  console.log('Updating profiles with arms data...');
  
  try {
    const { getDocs, query } = require('firebase/firestore');
    
    // Get all projects
    const projectsSnapshot = await getDocs(collection(db, 'projects'));
    const armsMapping = {};
    
    projectsSnapshot.forEach(doc => {
      const project = doc.data();
      const regId = project.Reg_ID;
      const arms = project.Arms;
      
      if (regId && arms) {
        if (!armsMapping[regId]) {
          armsMapping[regId] = [];
        }
        if (!armsMapping[regId].includes(arms)) {
          armsMapping[regId].push(arms);
        }
      }
    });

    // Update profiles with arms data
    const profilesSnapshot = await getDocs(collection(db, 'profiles'));
    let updateCount = 0;

    for (const profileDoc of profilesSnapshot.docs) {
      const profile = profileDoc.data();
      const regId = profile.Reg_ID;
      
      if (armsMapping[regId]) {
        await setDoc(doc(db, 'profiles', regId), {
          ...profile,
          ArmsArray: armsMapping[regId],
          updatedAt: new Date()
        }, { merge: true });
        updateCount++;
      }
    }

    console.log(`Updated ${updateCount} profiles with arms data`);
  } catch (error) {
    console.error('Error updating profiles with arms:', error.message);
  }
}

// Migrate district mappings
async function migrateDistrictMappings() {
  console.log('Migrating district mappings...');
  
  const districtMapping = {
    "MAN": "Mannar", "COL": "Colombo", "BAT": "Batticaloa", "GAM": "Gampaha", "KAL": "Kalutara",
    "KAN": "Kandy", "KUR": "Kurunegala", "JAF": "Jaffna", "VAV": "Vavuniya", "TRI": "Trincomalee",
    "MTR": "Matara", "HAM": "Hambantota", "MON": "Monaragala", "ANU": "Anuradhapura", "POL": "Polonnaruwa",
    "PUT": "Puttalam", "RAT": "Ratnapura", "NUW": "Nuwara Eliya", "BAD": "Badulla", "KEG": "Kegalle",
    "MUL": "Mullaitivu", "MTL": "Matale", "AMP": "Ampara", "KIL": "Kilinochchi", "GAE": "Galle"
  };

  const districtCodes = {
    "Mannar": "MAN", "Colombo": "COL", "Batticaloa": "BAT", "Gampaha": "GAM", 
    "Kalutara": "KAL", "Kandy": "KAN", "Kurunegala": "KUR", "Jaffna": "JAF", 
    "Vavuniya": "VAV", "Trincomalee": "TRI", "Matara": "MTR", "Hambantota": "HAM", 
    "Monaragala": "MON", "Anuradhapura": "ANU", "Polonnaruwa": "POL", "Puttalam": "PUT", 
    "Ratnapura": "RAT", "Nuwara Eliya": "NUW", "Badulla": "BAD", "Kegalle": "KEG", 
    "Mullaitivu": "MUL", "Matale": "MTL", "Ampara": "AMP", "Kilinochchi": "KIL", 
    "Galle": "GAE"
  };

  try {
    await setDoc(doc(db, 'config', 'districtMappings'), {
      districtMapping,
      districtCodes,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log('District mappings migrated successfully');
  } catch (error) {
    console.error('Error migrating district mappings:', error.message);
  }
}

// Main migration function
async function migrateFromCSV() {
  try {
    console.log('Starting data migration from CSV files to Firebase...');
    
    // Check if CSV files exist
    const mainCSVPath = './data/main.csv';
    const projectsCSVPath = './data/projects.csv';
    
    if (!fs.existsSync(mainCSVPath)) {
      console.error(`Main CSV file not found at ${mainCSVPath}`);
      console.log('Please export your Main sheet from Google Sheets as CSV and save it as data/main.csv');
      process.exit(1);
    }

    // Migrate data in order
    await migrateDistrictMappings();
    await migrateProfilesFromCSV(mainCSVPath);
    
    if (fs.existsSync(projectsCSVPath)) {
      await migrateProjectsFromCSV(projectsCSVPath);
      await updateProfilesWithArms();
    } else {
      console.log('Projects CSV not found, skipping projects migration');
    }
    
    console.log('Data migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error.message);
    process.exit(1);
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  migrateFromCSV();
}

module.exports = { migrateFromCSV }; 