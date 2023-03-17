const express = require('express');
const { Builder, By, Key } = require('selenium-webdriver');
const xlsx = require('xlsx');

let driver = undefined;
async function getCurrentData(name,url) {
  await driver.get(url);
  // TODO: change the ids according to your html server ..
  /** Here what i do is as follows:
   * 1- Get the textfield that i should add the name in it, clear it a t first then add the new name
   * 2- Get the submit button then i click it
   * 3- Get the display element then wait for 5 second for the output to appear if it doesnet appear for 5 seconds i consider it error (Timeout)
   *  
   * i.e. By.name() or By.id() -> should be changed in your case
   * to know the id or name in html use inspect in the browser and hover to the text field you want to know it..
   */

  const textfield_element = By.name("name"); // here you can use the id if easier in your case
  // clear then insert new name
  await driver.findElement(textfield_element).sendKeys(Key.CONTROL + "a");
  await driver.findElement(textfield_element).sendKeys(Key.DELETE);
  await driver.findElement(textfield_element).sendKeys(name);
  
  const button = By.id("generate"); // should be changed also according to your website i.e. id=submit
  await driver.findElement(button).click();
  
  //wait till the needed display appears
  const display_element = By.id("insert-offer");
  let text = await driver.findElement(display_element).getText();
  let currentdate = Date.now();
  while ((text===undefined || text===null || text==='') && (Date.now() - currentdate) < 5000) {
    text = await driver.findElement(display_element).getText();
  }
  let output=text;
  if(text==='') output='Timeout!!! waiting for more than 5 seconds to respond for this name: ' + name;

  return output;
}

async function initDriver() {
  driver = await new Builder().forBrowser("MicrosoftEdge").build();
}

async function getInputData() {
  // TODO: change the name of the excel file after moving/coping it to the folder
  var workbook = xlsx.readFile('data.xlsx');
  var sheet_name_list = workbook.SheetNames;
  // TODO: here check if there is more than one sheet, here i consider it is the first sheet if not change the index from 0 to index of sheet you need
  var xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  // convert this Name:Place array to object
  const data = {};
  const objectKeys = Object.keys(xlData[0]);
  console.log(objectKeys);
  // TODO: rakez m3aya: here you have to make the 1st row in excel contains headings; and check what are the places of the heading you need i.e. name in index 0, place in index 1 , etc..
  const nameCol = objectKeys[0]; // hna ana sadfet en elname hwa awel 7aga et2aret = index 0; f you have to check it..
  const placerCol = objectKeys[1];

  for (const row of xlData) {
    if(row[nameCol] === undefined) continue;
    data[row[nameCol]] = row[placerCol] ?? 'لا يوجد';
  }

  return data;
}

const outputData = {};
let inputData = {};
const app = express();

// insert new datafrom excel file
app.get('/new', async (req, res) => {
  // insert the input data again
  inputData = await getInputData();

  //to show the data
  if(Object.keys(outputData).length === 0)
  res.send('كله تمام يا ريس!!');
  else
  res.send(outputData);
});

//display the output data
app.get('/', async (req, res) => {
  //to show the data
  if(Object.keys(outputData).length === 0)
  res.send('كله تمام يا ريس!!');
  else
  res.send(outputData);
});

// TODO: check if you need to change the port (by i guess 3333 is hard to be already running)
const port = 3333;
app.listen(port, async () => {
  console.log(`Example app listening at http://localhost:${port}`);
  //initialize the driver
  await initDriver();

  // get the input data
  inputData = await getInputData();

  // TODO: here change to whatever url of your server is used!!
  const localhostUrl = 'http://127.0.0.1:8080/'; 
  // loop foreever
  while (true) {
    // see the current data the first time
    for (const key of Object.keys(inputData)) {
      const output = await getCurrentData(key,localhostUrl);
      if(output !== inputData[key]) {
        console.log('Wrong output -->', inputData[key]);
        outputData[key] = 'Wrong output --> '+ inputData[key];
      } else {
        delete outputData[key];
      }
    }
  }
})
