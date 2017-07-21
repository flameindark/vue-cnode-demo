<template>
	<div class="badge">{{props.text}}</div>
</template>

<script>
	export default {
		name:'Badge'
	}
</script>
<style>
	.badge {
		background-color: #12D249;
		width: 50px;
		height: 20px;
		line-height: 20px;
		color: #fff;
		border-radius: 5px;
		text-align: center;
	}
</style>