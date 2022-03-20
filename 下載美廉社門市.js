const fetch = require('sync-fetch')
const fs = require('fs')

const 輸出檔名 = '資料/美廉社.tsv'
建立輸出檔案(輸出檔名)

取得縣市列表().forEach(縣市 => {
    取得區域列表(縣市).forEach(區域 => {
        取得門市列表(縣市, 區域).forEach(門市 => {
            const 門市資訊 = 取得門市資訊(縣市, 區域, 門市)
            const line = `美廉社\t${門市資訊.名稱}\t${門市資訊.地址}\t${縣市}\t${區域}`
            輸出結果(輸出檔名, line)
        })
    })
})

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

function 取得名稱列表(html) {
    const regex = />([\u4e00-\u9fa5]+)</g
    let result = []
    let match = null
    while (match = regex.exec(html)) {
        result.push(match[1])
    }
    return result
}

function 取得門市名稱(html) {
    const regex = /class='map-name'>([\u4e00-\u9fa5]+)</g
    let match = regex.exec(html)
    return match
        ? match[1]
        : ''
}

function 取得門市地址(html) {
    const regex = /class='map-add' >([\u4e00-\u9fa5~、\d-]+)</g
    let match = regex.exec(html)
    return match
        ? match[1]
        : ''
}

function 取得網頁資料(網址, 參數) {
    return fetch(網址, 參數 || {}).text()
}

function 取得縣市列表() {
    return 取得名稱列表(取得網頁資料(
        'https://www.simplemart.com.tw/ec99/ushop20097/plusData.asp?ty=1&ptype=%E7%BE%8E%E5%BB%89%E7%A4%BE&rnd=0.20653061975024367'))
}

function 取得區域列表(縣市) {
    return 取得名稱列表(取得網頁資料(`https://www.simplemart.com.tw/ec99/ushop20097/plusData.asp?ty=2&ptype=%E7%BE%8E%E5%BB%89%E7%A4%BE&pcity=${縣市}&rnd=0.8984461594081031`))
}

function 取得門市列表(縣市, 區域) {
    return 取得名稱列表(取得網頁資料(`https://www.simplemart.com.tw/ec99/ushop20097/plusData.asp?ty=3&ptype=%E7%BE%8E%E5%BB%89%E7%A4%BE&pcity=${縣市}&parea=${區域}&rnd=0.9456439773323051`))
}

function 取得門市資訊(縣市, 區域, 門市名稱) {
    const 回應 = 取得網頁資料(`https://www.simplemart.com.tw/ec99/ushop20097/plusData.asp?ty=4&ptype=%E7%BE%8E%E5%BB%89%E7%A4%BE&pcity=${縣市}&parea=${區域}&pname=${門市名稱}&pKey=&rnd=0.8468153723287976`)
    return {
        名稱: 取得門市名稱(回應),
        地址: 取得門市地址(回應),
    }
}
