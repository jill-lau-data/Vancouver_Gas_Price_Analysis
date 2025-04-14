/**
 * Fetches gas prices from GasBuddy.com for a list of station IDs and stores them in a Google Sheet.
 *
 * @returns {void} This function does not return a value.  It writes data to a Google Sheet.
 */
function getGasPrice() {
  // 1. Get Spreadsheet and Sheets:  Centralize sheet access and handle errors early.
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const stationIdSheet = ss.getSheetByName("StationIDs");
  const gasPricesSheetName = "GasPrices"; // Store sheet name as a constant
  let gasPricesSheet = ss.getSheetByName(gasPricesSheetName);

  // 1.1 Error Handling: Check for missing sheets *before* proceeding.
  if (!stationIdSheet) {
    const errorMessage = "Error: StationIDs sheet not found.";
    Logger.log(errorMessage);
    // Consider throwing an error here to halt execution *immediately* if critical.
    // throw new Error(errorMessage);  //  <--  Uncomment this for more robust error handling
    return; // Exit the function to prevent further errors.
  }

  if (!gasPricesSheet) {
    gasPricesSheet = ss.insertSheet(gasPricesSheetName);
    gasPricesSheet.appendRow(["Timestamp", "Station ID", "Regular Price"]); // Add headers.
  }

  // 2. Get Station IDs:  Efficiently get and process station IDs.
  const stationIds = stationIdSheet.getRange("A2:A")
      .getValues()
      .filter(row => row[0] !== ""); // Remove empty rows in a single step.

  // 2.1 Error Handling: Check for empty station IDs.
  if (stationIds.length === 0) {
    const errorMessage = "Error: No station IDs found in the StationIDs sheet.";
    Logger.log(errorMessage);
    // throw new Error(errorMessage); // <-- Consider throwing an error.
    return;
  }

  // 3. Fetch and Process Prices:  Iterate, fetch, parse, and write data.
  for (let i = 0; i < stationIds.length; i++) {
    const stationId = stationIds[i][0];
    const url = "https://www.gasbuddy.com/station/" + stationId;

    let price = "Price not found"; // Default value for price.
    let errorDetail = ""; // Variable to hold specific error details.

    try {
      const response = UrlFetchApp.fetch(url, {
        muteHttpExceptions: true,
      }); // Fetch, but prevent Apps Script from throwing exceptions.
      const responseCode = response.getResponseCode();

      // 3.1 Handle HTTP Errors:  Check for successful response.
      if (responseCode !== 200) {
        errorDetail = `HTTP error: ${responseCode}`;
        Logger.log(`Error fetching data for station ID ${stationId}. ${errorDetail}`);
        // gasPricesSheet.appendRow([new Date(), stationId, `Error: ${errorDetail}`]); // Moved inside catch for consistency
        continue; // *Crucial*: Skip to the next station on error.
      }

      // 3.2. Extract Price: Use a more robust regex (if needed) and handle missing prices.
      const content = response.getContentText();
      const priceMatch = content.match(/>([\d\.]+¢?)<\/span>/); // Capture price *and* cents if present.
      if (priceMatch && priceMatch[1]) {
        price = priceMatch[1];
      }
      // 3.3 Log success
      Logger.log(`Successfully fetched price: ${price} for station ID ${stationId}`);


    } catch (error) {
      // 3.4 Handle Exceptions:  Catch network or parsing errors.
      errorDetail = `Exception: ${error.toString()}`;
      Logger.log(`Error fetching data for station ID ${stationId}. ${errorDetail}`);
    } finally {
      // 3.5.  Always write to the sheet:  Use 'finally' to ensure data is written *even* after errors.
      gasPricesSheet.appendRow([new Date(), stationId, errorDetail || price]); // Write price or error.
    }
  }

  // 4. Log Completion:  Informative message upon completion.
  Logger.log(`Gas prices updated for ${stationIds.length} stations.`);
}

/**
 * Sets up an hourly trigger to run the getGasPrice function.
 *
 * @returns {void}  This function does not return a value. It creates a trigger.
 */
function setupHourlyTrigger() {
  // 1. Get Existing Triggers: Get the current project triggers.
  const triggers = ScriptApp.getProjectTriggers();

  // 2. Delete Existing Trigger (if any):  Prevent duplicate triggers.
  for (let i = 0; i < triggers.length; i++) {
    const trigger = triggers[i]; // Added const for clarity
    if (trigger.getHandlerFunction() === "getGasPrice") {
      ScriptApp.deleteTrigger(trigger);
      Logger.log("Deleted existing hourly trigger for getGasPrice()."); // Log deletion
      break; // Exit the loop after deleting *the* trigger.  There should only be one.
    }
  }

  // 3. Create New Trigger: Create the hourly trigger.
  ScriptApp.newTrigger("getGasPrice")
    .timeBased()
    .everyHours(1)
    .create();
  Logger.log("Created new hourly trigger for getGasPrice()."); // Log creation
}