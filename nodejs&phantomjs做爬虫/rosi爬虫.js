
var http = require('http');
var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');
var path = require('path');
var rp = require('request-promise');
var querystring = require('querystring');

//配置下载选项
var _size = 9;//不写：全部尺寸；9：特大尺寸；3：大尺寸；2：中尺寸；1：小尺寸
var _Word = encodeURIComponent('娜美');//查询关键词,一定转成ASCII编码不然会报The header content contains invalid characters
var _time = new Date().getTime()+'';//每次查询添加时间挫
var _pn = 90;
var _rn = 30;

//下载连接（采用函数方式便于每次调用采用不同时间挫）
var searchUrl = 'http://www.99mm.me/';
//var searchUrl = 'https://www.zhainanfulishe.net/tag/rosi';


//请求GO
var linkDB = [];
(function getLink(url){
	var encodeUrl = encodeURI(url);
	request(encodeUrl,function(error,response,body){
		//console.log(response.statusCode);
		if(!error&&response.statusCode===200){
			var htmlStr = body;
			var $ = cheerio.load(htmlStr);
			var $a = $("a");
			var $img = $('img');
			var _link = (function(){//存储页面的链接，包括a标签链接和图片链接
				var obj = {aTag:[],imgTag:[]};
				for(var i=0;i<arguments.length;i++){
					arguments[i].each(function(){
						if(/99mm/.test($(this).attr('href'))||/99mm/.test($(this).attr('src'))){
							//console.log($(this).attr('href')||$(this).attr('src'));
							if(/http/.test($(this).attr('href'))||/http/.test($(this).attr('src'))){
								if((typeof $(this).attr('href'))!=='undefined'){
									obj['aTag'].push($(this).attr('href'));//+"?"+new Date().getTime()
								}else{
									//if(/src/.test($(this).attr('src'))){//有些图片大图链接藏在
									//}
									obj['imgTag'].push($(this).attr('src'));
									loadImg($(this).attr('src'));
								}
							}else{
								if((typeof $(this).attr('href'))!=='undefined'){
									obj['aTag'].push(encodeUrl+$(this).attr('href'));
								}else{
									obj['imgTag'].push(encodeUrl+$(this).attr('src'));
									loadImg(encodeUrl+$(this).attr('src'));
								}
							}
						}
					})
				}
				return obj;
			})($a,$img);
			
			if(_link.aTag.length>0||_link.imgTag.length>0){
				linkDB.push(_link);
			}
			
			//console.log(_link.imgTag);
			for(var j=0;j<_link.aTag.length;j++){
				//(function(i){
					//setTimeout(function(){
						getLink(_link.aTag[j]);
					//},400*i)
				//})(j)
			}
			
		}else if(error){
			console.log("错误："+error.message);
		}
		
	})
	
})(searchUrl)

function loadImg(url){
	var options = {
		uri: url,
		encoding: null,
		headers: {
			"Referer": searchUrl
		}
	};
	rp(options).then(function(data){
		fs.writeFile('./img/'+path.basename(options.uri)+'.jpg',data,function(err){
			if(err){
				console.log(path.basename(options.uri)+"———下载失败！")
			}else{
				console.log(path.basename(options.uri)+"———下载成功！")
			}
		});
	})
}
