import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: () => import('@/components/HelloWorld')
    },
    {
      path: '/select',
      name: 'elSelect',
      component: () => import('@/select/elSelectLazy'),
    },
    {
      path: '/form',
      name: 'CreateTest',
      component: () => import('@/components/CreateTest'),
    }
    // {path:'*',redirect: '404'}
  ]
})
