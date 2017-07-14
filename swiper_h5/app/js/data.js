



// 使用刚指定的配置项和数据显示图表。
//myChart.setOption(option);

window.onload = function(){
	$mask.parentNode.removeChild($mask); //加载完成移除"加载中"的显示
	//$(".p3Ele1_blue_box").css('height','10rem');为柱形图设置高度
	
}
var mySwiper;
var app = new Vue({
	
	el:'#swiperApp',
	data:{
		contentShow: false
	},
	mounted: function(){
		
		var $counter = $('.counter');
		document.querySelector('#swiperApp').style.display = 'block';
		mySwiper = new Swiper('.swiper-container', {
			height:window.innerHeight,//需要在样式中设定100%，见style.css
			noSwiping : true,//允许设置slide禁止切换
			loop: false,
			speed: 400,
			direction: 'vertical',
			autoplayStopOnLast: true,
			hashnav: true,
			roundLengths: true,
			passiveListeners : false,//提升swiper在移动设备的中的scroll表现
			onInit: function(swiper) { //初始化
				swiperAnimateCache(swiper); //隐藏动画元素
				swiperAnimate(swiper); //初始化完成开始动画
				$(swiper.slides[swiper.activeIndex]).find('.counter').count();
			},
			onSlideChangeEnd: function(swiper) { //页面切换完成触发
				//swiperAnimateCache(swiper);
				var index = swiper.activeIndex;
				swiperAnimate(swiper); //执行动画（不加将没有效果）
				$(swiper.slides[swiper.activeIndex]).find('.counter').count();
				//$counter.eq(11).count();//数字滚动动画
				if(index===3){
					if($("#main").length>0){
						$("#main").remove();
					}
					var myChartBox = $('.cxEchart');
					var myChartMain = $("<div id='main'></div>");
					myChartBox.append(myChartMain);
					var myChart = echarts.init(myChartMain[0]);
					// 指定图表的配置项和数据
					var option = {
					    series: [{
					        name: '访问来源',
					        type: 'pie',
					        radius : '70%',
					        center: ['45%', '50%'],
					        roseType : 'radius',
				           // width: '40%',       // for funnel
				           // max: 40,            // for funnel
					        data:[
					            {value:335, name:'公交'},
					            {value:310, name:'地铁'},
					            {value:234, name:'P+R'}
					        ],
					        itemStyle: {
					            emphasis: {
					                shadowBlur: 10,
					                shadowOffsetX: 0,
					                shadowColor: 'rgba(0, 0, 0, 0.5)',
					            },
					            normal: {
					            	borderColor: "#ffffff",
      								borderWidth: "3",
      								labelLine: {
      									show:true,
      									smooth: true
      								}
					            }
					        },
					        label: {//标签
								normal: {
					                formatter: function(val){
					                	 //return val.name.split("").join("\n");//标签文字换行
					                }
					            }
							}
					    }],
					    color:["#4ec0f2","#5bc5ba","#d196fa"],
					};
					myChart.setOption(option);
				}
			}
		});
			
	}
	
})