const exec = require('child_process').exec
const {parse} = require('node-html-parser')
const fs = require('fs')

const 縣市鄉鎮列表 = [
    {
        '縣市': '南投縣',
        '鄉鎮': '仁愛鄉,竹山鎮,草屯鎮,國姓鄉,中寮鄉,魚池鄉,名間鄉,集集鎮,埔里鎮,南投市,鹿谷鄉,水里鄉,信義鄉',
    }, {
        '縣市': '嘉義市',
        '鄉鎮': '東區,西區',
    }, {
        '縣市': '嘉義縣',
        '鄉鎮': '太保市,東石鄉,朴子市,水上鄉,番路鄉,中埔鄉,阿里山鄉,大埔鄉,梅山鄉,竹崎鄉,鹿草鄉,義竹鄉,六腳鄉,新港鄉,大林鎮,民雄鄉,溪口鄉,布袋鎮',
    }, {
        '縣市': '基隆市',
        '鄉鎮': '仁愛區,七堵區,暖暖區,信義區,中山區,中正區,安樂區',
    }, {
        '縣市': '宜蘭縣',
        '鄉鎮': '員山鄉,羅東鎮,冬山鄉,三星鄉,大同鄉,南澳鄉,頭城鎮,蘇澳鎮,五結鄉,宜蘭市,壯圍鄉,礁溪鄉',
    }, {
        '縣市': '屏東縣',
        '鄉鎮': '泰武鄉,來義鄉,春日鄉,獅子鄉,佳冬鄉,萬丹鄉,東港鎮,新埤鄉,枋寮鄉,里港鄉,崁頂鄉,鹽埔鄉,高樹鄉,萬巒鄉,竹田鄉,內埔鄉,新園鄉,牡丹鄉,枋山鄉,滿州鄉,林邊鄉,車城鄉,屏東市,潮州鎮,長治鄉,麟洛鄉,恆春鎮,九如鄉,瑪家鄉,霧臺鄉,三地門鄉,琉球鄉,南州鄉',
    }, {
        '縣市': '彰化縣',
        '鄉鎮': '埔鹽鄉,員林市,田尾鄉,北斗鎮,田中鎮,社頭鄉,彰化市,和美鎮,線西鄉,伸港鄉,秀水鄉,花壇鄉,芬園鄉,溪湖鎮,大村鄉,埔心鄉,永靖鄉,二水鄉,二林鎮,埤頭鄉,芳苑鄉,大城鄉,竹塘鄉,溪州鄉,鹿港鎮,福興鄉',
    }, {
        '縣市': '新北市',
        '鄉鎮': '三峽區,石門區,林口區,萬里區,金山區,瑞芳區,貢寮區,雙溪區,永和區,三重區,泰山區,新莊區,石碇區,板橋區,深坑區,淡水區,平溪區,坪林區,五股區,蘆洲區,土城區,新店區,中和區,烏來區,三芝區,鶯歌區,八里區,樹林區,汐止區',
    }, {
        '縣市': '新竹市',
        '鄉鎮': '東區,香山區,北區',
    }, {
        '縣市': '新竹縣',
        '鄉鎮': '關西鎮,峨眉鄉,寶山鄉,五峰鄉,尖石鄉,北埔鄉,橫山鄉,芎林鄉,新豐鄉,湖口鄉,竹北市,新埔鎮,竹東鎮',
    }, {
        '縣市': '桃園市',
        '鄉鎮': '大溪區,龜山區,蘆竹區,龍潭區,觀音區,復興區,桃園區,八德區,大園區,中壢區,楊梅區,平鎮區,新屋區',
    }, {
        '縣市': '澎湖縣',
        '鄉鎮': '望安鄉,西嶼鄉,七美鄉,白沙鄉,馬公市,湖西鄉',
    }, {
        '縣市': '臺中市',
        '鄉鎮': '神岡區,中區,梧棲區,西區,南屯區,北區,西屯區,北屯區,潭子區,沙鹿區,大雅區,龍井區,大里區,霧峰區,太平區,東區,大安區,大甲區,清水區,豐原區,東勢區,后里區,新社區,石岡區,外埔區,大肚區,和平區,南區,烏日區',
    }, {
        '縣市': '臺北市',
        '鄉鎮': '北投區,士林區,信義區,大安區,松山區,南港區,內湖區,中山區,中正區,萬華區,文山區,大同區',
    }, {
        '縣市': '臺南市',
        '鄉鎮': '東山區,新營區,鹽水區,白河區,後壁區,麻豆區,下營區,六甲區,官田區,大內區,佳里區,學甲區,西港區,新化區,新市區,安定區,山上區,善化區,玉井區,北門區,楠西區,安平區,東區,南區,左鎮區,南化區,中西區,安南區,將軍區,仁德區,歸仁區,關廟區,柳營區,龍崎區,永康區,北區,七股區',
    }, {
        '縣市': '臺東縣',
        '鄉鎮': '成功鎮,綠島鄉,蘭嶼鄉,鹿野鄉,池上鄉,延平鄉,臺東市,卑南鄉,東河鄉,達仁鄉,大武鄉,關山鎮,海端鄉,長濱鄉,金峰鄉,太麻里鄉',
    }, {
        '縣市': '花蓮縣',
        '鄉鎮': '鳳林鎮,花蓮市,萬榮鄉,豐濱鄉,吉安鄉,新城鄉,壽豐鄉,光復鄉,瑞穗鄉,富里鄉,玉里鎮,卓溪鄉,秀林鄉',
    }, {
        '縣市': '苗栗縣',
        '鄉鎮': '三義鄉,苑裡鎮,通霄鎮,南庄鄉,頭份市,西湖鄉,造橋鄉,獅潭鄉,泰安鄉,苗栗市,卓蘭鎮,三灣鄉,大湖鄉,公館鄉,銅鑼鄉,頭屋鄉,竹南鎮,後龍鎮',
    }, {
        '縣市': '連江縣',
        '鄉鎮': '南竿鄉,東引鄉,北竿鄉,莒光鄉',
    }, {
        '縣市': '金門縣',
        '鄉鎮': '金城鎮,烈嶼鄉,金沙鎮,金湖鎮,烏坵鄉,金寧鄉',
    }, {
        '縣市': '雲林縣',
        '鄉鎮': '麥寮鄉,水林鄉,元長鄉,褒忠鄉,東勢鄉,崙背鄉,二崙鄉,莿桐鄉,大埤鄉,林內鄉,古坑鄉,北港鎮,土庫鎮,西螺鎮,虎尾鎮,斗南鎮,斗六市,臺西鄉,口湖鄉,四湖鄉',
    },
]

