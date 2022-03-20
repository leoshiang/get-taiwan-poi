const {
    Builder,
    By,
    until,
} = require('selenium-webdriver')
const {parse} = require('node-html-parser')
const fs = require('fs')

const 輸出檔名 = '資料/萊爾富.tsv'
建立輸出檔案(輸出檔名)

const browser = 建立瀏覽器()

;(async function () {
    await browser.get('http://www.hilife.com.tw/storeInquiry_street.aspx')
    await 暫停()
    const 縣市選項 = await 取得縣市選項()
    for (let 縣市 of 縣市選項) {
        await 點選縣市(縣市)
        await 暫停()
        const 鄉鎮選項 = await 取得鄉鎮選項()
        for (let 鄉鎮 of 鄉鎮選項) {
            console.log(縣市, 鄉鎮)
            await 點選鄉鎮(鄉鎮)
            await 暫停()
            const 門市列表 = parse(await 取得網頁原始碼()).querySelectorAll('tr')
            if ((門市列表 || []).length === 0) {
                console.log(`查詢 ${縣市} ${鄉鎮}...查無資料`)
                continue
            }
            門市列表.forEach(item => {
                try {
                    const 門市資訊 = {
                        編號: item.childNodes[1].childNodes[0].rawText,
                        名稱: item.childNodes[3].childNodes[0].rawText,
                        地址: item.childNodes[5].childNodes[1].rawText,
                    }
                    const line = `萊爾富\t${門市資訊.名稱}\t${門市資訊.地址}\t${縣市}\t${鄉鎮}`
                    輸出結果(輸出檔名, line)
                } catch (e) {
                }
            })
        }
    }
})()

//--- END ---

function 建立輸出檔案(檔案名稱) {
    const 欄位名稱 = '類別\t名稱\t地址\t縣市\t鄉鎮'
    fs.writeFileSync(檔案名稱, '', {flag: 'w+'})
    fs.writeFileSync(檔案名稱, 欄位名稱 + '\r\n', {flag: 'a'})
}

function 輸出結果(檔案名稱, 結果) {
    console.log(結果)
    fs.writeFileSync(輸出檔名, 結果 + '\r\n', {flag: 'a'})
}

function 建立瀏覽器() {
    return new Builder().forBrowser('chrome').build()
}

async function 暫停() {
    await browser.sleep(2000)
}

function 取得縣市選項() {
    return 取得選項('#CITY')
}

function 取得鄉鎮選項() {
    return 取得選項('#AREA')
}

async function 取得選項(id) {
    return parse(await 取得網頁原始碼())
        .querySelectorAll(`${id} option`)
        .map(x => x.childNodes[0].text)
}

async function 取得網頁原始碼() {
    return await browser
        .wait(until.elementLocated(By.css('body')), 2000)
        .getAttribute('innerHTML')
}

async function 點選縣市(縣市) {
    await browser.findElement(By.id('CITY')).sendKeys(縣市)
}

async function 點選鄉鎮(鄉鎮) {
    await browser.findElement(By.id('AREA')).sendKeys(鄉鎮)
}
