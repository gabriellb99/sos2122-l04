const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.us.es');
  await page.screenshot({ path: 'us.png' });

  await browser.close();
})();