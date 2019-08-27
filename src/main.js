// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import config from './config'
import MyComponent from './components/MyComponent'
import './http';
import 'vuetify/dist/vuetify.min.css'
import qs from 'qs'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/material.css'

Vue.use(Vuetify, { theme: config.theme})
Vue.use(MyComponent)
Vue.prototype.$qs = qs;

Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
  el: '#app',/*新建Vue对象，并且关联id为app的元素，即index.html中定义的div*/
  router,    /*router目录下的index.js,定义了路由配置*/
  components: { App },  /*导入App组件，并在模板中使用，将来会映入到div#app的内部*/
  template: '<App/>'
})
