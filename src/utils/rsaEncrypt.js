import JSEncrypt from 'jsencrypt/bin/jsencrypt'

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey =
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDaQEmXE0amrG9MdkIhfRqQuoJU\n' +
  'Lnwic6+xOw8XQtVZw+nu5jAhfeo5grgzJAlXQPaVv+/v1JdHqhjr0O/VQbPJU7HA\n' +
  'NmA/hPZQGkGtmUl939GshB5y3ZGrKo4Z3ZrOuYnm0m5ChSUqcXvs/oLT8gMFFXjX\n' +
  'KiNRJ2CtWjKzZQid8wIDAQAB'

const privateKey =
  'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBANpASZcTRqasb0x2\n' +
  'QiF9GpC6glQufCJzr7E7DxdC1VnD6e7mMCF96jmCuDMkCVdA9pW/7+/Ul0eqGOvQ\n' +
  '79VBs8lTscA2YD+E9lAaQa2ZSX3f0ayEHnLdkasqjhndms65iebSbkKFJSpxe+z+\n' +
  'gtPyAwUVeNcqI1EnYK1aMrNlCJ3zAgMBAAECgYEAmLgxhoCbiJfSzdtWjR6Aj1Oj\n' +
  'TQq2HFl9UHQ2LB29MzIPKPd0KIt2ccXR5R9LVf4ETmdfmx/Ut/YDuEec+0odZfDY\n' +
  'QXHO05ufwKVrzKC0AWeKZRo9w3oSt+60n6TjLf+jKmJTAOp5D2cmAxo0YlgfhRVm\n' +
  'KOzm2hVg7NIHyAHI4mkCQQD/dBid43rj6ooRZpmZ8rFU4lEJwK3xrhS9edepw5FW\n' +
  'SmZkPZG26NcidhxkU4+sx2L14us07gFELIRPwLK/fVNVAkEA2rfRFUo8CcS5zBKp\n' +
  'PPhStJGxhTxfKX6XktzhRKInCX0nHbO3vHecRi2Qsc/Zt7ubZaox5gOvbBUX8q2Q\n' +
  '1cU8JwJAIWOVTB3NlDi1ryyP6xVTpFqoaPPsSGiOgW2JiMDtIDA9TeDWSOgKJpD1\n' +
  'iQ96+gRdpPHx+Esbk0OWT65KLsk8uQJAAyx9rThpjJ69L3fp2sejs5kVoWBR5TFA\n' +
  'E9J+tldAB8Q4KBcuiF6X9vC8U8g3WZIwXBZPKQ5OolvgABaCrodxKwJAMGew5Ron\n' +
  'SGoBgkt8dUTpjG7Lt9Q7Xl+is60X0swkebtJh5fPnwEotzrKTXGCXNYQEIqH1Yh1\n' +
  '12fHBGhkC2bsOA=='

// 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对需要加密的数据进行加密
}

// 解密
export function decrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey)
  return encryptor.decrypt(txt)
}
