require('dotenv').config()
const 交通部API = require('./交通部API.js')
const fs = require('fs')
const fetch = require('sync-fetch')
const 縣市列表 = [
    'Taipei',
    'NewTaipei',
    'Kaohsiung',
    'Hsinchu',
    'HsinchuCounty',
    'MiaoliCounty',
    'ChanghuaCounty',
    'NantouCounty',
    'YunlinCounty',
    'ChiayiCounty',
    'Chiayi',
    'PingtungCounty',
    'YilanCounty',
    'HualienCounty',
    'TaitungCounty',
    'PenghuCounty',
    'Tainan',
    'KinmenCounty',
    'Taoyuan',
    'Taichung',
    'Keelung',
]

const params = {
    'headers': 交通部API.取得驗證標頭(process.env.PtxAppID, process.env.PtxAppKey),
    'method': 'GET',
}

const 輸出檔名 = './資料/公車站牌.tsv'
fs.writeFileSync(輸出檔名, '', {flag: 'w+'})
const 欄位名稱 = '類別\t編號\t名稱\t地址\t縣市\t鄉鎮\t經度\t緯度'
fs.writeFileSync(輸出檔名, 欄位名稱 + '\r\n', {flag: 'a'})

縣市列表.forEach(縣市 => 取得站牌資訊(縣市).forEach(站牌資訊 => {
    const line =
        '公車站牌\t' +
        站牌資訊.StationID + '\t' +
        站牌資訊.StationName.Zh_tw + '\t' +
        (站牌資訊.StationAddress || '') + '\t' +
        縣市 + '\t' +
        '' + '\t' +
        站牌資訊.StationPosition.PositionLon + '\t' +
        站牌資訊.StationPosition.PositionLat
    寫入輸出檔(line)
}))

function 取得站牌資訊(縣市) {
    console.log(縣市)
    return 取得JSON(`https://ptx.transportdata.tw/MOTC/v2/Bus/Station/City/${縣市}?$top=50000&$format=JSON`,
        params)
}

function 取得JSON(網址, 參數) {
    return fetch(網址, 參數 || {}).json()
}

function 寫入輸出檔(結果) {
    fs.writeFileSync(輸出檔名, 結果 + '\r\n', {flag: 'a'})
}
