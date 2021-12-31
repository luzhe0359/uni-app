
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import HTTP from './utils/request.js'
import showMsg from './utils/msg.js'

Vue.config.productionTip = false
uni.$http = HTTP
uni.$msg = showMsg

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif