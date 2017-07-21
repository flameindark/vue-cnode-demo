<template>
	<div class="wrap">
		<div class="topic-intro">
			<h4 class="head-title" v-text="topic.title"></h4>
			<div class="head-info">
				<div class="avatar">
		          <img :src="author.avatar_url" alt="headImgUrl">
		        </div>
		        <div class="info-detail">
		        	<Badge text="置顶" />
		        	<span class="author-name">{{author.loginname}}</span>
		        	<p><span></span>前创建·<span></span>次预览</p>
		        </div>
			</div>
		</div>
		<div class="content">
	  		<div class="content-wrap markdown" v-html="topic.content">
	    	</div>
	  	</div>
	  	<div class="comment-wrap">
	  		<div class="comment-count">
		        {{reply_num}} 条回复
		    </div>
		    <div class="comment-item" v-for="(c, index) in commentList">
		        <div class="comment-head">
		          <router-link to="/">
		            <div class="avatar">
		              <img :src="c.author.avatar_url" alt="headImgUrl">
		            </div>
		          </router-link>
		          <div class="comment-middle">
		            <div class="comment-middle-top" v-text="c.author.loginname">
		            </div>
		            <div class="comment-middle-bottom">
		              <span>{{index + 1}}楼</span> · {{c.create_at}}
		            </div>
		          </div>
		          <div class="comment-right">
		          </div>
		        </div>
		        <div class="comment-content markdown" v-html="c.content">
		        </div> 
		    </div>
	  	</div>
	</div>
</template>
<script>
  import Badge from '../common/Badge';
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
        commentList: [],
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
    	this.onFetchDetail()
    },
    deactivated () {
      window.onscroll = null
    },
    methods: {
      onFetchDetail () {
        // 加载数据
        let id = this.$route.params.id
        this.axios.get('https://cnodejs.org/api/v1/topic/' + id, {
          params: {
            accesstoken: this.$store.getters.getAccessToken
          }
        })
          .then(response => {
          	console.log(response.data.data);
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
            this.reply_num = result.reply_count
            this.commentList = result.replies.slice(0, this.pageSize)
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
          this.commentList = this.commentList.concat(fetchComment)
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
<style lang="less">
	/** common */
	.avatar {
		float: left;
		width: 40px;
		height: 40px;
		display: inline-block;
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

	/**markdown样式--- 来自(http://localhost:8080/#/topic/58ad76db7872ea0864fedfcc)	**/
	.markdown {
    @font-size: 14px;
    @line-height: 20px;
    @color: #333;
    @four-space: 34px;
    @four-space-css3: ~"4ch"; // some browsers support char spacing
    @two-space-css3: ~"2ch"; // less does not support ch very well
    @ul-tick: "*";
    @strong-char: "__";
    @em-char: "*";

    // makes things like pre tags play more nicely with mobile
    word-wrap: break-word;

    &, h1, h2, h3, h4, h5, h6, pre, code, blockquote, em, strong, code {
        font-size: @font-size;
        line-height: @line-height;
        font-weight: normal;
        font-style: normal;
        font-family: consolas,monaco,courier,"courier new",fixed-width;
        color: @color;
    }

    h1, h2, h3, h4, h5, h6, pre, code, blockquote, ol, ul, li, p, section, header, footer {
        float: none;
        margin: 0;
        padding: 0;
    }

    h1, p, ul, ol, pre, blockquote {
        margin-top: @line-height;
        margin-bottom: @line-height;
    }

    h1 {
        position: relative;
        display: inline-block;

        // table-cell puts on own line and limits width to text
        display: table-cell;

        padding: @line-height 0 @line-height * 2;
        margin: 0;
        overflow: hidden;

        // `h1:after` creates something as the last child of the h1,
        // likewise `:before` creates something as the first child
        &:after {
            // 100 characters wide max
            content: "====================================================================================================";
            position: absolute;
            bottom: @line-height;
            left: 0;
        }
    }

    // this matches the next sibling after an h1 (apart from a pure text node)
    // since h1s use padding instead of margin, I did not want to double pad
    h1 + * {
        margin-top: 0;
    }

    h2, h3, h4, h5, h6 {
        position: relative;
        margin-bottom: @line-height;
    }

    h2:before,
    h3:before,
    h4:before,
    h5:before,
    h6:before {
        content: "## ";
        display: inline;
    }
    h3:before {
        content: "### ";
    }
    h4:before {
        content: "#### ";
    }
    h5:before {
        content: "##### ";
    }
    h6:before {
        content: "###### ";
    }

    li {
        position: relative;
        display: block;
        padding-left: @four-space;
        padding-left: @four-space-css3;
    }

    li:after {
        position: absolute;
        top: 0;
        left: 0;
    }

    ul>li:after {
        content: @ul-tick;
    }

    ol {
        // Auto-increments the numbering for ordered lists.
        counter-reset:ol;
    }
    ol>li:after {
        content: counter(ol) ".";
        counter-increment: ol;
    }

    pre {
        margin-left: @four-space;
        padding-left: @four-space-css3;
    }
    blockquote {
        position: relative;
        padding-left: @four-space/2;
        padding-left: @two-space-css3;
        overflow: hidden;

        &:after {
            // 100 lines max
            // the \A becomes a newline character and `white-space: pre`
            // makes it act like a <br>
            content: ">\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>\A>";
            white-space: pre;
            position: absolute;
            top: 0;
            left: 0;
            font-size: @font-size;
            line-height: @line-height;
        }
    }

    strong:before, strong:after {
        content: @strong-char;
        display: inline;
    }

    em:before, em:after {
        content: @em-char;
        display: inline;
    }


    a {
        text-decoration: none;
    }
    a:before {
        content: "[";
        display: inline;
        color: @color;
    }
    a:after {
        content: ~'"](" attr(href) ")"';
        display: inline;
        color: @color;
    }

    code { font-weight: 100; }

    code:before,
    code:after {
        content: "`";
        display: inline;
    }

    pre code:before,
    pre code:after {
        content: none;
    }

    hr {
        position: relative;
        height: @line-height;
        font-size: 0;
        line-height: 0;
        overflow: hidden;
        border: 0;
        margin-bottom: @line-height;

        &:after {
            // 100 characters wide max
            // older ie versions do not show the content
            content: "----------------------------------------------------------------------------------------------------";
            position: absolute;
            top: 0;
            left: 0;
            font-size: @font-size;
            line-height: @line-height;
            width: 100%;
            word-wrap: break-word;
        }
    }

    // only opera support before and after with img :(
    // img {
    //     display: inline-block;
    //     &:before {
    //         content: ~'"![" attr(alt)';
    //         display: inline-block;
    //     }
    //     &:after {
    //         content: ~'"](" attr(src) ")"';
    //         display: inline-block;
    //     }
    // }
	}

	// firefox cannot put position absolute inside table-cell
	@-moz-document url-prefix() {
	    .markdown h1 { display: block; }
	}

	.markdown-ones {
	    ol>li:after {
	        content: "1.";
	    }
	}
	.markdown img{
		max-width:100%;
	}
</style>
