(function(ev){
	
	var optDefault = {//默认配置
		pageNumber: 10,//总页数
		defaultIndex: 1,//默认选中第几页,1起
		pageBtn: {
			'info': ['上一页','下一页'],//也可以是html字符串,如：<b>上一页</b>
			'style': {
				activeStyle: {
					//默认样式,因为merge()的逻辑，自定义样式只能使用下述预留的这些样式，不然会无效
					//空的值不会被合并
					'display':'inline-block',
					'width': '80px',
					'height': '32px',
					'font-size':'12px',
					'line-height': '32px',
					'background': '#999',
					'font-weight':'normal',
					'text-align':'center',
					'border': '',
					'position':'',
					'top':'',
					'left':'',
					'right':'',
					'bottom':'',
					'border-radius':'',
					'background-size':'',
					'letter-spacing':'',
					'box-sizing':'',
					'transform':'',
					'transition':'',
					'margin': '0 5px',
					'padding': '',
					'cursor': 'pointer',
					'color': '#fff'
				},
				grayStyle: {//无法点击得样式
					'display':'inline-block',
					'width': '80px',
					'height': '32px',
					'font-size':'12px',
					'line-height': '32px',
					'background': '#ccc',
					'font-weight':'normal',
					'text-align':'center',
					'border': '',
					'position':'',
					'top':'',
					'left':'',
					'right':'',
					'bottom':'',
					'border-radius':'',
					'background-size':'',
					'letter-spacing':'',
					'box-sizing':'',
					'transform':'',
					'transition':'',
					'margin': '0 5px',
					'padding': '',
					'cursor': '',
					'color': '#fff'
				}
			}
		},
		pageDot: {
			'template': 'n',//n为占位符，可设置如：'第n页'
			'style': {
				activeStyle: {//默认样式
					'display':'inline-block',
					'width': '40px',
					'height': '32px',
					'font-size':'12px',
					'line-height': '32px',
					'background': '#00aa00',
					'font-weight':'normal',
					'text-align':'center',
					'border': '',
					'position':'',
					'top':'',
					'left':'',
					'right':'',
					'bottom':'',
					'border-radius':'',
					'background-size':'',
					'letter-spacing':'',
					'box-sizing':'',
					'transform':'',
					'transition':'',
					'margin': '0 1px',
					'padding': '',
					'cursor': '',
					'color': '#fff'
				},
				grayStyle: {//无法点击得样式
					'display':'inline-block',
					'width': '40px',
					'height': '32px',
					'font-size':'12px',
					'line-height': '32px',
					'background': '#eaeaea',
					'font-weight':'normal',
					'text-align':'center',
					'border': '',
					'position':'',
					'top':'',
					'left':'',
					'right':'',
					'bottom':'',
					'border-radius':'',
					'background-size':'',
					'letter-spacing':'',
					'box-sizing':'',
					'transform':'',
					'transition':'',
					'margin': '0 1px',
					'padding': '',
					'cursor': 'pointer',
					'color': '#333'
				}
			}
		}
		
	}
	
	function bornStyle(styleObj){//对象转样式字符串
		var _style = '';
		for(var key in styleObj){
			if(styleObj[key])_style += key+':'+styleObj[key]+';'
		}
		return _style;
	}
	function addEvent (element,type,callback){//事件监听兼容写法
		if(element.addEventListener){
			element.addEventListener(type,callback,false)
		}else if(element.attachEvent){
			element.attachEvent('on'+type,callback)
		}
	}
	function merge(newObj,templateObj){//参照模板对象最小颗粒的合并对象(递归运算)
		var obj = {};
		for(var key in templateObj){
			if((templateObj[key] instanceof Object)&& !(templateObj[key] instanceof Array)){//如果是对象而不是数组或其他
				if((typeof newObj[key])!=='undefined'){
					obj[key] = merge(newObj[key],templateObj[key]);
				}else{
					obj[key] = templateObj[key];
				}
			}else{
				if((typeof newObj[key])!=='undefined'){
					obj[key] = newObj[key];
				}else{
					obj[key] = templateObj[key];
				}
			}
		}
		return obj;
	}
	
	function Paginate(el,options,callback){//callback为自定义的翻页后需要干的事
		var options = merge(options,optDefault);
		this.index = options.defaultIndex;
		var $el = el;
		var $backWard = document.createElement('span');
		var $forWard = document.createElement('span');
		var $dotBox = document.createElement('span');
		var newDomArr = [];
		var _this=this;
		for(var i=0;i<9;i++){
			//生成一组dom,变动其值和显隐来控制点击后的序列，理清思路发现最多9个节点
			var $dom = document.createElement('span');
			$dom.style.cssText = bornStyle(options.pageDot.style.grayStyle);
			addEvent($dom,'click',function(e){
				var e = e||event;
				var target = e.target||e.srcElement;
				var index = (function(){
					var i = target.innerHTML.match(/[\d...]/g).join('');
					i = i==='...'?false:i*1;
					return i
				})();
				_this.index = index;
				if(index)_this.render(index);
			})
			newDomArr.push($dom);
		}
		addEvent($backWard,'click',function(e){
			if(_this.index>1)_this.render(_this.index-1);
		})
		addEvent($forWard,'click',function(e){
			if(_this.index<options.pageNumber)_this.render(_this.index+1);
		})
		$backWard.innerHTML = options.pageBtn.info[0];
		$forWard.innerHTML = options.pageBtn.info[1];
		
		this.render = function(index){
			//console.time('cal');
			if(index<=0||index>options.pageNumber){
				console.log("页码不在选项区间内");
				//throw new Error("页码不在选项区间内");
				return;
			}
			this.index = index;
			var backWardStyle = index===1
							?options.pageBtn.style.grayStyle
							:options.pageBtn.style.activeStyle;
			var forWardStyle  = index===options.pageNumber
							?options.pageBtn.style.grayStyle
							:options.pageBtn.style.activeStyle;
			var dom = $dotBox,num = options.pageNumber;
			if(index-2>2&&index+3<num){
				for(var j=0,len=newDomArr.length;j<len;j++){
					newDomArr[j].style.cssText = bornStyle(options.pageDot.style.grayStyle);
					if(j===0||j===len-1){
						if(j===0){newDomArr[j].innerHTML = options.pageDot.template.replace(/n/,j+1);}else{
							newDomArr[j].innerHTML = options.pageDot.template.replace(/n/,num);
						}
					}else if(j===1||j===len-2){
						newDomArr[j].innerHTML = '...';
					}else{
						newDomArr[j].innerHTML = options.pageDot.template.replace(/n/,index-4+j);
						if(j===4){
							newDomArr[j].style.cssText = bornStyle(options.pageDot.style.activeStyle);
						}
					}
					dom.appendChild(newDomArr[j]);
				}
				
			}else if(index-2<=2&&index+3<num){
				for(var k=0,len=newDomArr.length;k<len;k++){
					newDomArr[k].style.cssText = bornStyle(options.pageDot.style.grayStyle);
					if(k<5){
						newDomArr[k].innerHTML = options.pageDot.template.replace(/n/,k+1);
						if(k===index-1){
							newDomArr[k].style.cssText = bornStyle(options.pageDot.style.activeStyle);
						}
					}else if(k===5){
						newDomArr[k].innerHTML = '...';
					}else if(k===len-1){
						newDomArr[k].innerHTML = options.pageDot.template.replace(/n/,num);
					}else{
						newDomArr[k].style.display = 'none';
					}
					dom.appendChild(newDomArr[k]);
				}
			}else if(index-2>2&&index+3>=num){
				for(var h=0,len=newDomArr.length;h<len;h++){
					newDomArr[h].style.cssText = bornStyle(options.pageDot.style.grayStyle);
					if(h===0||h===1){
						h===0&&(newDomArr[h].innerHTML = options.pageDot.template.replace(/n/,1));
						h===1&&(newDomArr[h].innerHTML = '...');
					}else if(h>=len-num+index-3){
						newDomArr[h].innerHTML = options.pageDot.template.replace(/n/,h-(len-1-num));
						if(num-index===len-1-h){
							newDomArr[h].style.cssText = bornStyle(options.pageDot.style.activeStyle);
						}
					}else{
						newDomArr[h].style.display = 'none';
					}
					dom.appendChild(newDomArr[h]);
				}
			}else if(index-2<=2&&index+3>=num){
				for(var m=0,len=newDomArr.length;m<len;m++){
					newDomArr[m].style.cssText = bornStyle(options.pageDot.style.grayStyle);
					if(m<num){
						newDomArr[m].innerHTML = options.pageDot.template.replace(/n/,m+1);
						if(index-1===m){
							newDomArr[m].style.cssText = bornStyle(options.pageDot.style.activeStyle);
						}
					}else{
						newDomArr[m].style.display = 'none';
					}
					dom.appendChild(newDomArr[m]);
				}
			}
			$backWard.style.cssText = bornStyle(backWardStyle);
			$forWard.style.cssText = bornStyle(forWardStyle);
			callback(this.index);//回调
			//console.timeEnd('cal');
		}
		this.render(options.defaultIndex);
		$el.appendChild($backWard);
		$el.appendChild($dotBox);
		$el.appendChild($forWard);
	}
	
	ev.Paginate = Paginate;
	
})(window)
