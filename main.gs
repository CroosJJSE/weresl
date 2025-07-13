function getDistrictFromRegID(regID) {
  // District mapping based on RegID prefix
  const districtMapping = {
    "MAN": "Mannar", "COL": "Colombo", "BAT": "Batticaloa", "GAM": "Gampaha", "KAL": "Kalutara",
    "KAN": "Kandy", "KUR": "Kurunegala", "JAF": "Jaffna", "VAV": "Vavuniya", "TRI": "Trincomalee",
    "MTR": "Matara", "HAM": "Hambantota", "MON": "Monaragala", "ANU": "Anuradhapura", "POL": "Polonnaruwa",
    "PUT": "Puttalam", "RAT": "Ratnapura", "NUW": "Nuwara Eliya", "BAD": "Badulla", "KEG": "Kegalle",
    "MUL": "Mullaitivu", "MTL": "Matale", "AMP": "Ampara", "KIL": "Kilinochchi", "GAE": "Galle"
  };

  // Extract the first 3 characters of the RegID
  const districtPrefix = regID.substring(0, 3).toUpperCase();

  // Return the corresponding district or "Unknown" if not found
  return districtMapping[districtPrefix] || "Unknown";
}

function getDistrictCodeFromName(districtName) {
  const districtCodes = {
    "Mannar": "MAN", "Colombo": "COL", "Batticaloa": "BAT", "Gampaha": "GAM", 
    "Kalutara": "KAL", "Kandy": "KAN", "Kurunegala": "KUR", "Jaffna": "JAF", 
    "Vavuniya": "VAV", "Trincomalee": "TRI", "Matara": "MTR", "Hambantota": "HAM", 
    "Monaragala": "MON", "Anuradhapura": "ANU", "Polonnaruwa": "POL", "Puttalam": "PUT", 
    "Ratnapura": "RAT", "Nuwara Eliya": "NUW", "Badulla": "BAD", "Kegalle": "KEG", 
    "Mullaitivu": "MUL", "Matale": "MTL", "Ampara": "AMP", "Kilinochchi": "KIL", 
    "Galle": "GAE"
  };
  return districtCodes[districtName] || "UNK"; // Default to UNK if not found
}

function extractFileId(url) {
  const match = url.match(/\/d\/(.+?)(\/|$)/) || url.match(/id=([^&]+)/);
  return match ? match[1] : null;
}



