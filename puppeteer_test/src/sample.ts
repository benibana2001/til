import puppeteer from 'puppeteer'

const url = 'https://example.com';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
//   await page.screenshot({path: 'example.png'});

  const callback  = (elem: Element[] | Promise<Element[]>)  => {
    return elem
  }

  const elems: Element[] = await page.$$eval('div > h1', callback);
  console.log(`elem: ${elems[0]}`)
  console.log(`string: ${elems[0].innerHTML}`)

  await browser.close();
})();