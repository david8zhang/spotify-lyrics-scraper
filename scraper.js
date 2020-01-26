const puppeteer = require('puppeteer');

async function scrapeChannel(url) {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const elArray = await page.$$('.lyrics__content__ok');
    const promises = elArray.map(async (el) => {
      const text = await el.getProperty('textContent');
      return await text.jsonValue();
    })

    return Promise.all(promises)
}

scrapeChannel('https://www.musixmatch.com/lyrics/Coldplay/Viva-la-Vida').then((lyrics) => {
  console.log(lyrics)
})

module.exports = {
    scrapeChannel
}