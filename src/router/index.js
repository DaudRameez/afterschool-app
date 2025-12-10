// router.js
import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../views/Home.vue'
import CartPage from '../views/CartPage.vue'
import CheckoutPage from '../views/CheckoutPage.vue'
import OrderSuccessPage from '../views/OrderSuccess.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.NODE_ENV === 'production' ? '/afterschool-app/' : '/',
  routes: [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/cart', name: 'Cart', component: CartPage },
    { path: '/checkout', name: 'Checkout', component: CheckoutPage },
    { path: '/order-success/:orderId', name: 'OrderSuccess', component: OrderSuccessPage, props: true}

  ]
})
