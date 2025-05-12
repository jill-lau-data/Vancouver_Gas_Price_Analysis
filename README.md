# ⛽ Google Apps Script Gas Price Fetcher

This Google Apps Script fetches gas prices from GasBuddy.com for 18 locations in Greater Vancouver and stores them in a Google Sheet for analysis. It was developed as part of a broader data analysis project to identify cost-saving opportunities for Richmond residents by monitoring gas price trends. The script is useful for residents, data analysts, or businesses looking to track fuel prices automatically.

## Prerequisites
- A Google account with access to Google Sheets and Google Apps Script.
- A Google Sheet with two tabs: `GasPrices` and `StationIDs`.
- Access to GasBuddy.com (ensure compliance with their terms of service).

## Setup
1. Open your Google Sheet and navigate to `Extensions > Apps Script`.
2. Copy and paste the provided Google Apps Script code into the script editor.
3. Save the script and ensure the `StationIDs` sheet is populated with station details (see Data Dictionary).
4. Run the `getGasPrice()` function to test the script.

## Usage
1. Add station IDs and details to the `StationIDs` sheet in your Google Sheet (see Data Dictionary for required columns).
2. In Google Apps Script, run the `getGasPrice()` function to fetch gas prices and populate the `GasPrices` sheet.
3. Set up an hourly trigger using the `setupHourlyTrigger()` function to automate data collection.
4. Check the `GasPrices` sheet for updated data after each run. If no data appears, verify the station IDs and check the Apps Script logs for errors.

## Data Dictionary

### GasPrices Sheet (Captured Hourly from GasBuddy)
| **Field**        | **Description**                                                                 |
|------------------|---------------------------------------------------------------------------------|
| Timestamp        | The exact time of data capture (e.g., `2025-04-11 20:10:59`), recorded in seconds for uniqueness. |
| Station ID       | The unique GasBuddy station ID (e.g., `77205`).                                |
| Regular Price    | The price of regular gas (87 octane) at the station, in cents per liter, including the `¢` symbol (e.g., `155.9¢`). |

### StationIDs Sheet (Manually Created)
| **Field**        | **Description**                                                                 |
|------------------|---------------------------------------------------------------------------------|
| Station ID       | The unique GasBuddy station ID (e.g., `77205`).                                |
| Station Name     | The full description of the gas station from GasBuddy, including brand and location (e.g., `Chevron (7951 No 3 Rd)`). |
| Area             | The city in Greater Vancouver where the station is located (e.g., `Richmond`). |
| Location         | The street address of the station (e.g., `7951 No 3 Rd`).                     |
| Brand            | The brand of the gas station (e.g., `Chevron`).                               |

### Derived Columns (Added for Analysis)
These columns are created during the **Data Cleaning and Preparation** phase to support temporal and statistical analysis. See that section for details on how they are derived.
| **Field**              | **Description**                                                                 |
|------------------------|---------------------------------------------------------------------------------|
| Reg price             | The cleaned `Regular Price` as a numeric value (e.g., `155.9`), with the `¢` symbol removed. |
| Hour                  | The hour of the day (0–23) extracted from `Timestamp`.                         |
| Day of Week           | The name of the day (e.g., "Monday") extracted from `Timestamp`.               |
| Time Period           | A categorical column grouping hours into: Morning (6 AM–11:59 AM, hours 6–11), Afternoon (12 PM–5:59 PM, hours 12–17), Evening (6 PM–11:59 PM, hours 18–23), Night (12 AM–5:59 AM, hours 0–5). |
| Weekday               | The numeric day of the week (0–6, where 0 is Monday) extracted from `Timestamp`. |
| Date                  | The date (e.g., `2025-04-11`) extracted from `Timestamp`.                     |
| Avg Price Same Day    | The average `Reg price` for all stations on the same day.                     |

## Example Output
Below is a sample row from the `GasPrices` sheet after running the script:

| Timestamp           | Station ID | Regular Price |
|---------------------|------------|---------------|
| 2025-04-11 20:10:59 | 77205      | 155.9¢        |

## Limitations and Caveats
- **Rate Limits**: Be mindful of GasBuddy's rate limits to avoid being blocked. Consider adding a delay between requests if needed.
- **User-Reported Data**: GasBuddy prices are submitted by users and may not be updated unless a new report is made, potentially leading to outdated or inaccurate data.
- **Script Customization**: This script is provided as-is and may require modifications to suit specific needs (e.g., adding more stations or handling additional price types).

## Troubleshooting
- **No Data in `GasPrices` Sheet**: Verify that the station IDs in `StationIDs` are correct and that GasBuddy has data for those stations.
- **Rate Limit Errors**: If GasBuddy blocks requests, reduce the frequency of the trigger (e.g., every 2 hours instead of hourly).
- **Script Fails to Run**: Check the Google Apps Script logs (`View > Logs`) for error messages and ensure your Google Sheet permissions are set correctly.

## Future Enhancements
- Add support for premium gas prices in addition to regular gas.
- Implement error handling for invalid station IDs.
- Include a notification system to alert users of significant price changes.

