<template>
  <div class="cart-page">
    <h2>Your Cart</h2>

    <ul v-if="cartState.cart.length" class="cart-items">
      <li v-for="item in cartState.cart" :key="item.id">
        <div class="cart-item-info">
          <span>{{ item.title }}</span>
          <span>AED {{ item.price }}</span>
        </div>
        <button class="remove-btn" @click="removeFromCart(item.id)">Remove</button>
      </li>
    </ul>

    <p v-else>Your cart is empty.</p>

    <button
      v-if="cartState.cart.length"
      class="checkout-btn"
      @click="goToCheckout"
    >
      Checkout
    </button>
  </div>
</template>

<script setup>
import { inject } from 'vue'
import { useRouter } from 'vue-router'

// Inject cart state and functions from App.vue
const cartState = inject('cartState')
const removeFromCart = inject('removeFromCart')

// Router to navigate to checkout
const router = useRouter()
function goToCheckout() {
  router.push({ name: 'Checkout' })
}
</script>

<style scoped>
.cart-page {
  width: 90%;
  max-width: 500px;
  margin: 20px auto 100px;
}

.cart-items {
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
}

.cart-items li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
}

.cart-item-info span {
  display: inline-block;
  margin-right: 12px;
}

.remove-btn {
  padding: 6px 10px;
  border-radius: 6px;
  background: #ff3b30;
  color: white;
  border: none;
  cursor: pointer;
}

.remove-btn:hover {
  background: #e02a1a;
}

.checkout-btn {
  padding: 10px 15px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.checkout-btn:hover {
  background: #2c3e50;
}
</style>
