# Google Apps Script Code for Crystal Ship Registration Form

/**
 * This Google Apps Script handles form submissions from the Crystal Ship website
 * and adds the data to the connected Google Sheet.
 * 
 * To set up:
 * 1. Open your Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Replace any existing code with this code
 * 4. Save the project (name it something like "Crystal Ship Registration Handler")
 * 5. Deploy as a web app (Deploy > New deployment > Web app)
 *    - Execute as: Me (or your Google account)
 *    - Who has access: Anyone
 * 6. Authorize the script when prompted
 * 7. Copy the web app URL provided after deployment
 */

// This function processes POST requests from the website
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Log the received data for debugging
    console.log("Received data:", data);
    
    // Get the active spreadsheet and sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("Registrations") || ss.getActiveSheet();
    
    // Check if headers exist, if not, add them
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Email",
        "Full Name",
        "Burning Man Experience",
        "Name Drops",
        "Vehicle Type",
        "Vehicle Details",
        "Entry Date",
        "Exit Date"
      ]);
    }
    
    // Format the data for the sheet
    const rowData = [
      data.timestamp || new Date().toISOString(),
      data.email || "",
      data.fullName || "",
      data.bmExperience || "",
      data.nameDrops || "",
      data.vehicleType || "",
      data.vehicleDetails || "",
      data.entryDate || "",
      data.exitDate || ""
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      result: "success",
      message: "Registration data added to spreadsheet"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log the error
    console.error("Error processing form submission:", error);
    
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      result: "error",
      message: "Error processing form submission: " + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// This function handles GET requests (for testing)
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    result: "success",
    message: "The Crystal Ship registration form handler is working correctly."
  })).setMimeType(ContentService.MimeType.JSON);
}
