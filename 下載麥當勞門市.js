const fetch = require('sync-fetch')
const fs = require('fs')
const 輸出檔名 = '資料/麥當勞.tsv'
fs.writeFileSync(輸出檔名, '類別\t名稱\t地址\t經度\t緯度\r\n', {flag: 'w+'})
let 門市列表 = {}

;(async () => {
    const 鄉鎮中心點 = [
        {
            lng: 120.04463632583763,
            lat: 26.183487923563913,
        },
        {
            lng: 121.64585823657417,
            lat: 24.573778731943406,
        },
        {
            lng: 120.4687850293186,
            lat: 23.964588605365954,
        },
        {
            lng: 120.98207742840816,
            lat: 23.842738414425064,
        },
        {
            lng: 120.37319296320032,
            lat: 23.68649797472862,
        },
        {
            lng: 121.72194741885323,
            lat: 25.121695794560736,
        },
        {
            lng: 120.92200621815,
            lat: 24.483912121122856,
        },
        {
            lng: 120.44793164640265,
            lat: 23.480547214749254,
        },
        {
            lng: 120.51995023051917,
            lat: 23.448734289107396,
        },
        {
            lng: 118.37787257564726,
            lat: 24.461429756867453,
        },
        {
            lng: 121.04162610472123,
            lat: 22.863097723164962,
        },
        {
            lng: 121.37896602641653,
            lat: 23.753363613117408,
        },
        {
            lng: 119.57506034934084,
            lat: 23.543058747518426,
        },
        {
            lng: 120.94630653094298,
            lat: 24.78699759666234,
        },
        {
            lng: 121.16353531442208,
            lat: 24.681086879645825,
        },
        {
            lng: 120.67671424999466,
            lat: 22.48270833157301,
        },
        {
            lng: 121.25764498717423,
            lat: 24.90329431966405,
        },
        {
            lng: 120.32475814399217,
            lat: 23.150778275952053,
        },
        {
            lng: 120.61521844693776,
            lat: 22.99337708496381,
        },
        {
            lng: 121.55329599246897,
            lat: 25.082944795685883,
        },
        {
            lng: 120.8923983283255,
            lat: 24.23821084255975,
        },
        {
            lng: 121.59536603481867,
            lat: 24.98710536925583,
        },
    ]

    for (let 中心 of 鄉鎮中心點) {
        const 回應 = await fetch(`https://www.mcdonalds.com/googleappsv2/geolocation?latitude=${中心.lat}&longitude=${中心.lng}&radius=50&maxResults=500&country=tw&language=zh-tw&showClosed=&hours24Text=Open%2024%20hr`,
            {
                'credentials': 'include',
                'headers': {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0',
                    'Accept': '*/*',
                    'Accept-Language': 'zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Sec-Fetch-Dest': 'empty',
                    'Sec-Fetch-Mode': 'cors',
                    'Sec-Fetch-Site': 'same-origin',
                },
                'referrer': 'https://www.mcdonalds.com/tw/zh-tw/restaurant-locator.html',
                'method': 'GET',
                'mode': 'cors',
            })
        const 門市資料 = await 回應.json()
        門市資料.features.forEach(x => {
            const 門市名稱 = x.properties.name.trim()
            if (!門市列表[門市名稱]) {
                const line = '麥當勞' + '\t' + 門市名稱 + '\t' + x.properties.addressLine1.trim() + '\t' +
                    x.geometry.coordinates[0] + '\t' + x.geometry.coordinates[1]
                console.log(line)
                fs.writeFileSync(輸出檔名, line + '\r\n', {flag: 'a'})
                門市列表[門市名稱] = true
            }
        })
    }
})()
