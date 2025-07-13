const fs = require('fs');
const path = require('path');

console.log('🔧 WERESL Data Migration Setup');
console.log('================================\n');

// Check if firebase-config.js exists
const firebaseConfigPath = './firebase-config.js';
if (fs.existsSync(firebaseConfigPath)) {
  console.log('✅ Found firebase-config.js');
  
  try {
    const configContent = fs.readFileSync(firebaseConfigPath, 'utf8');
    const apiKeyMatch = configContent.match(/apiKey:\s*["']([^"']+)["']/);
    const projectIdMatch = configContent.match(/projectId:\s*["']([^"']+)["']/);
    
    if (apiKeyMatch && projectIdMatch) {
      console.log('✅ Firebase configuration found');
      console.log(`   Project ID: ${projectIdMatch[1]}`);
      
      // Update migrate-from-csv.js with the correct config
      updateMigrationScript(configContent);
    } else {
      console.log('⚠️  Firebase config found but could not extract project details');
    }
  } catch (error) {
    console.log('❌ Error reading firebase-config.js:', error.message);
  }
} else {
  console.log('❌ firebase-config.js not found');
  console.log('   Please ensure your Firebase configuration is set up correctly');
}

// Check if data directory exists
const dataDir = './data';
if (!fs.existsSync(dataDir)) {
  console.log('\n📁 Creating data directory...');
  fs.mkdirSync(dataDir);
  console.log('✅ Created data directory');
} else {
  console.log('✅ Data directory exists');
}

// Check for CSV files
const mainCSV = path.join(dataDir, 'main.csv');
const projectsCSV = path.join(dataDir, 'projects.csv');

console.log('\n📊 CSV Files Status:');
if (fs.existsSync(mainCSV)) {
  console.log('✅ main.csv found');
} else {
  console.log('❌ main.csv not found');
  console.log('   Please export your Main sheet from Google Sheets as CSV and save it as data/main.csv');
}

if (fs.existsSync(projectsCSV)) {
  console.log('✅ projects.csv found');
} else {
  console.log('⚠️  projects.csv not found (optional)');
}

console.log('\n📋 Next Steps:');
console.log('1. Export your Main sheet from Google Sheets as CSV');
console.log('2. Save it as data/main.csv');
console.log('3. If you have a Projects sheet, export it as data/projects.csv');
console.log('4. Run: npm install');
console.log('5. Run: node migrate-from-csv.js');

console.log('\n🔗 To get your Google Sheets ID:');
console.log('1. Open your Google Sheets');
console.log('2. Look at the URL: https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit');
console.log('3. Copy the ID (the long string between /d/ and /edit)');

function updateMigrationScript(configContent) {
  try {
    // Extract Firebase config values
    const apiKeyMatch = configContent.match(/apiKey:\s*["']([^"']+)["']/);
    const authDomainMatch = configContent.match(/authDomain:\s*["']([^"']+)["']/);
    const projectIdMatch = configContent.match(/projectId:\s*["']([^"']+)["']/);
    const storageBucketMatch = configContent.match(/storageBucket:\s*["']([^"']+)["']/);
    const messagingSenderIdMatch = configContent.match(/messagingSenderId:\s*["']([^"']+)["']/);
    const appIdMatch = configContent.match(/appId:\s*["']([^"']+)["']/);

    if (apiKeyMatch && projectIdMatch) {
      const migrationScriptPath = './migrate-from-csv.js';
      let migrationContent = fs.readFileSync(migrationScriptPath, 'utf8');

      // Update the Firebase config in the migration script
      const newConfig = `const firebaseConfig = {
  apiKey: "${apiKeyMatch[1]}",
  authDomain: "${authDomainMatch ? authDomainMatch[1] : projectIdMatch[1] + '.firebaseapp.com'}",
  projectId: "${projectIdMatch[1]}",
  storageBucket: "${storageBucketMatch ? storageBucketMatch[1] : projectIdMatch[1] + '.appspot.com'}",
  messagingSenderId: "${messagingSenderIdMatch ? messagingSenderIdMatch[1] : '123456789'}",
  appId: "${appIdMatch ? appIdMatch[1] : '1:123456789:web:abcdefghijklmnop'}"
};`;

      // Replace the old config
      const oldConfigRegex = /const firebaseConfig = \{[^}]*\};/s;
      migrationContent = migrationContent.replace(oldConfigRegex, newConfig);

      fs.writeFileSync(migrationScriptPath, migrationContent);
      console.log('✅ Updated migrate-from-csv.js with your Firebase configuration');
    }
  } catch (error) {
    console.log('⚠️  Could not update migration script:', error.message);
  }
}

console.log('\n🎯 Ready to migrate!');
console.log('Run: node setup-migration.js to check setup again'); 