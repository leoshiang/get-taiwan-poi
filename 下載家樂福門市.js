const fetch = require('sync-fetch')
const fs = require('fs')

const 輸出檔名 = '資料/家樂福.tsv'
fs.writeFileSync(輸出檔名, '', {flag: 'w+'})
const 欄位名稱 = '類別\t名稱\t地址\t縣市\t鄉鎮\t經度\t緯度'
fs.writeFileSync(輸出檔名, 欄位名稱 + '\r\n', {flag: 'a'})

fetch('https://www.carrefour.com.tw/console/api/v1/stores?page_size=all')
    .json()
    .data.rows.forEach(x => {
    const line = `家樂福${x.store_type_name}\t${x.name}\t${x.address}\t${x.city_name}\t${x.area_name}\t${x.longitude}\t${x.latitude}`
    console.log(line)
    fs.writeFileSync(輸出檔名, line + '\r\n', {flag: 'a'})
})
