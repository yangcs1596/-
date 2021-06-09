import request from '@/utils/requestBuilder'
// import JSEncrypt from 'jsencrypt/bin/jsencrypt.min.js'

export function login(username, password, code, uuid) {
  /**
   * 自行生成 RSA 秘钥对, 此处需要使用公钥
   */
  // const PUBLIC_KEY =
  //   'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCXExDzkkx4XEpgf8EV9dEYoaaL9RUxR+pkKDVd4GVrI292upvn/Si+fF/2fsIfUho9l9zCACTLP3z/K53+H2ZdlJI6XslfGYt/+70b0OSAt6wSKnCHXOyI/xmMhOtUePlUg8O0rHWkrl1cFWNse08laeA4lbRbPUrtvahd4H1IlQIDAQAB'
  // const jsencrypt = new JSEncrypt()
  // jsencrypt.setPublicKey(PUBLIC_KEY)
  return request({
    url: '/templateLogin',
    method: 'post',
    data: {
      username,
      password: password, //jsencrypt.encrypt(),
      code,
      uuid,
      encrypted: true
    }
  })
}

export function getInfo() {
  return request({
    url: '/api/bzxt/auth/getUserInfo',
    method: 'get'
  })
}

export function getCodeImg() {
  return request({
    url: '/api/bzxt/auth/vCode',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: 'auth/logout',
    method: 'delete'
  })
}

export function getViewConfig(data) {
  return request({
    url: '/api/bzxt/auth/getViewConfig',
    method: 'post',
    data
  })
}