function onRFGIFReturnSubmit() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetReturn = ss.getSheetByName("RF_GIF_Return");
  const sheetMain = ss.getSheetByName("Main");
  const returnData = sheetReturn.getDataRange().getValues();
  const mainData = sheetMain.getDataRange().getValues();

  logToSheet("RF_GIF_Return", "Info", `Processing ${returnData.length - 1} entries`);

  const today = new Date();
  const formattedDate = Utilities.formatDate(today, Session.getScriptTimeZone(), "dd-MM-yyyy");

  for (let i = 1; i < returnData.length; i++) {
    const row = returnData[i];
    const regId = row[2];
    const type = row[3];
    const details = row[4];
    let Paid_amount = parseFloat(row[5]) || 0;

    // Skip rows that are already processed (have Valid or Invalid status)
    if (row[0] === "Valid" || row[0] === "Invalid") {
      continue;
    }

    // Skip completely empty rows
    if (!regId && !type && !details && !Paid_amount) {
      continue;
    }

    logToSheet("RF_GIF_Return", "Processing", `Row ${i + 1}: RegID ${regId}, Type: ${type}, Amount: ${Paid_amount}`);

    let isValid = false;
    let mainRowIndex = -1;
    let validationMessage = "";

    // Validate required fields first
    if (!regId) {
      validationMessage = "Missing RegID";
    } else if (!type) {
      validationMessage = "Missing Type";
    } else if (type !== "RF" && type !== "GRANT") {
      validationMessage = `Invalid Type: ${type}. Must be 'RF' or 'GRANT'`;
    } else if (type === "RF" && (!Paid_amount || Paid_amount <= 0)) {
      validationMessage = "Invalid or missing amount for RF type";
    } else if (type === "GRANT" && !details) {
      validationMessage = "Missing details for GRANT type";
    } else {
      // Check if RegID exists in Main sheet
      for (let j = 2; j < mainData.length; j++) {
        if (mainData[j][0] === regId) {
          isValid = true;
          mainRowIndex = j;
          break;
        }
      }
      
      if (!isValid) {
        validationMessage = `RegID ${regId} not found in Main sheet`;
      }
    }

    const validCell = sheetReturn.getRange(i + 1, 1);
    
    if (isValid) {
      validCell.setValue("Valid").setFontColor("green");
      logToSheet("RF_GIF_Return", "Info", `Valid entry - RegID: ${regId}, Type: ${type}`);

      // Fixed RF_Cur_Prj processing section
      if (type === "RF") {
        // Update RF_Paid_History (now column 14, index 13)
        const currentPaidHistory = mainData[mainRowIndex][13] || "";
        const paidEntry = `${Paid_amount} [${formattedDate}]`;
        const newPaidHistory = currentPaidHistory ? `${currentPaidHistory} + ${paidEntry}` : paidEntry;
        sheetMain.getRange(mainRowIndex + 1, 14).setValue(newPaidHistory);
        logToSheet("RF_GIF_Return", "Info", `Updated RF_Paid_History for RegID ${regId}: ${newPaidHistory}`);

        // Process RF_Cur_Prj (now column 15, index 14)
        // Get fresh data to ensure we have the latest RF_Cur_Prj value
        const freshMainData = sheetMain.getDataRange().getValues();
        let currentProjects = freshMainData[mainRowIndex][14] || "";
        logToSheet("RF_GIF_Return", "Info", `Current RF_Cur_Prj for RegID ${regId}: ${currentProjects}`);

        let updatedProjects = [];
        let completedProjects = [];
        let remainingPayment = Paid_amount;

        logToSheet("RF_GIF_Return", "Debug", `Processing payment of ${Paid_amount} for RegID ${regId}`);
        logToSheet("RF_GIF_Return", "Debug", `Original currentProjects: "${currentProjects}"`);

        if (currentProjects) {
          // First, clean up the currentProjects string by removing extra spaces and + signs
          const cleanedProjects = currentProjects.replace(/\s*\+\s*\+\s*/g, ' + ').replace(/^\s*\+\s*|\s*\+\s*$/g, '').trim();
          
          // Improved regex pattern to handle project names and amounts with commas
          const projectPattern = /([^()]+?)\s*\(\s*([\d,]+(?:\.\d+)?)\s*\)/g;
          const projects = [];
          let match;
          
          // Extract all projects using regex
          while ((match = projectPattern.exec(cleanedProjects)) !== null) {
            const projectName = match[1].trim();
            const amount = parseFloat(match[2].replace(/,/g, ""));
            if (projectName && !isNaN(amount)) {
              projects.push({
                name: projectName,
                Prj_remainingAmount: amount
              });
            }
          }

          logToSheet("RF_GIF_Return", "Info", `Extracted Projects for RegID ${regId}: ${JSON.stringify(projects)}`);

          // Process each project
          for (let project of projects) {
            logToSheet("RF_GIF_Return", "Debug", `Processing project: ${project.name} with amount ${project.Prj_remainingAmount}, remaining payment: ${remainingPayment}`);
            
            if (remainingPayment > 0) {
              if (project.Prj_remainingAmount <= remainingPayment) {
                // Project is completely paid off
                completedProjects.push({
                  name: project.name,
                  amount: project.Prj_remainingAmount
                });
                remainingPayment -= project.Prj_remainingAmount;
                logToSheet("RF_GIF_Return", "Info", `Project ${project.name} completed with amount ${project.Prj_remainingAmount}. Remaining payment: ${remainingPayment}`);
              } else {
                // Project is partially paid
                project.Prj_remainingAmount -= remainingPayment;
                remainingPayment = 0;
                updatedProjects.push(`${project.name} (${project.Prj_remainingAmount})`);
                logToSheet("RF_GIF_Return", "Info", `Project ${project.name} partially paid. Remaining amount: ${project.Prj_remainingAmount}`);
              }
            } else {
              // No payment left, keep project as is
              updatedProjects.push(`${project.name} (${project.Prj_remainingAmount})`);
              logToSheet("RF_GIF_Return", "Debug", `Project ${project.name} unchanged with amount ${project.Prj_remainingAmount}`);
            }
          }
        } else {
          logToSheet("RF_GIF_Return", "Warning", `No current projects found for RegID ${regId}. Payment of ${Paid_amount} cannot be applied.`);
        }

        // Update RF_Cur_Prj with remaining projects
        // Filter out any empty strings and join properly
        const filteredProjects = updatedProjects.filter(project => project && project.trim() !== "");
        const finalUpdatedProjects = filteredProjects.join(" + ");
        sheetMain.getRange(mainRowIndex + 1, 15).setValue(finalUpdatedProjects);
        logToSheet("RF_GIF_Return", "Info", `Updated RF_Cur_Prj for RegID ${regId}: "${finalUpdatedProjects}"`);

        // Update Com_prjs (now column 16, index 15)
        if (completedProjects.length > 0) {
          const currentCompleted = freshMainData[mainRowIndex][15] || "";
          
          // Format completed projects with their amounts
          const completedProjectsWithAmounts = completedProjects.map(project => 
            `${project.name} (${project.amount})`
          );
          
          const newCompleted = currentCompleted
            ? `${currentCompleted} + ${completedProjectsWithAmounts.join(" + ")}`
            : completedProjectsWithAmounts.join(" + ");
          sheetMain.getRange(mainRowIndex + 1, 16).setValue(newCompleted);
          logToSheet("RF_GIF_Return", "Info", `Updated Com_prjs for RegID ${regId}: ${newCompleted}`);
        }

        // Handle excess payment (if any)
        if (remainingPayment > 0) {
          logToSheet("RF_GIF_Return", "Warning", `RegID ${regId}: Excess payment of ${remainingPayment} after all projects completed`);
          // You might want to add logic here to handle excess payments
        }

        // Validation: Check if RF_Loan = RF_Paid_History + RF_Cur_Prj + Com_prjs
        validateLoanBalance(mainRowIndex, regId, sheetMain);
      } else if (type === "GRANT") {
        // Update GIFor (now column 19, index 18)
        const currentGIFor = mainData[mainRowIndex][18] || "";
        const newGIFor = currentGIFor ? `${currentGIFor} + ${details} [${formattedDate}]` : `${details} [${formattedDate}]`;
        sheetMain.getRange(mainRowIndex + 1, 19).setValue(newGIFor);
        logToSheet("RF_GIF_Return", "Info", `Updated GIFor for RegID ${regId}: ${newGIFor}`);
      }

    } else {
      validCell.setValue("Invalid").setFontColor("red");
      logToSheet("RF_GIF_Return", "Error", `Invalid entry at row ${i + 1}: ${validationMessage}`);
      
      // Send immediate notification for this invalid entry
      sendImmediateInvalidNotification(row, i + 1, validationMessage, "RF_GIF_Return");
    }
  }
  
  // Final summary log
  logToSheet("RF_GIF_Return", "Info", `Processing completed. Total rows processed: ${returnData.length - 1}`);
}

