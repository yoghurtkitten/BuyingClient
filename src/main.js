// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import 'jquery'
import MyHeader from './components/part/MyHeader'
import '@/assets/css/iconfont.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

Vue.config.productionTip = false

axios.defaults.withCredentials = true;
Vue.prototype.axios = axios;

/* eslint-disable no-new */
Vue.component('my-header',MyHeader)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
