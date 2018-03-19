(function(ev){
	
	var optDefault = {//默认配置
		pageNumber: 10,//总页数
		defaultIndex: 0,//默认选中第几页,0起
		pageBtn: {
			'info': ['上一页','下一页'],
			'style': {
				activeStyle: {//默认样式
					'width': '80px',
					'height': '32px',
					'line-height': '32px',
					'background': '#00aa00'
					'color': '#fff'
				},
				grayStyle: {//无法点击得样式
					'width': '80px',
					'height': '32px',
					'line-height': '32px',
					'background': '#ccc'
					'color': '#fff'
				}
			}
		},
		pageDot: {
			'template': '第n页',//n为占位符
			'style': {
				activeStyle: {//默认样式
					'width': '40px',
					'height': '32px',
					'line-height': '32px',
					'background': '#00aa00'
					'color': '#fff'
				},
				grayStyle: {//无法点击得样式
					'width': '40px',
					'height': '32px',
					'line-height': '32px',
					'background': '#ccc'
					'color': '#fff'
				}
			}
		}
		
	}
	
	function bornStyle(styleObj){//对象转样式字符串
		var _style = '';
		for(var key in styleObj){
			_style += key+':'+styleObj[key]+';'
		}
		return _style;
	}
	
	function Paginate(el,options){
		this.options = (function(){//合并配置选项
			var obj = {};
			for(var key in optDefault){
				if(options[key]){
					obj[key] = options[key];
				}else{
					obj[key] = optDefault[key];
				}
			}
			return obj;
		})();
		var $el = el;
		var $backWard = document.createElement('div');
		var $forWard = document.createElement('div');
		var $dotBox = document.createElement('div');
		$backWard.innerHTML = this.options.pageBtn.info[0];
		$forWard.innerHTML = this.options.pageBtn.info[1];
		backWardStyle = this.options.defaultIndex===0
						?this.options.pageBtn.style.grayStyle
						:this.options.pageBtn.style.activeStyle;
		forWardStyle  = this.options.defaultIndex===this.options.pageNumber-1
						?this.options.pageBtn.style.grayStyle
						:this.options.pageBtn.style.activeStyle;
		$backWard.style.cssText = bornStyle(backWardStyle);
		$forWard.style.cssText = bornStyle(forWardStyle);
		for(var i=0,len=this.options.pageNumber,spill=len-5;i<len;i++){
			var $dot = document.createElement('div');
			if(i<5){
				$dot.innerHTML = i+1;
			}else if(spill===1){
				$dot.innerHTML = i+1;
			}else{
				$dot.innerHTML = len;
				$dotBox.appendChild($dot);
				break;
			}
			$dotBox.appendChild($dot);
		}
	}
	
	ev.Paginate = Paginate;
	
})(window)