function validateLoanBalance(mainRowIndex, regId, sheetMain) {
  try {
    // Get fresh data from the sheet after all updates
    const currentMainData = sheetMain.getDataRange().getValues();
    
    // RF_Loan - Column M (index 12)
    const rfLoan = parseFloat(currentMainData[mainRowIndex][12]) || 0;
    
    // RF_Paid_History - Column N (index 13) 
    const rfPaidHistory = currentMainData[mainRowIndex][13] || "";
    
    // RF_Cur_Prj - Column O (index 14)
    const rfCurPrj = currentMainData[mainRowIndex][14] || "";
    
    // Com_prjs - Column P (index 15)
    const comPrjs = currentMainData[mainRowIndex][15] || "";
    
    logToSheet("RF_GIF_Return", "Debug", `RegID ${regId} - Raw data: RF_Loan="${rfLoan}", RF_Paid_History="${rfPaidHistory}", RF_Cur_Prj="${rfCurPrj}", Com_prjs="${comPrjs}"`);
    
    // Extract and sum amounts from RF_Paid_History
    let totalPaid = 0;
    if (rfPaidHistory) {
      const paidMatches = rfPaidHistory.match(/(\d+(?:\.\d+)?)/g);
      if (paidMatches) {
        totalPaid = paidMatches.reduce((sum, amount) => sum + parseFloat(amount), 0);
      }
    }
    
    // Extract and sum amounts from RF_Cur_Prj
    let totalCurrent = 0;
    if (rfCurPrj) {
      const currentMatches = rfCurPrj.match(/\((\d+(?:,\d+)*(?:\.\d+)?)\)/g);
      if (currentMatches) {
        totalCurrent = currentMatches.reduce((sum, match) => {
          const amount = match.replace(/[(),]/g, '');
          return sum + parseFloat(amount);
        }, 0);
      }
    }
    
    // Extract and sum amounts from Com_prjs
    // For completed projects, we need to get their original amounts from somewhere
    // Since completed projects might not have amounts in brackets, we'll skip this for now
    // This might need to be tracked differently in your system
    let totalCompleted = 0;
    if (comPrjs) {
      const completedMatches = comPrjs.match(/\((\d+(?:,\d+)*(?:\.\d+)?)\)/g);
      if (completedMatches) {
        totalCompleted = completedMatches.reduce((sum, match) => {
          const amount = match.replace(/[(),]/g, '');
          return sum + parseFloat(amount);
        }, 0);
      }
    }
    
    const totalAccountedFor = totalPaid + totalCurrent + totalCompleted;
    const difference = Math.abs(rfLoan - totalAccountedFor);
    
    logToSheet("RF_GIF_Return", "Validation", `RegID ${regId}: RF_Loan=${rfLoan}, Paid=${totalPaid}, Current=${totalCurrent}, Completed=${totalCompleted}, Total=${totalAccountedFor}`);
    
    // Allow for small floating point differences (0.01)
    if (difference > 0.01) {
      const warningMessage = `WARNING: RegID ${regId} - Loan balance mismatch! RF_Loan(${rfLoan}) ≠ Paid(${totalPaid}) + Current(${totalCurrent}) + Completed(${totalCompleted}) = ${totalAccountedFor}. Difference: ${difference}`;
      logToSheet("RF_GIF_Return", "Warning", warningMessage);
      
      // Add a comment to the RF_Loan cell for easy identification
      try {
        const rfLoanCell = sheetMain.getRange(mainRowIndex + 1, 13); // Column M
        rfLoanCell.setNote(`Loan Balance Mismatch: Expected ${rfLoan}, Actual ${totalAccountedFor}, Difference: ${difference}`);
      } catch (commentError) {
        logToSheet("RF_GIF_Return", "Warning", `Could not add comment to cell: ${commentError.toString()}`);
      }
    } else {
      logToSheet("RF_GIF_Return", "Validation", `RegID ${regId}: Loan balance validation passed`);
    }
    
  } catch (error) {
    logToSheet("RF_GIF_Return", "Error", `Validation error for RegID ${regId}: ${error.toString()}`);
  }
}

