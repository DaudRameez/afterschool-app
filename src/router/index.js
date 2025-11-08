import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/Home.vue'
import CartPage from '../views/CartPage.vue'
import CheckoutPage from '../views/CheckouPage.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/cart', name: 'Cart', component: CartPage },
  { path: '/checkout', name: 'Checkout', component: CheckoutPage }
]

const router = createRouter({
  history: createWebHistory(
    process.env.NODE_ENV === 'production' ? '/afterschool-app/' : '/'
  ),
  routes
})

export default router
