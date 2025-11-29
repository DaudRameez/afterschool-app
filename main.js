import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'   // import Vuex store

Vue.config.productionTip = false

new Vue({
  router,
  store,          // register store
  render: h => h(App)
}).$mount('#app')
