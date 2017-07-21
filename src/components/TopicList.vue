<template>
	<div class="topic-list">
		<tab class="nav-bar">
	      <tab-item @on-item-click="changeTab(category.queryData)" v-for="category in categories">{{category.name}}</tab-item>
	    </tab>
	  	<scroller :on-refresh="refresh"
            :on-infinite="infinite">
		  	<div class="topic-wrap" v-if="list.length>0">
		        <div v-for="i in list" class="topic-item">
		          <router-link :to="{ name: 'topic', params: { id: i.id }}">
		            <div class="topic-title">
		              <div class="topic-label" :class="[i.top ? 'topic-label-top' : `topic-label-other`]">
		                {{i.tab}}
		              </div>
		              <p v-text="i.title"></p>
		            </div>
		            <div class="topic-content">
		              <router-link :to="{name: 'account', params: { loginname: i.author.loginname }}">
		                <div class="avatar">
		                  <img :src="i.author.avatar_url" alt="headImgUrl">
		                </div>
		              </router-link>
		              <div class="topic-right">
		                <div class="topic-right-top">
		                  <div class="topic-name" v-text="i.author.loginname">
		                  </div>
		                  <div class="topic-count">
		                    <span v-text="i.reply_count"></span> / {{i.visit_count}}
		                  </div>
		                </div>
		                <div class="topic-right-bottom">
		                  <div class="topic-time">
		                    创建于：<span>{{i.create_at}}</span>
		                  </div>
		                  <div class="topic-pass">
		                    {{i.last_reply_at}}
		                  </div>
		                </div>
		              </div>
		            </div>
		          </router-link>
		        </div>
		    </div>
		    <div v-else>
				<load-more :tip="loadTip"></load-more>
			</div>
	    </scroller>
	</div>
</template>

<script>
	import { Panel,LoadMore,Tab,TabItem } from 'vux';
	import TopTab from './TopTab';

	export default {
		name: 'TopicList',
		components: {
			Panel,
			LoadMore,
			Tab,
			TabItem
		},
		data () {
			const categories = [
		      	{name: '全部',key: 'all' ,queryData:''},
		      	{name: '精华',key: 'good',queryData:'good'}, 
		      	{name: '分享',key: 'share',queryData:'share' }, 
		      	{name: '招聘',key: 'job',queryData:'job' }, 
		      	{name: '问答',key: 'ask',queryData:'ask' }
	      	]
		    return {
		      	type: '1',
		      	list: [],
		      	loadTip: 'loading',
		      	categories: categories,
		      	currentListPage: 1,
		      	currentTab: ''
		    }
	    },
	    mounted() {
	      this.refresh();
	    },
	    methods: {
	    	changeTab(queryData) {
	    		this.currentTab = queryData;
	    		this.refresh();
	    	},
	    	refresh(){
	    		setTimeout(() => {
					this.$store.dispatch('refreshTopiclistData',{this.currentTab})
				},1000)
	    	},
	    	infinite(done){
	    		setTimeout(() => {
	    			this.currentListPage++;
		    		this.$store.dispatch('loadMoreTopicList',{this.currentTab,this.currentListPage});
				},1000)
	    	}
	    }
	}
</script>

<style lang="less">
	.topic-list {
		/**导航**/
		.nav-bar {
			z-index: 2;
		}
		/**话题列表**/
		.topic-wrap {
			.topic-item {
				border-bottom: 1px solid #eee;
				padding: 10px 0;
				color: #222;
				.topic-title {
					font-size: 16px;
				}
				.topic-content {
					font-size: 12px;
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
				}
			}

		}
	}
</style>