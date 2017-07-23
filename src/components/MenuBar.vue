<template>
	<tabbar :class="['bottom-menu']">
      <tabbar-item link="/" :selected="this.$store.getters.currentRouter === '/'">
        <img slot="icon"  src="../assets/icons/icon_nav_cell.png" >
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item  :selected="this.$store.getters.currentRouter === '/publish'" link="/publish">
        <img slot="icon" src="../assets/icons/icon-new.svg" >
        <span slot="label">发表</span>
      </tabbar-item>
      <tabbar-item  :selected="this.$store.getters.currentRouter === '/message'" :badge="message_num" link="/message">
        <img slot="icon" src="../assets/icons/icon-msg-blue.svg" >
        <span slot="label">消息</span>
      </tabbar-item>
      
      <tabbar-item :selected="this.$store.getters.currentRouter === '/account'"  link="/account">
        <img slot="icon" src="../assets/icons/icon-info.svg" >
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux';

export default {
  name: 'MenuBar',
  components: {
    Tabbar,
    TabbarItem
  },
  computed: {
    message_num(){
      return this.$store.getters.loginInfo.message_num === 0 ?  '' : this.$store.getters.loginInfo.message_num + ''
    }
  }
}
</script>