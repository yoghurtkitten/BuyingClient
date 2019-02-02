import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index.vue'
import UserIndex from '@/components/UserIndex.vue'
import Login from '@/components/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/UserIndex',
      name: 'UserIndex',
      component: UserIndex
    },
    {
      path: '/Login',
      name: "Login",
      component: Login
    }
  ]
})
