import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index.vue'
import UserIndex from '@/components/UserIndex.vue'
import Login from '@/components/Login.vue'
import Shop from '@/components/Shop.vue'
import Order from '@/components/Order.vue'
import Pay from '@/components/Pay.vue'
import UserChoose from '@/components/UserChoose.vue'
import Choose from '@/components/shop_search/Choose.vue'

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
    },
    {
      path: '/UserChoose',
      name: 'UserChoose',
      component: UserChoose,
      children: [
        {
          path: '/UserChoose/Choose',
          component: Choose
        }
      ]
    },
    {
      path: '/Shop',
      name: 'Shop',
      component: Shop
    },
    {
      path: '/Order',
      name: 'Order',
      component: Order
    },
    {
      path: '/Pay',
      name: 'Pay',
      component: Pay,
    }
  ]
})
