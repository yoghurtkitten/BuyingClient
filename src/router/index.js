import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index.vue'
import UserIndex from '@/components/UserIndex.vue'
import Login from '@/components/Login.vue'
import Shop from '@/components/Shop.vue'
import Order from '@/components/Order.vue'
import Pay from '@/components/Pay.vue'
import UserCenter from '@/components/UserCenter.vue'
import Center from '@/components/center_part/Center.vue'
import OrderPart from '@/components/center_part/Order.vue'
import OrderDetail from '@/components/center_part/OrderDetail.vue'
import Address from '@/components/center_part/Address.vue'
import UserInfo from '@/components/center_part/UserInfo.vue'
import Save from '@/components/center_part/Save.vue'
import PayMent from '@/components/PayMent.vue'
import UserChoose from '@/components/UserChoose.vue'
import Choose from '@/components/shop_search/Choose.vue'
import BusiLogin from '@/components/business/Login.vue'
import Register from '@/components/business/Register.vue'
import AppliFrom from '@/components/business/AppliFrom.vue'

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
    },
    {
      path: '/PayMent',
      name: 'PayMent',
      component: PayMent
    },
    {
      path: '/UserCenter',
      name: 'UserCenter',
      component: UserCenter,
      children: [
        {
          path: '/UserCenter/Center',
          name: 'Center',
          component: Center
        },
        {
          path: '/UserCenter/Order',
          name: 'OrderPart',
          component: OrderPart
        },
        {
          path: '/UserCenter/OrderDetail',
          name:'OrderDetail',
          component: OrderDetail
        },
        {
          path: '/UserCenter/Address',
          name: 'Address',
          component: Address
        },
        {
          path: '/UserCenter/UserInfo',
          name: 'UserInfo',
          component: UserInfo
        },
        {
          path: '/UserCenter/Save',
          name: 'Save',
          component: Save
        }
      ]
    },
    {
      path:'/Business',
      name:'BusiLogin',
      component: BusiLogin
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/AppliFrom',
      name: 'AppliFrom',
      component: AppliFrom
    }
  ]
})
