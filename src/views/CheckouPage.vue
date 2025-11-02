<template>
  <div class="checkout-page">
    <h2>Checkout</h2>

    <div v-if="cartState.cart.length === 0">
      <p>Your cart is empty. Please add some lessons first.</p>
    </div>

    <div v-else>
      <ul class="cart-items">
        <li v-for="item in cartState.cart" :key="item.id">
          {{ item.title }} - AED {{ item.price }}
        </li>
      </ul>

      <form @submit.prevent="submitOrder" class="checkout-form">
        <div>
          <label for="name">Name:</label>
          <input
            id="name"
            v-model="name"
            type="text"
            placeholder="Enter your name"
            required
          />
        </div>

        <div>
          <label for="phone">Phone:</label>
          <input
            id="phone"
            v-model="phone"
            type="text"
            placeholder="Enter your phone"
            required
          />
        </div>

        <button type="submit" :disabled="!validForm">Submit Order</button>
      </form>

      <p v-if="successMessage" class="success-msg">{{ successMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, computed } from 'vue'

// Inject cart state
const cartState = inject('cartState')

// Form fields
const name = ref('')
const phone = ref('')
const successMessage = ref('')

// Validation
const validForm = computed(() => {
  const nameValid = /^[A-Za-z\s]+$/.test(name.value)
  const phoneValid = /^[0-9]+$/.test(phone.value)
  return nameValid && phoneValid && cartState.cart.length > 0
})

// Submit order
function submitOrder() {
  if (!validForm.value) return

  // Normally, here you would send to backend
  // For now, we just show a success message
  successMessage.value = `Thank you ${name.value}! Your order for ${cartState.cart.length} lessons has been submitted.`

  // Clear cart
  cartState.cart.splice(0)
  name.value = ''
  phone.value = ''
}
</script>

<style scoped>
.checkout-page {
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
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
}

.checkout-form div {
  margin-bottom: 12px;
}

label {
  display: block;
  margin-bottom: 4px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

button[type="submit"] {
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  background: #42b883;
  color: white;
  cursor: pointer;
}

button[type="submit"]:disabled {
  background: #aaa;
  cursor: default;
}

.success-msg {
  margin-top: 20px;
  color: #2c3e50;
  font-weight: bold;
}
</style>
