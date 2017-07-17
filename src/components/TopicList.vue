<template>
	<div class="['wrapper']" ref="wrapper">
		<div v-if="list.length>0" :class="['topic-list','content']">
			<panel :list="list" :type="type"></panel>
		</div>
		<div v-else>
			<load-more :tip="loadTip"></load-more>
		</div>
	</div>
</template>

<script>
	import { Panel,LoadMore } from 'vux';
	import BScroll from 'better-scroll';

	export default {
		name: 'TopicList',
		components: {
			Panel,
			LoadMore
		},
		created(){
			this.getListData();
		},
		data () {
		    return {
		      	type: '1',
		      	list: [],
		      	loadTip: 'loading'
		    }
	    },
	    methods: {
	    	getListData(queryData){
				this.axios.get(`https://cnodejs.org/api/v1/topics?limit=20&tab=`)
			      	.then(result => (
			      		result.data.data.map(item=> {
					      	let o = {
					      		'src': item.author.avatar_url,
						      	'title': item.title,
						      	'desc': 'other',
						      	'url': '/article/'+ item.id
					      	}
				      		this.list.push(o);
				      	})
				  	)).then(
			      		this.$nextTick(() => { 
				      		this.scroll = new BScroll(this.$refs.wrapper, {}) 
				      	})
				  	)
	    	}
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