const 輸出檔名 = '資料/OKmart.tsv'
fs.writeFileSync(輸出檔名, '類別\t名稱\t地址\r\n', {flag: 'w+'})
縣市鄉鎮列表.forEach(縣市鄉鎮 => {
    const 鄉鎮列表 = 縣市鄉鎮.鄉鎮.split(',')
    鄉鎮列表.forEach(鄉鎮 => {
        const args = `'https://www.okmart.com.tw/convenient_shopSearch_Result.aspx?city=${縣市鄉鎮.縣市}&zipcode=${鄉鎮}&key=&service=&service2=&_=1628251952370' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:90.0) Gecko/20100101 Firefox/90.0' -H 'Accept: */*' -H 'Accept-Language: zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3' --compressed -H 'X-Requested-With: XMLHttpRequest' -H 'Connection: keep-alive' -H 'Referer: https://www.okmart.com.tw/convenient_shopSearch' -H 'Cookie: _ga=GA1.3.298275370.1628251817; _gid=GA1.3.1030743972.1628251817' -H 'Sec-Fetch-Dest: empty' -H 'Sec-Fetch-Mode: cors' -H 'Sec-Fetch-Site: same-origin'`
        exec('curl ' + args, function (error, stdout, stderr) {
            if (stdout.indexOf('html') > 0) {
                console.error(`ERROR:${縣市鄉鎮.縣市},${鄉鎮}`)
                return
            }
            const root = parse(stdout)
            const items = root.querySelectorAll('ul li')
            items.forEach(x => {
                const name = x.childNodes[0].text.trim()
                const address = x.childNodes[1].text.trim()
                const line = `OKmart\t${name}\t${address}`
                console.log(line)
                fs.writeFileSync(輸出檔名, line + '\r\n', {flag: 'a'})
            })
        })
    })
})
