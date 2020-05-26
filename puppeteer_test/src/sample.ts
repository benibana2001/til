import puppeteer from 'puppeteer'

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
//   await page.screenshot({path: 'example.png'});

  const callback  = (elem: Element[] | Promise<Element[]>)  => {
    console.log(`elem" ${elem}`)
    console.log('hello')
    return elem
  }
  const elem = await page.$$eval('div', callback);
  console.log(`elem: ${elem}`)
  console.log(`length: ${elem.length}`)

  await browser.close();
})();