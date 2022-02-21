const {
  Builder,
  By,
  until,
} = require('selenium-webdriver')
const { parse } = require('node-html-parser')
const fs = require('fs')
const 輸出檔名 = '資料/健保特約醫事機構.tsv'
fs.writeFileSync(輸出檔名, '類別\t名稱\t地址\t電話\r\n', { flag: 'w+' })

const 類別 = [
    '醫學中心', '地區醫院', '診所', '藥局', '居家護理', '康復之家', '助產所', '區域醫院', '物理治療所', '特約醫事放射機構', '呼吸照顧所',
  ]

;(async () => {
  const browser = new Builder().forBrowser('chrome').build()

  for (let category of 類別) {
    await browser.get('https://www.nhi.gov.tw/queryN/Query3.aspx')
    await browser.sleep(250)
    await browser.findElement(By.id('ctl00_ContentPlaceHolder1_ddlSpecialCode')).sendKeys(category)
    await browser.sleep(250)
    await browser.findElement(By.id('ctl00_ContentPlaceHolder1_btnSubmit')).click()
    await browser.sleep(250)
    await browser.findElement(By.id('ctl00_ContentPlaceHolder1_lkPrint')).click()
    await browser.sleep(250)
    const html = await browser
      .wait(until.elementLocated(By.css('body')), 2000)
      .getAttribute('innerHTML')
    const rows = parse(html).querySelectorAll('tr')
    rows.shift()
    rows.shift()
    rows.forEach(row => {
      let name = getText(row, 1)
      let address = getText(row, 2)
      let tel = getText(row, 3)
      const line = `${category}\t${name}\t${address}\t${tel}\r\n`
      console.log(line)
      fs.writeFileSync(輸出檔名, line, { flag: 'a' })
    })
  }
})()

function getText (row, index) {
  if (row.childNodes[index]) {
    if (row.childNodes[index].childNodes[1]) {
      if (row.childNodes[index].childNodes[1].childNodes[0]) {
        return row.childNodes[index].childNodes[1].childNodes[0].rawText
      }
    }
  }
  return ''
}
