<template>
  <div>
    <div class="login-wrap">
      <h3 class="login-title">
        登录CNode社区
      </h3>
      <group>
        <x-input title='AccessToken' v-model="accessToken" placeholder="请输入AcessToken"></x-input>
      </group>
      <flexbox style="margin-top: 20px" @click="onLogin">
        <flexbox-item>
          <router-link to="/">
            <x-button type="default">随便逛逛</x-button>
          </router-link>
        </flexbox-item>
        <flexbox-item>
          <x-button type="primary" @click.native="onLogin">立即登录</x-button>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>
<script>
import { XButton, XInput, Flexbox, Group, FlexboxItem } from 'vux'
export default{
  data () {
    return {
      accessToken: ''
    }
  },
  components: {
    XButton,
    XInput,
    Flexbox,
    Group,
    FlexboxItem
  },
  methods: {
    onLogin () {
      let accessToken = this.accessToken
      this.$store.dispatch('login', accessToken)
      if (this.$store.getters.loginInfo) {
        this.$vux.toast.show({
          text: '登录成功'
        })
        this.$router.push('/')
      } else {
        this.$vux.toast.show({
          text: '登录失败',
          type: 'warn'
        })
      }
    },
    setLoginInfoDetail (loginname) {
      this.axios.get('https://cnodejs.org/api/v1/user/' + loginname)
      .then(result => {
        this.$store.commit('SET_LOGIN_INFO', result.data.data)
      })
    }
  }
}
</script>
<style lang="less">
  .login-wrap {
    height: 100%;
    width: 80%;
    margin: 10px auto;
    .login-title {
      text-align: center;
    }
  }
</style>
