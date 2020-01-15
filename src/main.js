import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
// import axiosHttp from './httpConfig/axios'

Vue.config.productionTip = false
Vue.use(ElementUI)
// Vue.prototype.$axios = axiosHttp

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
