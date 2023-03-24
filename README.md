# Scraping Task:
**Here the manual task is as follow**:
- There is an Excel sheet containing names, places, ids ,.. that the person with that name should go to that place.
- There is a server running that we search with the name to check if the place is correct or not. 
- So you have to go over all the rows (names:places) in the excel sheet and check each name in the server whether it goes to the right place or not, and this should go along..
- Check for names that doesn't go for thier right places..

**How i automate it**:
- I loaded the excel sheet and added a listener to it to check whenever changed to load it again..
- Loop over all the names then scrap the server as follows:
   * Get the textfield that i should add the name in it, clear it at first then add the new name to it..
   * Get the submit button then i click it..
   * Get the display element then wait for max 5 seconds for the output to appear if it doesn't appear for 5 seconds i consider it error (Timeout!)
   * Navigate Back to th Main page
- Display the names that have problems (doesn't go to the right place), and add a listener using socket.io when the output names changes it rerenders the output ..


## TO start:
Check you have 'nodejs' installed

## Then to run:
```bash
## Install the needed packages
npm install

## Install the needed egde webdriver or whatever the browser you are using; if edge:
https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/?tabs=c-sharp#download-microsoft-edge-webdriver

If your version of edge is (111.0.1661.43) then leave the driver i uploaded
ELSE:
Download it then unzip it ..
Then add msedgedriver.exe in the folder ..

Add the excel (.xlsx) file to the folder by naming it data.xlsx or change the filename in the index.js

Before running the app check all the "TODO" in index.js
## Finally to run the app:
node index.js

## To close the app
ctrl+c AND close the opened edge window

## to run a mock server locally (AboSalah -> don't do this step as your server should be running..)
npm install http-server -g
cd app/
http-server
```
