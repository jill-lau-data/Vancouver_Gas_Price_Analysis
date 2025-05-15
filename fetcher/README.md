# ⛽ Google Apps Script Gas Price Fetcher 🚗💨  

## What’s This All About? 📋  
Welcome to the **Google Apps Script Gas Price Fetcher**—my handy little tool that snags gas prices from GasBuddy.com for 18 spots across Greater Vancouver! 🌟 This script saves the data into a Google Sheet, making it super easy to see what’s happening at the pump. It’s the first step in my quest to figure out if Richmond really does have the cheapest gas at night—like my friends say after dinner! 🍽️  

## Data Source and Output

The fetcher uses a Google Sheet to manage station IDs and store gas price data:

- **StationIDs Tab**: Contains the list of station IDs input by the user. The fetcher reads these IDs to retrieve gas price data.
- **GasPrices Tab**: Stores the gas price data fetched for the specified station IDs.

You can view the data here:
[Vancouver Gas Price Data](https://docs.google.com/spreadsheets/d/e/2PACX-1vRDGPYEan2SSVaR3j2zN8tms3qPBNFzXB-C1SLdngzT-N0Sv2AmslSLbHp8zRX202drBACB0CgRrbI_/pubhtml)))
**Note**: The sheet is published for public viewing. To add or modify station IDs, contact the repository owner for edit access.

## How to Use It? 🛠️  
1. **Set Up Your Google Sheet**: Create a new Google Sheet and name it something cool like “GasPriceAdventure”.  
2. **Add the Script**: Copy the code from `gas_price_fetcher.js` into Google Apps Script (go to Extensions > Apps Script in your Google Sheet).
3. **Set Up the StationIDs Tab**: This tab is super important—it’s the key to controlling what stations the script fetches! Add the station IDs, names, areas, locations, and brands you want to track (more on that below). 
4. **Run It**: Hit the `getGasPrice()` function to start collecting data. Set up a trigger (like hourly) under the clock icon to keep it going!  
5. **Check the Data**: Your sheet will have two tabs—`GasPrices` for the juicy price data and `StationIDs` for station details.

## Why These 18 Spots? 🤔  
Okay, let’s talk about why I picked these 18 locations! First off, I didn’t include Abbotsford because, well, everyone knows it’s cheaper than Metro Vancouver, so it wasn’t part of my plan this time. Since I live in Richmond, I know which stations here tend to be more wallet-friendly, so I added four stations I’m familiar with—ones my friends and I often hit up after dinner. For the other cities like Vancouver, Burnaby, and Port Moody, I chose stations that are either on the same street or super close to each other, making it easier to compare. Plus, I checked GasBuddy’s list of cheapest stations and picked ones that were often in the top few spots. It’s all about finding those sweet deals! If you’ve got ideas for other stations to add, let me know!  😄  

## Data Dictionary 📚  
Here’s what you’ll find in your Google Sheet:  
- **GasPrices Tab**:  
  - `Timestamp`: When the price was grabbed.  
  - `Station ID`: A unique ID for each station.  
  - `Regular Price`: The price in cents (e.g., 149.8¢).  
- **StationIDs Tab**:  
  - `Station ID`: Matches the GasPrices tab.  
  - `Station Name`: The station’s name.  
  - `Area`: Where it’s located (e.g., Richmond).  
  - `Location`: The exact spot.  
  - `Brand`: The gas company (e.g., Chevron).
 


## Need Help? 📧  
Stuck or just want to chat about gas prices? Drop me a line at jill.yt.lau@gmail.com—I’d love to hear your thoughts or help you get started! 🚙💙
