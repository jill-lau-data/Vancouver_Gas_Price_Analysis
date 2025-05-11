# Google Apps Script Gas Price Fetcher

This Google Apps Script fetches gas prices of 18 different locations in Greater Vancouver from GasBuddy.com and stores them in a Google Sheet.

## Usage

1.  Add station IDs to the "StationIDs" sheet in your Google Sheet.
2.  Run the `getGasPrice()` function.
3.  Set up an hourly trigger using the `setupHourlyTrigger()` function.

## Data Dictionary
GasPrices page in Google Sheet - captured from Gas Buddy hourly
1. Timestamp - the data captured time in timestamp, recorded in seconds, so all the rows are different even they are captured in the same hour e.g. 2025-04-11 20:10:59
2. Station ID - the unique gas station id captured from Gas Buddy, e.g. 77205
3. Regular Price - the gas price in regular gas 87 at that moment in that station in string (with the ¢ in the last dig of the column), e.g. 155.9¢

StationIDs page in Google Sheet - created manually
1. Station ID - the unique gas station id from Gas Buddy, e.g. 77205
2. Station Name - the full description of the gas station from Gas Buddy, included the brand name and location, e.g. Chevron (7951 No 3 Rd )
3. Area - the city of vancouver of the gas station located, e.g. Richmond
4. Location - the location of the gas station, included the street number and name, e.g. 7951 No 3 Rd
5. Brand - the brand of the gas station, e.g. Chevron

## Notes

* Be aware of GasBuddy's rate limits.
* This script is provided as is and may require modifications to suit your specific needs.
