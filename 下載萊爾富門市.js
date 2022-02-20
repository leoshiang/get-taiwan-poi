const {
  Builder,
  By,
  until,
} = require('selenium-webdriver')
const { parse } = require('node-html-parser')
const fs = require('fs')

;(async function () {
  const driver = await new Builder().forBrowser('chrome').build()
  const 門市資料 = {}

  const 輸出檔名 = '資料/萊爾富.tsv'
  fs.writeFileSync(輸出檔名, '', { flag: 'w+' })
  fs.writeFileSync(輸出檔名, '類別\t名稱\t地址\t縣市\t鄉鎮\r\n', { flag: 'a' })
  try {
    await driver.get('http://www.hilife.com.tw/storeInquiry_street.aspx')
    await 暫停()
    const 縣市選項 = await 取得縣市選項()
    for (let 縣市 of 縣市選項) {
      try {
        const 鄉鎮選項 = await 取得鄉鎮選項()
        for (let 鄉鎮 of 鄉鎮選項) {
          await 取得門市資料(縣市, 鄉鎮)
        }
      } catch (e) {
      }
    }

    Object.keys(門市資料).forEach(key => {
      const 門市 = 門市資料[key]
      const line = `萊爾富\t${門市.名稱}\t${門市.地址}\t${門市.縣市}\t${門市.鄉鎮}`
      console.log(line)
      fs.writeFileSync(輸出檔名, line + '\r\n', { flag: 'a' })
    })

  } finally {
    await driver.quit()
  }

//--- END ---

  async function 取得網頁原始碼 () {
    return await driver
      .wait(until.elementLocated(By.css('body')), 3000)
      .getAttribute('innerHTML')
  }

  async function 暫停 () {
    await driver.sleep(500)
  }

  async function 取得選項 (網頁原始碼, id) {
    return parse(網頁原始碼)
      .querySelectorAll(`${id} option`)
      .map(x => x.childNodes[0].text)
  }

  async function 取得縣市選項 () {
    return 取得選項(await 取得網頁原始碼(driver), '#CITY')
  }

  async function 取得鄉鎮選項 () {
    return 取得選項(await 取得網頁原始碼(driver), '#AREA')
  }

  function 擷取門市資訊 (item) {
    return {
      編號: item.childNodes[1].childNodes[0].rawText,
      名稱: item.childNodes[3].childNodes[0].rawText,
      地址: item.childNodes[5].childNodes[1].rawText,
    }
  }

  async function 取得表格列 () {
    return parse(await 取得網頁原始碼())
      .querySelectorAll('tr')
  }

  function 記錄門市資料 (item, 縣市, 鄉鎮) {
    try {
      const 門市資訊 = 擷取門市資訊(item)
      門市資料[門市資訊.編號] = {
        名稱: 門市資訊.名稱,
        地址: 門市資訊.地址,
        縣市: 縣市,
        鄉鎮: 鄉鎮,
      }
    } catch (e) {
    }
  }

  async function 取得門市資料 (縣市, 鄉鎮) {
    console.log(縣市, 鄉鎮)
    await driver.findElement(By.id('CITY')).sendKeys(縣市)
    await driver.findElement(By.id('AREA')).sendKeys(鄉鎮)
    await 暫停()
    const 表格列 = await 取得表格列()
    表格列.forEach(item => 記錄門市資料(item, 縣市, 鄉鎮))
  }
})()
