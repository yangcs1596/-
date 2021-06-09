import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/* Layout */
import Layout from '../layout/Layout'

export const constantRouterMap = [
  {
    path: '/',
    component: Layout,
    name: '首页',
    meta: { title: '首页', icon: 'index', noCache: true, affix: true },
    redirect: 'HelloWorld',
    children: [
      {
        path: '/HelloWorld',
        name: 'HelloWorld',
        component: () => import('@/view/card/ReserveFlipper'),
        meta: {title: 'Hello', icon: 'index', noCache: false, affix: true}
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('@/view/login'),
        meta: {title: 'login', icon: 'index', noCache: false, affix: true}
      },
      {
        path: '/select',
        name: 'elSelect',
        component: () => import('@/select/elSelectLazy'),
        meta: {title: 'select', icon: 'index', noCache: false, affix: true}
      },
      {
        path: '/form',
        name: 'CreateTest',
        component: () => import('@/components/CreateTest'),
        meta: {title: 'form', icon: 'index', noCache: false, affix: true}
      },
      {
        path: '/draggableTest',
        name: 'DraggableTest',
        component: () => import('@/view/form/draggableTest.vue'),
        meta: {title: 'draggableTest', icon: 'index', noCache: false, affix: true}
      },
      {
        path: '/draggableT',
        name: 'DraggableT',
        component: () => import('@/view/form/draggableT.vue'),
        meta: {title: 'draggableT', icon: 'index', noCache: false, affix: true}
      },
      {
        path: '/draggable3',
        name: 'Draggable3',
        component: () => import('@/view/form/draggable3.vue'),
        meta: {title: 'draggable3', icon: 'index', noCache: false, affix: true}
      },
      {
        path: '/scroll',
        name: 'ScrollDemo',
        component: () => import('@/components/ScrollDemo/ScrollDemo'),
        meta: {title: 'scroll', icon: 'index', noCache: false, affix: true}
      }]
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/view/features/redirect')
      }
    ]
  },
  {
    path: '*',
    component: () => import('@/view/Exception/404.vue'),
    meta: {title: '页面走失了'},
    hidden: true
  }
]
export const permissionRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: 'ycs',
    children: [
      {
        path: '/HelloWorld',
        name: 'HelloWorld',
        component: () => import('@/view/card/ReserveFlipper'),
        meta: {title: 'Hello', icon: 'index', noCache: false, affix: true}
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('@/view/login'),
        meta: {title: 'login', icon: 'index', noCache: false, affix: true}
      },
      {
        path: '/select',
        name: 'elSelect',
        component: () => import('@/select/elSelectLazy'),
        meta: {title: 'select', icon: 'index', noCache: false, affix: true}
      },
      {
        path: '/form',
        name: 'CreateTest',
        component: () => import('@/components/CreateTest'),
        meta: {title: 'form', icon: 'index', noCache: false, affix: true}
      },
      {
        path: '/draggableTest',
        name: 'DraggableTest',
        component: () => import('@/view/form/draggableTest.vue'),
        meta: {title: 'draggableTest', icon: 'index', noCache: false, affix: true}
      },
      {
        path: '/draggableT',
        name: 'DraggableT',
        component: () => import('@/view/form/draggableT.vue'),
        meta: {title: 'draggableT', icon: 'index', noCache: false, affix: true}
      },
      {
        path: '/draggable3',
        name: 'Draggable3',
        component: () => import('@/view/form/draggable3.vue'),
        meta: {title: 'draggable3', icon: 'index', noCache: false, affix: true}
      },
      {
        path: '/scroll',
        name: 'ScrollDemo',
        component: () => import('@/components/ScrollDemo/ScrollDemo'),
        meta: {title: 'scroll', icon: 'index', noCache: false, affix: true}
      }]
  },
  {
    path: '*',
    component: () => import('@/view/Exception/404.vue'),
    meta: {title: '页面走失了'},
    hidden: true
  }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
