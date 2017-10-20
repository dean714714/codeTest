<template>
	<div class="page-content">
		<router-view @getCardNum="addCard"></router-view>
		<div class="content-block-title addCardTile borderT borderB">
			<i class="iconfont icon-tianjia icon_add" @click="$router.push({ path: '/add_cards/add_jmk' })"></i> 
			<div>记名卡</div>
		</div>
	    <div class="content-block addCardCon">
	      <div class="content-block-inner addedCardB">
	      	<div class="addedCard" v-for="data in data_jmk"  :class="[data.class]" >
	      		<div class="cardInfo">
	      			{{data.name}}<div class="cardNum">{{data.num}}</div>
	      		</div>
	      	</div>
	      </div>
	    </div>
	    <div class="content-block-title addCardTile borderT borderB">
			<i class="iconfont icon-tianjia icon_add" @click="$router.push({ path: '/add_cards/add_fjmk' })"></i> 
			<div>非记名卡</div>
		</div>
	    <div class="content-block addCardCon">
	      <div class="content-block-inner addedCardB">
	      	<div class="addedCard card_hzt" v-for="data in data_fjmk">
	      		<div class="cardInfo">
	      			{{data.name}}<div class="cardNum">{{data.num}}</div>
	      		</div>
	      	</div>
	      </div>
	    </div>
	    <div class="action" style="margin-top: 2rem;">非记名卡的添加仅用于本模块碳减排量的记录</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				data_jmk: [
					{code:'smk',class: 'card_smk',name: "市民卡",num: 'A12345678'},
					{code:'xfk',class: 'card_xfk',name: "记名消费卡",num: 'A123sdf8'},
				],
				data_fjmk: [
					{code:'hzt',class: 'card_hzt',name: "杭州通卡",num: 'X12345678'},
					{code:'hzt',class: 'card_hzt',name: "杭州通卡",num: 'B123sdf8'},
				]
			}
		},
		computed: {
			
		},
		methods: {
			addCard: function(data){
				console.log(data)
			}
		},
//		beforeRouteUpdate (to, from, next) {
//			console.log("hello")
//			//this.$router.push({ path: '/' })
//		}
	}
</script>

<style scoped>
	.content-block-inner::after,.content-block-inner::before{
		display: none;
	}
	.addCardTile{
		position: relative;
		margin: 0;
		padding: 1.5rem;
		background: #f8f8f8;
	}
	.addCardTile div{
		font-size: 1.6rem;
		color: #333333;
		padding-left: 0.5rem;
		border-left: 0.3rem solid #2ba728; 
	}
	.icon_add{
		position: absolute;
		font-size: 3rem;
		right: 0.75rem;
		top: 0.85rem;
	}
	.addCardCon{
		padding: 0;
		margin: 0;
	}
	.addedCardB{
		padding: 2rem 0 0 0;
		margin: 0;
	}
	.addedCard{
		width: 100vw;
		height: 26.7vw;
		overflow: hidden;
	}
	.card_smk{
		background: url(../assets/bg_smcard_tjk@2x.png) no-repeat left top;
		background-size: 100% 100%;
	}
	.card_xfk{
		background: url(../assets/bg_xfcard_tjk@2x.png) no-repeat left top;
		background-size: 100% 100%;
	}
	.card_hzt{
		background: url(../assets/bg_hztcard_tjk@2x.png) no-repeat left top;
		background-size: 100% 100%;
	}
	.cardInfo{
		color: #FFFFFF;
		font-size: 4.6vw;
		line-height: 4.6vw;
		margin: 5.3vw 20.3vw;
	}
	.cardInfo .cardNum{
		font-size: 4.2vw;
		line-height: 4.2vw;
		margin-top: 2.5vw;
	}
</style>