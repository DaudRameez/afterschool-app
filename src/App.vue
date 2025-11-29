<template>
  <div id="app">
    <header>
      <h1>After School Activities</h1>
      <p>Learn with fun and creativity!</p>
    </header>

    <main>
      <router-view />
    </main>

    <!-- Floating cart button -->
    <button
      v-if="cart.length > 0"
      class="fab-cart"
      @click="goToCart"
      :title="`Open cart (${cart.length})`"
    >
      <i class="fa fa-shopping-cart fa-lg"></i>
      <span class="badge">{{ cart.length }}</span>
    </button>

    <footer>
      <p>Created by Daud</p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: []
    }
  },
  methods: {
    addToCart(item) {
      if (!this.cart.find(i => i.id === item.id)) {
        this.cart.push({ ...item })
      }
    },
    removeFromCart(id) {
      const index = this.cart.findIndex(i => i.id === id)
      if (index !== -1) this.cart.splice(index, 1)
    },
    goToCart() {
      this.$router.push({ name: 'Cart' })
    },
    clearCart() {
      this.cart = []
    }
  },
  provide() {
    return {
      cart: this.cart,
      addToCart: this.addToCart,
      removeFromCart: this.removeFromCart,
      clearCart: this.clearCart,
      goToCart: this.goToCart
    }
  }
}
</script>

<style scoped>
header {
  background: linear-gradient(135deg, #42b883, #2c3e50);
  padding: 20px;
  color: white;
}

main {
  min-height: calc(100vh - 170px);
}

/* Floating FAB */
.fab-cart {
  position: fixed;
  right: 20px;
  bottom: 28px;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #42b883, #2c3e50);
  color: #fff;
  border: none;
  box-shadow: 0 6px 18px rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
}

.fab-cart .badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background: #ff3b30;
  color: white;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size: 0.8rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}

footer {
  background: #2c3e50;
  color: white;
  padding: 10px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
}
</style>
