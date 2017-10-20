<template>
	<div>
		<router-view @getDate='whichD'></router-view>
		<div class="carbonChart">
			<div class="swiper-custom"><!--日期swiper-->
				<div class="swiper-container">
				 <!-- <div class="swiper-pagination"></div>-->
				  <div class="swiper-wrapper">
				    <div class="swiper-slide" v-for="date in swiperDate">
				    	<span :id="date.last">
				    		<router-link to='/carbon_detail/Date'>{{date.info}}</router-link>
				    	</span>
				    </div>
				  </div>
				</div>
				<div class="swiper-button-prev">
					<i class="iconfont icon-arrow"></i>
				</div>
				<div class="swiper-button-next">
					<i class="iconfont icon-arrow"></i>
				</div>
			</div>
			<div class="cTile">今日减排</div>
			<div class="jianpai"><span>12.3</span>g</div>
			<div class="otherDate">
				<span>均值：8.8g</span>
				<span>最大值：12.3g</span>
			</div>
			<div id="myChart" style="height: 18rem;margin: 1rem 0;"></div>
		</div>
		
		<div class="cDetail">
			<div class="row cDdata">
			    <div class="col-33 borderR">公交出行 <div class="cDsubData"><span>2</span>次</div></div>
			    <div class="col-33 borderR">地铁出行 <div class="cDsubData"><span>4</span>次</div></div>
			    <div class="col-33">p+R停车<div class="cDsubData"><span>1</span>次</div></div>
			</div>
			<div class="row cDdata" style="border: none;">
			    <div class="col-33 borderR">校园健身<div class="cDsubData"><span>5</span>次</div></div>
			    <div class="col-33 borderR">诊间结算<div class="cDsubData"><span>0</span>次</div></div>
			    <div class="col-33">绿色消费<div class="cDsubData"><span>20</span>次</div></div>
			</div>
		</div>
		<div class="btn_goYk">查看月刊</div>
	</div>
</template>

<script>
	// 引入基本模板
	let echarts = require('echarts/lib/echarts')
	// 引入折线图组件
	require('echarts/lib/chart/line')
	// 引入提示框和title组件
	require('echarts/lib/component/tooltip')
	require('echarts/lib/component/title')
	
	export default {
		data () {
			return {
				//swiperDate: ['10月10日','10月11日','10月12日','10月13日','10月14日','10月15日','10月16日'],
				last: 0
			}
		},
		computed: {
//			slectedDate: function(){
//				return new Date().getMonth()+1+'月'+new Date().getDate()+'日';
//			},
			swiperDate: function(){//切换时间组件时间数据，返回之前30天 ‘日’的数组
				var myDate = new Date(); //获取今天日期
				myDate.setDate(myDate.getDate() - 29);
				var dateArray = []; 
				var dateTemp; 
				var flag = 1; 
				for (var i = 30; i >0 ; i--) {
					var obj = {},
					dateTemp = (myDate.getMonth()+1)+"月"+myDate.getDate()+'日';
					obj.info = dateTemp;
					obj.last = i;
				    dateArray.push(obj);
				    myDate.setDate(myDate.getDate() + flag);
				}
				return dateArray;
			},
			chartX: function(){//折线图x轴的标签，swiperDate选中日期的前7天
				var myDate = new Date(); //获取今天日期
				myDate.setDate(myDate.getDate() - this.last);
				myDate.setDate(myDate.getDate() - 6);
				var dateArray = []; 
				var dateTemp; 
				var flag = 1; 
				for (var i = 0; i < 7; i++) {
				    dateTemp = myDate.getDate();
				    dateArray.push(dateTemp);
				    myDate.setDate(myDate.getDate() + flag);
				}
				return dateArray;
			}
		},
		mounted: function(){
			var swiper = this.mySwiper();
			swiper.slideTo(29, 0, false);//切换到最后一个
			this.drawLine();
		},
		methods: {
			mySwiper: function(){
				var _this = this;
				var swiper = new Framework7().swiper('.swiper-container', {
					width : 80,
				  	nextButton: '.swiper-button-next',
				  	prevButton: '.swiper-button-prev',
				  	onSlideChangeEnd: function(){
				  		var thisSlider = swiper.slides[swiper.activeIndex];
				  		_this.last = thisSlider.getElementsByTagName('span')[0].id*1-1;
				  		_this.drawLine();//重绘
				  	}
				});
				return swiper;
			},
			drawLine() {
		      // 基于准备好的dom，初始化echarts实例
		      let myChart = echarts.init(document.getElementById('myChart'))
		      // 绘制图表
		      myChart.setOption({
		      	title: {
		      		show: false,
			        text: 'XX折线图',
			    },
			    tooltip: {
			        trigger: 'axis'
			    },
			    legend: {
			    	show: true,
			    	left: 10,
			        data:['邮件营销']
			    },
			    grid: {
			        left: '0%',
			        right: '0%',
			        bottom: '15%',
			        top: '0%',
			        containLabel: false
			    },
			    toolbox: {
			        feature: {
			            saveAsImage: {}
			        }
			    },
			    color: ['#4a90e2','#f75c5d','#417505'],
			    xAxis: {
			        type: 'category',
			        boundaryGap: true,
			        axisLine: {
			        	lineStyle: {
			        		color: '#666',
			        	}
			        },
			        axisTick: {
			        	show: true,
			        	interval: 0,//强制显示所有刻度
			        	length:2,
			        	lineStyle: {
			        		
			        	}
			        },
		        	axisLabel: {
		        		interval: 0,//强制显示所有刻度标签
		        		formatter: '{value}日',
		        		fontSize: 10
		        	},
		        	splitLine: {
		        		show: false,//是否显示纵向分割线，y轴默认显示，x轴默认不现实
		        	},
		        	splitArea: {
		        		show: false,//类目轴有效，用色块分割
		        	},
		        	axisPointer: {
		        		show: true,
		        		type: 'shadow',
		        		shadowStyle: {
		        			color: {
							    type: 'linear',
							    x: 0,
							    y: 0,
							    x2: 0,
							    y2: 1,
							    colorStops: [{
							        offset: 0, color: 'rgba(69,191,119,0)' // 0% 处的颜色
							    }, {
							        offset: 1, color: 'rgba(69,191,119,1)' // 100% 处的颜色
							    }],
							    globalCoord: false // 缺省为 false
							}
		        		},
		        		handle: {//拖拽手柄，适用于触屏环境
		        			show: true
		        		}
		        	},
			        data: this.chartX
			    },
			    yAxis: {
			    	show: true,
			        type: 'value',
			        axisLine: {
			        	show: false,//不显示轴线
			        },
			        axisTick: {
			        	show: false,
			        },
			        axisLabel: {
			        	show: false
			        },
			        splitLine: {
		        		show: true,//是否显示纵向分割线，y轴默认显示，x轴默认不现实
		        		lineStyle: {
		        			color: ['#dedede'],
		        			width: 0.5,
		        			type: 'dashed'
		        		}
		        	},
			    },
			    series: [
			        {
			            name:'本人',
			            type:'line',
			            stack: '总量',
			            lineStyle: {
			            	
			            },
			            data:[120, 132, 101, 134, 90, 230, 210]
			        },
			        {
			            name:'均值',
			            type:'line',
			            stack: '总量',
			            data:[220, 182, 191, 234, 290, 330, 310]
			        },
			        {
			            name:'最大值',
			            type:'line',
			            stack: '总量',
			            data:[150, 232, 201, 154, 190, 330, 410]
			        }
			    ]
		      });
		    },
			whichD: function(data){//获取返回的日期对象
				this.last = data;
				var swiper = this.mySwiper();
				swiper.slideTo(29-this.last,200, false);//切换到指定日期
				this.drawLine();//重绘折线图
			}
		}
	}
