<template>
  <div class="user-wrap" v-if="userInfo">
    <div class="user-info-wrap">
      <div class="avatar-wrap">
        <img :src="userInfo.avatar_url" alt="" class="big-avatar">
      </div>
      <div class="user-head-title">
        <div class="user-head-name" v-text="userInfo.loginname"></div>
        <div class="user-head-link">
          <a :href="`https://github.com/${userInfo.githubUsername}`">{{userInfo.githubUsername}}@github.com</a>
        </div>
      </div>
      <div class="user-head-intro">
        注册时间：{{userInfo.create_at | transformDateFromNow}}
        <span>积分：{{userInfo.score}}</span>
      </div>
    </div>
    <tab>
      <tab-item selected @click.native="onSwitchTab(0)">最近回复</tab-item>
      <tab-item @click.native="onSwitchTab(1)">最新发布</tab-item>
    </tab>
    <div class="user-topiclist-wrap">
      <div v-for="(item,index) in currentList" :key="index" >
        <router-link :to="`/topic/${item.id}`">
          <div class="topic-item">
            <div class="avatar">
              <img :src="item.author.avatar_url" alt="headImgUrl">
            </div>
            <div class="topic-info">
              <div class="topic-title">
                <p v-text="item.title"></p>
              </div>
              <div class="topic-info-right">
                <p>
                  <span>{{item.author.loginname}}--</span>
                  <span>{{item.last_reply_at | transformDateFromNow}}</span>
                </p>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { Tab, TabItem } from 'vux'
export default{
  data () {
    return {
      currTab: 0,
      currentList: [],
      userInfo: this.$store.getters.loginInfoDetail
    }
  },
  created () {
    console.log(this.$store.getters)
    if (this.$store.getters.loginInfoDetail) {
      return
    } else {
      this.$vux.toast.show({
        text: '请登录',
        type: 'warn'
      })
      this.$router.push('/login')
    }
  },
  components: {
    Tab,
    TabItem
  },
  methods: {
    onLogout () {
      localStorage.setItem('accessToken', null)
      this.$store.commit('SET_LOGININFO', {
        avatarUrl: '',
        id: '',
        loginname: '',
        accessToken: null
      })
      this.$router.push('/login')
    },
    onSwitchTab (tab) {
      this.currTab = tab
      this.onFetchUser(this.userInfo.loginname)
    },
    onFetchUser (id) {
      this.axios.get(`https://cnodejs.org/api/v1/user/${id}`)
      .then(result => {
        this.currentList = this.currTab === 0 ? result.data.data.recent_replies : result.data.data.recent_topics
      })
      .catch(e => {
        console.log(e)
        this.$vux.toast.show({
          text: '获取数据失败',
          type: 'warn'
        })
      })
    }
  },
  computed: {
    isShowBtnLogout: function () {
      return this.$store.getters.loginInfo.loginname === this.userInfo.loginname
    }
  }
}
</script>
<style lang="less">
	.user-wrap {
    overflow-y: scroll;
    position: absolute;
    width: 100%;
    box-sizing: border-box;
    top: 40px;
    bottom: 40px;

    //头部账户信息部分  
    .user-info-wrap {
      margin: 0 auto;
      padding: 20px 0;
      text-align: center;
      background-color: #4FE4FF;

      .big-avatar {
        border-radius: 50%;
        margin: 0 auto;
        background-color: #fff;
      }
    }
    
    //帖子列表区
    .user-topiclist-wrap {
      .topic-item {
        border-bottom: 1px solid #eee;
        padding: 10px 20px;

        .avatar {
          float: left;
        }

        .topic-info {
          padding-left: 20px;
          float: left;
          color: #222;

          .topic-title {
            font-size: 16px;
            color: #000;
            font-weight: 600;
          }
          
        }
        
        &::after,&::before {
          content: '';
          display: table;
          clear: both;
        }
      }
    }
  }
</style>
