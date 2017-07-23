<template>
	<div class="badge" :style="{width:width+'px',height:height+'px',fontSize:fontSize+'px',lineHeight:height+'px',backgroundColor:text==='置顶'?'#09BB07':'#ccc',color:text==='置顶'?'#fff':'#222'}">{{ text }}</div>
</template>

<script>
	export default {
		name:'Badge',
		props:{
			text:{
				require: true
			},
			width:{
				require: false,
				default: '36'
			},
			height:{
				require: false,
				default: '20'
			},
			fontSize:{
				require: false,
				default: '12'
			}
		}
	}
</script>
<style>
	.badge {
		border-radius: 5px;
		text-align: center;
	}
</style>