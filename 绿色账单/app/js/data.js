
(function(){ //禁止安卓端应用页面放大导致布局变形（如微信网页的可设置字体放大功能），ios通过样式设置即可
 if (typeof(WeixinJSBridge) == "undefined") { 
  document.addEventListener("WeixinJSBridgeReady", function (e) { 
   setTimeout(function(){ 
    WeixinJSBridge.invoke('setFontSizeCallback',{"fontSize":0}, function(res) { 
     // alert(JSON.stringify(res)); 
    }); 
   },0); 
  }); 
 } else { 
  setTimeout(function(){ 
   WeixinJSBridge.invoke('setFontSizeCallback',{"fontSize":0}, function(res) { 
    // alert(JSON.stringify(res)); 
   }); 
  },0); 
 } 
})();

function isEmpty(obj){//判断对象是否为空
	for(var key in obj){return false;}
	return true;
}
function isApp(name){//判断是不是App内嵌webview  
    let arr_last = window.navigator.userAgent.split(" ");
    let state=false;
    for(var i=0; i < arr_last.length; i++){
        var items = arr_last[i].split("/");
    	if(items[0] == name){
        	return true;
    	}else{
      		state = false;
    	}
    }
    return state;
};
function stopAni(){
	addVal = 100;//终止index页面中的动画
	new Promise(function(resolve,reject){
		let addVal=0;
		let $processW = parseInt($process.style.width);
		let $valNum = parseInt($val.innerHTML);
		(function loadingMove(){
			if(addVal<=100-$processW){
				$process.style.width = $processW+addVal+'%';
				$val.innerHTML = $valNum+addVal+'%';
				addVal++;
				requestAnimationFrame(loadingMove)
			}else{
				resolve();
			}
		})();
	}).then(function(value){
		$mask.parentNode.removeChild($mask);
	})
};
var appGetData;//获取token
function sendTokenToWap(data){
	appGetData = data;
}
var monthNumDefault = new Date().getMonth()===0?1:new Date().getMonth();//设定月份//

