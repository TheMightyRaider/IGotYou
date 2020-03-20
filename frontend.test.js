const puppeteer = require("puppeteer");

const app = "http://127.0.0.1:5500/index.html";
let browser;
let page;

beforeEach(async () => {
  browser = await puppeteer.launch({
    // headless: false,
    // slowMo: 100
  });
  page = await browser.newPage();
  await page.goto(app, {
    waitUntil: "domcontentloaded"
  });
});

test("Checking for File Input", async () => {
  await page.waitForSelector('input[type="file"]');
  const fileInput = await page.$('input[name="files"]');

  // Checking if the file input exists

  expect(fileInput).toBeTruthy();

  await fileInput.uploadFile(
    "/home/sanjay/Pictures/discord.jpg",
    "/home/sanjay/Pictures/landscape-mountains-firewatch-silhouette-wallpaper.png"
  );

  fileInput.evaluate(element => {
    const event = new Event("change");
    element.dispatchEvent(event);
  });

  await page.waitForSelector("#header");
  const fileHeader = await page.$("#header");
  const fileSelectedHeader = await fileHeader.evaluate(
    element => element.innerText
  );

  // Checking if the file has been selected and displayed

  expect(fileSelectedHeader).toBe("File Selected");

  //check for fileName being displayed

  await page.waitForSelector(".fileName");
  const fileName = await page.$(".fileName");
  expect(fileName).toBeTruthy();

  //check if the remove element exists

  await page.waitForSelector(".remove");
  const removeButton = await page.$(".remove");
  expect(removeButton).toBeTruthy();

  // Removing the first Image

  await page.click(".remove");

  //Check if there is a single image to be uploaded exist

  const removeFirstImage = await page.$(".remove");
  expect(removeFirstImage).toBeTruthy();

  // Remove the last image

  await page.click(".remove");

  // Check if the element doesn't exist after removed

  const afterClicked = await page.$(".remove");
  expect(afterClicked).toBeFalsy();

  await browser.close();
});

test("Uploading a file, After the Files have been chosen", async () => {
  // Checking if the upload is disabled when no file is selected

  await page.waitForSelector("#b1");
  const uploadButton = await page.$("#b1");
  const isDisabled = await uploadButton.evaluate(element => element.disabled);
  expect(isDisabled).toBeTruthy();

  //Upload the Files

  await page.waitForSelector('input[type="file"]');
  const inputFile = await page.$('input[type="file"]');

  await inputFile.uploadFile(
    "/home/sanjay/Pictures/discord.jpg",
    "/home/sanjay/Pictures/landscape-mountains-firewatch-silhouette-wallpaper.png"
  );

  // Triggering the change event

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

  // Uploading the Files to Local Storage

  await page.waitForSelector("#b1");
  await page.click("#b1");

  // Checking if the file has been uploaded and the uploaded header is displayed

  await page.waitForSelector(".removeHeader");
  const uploadedHeader = await page.evaluate(
    () => document.querySelector(".removeHeader").innerText
  );
  expect(uploadedHeader).toBe("Uploaded!");

  // Check if the images is be displayed

  await page.waitForSelector("img");
  const uploadedImage = await page.evaluate(() =>
    document.querySelector("img")
  );
  expect(uploadedImage).toBeTruthy();

  // Check if the upload button is disabled

  await page.waitForSelector("#b1");
  expect(
    await page.evaluate(_ => document.querySelector("#b1").disabled)
  ).toBeTruthy();
  await browser.close();
}, 10000);

test("After Upload but before Refresh, Test for Removing a Image", async () => {
  // Uploading the Files

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

  await page.waitForSelector("#b1");
  await page.click("#b1");

  // Check to remove first image on click

  const imageClicked = await page.evaluate(_ =>
    document.querySelectorAll("img")[0].click()
  );

  expect(imageClicked).toBeFalsy();

  //Check whether the second image exist

  const secondImage = await page.$("img");
  expect(secondImage).toBeTruthy();

  //Remove the second image

  const removeSecondImage = await page.evaluate(_ =>
    document.querySelector("img").click()
  );
  expect(removeSecondImage).toBeFalsy();

  //Check whether the uploadHeader has been removed!

  await page.waitForSelector(".removeHeader");
  const uploadHeader = await page.evaluate(
    () => document.querySelector(".removeHeader").innerText
  );

  expect(uploadHeader).toBe("");

  await browser.close();
});

test("After Upload, Test to remove image", async () => {
  // Uploading the Files

  await page.waitForSelector('input[type="file"]');
  const inputFile = await page.$('input[type="file"]');

  await inputFile.uploadFile("/home/sanjay/Pictures/discord.jpg");

  inputFile.evaluate(element => {
    let event = new Event("change");
    element.dispatchEvent(event);
  });

  await page.waitForSelector("#b1");
  await page.click("#b1");

  // Reloading the Page, After Uploading the Files

  await page.reload();

  // Check the Refresh Header is displayed

  await page.waitForSelector(".removeHeader");
  const refreshHeader = await page.evaluate(
    _ => document.querySelector(".removeHeader").textContent
  );

  expect(refreshHeader).toBe("Click the Image to remove it!");

  // Check if the img exists

  await page.waitForSelector("img");
  const onRefreshImage = await page.$("img");

  expect(onRefreshImage).toBeTruthy();

  // Check if the image is removed after click

  const imageClicked = await page.evaluate(_ =>
    document.querySelector("img").click()
  );

  expect(imageClicked).toBeFalsy();

  // Check if the header is removed

  await page.waitForSelector(".removeHeader");
  const headerAfterAllImageHaveBeenRemoved = await page.evaluate(
    _ => document.querySelector(".removeHeader").textContent
  );

  expect(headerAfterAllImageHaveBeenRemoved).toBe("");

  // Check if the image is removed from the localStorage

  await page.reload();

  const checkIfImageExists = await page.$("img");
  expect(checkIfImageExists).toBeFalsy();

  await browser.close();
});
