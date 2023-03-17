### TO start:
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
