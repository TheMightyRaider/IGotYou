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
    await wait(1000);

    // Returns a Element Handler for the selector;

    await page.evaluate(() =>
      document.querySelector("input[type='file']").click()
    );

    // const [file] = await Promise.all([
    //   page.waitForFileChooser(),
    //   page.evaluate(_ => document.querySelector('input[type="file"]').click())
    // ]);
    // await file.accept(["/home/sanjay/Pictures/discord.jpg"]);

    // const elementHandle = await page.$('input[type="file"]');
    // await elementHandle.uploadFile("/home/sanjay/Pictures/discord.jpg");

    await wait(7000);

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
