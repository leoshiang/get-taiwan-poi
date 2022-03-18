const 縣市名稱 = [
    '臺北市', '新北市', '基隆市', '宜蘭縣', '桃園市', '新竹市', '新竹縣', '苗栗縣', '臺中市', '彰化縣', '南投縣',
    '嘉義市', '嘉義縣', '雲林縣', '臺南市', '高雄市', '屏東縣', '臺東縣', '花蓮縣', '澎湖縣', '金門縣', '連江縣',]

const fetch = require('sync-fetch')
const fs = require("fs");
const 輸出檔名 = '資料/康是美.tsv'
建立輸出檔案(輸出檔名)

縣市名稱.forEach(x => {
    const 門市資料 = 取得門市資料(x)
    門市資料.forEach(x => {
        const line = `萊爾富\t${x.StoreNM}\t${x.Address}\t${x.ZipCodeName1}\t${x.ZipCodeName2}\t${x.lng}\t${x.lat}`
        輸出結果(輸出檔名, line)
    })
})

//--- END ---

function 建立輸出檔案(檔案名稱) {
    const 欄位名稱 = '類別\t名稱\t地址\t縣市\t鄉鎮\t經度\t緯度'
    fs.writeFileSync(檔案名稱, '', {flag: 'w+'})
    fs.writeFileSync(檔案名稱, 欄位名稱 + '\r\n', {flag: 'a'})
}

function 輸出結果(檔案名稱, 結果) {
    console.log(結果)
    fs.writeFileSync(輸出檔名, 結果 + '\r\n', {flag: 'a'})
}

function 取得門市資料(縣市) {
    return fetch(`https://www.cosmed.com.tw/api/getStore.aspx?t=store&c=${encodeURI(縣市)}&d=&s=`, {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:98.0) Gecko/20100101 Firefox/98.0",
            "Accept": "*/*",
            "Accept-Language": "zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3",
            "X-Requested-With": "XMLHttpRequest",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin"
        },
        "referrer": "https://www.cosmed.com.tw/shop.aspx",
        "method": "GET",
        "mode": "cors"
    }).json().data
}
