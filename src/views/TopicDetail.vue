<template>
  <div class="wrap">
  	<div v-if="topic">
  		<div class="topic-intro">
  			<h4 class="head-title" v-text="topic.title"></h4>
  			<div class="head-info">
  				<div class="avatar">
  		      <img :src="topic.author.avatar_url" alt="headImgUrl">
  		    </div>
  		    <div class="info-detail">
  		      <Badge :text="topic.tab|transformTab(topic.top,topic.good)"/>
  		      <span class="author-name">{{topic.author.loginname}}</span>
  		      <p><span>{{topic.create_at|transformDateFromNow}}</span>创建·<span>{{topic.visit_count}}</span>次预览</p>
  		    </div>
          <div class="collect-topic"> 
            <div :class="{iscollect:topic.is_collect,collect:true}" @click="onLikeTopic">收藏</div>
          </div>
  			</div>
  		</div>
  		<div class="content">
  	  		<div class="content-wrap markdown-body" v-html="topic.content">
  	    	</div>
  	  	</div>
  	  	<div class="comment-wrap">
  	  		<div class="comment-count">
  		        {{topic.reply_count ? topic.reply_count:0}} 条回复
  		    </div>
  		    <div class="comment-item" v-for="(c, index) in topic.replies" :key="c.index">
  		        <div class="comment-head">
  		          <router-link :to="'/account/'+c.author.loginname">
  		            <div class="avatar">
  		              <img :src="c.author.avatar_url" alt="headImgUrl">
  		            </div>
  		          </router-link>
  		          <div class="comment-middle">
  		            <div class="comment-middle-top" v-text="c.author.loginname">
  		            </div>
  		            <div class="comment-middle-bottom">
  		              <span>{{index + 1}}楼</span> · {{c.create_at|transformDateFromNow}}
  		            </div>
  		          </div>
  		          <div class="comment-right">
                  <p></p>
  		          </div>
  		        </div>
  		        <div class="comment-content markdown-body" v-html="c.content">
  		        </div> 
  		    </div>
  	  	</div>
  	</div>
    <div v-else>
      <loading :value="true"></loading>
    </div>
  </div>
</template>
<script>
  import Badge from '../components/Badge'
  import { Loading } from 'vux'
  export default{
    data () {
      return {
        page: 1,
        pageSize: 10,
        topic: null
      }
    },
    components: {
      Badge,
      Loading
    },
    watch: {
      '$route': 'fetchData'
    },
    created () {
      this.fetchData()
      console.log(this.topic)
    },
    deactivated () {
      window.onscroll = null
    },
    computed: {
      isDataLoadingSuccess: function () {
        return this.$store.getters.topic.id === this.$route.params.id
      }
    },
    methods: {
      fetchData () {
        let url
        if (this.$store.getters.loginInfo) {
          url = `https://cnodejs.org/api/v1/topic/${this.$route.params.id}?accesstoken=${this.$store.getters.loginInfo.accessToken}`
        } else {
          url = `https://cnodejs.org/api/v1/topic/${this.$route.params.id}`
        }
        this.axios.get(url)
          .then(result => {
            this.topic = result.data.data
            this.iscollect = result.data.data.is_collect
            console.log(this.topic)
          })
          .catch(e => {
            this.$vux.toast.show({
              text: '操作失败',
              type: 'warn'
            })
          })
      },
      checkLogin () {
        if (!this.$store.getters.loginInfo) {
          this.$vux.toast.show({
            text: '请先登录',
            type: 'warn'
          })
          this.$router.push('/login')
          return false
        } else {
          return true
        }
      },
      onLikeTopic () {
        if (this.checkLogin()) {
          let url
          let toastText
          if (!this.topic.is_collect) {
            url = 'https://cnodejs.org/api/v1/topic_collect/collect'
            toastText = '收藏成功'
          } else {
            url = 'https://cnodejs.org/api/v1/topic_collect/de_collect'
            toastText = '取消收藏成功'
          }
          this.axios.post(url, {
            accesstoken: this.$store.getters.loginInfo.accessToken,
            topic_id: this.topic.id
          })
            .then(result => {
              this.topic.is_collect = !this.topic.is_collect
              this.$vux.toast.show({
                text: toastText
              })
            })
            .catch(e => {
              console.log(e)
              this.$vux.toast.show({
                text: '操作失败',
                type: 'warn'
              })
            })
        }
      }
    }
  }
</script>
<style lang="less">
	/** common */
	.avatar {	
    display: inline-block;
    width: 40px;
		height: 40px;
	
		img {
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
	}

	/**主要内容**/
	.wrap {
		overflow-y: scroll;
		position: absolute;
		width: 100%;
		box-sizing: border-box;
		top: 50px;
		bottom: 40px;
		/** 顶部帖子信息 **/
		.topic-intro{
			.head-title {
				text-align: center;
			}
      .collect-topic{
        float: right;
        margin-right: 30px;
        background-color: #66FA76;
        &:hover {
          cursor: pointer;
        }
        .collect {
          background-color: #66FA76;
          width: 60px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          color: #fff;
        }
        .iscollect {
          background-color: #ccc;
        }
      }
			.head-info {
				&:after,&:before {
					content: '';
					display: table;
					clear: both;
				}
				.avatar {
					float: left;
				}
				.info-detail {
					float: left;
					margin-left: 10px;
					
				}
			}
		}
		/**内容区**/
		.content {
			box-shadow: 0 6px 4px #eee;
			padding: 6px 16px;
		}
		/**回复区**/
		.comment-wrap {
			margin-top: 10px;
			.comment-count {
				padding: 20px 0;
			}
			.comment-item {
				border-top: 1px solid #eee;
				padding: 18px;
			}
		}
	}
</style>
