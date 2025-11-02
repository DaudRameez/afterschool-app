import { reactive, watch } from 'vue'

const cartState = reactive({
  items: JSON.parse(localStorage.getItem('cartItems') || '[]')
})

// Keep localStorage in sync automatically
watch(
  () => cartState.items,
  (newVal) => {
    localStorage.setItem('cartItems', JSON.stringify(newVal))
  },
  { deep: true }
)

export function useCart() {
  return cartState
}
