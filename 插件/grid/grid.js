//define(function(require,exports,module) {
	
	//var commonMethodUtil = require('tUtil/commonMethodUtil');
	//var EXPORTCONFIG = require('tUtil/exportConfig-default').EXPORTCONFIG;
	var _url = "http://10.16.67.41:8049";
	
	var gises = {//三个表格的数据
		cross: {},
		illegal: {},
		origin: {}
	},
	previewInfo = {//三种类型的自定义名称
		cross: '',
		illegal: '',
		origin: ''
	},
	dialogData = {};
	itemDom = {//三种类型的item集合
		cross: $('#cross_Item').find('.item'),
		illegal: $('#illegal_Item').find('.item'),
		origin:$('#origin_Item').find('.item')
	}
	postPipe = {//三个表的数据对应的获取参数
		cross: 1,
		illegal: 2,
		origin:3
	}
	
	function getDataDictionary(typecodes,callback){//获取数据字典
		//getData(_url+"/ivehicle-web/web/dictionary/dictionary",'get',{"typecodes":typecodes},function(data){
			//console.log(data)
			//if(data.type===0){
// 				var res = data.items,arr=[];
// 				for(var i=0,len=res.length;i<len;i++){
// 					var str = res[i].dataValue+'='+res[i].name+':'+res[i].name;
// 					arr.push(str);
				//}
				callback('hello=world:world|hello2=world2:world2');
			//}else{
				//callback('');
			///}
		//})
	}

	function addExportConfig(fieldValues,callback) {
		var dataRow;
		var typecodesLinefieldValues = {//查询数据字典的typecodes和fieldValues 对应
			plateType: 'ivehicle.plate_type',
			directionIndex: 'ivehicle.vehicle_direction',//车辆行驶方向
			vehicleLogo: 'ivehicle.vehicle_models_model',
			vehicleSubLogo: 'ivehicle.vehicle_models_model/child',
			vehicleModel: 'ivehicle.vehicle_models_model',
			vehicleColor: 'ivehicle.vehicle_color',
			vehicleColorDepth: 'ivehicle.vehicle_color_depth',
			plateColor: 'ivehicle.plate_color',
			vehicleType: 'ivehicle.vehicle_type',
			uploadFlag: 'ivehicle.upload_flag'
			
		}
		if(fieldValues != null) {
			switch(fieldValues) {
				case "plateNo":
					dataRow = {
						//exportConfigId: currMaxExportConfigId[currindex],
						//sequenceValue: currMaxSequence[currindex],
						fieldName: "EXPORTCONFIG.PLATENAME",
						fieldValue: "plateNo",
						fieldValueCopy: "plateNo",
						displayValue: "{plateNo}_",
						defaultValue: "EXPORTCONFIG.DEFAULTPLATE",
						exchangeRule: "",
						flag: 1
					};
					
					break;
				case "passTime":
					dataRow = {
						//exportConfigId: currMaxExportConfigId[currindex],
						//sequenceValue: currMaxSequence[currindex],
						fieldName: "EXPORTCONFIG.PASSTIME",
						fieldValue: "passTime",
						fieldValueCopy: "passTime",
						displayValue: "{yyyyMMddHHmmssSSS}_",
						defaultValue: "",
						exchangeRule: "",
						flag: 0
					};
					
					break;
				case "alarmTime":
					dataRow = {
						//exportConfigId: currMaxExportConfigId[currindex],
						//sequenceValue: currMaxSequence[currindex],
						fieldName: "EXPORTCONFIG.ALARMTIME",
						fieldValue: "alarmTime",
						fieldValueCopy: "alarmTime",
						displayValue: "{yyyyMMddHHmmssSSS}_",
						defaultValue: "",
						exchangeRule: "",
						flag: 0
					};
					
					break;
				case "crossingName":
					dataRow = {
						//exportConfigId: currMaxExportConfigId[currindex],
						//sequenceValue: currMaxSequence[currindex],
						fieldName: "EXPORTCONFIG.CROSSINGNAME",
						fieldValue: "crossingName",
						fieldValueCopy: "crossingName",
						displayValue: "{crossingName}_",
						defaultValue: "",
						exchangeRule: "",
						flag: 0
					};
					
					break;
				case "sectionName":
					dataRow = {
						//exportConfigId: currMaxExportConfigId[currindex],
						//sequenceValue: currMaxSequence[currindex],
						fieldName: "EXPORTCONFIG.SECTIONNAME",
						fieldValue: "sectionName",
						fieldValueCopy: "sectionName",
						displayValue: "{sectionName}_",
						defaultValue: "",
						exchangeRule: "",
						flag: 0
					};
					
					break;
				case "laneName":
					dataRow = {
						//exportConfigId: currMaxExportConfigId[currindex],
						//sequenceValue: currMaxSequence[currindex],
						fieldName: "EXPORTCONFIG.LANENAME",
						fieldValue: "laneName",
						fieldValueCopy: "laneName",
						displayValue: "{laneName}_",
						defaultValue: "",
						exchangeRule: "",
						flag: 0
					};
					
					break;
				case "plateType":
					dataRow = {
						//exportConfigId: currMaxExportConfigId[currindex],
						//sequenceValue: currMaxSequence[currindex],
						fieldName: "EXPORTCONFIG.PLATETYPE",
						fieldValue: "plateType",
						fieldValueCopy: "plateType",
						displayValue: "{plateType}_",
						defaultValue: "",
						exchangeRule: "",
						flag: 3
					};
					break;
				case "directionIndex":
					dataRow = {
						//exportConfigId: currMaxExportConfigId[currindex],
						//sequenceValue: currMaxSequence[currindex],
						fieldName: "EXPORTCONFIG.DIRECTIONINDEX",
						fieldValue: "directionIndex",
						fieldValueCopy: "directionIndex",
						displayValue: "{directionIndex}_",
						defaultValue: "",
						exchangeRule: "",
						flag: 3
					};
					break;
				case "vehicleLogo":
					dataRow = {
						//exportConfigId: currMaxExportConfigId[currindex],
						//sequenceValue: currMaxSequence[currindex],
						fieldName: "EXPORTCONFIG.VEHICLELOGO",
						fieldValue: "vehicleLogo",
						fieldValueCopy: "vehicleLogo",
						displayValue: "{vehicleLogo}_",
						defaultValue: "",
						exchangeRule: "",
						flag: 3
					};
					break;
				case "vehicleSubLogo":
					dataRow = {
						//exportConfigId: currMaxExportConfigId[currindex],
						//sequenceValue: currMaxSequence[currindex],
						fieldName: "EXPORTCONFIG.VEHICLESUBLOGO",
						fieldValue: "vehicleSubLogo",
						fieldValueCopy: "vehicleSubLogo",
						displayValue: "{vehicleSubLogo}_",
						defaultValue: "",
						exchangeRule: "",
						flag: 3
					};
					break;
				case "vehicleModel":
					dataRow = {
						//exportConfigId: currMaxExportConfigId[currindex],
						//sequenceValue: currMaxSequence[currindex],
						fieldName: "EXPORTCONFIG.VEHICLEMODEL",
						fieldValue: "vehicleModel",
						fieldValueCopy: "vehicleModel",
						displayValue: "{vehicleModel}_",
						defaultValue: "",
						exchangeRule: "",
						flag: 3
					};
					break;
				case "vehicleColor":
					dataRow = {
						//exportConfigId: currMaxExportConfigId[currindex],
						//sequenceValue: currMaxSequence[currindex],
						fieldName: "EXPORTCONFIG.VEHICLECOLOR",
						fieldValue: "vehicleColor",
						fieldValueCopy: "vehicleColor",
						displayValue: "{vehicleColor}_",
						defaultValue: "",
						exchangeRule: "",
						flag: 3
					};
					break;
				case "vehicleSpeed":
					dataRow = {
						//exportConfigId: currMaxExportConfigId[currindex],
						//sequenceValue: currMaxSequence[currindex],
						fieldName: "EXPORTCONFIG.VEHICLESPEED",
						fieldValue: "vehicleSpeed",
						fieldValueCopy: "vehicleSpeed",
						displayValue: "{vehicleSpeed}_",
						defaultValue: "",
						exchangeRule: "",
						flag: 0
					};
					
					break;
				case "avgSpeed":
					dataRow = {
						//exportConfigId: currMaxExportConfigId[currindex],
						//sequenceValue: currMaxSequence[currindex],
						fieldName: "EXPORTCONFIG.AVGSPEED",
						fieldValue: "avgSpeed",
						fieldValueCopy: "avgSpeed",
						displayValue: "{avgSpeed}_",
						defaultValue: "",
						exchangeRule: "",
						flag: 0
					};
					
					break;
				case "vehicleLen":
					dataRow = {
						//exportConfigId: currMaxExportConfigId[currindex],
						//sequenceValue: currMaxSequence[currindex],
						fieldName: "EXPORTCONFIG.VEHICLELEN",
						fieldValue: "vehicleLen",
						fieldValueCopy: "vehicleLen",
						displayValue: "{vehicleLen}_",
						defaultValue: "",
						exchangeRule: "",
						flag: 0
					};
					break;
				case "vehicleColorDepth":
					dataRow = {
						//exportConfigId: currMaxExportConfigId[currindex],
						//sequenceValue: currMaxSequence[currindex],
						fieldName: "EXPORTCONFIG.VEHICLECOLORDEPTH",
						fieldValue: "vehicleColorDepth",
						fieldValueCopy: "vehicleColorDepth",
						displayValue: "{vehicleColorDepth}_",
						defaultValue: "",
						exchangeRule: "",
						flag: 3
					};
					break;
				case "laneNo":
					dataRow = {
						//exportConfigId: currMaxExportConfigId[currindex],
						//sequenceValue: currMaxSequence[currindex],
						fieldName: "EXPORTCONFIG.LANENO",
						fieldValue: "laneNo",
						fieldValueCopy: "laneNo",
						displayValue: "{laneNo}_",
						defaultValue: "",
						exchangeRule: "",
						flag: 0
					};
					break;
				case "plateColor":
					dataRow = {
						//exportConfigId: currMaxExportConfigId[currindex],
						//sequenceValue: currMaxSequence[currindex],
						fieldName: "EXPORTCONFIG.PLATECOLOR",
						fieldValue: "plateColor",
						fieldValueCopy: "plateColor",
						displayValue: "{plateColor}_",
						defaultValue: "",
						exchangeRule: "",
						flag: 3
					};
					break;
				case "vehicleType":
					dataRow = {
						//exportConfigId: currMaxExportConfigId[currindex],
						//sequenceValue: currMaxSequence[currindex],
						fieldName: "EXPORTCONFIG.VEHICLETYPE",
						fieldValue: "vehicleType",
						fieldValueCopy: "vehicleType",
						displayValue: "{vehicleType}_",
						defaultValue: "",
						exchangeRule: "",
						flag: 3
					};
					break;
				case "uploadFlag":
					dataRow = {
						//exportConfigId: currMaxExportConfigId[currindex],
						//sequenceValue: currMaxSequence[currindex],
						fieldName: "EXPORTCONFIG.uploadFlag",
						fieldValue: "uploadFlag",
						fieldValueCopy: "uploadFlag",
						displayValue: "{uploadFlag}_",
						defaultValue: "",
						exchangeRule: "",
						flag: 3
					};
					break;
				case "illegalPlaceName":
					dataRow = {
						//exportConfigId: currMaxExportConfigId[currindex],
						//sequenceValue: currMaxSequence[currindex],
						fieldName: "EXPORTCONFIG.illegalPlaceName",
						fieldValue: "illegalPlaceName",
						fieldValueCopy: "illegalPlaceName",
						displayValue: "{illegalPlaceName}_",
						defaultValue: "",
						exchangeRule: "",
						flag: 0
					};
					
					break;
				case "illegalCode":
					dataRow = {
						//exportConfigId: currMaxExportConfigId[currindex],
						//sequenceValue: currMaxSequence[currindex],
						fieldName: "EXPORTCONFIG.illegalCode",
						fieldValue: "illegalCode",
						fieldValueCopy: "illegalCode",
						displayValue: "{illegalCode}_",
						defaultValue: "",
						exchangeRule: "",
						flag: 0
					};
					
					break;
				case "illegalDate":
					dataRow = {
						//exportConfigId: currMaxExportConfigId[currindex],
						//sequenceValue: currMaxSequence[currindex],
						fieldName: "EXPORTCONFIG.illegalDate",
						fieldValue: "illegalDate",
						fieldValueCopy: "illegalDate",
						displayValue: "{yyyyMMddHHmmssSSS}_",
						defaultValue: "",
						exchangeRule: "",
						flag: 0
					};
					
					break;
				case "scz":
					dataRow = {
						//exportConfigId: currMaxExportConfigId[currindex],
						//sequenceValue: currMaxSequence[currindex],
						fieldName: "EXPORTCONFIG.scz",
						fieldValue: "scz",
						fieldValueCopy: "scz",
						displayValue: "{scz}_",
						defaultValue: "",
						exchangeRule: "",
						flag: 0
					};
					
					break;
				case "userDefined":
					dataRow = {
						//exportConfigId: currMaxExportConfigId[currindex],
						//sequenceValue: currMaxSequence[currindex],
						fieldName: "EXPORTCONFIG.USERDEFINED",
						fieldValue: "userDefined",
						fieldValueCopy: "userDefined",
						displayValue: "",
						defaultValue: '',
						exchangeRule: '',
						flag: 2
					};
					
					break;
				case "mutilImage":
					dataRow = {
						//exportConfigId: currMaxExportConfigId[currindex],
						//sequenceValue: currMaxSequence[currindex],
						fieldName: "EXPORTCONFIG.MUTILIMAGE",
						fieldValue: "mutilImage",
						fieldValueCopy: "mutilImage",
						flag: 4
					};
					
					break;
				default:
					break;
			}
			if(dataRow.flag === 3){
				var typecodes = typecodesLinefieldValues[fieldValues];
				getDataDictionary(typecodes,function(data){
					dataRow.exchangeRule = data;
					callback(dataRow);
				});
			}else{
				callback(dataRow);	
			}
			//return dataRow;
		}
	
	}
	
	function checkBoxState(thisDom,state){//复选框状态变更
		if(thisDom[0].id !== 'plateNo'&&thisDom[0].id !== 'passTime'&&thisDom[0].id !== 'alarmTime'){
			var $itemDot = thisDom.find(".itemDot");
			//var $itemDot_sel = thisDom.find(".itemDot_sel");
			//var $itemDot_sel_gray = thisDom.find(".itemDot_sel");
			if(!state){
				$itemDot.removeClass('itemDot_sel');
			}else{
				$itemDot.addClass('itemDot_sel');
			}
		}
	}
	
	function toggleCheckBox(thisDom,db){//复选框点击事件
		var $itemDot = thisDom.find(".itemDot");
		var $itemDot_sel = thisDom.find(".itemDot_sel");
		var $itemDot_sel_gray = thisDom.find(".itemDot_sel_gray");
		if($itemDot_sel.length>0){
			addOrDelCon(false,thisDom[0].id,db,function(state){
				dataCachChange(gises[db].dataCach);
			})
			return;
		}else if($itemDot_sel_gray.length>0){
			return;
		}else{
			addOrDelCon(true,thisDom[0].id,db,function(state){
				dataCachChange(gises[db].dataCach);
			})
			return;
		}
	}
	
	function addOrDelCon(state,tag,db,callback){//添加或删除一栏（状态，特征标记fileValue，回调）
		if(state){//为true的操作
			addExportConfig(tag,function(data){
				var res = (function(data){
					var o = {};
					/*o.num = data.sequenceValue||'';*/
					o.fieldName = data.fieldName||'';
					o.fieldValue = data.fieldValue||'';
					o.displayValue = data.displayValue||'';
					o.defaultValue = data.defaultValue||'';
					o.exchangeRule = data.exchangeRule||'';
					o.flag = data.flag||0;
					o.configType = data.configType||1;
					/*o.edit = '操作';*/
					return o;
				})(data);
				var trVm = gises[db].addTr(res);
				res.vm = trVm;
				gises[db].dataCach.push(res);
				//dataCachChange(gises.cross.dataCach);
				//console.log('选中后的操作')
				callback(true);
			});
			
		}else{//false的操作
			var dataCach = gises[db].dataCach;
			for(var i=0,len=dataCach.length;i<len;i++){
				if(dataCach[i].fieldValue===tag){
					$(dataCach[i].vm).remove();
					dataCach.splice(i,1);
					//dataCachChange(gises.cross.dataCach);
					break;
				}
			}
			callback(false);
			//console.log('取消选中后的操作')
		}
	}
	function setPreview(info){
		var $DIN_preview_style1 = $(".DIN_preview_style1");
		var $DIN_preview_style2 = $(".DIN_preview_style2");
		$DIN_preview_style1.html(info);
		$DIN_preview_style2.html(info);
	}
	var init_event = function(){//初始化事件绑定
		var $item = $(".item");
		var $DIN_opera_reset = $(".DIN_opera_reset");//重置
		var $DIN_opera_store = $(".DIN_opera_store");//保存
		var $DIN_opera_add = $(".DIN_opera_add");//增加自定义栏
		var $DIN_opera_down = $(".DIN_opera_down");//下移一位
		var $DIN_opera_up = $(".DIN_opera_up");//上移一位
		var $UMA_close = $(".UMA_close");//顶部的信息提示栏
		$item.unbind().on('click',function(){
			var $this = $(this);
			var itemBelong = (function(){
				for(var key in itemDom){
					for(var i=0,len=itemDom[key].length;i<len;i++){
						if(itemDom[key][i]===$this[0]){
							return key;
						}
					}
				}
				console.log('当前点击找不到itemDom中的归属')
			})();
			toggleCheckBox($this,itemBelong)
		});
		$DIN_opera_reset.unbind().on('click',function(){//使用unbind()解除绑定，避免该前端架构重复加载此js但dom事件多次绑定的问题。dom可能被暂存，后期可期
			var belong = $(this)[0].id.split("_")[0];
			getGisData(postPipe[belong],belong+'ImageNameGrid',belong);
		});
		$DIN_opera_store.unbind().on('click',function(){
			var belong = $(this)[0].id.split("_")[0];
			storeData(gises[belong])
		});
		$DIN_opera_add.unbind().on('click',function(){
			var belong = $(this)[0].id.split("_")[0];
			addOrDelCon(true,'userDefined',belong,function(state){
				dataCachChange(gises[belong].dataCach);
			})
		})
		$DIN_opera_down.unbind().on('click',function(){
			var belong = $(this)[0].id.split("_")[0];
			for(var i=0,len=gises[belong].dataCach.length;i<len;i++){
				if(gises[belong].dataCach[i].vm.style.backgroundColor==='rgb(255, 238, 221)' || gises[belong].dataCach[i].vm.style.backgroundColor==="#ffeedd"){
					moveTr('down',gises[belong].dataCach[i].vm,belong);
					return;
				}
			}
			alert('请先选中一栏！');
		})
		$DIN_opera_up.unbind().on('click',function(){
			var belong = $(this)[0].id.split("_")[0];
			for(var i=0,len=gises[belong].dataCach.length;i<len;i++){
				if(gises[belong].dataCach[i].vm.style.backgroundColor==='rgb(255, 238, 221)' || gises[belong].dataCach[i].vm.style.backgroundColor==="#ffeedd"){
					moveTr('up',gises[belong].dataCach[i].vm,belong);
					return;
				}
			}
			alert('请先选中一栏！');
		})
		$UMA_close.unbind().on('click',function(){
			$(this).parent('.uniMessageAction').hide("fast");
		});
	}
	
	function str2dom(arg) {
		var objE = document.createElement("div");
		objE.innerHTML = arg;
		return objE.childNodes;
		
	};
	
	function getData(url,type,data,callback){//ajax封装
		jQuery.support.cors = true;
		completeState = true;
		$.ajax({
			type: type,
			dataType: 'json',
			data: data,
			contentType: 'application/json; charset=utf-8',
			url: url,
			beforeSend: function(){//请求发送之前
				completeState = false;
				//console.log(completeState)
			},
			success: function (result) {//请求完成且成功
				callback(result);
			},
			error: function(e){//请求完成但失败
				alert("接口调用失败，请稍后重试！")
				console.log(e);
			},
			complete: function(){//请求完成（失败或成功）
				completeState = true;
				//console.log(completeState)
			}
		});
	}
	
	function Grid(options){//数据表格类
		var options = {
			el: options.el,
			rootClass: options.rootClass||'zzhGis',
			noData: options.noData||function(){return '暂无数据';},
			title: options.title||[],//表头
			template: options.template||function(tag,dom,dataCode,dataVal){return dataVal;},//每个td的内容可自定义模板
			trMethods:options.trMethods||{},//为tbody每行赋予事件
			defineTd:options.defineTd||[]//可自定义首列和尾列，因为这些列的数据可能不由后台返回
		};
		var _this = this;
		var $noDataDom = options.noData();
		var modifiedCode = {};//存储当前修改的数据 key
		this.dataCach = [];//缓存每组表格数据且加入绑定的dom对象
		
		var $table = document.createElement('table');
		var $thead = document.createElement('thead');
		var $tbody = document.createElement('tbody');
		var $noDataTbody = document.createElement('tbody');
		var tHeadTitle = options.title;
		$table.border = 0;
		$table.cellSpacing = 0;
		$table.cellPadding = 0;
		$table.setAttribute('class',options.rootClass);
		;(function(){//生成标题
			var $tr = document.createElement('tr');
			var indexMax = 0;
			var arr = new Array(options.defineTd.length+tHeadTitle.length);
			for(var j=0,l=options.defineTd.length;j<l;j++){
				var thisTd = {
					name:options.defineTd[j].name,
					code:options.defineTd[j].code
				}
				arr[options.defineTd[j].index] = thisTd;
			}
			for(var k=0,kl=tHeadTitle.length;k<kl;k++){//合并自定义列和默认列
				for(var m=0,ml=arr.length;m<ml;m++){
					if(!arr[m]){
						arr[m]=tHeadTitle[k];
						break;//action!!
					}
				}
			}
			for(var i=0,len=arr.length;i<len;i++){
				var $th = document.createElement('th');
				var titleCon = options.template(arr,$tr,'$$$',arr[i])||arr[i].name;//约定：$$$表征需要模板化的该元素是每个表头
				if(typeof titleCon !== 'object'){
					$th.innerHTML = titleCon;
				}else if(typeof titleCon === 'object'){
					$th.appendChild(titleCon);
				}
				$tr.appendChild($th)
			}
			tHeadTitle = arr;
			$thead.appendChild($tr);
		})();
		
		$table.appendChild($thead);//添加表头
		
		;(function(){//生成noData的tr行
			var $noDataTr = document.createElement('tr');
			var $noDataTd = document.createElement('td');
			$noDataTd.setAttribute('colspan',tHeadTitle.length);
			$noDataTd.align = 'center';
			if(typeof $noDataDom !== 'object'){
				$noDataTd.innerHTML = $noDataDom;
			}else{
				$noDataTd.appendChild($noDataDom);
			}
			$noDataTr.appendChild($noDataTd);
			$noDataTbody.appendChild($noDataTr);
			$table.appendChild($noDataTbody);//添加无数据状态
		})()
		
		this.addTr = function(trObj){//添加一行，数据为一行的数据对象
			if(trObj.vm){//如果已有vm,那么在既定vm上做数据变更而不是重新生成，以此保留动态修改的dom样式等~
				if(trObj===modifiedCode.tr){
					var tdes = trObj.vm.children;//有序数组
					;(function(tdes){
						for(var i=0,len=tdes.length;i<len;i++){
							for(var j=0,jl=modifiedCode.dataKey.length;j<jl;j++){
								if(tHeadTitle[i].code===modifiedCode.dataKey[j]){
									tdes[i].innerHTML = '';
									var con = options.template(trObj,trObj.vm,tHeadTitle[i].code,trObj[tHeadTitle[i].code])||trObj[tHeadTitle[i].code];
									if(typeof con !== 'object'){
										tdes[i].innerHTML = con;
									}else if(typeof con === 'object'){
										tdes[i].appendChild(con);
									}
								}
							}
						}
					})(tdes);
					modifiedCode = {};
				}
				return trObj.vm
			}
			var $tr = document.createElement('tr');
			for(var key in options.trMethods||{}){
				$tr.removeEventListener(key,function(e){
					options.trMethods[key].call(this,e,$tr)
				});
				$tr.addEventListener(key,function(e){
					options.trMethods[key].call(this,e,$tr)
				});
			}
			//按照title中是否有subCode来为数据新增集合的数据项，以防有些列需要用到多个数据。注意此时render后同步的是集合里的数据
			for(var k=0,kl=tHeadTitle.length;k<kl;k++){
				if(tHeadTitle[k].subCode){
					trObj[tHeadTitle[k].code] = (function(k){
						var o = {},subCode=tHeadTitle[k].subCode;
						for(var i=0,len=subCode.length;i<len;i++){
							o[subCode[i]] = trObj[subCode[i]];
						}
						return o;
					})(k);
				}
			}
			for(var j=0,l=options.defineTd.length;j<l;j++){//自动为每行数据添加自定义列的数据，记住传入的trObj只需要是业务数据
				trObj[options.defineTd[j].code] = options.defineTd[j]['con']();
			}
			for(var i=0,len=tHeadTitle.length;i<len;i++){
				var $td = document.createElement('td');
				//非定制模板的内容传入template，就是一个普通函数执行，返回undefined，默认取用源数据，以此解放template，不用模块化时也要return 源数据的繁琐操作
				var con = options.template(trObj,$tr,tHeadTitle[i].code,trObj[tHeadTitle[i].code])||trObj[tHeadTitle[i].code];;
				if(typeof con !== 'object'){
					$td.innerHTML = con;
				}else if(typeof con === 'object'){
					$td.appendChild(con);
				}
				$tr.appendChild($td)
			}
			return $tr;
		}
		options.el.innerHTML = '';
		options.el.appendChild($table);//添加表格到实际dom
		
		//数据的变更，不能直接操作数据对象的数据，会无法同步到dom,需要使用自定义modify方法
		this.modify = function(trObj,dataKey,newVal){//某行数据，某列的code，新值
			trObj[dataKey] = newVal;
			var arr = [],used = [];
			for(var i=0,len=tHeadTitle.length;i<len;i++){
				if(tHeadTitle[i].code===dataKey){
					used.push(tHeadTitle[i].code)
				}
				if(tHeadTitle[i].subCode){//可能某类数据既有独列的显示也有和其他数据组合的显示
					arr.push(tHeadTitle[i].code)
				}
			}
			for(var j=0,jl=arr.length;j<jl;j++){
				if(trObj[arr[j]][dataKey]){
					trObj[arr[j]][dataKey] = newVal;
					used.push(arr[j]);
				}
			}
			modifiedCode = {tr:trObj,dataKey:used};
			_this.render(_this.dataCach);
		}
		this.render = function(data){
			//$tbody.innerHTML = "";
			if(!data||!(data.length>0)){
				//options.el.insertBefore($table,options.el.children[0]);
				$noDataTbody.style.display = '';
				return;
			}
			$noDataTbody.style.display = 'none';
			if(data===_this.dataCach){
				//var $tbodyChildren = $tbody.children;
				for(var i=0,len=data.length;i<len;i++){
					var thisTrDom = _this.addTr(data[i]);
					$tbody.appendChild(thisTrDom);
				}
			}else{
				for(var i=0,len=data.length;i<len;i++){
					/*for(var j=0,l=options.defineTd.length;j<l;j++){//移到addTr中，如此可为每次新增一行都自动添加自定义列
						data[i][options.defineTd[j].code] = options.defineTd[j]['con']();
					}*/
					var thisTrDom = _this.addTr(data[i]);
					/*var obj =  (function(){
						var o = {};
						for(var key in data[i]){
							o[key] = data[i][key];
						}
						o['vm'] = thisTrDom;
						return o;
					})();*/
					data[i].vm = thisTrDom
					_this.dataCach.push(data[i]);
					$tbody.appendChild(thisTrDom);
				}
			}
			$table.appendChild($tbody);
			//options.el.appendChild($table);
		}
		
	}
	
	function getGisData(data,id,db){//ajax参数,实例化表格目标id和数据保存地址
		//_url+'/ivehicle-web/web/export/custom-result'  'http://localhost:3004/custom-result' JSON.stringify(data)
		getData('  http://localhost:3005/custom-result','get',data,function(data){
			console.log(data)
			if(data.type===0){
				previewInfo[db] = data.picName.picname;
				var res = (function(data){
					var arr = [];
					for(var i=0,len=data.length;i<len;i++){
						var o = {};
						/*o.num = data[i].sequenceValue||null;*/
						o.fieldName = data[i].fieldName||null;
						o.fieldValue = data[i].fieldValue||null;
						//o.rule = {
							o.displayValue = data[i].displayValue||'';
							o.defaultValue = data[i].defaultValue||'';
							o.exchangeRule = data[i].exchangeRule||'';
						//},
						o.flag = data[i].flag||0;
						o.configType = data[i].configType||1;
						/*o.edit = '操作';*/
						arr.push(o)
					}
					return arr;
				})(data.returnMapList);
			}else{
				alert(data.type+":数据获取失败")
			}
			gises[db] = init_gcGrid(res||[],id,db);
			dataCachChange(gises[db].dataCach);
		})
	}
	
			
	function storeData(data){//保存
		//...上传到后台，data要根据解决调整结构
		console.log(data)
	}

	function dataCachChange(dataCach){//dataCach变动发生的事情，需要改变的都可以写在这里
		//1、checkBox复选重新选定
		var itemObj={},db='';
		if(dataCach===gises.cross.dataCach){
			var $item = itemDom.cross;
			db = 'cross';
		}else if(dataCach===gises.illegal.dataCach){
			var $item = itemDom.illegal;
			db = 'illegal';
		}else if(dataCach===gises.origin.dataCach){
			var $item = itemDom.origin;
			db = 'origin';
		}
		for(var j=0,l=$item.length;j<l;j++){
			itemObj[$item.eq(j).attr('id')] = $item.eq(j);
			checkBoxState($item.eq(j),false);
		}
		for(var i=0,len=dataCach.length;i<len;i++){
			if(itemObj[dataCach[i].fieldValue]){
				checkBoxState(itemObj[dataCach[i].fieldValue],true);
			}
			//2、重新设置每栏的序号（仅序号,升序
			gises[db].modify(dataCach[i],'num',i+1);
			//dataCach[i].num = i+1;
			//dataCach[i].vm.children[0].innerHTML = i+1;
		}
		//3、重新生成视图
		gises[db].render(dataCach);//dataCach的变动,包括顺序，数据都会生成新的视图，且数据的变动执行render后会同步dataCach中的vm
		//4、重新生成预览文本
		setPreview(previewInfo[db]);
		
	}
	
	function moveTr(direct,dom,db){
		var index = null,len=gises[db].dataCach.length;
		for(var i=0;i<len;i++){
			if(gises[db].dataCach[i].vm === dom){
				index = i;
			}
		}
		if(direct==='down'){//下降一位
			if(index===len-1){
				alert('已经是最后一位不能再下降了！');
			}else{
				var thisObj = gises[db].dataCach.splice(index,1);
				gises[db].dataCach.splice(index+1,0,thisObj[0]);
				dataCachChange(gises[db].dataCach);
			}
		}else{
			if(index===0){
				alert('已经是第一位不能再上升了！')
			}else{
				var thisObj = gises[db].dataCach.splice(index,1);
				gises[db].dataCach.splice(index-1,0,thisObj[0]);
				dataCachChange(gises[db].dataCach);
			}
		}
		
	}
	
	function formChange(thisObj,inputName,value){//表单值变动同步到相应数据对象中
		if(thisObj[inputName]!=='undefined'){
			thisObj[inputName] = value
		}
		if(thisObj['rule']!=='undefined'){
			if(thisObj['rule'][inputName]!=='undefined')thisObj['rule'][inputName] = value;
		}
//		if(!thisObj['rule']&&!thisObj[inputName]){
//			console.log('变动的表单名未在对应对象中找到该名属性')
//		}
	}
	
	function dialog(id,state,data,okCallback,cancelCallback){
		var dia = null;
		if(state==='open'){
			dia = $('#'+id).dialog({
		        autoOpen : true,  
		        modal : true,  
		        width : 600,  
		        height : 450,  
		        draggable: true,  
		        resizable: false,  
		        buttons : {  
		            "ok" : {  
		                text : '确认',  
		                'class' : 'button button-minor',  
		                click : function() {  
		                	okCallback(function(){
		                		dia.dialog("close");  
		                	})
		                }  
		            },  
		            "cancel" : {
		                text : '取消',  
		                'class' : 'button button-cancel',  
		                click : function() {  
		                    dia.dialog("close");  
		                }  
		            }  
		        }  
		    });
		    dialogData = init_serniorChangeGrid(data)
		}else{
			if(dia){
				dia.dialog('close')
			}else{
				return;
			}
		}
	}
	
	function exchange2arr(ruleStr){//规则字符串转换成对象数组
		var arr = ruleStr.split('|'),arr2 = [];
		for(var i=0,len=arr.length;i<len;i++){
			var o = {};
			o.num = arr[i].split('=')[0];
			o.preField = arr[i].split('=')[1].split(':')[0];
			o.afterField = arr[i].split('=')[1].split(':')[1];
			arr2.push(o);
		}
		return arr2;
	}
	function arr2exchange(arr){//对象数组转换成规则字符串
		for(var i=0,len=arr.length;i<len;i++){
			arr[i] = arr[i].num+"="+arr[i].preField+":"+arr[i].afterField
		}
		return arr.join('|');
	}
		
	/*初始化高级转换规则表格*/
	function init_serniorChangeGrid(gridData){
		var gcGrid = new Grid({
			el: document.getElementById('dialog'),
			rootClass: 'DIN_gc_grid',
			title: [
				{name:'序号',code:'num'},
				{name:'转换字段',code:'preField'},
				{name:'转换后字段',code:'afterField'}
			],
			template: function(tag,dom,code,data){//为每个td通过传入tag特征分析添加不同的模板。
				if(code==='afterField'){
					var $p = $("<span></span>");
					var $form = $('<div class="DIN_gc_grid_input"><input type="text" value=""/></div>');
					$form.find('input').val(tag.afterField);
					$form.find('input').attr('name','afterField')
					$p.append($form);
					$p.find('input').unbind().on('change',function(){//表单修改会同步修改相应对象dataCach
						formChange(tag,$(this).attr('name'),$(this).val());
					})
					return $p[0];
				}
			}
		})
		gcGrid.render(gridData);
		return gcGrid;
	}
	/*初始化区间表格*/
	var init_gcGrid = function(gridData,elID,db) {//过车表格
		
		var gcGrid = new Grid({
			el: document.getElementById(elID),
			rootClass: 'DIN_gc_grid',
			noData: function(){
				return '<span class="no-data">没有数据了～～</span>';
			},
			title: [//自定义的列的标题信息卸载defineTd里，这里只需要写业务需要的表头信息
				/*{name:'序号',code:'num'},*/
				{name:'字段名称',code:'fieldName'},
				{name:'规则',code:'rule',subCode: ['displayValue','defaultValue','exchangeRule']}
				/*{name:'编辑',code:'edit'}*/
			],
			template: function(tag,dom,code,data){//为每个td通过传入tag特征分析添加不同的模板。（每行数据对象，dom,某列code表征,某列内容）
				if(code==='rule'){
					var $p = $("<span></span>");
					if(tag.flag === 0){//0 无默认值
						var $form = $('<div class="DIN_gc_grid_input"><span>显示值</span><input type="text" value=""/></div>');
						$form.find('input').val(tag.rule.displayValue);
						$form.find('input').attr('name','displayValue')
						$p.append($form);
					}else if(tag.flag === 1){//1 有默认值
						var $form = $('<div class="DIN_gc_grid_input"><span>显示值</span><input type="text" value=""/></div>'),
						$form2 = $('<div class="DIN_gc_grid_input"><span>默认值</span><input type="text" value=""/></div>');
						$form.find('input').val(tag.rule.displayValue||'其他')
						$form2.find('input').val(tag.rule.defaultValue||'其他')
						$form.find('input').attr('name','displayValue')
						$form2.find('input').attr('name','defaultValue')
						$p.append($form).append($form2)
					}else if(tag.flag === 2){//2 自定义值
						var $form = $('<div class="DIN_gc_grid_input"><span>自定义值</span><input type="text" value=""/></div>');
						$form.find('input').val('');
						$form.find('input').attr('name','displayValue')
						$p.append($form);
					}else if(tag.flag === 3){//3 已定义转换规则
						var $form = $('<div class="DIN_gc_grid_input"><span>显示值</span><input type="text" value=""/></div>'),
						$form2 = $('<div class="DIN_gc_grid_input"><span>默认值</span><input type="text" value=""/></div>'),
						$form3 = $('<div class="DIN_gc_grid_input"><span>转换规则</span><input type="text" value=""/><span class="seniorChange">高级转换</span></div>');
						$form.find('input').val(tag.rule.displayValue||'其他');
						$form2.find('input').val(tag.rule.defaultValue||'其他');
						$form3.find('input').val(tag.rule.exchangeRule||'其他');
						$form.find('input').attr('name','displayValue')
						$form2.find('input').attr('name','defaultValue')
						$form3.find('input').attr('name','exchangeRule')
						$form3.find('.seniorChange').unbind().on('click',function(){
							var data = exchange2arr(tag.rule.exchangeRule);
							dialog("defineImageNameDialog","open",data,function(callback){
								tag.exchangeRule = tag.rule.exchangeRule = arr2exchange(dialogData.dataCach);
								$form3.find('input').val(tag.exchangeRule);
								tips('保存成功！');
								callback();//关闭
							});
						})
						$p.append($form3).append($form).append($form2)
					}else if(tag.flag === 4){//4 多张图片后缀
						var $form = $('<div class="DIN_gc_grid_input"><span>第一张</span><input type="text" value=""/></div>'),
						$form2 = $('<div class="DIN_gc_grid_input"><span>第二张</span><input type="text" value=""/></div>'),
						$form3 = $('<div class="DIN_gc_grid_input"><span>第三张</span><input type="text" value=""/></div>');
						$form.find('input').val(1);
						$form2.find('input').val(2);
						$form3.find('input').val(3);
						$p.append($form).append($form2).append($form3)
					}else{
						return '规则未定义'
					}
					$p.find('input').unbind().on('change',function(){//表单修改会同步修改相应对象dataCach
						formChange(tag,$(this).attr('name'),$(this).val());
					})
					return $p[0];
					
				}else if(code==='edit'){
					var $btn1 = str2dom('<span class="DIN_gc_grid_btn">上升</span>')[0],
					$btn2 = str2dom('<span class="DIN_gc_grid_btn">下降</span>')[0],
					$btn3 = str2dom('<span class="DIN_gc_grid_btn">删除</span>')[0],
					$parent = str2dom('<span></span>')[0];
					$btn1.addEventListener('click',function(e){
						moveTr('up',dom,db);
					})
					$btn2.addEventListener('click',function(e){
						moveTr('down',dom,db);
					})
					$btn3.addEventListener('click',function(){
						addOrDelCon(false,tag.fieldValue,db,function(state){
							dataCachChange(gises[db].dataCach);
						})
					})
					$parent.appendChild($btn1);
					$parent.appendChild($btn2);
					if(tag.fieldValue!=='plateNo'&&tag.fieldValue!=='passTime'&&tag.fieldValue!=='alarmTime'){//如果是车牌号码和过车时间，没有删除功能
						$parent.appendChild($btn3);
					}
					return $parent;
				}else if(code==='fieldName'){
					if(tag.flag===0||tag.flag===1||tag.flag===2){
// 						var $float = $('<span class="DIN_gc_grid_helpFloat">全局规则<br/>连接符“_”：表示图片导出名称中各个字段值的连接符，如“车牌_{plateNO}”表示“车牌_浙A12345”</span>');
// 						var $help = $('<span>'+data+'<i class="lidaicon-h-help DIN_gc_grid_help" style="font-size:16px;line-height:20px;color:2080F7;margin:2px 0 0 10px"></i></span>');
// 						$help.find('i').append($float);
// 						return $help[0];
					}
				}else if(code==='$$$'){//表示标题模板
// 					if(data.code === 'fieldName'){
// 						var $float = $('<span class="DIN_gc_grid_helpFloat">全局规则<br/>连接符“_”：表示图片导出名称中各个字段值的连接符，如“车牌_{plateNO}”表示“车牌_浙A12345”</span>');
// 						var $help = $('<span>'+data.name+'<i class="lidaicon-h-help DIN_gc_grid_help" style="font-size:16px;line-height:20px;color:2080F7;margin:2px 0 0 10px"></i></span>');
// 						$help.find('i').append($float);
// 						return $help[0];
// 					}
				}
			},
			trMethods: {
				'click': function(e,$tr){
					for(var i=0,len=gises[db].dataCach.length;i<len;i++){
						if(gises[db].dataCach[i].vm === $tr){
							if(/(DIN_gc_grid_btn)/gi.test(e.target.getAttribute("class"))){//点到按钮则return
								return;
							}
							if(gises[db].dataCach[i].vm.style.backgroundColor==='rgb(255, 238, 221)' || gises[db].dataCach[i].vm.style.backgroundColor==="#ffeedd"){
								gises[db].dataCach[i].vm.style.backgroundColor = '#ffffff';
							}else{
								gises[db].dataCach[i].vm.style.backgroundColor = '#ffeedd';
							}
						}else{
							gises[db].dataCach[i].vm.style.backgroundColor = '#ffffff';
						}
					}
				}
			},
			defineTd: [//自定义td
				{
					code: 'num',//表头的值
					name: '序号',//表头的名
					index: 0,//该列在表中的位置
					con: function(){//该td内容
						return 0;//静态的，若需逻辑操作可卸载template中定制
					}
				},
				{
					code: 'edit',//表头的值
					name: '编辑',//表头的名
					index: 3,//该列在表中的位置
					con: function(){//该td内容
						return '';//静态的，若需逻辑操作可卸载template中定制
					}
				}
			]
		})
		gcGrid.render(gridData);
		return gcGrid;
	};
	
	//exports.init = function(){
		init_event();
		getGisData(postPipe.cross,'crossImageNameGrid','cross');//过车
		//getGisData(postPipe.illegal,'illegalImageNameGrid','illegal');//违法
		//getGisData(postPipe.origin,'originImageNameGrid','origin');//区间
		//console.log(addExportConfig('plateNo'))
	//}
// })