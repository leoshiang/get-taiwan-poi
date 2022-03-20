const fetch = require('sync-fetch')
const fs = require('fs')

const 輸出檔名 = '資料/全聯.tsv'

建立輸出檔案(輸出檔名)
取得區域列表()
    .forEach(縣市 => 取得區域列表(縣市)
        .forEach(鄉鎮 => 取得門市列表(縣市, 鄉鎮)
            .forEach(門市 => {
                const line = `全聯\t${門市.名稱}\t${門市.地址}\t${門市.縣市}\t${門市.鄉鎮}\t${門市.經度}\t${門市.緯度}`
                輸出結果(輸出檔名, line)
            })))

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

function 取得區域列表(縣市, 鄉鎮) {
    return 取得JSON('https://www.pxmart.com.tw/Api/api/Common/GetArea2', {
        method: 'POST',
        body: `{"city":"${縣市 || ''}","area":"${鄉鎮 || ''}","type":1,"exclusiveId":0}`,
        headers: {'Content-Type': 'application/json'},
    })
        .data
        .map(x => x.value)
}

function 取得門市列表(縣市, 鄉鎮) {
    return 取得JSON('https://www.pxmart.com.tw/Api/api/Shop/api/Shop/WEBGetShopList', {
        method: 'POST',
        body: `{"city":"${縣市 || ''}","area":"${鄉鎮 || ''}","street":"","name":"","serviceProject":[]}`,
        headers: {'Content-Type': 'application/json'},
    })
        .data
        .map(x => ({
            類別: '全聯',
            名稱: x.name,
            地址: x.address,
            縣市: 縣市,
            鄉鎮: 鄉鎮,
            經度: x.longitude,
            緯度: x.latitude,
        }))
}

function 取得JSON(網址, 參數) {
    return fetch(網址, 參數 || {}).json()
}
