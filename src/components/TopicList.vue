<template>
	<div>
		<tab>
	      <tab-item @on-item-click="getListData(category.queryData)" v-for="category in categories" >{{category.name}}</tab-item>
	    </tab>
		<div class="['wrapper']" ref="wrapper">
			<div v-if="list.length>0" :class="['topic-list','content']">
				<panel :list="list" :type="type"></panel>
			</div>
			<div v-else>
				<load-more :tip="loadTip"></load-more>
			</div>
		</div>
	</div>
</template>

<script>
	import { Panel,LoadMore,Tab,TabItem } from 'vux';
	import BScroll from 'better-scroll';
	import TopTab from './TopTab';

	export default {
		name: 'TopicList',
		components: {
			Panel,
			LoadMore,
			Tab,
			TabItem
		},
		created(){
			this.getListData();
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
		      	categories: categories
		    }
	    },
	    methods: {
	    	getListData(queryData){
	    		this.$store.commit('updateCurrentTab',queryData);
				this.axios.get(`https://cnodejs.org/api/v1/topics?limit=20&tab=${queryData?queryData:''}`)
			      	.then(result => (
			      		this.list = result.data.data.map(item=> {
					      	return {
					      		'src': item.author.avatar_url,
						      	'title': item.title,
						      	'desc': 'other',
						      	'url': '/topic/'+ item.id
					      	};
				      	})
				  	)).then(
			      		this.$nextTick(() => { 
				      		this.scroll = new BScroll(this.$refs.wrapper, {}) 
				      	})
				  	)
	    	},
	    }
	}
</script>

<style>
	/*.topic-list {
		position: absolute;
		top: 90px;
		bottom: 0;
		overflow: scroll;
		width: 100%;
	}*/
</style>