function onLoanInitFormSubmit() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetLoanInit = ss.getSheetByName("Loan_INIT");
  const sheetMain = ss.getSheetByName("Main");
  const InitLoanData = sheetLoanInit.getDataRange().getValues();
  const mainData = sheetMain.getDataRange().getValues();
  
  // Target folder for compressed images
  const targetFolder = DriveApp.getFolderById("1l8yBRcK_QHNFr7WrSjrdxwYHgVjwyBSM");

  logToSheet("Loan_INIT", "Info", `Processing ${InitLoanData.length - 1} entries`);

  // Column indices for Loan_INIT
  const statusCol = 0, timestampCol = 1, registeredCol = 2, loanRegIdCol = 3, nameCol = 4;
  const ageCol = 5, InitLoanNicCol = 6, phoneCol = 7, districtCol = 8, addressCol = 9;
  const totalChildrenCol = 10, schoolKidsCol = 11, othersCol = 12, descriptionCol = 13;
  const industryCol = 14, loanTypeCol = 15, amountCol = 16, purposeCol = 17, pictureCol = 18;

  // columns from Main
  const mainNicCol = 5;
  const mainRegIdCol = 0; // Main tab RegID column (A column)
  const rfLoanCol = 12; // M column (RF_Loan)
  const rfCurPrjCol = 14; // O column (RF_Cur_Prj)
  const grantCol = 17; // R column (GRANT)
  const grantCurPrjCol = 19; // T column (GRANT_Cur_Prj)

  for (let i = 1; i < InitLoanData.length; i++) {
    const row = InitLoanData[i];
    const registered = row[registeredCol];
    const range = sheetLoanInit.getRange(i + 1, 1);
    const currentStatus = range.getValue();

    // Skip if already processed (has Valid, Invalid, or Error status)
    if (currentStatus === "Valid" || currentStatus === "Invalid" || currentStatus === "Error") {
      continue;
    }
    
    let isValid = false;
    let errorMessage = "";

    if (registered === "Yes") {
        const regId = row[loanRegIdCol];
        let isRegIdValid = false;
        let mainRowIndex = -1;

        // Check if RegID exists in Main tab
        for (let j = 1; j < mainData.length; j++) {
          if (mainData[j][mainRegIdCol] === regId) {
            isRegIdValid = true;
            mainRowIndex = j;
            break;
          }
        }

        if (!isRegIdValid) {
          isValid = false;
          errorMessage = `RegID not found in Main tab: ${regId}`;
        } else {
          try {
            // Extract loan details
            const loanType = row[loanTypeCol];
            const amount = parseFloat(row[amountCol]) || 0;
            const purpose = (row[purposeCol] || "").toString();
            const timestamp = row[timestampCol];
            const date = formatDate(timestamp);

            // Validate only amount (other fields are required in Google Form)
            if (amount <= 0) {
              isValid = false;
              errorMessage = `Invalid amount: ${row[amountCol]}. Amount must be greater than 0`;
            } else {
              // Update Main tab based on loan type
              if (loanType === "RF") {
                // Update RF_Loan column (M) - append with "+"
                const rfLoanEntry = `${purpose} (${amount}) [${date}]`;
                const currentRfLoan = mainData[mainRowIndex][rfLoanCol] || "";
                const newRfLoan = currentRfLoan ? `${currentRfLoan} + ${rfLoanEntry}` : rfLoanEntry;
                sheetMain.getRange(mainRowIndex + 1, rfLoanCol + 1).setValue(newRfLoan);

                // Update RF_Cur_Prj column (O) - append with "+"
                const rfCurPrjEntry = `${purpose} (${amount})`;
                const currentRfCurPrj = mainData[mainRowIndex][rfCurPrjCol] || "";
                const newRfCurPrj = currentRfCurPrj ? `${currentRfCurPrj} + ${rfCurPrjEntry}` : rfCurPrjEntry;
                sheetMain.getRange(mainRowIndex + 1, rfCurPrjCol + 1).setValue(newRfCurPrj);

                logToSheet("Loan_INIT", "Info", `Updated RF loan for RegID: ${regId}`);
              } 
              else if (loanType === "GRANT") {
                // Update GRANT column (R) - add amount to existing
                const currentGrant = parseFloat(mainData[mainRowIndex][grantCol]) || 0;
                const newGrant = currentGrant + amount;
                sheetMain.getRange(mainRowIndex + 1, grantCol + 1).setValue(newGrant);

                // Update GRANT_Cur_Prj column (T) - append with "+"
                const grantCurPrjEntry = `${purpose} (${amount}) [${date}]`;
                const currentGrantCurPrj = mainData[mainRowIndex][grantCurPrjCol] || "";
                const newGrantCurPrj = currentGrantCurPrj ? `${currentGrantCurPrj} + ${grantCurPrjEntry}` : grantCurPrjEntry;
                sheetMain.getRange(mainRowIndex + 1, grantCurPrjCol + 1).setValue(newGrantCurPrj);

                logToSheet("Loan_INIT", "Info", `Updated GRANT for RegID: ${regId}`);
              }
              
              isValid = true;
              logToSheet("Loan_INIT", "Success", `Successfully updated existing registration: ${regId}`);
            }
          } catch (error) {
            isValid = false;
            errorMessage = `Error updating existing registration: ${error.toString()}`;
          }
        }
      } else if (registered === "No") {
        const nic = row[InitLoanNicCol];
        let isNicValid = true;

        // Check if NIC already exists
        for (let j = 1; j < mainData.length; j++) {
          if (mainData[j][mainNicCol] === nic) {
            isNicValid = false;
            break;
          }
        }

        if (!isNicValid) {
          isValid = false;
          errorMessage = `NIC already exists: ${nic}`;
        } else {
          // Generate new RegID
          const districtName = row[districtCol];
          const districtCode = getDistrictCodeFromName(districtName);
          
          if (!districtCode) {
            isValid = false;
            errorMessage = `Invalid district name: ${districtName}`;
          } else {
            try {
              const existingRegIDs = mainData.slice(1)
                .map(row => String(row[0] || ''))
                .filter(regId => regId.startsWith(districtCode))
                .map(regId => parseInt(regId.replace(districtCode, ""), 10))
                .filter(id => !isNaN(id));

              const nextID = existingRegIDs.length > 0 ? Math.max(...existingRegIDs) + 1 : 1;
              const newRegId = `${districtCode}${nextID.toString().padStart(3, '0')}`;

              // Prepare new Main entry
              const loanType = row[loanTypeCol];
              const amount = parseFloat(row[amountCol]) || 0;
              const purpose = (row[purposeCol] || "").toString();
              const timestamp = row[timestampCol];
              const date = formatDate(timestamp);
              
              // Validate only amount (other fields are required in Google Form)
              if (amount <= 0) {
                isValid = false;
                errorMessage = `Invalid amount: ${row[amountCol]}. Amount must be greater than 0`;
              } else {
                // Process and compress the image
                let imageUrl = row[pictureCol] || "";
                let compressedImageUrl = "";
                
                if (imageUrl) {
                  try {
                    compressedImageUrl = processAndStoreImage(imageUrl, newRegId, targetFolder);
                    logToSheet("Loan_INIT", "Info", `Compressed image stored for ${newRegId}`);
                  } catch (e) {
                    logToSheet("Loan_INIT", "Error", `Image processing failed for ${newRegId}: ${e}`);
                    // Fall back to original URL if compression fails
                    compressedImageUrl = imageUrl;
                  }
                }

                const newRow = [
                  newRegId,              // Column 1
                  row[8],               // District
                  row[4],               // Name
                  row[5],               // Age
                  row[9],               // Address
                  row[6],               // NIC
                  row[7],               // Phone
                  row[10],              // Total Children
                  row[11],              // School Kids
                  row[12],              // Others
                  row[13],              // Description
                  row[14],              // Industry/Occupation
                  loanType === "RF" ? `${purpose} (${amount}) [${date}]` : "",  // RF_Loan
                  "",                   // RF_Paid_History
                  loanType === "RF" ? `${purpose} (${amount})` : "",  // RF_Cur_Prj
                  "",                   // Com_prjs
                  compressedImageUrl,   // Compressed Image URL
                  loanType === "GRANT" ? amount : "",  // GRANT
                  "",                   // GIFor
                  loanType === "GRANT" ? `${purpose} (${amount}) [${date}]` : ""  // GRANT_Cur_Prj
                ];

                sheetMain.appendRow(newRow);
                sheetLoanInit.getRange(i + 1, 4).setValue(newRegId);
                isValid = true;
                logToSheet("Loan_INIT", "Success", `Successfully created new registration: ${newRegId}`);
              }
            } catch (error) {
              isValid = false;
              errorMessage = `Error creating new registration: ${error.toString()}`;
            }
          }
        }
      } else {
        // Invalid registration status
        isValid = false;
        errorMessage = `Invalid registration status: ${registered}. Must be 'Yes' or 'No'`;
      }

      // Set status and send immediate notification if invalid
      if (isValid) {
        range.setValue("Valid").setFontColor("green");
      } else {
        range.setValue("Invalid").setFontColor("red");
        logToSheet("Loan_INIT", "Warning", `Row ${i + 1}: ${errorMessage}`);
        
        // Send immediate notification for this invalid entry
        sendImmediateInvalidNotification(row, i + 1, errorMessage, "Loan_INIT");
      }
    }
  }

