const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  visitedViews: (state) => state.tagsView.visitedViews,
  cachedViews: (state) => state.tagsView.cachedViews,
  token: (state) => state.user.token,
  roles: (state) => state.user.roles,
  user: (state) => state.user.user,
  loadMenus: (state) => state.user.loadMenus,
  permission_routers: (state) => state.permission.routers,
  addRouters: (state) => state.permission.addRouters,
  uploadFileUrl: state => state.api.uploadFileUrl
}
export default getters
