import Vue from 'vue'
import Router from 'vue-router'
import TopicList from './views/TopicList'
import NewTopic from './views/NewTopic'
import Message from './views/Message'
import Account from './views/Account'
import TopicDetail from './views/TopicDetail'
import Login from './views/Login'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: TopicList
    },
    {
      path: '/publish',
      name: 'publish',
      component: NewTopic
    },
    {
      path: '/message',
      name: 'message',
      component: Message
    },
    {
      path: '/account',
      name: 'account',
      component: Account
    },
    {
      path: '/topic/:id',
      name: 'topic',
      component: TopicDetail
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/user/:loginname',
      name: 'user',
      component: Account
    }
  ]
})

export default router
