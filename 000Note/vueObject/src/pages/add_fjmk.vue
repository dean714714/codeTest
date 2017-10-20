<template>
<div class="form_add">
	<div class="list-block">
		<ul>
			<li>
				<div class="item-content">
					<div class="item-inner">
						<div class="item-title label form_add_name">卡号</div>
						<div class="item-input form_add_in">
							<input type="text" placeholder="请输入杭州通卡/公交卡卡号" v-model="val">
						</div>
					</div>
					<div class="item-media" v-show="val?true:false" @click="clearVal"><i class="iconfont icon-qingchu icon_form_clear"></i></div>
				</div>
			</li>
		</ul>
	</div>
	<a href="#" class="button active btn_formAdd">添加</a>
	<div class="action">非记名卡的添加仅用于本模块碳减排量的记录</div>
</div>
</template>

<script>
	export default {
		data() {
			return {
				val: ''
			}
		},
		methods: {
			clearVal: function(){
				this.val = '';
			}
		}
		
	}
</script>

<style scoped>
	.list-block{
		margin:1.5rem 0;
	}
	.list-block ul::before,.list-block ul::after{
		display: none;
	}
	.form_add{
		position: fixed;
		z-index: 100;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		background: #f5f5f9;
	}
	.form_add_name{
		width: auto !important;
		font-size: 1.7rem;
	}
	.form_add_in{
		margin-left: 2rem !important;
	}
	.form_add_in input{
		font-size: 1.7rem;
	}
	.icon_form_clear{
		font-size: 1.4rem;
		color: #DEDEDE;
		margin-right: 1.5rem;
	}
	.btn_formAdd{
		line-height: 4.4rem;
		height: 4.4rem;
		margin: 3rem 1.5rem 1rem 1.5rem;
		background: #289e25;
		border: none;
		font-size: 1.8rem;
	}
</style>