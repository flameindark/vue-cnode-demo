<template>
	<x-header :left-options="{backText: ''}" style="z-index:3">CNode</x-header>
</template>

<script>
	import { XHeader } from 'vux'

	export default {
	  name: 'HeaderBar',
	  components: {
	    XHeader
	  }
	}
</script>