// Function to send immediate notification for a single invalid entry
/**
 * Sends immediate notification for invalid form entries
 * @param {Array} rowData - The row data from the form submission
 * @param {number} rowNumber - The row number in the sheet
 * @param {string} errorMessage - The error message describing why the entry is invalid
 * @param {string} formType - The type of form ("Loan_INIT" or "RF_GIF_Return")
 */
function sendImmediateInvalidNotification(rowData, rowNumber, errorMessage, formType) {
  try {
    const subject = `🚨 Invalid ${formType} Form Entry - Row ${rowNumber}`;
    
    let body = `<h2>Invalid ${formType} Form Entry Alert</h2>`;
    body += `<p><strong>⚠️ An invalid entry was detected in the ${formType} form:</strong></p>`;
    
    body += `<table border="1" style="border-collapse: collapse; margin: 10px 0;">`;
    body += `<tr style="background-color: #f0f0f0;"><th style="padding: 8px;">Field</th><th style="padding: 8px;">Value</th></tr>`;
    body += `<tr><td style="padding: 8px;"><strong>Row Number</strong></td><td style="padding: 8px;">${rowNumber}</td></tr>`;
    
    if (formType === "Loan_INIT") {
      // Loan form specific fields
      body += `<tr><td style="padding: 8px;"><strong>Name</strong></td><td style="padding: 8px;">${rowData[4] || 'N/A'}</td></tr>`;
      body += `<tr><td style="padding: 8px;"><strong>NIC</strong></td><td style="padding: 8px;">${rowData[6] || 'N/A'}</td></tr>`;
      body += `<tr><td style="padding: 8px;"><strong>Phone</strong></td><td style="padding: 8px;">${rowData[7] || 'N/A'}</td></tr>`;
      body += `<tr><td style="padding: 8px;"><strong>District</strong></td><td style="padding: 8px;">${rowData[8] || 'N/A'}</td></tr>`;
      body += `<tr><td style="padding: 8px;"><strong>Registered</strong></td><td style="padding: 8px;">${rowData[2] || 'N/A'}</td></tr>`;
      body += `<tr><td style="padding: 8px;"><strong>RegID</strong></td><td style="padding: 8px;">${rowData[3] || 'N/A'}</td></tr>`;
      body += `<tr><td style="padding: 8px;"><strong>Loan Type</strong></td><td style="padding: 8px;">${rowData[15] || 'N/A'}</td></tr>`;
      body += `<tr><td style="padding: 8px;"><strong>Amount</strong></td><td style="padding: 8px;">${rowData[16] || 'N/A'}</td></tr>`;
      body += `<tr><td style="padding: 8px;"><strong>Purpose</strong></td><td style="padding: 8px;">${rowData[17] || 'N/A'}</td></tr>`;
    } else if (formType === "RF_GIF_Return") {
      // RF_GIF_Return form specific fields
      body += `<tr><td style="padding: 8px;"><strong>RegID</strong></td><td style="padding: 8px;">${rowData[2] || 'N/A'}</td></tr>`;
      body += `<tr><td style="padding: 8px;"><strong>Type</strong></td><td style="padding: 8px;">${rowData[3] || 'N/A'}</td></tr>`;
      body += `<tr><td style="padding: 8px;"><strong>Details</strong></td><td style="padding: 8px;">${rowData[4] || 'N/A'}</td></tr>`;
      body += `<tr><td style="padding: 8px;"><strong>Paid Amount</strong></td><td style="padding: 8px;">${rowData[5] || 'N/A'}</td></tr>`;
      body += `<tr><td style="padding: 8px;"><strong>Timestamp</strong></td><td style="padding: 8px;">${rowData[1] || 'N/A'}</td></tr>`;
    }
    
    body += `<tr style="background-color: #ffebee;"><td style="padding: 8px;"><strong>❌ Error Reason</strong></td><td style="padding: 8px; color: red;"><strong>${errorMessage}</strong></td></tr>`;
    body += `</table>`;
    
    body += `<p><strong>Action Required:</strong> Please review and correct the above entry.</p>`;
    body += `<p><small>⏰ Timestamp: ${new Date().toLocaleString()}</small></p>`;
    
    // Send email notification immediately
    //const emailAddress = Session.getActiveUser().getEmail(); // Change this to your preferred email
    const emailAddress = "projectsweresl@gmail.com"; // Replace with your actual email
    MailApp.sendEmail({
      to: emailAddress,
      subject: subject,
      htmlBody: body
    });
    
    logToSheet(formType, "Notification", `Immediate email notification sent for invalid entry in row ${rowNumber}`);
  } catch (error) {
    logToSheet(formType, "Error", `Failed to send immediate notification: ${error.toString()}`);
  }
}


