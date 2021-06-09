// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import draggable from 'vuedraggable'
import formCreate from "@form-create/element-ui"
import './assets/css/index.scss'
import 'element-ui/lib/theme-chalk/index.css'

//表示配置MOCK为true的时候，才引入mock，所以生产环境的时候就不引入mock了
process.env.MOCK && require('@/api/mock')

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(formCreate);
Vue.use(draggable);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
