function FEPubUpImg(objName) {
	var self = this;
	this.SWFUP = {
		url: "http://pic.kuche.com/postpic/upload?flash=1",
		picpath: "/p2/big/",
		picsize: "640*640",
		picbulk: "0",
		dpi: "0",
		piccut: "0*0*0*0",
		picwater: "True",
		extension: "jpg",
		btImg0: "http://pic2.58.com/ui7/post/img/on.png",
		btImg1: "http://pic2.58.com/ui7/post/img/over.png",
		btImg2: "http://pic2.58.com/ui7/post/img/click.png",
		btImg3: "http://pic2.58.com/ui7/post/img/disable.png",
		picMaxSize: 10485760,
		getFlashBtn: function() {},
		getImgNum: function() {
			return self.UpImageShowBar.getImgNum()
		},
		getUpsetting: function() {
			return {
				url: this.url,
				picpath: this.picpath,
				picsize: this.picsize,
				picbulk: this.picbulk,
				dpi: this.dpi,
				piccut: this.piccut,
				picwater: this.picwater,
				extension: this.extension,
				btImg0: this.btImg0,
				btImg1: this.btImg1,
				btImg2: this.btImg2,
				btImg3: this.btImg3,
				picMaxSize: this.picMaxSize
			}
		},
		beginAdd: function(paras) {
			return self.UpImageShowBar.beginAdd(paras)
		},
		addImg: function(paras) {
			var picpaths = self.SWFUP.picpath.split(",");
			paras.url = "http://pic1.58cdn.com.cn" + picpaths[0] + paras.picName;
			var imgs = self.UpImageShowBar.imgs;
			for (var i = 0; i < imgs.length; i++) {
				if (imgs[i].code == paras.code) {
					imgs[i].url = paras.url
				}
			}
			var fileM = paras.fileSize / 1024 / 1024;
			self.UpImageShowBar.addImg(paras)
		},
		getSWF: function(movieName) {
			if (navigator.appName.indexOf("Microsoft") != -1) {
				return document.getElementById(movieName)
			} else {
				return document[movieName]
			}
		},
		enableFlashBtn: function() {
			try {
				self.SWFUP.getSWF(self.SWFUP.name).setImgUpAble(true)
			} catch (e) {
				var enableBtn = arguments.callee;
				window.setTimeout(enableBtn, 3e3)
			}
		},
		disableFlashBtn: function() {
			try {
				self.SWFUP.getSWF(self.SWFUP.name).setImgUpAble(false)
			} catch (e) {
				var disableBtn = arguments.callee;
				window.setTimeout(disableBtn, 3e3)
			}
		},
		delImg: function(code) {
			self.SWFUP.getSWF(self.SWFUP.name).imgDel(code)
		},
		showError: function(errObj) {
			var errStr = "",
				errcode = errObj.errorType,
				infocode = errObj.infoCode,
				filename = errObj.fileName;
			if (errcode == "1") {
				errStr = "ä¸Šä¼ æ–‡ä»¶ " + filename + " æ—¶ï¼Œå‘ç”Ÿè¶…æ—¶é”™è¯¯ã€‚"
			} else if (errcode == "2") {
				errStr = "ä¸Šä¼ æ–‡ä»¶ " + filename + " å¤±è´¥ã€‚"
			}
			self.UpImageShowBar.setImgErr(infocode);
			self.UpImageShowBar.showError(errStr)
		},
		scrollFunc: function() {
			window.setTimeout(self.UpImageShowBar.hideMultSel, 5e3);
			self.UpImageShowBar.container.parent().unbind("mouseover", self.SWFUP.scrollFunc)
		},
		initFlashBtn: function(settings) {
			if (settings.name) {
				this.name = settings.name
			}
			self.UpImageShowBar.container.parent().mouseover(self.SWFUP.scrollFunc);
			self.UpImageShowBar.regEnableBtn(this.enableFlashBtn);
			self.UpImageShowBar.regDisableBtn(this.disableFlashBtn);
			self.UpImageShowBar.regDelImg(this.delImg)
		},
		setUpstate: function(paras) {
			if (paras.state == "0") {
				self.UpImageShowBar.setUpstate(paras)
			} else if (paras.state == "1") {
				var degree = paras.percent;
				if (degree >= 60) {
					degree = degree + (100 - degree) / 4
				} else {
					degree = degree + 5 + parseInt(Math.random() * 10)
				}
				var paras = {
					code: paras.code,
					percent: degree,
					state: "1"
				};
				setTimeout(function() {
					self.UpImageShowBar.setUpstate(paras);
					if (degree < 99) self.SWFUP.setUpstate(paras)
				}, 500)
			}
		}
	};
	this.SINGLEUP = {
		url: "",
		picSize: -1,
		picurl: "p1",
		createIframe: function() {},
		addImg: function(suc, url, pos) {
			if (suc == 1) {
				url = "http://pic1.58cdn.com.cn/" + self.SINGLEUP.picurl + "/big" + url.substr(url.lastIndexOf("/"));
				self.UpImageShowBar.addImg({
					url: url,
					code: pos
				})
			} else {
				self.UpImageShowBar.showError(url);
				self.UpImageShowBar.setImgErr(pos)
			}
			$("iframe[name='frmUpload_" + pos + "']").remove()
		},
		addImgLoad: function() {
			if ($(this).val() == "") return;
			self.UpImageShowBar.hideError();
			var code = self.UpImageShowBar.singleAdd();
			var _sync = self.SINGLEUP.getFileSize($("#" + self.UpImageShowBar.containerStr + "fileUploadInput")[0]);
			if (_sync) {
				if (self.SINGLEUP.picSize > 0) {
					var v1 = self.SINGLEUP.picSize / 1024;
					if (v1 > 1024 * 2) {
						self.UpImageShowBar.showError("ä¸èƒ½ä¸Šä¼ å¤§äºŽ2Mçš„å›¾ç‰‡");
						self.UpImageShowBar.setImgErr(code);
						self.UpImageShowBar.resetInfo();
						self.SINGLEUP.setFilePos();
						return
					}
				}
				self.SINGLEUP.initForm({
					code: code
				})
			} else {
				setTimeout(function() {
					if (self.SINGLEUP.picSize > 0) {
						var v1 = self.SINGLEUP.picSize / 1024;
						if (v1 > 1024 * 2) {
							self.UpImageShowBar.showError("ä¸èƒ½ä¸Šä¼ å¤§äºŽ2Mçš„å›¾ç‰‡");
							self.UpImageShowBar.setImgErr(code);
							self.UpImageShowBar.resetInfo();
							self.SINGLEUP.setFilePos();
							return
						}
					}
					self.SINGLEUP.initForm({
						code: code
					})
				}, 700)
			}
			self.SINGLEUP.setFilePos();
			self.UpImageShowBar.resetInfo()
		},
		initForm: function(param) {
			$("#" + self.UpImageShowBar.containerStr + "backFunction").after('<iframe width="1" height="1" name="frmUpload_' + param.code + '" ></iframe>');
			$("#" + self.UpImageShowBar.containerStr + "SINGLEUP")[0].target = "frmUpload_" + param.code;
			$("#" + self.UpImageShowBar.containerStr + "PicPos").val(param.code);
			$("#" + self.UpImageShowBar.containerStr + "SINGLEUP").submit();
			self.SINGLEUP.upstate(0, param.code)
		},
		enableSingleBtn: function() {
			self.SINGLEUP.content.removeClass("w_localn").addClass("w_local");
			self.SINGLEUP.btnCon.show()
		},
		disableSingleBtn: function() {
			self.SINGLEUP.content.removeClass("w_local").addClass("w_localn");
			self.SINGLEUP.btnCon.hide()
		},
		delImg: function() {
			self.SINGLEUP.setFilePos()
		},
		setFilePos: function() {
			var contpos = self.SINGLEUP.content.offset();
			self.SINGLEUP.btnCon = $("#" + self.UpImageShowBar.containerStr + "singleCon");
			self.SINGLEUP.btnCon.css({
				left: contpos.left + "px",
				top: contpos.top + "px"
			})
		},
		upstate: function(degree, code) {
			if (degree >= 60) {
				var degree = degree + (100 - degree) / 4
			} else {
				var degree = degree + 5 + parseInt(Math.random() * 10)
			}
			var paras = {
				code: code,
				percent: degree,
				state: "1"
			};
			setTimeout(function() {
				self.UpImageShowBar.setUpstate(paras);
				if (degree < 99) self.SINGLEUP.upstate(degree, code)
			}, 1e3)
		},
		getFileSize: function(input) {
			var _sync = false;
			try {
				if (input.files) {
					self.SINGLEUP.picSize = input.files[0].size;
					_sync = true
				} else {
					var img = new Image;
					img.onload = function() {
						self.SINGLEUP.picSize = img.fileSize;
						img.onload = img.onerror = null;
						delete img
					};
					img.onerror = function() {
						self.SINGLEUP.picSize = -1;
						img.onload = img.onerror = null;
						delete img
					};
					img.src = input.value
				}
			} catch (e) {
				self.SINGLEUP.picSize = -1
			}
			return _sync
		},
		initBtn: function(param, settings) {
			var SINGLEUP = self.SINGLEUP;
			SINGLEUP.url = param.url;
			if ($("#" + settings.container + "SINGLEUP").length <= 0) {
				var strAry = ['<form id="' + settings.container + 'SINGLEUP" name="' + settings.container + 'SINGLEUP" method="post" target="frmUpload_' + param.code + '" action="' + SINGLEUP.url + '" enctype="multipart/form-data">', '<span style="display:none"><input type="text" id="name" name="name" value="Jeky" />', '<input type="hidden" id="' + settings.container + 'backFunction" name="backFunction" value="' + objName + '.SINGLEUP.addImg" /><input type="hidden" name="__pic_dir" value="' + SINGLEUP.picurl + '" />', '<input type="hidden" name="PicPos" id="' + self.UpImageShowBar.containerStr + 'PicPos" value="' + param.code + '" /></span>', '<div id="' + settings.container + 'singleCon" style="position:absolute;overflow:hidden"><input type="file" class="fileUploadInput" name="fileUploadInput" id="' + self.UpImageShowBar.containerStr + 'fileUploadInput" style="cursor:pointer" ></div></form>'];
				$(document.body).append(strAry.join(""))
			}
			$("#" + self.UpImageShowBar.containerStr + "fileUploadInput").unbind("change").change(SINGLEUP.addImgLoad);
			SINGLEUP.content = $("#" + settings.container + "flashContent").parent();
			if (SINGLEUP.content.length == 0) {
				SINGLEUP.content = $("a[name=" + settings.container + "flashContent]")
			}
			SINGLEUP.content.html("å›¾ç‰‡ä¸Šä¼ ").attr("name", settings.container + "flashContent");
			SINGLEUP.content.mouseover(SINGLEUP.setFilePos);
			$("#" + settings.container + "singleCon").mouseover(SINGLEUP.setFilePos);
			self.UpImageShowBar.regEnableBtn(SINGLEUP.enableSingleBtn);
			self.UpImageShowBar.regDisableBtn(SINGLEUP.disableSingleBtn);
			self.UpImageShowBar.regDelImg(SINGLEUP.delImg);
			SINGLEUP.btnCon = $("#" + settings.container + "singleCon");
			SINGLEUP.btnCon.css({
				width: "85px",
				height: "25px"
			});
			SINGLEUP.setFilePos();
			SINGLEUP.upbtn = $("#" + self.UpImageShowBar.containerStr + "fileUploadInput");
			SINGLEUP.upbtn.mouseover(function(evt) {
				SINGLEUP.content.css({
					color: "#000",
					"text-decoration": "none"
				})
			}).mouseout(function(evt) {
				SINGLEUP.content.css({
					color: "#666",
					"text-decoration": "none"
				})
			})
		}
	};
	this.UpImageShowBar = {
		getImgNum: function() {
			var uppedNum = 0;
			for (var i = 0; i < this.imgs.length; i++) {
				if (this.imgs[i].url) uppedNum++
			}
			return {
				hazNum: uppedNum,
				maxNum: this.imgMax
			}
		},
		imgMax: 8,
		imgs: [],
		hazLabel: false,
		labels: [],
		flashName: "PictureUpload",
		hazDetail: false,
		maxFilsSize: 1024 * 1024 * 10,
		container: null,
		indexCode: 0,
		hideMultSel: function() {
			$("#" + self.UpImageShowBar.flashName).next().hide()
		},
		hasFlash: function() {
			var result = false;
			var name = "flash";
			for (var i = 0; i < navigator.plugins.length; i++) {
				if (navigator.plugins[i].name.toLowerCase().indexOf(name) > -1) {
					result = true;
					break
				}
			}
			if (!result) {
				try {
					name = "ShockwaveFlash.ShockwaveFlash";
					new ActiveXObject(name);
					result = true
				} catch (ex) {
					result = false
				}
			}
			return result
		},
		regEnableBtn: function(func) {
			if (!this.enableBtnFuncs) {
				this.enableBtnFuncs = []
			}
			this.enableBtnFuncs.push(func)
		},
		enableBtns: function() {
			if (!this.enableBtnFuncs) {
				return
			}
			for (var i = 0; i < this.enableBtnFuncs.length; i++) {
				this.enableBtnFuncs[i]()
			}
		},
		regDisableBtn: function(func) {
			if (!this.disableBtnFuncs) {
				this.disableBtnFuncs = []
			}
			this.disableBtnFuncs.push(func)
		},
		disableBtns: function() {
			if (!this.disableBtnFuncs) {
				return
			}
			for (var i = 0; i < this.disableBtnFuncs.length; i++) {
				this.disableBtnFuncs[i]()
			}
		},
		regDelImg: function(func) {
			if (!this.delImgs) {
				this.delImgs = []
			}
			this.delImgs.push(func)
		},
		getIndexCode: function() {
			return this.indexCode++
		},
		addImg: function(imgObj, type) {
			if (type && this.imgs.length >= this.imgMax) {
				this.disableBtns();
				var str = "æ‚¨é€‰æ‹©çš„å›¾ç‰‡æ•°é‡è¶…è¿‡å…è®¸æ€»é‡ï¼Œå¤šä½™å›¾ç‰‡å°†ä¸ä¼šä¸Šä¼ ï¼";
				this.showError(str);
				return false
			}
			var tmpl = [];
			if (type) imgObj.code = this.getIndexCode();
			tmpl.push('<div code="' + imgObj.code + '" class="imgbox">');
			if (this.hazLabel) {
				tmpl.push('<span class="img_selector"><span class="seltext">' + (imgObj.label ? imgObj.label : this.labels[0]) + "</span>");
				tmpl.push('<ul style="width:79px" class="hc">');
				for (var i = 1; i < this.labels.length; i++) {
					tmpl.push('<li ><a href="javascript:void(0)" >' + this.labels[i] + "</a></li>")
				}
				tmpl.push('<i class="shadow"></i></ul></span>')
			}
			tmpl.push('<div class="w_upload"><a class="item_close" href="javascript:void(0)">åˆ é™¤</a><span class="item_box">');
			tmpl.push('<img  src="' + imgObj.url.replace("big", "tiny") + '"></span><div class="isfenmian" style="display:none"></div><div class="setfenmian"></div>');
			if (this.hazDetail) {
				tmpl.push('<span class="item_input"><i class="tline hc"></i><textarea name="" cols="3" rows="4" class="c_ccc" >' + (imgObj.detail ? imgObj.detail : "å›¾ç‰‡æè¿°...") + '</textarea>	<em class="hc">æŒ‰Enterä¿å­˜ï¼ŒEscå–æ¶ˆ</em><i class="shadow hc"></i></span>')
			}
			tmpl.push("</div></div>");
			if (type) {
				this.container.append(tmpl.join(""));
				this.imgs.push(imgObj);
				this.rbTAEvent(imgObj.code)
			} else {
				for (var i = 0; i < this.imgs.length; i++) {
					if (this.imgs[i].code == imgObj.code) {
						this.imgs[i] = imgObj;
						break
					}
				}
				this.container.find("[code=" + imgObj.code + "]").replaceWith(tmpl.join(""));
				this.rbTAEvent(imgObj.code)
			}
			this.initFenmian();
			if (this.container.find(".imgbox").length >= this.imgMax) {
				this.disableBtns()
			}
			this.resetInfo()
		},
		addLaod: function(imgObj) {
			if (this.imgs.length >= this.imgMax) {
				this.disableBtns();
				var str = "æ‚¨é€‰æ‹©çš„å›¾ç‰‡æ•°é‡è¶…è¿‡å…è®¸æ€»é‡ï¼Œå¤šä½™å›¾ç‰‡å°†ä¸ä¼šä¸Šä¼ ï¼";
				this.showError(str);
				return false
			}
			var tmpl = [];
			tmpl.push('<div code="' + imgObj.code + '" class="imgbox loading"><div class="w_upload"><a class="item_close" href="javascript:void(0)">å…³é—­</a>	<span class="wait_con"><p class="pershow">ç­‰å¾…ä¸­â€¦</p><div class="wait_loading"><div class="loading_progress" style="width:0%"></div></div></span><span class="wait clearfix">å›¾ç‰‡ä¸Šä¼ ä¸­</span></div></div>');
			this.container.append(tmpl.join(""));
			this.imgs.push(imgObj);
			this.container.show();
			if (this.container.find(".imgbox").length >= this.imgMax) {
				this.disableBtns()
			}
		},
		beginAdd: function(paras) {
			this.conTr.find("[name=hazupinfo]").show();
			this.conTr.find("[name=uploadEx]").hide();
			this.hideError();
			var str = "";
			if (paras.num + this.imgs.length > this.imgMax) {
				str = "æ‚¨é€‰æ‹©çš„å›¾ç‰‡æ•°é‡è¶…è¿‡å…è®¸æ€»é‡ï¼Œå¤šä½™å›¾ç‰‡å°†ä¸ä¼šä¸Šä¼ ï¼";
				this.showError(str)
			} else if (paras.hazOver) {
				str = "æ‚¨é€‰æ‹©çš„éƒ¨åˆ†å›¾ç‰‡è¶…è¿‡å…è®¸å¤§å°æ€»é‡ï¼Œè¿™äº›å›¾ç‰‡å°†ä¸ä¼šä¸Šä¼ ï¼";
				this.showError(str)
			}
			var retAry = [];
			for (var i = 0; i < paras.num && i < this.imgMax; i++) {
				var code = this.getIndexCode();
				retAry.push(code);
				this.addLaod({
					code: code
				})
			}
			if (this.container.find(".imgbox").length >= this.imgMax) {
				this.disableBtns()
			}
			return retAry
		},
		singleAdd: function() {
			var code = this.getIndexCode();
			this.addLaod({
				code: code
			});
			this.resetInfo();
			return code
		},
		showError: function(paras) {
			popupWin(paras, "æ¸©é¦¨æç¤º", 14e3, 350, 150, "çŸ¥é“äº†")
		},
		hideError: function(paras) {
			this.conTr.find(".upload_Tip").hide();
			this.conTr.find(".upload_Tip .action_po_top").html("")
		},
		delImg: function(index) {
			this.container.find(".imgbox[code='" + index + "']").replaceWith("");
			this.hideError();
			this.resetInfo();
			var url = "";
			for (var i = 0; i < this.imgs.length; i++) {
				if (this.imgs[i].code == index) {
					url = this.imgs[i].url;
					this.imgs = this.imgs.slice(0, i).concat(this.imgs.slice(i + 1));
					break
				}
			}
			if (this.imgs.length < this.imgMax) {
				this.enableBtns()
			}
			this.resetInfo();
			for (var j = 0; j < this.delImgs.length; j++) {
				this.delImgs[j](index, url)
			}
			this.initFenmian()
		},
		setImgErr: function(infocode) {
			this.container.find(".imgbox[code='" + infocode + "']").find("span.wait_con").css("backgroundImage", "url(http://pic2.58.com/n/images/post/05043121.gif)");
			this.container.find(".imgbox[code='" + infocode + "']").find("span.wait").html("&nbsp;&nbsp;&nbsp;&nbsp;")
		},
		resetInfo: function() {
			var numobj = this.getImgNum();
			this.conTr.find(".upnum").html(numobj.hazNum);
			this.conTr.find(".maxnum").html(numobj.maxNum);
			if (numobj.hazNum > 0) {
				this.container.find("[name=hazupinfo]").show();
				this.conTr.find("[name=uploadEx]").hide();
				this.container.show()
			} else {
				if (this.container.find(".imgbox").length <= 0) {
					this.container.find("[name=hazupinfo]").hide();
					this.conTr.find("[name=uploadEx]").show();
					this.container.hide()
				}
			}
		},
		rbTAEvent: function(code) {
			this.container.find(".imgbox[code=" + code + "]").find("textarea").focus(function(evt) {
				var $obj = $(evt.target);
				if ($obj.val() == "å›¾ç‰‡æè¿°...") $obj.val("");
				$obj.removeClass("c_ccc").addClass("c_666");
				$obj.parents(".item_input").addClass("on");
				$obj.parents(".imgbox").css({
					"z-index": "99"
				})
			});
			this.container.find(".imgbox[code=" + code + "]").find("textarea").blur(function(evt) {
				var $obj = $(evt.target);
				if ($obj.val() == "") {
					$obj.val("å›¾ç‰‡æè¿°...");
					$obj.removeClass("c_666").addClass("c_ccc")
				}
				if ($obj.val().length > 50) {
					$obj.val($(this).val().substring(0, 50))
				}
				var code = $obj.parents(".imgbox").attr("code");
				self.UpImageShowBar.setDetail($(this).val(), code);
				$obj.parents(".item_input").removeClass("on");
				$obj.parents(".imgbox").css({
					"z-index": ""
				})
			});
			this.container.find(".imgbox[code=" + code + "]").find("textarea").keyup(function(evt) {
				var $obj = $(evt.target);
				var code = $obj.parents(".imgbox").attr("code");
				if (evt.which == 13) {
					$(this).val($(this).val().replace("\n", ""));
					$(this).blur();
					return false
				} else if (evt.which == 27) {
					$(this).val(self.UpImageShowBar.getDetail(code));
					$(this).blur();
					return false
				} else if ($(this).val().length > 50) {
					$(this).val($(this).val().substring(0, 50))
				}
			})
		},
		setDetail: function(val, code) {
			var imgs = self.UpImageShowBar.imgs;
			for (var i = 0; i < imgs.length; i++) {
				if (imgs[i].code == code) {
					self.UpImageShowBar.imgs[i].detail = val;
					return imgs[i]
				}
			}
		},
		getDetail: function(code) {
			var imgs = self.UpImageShowBar.imgs;
			for (var i = 0; i < imgs.length; i++) {
				if (imgs[i].code == code) {
					return imgs[i].detail
				}
			}
		},
		getImgs: function() {
			var ri = [];
			for (var i = 0; i < this.imgs.length; i++) {
				if (this.imgs[i].url && this.imgs[i].url.indexOf(".") >= 0) {
					ri.push(this.imgs[i])
				}
			}
			return ri
		},
		initFenmian: function() {
			this.container.find(".isfenmian:eq(0)").show();
			this.container.find(".isfenmian:gt(0)").hide();
			if (this.getFImgSize && this.imgs.length > 0 && this.imgs[0].url) {
				var fileName = this.imgs[0].url.match(/n_\d+/)[0];
				if (!self.UpImageShowBar.fileSizes[fileName]) {
					$.getJSON("http://post.image.58.com/imginfo.do?pic=" + this.imgs[0].url.replace("http://pic1.58cdn.com.cn", "") + "&callback=?", function(data) {
						var sizeObj = {
							width: data.width,
							height: data.height
						};
						self.UpImageShowBar.FSize = sizeObj;
						self.UpImageShowBar.fileSizes[fileName] = sizeObj
					})
				} else {
					self.UpImageShowBar.FSize = self.UpImageShowBar.fileSizes[fileName]
				}
			}
		},
		setUpstate: function(paras) {
			if (paras) {
				var upstateCon = this.container.find(".imgbox[code='" + paras.code + "'] .wait_con");
				if (paras.state == "0") {
					upstateCon.find("p").html("æœ¬åœ°åŽ‹ç¼©ä¸­...")
				} else if (paras.state == "1") {
					upstateCon.find("p").html(parseInt(paras.percent) + "%");
					upstateCon.find(".loading_progress").width(paras.percent + "%")
				}
			}
		},
		initBar: function(settings) {
			this.container = $("#" + settings.container);
			this.conTr = this.container.parent();
			if (settings.labels && settings.labels.length > 0) {
				this.labels = settings.labels;
				this.hazLabel = true
			}
			this.containerStr = settings.container;
			this.flashName = settings.container + "_SWF";
			if (settings.hazDetail == true) {
				this.hazDetail = true
			}
			if (settings.maxFilsSize) {
				this.maxFilsSize = settings.maxFilsSize
			}
			if (settings.imgMax) {
				this.imgMax = settings.imgMax
			}
			if (settings.getFImgSize) {
				this.getFImgSize = settings.getFImgSize;
				self.UpImageShowBar.fileSizes = {}
			}
			var flshVer = swfobject.getFlashPlayerVersion();
			if (this.hasFlash() && (flshVer.major > 10 || flshVer.major >= 10 && flshVer.minor >= 3)) {
				var swfVersionStr = "10.2.0";
				var xiSwfUrlStr = "http://pic2.58.com/ui7/fang/post/img/playerProductInstall.swf";
				var flashvars = {
					entity: objName + ".SWFUP"
				};
				var params = {};
				params.quality = "high";
				params.bgcolor = "#ffffff";
				params.allowscriptaccess = "always";
				params.allowfullscreen = "false";
				params.wmode = "opaque";
				var attributes = {};
				attributes.id = settings.container + "_SWF";
				attributes.name = settings.container + "_SWF";
				attributes.align = "left";
				swfobject.embedSWF("http://pic2.58.com/ui7/pubupimg/pubpicup.swf", settings.container + "flashContent", "86", "30", swfVersionStr, xiSwfUrlStr, flashvars, params, attributes);
				swfobject.createCSS("#" + settings.container + "flashContent", "display:block;text-align:left;");
				self.SWFUP.initFlashBtn({
					name: settings.container + "_SWF"
				});
				this.conTr.find("[name=size_limit]").html("10");
				this.conTr.find("[name=photo_type]").html("jpg/gif/png");
				if (navigator.platform.indexOf("Mac") > -1) {
					var ot = $($(".w_local span").get(1));
					ot.html(ot.html().replace("Ctrl", "command"));
					if (ot.html().indexOf("command") > -1) {
						ot.width(ot.width() + 30)
					}
				}
			} else {
				this.resetInfo();
				this.conTr.find("[name=size_limit]").html("2");
				this.conTr.find("[name=photo_type]").html("jpg/gif/bmp/png");
				self.SINGLEUP.initBtn({
					url: "http://post.image.58.com/upload"
				}, settings)
			}
			this.container.html("");
			if (settings.images && settings.images.length > 0) {
				for (var i = 0; i < settings.images.length; i++) {
					this.addImg(settings.images[i], true)
				}
				this.resetInfo()
			} else {
				try {
					this.enableBtns()
				} catch (e) {}
				this.resetInfo()
			}
			this.container.bind("click", this, function(evt) {
				var $obj = $(evt.target);
				if ($obj.hasClass("item_close")) {
					evt.data.delImg($obj.parents(".imgbox").attr("code"));
					return false
				} else if ($obj.parents("ul.hc").length > 0) {
					var $box = $obj.parents(".imgbox");
					$box.find(".seltext").html($obj.html());
					var index = $box.prevAll().length;
					evt.data.imgs[index].label = $obj.html();
					var $sel = $box.find(".hover");
					$sel.removeClass("hover");
					return false
				} else if ($obj.hasClass("setfenmian")) {
					var imgCon = $obj.parents(".imgbox");
					var imgboxs = self.UpImageShowBar.container.find(".imgbox");
					var clickI = imgboxs.index(imgCon);
					if (clickI == 0) return;
					imgboxs.eq(clickI).before(imgboxs.eq(0)).find(".setfenmian").hide();
					self.UpImageShowBar.container.prepend(imgCon);
					self.UpImageShowBar.initFenmian();
					var tep = self.UpImageShowBar.imgs[clickI];
					self.UpImageShowBar.imgs[clickI] = self.UpImageShowBar.imgs[0];
					self.UpImageShowBar.imgs[0] = tep
				}
			});
			this.container.bind("mouseover", this, function(evt) {
				var $obj = $(evt.target);
				if ($obj.hasClass("img_selector")) {
					$obj.addClass("hover")
				} else if ($obj.parents(".img_selector").length > 0) {
					$obj.parents(".img_selector").addClass("hover")
				} else if ($obj.parents(".w_upload").length > 0 && $obj.parents(".w_upload").find(".isfenmian:visible").length == 0) {
					$obj.parents(".w_upload").find(".setfenmian").css("opacity", .7).show()
				}
			}).bind("mouseout", this, function(evt) {
				var $obj = $(evt.target);
				if ($obj.hasClass("img_selector")) {
					$obj.removeClass("hover")
				} else if ($obj.parents(".img_selector").length > 0) {
					$obj.parents(".img_selector").removeClass("hover")
				} else if ($obj.parents(".w_upload").length > 0) {
					$obj.parents(".w_upload").find(".setfenmian").hide()
				}
			})
		}
	};
	this.getImgs = function() {
		return this.UpImageShowBar.getImgs()
	}
}
var swfobject = function() {
	var UNDEF = "undefined",
		OBJECT = "object",
		SHOCKWAVE_FLASH = "Shockwave Flash",
		SHOCKWAVE_FLASH_AX = "ShockwaveFlash.ShockwaveFlash",
		FLASH_MIME_TYPE = "application/x-shockwave-flash",
		EXPRESS_INSTALL_ID = "SWFObjectExprInst",
		ON_READY_STATE_CHANGE = "onreadystatechange",
		win = window,
		doc = document,
		nav = navigator,
		plugin = false,
		domLoadFnArr = [main],
		regObjArr = [],
		objIdArr = [],
		listenersArr = [],
		storedAltContent, storedAltContentId, storedCallbackFn, storedCallbackObj, isDomLoaded = false,
		isExpressInstallActive = false,
		dynamicStylesheet, dynamicStylesheetMedia, autoHideShow = true,
		ua = function() {
			var w3cdom = typeof doc.getElementById != UNDEF && typeof doc.getElementsByTagName != UNDEF && typeof doc.createElement != UNDEF,
				u = nav.userAgent.toLowerCase(),
				p = nav.platform.toLowerCase(),
				windows = p ? /win/.test(p) : /win/.test(u),
				mac = p ? /mac/.test(p) : /mac/.test(u),
				webkit = /webkit/.test(u) ? parseFloat(u.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false,
				ie = !+"1",
				playerVersion = [0, 0, 0],
				d = null;
			if (typeof nav.plugins != UNDEF && typeof nav.plugins[SHOCKWAVE_FLASH] == OBJECT) {
				d = nav.plugins[SHOCKWAVE_FLASH].description;
				if (d && !(typeof nav.mimeTypes != UNDEF && nav.mimeTypes[FLASH_MIME_TYPE] && !nav.mimeTypes[FLASH_MIME_TYPE].enabledPlugin)) {
					plugin = true;
					ie = false;
					d = d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
					playerVersion[0] = parseInt(d.replace(/^(.*)\..*$/, "$1"), 10);
					playerVersion[1] = parseInt(d.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
					playerVersion[2] = /[a-zA-Z]/.test(d) ? parseInt(d.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
				}
			} else if (typeof win.ActiveXObject != UNDEF) {
				try {
					var a = new ActiveXObject(SHOCKWAVE_FLASH_AX);
					if (a) {
						d = a.GetVariable("$version");
						if (d) {
							ie = true;
							d = d.split(" ")[1].split(",");
							playerVersion = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)]
						}
					}
				} catch (e) {}
			}
			return {
				w3: w3cdom,
				pv: playerVersion,
				wk: webkit,
				ie: ie,
				win: windows,
				mac: mac
			}
		}(),
		onDomLoad = function() {
			if (!ua.w3) {
				return
			}
			if (typeof doc.readyState != UNDEF && doc.readyState == "complete" || typeof doc.readyState == UNDEF && (doc.getElementsByTagName("body")[0] || doc.body)) {
				callDomLoadFunctions()
			}
			if (!isDomLoaded) {
				if (typeof doc.addEventListener != UNDEF) {
					doc.addEventListener("DOMContentLoaded", callDomLoadFunctions, false)
				}
				if (ua.ie && ua.win) {
					doc.attachEvent(ON_READY_STATE_CHANGE, function() {
						if (doc.readyState == "complete") {
							doc.detachEvent(ON_READY_STATE_CHANGE, arguments.callee);
							callDomLoadFunctions()
						}
					});
					if (win == top) {
						(function() {
							if (isDomLoaded) {
								return
							}
							try {
								doc.documentElement.doScroll("left")
							} catch (e) {
								setTimeout(arguments.callee, 0);
								return
							}
							callDomLoadFunctions()
						})()
					}
				}
				if (ua.wk) {
					(function() {
						if (isDomLoaded) {
							return
						}
						if (!/loaded|complete/.test(doc.readyState)) {
							setTimeout(arguments.callee, 0);
							return
						}
						callDomLoadFunctions()
					})()
				}
				addLoadEvent(callDomLoadFunctions)
			}
		}();

	function callDomLoadFunctions() {
		if (isDomLoaded) {
			return
		}
		try {
			var t = doc.getElementsByTagName("body")[0].appendChild(createElement("span"));
			t.parentNode.removeChild(t)
		} catch (e) {
			return
		}
		isDomLoaded = true;
		var dl = domLoadFnArr.length;
		for (var i = 0; i < dl; i++) {
			domLoadFnArr[i]()
		}
	}

	function addDomLoadEvent(fn) {
		if (isDomLoaded) {
			fn()
		} else {
			domLoadFnArr[domLoadFnArr.length] = fn
		}
	}

	function addLoadEvent(fn) {
		if (typeof win.addEventListener != UNDEF) {
			win.addEventListener("load", fn, false)
		} else if (typeof doc.addEventListener != UNDEF) {
			doc.addEventListener("load", fn, false)
		} else if (typeof win.attachEvent != UNDEF) {
			addListener(win, "onload", fn)
		} else if (typeof win.onload == "function") {
			var fnOld = win.onload;
			win.onload = function() {
				fnOld();
				fn()
			}
		} else {
			win.onload = fn
		}
	}

	function main() {
		if (plugin) {
			testPlayerVersion()
		} else {
			matchVersions()
		}
	}

	function testPlayerVersion() {
		var b = doc.getElementsByTagName("body")[0];
		var o = createElement(OBJECT);
		o.setAttribute("type", FLASH_MIME_TYPE);
		var t = b.appendChild(o);
		if (t) {
			var counter = 0;
			(function() {
				if (typeof t.GetVariable != UNDEF) {
					var d = t.GetVariable("$version");
					if (d) {
						d = d.split(" ")[1].split(",");
						ua.pv = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)]
					}
				} else if (counter < 10) {
					counter++;
					setTimeout(arguments.callee, 10);
					return
				}
				b.removeChild(o);
				t = null;
				matchVersions()
			})()
		} else {
			matchVersions()
		}
	}

	function matchVersions() {
		var rl = regObjArr.length;
		if (rl > 0) {
			for (var i = 0; i < rl; i++) {
				var id = regObjArr[i].id;
				var cb = regObjArr[i].callbackFn;
				var cbObj = {
					success: false,
					id: id
				};
				if (ua.pv[0] > 0) {
					var obj = getElementById(id);
					if (obj) {
						if (hasPlayerVersion(regObjArr[i].swfVersion) && !(ua.wk && ua.wk < 312)) {
							setVisibility(id, true);
							if (cb) {
								cbObj.success = true;
								cbObj.ref = getObjectById(id);
								cb(cbObj)
							}
						} else if (regObjArr[i].expressInstall && canExpressInstall()) {
							var att = {};
							att.data = regObjArr[i].expressInstall;
							att.width = obj.getAttribute("width") || "0";
							att.height = obj.getAttribute("height") || "0";
							if (obj.getAttribute("class")) {
								att.styleclass = obj.getAttribute("class")
							}
							if (obj.getAttribute("align")) {
								att.align = obj.getAttribute("align")
							}
							var par = {};
							var p = obj.getElementsByTagName("param");
							var pl = p.length;
							for (var j = 0; j < pl; j++) {
								if (p[j].getAttribute("name").toLowerCase() != "movie") {
									par[p[j].getAttribute("name")] = p[j].getAttribute("value")
								}
							}
							showExpressInstall(att, par, id, cb)
						} else {
							displayAltContent(obj);
							if (cb) {
								cb(cbObj)
							}
						}
					}
				} else {
					setVisibility(id, true);
					if (cb) {
						var o = getObjectById(id);
						if (o && typeof o.SetVariable != UNDEF) {
							cbObj.success = true;
							cbObj.ref = o
						}
						cb(cbObj)
					}
				}
			}
		}
	}

	function getObjectById(objectIdStr) {
		var r = null;
		var o = getElementById(objectIdStr);
		if (o && o.nodeName == "OBJECT") {
			if (typeof o.SetVariable != UNDEF) {
				r = o
			} else {
				var n = o.getElementsByTagName(OBJECT)[0];
				if (n) {
					r = n
				}
			}
		}
		return r
	}

	function canExpressInstall() {
		return !isExpressInstallActive && hasPlayerVersion("6.0.65") && (ua.win || ua.mac) && !(ua.wk && ua.wk < 312)
	}

	function showExpressInstall(att, par, replaceElemIdStr, callbackFn) {
		isExpressInstallActive = true;
		storedCallbackFn = callbackFn || null;
		storedCallbackObj = {
			success: false,
			id: replaceElemIdStr
		};
		var obj = getElementById(replaceElemIdStr);
		if (obj) {
			if (obj.nodeName == "OBJECT") {
				storedAltContent = abstractAltContent(obj);
				storedAltContentId = null
			} else {
				storedAltContent = obj;
				storedAltContentId = replaceElemIdStr
			}
			att.id = EXPRESS_INSTALL_ID;
			if (typeof att.width == UNDEF || !/%$/.test(att.width) && parseInt(att.width, 10) < 310) {
				att.width = "310"
			}
			if (typeof att.height == UNDEF || !/%$/.test(att.height) && parseInt(att.height, 10) < 137) {
				att.height = "137"
			}
			doc.title = doc.title.slice(0, 47) + " - Flash Player Installation";
			var pt = ua.ie && ua.win ? "ActiveX" : "PlugIn",
				fv = "MMredirectURL=" + encodeURI(window.location).toString().replace(/&/g, "%26") + "&MMplayerType=" + pt + "&MMdoctitle=" + doc.title;
			if (typeof par.flashvars != UNDEF) {
				par.flashvars += "&" + fv
			} else {
				par.flashvars = fv
			} if (ua.ie && ua.win && obj.readyState != 4) {
				var newObj = createElement("div");
				replaceElemIdStr += "SWFObjectNew";
				newObj.setAttribute("id", replaceElemIdStr);
				obj.parentNode.insertBefore(newObj, obj);
				obj.style.display = "none";
				(function() {
					if (obj.readyState == 4) {
						obj.parentNode.removeChild(obj)
					} else {
						setTimeout(arguments.callee, 10)
					}
				})()
			}
			createSWF(att, par, replaceElemIdStr)
		}
	}

	function displayAltContent(obj) {
		if (ua.ie && ua.win && obj.readyState != 4) {
			var el = createElement("div");
			obj.parentNode.insertBefore(el, obj);
			el.parentNode.replaceChild(abstractAltContent(obj), el);
			obj.style.display = "none";
			(function() {
				if (obj.readyState == 4) {
					obj.parentNode.removeChild(obj)
				} else {
					setTimeout(arguments.callee, 10)
				}
			})()
		} else {
			obj.parentNode.replaceChild(abstractAltContent(obj), obj)
		}
	}

	function abstractAltContent(obj) {
		var ac = createElement("div");
		if (ua.win && ua.ie) {
			ac.innerHTML = obj.innerHTML
		} else {
			var nestedObj = obj.getElementsByTagName(OBJECT)[0];
			if (nestedObj) {
				var c = nestedObj.childNodes;
				if (c) {
					var cl = c.length;
					for (var i = 0; i < cl; i++) {
						if (!(c[i].nodeType == 1 && c[i].nodeName == "PARAM") && !(c[i].nodeType == 8)) {
							ac.appendChild(c[i].cloneNode(true))
						}
					}
				}
			}
		}
		return ac
	}

	function createSWF(attObj, parObj, id) {
		var r, el = getElementById(id);
		if (ua.wk && ua.wk < 312) {
			return r
		}
		if (el) {
			if (typeof attObj.id == UNDEF) {
				attObj.id = id
			}
			if (ua.ie && ua.win) {
				var att = "";
				for (var i in attObj) {
					if (attObj[i] != Object.prototype[i]) {
						if (i.toLowerCase() == "data") {
							parObj.movie = attObj[i]
						} else if (i.toLowerCase() == "styleclass") {
							att += ' class="' + attObj[i] + '"'
						} else if (i.toLowerCase() != "classid") {
							att += " " + i + '="' + attObj[i] + '"'
						}
					}
				}
				var par = "";
				for (var j in parObj) {
					if (parObj[j] != Object.prototype[j]) {
						par += '<param name="' + j + '" value="' + parObj[j] + '" />'
					}
				}
				el.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + att + ">" + par + "</object>";
				objIdArr[objIdArr.length] = attObj.id;
				r = getElementById(attObj.id)
			} else {
				var o = createElement(OBJECT);
				o.setAttribute("type", FLASH_MIME_TYPE);
				for (var m in attObj) {
					if (attObj[m] != Object.prototype[m]) {
						if (m.toLowerCase() == "styleclass") {
							o.setAttribute("class", attObj[m])
						} else if (m.toLowerCase() != "classid") {
							o.setAttribute(m, attObj[m])
						}
					}
				}
				for (var n in parObj) {
					if (parObj[n] != Object.prototype[n] && n.toLowerCase() != "movie") {
						createObjParam(o, n, parObj[n])
					}
				}
				el.parentNode.replaceChild(o, el);
				r = o
			}
		}
		return r
	}

	function createObjParam(el, pName, pValue) {
		var p = createElement("param");
		p.setAttribute("name", pName);
		p.setAttribute("value", pValue);
		el.appendChild(p)
	}

	function removeSWF(id) {
		var obj = getElementById(id);
		if (obj && obj.nodeName == "OBJECT") {
			if (ua.ie && ua.win) {
				obj.style.display = "none";
				(function() {
					if (obj.readyState == 4) {
						removeObjectInIE(id)
					} else {
						setTimeout(arguments.callee, 10)
					}
				})()
			} else {
				obj.parentNode.removeChild(obj)
			}
		}
	}

	function removeObjectInIE(id) {
		var obj = getElementById(id);
		if (obj) {
			for (var i in obj) {
				if (typeof obj[i] == "function") {
					obj[i] = null
				}
			}
			obj.parentNode.removeChild(obj)
		}
	}

	function getElementById(id) {
		var el = null;
		try {
			el = doc.getElementById(id)
		} catch (e) {}
		return el
	}

	function createElement(el) {
		return doc.createElement(el)
	}

	function addListener(target, eventType, fn) {
		target.attachEvent(eventType, fn);
		listenersArr[listenersArr.length] = [target, eventType, fn]
	}

	function hasPlayerVersion(rv) {
		var pv = ua.pv,
			v = rv.split(".");
		v[0] = parseInt(v[0], 10);
		v[1] = parseInt(v[1], 10) || 0;
		v[2] = parseInt(v[2], 10) || 0;
		return pv[0] > v[0] || pv[0] == v[0] && pv[1] > v[1] || pv[0] == v[0] && pv[1] == v[1] && pv[2] >= v[2] ? true : false
	}

	function createCSS(sel, decl, media, newStyle) {
		if (ua.ie && ua.mac) {
			return
		}
		var h = doc.getElementsByTagName("head")[0];
		if (!h) {
			return
		}
		var m = media && typeof media == "string" ? media : "screen";
		if (newStyle) {
			dynamicStylesheet = null;
			dynamicStylesheetMedia = null
		}
		if (!dynamicStylesheet || dynamicStylesheetMedia != m) {
			var s = createElement("style");
			s.setAttribute("type", "text/css");
			s.setAttribute("media", m);
			dynamicStylesheet = h.appendChild(s);
			if (ua.ie && ua.win && typeof doc.styleSheets != UNDEF && doc.styleSheets.length > 0) {
				dynamicStylesheet = doc.styleSheets[doc.styleSheets.length - 1]
			}
			dynamicStylesheetMedia = m
		}
		if (ua.ie && ua.win) {
			if (dynamicStylesheet && typeof dynamicStylesheet.addRule == OBJECT) {
				dynamicStylesheet.addRule(sel, decl)
			}
		} else {
			if (dynamicStylesheet && typeof doc.createTextNode != UNDEF) {
				dynamicStylesheet.appendChild(doc.createTextNode(sel + " {" + decl + "}"))
			}
		}
	}

	function setVisibility(id, isVisible) {
		if (!autoHideShow) {
			return
		}
		var v = isVisible ? "visible" : "hidden";
		if (isDomLoaded && getElementById(id)) {
			getElementById(id).style.visibility = v
		} else {
			createCSS("#" + id, "visibility:" + v)
		}
	}

	function urlEncodeIfNecessary(s) {
		var regex = /[\\\"<>\.;]/;
		var hasBadChars = regex.exec(s) != null;
		return hasBadChars && typeof encodeURIComponent != UNDEF ? encodeURIComponent(s) : s
	}
	var cleanup = function() {
		if (ua.ie && ua.win) {
			window.attachEvent("onunload", function() {
				var ll = listenersArr.length;
				for (var i = 0; i < ll; i++) {
					listenersArr[i][0].detachEvent(listenersArr[i][1], listenersArr[i][2])
				}
				var il = objIdArr.length;
				for (var j = 0; j < il; j++) {
					removeSWF(objIdArr[j])
				}
				for (var k in ua) {
					ua[k] = null
				}
				ua = null;
				for (var l in swfobject) {
					swfobject[l] = null
				}
				swfobject = null
			})
		}
	}();
	return {
		registerObject: function(objectIdStr, swfVersionStr, xiSwfUrlStr, callbackFn) {
			if (ua.w3 && objectIdStr && swfVersionStr) {
				var regObj = {};
				regObj.id = objectIdStr;
				regObj.swfVersion = swfVersionStr;
				regObj.expressInstall = xiSwfUrlStr;
				regObj.callbackFn = callbackFn;
				regObjArr[regObjArr.length] = regObj;
				setVisibility(objectIdStr, false)
			} else if (callbackFn) {
				callbackFn({
					success: false,
					id: objectIdStr
				})
			}
		},
		getObjectById: function(objectIdStr) {
			if (ua.w3) {
				return getObjectById(objectIdStr)
			}
		},
		embedSWF: function(swfUrlStr, replaceElemIdStr, widthStr, heightStr, swfVersionStr, xiSwfUrlStr, flashvarsObj, parObj, attObj, callbackFn) {
			var callbackObj = {
				success: false,
				id: replaceElemIdStr
			};
			if (ua.w3 && !(ua.wk && ua.wk < 312) && swfUrlStr && replaceElemIdStr && widthStr && heightStr && swfVersionStr) {
				setVisibility(replaceElemIdStr, false);
				addDomLoadEvent(function() {
					widthStr += "";
					heightStr += "";
					var att = {};
					if (attObj && typeof attObj === OBJECT) {
						for (var i in attObj) {
							att[i] = attObj[i]
						}
					}
					att.data = swfUrlStr;
					att.width = widthStr;
					att.height = heightStr;
					var par = {};
					if (parObj && typeof parObj === OBJECT) {
						for (var j in parObj) {
							par[j] = parObj[j]
						}
					}
					if (flashvarsObj && typeof flashvarsObj === OBJECT) {
						for (var k in flashvarsObj) {
							if (typeof par.flashvars != UNDEF) {
								par.flashvars += "&" + k + "=" + flashvarsObj[k]
							} else {
								par.flashvars = k + "=" + flashvarsObj[k]
							}
						}
					}
					if (hasPlayerVersion(swfVersionStr)) {
						var obj = createSWF(att, par, replaceElemIdStr);
						if (att.id == replaceElemIdStr) {
							setVisibility(replaceElemIdStr, true)
						}
						callbackObj.success = true;
						callbackObj.ref = obj
					} else if (xiSwfUrlStr && canExpressInstall()) {
						att.data = xiSwfUrlStr;
						showExpressInstall(att, par, replaceElemIdStr, callbackFn);
						return
					} else {
						setVisibility(replaceElemIdStr, true)
					} if (callbackFn) {
						callbackFn(callbackObj)
					}
				})
			} else if (callbackFn) {
				callbackFn(callbackObj)
			}
		},
		switchOffAutoHideShow: function() {
			autoHideShow = false
		},
		ua: ua,
		getFlashPlayerVersion: function() {
			return {
				major: ua.pv[0],
				minor: ua.pv[1],
				release: ua.pv[2]
			}
		},
		hasFlashPlayerVersion: hasPlayerVersion,
		createSWF: function(attObj, parObj, replaceElemIdStr) {
			if (ua.w3) {
				return createSWF(attObj, parObj, replaceElemIdStr)
			} else {
				return undefined
			}
		},
		showExpressInstall: function(att, par, replaceElemIdStr, callbackFn) {
			if (ua.w3 && canExpressInstall()) {
				showExpressInstall(att, par, replaceElemIdStr, callbackFn)
			}
		},
		removeSWF: function(objElemIdStr) {
			if (ua.w3) {
				removeSWF(objElemIdStr)
			}
		},
		createCSS: function(selStr, declStr, mediaStr, newStyleBoolean) {
			if (ua.w3) {
				createCSS(selStr, declStr, mediaStr, newStyleBoolean)
			}
		},
		addDomLoadEvent: addDomLoadEvent,
		addLoadEvent: addLoadEvent,
		getQueryParamValue: function(param) {
			var q = doc.location.search || doc.location.hash;
			if (q) {
				if (/\?/.test(q)) {
					q = q.split("?")[1]
				}
				if (param == null) {
					return urlEncodeIfNecessary(q)
				}
				var pairs = q.split("&");
				for (var i = 0; i < pairs.length; i++) {
					if (pairs[i].substring(0, pairs[i].indexOf("=")) == param) {
						return urlEncodeIfNecessary(pairs[i].substring(pairs[i].indexOf("=") + 1))
					}
				}
			}
			return ""
		},
		expressInstallCallback: function() {
			if (isExpressInstallActive) {
				var obj = getElementById(EXPRESS_INSTALL_ID);
				if (obj && storedAltContent) {
					obj.parentNode.replaceChild(storedAltContent, obj);
					if (storedAltContentId) {
						setVisibility(storedAltContentId, true);
						if (ua.ie && ua.win) {
							storedAltContent.style.display = "block"
						}
					}
					if (storedCallbackFn) {
						storedCallbackFn(storedCallbackObj)
					}
				}
				isExpressInstallActive = false
			}
		}
	}
}();