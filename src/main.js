// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store'
import VueScroller from 'vue-scroller'
import * as filters from './filters'
import { ToastPlugin } from 'vux'
import vuexI18n from 'vuex-i18n'

// I18n setting
Vue.use(vuexI18n.plugin, store)

Vue.use(VueScroller)
Vue.use(Vuex)

// use Toast Plugin
Vue.use(ToastPlugin)

// 注册filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

// 监听router的变化
router.beforeEach(function (to, from, next) {
  store.dispatch('router_change', to.path)
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app-box',
  router,
  store,
  template: '<App/>',
  components: { App }
})
