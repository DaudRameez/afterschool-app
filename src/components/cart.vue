<template>
  <section class="cart-section">
    <h2>Your Cart</h2>

    <div v-if="cart.length === 0" class="empty">
      <p>Your cart is empty.</p>
      <router-link to="/">← Back to Lessons</router-link>
      
    </div>

    <div v-else class="cart-content">
      <div class="cart-items">
        <div v-for="item in cart" :key="item.id" class="cart-item">
          <div>
            <h3>{{ item.title }}</h3>
            <p><strong>Location:</strong> {{ item.location }}</p>
            <p><strong>Price:</strong> AED {{ item.price }}</p>
          </div>
          <div class="item-actions">
            <button @click="remove(item.id)">Remove</button>
          </div>
        </div>
      </div>

      <div class="checkout">
        <h3>Checkout</h3>

        <form @submit.prevent="onSubmit" novalidate>
          <div class="field">
            <label for="name">Name</label>
            <input id="name" v-model="name" @input="validateName" />
            <small v-if="nameError" class="error">{{ nameError }}</small>
          </div>

          <div class="field">
            <label for="phone">Phone</label>
            <input id="phone" v-model="phone" @input="validatePhone" />
            <small v-if="phoneError" class="error">{{ phoneError }}</small>
          </div>

          <button :disabled="!canCheckout" type="submit" class="checkout-btn">
            Checkout
          </button>
        </form>

        <div v-if="confirmed" class="confirmation">
          <p>✅ Order submitted! Thank you, {{ name }}.</p>
          <button @click="clearConfirmed">Close</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { inject, ref, computed } from 'vue'

const cart = inject('cart')
const removeFromCart = inject('removeFromCart')

// form state
const name = ref('')
const phone = ref('')
const nameError = ref('')
const phoneError = ref('')
const confirmed = ref(false)

function validateName() {
  if (!name.value.trim()) {
    nameError.value = 'Name is required'
    return false
  }
  const re = /^[A-Za-z\s]+$/
  nameError.value = re.test(name.value) ? '' : 'Letters only'
  return nameError.value === ''
}

function validatePhone() {
  if (!phone.value.trim()) {
    phoneError.value = 'Phone is required'
    return false
  }
  const re = /^[0-9]+$/
  phoneError.value = re.test(phone.value) ? '' : 'Numbers only'
  return phoneError.value === ''
}

const canCheckout = computed(() => {
  return cart.length > 0 && validateName() && validatePhone()
})

function remove(id) {
  removeFromCart(id)
}

function onSubmit() {
  // final validation (already checked by canCheckout)
  if (!canCheckout.value) return
  // For now front-end only: show confirmation and clear cart (optional)
  confirmed.value = true
  // clear cart (since we don't persist to backend)
  cart.splice(0, cart.length)
  name.value = ''
  phone.value = ''
}

function clearConfirmed() {
  confirmed.value = false
}
</script>

<style scoped>
.cart-section {
  width: 90%;
  max-width: 1000px;
  margin: 20px auto 120px;
}

.empty {
  text-align: center;
  padding: 30px;
}

.cart-content {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 24px;
  align-items: start;
}

/* items */
.cart-item {
  background: white;
  padding: 12px 16px;
  border-radius: 10px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:10px;
}

/* checkout */
.checkout {
  background: white;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.06);
}

.field {
  margin-bottom: 12px;
  text-align: left;
}

.field label {
  display:block;
  margin-bottom:6px;
  font-weight:600;
}

.field input {
  width:100%;
  padding:8px 10px;
  border-radius:8px;
  border:1px solid #ddd;
}

.error {
  color: #d9534f;
  font-size: 0.85rem;
}

.checkout-btn {
  background: #2c3e50;
  color: white;
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.checkout-btn[disabled] {
  opacity: 0.6;
  cursor: default;
}

/* confirmation */
.confirmation {
  margin-top: 12px;
  background: #e6ffed;
  border: 1px solid #b7f2c6;
  padding: 12px;
  border-radius: 8px;
}
</style>
