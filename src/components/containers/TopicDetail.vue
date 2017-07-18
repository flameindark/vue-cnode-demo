<template>
  

    <div class="content-wrap markdown-body" v-html="topic.content" v-bind:style="{width:'80%',margin:'0 auto',textIndent:'20px' }">
    </div>

</template>
<script>
  export default{
    data () {
      return {
      	fontSize: 16,
      	activeColor: '#333',
        page: 1,
        pageSize: 10,
        author: {
          id: '',
          avatar_url: '',
          name: ''
        },
        topic: {
          title: '',
          content: '',
          create_at: '',
          good: false,
          id: '',
          is_collect: false,
          last_reply_at: '',
          tab: '',
          top: false,
          visit_count: 0
        },
        displayCommentList: [],
        comment: [],
        reply_num: 0,
        popup: {
          replyId: null,
          show: false,
          content: '',
          placeholder: '请在此处留下您的评论'
        },
        showExtBtnReply: true
      }
    },
    created () {
    	console.log('create........');
    	this.onFetchDetail()
    },
    deactivated () {
      window.onscroll = null
    },
    methods: {
      onFetchDetail () {
        // 添加上滑显示下滑隐藏
        let _this = this
        let beforeScrollTop = document.documentElement.scrollTop || document.body.scrollTop
        window.onscroll = () => {
          let afterScrollTop = document.documentElement.scrollTop || document.body.scrollTop
          _this.showExtBtnReply = beforeScrollTop >= afterScrollTop
          beforeScrollTop = afterScrollTop
          let hasScrollTop = document.body.scrollTop
          let bodyHeight = document.body.scrollHeight
          let availHeight = window.screen.availHeight
          let remainingHeight = bodyHeight - availHeight - hasScrollTop
          if (remainingHeight < 200) {
            _this.onLoadMore()
          }
        }

        // 加载数据
        let id = this.$route.query.id
        this.axios.get('https://cnodejs.org/api/v1/topic/5433d5e4e737cbe96dcef312', {
          params: {
            accesstoken: this.$store.getters.getAccessToken
          }
        })
          .then(response => {
            let result = response.data.data;
            this.author = {
              id: result.author_id,
              name: result.author.loginname,
              avatar_url: result.author.avatar_url
            }
            this.topic = {
              title: result.title,
              content: result.content,
              create_at: result.create_at,
              good: result.good,
              id: result.id,
              is_collect: result.is_collect,
              last_reply_at: result.last_reply_at,
              tab: result.tab,
              top: result.top,
              visit_count: result.visit_count
            }
            this.comment = result.replies
            this.reply_num = result.reply_num
            this.displayCommentList = result.replies.slice(0, this.pageSize)
          })
          .catch(e => {
            console.log(e)
            alert(e)
          })
      },
      checkLogin () {
        let accessToken = this.$store.getters.accessToken
        if (!accessToken) {
          this.$vux.toast.show({
            text: '请先登录'
          })
          this.$router.push('/login')
          return false
        } else {
          return true
        }
      },
      onReplyComment (id, name, index) {
        if (this.checkLogin()) {
          this.popup.replyId = id
          this.popup.placeholder = `正在回复${index + 1}楼，${name}`
          this.popup.show = true
          console.log(this.$refs.input)
          this.$refs.input.onFocus()
        }
      },
      onReplytopic () {
        if (this.checkLogin()) {
          this.popup.replyId = null
          this.popup.placeholder = `正在回复作者，${this.author.name}`
          this.popup.show = true
          console.log(this.$refs.input)
          this.$refs.input.onFocus()
        }
      },
      onSendComment () {
        if (this.checkLogin()) {
          if (!this.popup.content) {
            this.$vux.toast.show({
              text: '评论不能为空'
            })
          } else {
            this.$loading.show()
            this.$axios.post(`/topic/${this.topic.id}/replies`, {
              accesstoken: this.$store.getters.accessToken,
              content: this.popup.content,
              reply_id: this.popup.replyId
            })
              .then(result => {
                console.log(result)
                this.comment.push({
                  author: {
                    avatar_url: this.$store.getters.loginInfo.avatarUrl,
                    loginname: this.$store.getters.loginInfo.loginname
                  },
                  content: this.popup.content,
                  create_at: new Date(),
                  id: result.data.reply_id,
                  reply_id: null,
                  ups: []
                })
                this.popup.show = false
                this.$vux.toast.show({
                  text: '评论成功'
                })
                this.$loading.hide()
              })
              .catch(e => {
                console.log(e)
                this.$vux.toast.show({
                  text: '操作失败'
                })
                this.$loading.hide()
              })
          }
        }
      },
      onLikeThistopic () {
        if (this.checkLogin()) {
          let url
          let toastText
          if (!this.topic.is_collect) {
            url = '/topic_collect/collect'
            toastText = '收藏成功'
          } else {
            url = '/topic_collect/de_collect'
            toastText = '取消收藏成功'
          }
          this.$axios.post(url, {
            accesstoken: this.$store.getters.accessToken,
            topic_id: this.topic.id
          })
            .then(result => {
              console.log(result)
              this.topic.is_collect = !this.topic.is_collect
              this.$vux.toast.show({
                text: toastText
              })
            })
            .catch(e => {
              console.log(e)
              this.$vux.toast.show({
                text: '操作失败'
              })
            })
        }
      },
      onLikeThisComment (id, index) {
        if (this.checkLogin()) {
          this.$axios.post(`/reply/${id}/ups`, {
            accesstoken: this.$store.getters.accessToken
          })
            .then(result => {
              let toastText
              if (result.data.action === 'down') {
                toastText = '取消点赞成功'
                let removeIndex = this.comment[index].ups.indexOf(this.$store.getters.loginInfo.id)
                this.comment[index].ups.splice(removeIndex, 1)
              } else {
                toastText = '点赞成功'
                this.comment[index].ups.push(this.$store.getters.loginInfo.id)
              }
              this.$vux.toast.show({
                text: toastText
              })
            })
            .catch(e => {
              console.log(e)
              this.$vux.toast.show({
                text: '操作失败'
              })
            })
        }
      },
      onLoadMore () {
        let page = this.page
        let pageSize = this.pageSize
        let fetchComment = this.comment.slice(page * pageSize, (page + 1) * pageSize)
        if (fetchComment.length) {
          this.displayCommentList = this.displayCommentList.concat(fetchComment)
          this.page++
        }
      }
    },
    computed: {
      minHeight: () => {
        return (document.body.clientHeight >= 400 && document.body.clientHeight <= 736) ? document.body.clientHeight : window.screen.height
      }
    }
  }
</script>
<style>
  .weui_text_left .weui_input {
    text-align: left;
  }
</style>
