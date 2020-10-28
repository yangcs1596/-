import Vue from 'vue'
import Vuex from 'vuex'
import api from './modules/api'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    api
  },
  getters
})

export default store
