<template>
  <div id="app">
    <div v-if="isShowLogin">
      <Login/>
    </div>
    <div v-else>
      <HeaderBar/>
      <router-view></router-view>
      <MenuBar/>
    </div>
  </div>
</template>

<script>
import Login from './components/containers/Login.vue';
import MenuBar from './components/common/MenuBar.vue';
import HeaderBar from './components/common/HeaderBar.vue';

export default {
  name: 'app',
  components: {
    Login,
    MenuBar,
    HeaderBar
  },
  computed: {
    isShowLogin: function() {
      return this.$store.state.isShowLogin;
    }
  }
}
</script>
<style lang="less">
@import '~vux/src/styles/reset.less';
</style>
