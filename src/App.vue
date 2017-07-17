<template>
  <div id="app">
    <div v-if="isShowLogin">
      <Login/>
    </div>
    <topic-list-page v-else></topic-list-page>
  </div>
</template>

<script>
import TopicListPage from './components/containers/TopicListPage.vue';
import Login from './components/containers/Login.vue'

export default {
  name: 'app',
  components: {
    TopicListPage,
    Login
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
