
(function(ev){
	
	var defaultOptions = {
		selectClass: '',//选中dom添加的类
		algorithm: '',//算法
		during: 1000,//总时长(毫秒)
		loop: 0,//几圈，
		target: 5,//最终定位元素index，0开始
	};
	
	function Lottery(domArr,options){//飞碟构造函数
		
		this.domArr = domArr;
		this.options = (function(){//合并设置
			var obj = (function(){
				var o = {};
				for(key in defaultOptions){
					o[key] = defaultOptions[key];
				}
				return o;
			})();
			for(key in options){
				obj[key] = options[key];
			}
			return obj;
		})();
		
		var op = this.options;
		var domA = this.domArr;
		this.start = function(callback){
			var cutTime = op.during/((op.target+1)+domA.length*op.loop);//间隔时间
			var index = 0,loop = op.loop,arg=arguments[0];
			
			var xl = setInterval(function(){
				
				for(var i=0;i<domA.length;i++){//剔除已有的selectClass
					var oldClass = domA[i].getAttribute('class')?domA[i].getAttribute('class').split(" "):[];
					for(var j=0;j<oldClass.length;j++){
						if(oldClass[j]===op.selectClass){
							oldClass.splice(j,1);
						}
					}
					domA[i].setAttribute('class',oldClass.join(" "));
				}
				domA[index].setAttribute('class',op.selectClass);
				if(loop>0){
					index++;
					if(index===domA.length){
						index=0;
						loop--;
					}
				}else{
					index++;
					if(index===op.target+1){
						clearInterval(xl);
						if(arg&&(arg instanceof Function))arg();
					}
				}
				
			},cutTime)
		}
		
		
	}
	
	ev.Lottery = Lottery;
	
})(window)
