<template>
	<div class="new-topic-wrap">
		<group>
	      <selector title="类型" :options="list" v-model="tab"></selector>
	      <x-input placeholder="标题，字数10字以上" v-model="title"></x-input>
	      <x-textarea  v-model="content" name="description"
	                  placeholder="说点什么吧...(支持markdown语法哟)" class="publish-content">{{content}}</x-textarea>
	      <x-button type="primary" class="publish-submit"  @click.native="submitTopic">submit</x-button>
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
				tab: '',
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
		methods: {
			submitTopic(){
				
				if (!this.$store.getters.loginInfo) {
					this.$vux.toast.show({
			           text: '请先登录',
			           type: 'warn'
			        })
			        this.$router.push('/login')
					return false;
				}
				let accesstoken = this.$store.getters.loginInfo.accessToken;
				let data = {
					content: this.content,
					title: this.title,
					tab: this.tab,
					accesstoken: accesstoken
				}
				console.log('data:'+data);
				
		        this.axios.post('https://cnodejs.org/api/v1/topics',data).
		            then(result => {
		                if (result.data.success) {
		                    this.$vux.toast.show({
		                    	text: '发布成功'
		                    });
		                    this.$router.push('/');
		                }else{
		                    this.$vux.toast.show({
		                    	text: '发布失败',
		                    	type: 'warn'
		                    });
		                }
		            })
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