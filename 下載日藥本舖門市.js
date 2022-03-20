const fetch = require('sync-fetch')
const fs = require("fs");
const 輸出檔名 = '資料/日藥本舖.tsv'
建立輸出檔案(輸出檔名)

const 縣市地區列表 = 取得縣市地區列表()
縣市地區列表.forEach(縣市 => 縣市.地區列表.forEach(地區 => {
    let 門市資訊 = 取得門市資訊(地區.id)
    門市資訊.forEach(x => {
        const line = `日藥本舖\t${x.name}\t${x.address}\t${x.city}\t${x.area}\t${x.lng}\t${x.lat}`
        輸出結果(輸出檔名, line)
    })
}))

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

function 取得門市資訊(地區編號) {
    let 回應 = fetch(`https://webapi.91app.com/webapi/LocationV2/GetLocationListByArea?areaId=${地區編號}&startIndex=0&maxCount=100&IsEnableRetailStore=false&r=null&lang=zh-TW&shopId=41165`, {
        "credentials": "omit",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:98.0) Gecko/20100101 Firefox/98.0",
            "Accept": "*/*",
            "Accept-Language": "zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "cross-site",
            "Pragma": "no-cache",
            "Cache-Control": "no-cache"
        },
        "referrer": "https://www.jpmed.com.tw/",
        "method": "GET",
        "mode": "cors"
    }).json();

    return 回應.Data.List.map(x => ({
        name: x.Name,
        city: x.CityName,
        area: x.AreaName,
        address: x.Address,
        lng: x.Longitude,
        lat: x.Latitude
    }))
}

function 取得縣市地區列表() {
    let 回應 = fetch("https://webapi.91app.com/webapi/LocationV2/GetCityAreaList/41165?v=0&IsEnableRetailStore=false&lang=zh-TW&shopId=41165", {
        "credentials": "omit",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:98.0) Gecko/20100101 Firefox/98.0",
            "Accept": "*/*",
            "Accept-Language": "zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "cross-site",
            "Pragma": "no-cache",
            "Cache-Control": "no-cache"
        },
        "referrer": "https://www.jpmed.com.tw/",
        "method": "GET",
        "mode": "cors"
    }).json()

    return 回應.Data.List.map(x => {
        return {
            id: x.Id,
            name: x.Title,
            地區列表: x.AreaList.map(area => ({id: area.Id, Name: area.title}))
        }
    })
}
