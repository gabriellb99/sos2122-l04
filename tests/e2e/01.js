const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try{
    await page.goto('http://localhost:8080');
  }catch(e){
    console.error("SERVER NOT READY");
    process.exit(1);
  }

  try{
    const [response] = await Promise.all([
      page.waitForNavigation(),
      page.click('a#contactTableLink'),
    ]);
  }catch(e){
    console.error("SERVER NOT READY");
    await browser.close();
    process.exit(1);
  }

  try{
    var initialrowCount = (await page.$$('body > main > main > table > tbody > tr')).length;
    console.log(initialrowCount);
  }catch(e){
    console.error("INITIAL ROW COUNT ERROR");
    await browser.close();
    process.exit(1);
  }

  try{
      (await page.$$('#name')).value = "gabriel";
      (await page.$$('#phone')).value = "123456788";
      (await page.$$('#email')).value = "test@example.com";
      await page.click('#button1');
      await page.waitForTimeout(2000);
  }catch(e){
    console.error("INSERT ROW ERROR");
    await browser.close();
    process.exit(1);
  }

  try{
    var finalrowCount = (await page.$$('body > main > main > table > tbody > tr')).length;
    console.log(finalrowCount);
  }catch(e){
    console.error("FINAL ROW COUNT ERROR");
    await browser.close();
    process.exit(1);
  }

  page.screenshot({ path: 'final.png' });

  await browser.close();
})();