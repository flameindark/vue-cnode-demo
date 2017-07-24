<template>
	<div class="new-topic-wrap">
		<group>
	      <selector title="类型" :options="list" v-model="topicType"></selector>
	      <x-input placeholder="标题，字数10字以上" v-model="title"></x-input>
	      <x-textarea  v-model="content" name="description"
	                  placeholder="说点什么吧..." class="publish-content"></x-textarea>
	      <x-button type="primary" class="publish-submit" show-loading>submit</x-button>
	    </group>		
	</div>
</template>

<script>
	import { Selector, Group , XInput, XTextarea, XButton } from 'vux';

	export default {
		name:'NewTopic',
		components: {
			Selector,
			Group,
			XInput,
			XTextarea,
			XButton
		},
		data() {
			return {
				topicType: '',
				title:'',
				content:'',
				list: [
					{
						key: 'ask',
						 value: '问答'
					}, 
					{
						key: 'share', 
						value: '分享'
					},
					{
						key: 'job',
						value: '招聘'
					},
					{
						key:'dev',
						value: '测试'
					}
				]
			}
		}
	}
</script>
<style lang="less">
	.new-topic-wrap {
		position: absolute;
		top: 44px;
		width: 100%;
		bottom: 60px;
		overflow-y: scroll;
		.publish-content {
			min-height:300px;
		}
		.publish-submit {
			width: 40%;
		}
	}
</style>