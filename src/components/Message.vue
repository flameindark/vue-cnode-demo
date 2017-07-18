<template>
	<p @click="alert">Message</p>
</template>

<script>
	export default {
		name:'Message',
		methods: {
			alert(){
				alert(1);
			}
		}
	}
</script>