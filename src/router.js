import Vue from 'vue';
import Router from 'vue-router';
import TopicList from './components/TopicList';
import NewTopic from './components/NewTopic';
import Message from './components/Message';
import Account from './components/Account';
import TopicDetail from './components/containers/TopicDetail';

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: TopicList
    },
    {
      path: '/newTopic',
      name: 'newTopic',
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
      name: 'TopicDetail',
      component: TopicDetail
    }
  ]
})