</script>

<style scoped>
.carbonChart{
	background: #fff;
	overflow: hidden;
}
.swiper-custom {
  position:relative;
  width: 30vw;
  margin-top: 1rem;
  left: 35%;
}
.swiper-custom a{
  color: #666;
}
.swiper-container {
  width: 80px;
}
.swiper-slide {
  background: #fff;
} 
.swiper-slide span {
  text-align:center;
  display:block;
  line-height: 2.4rem;
  font-size:1.4rem ;
}
.swiper-button-next,.swiper-button-prev{
	background: none !important;
	top: 0rem !important;
	width: 0 !important;
	height: 0 !important;
	margin-top: 0 !important;
}
.swiper-button-next i,.swiper-button-prev i{
	display: inline-block;
	font-size: 2.4rem;
	line-height: 2.4rem;
	color: #dedede;
}
.swiper-button-next i{
	transform:scaleX(-1);
}
.swiper-button-prev{
	left: 0vw;
}
.swiper-button-next{
	right: 2.4rem;
}

.cTile{
	margin-top: 2rem;
	text-align: center;
	font-size: 1rem;
	color: #666666;
}
.jianpai{
	text-align: center;
	font-size: 2.4rem;
	color: #333333;
	margin-top: 1.5rem;
}
.otherDate{
	font-size: 1rem;
	color: #666666;
	margin-top: 3rem;
}
.otherDate span{
	margin-left: 1.5rem;
}
.cDetail{
	background: #fff;
	margin-top: 1rem;
	padding: 0 1.5rem;
	margin-bottom: 5.4rem;
}
.cDdata{
	font-size: 1rem;
	color: #333;
	border-bottom: 1px solid #dedede;
}
.cDdata > div {
	margin: 1.5rem 0;
}
.cDdata span{
	font-size: 2.4rem;
	font-weight: 500;
}
.cDsubData{
	line-height: 2.4rem;
	margin-top: 0.5rem;
}
.btn_goYk{
	position: fixed;
	z-index: 10;
	left: 0;
	bottom: 0;
	width: 100%;
	background: #FFFFFF;
	line-height: 4.4rem;
	text-align: center;
	font-size: 1.8rem;
	color: #2BA728;
	box-shadow: 0 3px 6px #999;
}
</style>