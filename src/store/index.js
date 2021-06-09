import Vue from 'vue'
import Vuex from 'vuex'
import api from './modules/api'
import app from './modules/app'
import permission from './modules/permission'
import settings from './modules/settings'
import tagsView from './modules/tagsView'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    api,
    app,
    settings,
    permission,
    tagsView,
    user
  },
  getters
})

export default store
