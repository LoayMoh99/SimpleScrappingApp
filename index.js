const express = require('express');
const http = require("http");
const socketIO = require("socket.io");
const { Builder, By, Key } = require('selenium-webdriver');
const xlsx = require('xlsx');
const fs = require('fs');

let driver = undefined;
async function getCurrentData(name,url, year=2023) {
  await driver.get(url);
  // TODO: change the ids according to your html server ..
  /** Here what i do is as follows:
   * 1- Get the textfield that i should add the name in it, clear it at first then add the new name
   * 2- Get the submit button then i click it
   * 3- Get the display element then wait for 5 second for the output to appear if it doesnet appear for 5 seconds i consider it error (Timeout)
   * 4- Navigate Back to the main page 
   * 
   * i.e. By.name() or By.id() -> should be changed in your case
   * to know the id or name in html use inspect in the browser and hover to the text field you want to know it..
   */

  const textfield_element = By.id("name"); // here you can use the id if easier in your case
  // clear then insert new name
  await driver.findElement(textfield_element).sendKeys(Key.CONTROL + "a");
  await driver.findElement(textfield_element).sendKeys(Key.DELETE);
  await driver.findElement(textfield_element).sendKeys(name);
  
  const year_element = By.id("year"); // here you can use the id if easier in your case
  await driver.findElement(year_element).sendKeys(Key.CONTROL + "a");
  await driver.findElement(year_element).sendKeys(Key.DELETE);
  await driver.findElement(year_element).sendKeys(year); 

  const button = By.id("generate"); // should be changed also according to your website i.e. id=submit
  await driver.findElement(button).click();
  
  //wait till the needed display appears
  let display_element;
  let text; 
  let currentdate = Date.now();
  while ((text===undefined || text===null || text==='') && (Date.now() - currentdate) < 5000) {
    try {
      display_element = By.id("insert-offer");
      text = await driver.findElement(display_element).getText();
    } catch (e) {}
  }

  let output=text;
  if(text==='') output='Timeout!!! waiting for more than 5 seconds to respond for this name: ' + name;

  // navigate back
  await driver.navigate().back();  
  

  return output;
}

async function initDriver() {
  // TODO: change this instead of "MicrosoftEdge" to "internet explorer" and add the IEDriverServer.exe instead of msedgedriver.exe
  driver = await new Builder().forBrowser("MicrosoftEdge").build();
}

async function getInputData() {
  // TODO: change the name of the excel file after moving/coping it to the folder
  var workbook = xlsx.readFile('data.xlsx');
  var sheet_name_list = workbook.SheetNames;
  // TODO: here check if there is more than one sheet, here i consider it is the first sheet if not change the index from 0 to index of sheet you need
  let xlData = []
  for (const sheet of sheet_name_list)
    xlData = xlData.concat( xlsx.utils.sheet_to_json(workbook.Sheets[sheet]));
  // convert this Name:Place array to object
  const data = [];

  // TODO: see if the headings names are diff , and take care if there is any special chars i.e. ':' , add it to the names as well ..
  const nameCol = 'الاسم'
  const placeCol = 'المكان'
  const idCol = 'الرقم'

  // convert xldata to out structured data: array of {name, place , year}
  for (const row of xlData) {
    if(row[nameCol] === undefined) continue;
    let year = 2023;
    if(row[idCol] !== undefined) {
      const id = parseFloat(row[idCol].toString());
      if(id > 100000) {
        year=2022;
      } 
    } 
    
    data.push( {
      name: row[nameCol],
      place: row[placeCol] ?? 'لا يوجد',
      year: year,
    });
  }

  return data;
}

const outputData = {};
let inputData = [];
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// TODO: check if you need to change the port (by i guess 3333 is hard to be already running)
const port = 3333;
app.use(express.static("./public"));
server.listen(port, async () => {
  console.log(`Example app listening at http://localhost:${port}`);
  //initialize the driver
  await initDriver();

  // get the input data
  inputData = await getInputData();

  // initial connection event
  io.on('connection',(socket) => {
    console.log('someone connected!');
    io.emit("outputchanged", outputData);
  });

  // listen for changes on excel file
  fs.watch('data.xlsx', async function(event) {
    if (event === 'change') {
      console.log('change detected on excel file');
      // insert the input data again
      inputData = await getInputData();
    }
  })

  // TODO: here change to whatever url of your server is used!!
  const localhostUrl = 'http://127.0.0.1:8080/'; 
  // loop foreever
  while (true) {
    // see the current data the first time
    for (const item_data of inputData ) {
      const output = await getCurrentData(item_data.name,localhostUrl,item_data.year);
      // TODO: here i only check if the output i get from server is the same in excell only; check if you want to hardcoded or something..
      if(output !== item_data.place /* && output !== "fgdgfd" */) {
        outputData[item_data.name] = 'متوقع: '+ item_data.place + ' لكن وجد: '+ output;
        console.log(outputData[item_data.name]);
        //send a listener to html
        io.emit("outputchanged", outputData);
      } else {
        // every thing is alright!
        if( item_data.name in outputData ) {
          console.log('delete this key from output :',item_data.name);
          delete outputData[item_data.name];
          io.emit("outputchanged", outputData);
        }
      }
    }
  }
})
