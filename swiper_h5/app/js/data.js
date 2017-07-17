
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
		contentShow: false,
		$active: {},
		$activeVal: ''
	},
	mounted: function(){
		this.init();
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
			
	},
	methods: {
		//读取localStorage中的用户信息初始化
		init: function(){
			let $loginCon1 = $("#loginCon1");//登录页的登录块和查询块
			let $loginCon2 = $("#loginCon2");
			//localStorage.clear();
			let userName,cardInfo,userlevel,userId;
			userId = localStorage.getItem('userId')||null;
			if(!userId){
				$loginCon2.hide();
				$loginCon1.show();
				this.clearDom();//初始化的时候清除dom中表单和卡信息
			}else{
				let phoneNum = localStorage.getItem('phoneNum');
				userName = this.getUserInfo(phoneNum).userName;
				userlevel = this.getUserInfo(phoneNum).userlevel;
				cardInfo = this.getUserInfo(phoneNum).cardInfo;
				this.initSearchPage(userName,userlevel,cardInfo);//如果本地有数据初始化查询页面
				$loginCon2.show();
				$loginCon1.hide();
			}
		},
		//清空页面表单
		clearDom: function (){
			$formIn = $(".formIn");
			$cardBox = $(".cardBox");
			$formIn.val('');
			$cardBox.html('');
		},
		//初始化查询页
		initSearchPage: function(userName,userlevel,cardInfo){
			//let userName,userlevel,cardInfo;
			let $loginName = $("#loginName");
			if(userlevel===0){
				$loginName.html('未实名');
				$loginName.click(function(){
					alert('当前用户未实名，请至【杭州市民卡】APP完成实名操作！')
				})
			}else{
				$loginName.html(userName);
				if(cardInfo.length>0){
					for(let i=0;i<cardInfo.length;i++){
						this.addCard(cardInfo[i]);
					}
				}
			}
		},
		//验证码倒计时
		getYzm: function($event,time){
			let obj = $event.target;
			console.log(obj)
			let objVal = (!isNaN($(obj).html()))
				?(function(){return;})()
				:(function(){
					$(obj).html(time);
					let yzmAni = setInterval(function(){
						$(obj).html()>0
						?$(obj).html($(obj).html()-1)
						:(function(){
							clearInterval(yzmAni);
							$(obj).html("获取验证码");
						})();
					},1000)
				})()
			
		},
		//表单置顶显示
		showForm: function(obj){
			this.$active = obj;
			let $thisCopy = obj.clone();
			$thisCopy.val('');
			$thisCopy.attr('onchange','synForm(this.value)');
			let $newIn = $("<div style='padding:4rem 1rem;background:#fff;margin-top:0;' class='formList'></div>");
			let $btn = $('<div class="yzmBtn borderLeft inBtn" style="top:4rem;" onclick="closeForm(this,'+$thisCopy.data("check")+')">确定</div>')
			$thisCopy.removeClass('borderBottom');
			$thisCopy.css({background:'#fff',margin:0});
			$newIn.append($thisCopy).append($btn);
			let $mask = $("<div class='mask formMask'></div>");
			$mask.appendTo($('body')).html($newIn);
			$thisCopy.focus();
		},
		closeForm: function(obj,callback){//关闭置顶表单
			var backInfo = callback($(obj).parent().find('.formIn').val());
			if(backInfo===true){
				$(obj).parents('.formMask').remove();
				this.$active.val($activeVal)
				this.$active={};
				this.$activeVal='';
			}else{
				alert(backInfo);
			}
			
		},
		//同步信息
		synForm: function(value){
			this.$activeVal = value;
		},
		//检查是否手机号是否合规
		checkPhone: function(value){
			var value = value;
			var r = /^1[358][0-9]{9}$/;
			if(r.test(value)){
				return true;
			}else{
				return '这不是手机号,请重新输入';
			}
			
		},
		//检查是否验证码是否正确
		checkCode: function(value){
			var value = value;
			var r = /^[0-9]*[1-9][0-9]*$/;//规则等接口
			if(r.test(value)){
				return true;
			}else{
				return '验证码不正确，请确认输入！';
			}
			
		},
		//检查是否杭州通卡有效
		checkCard: function(value){
			var value = value;
			var r = /^[0-9]*[1-9][0-9]*$/;//规则等接口
			if(r.test(value)){
				return true;
			}else{
				return '卡号不正确，请确认后添加！';
			}
		},
		//添加杭州通卡
		addCard: function(value){
			if(value){
				let $cardBox = $(".cardBox");
				let $cardNum = $(".cardBox").find(".cardNum").length>0?$(".cardBox").find(".cardNum"):{};
				for(i=0;i<$cardNum.length;i++){
					if($cardNum.eq(i).html()===value){
						alert('该卡号已经添加，不能重复添加！');
						return;
					}
				}
				let $card = $('<div class="formList borderBottom">'+
							'<img src="img/clearInfo.png" class="clearInfo" onclick="delCard(this,'+value+')"/>'+
							'<div class="cardNum">'+value+'</div>'+
						'</div>');
				$cardBox.append($card);
				this.addCardToData(value);
			}else{
				alert('卡号不能为空')
			}
		},
		//添加杭州通卡到数据库
		addCardToData: function(value){
			//alert(value);
		},
		//删除杭州通卡
		delCard: function(obj,value){
			var $thisCard = $(obj).parent();
			$thisCard.remove();
			this.delCardInData(value);
		},
		//删除数据库中的该杭州通卡
		delCardInData: function(value){
			//alert(value);
		},
		//通过手机号获取用户id,用户名,等级和卡信息
		getUserInfo: function(phoneNum){
			let userName='',userId='',userlevel='',cardInfo=[];
			//下述数据通过手机号ajax获取
			userName = 'zhangSan';
			userId = 'zh008';
			userlevel = 1;
			cardInfo = [1231231,39811123,12938912];
			
			return {
				userName: userName,
				userId: userId,
				userlevel: userlevel,
				cardInfo: cardInfo
			}
		},
		//登录系统
		loginIn: function(){
			let phoneNum = $("#phoneNum").val();
			let codeNum = $("#codeNum").val();
			if(!phoneNum||!codeNum){
				alert("手机号或验证码不能为空，请确认！")
			}else{
				let userId = getUserInfo(phoneNum).userId;
				let userName = getUserInfo(phoneNum).userName;
				let userlevel = getUserInfo(phoneNum).userlevel;
				let cardInfo = getUserInfo(phoneNum).cardInfo;
				this.storeId(userId);
				this.storePhone(phoneNum);
				$("#loginCon1").hide();
				$("#loginCon2").show();
				this.initSearchPage(userName,userlevel,cardInfo);//初始化查询页面
			}
		},
		//推出系统
		loginOut: function(){
			localStorage.clear()//如果点击退出则清空本地数据
			this.init();
		},
		//查询数据
		search: function(callback){
		//	let $cardBox = $(".cardBox");
		//	let $cardList = $(".cardBox").find('.cardNum');
		//	let cardInfo = [];
		//	for(let i=0;i<$cardList.length;i++){
		//		cardInfo.push($cardList.eq(i).html())
		//	}
		
		//	new Promise(function(resolve,reject){
		//		getData(url,'post','6月份',resolve)
		//	}).then(function(){
		//		//将数据赋予图表
		//		callback();
		//	})
			callback();
		},
		//存储用户id到本地
		storeId: function(data){
			localStorage.setItem('userId',data);
		},
		//存储用户手机号到本地
		storePhone: function(data){
			localStorage.setItem('phoneNum',data);
		},
	}
	
})