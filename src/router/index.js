import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: () => import('@/components/Preview/pdfTwo')
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
    },
    {
      path: '/draggableTest',
      name: 'DraggableTest',
      component: () => import('@/view/form/draggableTest.vue'),
    },
    {
      path: '/draggableT',
      name: 'DraggableT',
      component: () => import('@/view/form/draggableT.vue'),
    },
    {
      path: '/draggable3',
      name: 'Draggable3',
      component: () => import('@/view/form/draggable3.vue'),
    }

    // {path:'*',redirect: '404'}
  ]
})
