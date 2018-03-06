import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './Index.vue'
import Routers from './router'
import Router from 'vue-router'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)
Vue.use(Router)

new Vue({
  el: '#app',
  render: h => h(App),
  router: Routers
})
console.log('test');
