const puppeteer = require("puppeteer");

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch();
  let page = await browser.newPage();
  await page.goto("http://localhost:5500", { waitUntil: "domcontentloaded" });
});

describe("User Flow Verfication", async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  test("title of the page", async () => {
    await page.goto("http://localhost:5500", { waitUntil: "domcontentloaded" });
  });
});
