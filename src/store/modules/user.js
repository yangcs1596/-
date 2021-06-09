import { login, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    user: {},
    roles: [],
    userInfo: {},
    // 第一次加载菜单时用到
    loadMenus: false
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_LOAD_MENUS: (state, loadMenus) => {
      state.loadMenus = loadMenus
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const rememberMe = userInfo.rememberMe
      return new Promise((resolve, reject) => {
        login(userInfo.username, userInfo.password, userInfo.code, userInfo.uuid)
          .then((res) => {
            if (res.code && res.code !== 0) {
              // 登录输入错误的情况判断
              resolve(res)
            } else {
              setToken(res.data, rememberMe)
              commit('SET_USER_INFO', {
                userId: res.data.user.id,
                applicationClientId: res.data.user.applicationClientId
              })
              commit('SET_TOKEN', res.data.token)
              commit('SET_USER', res.data.user)

              // setUserInfo(res.user, commit)
              // 第一次加载菜单时用到， 具体见 src 目录下的 permission.js
              commit('SET_LOAD_MENUS', true)
              resolve()
            }
          })
          .catch((error) => {
            removeToken()
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then((res) => {
            setUserInfo(res, commit)
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 登出
    LogOut({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
      })
    },

    updateLoadMenus({ commit }) {
      return new Promise(() => {
        commit('SET_LOAD_MENUS', false)
      })
    }
  }
}

export const logOut = (commit) => {
  commit('SET_TOKEN', '')
  commit('SET_ROLES', [])
  removeToken()
}

export const setUserInfo = (res, commit) => {
  if (res.roles !== undefined) {
    // 如果没有任何权限，则赋予一个默认的权限，避免请求死循环
    if (res.roles.length === 0) {
      commit('SET_ROLES', [''])
    } else {
      commit('SET_USER_INFO', {
        userId: res.userId,
        applicationClientId: res.applicationClientId
      })
      commit('SET_ROLES', res.roles)
    }
  }
  commit('SET_USER', res)
}

export default user
