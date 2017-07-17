import Vue from 'vue';
import Router from 'vue-router';
import HeaderBar from './components/HeaderBar';

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HeaderBar',
      component: HeaderBar
    }
  ]
})
