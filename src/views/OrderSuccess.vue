<template>
  <div class="order-success">
    <h2>Order Successful!</h2>
    <p>Thank you for your order.</p>
    <p><strong>Order Number:</strong> {{ orderId }}</p>

    <h3>Order Details:</h3>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.title }} - AED {{ item.price }}
      </li>
    </ul>

    <router-link to="/">Back to Home</router-link>
  </div>
</template>

<script>
export default {
  props: ['orderId'],
  data() {
    return {
      items: []
    }
  },
  async created() {
    try {
      // Fetch the order to display items (optional)
      const API_BASE = location.hostname === "localhost"
      ? "http://localhost:3000"
       : "https://afterschool-app-backend.onrender.com";
      const res = await fetch(`${API_BASE}/api/orders/${this.orderId}`)
      const data = await res.json()
      this.items = data.items || []
    } catch (err) {
      console.error(err)
    }
  }
}
</script>

<style scoped>
.order-success {
  max-width: 600px;
  margin: 50px auto;
  text-align: center;
}

.order-success ul {
  list-style: none;
  padding: 0;
}

.order-success li {
  padding: 6px 0;
}
</style>
