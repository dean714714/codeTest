<template>
	<div class="chooseDate"  id="test1"></div>
</template>

<script>
	// 引入提示框和title组件
	import laydate from 'layui-laydate/dist/laydate.js'
	import laydateCss from 'layui-laydate/dist/theme/default/laydate.css'
	//require('layui-laydate/src/laydate/theme/default/laydate.css')
	
	export default {
		props: ['info'],
		data () {
			return {
				
			}
		},
		mounted: function(){
			var _this = this;
			laydate.render({
			  elem: '#test1', //指定元素
			  show: true,
			  position: 'static',
			  showBottom : false,
			  min: -30, //前30天
			  max: 0, //今天
			  done: function(value, date, endDate){
			  	var _date = new Date(),
			  	selectD = Date.parse(value),
			  	endD = _date.getTime(),
			  	intervalTime = (endD*1-selectD*1)/1000/60/60/24;
				//console.log(parseInt(intervalTime))
			  	_this.$emit('getDate',parseInt(intervalTime));//返回提前几天的值
			  	_this.$router.go(-1);
			  }
			});
		}
		
	}
</script>

<style scoped>
	.chooseDate{
		position: fixed;
		z-index: 99999999;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		background: #fff;
	}
	.laydate-theme-self{
		background: red !important;
	}
</style>