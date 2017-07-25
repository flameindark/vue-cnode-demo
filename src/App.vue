<template>
  <div id="app">
    <div v-if="isLogin">
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
import Login from './views/Login.vue';
import MenuBar from './components/MenuBar.vue';
import HeaderBar from './components/HeaderBar.vue';

export default {
  name: 'app',
  components: {
    Login,
    MenuBar,
    HeaderBar
  },
  computed: {
    isLogin: function() {
      return this.$store.state.isLogin;
    }
  }
}
</script>
<style lang="less">
@import '~vux/src/styles/reset.less';
@import './assets/style/github-markdown.css';

html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
}

::-webkit-scrollbar {
    display: none;
}
</style>
