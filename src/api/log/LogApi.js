import request from './index'

export default request

export function login(params) {
  return request({
    url: '/login',
    method: 'get',
    responseType: 'blob',
    params
  })
}

export function test(params) {
  return request({
    url: '/login',
    method: 'get',
    responseType: 'blob',
    params
  })
}
