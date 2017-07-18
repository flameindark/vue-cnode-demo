<template>
	<group>
      <selector title="类型" :options="list" v-model="topicType"></selector>
      <x-input placeholder="标题，字数10字以上" v-model="title"></x-input>
      <x-textarea :height="minHeight - 42 - 44 - 22 - 40" v-model="content" name="description"
                  placeholder="说点什么吧..."></x-textarea>
      <x-button type="primary" show-loading>submit</x-button>
    </group>
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
		},
		computed: {
			minHeight: () => {
	        	return (document.body.clientHeight >= 400 && document.body.clientHeight <= 736) ? document.body.clientHeight : window.screen.height
	        }
		}
	}
</script>