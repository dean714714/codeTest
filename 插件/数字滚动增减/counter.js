
(function(){
	
	var $counterObj = document.querySelector('.counter');
	var obj = {};
	var options = {
		fromN:$counterObj.innerHTML*1,//初始值
		toN:0,//最终值
		lazy:0,//延时
		during:1000,//历时
	};
	
	function getCurrentStyle(node) {
	    var style = null;
	    if(window.getComputedStyle) {
	        style = window.getComputedStyle(node, null);
	    }else{
	        style = node.currentStyle;
	    }
	    return style;
	}
	
	function resetNum(){
		var fontSize = getCurrentStyle($counterObj).fontSize;
		var length = options.fromN*1>options.toN*1?(options.fromN+'').length:(options.toN+'').length;
		$counterObj.innerHTML = '';
		var _num = ['0','1','2','3','4','5','6','7','8','9','.'];
		for(var i=0;i<length;i++){
			var $numBox = document.createElement('span');
			var $numPos = document.createElement('span');
			$numBox.style.height = fontSize;
			$numBox.style.width = fontSize;
			$numBox.style.background = 'red';
			$numBox.style.overflow = 'hidden';
			$numBox.style.position = 'relative';
			$numBox.style.display = 'inline-block';
			$numPos.style.position = 'absolute';
			$numPos.style.transition = 'all 1s';
			for(var j=0;j<11;j++){
				var $num = document.createElement('div');
				$num.style.height = fontSize;
				$num.style.width = fontSize;
				$num.style.lineHeight = fontSize;
				$num.style.textAlign = 'center';
				$num.innerHTML = _num[j];
				$numPos.appendChild($num);
				//console.log($numPos);
			}
			$numBox.appendChild($numPos);
			$counterObj.appendChild($numBox)
		}
	}
	
	function
	
	resetNum()
	
})()
