const puppeteer = require("puppeteer");

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
try {
  (async function main() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("http://localhost:5500/index.html", {
      waitUntil: "domcontentloaded"
    });
    await page.waitForSelector('input[type="file"]');
    await wait(2000);

    // Returns a Element Handler for the selector;

    const elementHandle = await page.$('input[type="file"]');
    await elementHandle.uploadFile("/home/sanjay/Pictures/discord.jpg");
    elementHandle.evaluate(element => {
      const event = new Event("change");
      element.dispatchEvent(event);
    });

    await wait(4000);

    const fileHeader = await page.$("#header");
    fileSelectedHeader = await fileHeader.evaluate(
      element => element.innerText
    );

    console.log(fileSelectedHeader);

    await page.waitForSelector("#b1");
    await page.evaluate(_ => document.querySelector("#b1").click());

    await wait(2000);
    await page.waitForSelector("img");
    await page.evaluate(_ => document.querySelectorAll("img")[0].click());

    await wait(3000);
    await page.reload();
  })();
} catch (err) {
  console.log(err);
}
