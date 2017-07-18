<template>
	<tabbar :class="['bottom-menu']">
      <tabbar-item  badge="2" link="/">
        <img slot="icon" src="../../assets/icons/icon_nav_cell.png" >
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item  badge="2" link="/newTopic">
        <img slot="icon" src="../../assets/icons/icon-new.svg" >
        <span slot="label">发表</span>
      </tabbar-item>
      <tabbar-item  badge="2" link="/message">
        <img slot="icon" src="../../assets/icons/icon-msg-blue.svg" >
        <span slot="label">消息</span>
      </tabbar-item>
      
      <tabbar-item  badge="2" link="/account">
        <img slot="icon" src="../../assets/icons/icon-info.svg" >
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
  methods: {
  }
}
</script>