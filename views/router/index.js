import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/Index.vue'
import PageRoute from './pageRoute.js'

export default new Router({
  routes: [
    {
      path: '/*',
      component: Index,
      children: PageRoute
    }
  ]
})
