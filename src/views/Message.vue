<template>
	<div class="message-wrap">
		<tab>
	      <tab-item selected @click.native="onSwitchTab(0)">未读消息</tab-item>
	      <tab-item @click.native="onSwitchTab(1)">已读消息</tab-item>
	    </tab>
	    <div class="message-list" >
	    	<div v-for="i in currentMessageList" :key="i.id">
					<router-link :to="`/topic/${i.topic.id}`">
		        <div class="topic-item">
		            <div class="avatar">
		              <img :src="i.author.avatar_url" alt="headImgUrl">
		            </div>
		            <div class="topic-info">
		              <div class="topic-title">
		                <p v-text="i.topic.title"></p>
		              </div>
		              <div class="topic-info-right">
		                <p>
		                  <span>{{i.author.loginname}}--</span>
		                  <span>{{i.topic.last_reply_at | transformDateFromNow}}</span>
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
  name: 'Message',
  components: {
    Tab,
    TabItem
  },
  data () {
    return {
      messageList: null,
      currentMessageList: null
    }
  },
  created () {
    this.fetchMessageData()
  },
  methods: {
    onSwitchTab (type) {
      switch (type) {
        case 0 :
          this.currentMessageList = this.messageList.hasnot_read_messages
          break
        case 1 :
          this.currentMessageList = this.messageList.has_read_messages
      }
    },
    fetchMessageData () {
      if (this.$store.getters.loginInfo) {
        this.axios.get(`https://cnodejs.org/api/v1/messages?accesstoken=${this.$store.getters.loginInfo.accessToken}`)
        .then(result => {
          this.messageList = result.data.data
          this.currentMessageList = result.data.data.hasnot_read_messages
        })
        .catch(e => {
          this.$vux.toast.show({
            text: '获取消息列表失败',
            type: 'warn'
          })
        })
      } else {
        this.$vux.toast.show({
          text: '请先登录',
          type: 'warn'
        })
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="less">
	.message-wrap {
	    overflow-y: scroll;
	    position: absolute;
	    width: 100%;
	    box-sizing: border-box;
	    top: 40px;
	    bottom: 60px;

	    // 帖子列表区
	    .message-list {
		    .topic-item {
		        border-bottom: 1px solid #eee;
		        padding: 10px 20px;

		        .avatar {
		          float: left;

		          img {
		          	width: 40px;
		          	height: 40px;
		          }
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