window.onload = function(){
	//发送获取token请求，再ios里只能放在onload里才行，不然都会导致资源请求中断的问题
	if(isApp('smkVersion')){//页面加载完成改变href触发上诉sendTokenToWap函数
		window.location.href= "smkapp://postSMKUserToken";
		jsBridge.setTitle("我的绿色生活月刊");//设置app title
	};
	let windowH = $(window).height();
	$('input').focus(function(){
		let thisFormOffset = $(this).offset().top;
		$(window).resize(function(){//防止移动端键盘弹出影响布局
			$(".swiper-slide").css({"height":windowH+'px'})
			if($(window).height()<windowH){
				if(thisFormOffset<180){
					return;
				}else{
					$(".swiper-slide").css('top',180-thisFormOffset+'px')
				}
			}else{
				$(".swiper-slide").css('top',"0")
			}
		})
	})
	//$mask.parentNode.removeChild($mask); //加载完成移除"加载中"的显示
	//$(".p3Ele1_blue_box").css('height','10rem');为柱形图设置高度
	
}
var app = new Vue({
	el:'#app',
	data:{
		contentShow: false,
		actionMaskShow:false,//信息提示框显隐
		doMaskShow: false,//信息操作提示框
		dataLoadingShow:false,//数据加载菊花显隐
		swiperAppShow:false,
		wxShareShow:false,
		selMonthShow:false,//选择月份栏
		selManiShow:true,//选择月份的小图标动效类的显隐
		shareBtn_show:true,//分享按钮（4.1.0以下无法分享，隐藏）
		clickOnce:false,//禁止重复点击
		actionInfo:'',
		thisDoKey:0,
		doInfo: '',
		slideShow: {//控制需要显隐藏的silde及内容的显隐
			page3Con1Show: false,
			page3Con2Show: false,
			page3Con3Show: false,
			page3Con4Show: false,
			page4Con1Show: false,
			page4Con2Show: false,
			page6Con1Show: false,
			page6Con2Show: false,
			page6Con3Show: false,
			page7Con1Show: false,
			page7Con2Show: false,
			page7Con3Show: false
		},
		swiper:{},
		loginConShow:true, 
		phoneNumInShow:false,
		checkCodeInShow:false,
		cardInShow: false,
		monthNum: monthNumDefault+'',
		phoneNum:'',
		codeNum:'',
		thisCardNum:'',
		userName: '',//用户名
		userId: '',//用户id
		userlevel: 0,//用户等级
		cardInfo:[],//用户的卡
		token:'',
		bill:{//账单信息
			bus_count: 0,	//公交乘坐次数
			subway_count:0,	//地铁乘坐次数
			park_count:0,	//P+R停车次数
			ride_time:0,	//乘车时间（h）
			ride_km:0,		//乘车里程（km）
			westlake_round:0,	//绕西湖圈数
			fitness_count:0,	//校园健身次数
			fitness_time:0,	//校园健身时间
			save_electricity:0,	//节省电量
			online_recharge_count:0,	//线上充值次数
			online_recharge_money:0,	//线上充值金额（元，2位小数）
			medical_count:0,	//医疗预约次数
			inter_room_settlement:0,	//诊间结算次数
			save_wait_time:0,	//节省排队时间
			cost_money:0,	//本月总消费金额（元，2位小数）
			save_money:0,	//本月节省金额（元，2位小数）
			bus_cost:0,		//公交花费（元，2位小数）
			subway_cost:0,	//地铁花费（元，2位小数）
			park_cost:0,	//P+R花费
			save_co2:0,		//节省CO2排放量
			save_rank:0//碳节省打败人数百分比
		},
		shareDataForTimeLine: {//默认值
			imgUrl: window.location.href.substring(0,window.location.href.lastIndexOf('/')+1)+"img/shareImg.jpg",
	        link:window.location.href,
	        title: '绿色生活月刊',
	        desc: "快来看看您的出行账单吧！",
	        success: function (){},
	        cancel: function (){}
		},
		shareDataForMessage: {//默认值
			imgUrl: window.location.href.substring(0,window.location.href.lastIndexOf('/')+1)+"img/shareImg.jpg",
	        link:window.location.href,
	        title: '绿色生活月刊',
	        desc: "快来看看您的出行账单吧！",
	        success: function (){},
	        cancel: function (){}
		}
	},
	computed: {
		selMonth: function(){
			let month = monthNumDefault*1;
			let monthArray = [];
			for(let i=1;i<=month;i++){
				monthArray.push(i)
			}
			return monthArray.reverse();
		}
	},
	mounted: function(){
		
		let _this = this;
		let mountTime = function(){
			if(_this.isApp("smkVersion")){//如果是app延时获取token，因为改变href的时机只能是页面加载完成，不延时将无法获取
				_this.loginConShow = false;
				//判断APP版本信息
				let ua = window.navigator.userAgent.split("smkVersion/")[1];
				let version;
				if(!ua.split(' ')[1]){//如果之后没有别的ua了
					//version = parseInt(ua.split(' ')[0].split('.').join(""));
					version = (function(){
						let arr = ua.split(' ')[0].split('.');
						for(let i=0;i<arr.length;i++){
							if(arr[i]*1<10){arr[i] = ("0"+arr[i])};//为单数加0防止版本号有些是单数有些是双数
						}
						return arr.join("")*1;
					})()
				}else{
					//version = parseInt(ua.substring(0,ua.indexOf(' ')).split('.').join(""));
					version = (function(){
						let arr = ua.substring(0,ua.indexOf(' ')).split('.');
						for(let i=0;i<arr.length;i++){
							if(arr[i]*1<10){arr[i] = ("0"+arr[i])};
						}
						return arr.join("")*1;
					})()
				}
				//alert(version)
				return new Promise(function(resolve){
					_this.dataLoadingShow = true;
					if(version>=40100){//版本4.1.0开始使用token的方式获取
						_this.dataLoadingShow = false;
						_this.token = location.search.split('token=')[1]||"";//如果url都没有token即版本过低，token为空，下述初始化会显示错误页面
						resolve();
						//发现4.1.0及以后的token获取是通过手动改变href的方式，webview再在url中添加
						//token的而不是直接加进去，下述appGetData并不是必须的
//						setTimeout(function(){
//							_this.token = appGetData;
//							_this.dataLoadingShow = false;
//							resolve();
//						},2000)
					}else{
						_this.dataLoadingShow = false;
						_this.shareBtn_show = false;//4.1.0以下隐藏分享按钮（不支持分享）
						_this.token = location.search.split('token=')[1]||"";//如果url都没有token即版本过低，token为空，下述初始化会显示错误页面
						resolve();
					}
				})
			}else{
				return new Promise(function(resolve){resolve()})
			}
		}
		mountTime().then(function(value){
			stopAni();//停止加载动画
			_this.init();
			//document.querySelector('#swiperApp').style.display = 'block';
			//_this.$refs.swiperApp.style.display = 'block';
			_this.mySwiper();
		})
		
		if(this.isWeiXin()){//开启微信分享事件监听
			this.shareToWx();//如果未查询数据时分享，也可以分享当前页面，内容是上诉默认值
		}

	},
	methods: {
		mySwiper: function(){
			let _this = this;
			_this.swiper = new Swiper('.swiper-container', {
				height:window.innerHeight,//需要在样式中设定100%，见style.css
				noSwiping : true,//允许设置slide禁止切换
				loop: false,
				speed: 400,
				direction: 'vertical',
				autoplayStopOnLast: true,
				//hashnav: true,
				roundLengths: true,
				passiveListeners : false,//提升swiper在移动设备的中的scroll表现
				onInit: function(swiper) { //初始化
					swiperAnimateCache(swiper); //隐藏动画元素
					swiperAnimate(swiper); //初始化完成开始动画
					//$(swiper.slides[swiper.activeIndex]).find('.counter').count();
				},
				onSlideChangeEnd: function(swiper) { //页面切换完成触发
					//swiperAnimateCache(swiper);
					_this.swiper.height = window.innerHeight;//对于手机端有些浏览器滑动会改变window大小而设定
					var index = swiper.activeIndex;
					swiperAnimate(swiper); //执行动画（不加将没有效果）
					//$(swiper.slides[swiper.activeIndex]).find('.counter').count();
					let $counter = $(swiper.slides[swiper.activeIndex]).find('.counter');
					$counter.each(function(){
						let thisValue = $(this).html();
						$(this).SmkScrollNumber({
	                        num: _this.bill[$(this).data('val')]||0,
	                        speed: 1000
	                    })
					})
					//$counter.eq(11).count();//数字滚动动画
					if($(swiper.slides[swiper.activeIndex]).attr('id')==='slide4'){
						if(document.getElementById("chart-area")){
							document.getElementById("chart-area").parentNode.removeChild(document.getElementById("chart-area"));
						}
						var $canvas = document.createElement('canvas');
						$canvas.id = 'chart-area';
						$canvas.height  ='100%';
						$canvas.width = '100%';
						document.querySelector('.cxEchart').appendChild($canvas);
						var ctx = $canvas.getContext("2d");
						// 指定图表的配置项和数据
						var myChart = new Chart(ctx, {
						    type: 'pie',
						    data: {
						        labels: ["公交:￥"+_this.bill.bus_cost, "地铁:￥"+_this.bill.subway_cost,"P+R:￥"+_this.bill.park_cost],
						        datasets: [{
						            label: '# of Votes',
						            data: [_this.bill.bus_cost,_this.bill.subway_cost,_this.bill.park_cost],
						            backgroundColor: [
						                'rgb(137, 202, 255)',
						                'rgb(161, 155, 245)',
						                'rgb(205, 143, 247)'
						            ],
						            borderColor: [
						                'rgba(255,255,255,1)',
						                'rgba(255,255,255,1)',
						                'rgba(255,255,255,1)'
						            ],
						            borderWidth: 2
						        }]
						    },
						    options: {
						        tooltips: {
						            mode: 'nearest',
						            intersect: false
						        },
						        legend: {
						            display: true,
						            labels: {
						                fontColor: 'rgb(89, 130, 131)',
						                boxWidth: 20,
						                usePointStyle: true//用远点表示而不是长方形
						            },
						            
					            }
						    }
						});
					}
				}
			})
		},
		removePage: function(){
			let $swiper_slide = $(".swiper-slide");
			let $swiperSel = $(".swiperSel");
			let state;
			for(let billItem in this.bill){//判断是否有数据，有则不现实没数据展示的页面
				if(this.bill.hasOwnProperty(billItem)){
					if(this.bill[billItem]>0){
						state = true;
						break;
					}else{
						state = false;
					}
				}
			}
			$swiperSel.show();
			$swiperSel.addClass("swiper-slide");
			if(state === true){
				$swiperSel.eq(1).removeClass('swiper-slide');
				$swiperSel.eq(1).hide();
				//如果诊间结算页面数据为0,则不显示该页面
				if(this.bill.medical_count*1===0&&this.bill.inter_room_settlement*1===0&&this.bill.save_wait_time*1===0){
					$swiperSel.eq(6).removeClass('swiper-slide');
					$swiperSel.eq(6).hide();
				}
				console.log("当前有数据，将显示数据展示页面！");
			}else{
				for(let i=2;i<$swiperSel.length;i++){
					$swiperSel.eq(i).removeClass('swiper-slide');
					$swiperSel.eq(i).hide();//移除其他页面
				}
				console.log("当前没有数据，将显示无数据提示页面！");
			}
		},
		removeSlideCon: function(){//根据数据判断页面内容显隐
			//page3Con的判断
			if(Math.max(this.bill.park_count,this.bill.subway_count)<this.bill.bus_count){//显示公交
				this.slideShow.page3Con1Show = false;
				this.slideShow.page3Con2Show = true;
				this.slideShow.page3Con3Show = false;
				this.slideShow.page3Con4Show = false;
			}else if(Math.max(this.bill.bus_count,this.bill.subway_count)<this.bill.park_count){//显示停车
				this.slideShow.page3Con1Show = false;
				this.slideShow.page3Con2Show = false;
				this.slideShow.page3Con3Show = true;
				this.slideShow.page3Con4Show = false;
			}else if(Math.max(this.bill.bus_count,this.bill.park_count)<this.bill.subway_count){//显示地铁
				this.slideShow.page3Con1Show = false;
				this.slideShow.page3Con2Show = false;
				this.slideShow.page3Con3Show = false;
				this.slideShow.page3Con4Show = true;
			}else{
				this.slideShow.page3Con1Show = true;
				this.slideShow.page3Con2Show = false;
				this.slideShow.page3Con3Show = false;
				this.slideShow.page3Con4Show = false;
			}
			//page4Con的判断
			let p4radomNum = Math.ceil(Math.random()*2);
			if(p4radomNum===1){
				this.slideShow.page4Con1Show=true;
				this.slideShow.page4Con2Show=false;
			}else{
				this.slideShow.page4Con1Show=false;
				this.slideShow.page4Con2Show=true;
			}
			//page6Con的判断
			let p6radomNum = Math.ceil(Math.random()*2);
			if(this.bill.fitness_count===0){
				this.slideShow.page6Con3Show=true;
				this.slideShow.page6Con1Show=false;
				this.slideShow.page6Con2Show=false;
			}else{
				if(p6radomNum===1){
					this.slideShow.page6Con1Show=true;
					this.slideShow.page6Con2Show=false;
					this.slideShow.page6Con3Show=false;
				}else{
					this.slideShow.page6Con1Show=false;
					this.slideShow.page6Con2Show=true;
					this.slideShow.page6Con3Show=false;
				}
			}
			//page7Con的判断
			let p7radomNum = Math.ceil(Math.random()*2);
			if(this.bill.online_recharge_count===0&&this.bill.medical_count===0&&this.bill.inter_room_settlement===0){
				this.slideShow.page7Con1Show=true;
				this.slideShow.page7Con2Show=false;
				this.slideShow.page7Con3Show=false;
			}else{
				if(p7radomNum===1){
					this.slideShow.page7Con3Show=true;
					this.slideShow.page7Con2Show=false;
					this.slideShow.page7Con1Show=false;
				}else{
					this.slideShow.page7Con3Show=false;
					this.slideShow.page7Con2Show=true;
					this.slideShow.page7Con1Show=false;
				}
			}
		},
		setMonth: function($event){
			let $this = $event.target;
			this.selMonthShow = false;
			this.monthNum = $this.innerHTML;
		},
		isWeiXin: function(){//判断是不是微信页面
			var ua = window.navigator.userAgent.toLowerCase();
			if(ua.match(/MicroMessenger/i) == 'micromessenger'){
				return true;
			}else{
				return false;
			}
		},
		IsPC: function(){//判断是不是pc端  
			var sUserAgent = navigator.userAgent.toLowerCase();
	        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
	        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
	        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
	        var bIsAndroid = sUserAgent.match(/android/i) == "android";
	        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
	        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
	        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
	           return false;//表示移动端
	        } else {
	           return true;//表示PC端
	        }  
		},
		isApp: function (name){//判断是不是App内嵌webview  
		    let arr_last = window.navigator.userAgent.split(" ");
		    let state=false;
		    for(var i=0; i < arr_last.length; i++){
		        var items = arr_last[i].split("/");
	        	if(items[0] == name){
	            	return true;
	        	}else{
	          		state = false;
	        	}
		    }
		    return state;
        },
		alertInfo: function(info){
			this.actionMaskShow = true;
			this.actionInfo = info;
			this.$refs.action.setAttribute('class',"action actionAni")
		},
		alertDo: function(info,key){
			this.thisDoKey=key
			this.doMaskShow = true;
			this.doInfo = info;
			this.$refs.action.setAttribute('class',"action actionAni")
		},
		doIt: function(callback){//信息操作提示框点击确定
			callback(this.thisDoKey);
			this.doMaskShow = false;
		},
		//读取localStorage中的用户信息初始化
		init: function(){
			//localStorage.clear();
			let _this = this;
			new Promise(function(resolve){
				if(_this.isApp("smkVersion")){//如果是再app内嵌webview
					new Promise(function(resolve){
						resolve(_this.token)
					}).then(function(value){
						if(value){
							let accessToken = value;//value.accessToken
							//alert(accessToken)
							new Promise(function(resolve){
								getData("/big_data/ajax/auth.php",'post',{"cmd": "siginInByAppAccessToken", "token":accessToken},resolve);
							}).then(function(value){
								//alert(value.account);
								let status = value.status;
								if(status==='ok'){
									_this.userId = value.account;
									resolve("当前环境是APP");
								}else{
									window.location.href = window.location.href.substring(0,window.location.href.lastIndexOf('/')+1)+"error.html";
									resolve("token获取成功但用户信息获取失败");
								}
							})
						}else{
							window.location.href = window.location.href.substring(0,window.location.href.lastIndexOf('/')+1)+"error.html";
							resolve("token获取失败请关闭页面重新进入");
						}
					})
					
				}else{
					_this.userId = localStorage.getItem('userId')||null;
					resolve("当前环境是web");
				}
			}).then(function(value){
				//alert(value)
				if(!_this.userId){
					_this.loginConShow = true;
					_this.loginName = '';
					_this.phoneNum = '';
					_this.codeNum = '';
					_this.thisCardNum = '';
					_this.cardInfo = [];
				}else{
					//this.phoneNum = localStorage.getItem('phoneNum');
					new Promise(function(resolve){
						getData("/big_data/ajax/auth.php",'post',{"cmd": "siginInByAccessCode", "userid":_this.userId,"ac":"biginsight"},resolve);
						//resolve({status:'ok'});//离线测试
					}).then(function(value){
						//alert(value)
						console.log(value.status)
						let status = value.status;
						if(status==='fail'){
							_this.alertInfo("免登验证失败请重新登录！")
							return;
						}else{
							_this.getUserInfo().then(function(){
								_this.initSearchPage();//如果本地有数据初始化查询页面
								_this.loginConShow = false;
								_this.goReal();//登录时显示提示信息
							})
						}
					})
				}
			})
			//let userId = localStorage.getItem('userId')||null;
		},
		//初始化查询页
		initSearchPage: function(){
			//let $loginName = $("#loginName");
			if(this.userlevel<=1){
				this.loginName = '未实名';
			}
		},
		goReal: function(){
			if(this.userlevel<2){
				this.alertInfo('您还未实名，小编无法自动帮您生成月刊。请在下方添加常用的【杭州通卡/公交卡】，或至【杭州市民卡APP】完成实名认证')
			}else{
				this.alertInfo('您已实名，小编将自动根据您的【市民卡】数据生成月刊; 您也可以在下方添加常用的【杭州通卡/公交卡】，让您的月刊更丰富')
			}
		},
		//验证码倒计时
		getYzm: function($event,time){
			let _this = this;
			//倒计时操作
			let obj = $event.target;
			if(this.checkPhone()){
				(!isNaN($(obj).html().split('s')[0]))
				?(function(){
					_this.alertInfo("请倒计时结束再重新获取！");
					return;
				})()
				:(function(){
					new Promise(function(resolve){//获取验证码
						getData("/big_data/ajax/auth.php",'post',{"cmd": "getValidCode", "mobile":_this.phoneNum},resolve);
						//resolve();//离线测试
					}).then(function(value){
						//console.log("验证码发送状态："+value.status)
						$(obj).html(time+'s');
						let yzmAni = setInterval(function(){
							$(obj).html().split('s')[0]*1>0
							?$(obj).html($(obj).html().split('s')[0]*1-1+'s')
							:(function(){
								clearInterval(yzmAni);
								$(obj).html("获取验证码");
							})();
						},1000)
					})
				})()
			}
		},
		cPNShow: function(){//手机号弹出框的显隐
			this.phoneNumInShow = !this.phoneNumInShow;
			if(this.phoneNumInShow){//如弹出则激活弹出框输入框
				//$(this.$refs.phoneNum).blur();
				//$(this.$refs.phoneNumT).focus();
			}
		},
		cCCShow: function(){//验证码弹出框的显隐
			this.checkCodeInShow = !this.checkCodeInShow;
			if(this.checkCodeInShow){//如弹出则激活弹出框输入框
				//$(this.$refs.codeNum).blur();
				//$(this.$refs.codeNumT).focus();
			}
		},
		cIshow: function(){//添加卡弹出框的显隐
			this.cardInShow = !this.cardInShow;
			if(this.cardInShow){//如弹出则激活弹出框输入框
				//$(this.$refs.cardNum).blur();
				//$(this.$refs.cardNumT).click();
			}
		},
		//检查是否手机号是否合规
		checkPhone: function(){
			var value = this.phoneNum;
			var r = /^1[1234567890][0-9]{9}$/;
			if(!value){
				this.alertInfo("手机号不能为空！")
				return false;
			}else{
				if(r.test(value)){
					this.cPNShow();//如果合规就关闭弹出的输入框
					return true;
				}else{
					this.alertInfo('手机号输入错误,请重新输入'); 
					return false;
				}
			}
			
		},
		//检查验证码是否正确
		checkCode: function(){
			let _this = this;
			return	new Promise(function(resolve){//验证验证码
					getData("/big_data/ajax/auth.php",'post',{"cmd": "siginInByMobile","mobile":_this.phoneNum ,"vc": _this.codeNum},resolve);
					//resolve({status:'ok'});////离线测试
				}).then(function(value){
					let status = value.status;
					if(status==='ok'){
						console.log("验证码验证成功！")
					}else{
						_this.alertInfo('验证码不正确，请确认输入！')
					}
					return status;
				})
			//}
			
		},
		//检查是否杭州通卡有效
		checkCard: function(value){
			var value = this.thisCardNum;
			//var r = /^[0-9]*[1-9][0-9]*$/;//规则等接口
			if(value){
				this.cIshow();//如果合规就关闭弹出的输入框
			}else{
				//this.alertInfo('卡号不正确，请确认后添加！');
			}
		},
		//添加杭州通卡
		addCard: function(){
			let value = this.thisCardNum;
			let _this = this;
			if(value){
				if(this.cardInfo.length>=3){
					this.alertInfo('限定查询卡数为3张，您不能再添加了哦！')
					return;
				}else if($.inArray(value,this.cardInfo)!==-1){
					this.alertInfo('您已添加该卡不能重复添加！');
					return;
				}
				this.thisCardNum='';
				this.dataLoadingShow = true;
				this.addCardToData(value).then(function(status){
					if(status==='failed'){
						_this.dataLoadingShow = false;
						_this.alertInfo("卡号添加失败！杭州通卡请输入正确卡号，市民卡不支持手动添加，请至【杭州市民卡】APP进行实名！")
					}else{
						_this.dataLoadingShow = false;
						_this.cardInfo.push(value);
					}
				});
				
			}else{
				this.alertInfo('卡号不能为空')
			}
		},
		//添加杭州通卡到数据库
		addCardToData: function(value){
			let _this = this;
			return new Promise(function(resolve){
				getData("/big_data/ajax/relation.php",'post',{"cmd": "add","cardno":value},resolve);
				//resolve({status:'ok'});//离线测试
			}).then(function(value){
				let status = value.status;
				if(status==='failed'){
					console.log("卡号写入数据库失败");
				}else{
					console.log("卡号写入数据库成功")
				}
				return status;
			})
		},
		//删除杭州通卡
		delCard: function(key){
			let thisValue = this.cardInfo[key];
			this.cardInfo.splice(key,1);
			this.delCardInData(thisValue);
		},
		//删除数据库中的该杭州通卡
		delCardInData: function(value){
			new Promise(function(resolve){
				getData("/big_data/ajax/relation.php",'post',{"cmd": "remove","cardno":value},resolve);
				//resolve({status:'ok'});////离线测试
			}).then(function(value){
				let status = value.status;
				if(status==='ok'){
					console.log("删除数据库中该卡号成功")
				}else{
					console.log("删除数据库中该卡号失败")
				}
			})
		},
		setValue: function(name,value){//设置实例属性值
			this[name] = value;
		},
		getValue: function(name){//设置实例属性值
			return this[name];
		},
		//通过手机号获取用户id,用户名,等级和卡信息
		getUserInfo: function(){
			let _this = this;
			return	new Promise(function(resolve){//获取用户信息
				_this.dataLoadingShow = true;
				getData("/big_data/ajax/auth.php",'post',{"cmd": "getUserSummary"},resolve);
				//let json = {userlevel:2,userid:'2349skdjfi923jsid'};//离线测试
				//resolve(json);
			}).then(function(value){
				_this.userName = parseInt(value.userlevel)<2?"未实名":((value.username===undefined||value.username===""||value.username==="unknown")?"已实名":value.username);//通过用户级别显示实名或未实名，暂不显示昵称
				_this.userId = value.userid||'';
				_this.userlevel = parseInt(value.userlevel)||'';
				//获取用户卡信息
				return new Promise(function(resolve){
					getData("/big_data/ajax/relation.php",'post',{"cmd": "query"},resolve);
					//let json = {cards:[{cardno:'EX001'},{cardno:'EX002'},{cardno:'EX003'}],status:'ok'};
					//resolve(json)//离线测试
				}).then(function(value){
					_this.dataLoadingShow = false;
					status = value.status;
					console.log(value)
					if(status!='fail'){
						let cards = value.cards;
						for(let i=0;i<cards.length;i++){
							if(cards[i].cardtype!=='smk'){//市民卡默认不显示
								_this.cardInfo.push(cards[i].cardno);
							}
						}
					}else{
						console.log("您没有绑定任何卡！")
					}
					return status;
				})
				
			})
				
		},
		getCardInfo: function(){
			let _this = this;
			//下述数据通过手机号ajax获取
			//sessionStorage.clear()
			return new Promise(function(resolve,reject){
				_this.dataLoadingShow = true;
				//if(!sessionStorage.getItem('cardInfo')){
					let searchMouth = _this.monthNum*1<9?(new Date().getFullYear()+'0'+_this.monthNum):(new Date().getFullYear()+''+_this.monthNum)
					getData("/big_data/ajax/monkey.php",'post',{"monthcode": searchMouth},resolve);
//					let json = {//离线测试
//						status:'ok',
//						cardInfo:{
//							bus_count: 23,	//公交乘坐次数
//							subway_count: 74,	//地铁乘坐次数
//							park_count: 16,	//P+R停车次数
//							ride_time: 3284,	//乘车时间（h）
//							ride_km: 110,		//乘车里程（km）
//							westlake_round: 3.4,	//绕西湖圈数
//							fitness_count: 2,	//校园健身次数
//							fitness_time: 4,	//校园健身时间
//							save_electricity: 100,	//节省电量
//							online_recharge_count: 5,	//线上充值次数
//							online_recharge_money: 240,	//线上充值金额（元，2位小数）
//							medical_count: 3,	//医疗预约次数
//							inter_room_settlement: 2,	//诊间结算次数
//							save_wait_time: 43,	//节省排队时间
//							cost_money: 486.32,	//本月总消费金额（元，2位小数）
//							save_money: 56.21,	//本月节省金额（元，2位小数）
//							bus_cost: 100.8,		//公交花费（元，2位小数）
//							subway_cost: 56.10,	//地铁花费（元，2位小数）
//							park_cost: 30.24,	//P+R花费
//							save_co2: 130,		//节省CO2排放量
//							save_rank: 40	//碳节省打败人数百分比
//						}
//					};
//					resolve(json)
				//}else{
					//resolve(JSON.parse(sessionStorage.getItem('cardInfo')))
				//}
			}).then(function(value){
				let status = value.status;
				let cardInfo = value.cardInfo;
				//sessionStorage.setItem('cardInfo',JSON.stringify(value));//暂存数据，刷新可用避免重新请求
				console.log(value)
				if(status==='ok'){
					_this.dataLoadingShow = false;
					_this.bill.bus_count= cardInfo.bus_count*1;	//公交乘坐次数
					_this.bill.subway_count= cardInfo.subway_count*1;	//地铁乘坐次数
					_this.bill.park_count= cardInfo.park_count*1;	//P+R停车次数
					_this.bill.ride_time= cardInfo.ride_time*1;	//乘车时间（h）
					_this.bill.ride_km= cardInfo.ride_km*1;		//乘车里程（km）
					_this.bill.westlake_round= cardInfo.westlake_round*1;	//绕西湖圈数
					_this.bill.fitness_count= cardInfo.fitness_count*1;	//校园健身次数
					_this.bill.fitness_time= cardInfo.fitness_time*1;	//校园健身时间
					_this.bill.save_electricity= cardInfo.save_electricity*1;	//节省电量
					_this.bill.online_recharge_count= cardInfo.online_recharge_count*1;	//线上充值次数
					_this.bill.online_recharge_money= cardInfo.online_recharge_money*1;	//线上充值金额（元，2位小数）
					_this.bill.medical_count= cardInfo.medical_count*1;	//医疗预约次数
					_this.bill.inter_room_settlement= cardInfo.inter_room_settlement*1;	//诊间结算次数
					_this.bill.save_wait_time= cardInfo.save_wait_time*1;	//节省排队时间
					_this.bill.cost_money= cardInfo.cost_money*1;	//本月总消费金额（元，2位小数）
					_this.bill.save_money= cardInfo.save_money*1;	//本月节省金额（元，2位小数）
					_this.bill.bus_cost= cardInfo.bus_cost*1;		//公交花费（元，2位小数）
					_this.bill.subway_cost= cardInfo.subway_cost*1;	//地铁花费（元，2位小数）
					_this.bill.park_cost= cardInfo.park_cost*1;	//P+R花费
					_this.bill.save_co2= cardInfo.save_co2*1;		//节省CO2排放量
					_this.bill.save_rank= cardInfo.save_rank*1;	//碳节省打败人数百分比
					return "ok";
				}else{
					_this.dataLoadingShow = false;
					return "fail";
				}
			})
		},
		//登录系统
		loginIn: function(){
			let _this = this;//存储this对象，不然then中的this指向的非vue实例
			_this.clickOnce===false?_this.clickOnce=true:(function(){return;})()//此步程序基本走完才能再次点击
			let phoneNum = this.phoneNum;
			let codeNum = this.codeNum;
			if(!phoneNum||!codeNum){
				this.alertInfo("手机号或验证码不能为空，请确认！")
			}else{
				this.checkCode().then(function(value){
					if(value!='fail'){
						$("#getYzm").html()==='获取验证码'
						?(function(){return;})()
						:$("#getYzm").html(0+'s');//关闭倒计时以防退出再看到倒计时
						_this.getUserInfo().then(function(value){
							console.log(value)
							//if(value==='ok'){
								let userId = _this.userId;
								_this.storeId(userId);
								//_this.storePhone(phoneNum);
								_this.loginConShow = false;
								_this.initSearchPage();//初始化查询页面
								_this.goReal()//登录时显示提示信息
//							}else{
//								_this.alertInfo("用户信息获取失败");
//							}
						})
					}else{
						return;
					}
					_this.clickOnce = false;
				});
				
			}
		},
		//推出系统
		loginOut: function(){
			localStorage.clear()//如果点击退出则清空本地数据
			this.init();
		},
		//查询数据
		search: function(){
			let _this=this;
			this.getCardInfo().then(function(value){
				if(value==='ok'){
					//分享  放在这里是为了不需要进入最后一页点击分享才能分享的需求
					_this.shareTo();//为分享数据赋值
					if(_this.isWeiXin()){//开启微信分享事件监听
						_this.shareToWx();
					}
					_this.removePage();
					_this.removeSlideCon();//控制内容显隐
					new Promise(function(resolve){
							_this.swiper.init();//重新初始化（删除或隐藏页面后需要重新初始化swiper）
							resolve(value);
						}).then(function(value){
							if(value){
								_this.swiper.slideNext();
							}else{
								_this.alertInfo("swiper失败，联系程序狗！")
							}
					})
					
				}else{
					_this.alertInfo("您未添加任何卡，市民卡添加请至【杭州市民卡】APP,杭州通卡请在本页添加！")
				}
				
			})
		},
		//存储用户id到本地
		storeId: function(data){
			localStorage.setItem('userId',data);
		},
		//存储用户手机号到本地
//		storePhone: function(data){
//			localStorage.setItem('phoneNum',data);
//		}
		share: function(){
			//this.shareTo();
			 //分享
			if(this.isWeiXin()){
				//this.shareToWx();
				this.wxShareShow = true;
			}else if(this.isApp('smkVersion')){//sessionStorage.appversion >= "3.4.1"
				jsBridge.setShareInfo({
				    title:this.shareDataForMessage.title,
				    content:this.shareDataForMessage.desc,
				    imageUrl:this.shareDataForMessage.imgUrl,
				    shareUrl:this.shareDataForMessage.link
			    })
            } else {
                this.alertInfo("请用浏览器自带分享~")
            }
		},
		closeWxShare: function($event){//点击mask关闭mask
			let thisObj = $($event.target);
			let maskChild = thisObj.children();
			for(let i=0;i<maskChild.length;i++){
				if(maskChild.eq(i)===thisObj){
					return;
				}else{
					this.wxShareShow = false;
				}
			}
		},
		shareToWx: function(){
			let _this = this;
			wx.config(wx_conf);
			if (typeof wx != 'undefined') {
			   	wx.ready(function(){
			        // 分享到朋友圈
			        wx.onMenuShareTimeline(
			            _this.shareDataForTimeLine
			        );
			        // 分享给朋友
			        wx.onMenuShareAppMessage(
			            _this.shareDataForMessage
			        );
			        // 分享到QQ
			        wx.onMenuShareQQ(
			            _this.shareDataForMessage
			        );
			        // 分享到QQ空间
			        wx.onMenuShareQZone(
			            _this.shareDataForMessage
			        );
			        wx.hideMenuItems({
			            menuList: [
			                       'menuItem:exposeArticle', //举报
			                       'menuItem:setFont',
			                       'menuItem:refresh',
			                       'menuItem:originPage',
			                       'menuItem:readMode',
			                       'menuItem:share:email'
			                       ] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
			        });
			    }); 
			}
		},
		shareTo: function(){
			let _this = this;
			let url = window.location.href.substring(0,window.location.href.lastIndexOf('/')+1);
			let shareUrl = url + "share.html?"
					+ "ADTAG=yy.qt"//移动部门数据监测
                    + "&save_co2=" + this.bill.save_co2//减排
                    + "&save_rank=" + this.bill.save_rank//排名
                    + "&goOut=" + (this.bill.bus_count*1+this.bill.subway_count*1+this.bill.park_count*1)//绿色出行
                    + "&cost=" + (this.bill.cost_money*1)//绿色消费
                    + "&fitness_count=" + this.bill.fitness_count//校园健身
                    + "&save_electricity=" + this.bill.save_electricity//节省电量
                    + "&save_wait_time=" + this.bill.save_wait_time//节省排队时间
                    + "&save_money=" + this.bill.save_money//本月节省金额
                    + "&monthNum=" + this.monthNum//当前月份
                    + "&userId=" + md5(this.userId);//用户id方便数据监测记录(md5加密)
			let imgUrl = url+"img/shareImg.jpg";//待定
			console.log(shareUrl)
			//主要解决分享中小图片不能显示的问题。
			this.shareDataForMessage = {
			        imgUrl: imgUrl,
			        link:shareUrl,
			        title: '看我'+parseInt(this.monthNum)+'月份的绿色生活月刊',// 分享标题
			        desc: "本月我打败了"+this.bill.save_rank+"%的大杭州用户，你呢？还不快来看看！",
			        success: function (){
			            //执行添加机会
			            _this.wxShareShow = false;
			        },
			        cancel: function (){
			        	 _this.wxShareShow = false;
			        }   
			    };
			this.shareDataForTimeLine = {
			        imgUrl: imgUrl,
			        link:shareUrl,
			        title: '看我'+(this.monthNum)+'月份的绿色生活月刊',// 分享标题
			        desc: '本月我打败了'+this.bill.save_rank*1+'%的大杭州用户，你呢？还不快来看看！',
			        success: function () {
			            //执行添加机会
			             _this.wxShareShow = false;
			        },
			        cancel: function () {
			        	 _this.wxShareShow = false;
			        }   
			    };          
		}
	}
	
})