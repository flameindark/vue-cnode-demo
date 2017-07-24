<template>
	<div class="topic-list">
		<tab class="nav-bar">
	      <tab-item @on-item-click="changeTab(category.queryData)" v-for="category in categories" :text="category.name">{{category.name}}</tab-item>
	    </tab>
	  	<scroller :on-refresh="refresh"
            :on-infinite="infinite" class="scroller-wrap">
		  	<div class="topic-wrap">
		        <div v-for="i in (this.$store.getters.topicList)" class="topic-item">
		          <router-link :to="{ name: 'topic', params: { id: i.id }}">
		            <div class="topic-title">
		              <div class="topic-label" :class="[i.top ? 'topic-label-top' : `topic-label-other`]">
		              	<div v-if="isShowBadge(i)">
		              		<Badge :text="i.tab|transformTab(i.top)"/>
		              	</div>
		              </div>
		              <p v-text="i.title"></p>
		            </div>
		            <div class="topic-content">
		            	<div class="topic-info-left">
				            <router-link :to="{name: 'account', params: { loginname: i.author.loginname }}">
				                <div class="avatar">
				                  <img :src="i.author.avatar_url" alt="headImgUrl">
				                </div>
				              </router-link>
			                <div class="author-info">
			                  <div class="topic-name" v-text="i.author.loginname">
			                  </div>
			                  <div class="topic-count">
			                    <span v-text="i.reply_count"></span> / {{i.visit_count}}
			                  </div>
			                </div>
			            </div>
		                <div class="topic-info-right">
		                  <div class="topic-time">
		                    创建于: <span>{{i.create_at|transformDateFromNow}}</span>
		                  </div>
		                  <div class="topic-pass">
		                    最近活跃: {{i.last_reply_at|transformDateFromNow}}
		                  </div>
		                </div>
		            </div>
		          </router-link>
		        </div>
		    </div>
	    </scroller>
	</div>
</template>

<script>
	import { Panel,LoadMore,Tab,TabItem } from 'vux'
	import Badge  from '../components/Badge'
	let currentTab = 'all';

	export default {
		name: 'TopicList',
		components: {
			Panel,
			LoadMore,
			Tab,
			TabItem,
			Badge
		},
		data () {
			const categories = [
		      	{name: '全部',key: 'all' ,queryData:'all'},
		      	{name: '精华',key: 'good',queryData:'good'}, 
		      	{name: '分享',key: 'share',queryData:'share' }, 
		      	{name: '招聘',key: 'job',queryData:'job' }, 
		      	{name: '问答',key: 'ask',queryData:'ask' }
	      	]
		    return {
		      	type: '1',
		      	loadTip: 'loading',
		      	categories: categories,
		    }
	    },
	    methods: {
	    	changeTab(queryData) {
	    		currentTab = queryData;
	    		this.refresh();
	    	},
	    	refresh(){
	    		this.$store.dispatch('change_tab',currentTab);
				this.$store.dispatch('refreshTopiclistData');
	    	},
	    	infinite(){
	    		this.$store.dispatch('change_tab',currentTab);
		    	this.$store.dispatch('loadMoreTopicList');
	    	},
	    	isShowBadge(item){
	    		return item.tab||item.top || item.good
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
		.scroller-wrap{
			padding-top:90px;
			box-sizing: border-box;
			transition: opacity .5s;
			color: #222;
		}
		.topic-wrap {
			.topic-item {
				border-bottom: 1px solid #eee;
				padding: 10px 0;
				.topic-title {
					font-size: 16px;
					color: #000;
					font-weight: 600;
				}
				.topic-content {
					color: #222;
					font-size: 14px;
					.topic-info-left {
						float: left;
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
						.author-info {
							float: left;
							padding-left: 6px;
						}
					}
					.topic-info-right {
						float: right;
					}

					&::after,&::before {
						content: '';
						display: table;
						clear: both;
					}
				}
			}

		}
	}
</style>