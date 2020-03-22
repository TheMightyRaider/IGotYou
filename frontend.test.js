const puppeteer = require("puppeteer");

const app = "http:/localhost:5000";
let browser;
let page;
let fileInput;

beforeAll(async () => {
  browser = await puppeteer.launch({
    // headless: false
    // slowMo: 100
  });
  page = await browser.newPage();
  await page.goto(app, {
    waitUntil: "domcontentloaded"
  });
  await page.waitForSelector('input[type="file"]');
  fileInput = await page.$('input[name="files"]');
});

describe("Check if the file selected are displayed and removable before file Upload", () => {
  test("Check if the file input exists", async () => {
    expect(fileInput).toBeTruthy();
  });

  test("Check if the file header is displayed", async () => {
    await fileInput.uploadFile("beautiful.png", "theme.jpg");

    fileInput.evaluate(element => {
      const event = new Event("change");
      element.dispatchEvent(event);
    });

    await page.waitForSelector("#header");
    const fileHeader = await page.$("#header");
    const fileSelectedHeader = await fileHeader.evaluate(
      element => element.innerText
    );

    expect(fileSelectedHeader).toBe("File Selected");
  });

  test("check if the file name is displayed", async () => {
    await page.waitForSelector(".fileName");
    const fileName = await page.$(".fileName");
    expect(fileName).toBeTruthy();
  });

  test("Check if the remove button exists ", async () => {
    await page.waitForSelector(".remove");
    const removeButton = await page.$(".remove");
    expect(removeButton).toBeTruthy();
  });

  test("Check if removes remove the filename", async () => {
    await page.click(".remove");
    const removeFirstImage = await page.$(".remove");
    expect(removeFirstImage).toBeTruthy();
  });

  test("Check if all the elements have been removed", async () => {
    await page.click(".remove");
    const afterClicked = await page.$(".remove");
    expect(afterClicked).toBeFalsy();
  });
});

describe("Uploading a file, After the Files have been chosen", () => {
  test("Checking if the upload is disabled when no file is selected", async () => {
    await page.waitForSelector("#b1");
    const uploadButton = await page.$("#b1");
    const isDisabled = await uploadButton.evaluate(element => element.disabled);
    expect(isDisabled).toBeTruthy();
  });

  test("Test if the upload button is enabled after the files are choosen", async () => {
    await page.waitForSelector('input[type="file"]');
    const inputFile = await page.$('input[type="file"]');

    await inputFile.uploadFile("beautiful.png", "theme.jpg");

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
  });

  test("Check if the upload header is displayed", async () => {
    await page.waitForSelector("#b1");
    await page.click("#b1");
    await page.waitForSelector(".removeHeader");
    const uploadedHeader = await page.evaluate(
      () => document.querySelector(".removeHeader").innerText
    );
    expect(uploadedHeader).toBe("Uploaded!");
  });

  test("Check if the images are being displayed", async () => {
    await page.waitForSelector("img");
    const uploadedImage = await page.evaluate(() =>
      document.querySelector("img")
    );
    expect(uploadedImage).toBeTruthy();
  });

  // Check if the upload button is disabled
  test("Check if the upload button is disabled after upload", async () => {
    await page.waitForSelector("#b1");
    expect(
      await page.evaluate(_ => document.querySelector("#b1").disabled)
    ).toBeTruthy();
  });
}, 10000);

describe("After Upload but before Refresh, Test for Removing a Image", () => {
  // Uploading the Files
  test("Check if the image is removed on click", async () => {
    await fileInput.uploadFile("beautiful.png", "theme.jpg");

    fileInput.evaluate(element => {
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
  });

  //Check whether the second image exist
  test("Check if the second image is displayed", async () => {
    const secondImage = await page.$("img");
    expect(secondImage).toBeTruthy();
  });

  test("Check if the all the images are removed", async () => {
    const removeSecondImage = await page.evaluate(_ =>
      document.querySelector("img").click()
    );
    expect(removeSecondImage).toBeFalsy();
  });

  //Check whether the uploadHeader has been removed!
  test("Check if the uploaderHeader is empty", async () => {
    await page.waitForSelector(".removeHeader");
    const uploadHeader = await page.evaluate(
      () => document.querySelector(".removeHeader").innerText
    );

    expect(uploadHeader).toBe("");
  });
});

describe("After Refresh, Test to remove image", () => {
  beforeEach(() => {
    jest.setTimeout(10000);
  });
  test("Check if the Refresh Header exists after refresh", async () => {
    await page.waitForSelector('input[type="file"]');
    const inputFile = await page.$('input[type="file"]');

    await inputFile.uploadFile("beautiful.png");

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
  });

  test("Check if the images are displayed on refresh", async () => {
    await page.waitForSelector("img");
    const onRefreshImage = await page.$("img");

    expect(onRefreshImage).toBeTruthy();
  });

  test("Check if the image is removed when clicked", async () => {
    const imageClicked = await page.evaluate(_ =>
      document.querySelector("img").click()
    );

    expect(imageClicked).toBeFalsy();
  });

  test("Check if the header is empty when all images are removed", async () => {
    await page.waitForSelector(".removeHeader");
    const headerAfterAllImageHaveBeenRemoved = await page.evaluate(
      _ => document.querySelector(".removeHeader").textContent
    );

    expect(headerAfterAllImageHaveBeenRemoved).toBe("");
  });

  test("Check if all the images are removed from the DOM, after refresh", async () => {
    await page.reload();
    const checkIfImageExists = await page.$("img");
    expect(checkIfImageExists).toBeFalsy();
    await browser.close();
  });
});
