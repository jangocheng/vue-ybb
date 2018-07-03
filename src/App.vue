<template>
  <div id="app">
  	  <keep-alive>
	    <router-view v-if="$route.meta.keepAlive"></router-view>
	  </keep-alive>
	  <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import './style/mintUI.css'
import './style/ybb.css'
import './style/aijiancha.css'
export default {
  name: 'app'
}
</script>

<style>
#app {
  height: 100%
}
</style>
