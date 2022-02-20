const {
  Builder,
  By,
  until,
} = require('selenium-webdriver')
const firefox = require('selenium-webdriver/firefox')
const { parse } = require('node-html-parser')
const fs = require('fs')

const 輸出檔名 = '資料/肯德基.tsv'
建立輸出檔案(輸出檔名)

const browser = 建立瀏覽器()

;(async function () {
  await browser.get('https://www.kfcclub.com.tw/shopsearch')
  await 暫停()
  const 縣市選項 = (await 取得縣市選項()).slice(1)
  for (let 縣市 of 縣市選項) {
    await 點選縣市(縣市)
    await 暫停()
    const 鄉鎮選項 = (await 取得鄉鎮選項()).slice(1)
    for (let 鄉鎮 of 鄉鎮選項) {
      await 點選鄉鎮(鄉鎮)
      await 暫停()
      await 點選搜尋()
      await 暫停()
      const 門市列表 = parse(await 取得網頁原始碼()).querySelectorAll(`span[name=ssShopName]`)
      if ((門市列表 || []).length === 0) {
        console.log(`查詢 ${縣市} ${鄉鎮}...查無資料`)
        continue
      }
      const 地址列表 = parse(await 取得網頁原始碼()).querySelectorAll(`p[name=ssShopAddr]`)
      for (let i = 0; i < 門市列表.length - 1; i++) {
        const line = `肯德基\t${門市列表[i].rawText}\t${地址列表[i].rawText}\t${縣市}\t${鄉鎮}`
        輸出結果(輸出檔名, line)
      }
    }
  }
})()

//--- END ---

function 建立輸出檔案 (檔案名稱) {
  const 欄位名稱 = '類別\t名稱\t地址\t縣市\t鄉鎮'
  fs.writeFileSync(檔案名稱, '', { flag: 'w+' })
  fs.writeFileSync(檔案名稱, 欄位名稱 + '\r\n', { flag: 'a' })
}

function 輸出結果 (檔案名稱, 結果) {
  console.log(結果)
  fs.writeFileSync(輸出檔名, 結果 + '\r\n', { flag: 'a' })
}

function 建立瀏覽器 () {
  return new Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(new firefox.Options()
      .setPreference('dom.push.enabled', false))
    .build()
}

async function 暫停 () {
  await browser.sleep(2000)
}

function 取得縣市選項 () {
  return 取得選項('#ssPostAddr1')
}

function 取得鄉鎮選項 () {
  return 取得選項('#ssPostAddr2')
}

async function 取得選項 (id) {
  return parse(await 取得網頁原始碼())
    .querySelectorAll(`${id} option`)
    .map(x => x.childNodes[0].text)
}

async function 取得網頁原始碼 () {
  return await browser
    .wait(until.elementLocated(By.css('body')), 2000)
    .getAttribute('innerHTML')
}

async function 點選搜尋 () {
  const button = await browser.findElement(By.xpath(
    '/html/body/main/div[1]/main[1]/div/div/div[1]/div/button[1]'))
  await browser.executeScript('arguments[0].click();', button)
}

async function 點選縣市 (縣市) {
  await browser.findElement(By.id('ssPostAddr1')).sendKeys(縣市)
}

async function 點選鄉鎮 (鄉鎮) {
  await browser.findElement(By.id('ssPostAddr2')).sendKeys(鄉鎮)
}

