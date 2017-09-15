
var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');

request('http://image.baidu.com/search/acjson?tn=resultjson_com&ipn=rj&ct=201326592&is=&fp=result&queryWord=%E7%8C%AB&cl=2&lm=-1&ie=utf-8&oe=utf-8&adpicid=&st=&z=&ic=&word=%E7%8C%AB&s=&se=&tab=&width=&height=&face=&istype=&qc=&nc=1&fr=&pn=330&rn=30&gsm=14a&1505460971255=',function(error,response,body){
	
	if(!error&&response.statusCode===200){
		var data = JSON.parse(body).data,urlArr=[];
		for(var i=0;i<data.length;i++){
			urlArr.push(data[i]['hoverURL'])
		}
		//console.log(JSON.stringify(urlArr))
		var options = {
			url: urlArr[0],
			headers: {
				Referer: "http://www.baidu.com"
			}
		}
		var callback = function(error,response,body){
			//console.log(response.statusCode);
			if(!error&&response.statusCode===200){
				fs.createWriteStream('./hello.png',body)
				//console.log(body)
			}
		}
		request(options,callback);
	}
	
})