function processAndStoreImage(imageUrl, regId, targetFolder) {
  if (!imageUrl || typeof imageUrl !== 'string') {
    logToSheet("Loan_INIT", "Warning", `Empty or invalid image URL for ${regId}`);
    return imageUrl;
  }

  try {
    // Handle Google Forms URL format (both /open?id= and /file/d/ formats)
    let fileId;
    const urlFormats = [
      /\/open\?id=([a-zA-Z0-9-_]+)/,
      /\/file\/d\/([a-zA-Z0-9-_]+)/,
      /[a-zA-Z0-9-_]{25,}/  // Fallback for just the ID
    ];
    
    // Try all possible URL formats to extract file ID
    for (const format of urlFormats) {
      const match = imageUrl.match(format);
      if (match && match[1]) {
        fileId = match[1];
        break;
      }
    }
    
    if (!fileId) {
      throw new Error("Could not extract file ID from URL");
    }

    // Get the file from Drive
    let file;
    try {
      file = DriveApp.getFileById(fileId);
    } catch (e) {
      throw new Error(`File not found in Drive: ${e.message}`);
    }

    const blob = file.getBlob();
    if (!blob || blob.getBytes().length === 0) {
      throw new Error("Empty image file");
    }

    // Create filename with RegID and date
    const fileExt = blob.getContentType().split('/').pop() || 'jpg';
    const fileName = `${regId}.${fileExt}`;
    
    // Check if file already exists in target folder
    const existingFiles = targetFolder.getFilesByName(fileName);
    if (existingFiles.hasNext()) {
      const existingFile = existingFiles.next();
      logToSheet("Loan_INIT", "Info", `Using existing image for ${regId}`);
      return existingFile.getUrl();
    }

    // Process based on file type
    if (blob.getContentType().includes('heic') || file.getName().toLowerCase().endsWith('.heic')) {
      logToSheet("Loan_INIT", "Warning", `HEIC image detected for ${regId}`);
      return handleHeicImage(blob, fileName, targetFolder);
    } else {
      return compressAndStoreImage(blob, fileName, targetFolder);
    }

  } catch (e) {
    logToSheet("Loan_INIT", "Error", `Image processing failed for ${regId}: ${e.message}`);
    return imageUrl; // Return original URL if processing fails
  }
}

