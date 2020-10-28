import axios from 'axios'
import Config from '@/config'
import router from '@/router/routers'
import { Notification, MessageBox } from 'element-ui'

const urlPrefix = process.env.NODE_ENV === 'production' ? process.env.BASE_API : '/api'

const concatUrl = function(...url) {
  let result = '/'
  url.forEach(e => {
    e = e === undefined ? '' : e
    if (e.startsWith('/')) {
      e = e.substring(1, e.length)
    }
    if (e.endsWith('/')) {
      e = e.substring(0, e.length - 1)
    }
    if (e.length > 0) {
      result = result + e + '/'
    }
  })
  return result.substring(0, result.length - 1)
}

const requestBuilder = function(baseUrl) {
  // 创建axios实例
  const service = axios.create({
    baseURL: concatUrl(urlPrefix, baseUrl),
    timeout: Config.timeout // 请求超时时间
  })
  // request拦截器
  service.interceptors.request.use(
    config => {
      const paramToken = getParam('token')
      if (paramToken !== undefined && paramToken !== null) {
        config.headers['Authorization'] = 'Bearer ' + paramToken
      } else if (getToken()) {
        config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
      }
      /*    if (getToken()) {
            config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
          }*/
      config.headers['Content-Type'] = 'application/json'
      return config
    },
    error => {
      // Do something with request error
      console.log(error) // for debug
      Promise.reject(error)
    }
  )

  // response 拦截器
  service.interceptors.response.use(
    response => {
      const code = response.status
      if (code < 200 || code > 300) {
        Notification.error({
          title: response.message
        })
        return Promise.reject('error')
      } else {
        if (response.data && response.data.code !== undefined && response.data.code !== 0) {
          Notification.error({
            title: response.data.message || response.data.code
          })
        }
        return response.data
      }
    },
    error => {
      let code = 0
      try {
        code = error.response.status
      } catch (e) {
        if (error.toString().indexOf('Error: timeout') !== -1) {
          Notification.error({
            title: '网络请求超时',
            duration: 2500
          })
          return Promise.reject(error)
        }
        if (error.toString().indexOf('Error: Network Error') !== -1) {
          Notification.error({
            title: '网络请求错误',
            duration: 2500
          })
          return Promise.reject(error)
        }
      }
      if (code === 401) {
        MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('LogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      } else if (code === 403) {
        router.push({ path: '/401' })
      } else {
        // FIXME 错误码提示对客户不友好，业务上自己捕获
        const errorMsg = error.response.data.message
        if (errorMsg !== undefined) {
          console.log(errorMsg)
          /* Notification.error({
            title: errorMsg,
            duration: 2500
          })*/
        }
      }
      return Promise.reject(error)
    }
  )
  return service
}
export default requestBuilder
