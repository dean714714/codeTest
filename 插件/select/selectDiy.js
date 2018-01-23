
//适用于ie5及以上浏览器

(function(ev){
	
	var operaDefault = {
		//这里得配置主要针对内部箭头得定制，外部得样式可自行编写样式;
		value: ['请添加自己得数据'],//select选项
		arrowText: "<b>></b>",
		arrowDefault: {//默认样式
			"position":'relative',
			"float":"right",
			"width":'42px',
			"height":"100%",
			"background": "#ffff66",
			"text-align": "center",
			"color": "#222200"
		},
		arrowActive: {//激活后样式
			//"background": "#ff0000",
		},
		callback: function(index,value){
			console.log(index+":"+value);
		}
	}

	function SelectDiy(el,operations){
		
		this.el = el;
		this.operations = (function(){//合并配置选项
			var obj = {};
			for(var key in operaDefault){
				if(operations[key]){
					obj[key] = operations[key];
				}else{
					obj[key] = operaDefault[key];
				}
			}
			return obj;
		})();
		this.activeOption = {//实例化后带上当前激活选项得索引和值
			index: 0,
			value: this.operations.value[0]
		}
		var $arrow = document.createElement("div"),$arrowStyle="";
		var $input = document.createElement("div"),$inputStyle="";
		var $select = document.createElement("select"),$selectStyle="";
		var _this = this;
		
		this.el.style.cssText = "position:relative;"
		
		//内容dom生成
		$input.style.cssText = "height:100%;overflow:hidden;white-space:norwarp;text-overflow:ellipsis;";	
		$input.innerHTML = "&nbsp;"+this.operations.value[0];
		//select dom生成
		$select.style.cssText = "position:absolute;left:0;top:0;width:100%;height:100%;opacity:0;filter:alpha(opacity=0);border:none;outline:none;";
		
		//option dom生成
		for(var i=0;i<this.operations.value.length;i++){
			var $option = document.createElement("option");
			$option.value = this.operations.value[i];
			$option.innerHTML = this.operations.value[i];
			$select.appendChild($option);
		}
		
		if(document.addEventListener){
			$select.addEventListener('change',function(ev){
				var event = ev||event,
				_thisDom = event.srcElement||event.target,
				_thisChils = _thisDom.children;
				$input.innerHTML = "&nbsp;"+_thisChils[_thisDom.selectedIndex].value;
				_this.activeOption = {//实例化后带上当前激活选项得索引和值
					index: _thisDom.selectedIndex,
					value: _thisChils[_thisDom.selectedIndex].value
				}
				_this.operations.callback(_thisDom.selectedIndex,_thisChils[_thisDom.selectedIndex].value);//选择后得回调
				
				//console.log(_this.selectedIndex);
			})
		}else if(document.attachEvent){
			$select.attachEvent('onchange',function(ev){
				var event = ev||event,
				_thisDom = event.srcElement||event.target,
				_thisChils = _thisDom.children; 
				$input.innerHTML = "&nbsp;"+_thisChils[_thisDom.selectedIndex].value;
				_this.activeOption = {//实例化后带上当前激活选项得索引和值
					index: _thisDom.selectedIndex,
					value: _thisChils[_thisDom.selectedIndex].value
				}
				_this.operations.callback(_thisDom.selectedIndex,_thisChils[_thisDom.selectedIndex].value);//选择后得回调
				
				//console.log(_this.selectedIndex);
			})
		}else{
			alert("selectDiy浏览器不支持，请使用更高版本得浏览器")
		}
		
		if(document.addEventListener){
			this.el.addEventListener('click',function(ev){
				var event = ev||event,
				_thisDom = event.srcElement||event.target;
				if(_thisDom.tagName==='OPTION'){
					//event.preventdefault();
					$arrow.style.cssText = "";
					var style1 = "";
					for(var key in _this.operations.arrowDefault){
						style1 += key+":"+_this.operations.arrowDefault[key]+';';
					}
					$arrow.style.cssText = style1;
					return;
				};
				$arrow.style.cssText = "";
				var style1 = "",style2="";
				for(var key in _this.operations.arrowDefault){
					style1 += key+":"+_this.operations.arrowDefault[key]+';';
				}
				for(var key in _this.operations.arrowActive){
					style2 += key+":"+_this.operations.arrowActive[key]+';';
				}
				
				$arrow.style.cssText = style1+style2;	
			})
		}else if(document.attachEvent){
			this.el.attachEvent('onclick',function(ev){
				var event = ev||event,
				_thisDom = event.srcElement||event.target;
				if(_thisDom.tagName==='OPTION'){
					//event.preventdefault();
					$arrow.style.cssText = "";
					var style1 = "";
					for(var key in _this.operations.arrowDefault){
						style1 += key+":"+_this.operations.arrowDefault[key]+';';
					}
					$arrow.style.cssText = style1;
					return;
				};
				$arrow.style.cssText = "";
				var style1 = "",style2="";
				for(var key in _this.operations.arrowDefault){
					style1 += key+":"+_this.operations.arrowDefault[key]+';';
				}
				for(var key in _this.operations.arrowActive){
					style2 += key+":"+_this.operations.arrowActive[key]+';';
				}
				
				$arrow.style.cssText = style1+style2;	
			})
		}else{
			alert("selectDiy浏览器不支持，请使用更高版本得浏览器")
		}
		
		
		//箭头dom生成
		for(var key in this.operations.arrowDefault){
			$arrowStyle += key+":"+this.operations.arrowDefault[key]+';';
		}
		$arrow.style.cssText = $arrowStyle;
		//console.log($arrow)
		$arrow.innerHTML = this.operations.arrowText;
		
		this.el.appendChild($arrow);
		this.el.appendChild($input);
		this.el.appendChild($select);
		
		this.setValue = function(value){
			this.operations.value = value;
			$select.innerHTML = "";
			for(var i=0;i<this.operations.value.length;i++){
				var $option = document.createElement("option");
				$option.value = this.operations.value[i];
				$option.innerHTML = this.operations.value[i];
				$select.appendChild($option);
			}
			$input.innerHTML = "&nbsp;"+this.operations.value[0];
			_this.activeOption = {//实例化后带上当前激活选项得索引和值
				index: 0,
				value: this.operations.value[0]
			}
		}
		
		//本来是下诉方式，改用上诉函数传参得方式，因为下诉方式在ie8中只对dom对象有效对普通对象无效
//		Object.defineProperty(this,"_operations",{//访问器属性，进行读写事件绑定
//			get: function(){
//				return this.operations.value;
//			},
//			set: function(value){
//				
//			}
//		})
//		
	}
	
	ev.SelectDiy = SelectDiy;
	
})(window)