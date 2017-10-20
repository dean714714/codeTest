<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <!--<transition name="fade">-->
		  <router-view></router-view>
		<!--</transition>-->
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style scoped>
#app {
 
}

/* 设置持续时间和动画函数 */
.fade-enter-active, .fade-leave-active {
  transition: opacity .1s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0
}
</style>
