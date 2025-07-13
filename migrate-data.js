const { google } = require('googleapis');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, setDoc, doc } = require('firebase/firestore');
const fs = require('fs');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxGQqQqQqQqQqQqQqQqQqQqQqQqQqQqQ",
  authDomain: "weresl-app.firebaseapp.com",
  projectId: "weresl-app",
  storageBucket: "weresl-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdefghijklmnop"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Google Sheets API setup
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = 'token.json';
const CREDENTIALS_PATH = 'credentials.json';

// Load credentials from file
function loadCredentials() {
  try {
    const content = fs.readFileSync(CREDENTIALS_PATH);
    return JSON.parse(content);
  } catch (error) {
    console.error('Error loading credentials:', error.message);
    console.log('Please ensure you have downloaded your Google Sheets API credentials to credentials.json');
    process.exit(1);
  }
}

// Authorize Google Sheets API
async function authorize() {
  const credentials = loadCredentials();
  const { client_secret, client_id, redirect_uris } = credentials.installed || credentials.web;
  
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  try {
    const token = fs.readFileSync(TOKEN_PATH);
    oAuth2Client.setCredentials(JSON.parse(token));
    return oAuth2Client;
  } catch (error) {
    return await getNewToken(oAuth2Client);
  }
}

// Get new token for Google Sheets API
async function getNewToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  
  console.log('Authorize this app by visiting this url:', authUrl);
  console.log('After authorization, copy the code from the URL and paste it here:');
  
  // For now, we'll use a manual approach
  console.log('Please run the authorization manually and save the token to token.json');
  process.exit(1);
}

// Read data from Google Sheets
async function readSheetData(auth, spreadsheetId, range) {
  const sheets = google.sheets({ version: 'v4', auth });
  
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    
    return response.data.values;
  } catch (error) {
    console.error('Error reading sheet data:', error.message);
    return null;
  }
}

// Migrate profiles data
async function migrateProfiles(auth, spreadsheetId) {
  console.log('Migrating profiles data...');
  
  const data = await readSheetData(auth, spreadsheetId, 'Main!A2:T');
  if (!data) {
    console.error('Failed to read profiles data');
    return;
  }

  // Get projects data for arms mapping
  const projectsData = await readSheetData(auth, spreadsheetId, 'Projects!A2:F');
  const armsMapping = {};
  
  if (projectsData) {
    projectsData.forEach(row => {
      const regId = row[0];
      const arms = row[5];
      if (regId && arms) {
        if (!armsMapping[regId]) {
          armsMapping[regId] = [];
        }
        if (!armsMapping[regId].includes(arms)) {
          armsMapping[regId].push(arms);
        }
      }
    });
  }

  let successCount = 0;
  let errorCount = 0;

  for (const row of data) {
    try {
      const regId = row[0];
      if (!regId) continue;

      const profileData = {
        Reg_ID: regId,
        District: row[1] || '',
        Name: row[2] || '',
        Age: row[3] || '',
        Address: row[4] || '',
        NIC: row[5] || '',
        contact: row[6] || '',
        total_children: row[7] || 0,
        school_kids: row[8] || 0,
        others: row[9] || 0,
        Description: row[10] || '',
        Occupation: row[11] || '',
        RF_Loan: row[12] || '',
        RF_Paid_History: row[13] || '',
        RF_Cur_Prj: row[14] || '',
        Com_prjs: row[15] || '',
        Image: row[16] || '',
        GRANT: row[17] || 0,
        GIFor: row[18] || '',
        GRANT_Cur_Prj: row[19] || '',
        ArmsArray: armsMapping[regId] || [],
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
      console.error(`Error migrating profile ${row[0]}:`, error.message);
      errorCount++;
    }
  }

  console.log(`Profiles migration completed: ${successCount} successful, ${errorCount} errors`);
}

// Migrate projects data
async function migrateProjects(auth, spreadsheetId) {
  console.log('Migrating projects data...');
  
  const data = await readSheetData(auth, spreadsheetId, 'Projects!A2:F');
  if (!data) {
    console.error('Failed to read projects data');
    return;
  }

  let successCount = 0;
  let errorCount = 0;

  for (const row of data) {
    try {
      const projectData = {
        Reg_ID: row[0] || '',
        Project_Name: row[1] || '',
        Project_Type: row[2] || '',
        Project_Status: row[3] || '',
        Project_Amount: row[4] || 0,
        Arms: row[5] || '',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await addDoc(collection(db, 'projects'), projectData);
      successCount++;
    } catch (error) {
      console.error(`Error migrating project for ${row[0]}:`, error.message);
      errorCount++;
    }
  }

  console.log(`Projects migration completed: ${successCount} successful, ${errorCount} errors`);
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
async function migrateData() {
  try {
    const auth = await authorize();
    
    // Replace with your actual Google Sheets ID
    const SPREADSHEET_ID = 'YOUR_GOOGLE_SHEETS_ID_HERE';
    
    if (SPREADSHEET_ID === 'YOUR_GOOGLE_SHEETS_ID_HERE') {
      console.error('Please update the SPREADSHEET_ID in the script with your actual Google Sheets ID');
      process.exit(1);
    }

    console.log('Starting data migration from Google Sheets to Firebase...');
    
    // Migrate data in order
    await migrateDistrictMappings();
    await migrateProfiles(auth, SPREADSHEET_ID);
    await migrateProjects(auth, SPREADSHEET_ID);
    
    console.log('Data migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error.message);
    process.exit(1);
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  migrateData();
}

module.exports = { migrateData }; 