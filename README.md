# Google Apps Script Gas Price Fetcher

This Google Apps Script fetches gas prices from GasBuddy.com and stores them in a Google Sheet.

## Usage

1.  Add station IDs to the "StationIDs" sheet in your Google Sheet.
2.  Run the `getGasPrice()` function.
3.  Set up an hourly trigger using the `setupHourlyTrigger()` function.

## Notes

* Be aware of GasBuddy's rate limits.
* This script is provided as is and may require modifications to suit your specific needs.
