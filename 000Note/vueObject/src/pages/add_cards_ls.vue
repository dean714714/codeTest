<template>
	<div class="list-block">
		<router-view></router-view>
		<ul>
			<li @click="$router.replace({ path: '/add_cards_ls/add_jmk' })">
				<a href="#" class="item-link item-content">
					<div class="item-inner borderB">
						<div class="item-title">记名卡</div>
						<div class="item-after"></div>
					</div>
				</a>
			</li>
			<li @click="$router.replace({ path: '/add_cards_ls/add_fjmk' })">
				<a href="#" class="item-link item-content">
					<div class="item-inner">
						<div class="item-title">非记名卡</div>
						<div class="item-after"></div>
					</div>
				</a>
			</li>
		</ul>
	</div>
</template>

<script>
</script>

<style scoped>
	.list-block{
		margin: 1.5rem 0;
	}
	.list-block ul::after,.list-block ul::before{
		display: none;
	}
	.list-block .item-inner::after{
		display: none;
	}
	.item-title{
		font-size: 1.7rem;
		color: #333;
	}
</style>