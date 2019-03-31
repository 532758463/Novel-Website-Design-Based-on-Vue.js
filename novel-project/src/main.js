// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'


import axios from 'axios'
Vue.prototype.axios = axios
Vue.prototype.url1 ='http://xiaoyang:81/'
axios.defaults.withCredentials=true // 可以允许跨域携带cookie信息
axios.defaults.baseURL = 'http://xiaoyang:81'

Vue.config.productionTip = false
Vue.use(iView)

router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
