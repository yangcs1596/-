import Cookies from 'js-cookie'
import Config from '@/config'

const TokenKey = Config.TokenKey

//登录的时候可以去set
//key和expressTime可以配置在Config
//Cookies.set(key, value, expressTime)
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token, rememberMe) {
  if (rememberMe) {
    return Cookies.set(TokenKey, token, { expires: Config.tokenCookieExpires })
  } else return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
