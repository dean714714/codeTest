
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

window.onload = function(){
	
	addVal = 100;//终止index页面中的动画
	
}
var app = new Vue({
	el:'#app',
	data:{
		actionMaskShow:false,//信息提示框显隐
		dataLoadingShow:false,//数据加载菊花显隐
		wxShareShow:false,
		actionInfo:'',
		swiper:{},
		monthNum: 1,//new Date().getMonth()+1
		bill:{//账单信息
			save_co2: 0,
			save_rank: 0,
			goOut: 0,
			cost: 0,
			fitness_count: 0,
			save_electricity: 0,
			save_wait_time: 0,
			save_money: 0
		},
		shareDataForTimeLine: {},
		shareDataForMessage: {}
	},
	mounted: function(){
		let _this = this;
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
			_this.init();
			document.querySelector('#swiperApp').style.display = 'block';
			_this.mySwiper();
			_this.shareTo();
			_this.shareToWx();
		})
		
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
					
					let $counter = $(swiper.slides[0]).find('.counter');
					$counter.each(function(){
						let thisValue = $(this).html();
						$(this).SmkScrollNumber({
	                        num: _this.bill[$(this).data('val')]||0,
	                        speed: 1000
	                    })
					})
				},
				onSlideChangeEnd: function(swiper) { }
			})
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
		init: function(){
			//从链接中获取数据
			let url = window.location.href;
			let data = {};
			if(!url.split('?')[1]||url.split('?')[1].split('&').length<2){
				this.alertInfo("看样子你的好用分享了一个空盒子给你！")
			}else{
				let orignData = url.split('?')[1].split('&');
				for(let i=0;i<orignData.length;i++){
					data[orignData[i].split("=")[0]] = orignData[i].split("=")[1]*1;
				}
				for(let item in data){
					if(item==='monthNum'){
						this.monthNum = data[item];
					}
					if(this.bill.hasOwnProperty(item)){
						this.bill[item] = data[item]||0;
					}
				}
			}
		},
		share: function(){//打开个人账单页面
			let url = window.location.href.split('share.html')[0] + "index.html?ADTAG=yy.qt"
			window.location.href = url;
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
			let shareUrl = window.location.href;
			let imgUrl = window.location.href.substring(0,window.location.href.lastIndexOf('/')+1)+"img/shareImg.jpg";//待定
			//主要解决分享中小图片不能显示的问题。
			this.shareDataForMessage = {
			        imgUrl: imgUrl,
			        link:shareUrl,
			        title: '看我'+parseInt(this.monthNum)+'月份的绿色生活月刊',// 分享标题
			        desc: "本月我打败了"+this.bill.save_rank+"%的大杭州用户，你呢？还不快来看看！",
			        success: function (){
			            //执行添加机会
			        },
			        cancel: function (){
			        }   
			    };
			this.shareDataForTimeLine = {
			        imgUrl: imgUrl,
			        link:shareUrl,
			        title: '看我'+(this.monthNum)+'月份的绿色生活月刊',// 分享标题
			        desc: '本月我打败了'+this.bill.save_rank+'%的大杭州用户，你呢？还不快来看看！',
			        success: function () {
			            //执行添加机会
			        },
			        cancel: function () {
			        }   
			    };          
		}
	}
	
})