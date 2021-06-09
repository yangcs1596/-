import Config from '@/config'

const settings = {
  state: {
    showRightPanel: false,
    tagsView: Config.tagsView,
    fixedHeader: Config.fixedHeader,
    sidebarLogo: Config.sidebarLogo,
    settingBtn: Config.settingBtn,
    uniqueOpened: Config.uniqueOpened,
    showFooter: Config.showFooter,
    footerTxt: Config.footerTxt,
    caseNumber: Config.caseNumber
  },
  mutations: {
    CHANGE_SETTING: (state, { key, value }) => {
      if (Object.prototype.hasOwnProperty.call(state, key)) {
        state[key] = value
      }
    }
  },
  actions: {
    changeSetting({ commit }, data) {
      commit('CHANGE_SETTING', data)
    }
  }
}
export default settings
