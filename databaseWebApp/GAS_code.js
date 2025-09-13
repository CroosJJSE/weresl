function doGet() {
    return HtmlService.createHtmlOutputFromFile('Index')
      .setTitle('Profile Selector')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
  
  function getAllProfiles() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Main');
    if (!sheet) {
      console.error("Main sheet not found");
      return [];
    }
    
    const data = sheet.getDataRange().getValues();
    if (data.length < 3) {
      console.error("Not enough data rows");
      return [];
    }
    
    const headers = data[0]; // Get headers from row 1
    const profiles = [];
    
    // Map known column indices to field names
    const knownFields = {
      'Reg_ID': 0,
      'District': 1,
      'Name': 2,
      'Age': 3,
      'Address': 4,
      'NIC': 5,
      'Contact': 6,
      'Total_Children': 7,
      'School_Kids': 8,
      'Others': 9,
      'Description': 10,
      'Occupation': 11,
      'RF_Loan': 12,
      'RF_Paid_History': 13,
      'RF_Cur_Prj': 14,
      'Com_prjs': 15,
      'Image': 16,
      'GRANT': 17,
      'GIFor': 18,
      'GRANT_Cur_Prj': 19
    };
    
    // Process each row starting from row 3
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const profile = {};
      
      // First try to use headers
      for (let j = 0; j < headers.length; j++) {
        const header = headers[j] ? headers[j].trim() : '';
        if (header && row[j] !== '' && row[j] !== null && row[j] !== undefined) {
          profile[header] = row[j];
        }
      }
      
      // If some fields are empty, try using known indices as fallback
      for (const [field, index] of Object.entries(knownFields)) {
        if (index < row.length && !profile[field] && 
            row[index] !== '' && row[index] !== null && row[index] !== undefined) {
          profile[field] = row[index];
        }
      }
      
      // Ensure required fields exist
      if (profile['Reg_ID'] && profile['Name']) {
        profiles.push(profile);
      }
    }
    
    console.log(`Loaded ${profiles.length} profiles`);
    return profiles;
  }
  
  const LOGO_FILE_ID = '1F727f-TTYnFjl93DQiSXvvY9DJaJEaNX';
  
  function getSelectedProfilesData(selectedIds) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Main');
    if (!sheet) return [];
    
    const data = sheet.getDataRange().getValues();
    if (data.length < 3) return [];
    
    const headers = data[0]; // Get headers from row 1
    const selectedProfiles = [];
    
    // Map known column indices to field names
    const knownFields = {
      'Reg_ID': 0,
      'District': 1,
      'Name': 2,
      'Age': 3,
      'Address': 4,
      'NIC': 5,
      'Contact': 6,
      'Total_Children': 7,
      'School_Kids': 8,
      'Others': 9,
      'Description': 10,
      'Occupation': 11,
      'RF_Loan': 12,
      'RF_Paid_History': 13,
      'RF_Cur_Prj': 14,
      'Com_prjs': 15,
      'Image': 16,
      'GRANT': 17,
      'GIFor': 18,
      'GRANT_Cur_Prj': 19
    };
    
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (selectedIds.includes(row[0].toString())) {
        const profile = {};
        
        // First try to use headers
        for (let j = 0; j < headers.length; j++) {
          const header = headers[j] ? headers[j].trim() : '';
          if (header && row[j] !== '' && row[j] !== null && row[j] !== undefined) {
            profile[header] = row[j];
          }
        }
        
        // If some fields are empty, try using known indices as fallback
        for (const [field, index] of Object.entries(knownFields)) {
          if (index < row.length && !profile[field] && 
              row[index] !== '' && row[index] !== null && row[index] !== undefined) {
            profile[field] = row[index];
          }
        }
        
        console.log(`Profile data for ${row[0]}: ${JSON.stringify(profile)}`);
        selectedProfiles.push(profile);
      }
    }
    
    console.log(`Selected ${selectedProfiles.length} profiles for PDF`);
    return selectedProfiles;
  }
  
  function getImageAsBase64(fileIdOrUrl) {
    try {
      if (!fileIdOrUrl) return '';
      
      // Extract file ID from URL if needed
      let fileId = fileIdOrUrl;
      if (fileIdOrUrl.includes('drive.google.com')) {
        const match = fileIdOrUrl.match(/\/file\/d\/([^\/]+)/) || 
                     fileIdOrUrl.match(/id=([^&]+)/) ||
                     fileIdOrUrl.match(/[-\w]{25,}/);
        fileId = match ? match[1] : fileIdOrUrl;
      }
      
      // Try direct access first
      try {
        const file = DriveApp.getFileById(fileId);
        return Utilities.base64Encode(file.getBlob().getBytes());
      } catch (e) {
        console.warn(`Direct access failed for ${fileId}, trying URL fallback: ${e}`);
      }
      
      // Fallback to URL access
      const url = `https://drive.google.com/uc?export=download&id=${fileId}`;
      const response = UrlFetchApp.fetch(url, {
        muteHttpExceptions: true,
        headers: { 'Authorization': 'Bearer ' + ScriptApp.getOAuthToken() }
      });
      
      if (response.getResponseCode() === 200) {
        return Utilities.base64Encode(response.getContent());
      }
      throw new Error(`HTTP ${response.getResponseCode()}`);
    } catch (e) {
      console.error(`Failed to get image ${fileIdOrUrl}: ${e}`);
      return '';
    }
  }
  
  function generateProfilesPDF(selectedIds) {
    try {
      const profiles = getSelectedProfilesData(selectedIds);
      if (profiles.length === 0) throw new Error("No profiles selected");
      
      const logoBase64 = getImageAsBase64(LOGO_FILE_ID);
      let htmlContent = createPDFHtml(profiles, logoBase64);
      
      // Create PDF
      const blob = HtmlService.createHtmlOutput(htmlContent)
        .getAs('application/pdf')
        .setName(`Profiles_Report_${new Date().toISOString().slice(0,10)}.pdf`);
      
      return {
        pdf: Utilities.base64Encode(blob.getBytes()),
        filename: blob.getName(),
        count: profiles.length
      };
    } catch (e) {
      console.error('PDF generation failed:', e);
      throw new Error('Failed to generate PDF: ' + e.message);
    }
  }
  
  function createPDFHtml(profiles, logoBase64) {
    let profilesHtml = profiles.map((profile, index) => {
      // Get image if available
      const imageBase64 = profile.Image ? getImageAsBase64(profile.Image) : '';
      
      // Create table with ALL non-empty fields except Image
      const fieldsHtml = Object.entries(profile)
        .filter(([key, value]) => 
          key !== 'Image' && 
          value !== '' && 
          value !== null && 
          value !== undefined
        )
        .map(([key, value]) => `
          <tr>
            <td class="field-name">${key}</td>
            <td class="field-value">${value}</td>
          </tr>
        `).join('');
      
      // Debug output
      console.log(`Profile ${index+1} fields: ${Object.keys(profile).join(', ')}`);
      
      return `
        <div class="profile">
          <h2>${profile.Name || 'Unknown'} (${profile.Reg_ID || 'No ID'})</h2>
          
          <div class="profile-container">
            <div class="profile-details">
              <table class="profile-fields">
                ${fieldsHtml}
              </table>
            </div>
            
            <div class="profile-image-container">
              ${imageBase64 ? `
                <div class="profile-image">
                  <img src="data:image/jpeg;base64,${imageBase64}">
                </div>
              ` : '<div class="no-image">No image available</div>'}
            </div>
          </div>
          
          ${index < profiles.length - 1 ? '<div class="page-break"></div>' : ''}
        </div>
      `;
    }).join('');
  
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          @page { margin: 15mm; size: A4; }
          body { font-family: Arial; font-size: 10pt; line-height: 1.4; }
          .header { text-align: center; margin-bottom: 15px; }
          .logo { height: 50px; }
          h2 { color: #4285F4; margin: 20px 0 10px 0; padding-bottom: 5px; border-bottom: 1px solid #ccc; }
          .profile { margin-bottom: 20px; page-break-inside: avoid; }
          .profile-container { display: flex; flex-direction: row; }
          .profile-details { flex: 1; }
          .profile-image-container { width: 150px; margin-left: 15px; }
          .profile-image { text-align: center; }
          .profile-image img { max-height: 150px; max-width: 150px; }
          .no-image { text-align: center; color: #999; font-style: italic; padding: 50px 0; border: 1px dashed #ccc; }
          .profile-fields { width: 100%; border-collapse: collapse; margin-top: 5px; }
          .field-name { 
            font-weight: bold; 
            width: 30%; 
            padding: 5px; 
            vertical-align: top;
            border-bottom: 1px solid #eee;
          }
          .field-value { 
            padding: 5px; 
            vertical-align: top;
            border-bottom: 1px solid #eee;
          }
          .page-break { page-break-after: always; }
        </style>
      </head>
      <body>
        <div class="header">
          ${logoBase64 ? `<img src="data:image/jpeg;base64,${logoBase64}" class="logo">` : ''}
          <h1>Selected Profiles Report</h1>
          <p>Generated: ${new Date().toLocaleDateString()}</p>
        </div>
        ${profilesHtml}
      </body>
      </html>
    `;
  }
  
  // Helper function to extract file ID from URL
  function extractFileId(url) {
    if (!url) return '';
    const match = url.match(/[-\w]{25,}/);
    return match ? match[0] : '';
  }
  // Debug function to test with a single profile
  function testProfilePDF(regId) {
    try {
      const result = generateProfilesPDF([regId]);
      
      // Save to Drive for inspection
      const blob = Utilities.newBlob(
        Utilities.base64Decode(result.pdf), 
        'application/pdf', 
        result.filename
      );
      const file = DriveApp.createFile(blob);
      
      return {
        url: file.getUrl(),
        profile: getSelectedProfilesData([regId])[0],
        fields: Object.keys(getSelectedProfilesData([regId])[0] || {})
      };
    } catch (e) {
      return { error: e.toString() };
    }
  }
  
  function runTest() {
    const result = testProfilePDF("KIL057");
    console.log("PDF URL:", result.url);
    console.log("Profile Data:", result.profile);
    return result;
  }