import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: []
  },
  mutations: {
    ADD_TO_CART(state, lesson) {
      if (!state.cart.find(item => item.id === lesson.id)) {
        state.cart.push(lesson)
      }
    },
    REMOVE_FROM_CART(state, id) {
      state.cart = state.cart.filter(item => item.id !== id)
    },
    CLEAR_CART(state) {
      state.cart = []
    }
  },
  actions: {
    addToCart({ commit }, lesson) {
      commit('ADD_TO_CART', lesson)
    },
    removeFromCart({ commit }, id) {
      commit('REMOVE_FROM_CART', id)
    },
    clearCart({ commit }) {
      commit('CLEAR_CART')
    }
  },
  getters: {
    cart: state => state.cart
  }
})
