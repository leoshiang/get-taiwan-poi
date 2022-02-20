const jsSHA1 = require('jssha/sha1')

function 取得驗證標頭 (AppID, AppKey) {
  const GMTString = new Date().toGMTString()
  const shaObj = new jsSHA1('SHA-1', 'TEXT', {
    hmacKey: {
      value: AppKey,
      format: 'TEXT',
    },
  })
  shaObj.update('x-date: ' + GMTString)
  const HMAC = shaObj.getHash('B64')
  const Authorization = `hmac username="${AppID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`
  return {
    'Authorization': Authorization,
    'X-Date': GMTString,
  }
}

module.exports = {
  取得驗證標頭,
}
