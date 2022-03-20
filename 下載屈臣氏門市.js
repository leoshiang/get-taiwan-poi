const fetch = require('sync-fetch')
const fs = require('fs')

const 輸出檔名 = '資料/屈臣氏.tsv'
fs.writeFileSync(輸出檔名, '類別\t名稱\t地址\t經度\t緯度\r\n', {flag: 'w+'})

const 縣市鄉鎮列表 = 取得縣市鄉鎮列表()
for (let 縣市 of Object.keys(縣市鄉鎮列表)) {
    const 鄉鎮列表 = 縣市鄉鎮列表[縣市]
    for (let 鄉鎮 of 鄉鎮列表) {
        const 門市列表 = fetch(`https://api.watsons.com.tw/api/v2/wtctw/stores/watStores?currentPage=0&pageSize=20&region=${縣市}&district=${鄉鎮}&isCceOrCc=false&fields=FULL&lang=zh_TW&curr=TWD`,
            {
                'credentials': 'include',
                'headers': {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:97.0) Gecko/20100101 Firefox/97.0',
                    'Accept': 'application/json, text/plain, */*',
                    'Accept-Language': 'zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3',
                    'X-Anonymous-Consents': '%5B%5D',
                    'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                    'Vary': '*',
                    'queueit-target': 'https://www.watsons.com.tw/store-finder?town=%E5%8D%97%E6%8A%95%E7%B8%A3&district=%E5%8D%97%E6%8A%95%E7%B8%A3%E5%8D%97%E6%8A%95%E5%B8%82',
                    'queueittoken': 'null',
                    'Sec-Fetch-Dest': 'empty',
                    'Sec-Fetch-Mode': 'cors',
                    'Sec-Fetch-Site': 'same-site',
                    'Authorization': 'bearer GUEST',
                    'If-Modified-Since': 'Sun, 20 Feb 2022 12:30:35 GMT',
                },
                'referrer': 'https://www.watsons.com.tw/',
                'method': 'GET',
                'mode': 'cors',
            }).json()

        門市列表.stores.forEach(x => {
            const line = `屈臣氏\t${x.seoName}\t${x.address.line1}\t${x.geoPoint.longitude}\t${x.geoPoint.latitude}`
            console.log(line)
            fs.writeFileSync(輸出檔名, line + '\r\n', {flag: 'a'})
        })
    }
}

function 取得縣市鄉鎮列表() {
    return fetch(
        'https://api.watsons.com.tw/api/v2/wtctw/stores/townsAndDistricts?isCceOrCc=false&lang=zh_TW&curr=TWD',
        {
            'credentials': 'include',
            'headers': {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:97.0) Gecko/20100101 Firefox/97.0',
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3',
                'X-Anonymous-Consents': '%5B%5D',
                'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
                'Pragma': 'no-cache',
                'Expires': '0',
                'Vary': '*',
                'queueit-target': 'https://www.watsons.com.tw/store-finder?town=%E5%8D%97%E6%8A%95%E7%B8%A3&district=%E5%8D%97%E6%8A%95%E7%B8%A3%E5%8D%97%E6%8A%95%E5%B8%82',
                'queueittoken': 'null',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-site',
                'Authorization': 'bearer GUEST',
                'If-Modified-Since': 'Sun, 20 Feb 2022 12:22:51 GMT',
            },
            'referrer': 'https://www.watsons.com.tw/',
            'method': 'GET',
            'mode': 'cors',
        }).json()
}

