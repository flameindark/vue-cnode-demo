// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import moment from 'moment'
import store from './store'
import VueScroller from 'vue-scroller'
import * as filters from './filters'


Vue.use(VueScroller);
Vue.use(Vuex);

//注册filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

//监听router的变化
router.beforeEach(function(to,from,next){
  store.dispatch('router_change',to.path);
  next();
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
