<template>
  	<tab>
      <tab-item v-for="category in categories" @click="alert(1)">{{category.name}}</tab-item>
    </tab>
</template>

<script>
import { Tab , TabItem  } from 'vux';
import Bscroll from 'better-scroll';
export default {
  name: 'TopTab',
  components: {
    Tab,
    TabItem
  },
  data () {
      const categories = [
      	{name: '全部',key: 'all' ,queryData:''},
      	{name: '精华',key: 'good',queryData:'good'}, 
      	{name: '分享',key: 'share',queryData:'share' }, 
      	{name: '招聘',key: 'job',queryData:'job' }, 
      	{name: '问答',key: 'ask',queryData:'ask' }
      ]
      return { categories: categories }
  },
  methods: {
    changeTab(queryData){
      alert(1);
      this.$store.commit('updateCurrentTab',queryData);
    }
  }
}
</script>