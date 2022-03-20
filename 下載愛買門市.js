const fetch = require('sync-fetch')
const parser = require('node-html-parser')
const fs = require('fs')

;(async () => {
    const 輸出檔名 = '資料/愛買.tsv'
    fs.writeFileSync(輸出檔名, '類別\t名稱\t地址\r\n', {flag: 'w+'})
    const html = await fetch('https://www.fe-amart.com.tw/index.php/store').text()
    const dom = parser.parse(html)
    const nameList = dom.querySelectorAll('div.info-left > h3')
    const addressList = dom.querySelectorAll('div.info-left > p')
    for (let i = 0; i < nameList.length; i++) {
        const name = nameList[i].childNodes[0].rawText
        const address = addressList[i].childNodes[0].rawText
        const line = `愛買\t${name}\t${address}\r\n`
        fs.writeFileSync(輸出檔名, line, {flag: 'a'})
    }
})()
