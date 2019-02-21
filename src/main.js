// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import 'jquery'
import MyHeader from './components/part/MyHeader'
import MyFooter from './components/part/MyFooter'
import '@/assets/css/iconfont.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import ElementUi from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import store from './store/store.js'
Vue.use(ElementUi)

Vue.config.productionTip = false

axios.defaults.withCredentials = true;
Vue.prototype.axios = axios;

/* eslint-disable no-new */
Vue.component('my-header',MyHeader)
Vue.component('my-footer',MyFooter)

Vue.filter('changeGender', function (value) {
  return value ? '先生' : '女士';
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
