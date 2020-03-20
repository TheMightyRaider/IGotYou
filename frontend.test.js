const puppeteer = require("puppeteer");

let timeout = 20000;
const app = "http://127.0.0.1:5500/index.html";
let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false
  });
  page = await browser.newPage();
  await page.goto(app, {
    waitUntil: "domcontentloaded"
  });
});

// test("Checking for File Input", async () => {
//   browser = await puppeteer.launch({
//     headless: false,
//     slowMo: 100
//   });
//   page = await browser.newPage();
//   await page.goto(app, {
//     waitUntil: "domcontentloaded"
//   });
//   await page.waitForSelector('input[type="file"]');
//   const fileInput = await page.$('input[name="files"]');

//   // Checking if the file input exists

//   expect(fileInput).toBeTruthy();

//   await fileInput.uploadFile("/home/sanjay/Pictures/discord.jpg");

//   fileInput.evaluate(element => {
//     const event = new Event("change");
//     element.dispatchEvent(event);
//   });

//   const fileHeader = await page.$("#header");
//   fileSelectedHeader = await fileHeader.evaluate(element => element.innerText);

//   // Checking if the file has been selected and displayed

//   expect(fileSelectedHeader).toBe("File Selected");

//   //check for fileName being displayed

//   await page.waitForSelector(".fileName");
//   const fileName = await page.$(".fileName");
//   expect(fileName).toBeTruthy();

//   //check if the remove element exists

//   await page.waitForSelector(".remove");
//   const removeButton = await page.$(".remove");
//   expect(removeButton).toBeTruthy();

//   await page.click(".remove");

//   // Check if the element doesn't exist after removed

//   const afterClicked = await page.$(".remove");
//   expect(afterClicked).toBeFalsy();

//   await browser.close();
// }, 20000);

test("Uploading a file", async () => {
  // browser = await puppeteer.launch({
  //   headless: false,
  //   slowMo: 100
  // });
  // page = await browser.newPage();
  // page.goto(app, { waitUntil: "domcontentloaded" });

  // Checking if the upload is disabled when no file is selected

  await page.waitForSelector("#b1");
  const uploadButton = await page.$("#b1");
  const isDisabled = await uploadButton.evaluate(element => element.disabled);
  expect(isDisabled).toBeTruthy();

  await page.waitForSelector('input[type="file"]');
  const inputFile = await page.$('input[type="file"]');

  await inputFile.uploadFile(
    "/home/sanjay/Pictures/discord.jpg",
    "/home/sanjay/Pictures/landscape-mountains-firewatch-silhouette-wallpaper.png"
  );

  inputFile.evaluate(element => {
    let event = new Event("change");
    element.dispatchEvent(event);
  });

  // Checking if the upload button is enabled afer selecting files

  await page.waitForSelector("#b1");
  const afteruploadButton = await page.$("#b1");
  const isEnabled = await afteruploadButton.evaluate(
    element => element.disabled
  );
  expect(isEnabled).toBeFalsy();

  await page.waitForSelector("#b1");
  await page.click("#b1");

  // Checking if the file has been uploaded and the uploaded header is displayed

  await page.waitForSelector(".removeHeader");
  const uploadedHeader = await page.evaluate(
    () => document.querySelector(".removeHeader").innerText
  );
  expect(uploadedHeader).toBe("Uploaded!");

  await browser.close();
}, 10000);
