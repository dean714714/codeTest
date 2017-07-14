function getData(url,rqType,para,callback){
	
	$.ajax({
		type:rqType,
		url:url,
		async:false,
		dataType:'json',
		data:para,
		success:callback,
		error:function(){
			alert("数据请求失败！请稍后重试！");
		}
	});
	
}
