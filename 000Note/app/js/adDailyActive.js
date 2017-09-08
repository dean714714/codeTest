
$(function(){//设定table外盒子的高度，让内容不换行也能体验尚可
	$(".con").css('height',$(window).height()-$('.oprea').outerHeight(true)+'px');
})

var ddaVm = avalon.define({
	$id: "dda",
	data: [],
	yearlist: [],
	monthlist: ['01','02','03','04','05','06','07','08','09','10','11','12'],
	yearSel: '',
	monthSel: '',
	contentShow: false,
	$computed: {
		active: function(){//月份或日的表头和值
			var d = ddaVm.data.length>0?ddaVm.data[0].active:[];
			return d;
		},
		titleName: function(){
			return title+"("+ddaVm.yearSel+"年"+ddaVm.monthSel+"月)";
		},
		setCol: function(){
			return ddaVm.data.length===0?defalutCol:defalutCol+ddaVm.data[0].active.length;
		}
	},
	toExcel: function(obj){
		$("#"+obj).find("*:hidden").remove();//清除隐藏文件，不然excel无法解析display:none,也会显示出来
		$("#"+obj).table2excel({
            exclude: ".noExl",
            name: ddaVm.titleName,
            filename: ddaVm.titleName,
            fileext: ".xls",
            exclude_img: true,
            exclude_links: true,
            exclude_inputs: true
        });
	},
	search: function(){
		getData(ddaUrl,'get',{"year": ddaVm.yearSel,"month": ddaVm.monthSel},function(data){
			ddaVm.data = data.data||[];
			console.log(ddaVm.data.$model);
		})
	}
})

ddaVm.$watch('onReady',function(){//初始化
	getData(dateUrl,'get',{"type":para_yearlist},function(data){
		ddaVm.yearlist = data.yearlist.length>0?data.yearlist:[new Date().getFullYear()];
		ddaVm.yearSel = ddaVm.yearlist[0];//日期——年，默认
		ddaVm.monthSel = new Date().getMonth()+1<10?"0"+(new Date().getMonth()+1):new Date().getMonth()+1;//日期——月，默认
		getData(ddaUrl,'get',{"year": ddaVm.yearSel,"month": ddaVm.monthSel},function(data){
			ddaVm.data = data.data||[];
			console.log(ddaVm.data.$model)//$model返回数据类型的对象而不是访问器类型
			ddaVm.contentShow = true;
		})
	})
	
})