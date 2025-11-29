<template>
  <div class="cart-page">
    <h2 class="page-title">Your Cart</h2>

    <p v-if="cart.length === 0" class="empty-text">
      Your Cart Is Empty.
    </p>

    <div v-else class="cart-container">
      <div class="cart-item" v-for="item in cart" :key="item.id">
        <div class="item-details">
          <h3 class="item-title">{{ item.title }}</h3>
          <p class="item-desc">{{ item.description }}</p>

          <p class="item-price">Subject: {{ item.subject }}</p>
          <p class="item-price">Location: {{ item.location }}</p>
          <p class="item-price">Price: AED {{ item.price }}</p>

          <button class="remove-btn" @click="remove(item.id)">
            Remove
          </button>
        </div>
      </div>

      <!-- Total Price Section -->
      <div class="total-box">
        <h3>Total Price:</h3>
        <p class="total-amount">AED {{ totalPrice }}</p>
      </div>

      <button class="checkout-btn" @click="$router.push({ name: 'Checkout' })">
        Proceed To Checkout
      </button>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['cart', 'removeFromCart'],

  computed: {
    cart() {
      return this.cart
    },

    /* Calculate total price */
    totalPrice() {
      if (!this.cart) return 0;
      return this.cart.reduce((sum, item) => sum + Number(item.price), 0);
    }
  },

  methods: {
    remove(id) {
      this.removeFromCart(id);
    }
  }
};
</script>

<style scoped>
.cart-page {
  max-width: 900px;
  margin: auto;
  padding: 20px;

  /* Prevent footer overlap */
  padding-bottom: 150px;
}

.page-title {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.empty-text {
  text-align: center;
  font-size: 18px;
  opacity: 0.7;
}

.cart-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cart-item {
  display: flex;
  gap: 20px;
  padding: 18px;
  border-radius: 12px;
  background: #f2f2f2;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  align-items: center;
}

.item-details {
  flex: 1;
}

.item-title {
  font-size: 20px;
  margin: 0;
  color: #333;
}

.item-desc {
  opacity: 0.8;
  margin: 5px 0 10px;
}

.item-price {
  font-weight: bold;
  color: #285430;
  margin: 2px 0;
}

.remove-btn {
  background: #8f8f8f;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}
.remove-btn:hover {
  background: #7a7a7a;
}

/* Total Price Section */
.total-box {
  background: #fff;
  padding: 18px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-amount {
  font-size: 22px;
  font-weight: bold;
  color: #285430;
}

.checkout-btn {
  margin-top: 20px;
  padding: 14px 20px;
  background: #5F8D4E;
  border: none;
  border-radius: 10px;
  color: white;
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
}

.checkout-btn:hover {
  background: #4e783e;
}
</style>
