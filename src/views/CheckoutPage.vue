<template>
  <div class="checkout-page">
    <h2>Checkout</h2>

    <!-- Empty Cart Message -->
    <p v-if="cart.length === 0" class="empty-text">
      Your cart is empty.
    </p>

    <!-- Cart Items -->
    <div v-else class="cart-container">
      <div class="cart-item" v-for="item in cart" :key="item.id">
        <div class="item-details">
          <h3 class="item-title">{{ item.title }}</h3>
          <p class="item-subject"><strong>Subject:</strong> {{ item.subject }}</p>
          <p class="item-location"><strong>Location:</strong> {{ item.location }}</p>
          <p class="item-price"><strong>Price:</strong> AED {{ item.price }}</p>
        </div>
      </div>

      <!-- Total Price -->
      <div class="total-price">
        <strong>Total:</strong> AED {{ totalPrice }}
      </div>
    </div>

    <!-- Customer Details Form -->
    <div v-if="cart.length" class="customer-form">
      <h3>Customer Details</h3>
      <input v-model="name" type="text" placeholder="Full Name" />
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="phone" type="text" placeholder="Phone Number" />
      <p v-if="error" class="error-text">{{ error }}</p>

      <button @click="placeOrder" :disabled="loading">
        {{ loading ? "Placing Order..." : "Place Order" }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['cart', 'clearCart'],
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      loading: false,
      error: ''
    }
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((sum, item) => sum + Number(item.price), 0)
    }
  },
  methods: {
    async placeOrder() {
      if (!this.name || !this.email || !this.phone) {
        this.error = "Please fill in all details"
        return
      }

      const orderData = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        items: this.cart
      }

      try {
        this.loading = true
          const API_BASE = location.hostname === "localhost"
      ? "http://localhost:3000"
       : "https://afterschool-app-backend.onrender.com";

        const res = await fetch('${API_BASE}/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData)
        })

        const data = await res.json()
        if (res.ok) {
          this.clearCart()
          this.$router.push({ name: 'OrderSuccess', params: { orderId: data.orderId } })
        } else {
          this.error = data.error || 'Failed to place order'
        }
      } catch (err) {
        console.error(err)
        this.error = 'Failed to place order'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.checkout-page {
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.empty-text {
  text-align: center;
  font-size: 18px;
  opacity: 0.7;
}

.cart-container {
  margin-bottom: 20px;
}

.cart-item {
  padding: 15px;
  margin-bottom: 12px;
  border-radius: 12px;
  background: #f2f2f2;
  box-shadow: 0 4px 8px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
}

.item-title {
  font-size: 20px;
  margin-bottom: 5px;
  color: #285430;
}

.item-details p {
  margin: 2px 0;
}

.total-price {
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
  text-align: right;
  color: #5F8D4E;
}

.customer-form {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.customer-form input {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.customer-form button {
  padding: 12px;
  background: #5F8D4E;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
}

.customer-form button:hover {
  background: #4e783e;
}

.error-text {
  color: red;
  font-size: 14px;
}
</style>
