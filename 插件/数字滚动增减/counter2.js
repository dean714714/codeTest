
(function(ev){
	
	function Counter(dom,options){
		var $dom = dom;
		var obj = {};
		var optionsDefault = {
			fromN:$dom.innerHTML*1,//初始值
			toN:0,//最终值
			lazy:0,//延时
			during:'1s',//历时
		};
		
		var fontSize = getCurrentStyle($dom).fontSize;
		var letterWidth = parseFloat((getCurrentStyle($dom).width))*1/($dom.innerHTML.length*1);
		$dom.style.lineHeight = fontSize;//取消内敛元素的边距
		
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
			var length = (optionsDefault.fromN+'').length>(optionsDefault.toN+'').length?(optionsDefault.fromN+'').length:(optionsDefault.toN+'').length;
			$dom.innerHTML = '';
			var fromNarr = (optionsDefault.fromN+'').split('');
			var _num = ['0','1','2','3','4','5','6','7','8','9','.'];
			var $numPosArr = [];
			for(var i=0;i<length;i++){
				var $numBox = document.createElement('span');
				var $numPos = document.createElement('span');//每个数字的滚动数字组
				$numBox.style.float = "left";
				$numBox.style.height = fontSize;
				$numBox.style.width = letterWidth+'px';
				//$numBox.style.background = 'red';
				$numBox.style.overflow = 'hidden';
				$numBox.style.position = 'relative';
				$numBox.style.display = 'inline-block';
				$numPos.style.position = 'absolute';
				$numPos.style.transition = 'all '+optionsDefault.during;
				$numPosArr.push($numPos);
				for(var j=0;j<11;j++){
					var $num = document.createElement('div');
					$num.style.height = fontSize;
					$num.style.width = letterWidth+'px';
					$num.style.lineHeight = fontSize;
					$num.style.textAlign = 'center';
					$num.innerHTML = _num[j];
					$numPos.appendChild($num);
					//console.log($numPos);
				}
				$numBox.appendChild($numPos);
				$dom.appendChild($numBox)
			};
			
			var $numPosArr_b = $numPosArr.reverse(),fromNarr_b = fromNarr.reverse();
			
			for(var j=0;j<$numPosArr_b.length;j++){
				if(fromNarr_b[j]){
					$numPosArr_b[j].style.top = (function(){
						if(fromNarr_b[j]==='.'){
							return 10*fontSize.split('px')[0]*-1+'px';
						}else{
							return parseInt(fromNarr_b[j])*fontSize.split('px')[0]*-1+'px';
						}
					})();
				}else{
					$numPosArr_b[j].style.top = 0;
				}
				
			}
			
			return $numPosArr;
		}
		
		function numAni(domArr){
			var $numPosArr_b = domArr,toNarr_b = (optionsDefault.toN+'').split('').reverse();
			
			for(var j=0;j<$numPosArr_b.length;j++){
				if(toNarr_b[j]){
					$numPosArr_b[j].style.top = (function(){
						if(toNarr_b[j]==='.'){
							return 10*fontSize.split('px')[0]*-1+'px';
						}else{
							return parseInt(toNarr_b[j])*fontSize.split('px')[0]*-1+'px';
						}
					})();
				}else{
					$numPosArr_b[j].style.top = 0;
				}
				
			}
//			setTimeout(function(){
//				$dom.innerHTML = options.toN;
//			},parseFloat(options.during)*1000)
		}
		
		this.dom = dom;
		this.options = (function(){
			var oldOptions = optionsDefault;
			for(opt in options){
				oldOptions[opt] = options[opt];
			}
			return oldOptions;
		})();
		
		Object.defineProperty(this.options,'setToN',{
			get: function(){
				return "this operation is not allowed!";
			},
			set: function(val){
				var _this = this;
				_this.toN = val;
				var domArr = resetNum();
				setTimeout(function(){
					numAni(domArr);
				},_this.lazy);
				//return this.toN;
			}
		})
	}
	
	ev.Counter = Counter;
	
})(window)
