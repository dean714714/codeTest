function getData(url,rqType,para,callback){
	//alert("执行了")
	$.ajax({
		type:rqType,
		url:url,
		async:false,
//		dataType:'json',
		data:para,
		success:function(data){
			callback(data);
		},
		error:function(a){
			//callback("数据请求失败！请稍后重试！");
			var url = window.location.href.substring(0,window.location.href.lastIndexOf('/')+1);
			var errorUrl = url+'error.html';
			window.location.href = errorUrl;
		}
	});
	
}
