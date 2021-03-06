import Vue from 'vue'
import App from './App.vue'

import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import store from './vuex/index.js'

Vue.use(iView);

/* 删除loading.gif */
document.getElementById("loading").setAttribute("style","display:none")

new Vue({
  el: '#app',
  router,
  store,
  template:'<App/>',
  components:{ App }
})