function compressAndStoreImage(blob, fileName, targetFolder) {
  try {
    // Convert to JPEG if not already (better for compression)
    const jpegBlob = blob.getContentType() === 'image/jpeg' ? 
      blob : 
      blob.getAs('image/jpeg');
    
    // Use TinyPNG API for compression (replace with your API key)
    const API_KEY = 'zC9Rdxvg7LSGNd2RrlJMrJtxXgXkdd81';
    const apiUrl = 'https://api.tinify.com/shrink';
    
    const options = {
      method: 'post',
      headers: {
        'Authorization': 'Basic ' + Utilities.base64Encode('api:' + API_KEY),
        'Content-Type': jpegBlob.getContentType()
      },
      payload: jpegBlob.getBytes(),
      muteHttpExceptions: true
    };
    
    const response = UrlFetchApp.fetch(apiUrl, options);
    
    if (response.getResponseCode() !== 201) {
      throw new Error(`TinyPNG API error: ${response.getContentText()}`);
    }
    
    const result = JSON.parse(response.getContentText());
    const compressedImage = UrlFetchApp.fetch(result.output.url);
    const compressedBlob = compressedImage.getBlob();
    
    // Save to target folder
    const file = targetFolder.createFile(compressedBlob.setName(fileName));
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    logToSheet("Loan_INIT", "Success", `Compressed image saved for ${fileName}`);
    return file.getUrl();
    
  } catch (e) {
    // Fallback to simple JPEG conversion if TinyPNG fails
    logToSheet("Loan_INIT", "Warning", `Compression failed, using simple conversion: ${e.message}`);
    const jpegBlob = blob.getAs('image/jpeg');
    const file = targetFolder.createFile(jpegBlob.setName(fileName));
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return file.getUrl();
  }
}

function handleHeicImage(blob, fileName, targetFolder) {
  try {
    // First try to convert to JPEG (works for some HEIC files)
    const jpegBlob = blob.getAs('image/jpeg');
    if (jpegBlob) {
      return compressAndStoreImage(jpegBlob, fileName.replace('.heic', '.jpg'), targetFolder);
    }
    
    // If conversion fails, save as original format with warning
    const file = targetFolder.createFile(blob.setName(fileName));
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    logToSheet("Loan_INIT", "Warning", `Saved HEIC without conversion: ${fileName}`);
    return file.getUrl();
  } catch (e) {
    throw new Error(`HEIC handling failed: ${e.message}`);
  }
}


// Helper function to format date as DD-MM-YYYY
function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('WeRE SL')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getProjectArmsMapping() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const projectSheet = ss.getSheetByName('Projects');
  
  if (!projectSheet) {
    Logger.log("Sheet 'Project' not found!");
    return {};
  }
  
  const projectData = projectSheet.getDataRange().getValues();
  
  // Skip header row
  const projectRows = projectData.slice(1);
  
  // Create a mapping of RegID to Arms
  const armsMapping = {};
  
  projectRows.forEach(row => {
    const regId = row[0]; // RegID column
    const arms = row[5];  // Arms column
    
    if (regId && arms) {
      if (!armsMapping[regId]) {
        armsMapping[regId] = [];
      }
      
      // Only add unique arms values
      if (!armsMapping[regId].includes(arms)) {
        armsMapping[regId].push(arms);
      }
    }
  });
  
  return armsMapping;
}

function getAllProfiles() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Main');
  if (!sheet) {
    Logger.log("Sheet 'Main' not found!");
    return [];
  }
  
  const data = sheet.getDataRange().getValues();
  
  if (data.length < 3) {
    Logger.log("No data available after skipping title and headers.");
    return [];
  }
  
  // Get the Arms mapping
  const armsMapping = getProjectArmsMapping();
  logToSheet("Debug", "Info", `Arms mapping: ${JSON.stringify(armsMapping)}`);
  // Skip the first two rows (titles and headers)
  const rowData = data.slice(1);
  const result = rowData.map((row) => {
    const regId = row[0];
    
    const formattedRow = {
      Reg_ID: regId,
      District: row[1],
      Name: row[2],
      Age: row[3],
      Address: row[4],
      NIC: row[5],
      contact: row[6],
      total_children: row[7],
      school_kids: row[8],
      others: row[9],
      Description: row[10],
      Occupation: row[11],
      RF_Loan: row[12],
      RF_Paid_History: row[13],
      RF_Cur_Prj: row[14],
      Com_prjs: row[15],
      Image: row[16],
      GRANT: row[17],
      GIFor: row[18],
      GRANT_Cur_Prj: row[19],
      // Add Arms data
      ArmsArray: armsMapping[regId] || []
    };
    
    return formattedRow;
  });
  
  return result;
}


function setupLoggingSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let loggingSheet = ss.getSheetByName("System_Logs");
  
  if (!loggingSheet) {
    loggingSheet = ss.insertSheet("System_Logs");
    loggingSheet.getRange("A1:D1").setValues([["Timestamp", "Form", "Status", "Details"]]);
    loggingSheet.setFrozenRows(1);
    loggingSheet.getRange("A1:D1").setBackground("#d9ead3");
    
    // Set column widths for better readability
    loggingSheet.setColumnWidth(1, 150);  // Timestamp
    loggingSheet.setColumnWidth(2, 120);  // Form
    loggingSheet.setColumnWidth(3, 100);  // Status
    loggingSheet.setColumnWidth(4, 400);  // Details
  }
  
  return loggingSheet;
}

function logToSheet(formName, status, details) {
  const loggingSheet = setupLoggingSheet();
  const timestamp = new Date();
  
  // Insert new row after header
  loggingSheet.insertRowAfter(1);
  const newRow = loggingSheet.getRange("A2:D2");
  
  // Set values
  newRow.setValues([[timestamp, formName, status, details]]);
  
  // Color coding based on status
  let statusColor = "#ffffff"; // default white
  switch(status.toLowerCase()) {
    case "error":
      statusColor = "#f4cccc"; // light red
      break;
    case "completed":
      statusColor = "#d9ead3"; // light green
      break;
    case "processing":
      statusColor = "#fff2cc"; // light yellow
      break;
    case "warning" :
      statusColor =  "#964B00"; // brown
      break;
  }
  newRow.setBackground(statusColor);
  
  // Also log to console
  Logger.log(`${formName}: ${status} - ${details}`);
}

// Trigger setup
function createFormTriggers() {
  // Clear existing triggers
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
  
  // Create new trigger for form submissions
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ScriptApp.newTrigger('onFormSubmit')
    .forSpreadsheet(ss)
    .onFormSubmit()
    .create();
  
  logToSheet("System", "Completed", "Form triggers created successfully");
}

// Main form submission handler
function onFormSubmit(e) {
  if (!e) {
    logToSheet("Unknown", "Error", "No event object received");
    return;
  }
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const activeSheet = e.range.getSheet();
  const activeSheetName = activeSheet.getName();
  
  logToSheet(activeSheetName, "Started", "Form submission received");
  
  try {
    if (activeSheetName === "RF_GIF_Return") {
      logToSheet("RF_GIF_Return", "Processing", "Starting RF/GIF Return form processing");
      onRFGIFReturnSubmit();
      logToSheet("RF_GIF_Return", "Completed", "Successfully processed RF/GIF Return form");
    } 
    else if (activeSheetName === "Loan_INIT") {
      logToSheet("Loan_INIT", "Processing", "Starting Loan Init form processing");
      onLoanInitFormSubmit();
      logToSheet("Loan_INIT", "Completed", "Successfully processed Loan Init form");
    } 
    else {
      logToSheet(activeSheetName, "Error", "Unknown form type");
    }
  } catch (error) {
    logToSheet(activeSheetName, "Error", `Error processing form: ${error.toString()}`);
    throw error;
  }
}

function cleanOldLogs() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const loggingSheet = ss.getSheetByName("System_Logs");
  
  if (!loggingSheet) return;
  
  const data = loggingSheet.getDataRange().getValues();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  // Keep header row and delete old logs
  const rowsToDelete = [];
  for (let i = data.length - 1; i > 0; i--) {
    if (new Date(data[i][0]) < thirtyDaysAgo) {
      rowsToDelete.push(i + 1);
    }
  }
  
  // Delete rows in batches
  rowsToDelete.forEach(row => {
    loggingSheet.deleteRow(row);
  });
}







function backupMainSheet() {
  Logger.log("Starting backup of Main sheet...");
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var mainSheet = ss.getSheetByName("Main");
  
  if (!mainSheet) {
    Logger.log("ERROR: Main sheet not found!");
    return;
  }
  
  // Check if backup sheet exists, if not create it
  var backupSheet = ss.getSheetByName("backUp");
  if (!backupSheet) {
    backupSheet = ss.insertSheet("backUp");
    Logger.log("Created new backUp sheet");
  } else {
    // Clear existing data in backup sheet
    backupSheet.clear();
    Logger.log("Cleared existing data in backUp sheet");
  }
  
  // Get all data from Main sheet
  var lastRow = mainSheet.getLastRow();
  var lastCol = mainSheet.getLastColumn();
  
  if (lastRow === 0 || lastCol === 0) {
    Logger.log("Main sheet is empty. Nothing to backup.");
    return;
  }
  
  Logger.log("Copying data from Main sheet (rows: " + lastRow + ", columns: " + lastCol + ")");
  
  // Copy all data from Main to Backup
  var data = mainSheet.getRange(1, 1, lastRow, lastCol).getValues();
  backupSheet.getRange(1, 1, lastRow, lastCol).setValues(data);
  
  // Copy formatting, column widths, etc.
  var columnWidths = [];
  for (var i = 1; i <= lastCol; i++) {
    columnWidths.push(mainSheet.getColumnWidth(i));
  }
  
  for (var i = 1; i <= lastCol; i++) {
    backupSheet.setColumnWidth(i, columnWidths[i-1]);
  }
  
  // Log timestamp of backup
  var now = new Date();
  Logger.log("Backup completed at " + now.toLocaleString());
  
  // Optionally add a timestamp cell in the backup sheet
  backupSheet.getRange(1, lastCol + 1).setValue("Backup created: " + now.toLocaleString());
  
  return "Backup completed successfully!";
}
