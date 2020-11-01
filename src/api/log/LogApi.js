import request from './index'

export function creatQrCode(params) {
  return request({
    url: 'tools/creatQrCode',
    method: 'get',
    responseType: 'blob',
    params
  })
}
