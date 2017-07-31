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
import Login from './views/Login.vue'
import MenuBar from './components/MenuBar.vue'
import HeaderBar from './components/HeaderBar.vue'

export default {
  name: 'app',
  components: {
    Login,
    MenuBar,
    HeaderBar
  },
  created () {
    this.checkLogin()
  },
  computed: {
    isLogin: function () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    checkLogin () {
      let accessToken = localStorage.getItem('accessToken')
      if (!accessToken === 'null' || accessToken) {
        this.$store.dispatch('login', accessToken)
      }
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
