const {XMLParser} = require('fast-xml-parser')
const parser = new XMLParser();
const fetch = require('sync-fetch')
const fs = require('fs')

const 首頁網址 = 'https://emap.pcsc.com.tw/lib/areacode.js'
const ApiUrl = 'https://emap.pcsc.com.tw/EMapSDK.aspx'
let ApiParams = {
    'credentials': 'include',
    'headers': {
        'Accept': '*/*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest',
    },
    'referrer': 'https://emap.pcsc.com.tw/emap.aspx',
    'method': 'POST',
    'mode': 'cors',
}
const 輸出檔名 = '資料/7-11.tsv'

建立輸出檔案(輸出檔名)
for (const 縣市 of 擷取縣市資料(取得網頁資料(首頁網址))) {
    for (const 鄉鎮 of 解析MapSdkXML(取得鄉鎮列表(縣市.代碼))) {
        for (const 門市 of 解析MapSdkXML(取得門市列表(縣市.名稱, 鄉鎮.TownName))) {
            輸出結果(輸出檔名,
                `7-11\t${門市.POIName}\t${門市.Address}\t${縣市.名稱}\t${鄉鎮.TownName}\t${門市.X *
                0.000001}\t${門市.Y * 0.000001}`)
        }
    }
}

//--- END ---

function 建立輸出檔案(檔案名稱) {
    fs.writeFileSync(檔案名稱, '', {flag: 'w+'})
    const 欄位名稱 = '類別\t名稱\t地址\t縣市\t鄉鎮\t經度\t緯度'
    fs.writeFileSync(檔案名稱, 欄位名稱 + '\r\n', {flag: 'a'})
}

function 輸出結果(檔案名稱, 結果) {
    console.log(結果)
    fs.writeFileSync(檔案名稱, 結果 + '\r\n', {flag: 'a'})
}

function 取得網頁資料(網址, 參數) {
    return fetch(網址, 參數 || {}).text()
}

function 擷取縣市資料(JS程式) {
    let result = []
    const regex = /new AreaNode\('(.*)'.* '(\d+)'\)/g
    let match = null
    while (match = regex.exec(JS程式)) {
        result.push({
            名稱: match[1],
            代碼: match[2],
        })
    }
    return result
}

function 取得鄉鎮列表(縣市代碼) {
    ApiParams.body = `commandid=GetTown&cityid=${縣市代碼}&leftMenuChecked=`
    return 取得網頁資料(ApiUrl, ApiParams)
}

function 取得門市列表(縣市名稱, 鄉鎮名稱) {
    ApiParams.body = `commandid=SearchStore&city=${縣市名稱}&town=${鄉鎮名稱}`
    return 取得網頁資料(ApiUrl, ApiParams)
}

function 解析MapSdkXML(XML) {
    const 位置列表 = parser.parse(XML)
    if (!位置列表.iMapSDKOutput) {
        return []
    }
    if (!位置列表.iMapSDKOutput.GeoPosition) {
        return []
    }
    const result = 位置列表.iMapSDKOutput.GeoPosition
    return 取得型別(result) === 'Array' ?
        result :
        [result]
}

function 取得型別(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1)
}
