import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import User from '@/views/User'
import Order from '@/views/Order'
import Product from '@/views/Product'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/Home',
      component: Home,
      children: [
        {
          path: '/user',
          component: User
        },
        {
          path: '/order',
          component: Order
        },
        {
          path: '/product',
          component: Product
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
    return
  }
  let token = localStorage.getItem('token')
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
