<template>
	<span>
		<div class="homeTop">
	  		<div class="weather">
	  			<i class="iconfont icon-qingchu iconWeather"></i> 
	  			<span class="weatherInfo">晴天</span>
	  			<span class="temperature ">20<span class="du">°</span></span>
	  		</div>
	  		<span v-show="card.length>0?true:false">
	  			<div class="btn_addcard"  @click="$router.push({ path: 'add_cards' })" >
	  				<i class="iconfont icon-tianjiayinhangqia iconAddcard"></i> 
	  			</div>
	      		<div class="htChart">
	      			<router-link to="/carbon_detail">
	      				<canvas id="homeCanvas"></canvas>
	          			<div class="htChartTitle">节省碳排总量</div>
	          			<div class="htChartNum"><span>0</span>g</div>
	          			<div class="htChartDate">统计至<span>2017-10-12</span></div>
	      			</router-link>
	      		</div>
	  		</span>
	  		<span v-show="card.length>0?false:true" class="noCard">
	  			<div class="noCardInfo">您还没有卡<br/>小编无法为您计算碳减排</div>
	  			<a href="#" class="button color-white noCardBtn" @click="$router.push({ path: 'add_cards_ls' })">
	  				添加卡
	  			</a>
	  		</span>
	  	</div>
	  	<div class="homeNav">
	  		<div class="row subNavGrid">
			    <div class="col-50 subNavCol" style="text-align: center;" v-for="subNav in navData">
					<div @click="$router.push({ path: 'HelloWorld' })" class="subNav">
						<span class="icon"><img :src="subNav.imgSrc" class="lazy lazy-fadein"/></span>
						<span class="info">{{subNav.info}}</span>
					</div>
				</div>
			</div> 
	  	</div>
	  	<div class="homeBanner">
	  		<div class="swiper-container">
			    <div class="swiper-wrapper">
			        <div class="swiper-slide"  v-for="banner in bannerData">
			        	<div class="banner"  :href="banner.href">
							<img :src="banner.imgSrc" class="lazy lazy-fadein"/>
						</div>
			        </div>
			    </div>
			    <div class="swiper-pagination"></div>
			</div>
	  	</div>
	</span>
</template>

<script>
export default {
	data () {
		return {
			navData: [
				{imgSrc:require("../assets/ic_shyk@2x.png"),info: "生活月刊"},
				{imgSrc:require("../assets/ic_jtzzd@2x.png"),info: "交通早知道"}
			],
			bannerData: [
				{imgSrc:require("../assets/banner.jpg"),href: "/about/"},
				{imgSrc:require("../assets/banner.jpg"),href: "/about/"},
				{imgSrc:require("../assets/banner.jpg"),href: "/about/"}
			],
			card: [{}]
		}
	},
	mounted: function(){
		//初始化swiper
		var myApp = new Framework7(); 
		var mySwiper = myApp.swiper('.swiper-container', {
		    speed: 400,
		    spaceBetween: 100
		}); 
	},
	methods: {
		
	}
}
</script>

<style type="text/css" scoped>
	
	.homeTop{
		position: relative;
		height: 74.6vw;
		background:url(../assets/img_home@2x.png) left bottom no-repeat,linear-gradient(180deg,#30ca81, #68df9d);
		background-size: 100% auto;
	}
	.noCard{
		position: absolute;
		top: 8.5rem;
		width: 100%;
		text-align: center;
		color: #fff;
		font-size: 1.4rem;
		letter-spacing: 0.1rem;
	}
	.noCardBtn{
		display: inline-block;
		width: 40vw;
		margin-top: 1.8rem;
	}
	.htChart{
		position: absolute;
		left: 29.2vw;
		top: 4rem;
		letter-spacing: 1px;
	}
	.htChartTitle{
		position: absolute;
		width: 100%;
		text-align: center;
		color: #349f94;
		font-size: 1.2rem;
		top: 2.2rem;
	}
	.htChartNum{
		position: absolute;
		width: 100%;
		text-align: center;
		color: #00887b;
		font-weight: 600;
		font-size: 1.4rem;
		top: 8.5rem;
	}
	.htChartNum span{
		font-weight: bold;
		font-size: 1.8rem;
	}
	.htChartDate{
		position: absolute;
		width: 100%;
		text-align: center;
		color: #999;
		font-size: 1rem;
		letter-spacing: normal;
		top: 12.5rem;
	}
	#homeCanvas{
		width: 41.6vw;
		height: 41.6vw;
		border-radius: 100%;
		background: rgba(255,255,255,0.9);
	}
	.btn_addcard{
		position: absolute;
		left: 11vw;
		top: 10rem;
		width: 3.5rem;
		height: 3.5rem;
		background: #fff;
		text-align: center;
		border-radius: 100%;
	}
	.iconAddcard{
		color: #2ba728;
		font-size: 2rem;
		line-height: 3.5rem;
	}
	.weather{
		position: absolute;
		top: 2.1rem;
		right: 4.26vw;
		line-height: 1.8rem;
		font-size: 1.4rem;
		color: #fff;
		text-align: right;
	}
	.weatherInfo,.temperature,.iconWeather{
		vertical-align: middle;
	}
	.iconWeather{
		position: initial;
		font-size: 1.8rem;
	}
	.homeNav{
		padding: 2rem 0;
		background: #fff;
	}
	.homeBanner{
		position: fixed;
		bottom: 0;
		background: #fff;
	}
	.subNavGrid{
		/*justify-content: flex-start;
		align-items: flex-start;*/
	}
	.subNavCol{
		width: 50vw !important;
		/*flex-grow:0;*/
	}
	.subNav{
		display: inline-block;
		width: 100%;
		color: #333;
	}
	.subNav:hover{
		/*background: #f5f5f5;*/
	}
	.subNav:first-child{
		border-right: 1px solid #f0f0f0;
	}
	.subNav .info,.subNav .icon{
		display: inline-block;
		vertical-align: middle;
	}
	.subNav .info{
		margin-left: 1rem;
	}
	.subNav .icon img{
		width: 4rem;
		height: 4rem;
	}
	.banner img{
		width: 100vw;
	}
</style>