 function IEVersion() {//判断ie版本
 	var browser=navigator.appName
	if(browser!="Microsoft Internet Explorer"){
		return false;//不是ie浏览器
	}else{
		var b_version=navigator.appVersion
		var version=b_version.split(";");
		var trim_Version=version[1].replace(/[ ]/g,"");
		if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE6.0"){
			return 6;
		}
		else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE7.0"){
			return 7;
		}
		else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE8.0"){
			return 8;
		}
		else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE9.0"){
			return 9;
		}
	}
 } 


function getData(url,rqType,para,callback){//获取数据
	//加载提示
	var $load = document.createElement('div');
	$load.innerHTML = "加载中，请稍后...";
	$load.style.cssText = "width:160px;line-height:60px;text-align:center;color:#fff;background:#000;position: fixed;left: 50%;top: 50%;margin: -40px 0 0 -80px;z-index:100;border-radius: 10px;"
	document.body.appendChild($load);
	
	jQuery.support.cors=true;//ie8,9不支持服务器端设置CORS,加这句就行
//	if(IEVersion()&&IEVersion()<10){//如果是IE浏览器且版本在10以下
//		ieRequest(url,rqType,para,callback);
//	}else{//其他浏览器
		$.ajax({
			type:rqType,
			url:url,
			async:true,
			//dataType:'json',
			data:para,
			success:function(data){
				if(data.code==='103'){//系统出错处理机制
					var $div = document.createElement('div');
					$div.innerHTML = "系统内部出错，请刷新或稍后重试~";
					$div.style.cssText = "font-size: 24px;font-weight: bold;letter-spacing: 4px;color: #ccc;font-style: italic;display: block;text-align: center;margin: 100px auto;"
					document.body.innerHTML = "";
					document.body.appendChild($div);
					return;
				}
				callback(data);
				$load.parentNode.removeChild($load);//关闭加载提示
			},
			error:function(a){
				console.log(a)
				var $div = document.createElement('div');
				$div.innerHTML = "请求失败了，请刷新或稍后重试~";
				$div.style.cssText = "font-size: 24px;font-weight: bold;letter-spacing: 4px;color: #ccc;font-style: italic;display: block;text-align: center;margin: 100px auto;"
				document.body.innerHTML = "";
				document.body.appendChild($div)
			}
		});
	//}
	
	
	
	
}

