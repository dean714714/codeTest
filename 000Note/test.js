"use strict";
var $input;
(function(){//刷新按钮
	
	$input = document.createElement('input');
	$input.type = 'button';
	$input.value = "refresh";
	$input.onclick = function(){
		location.reload();
	}
	$input.style.cssText = "padding:10px;line-height:20px;background:#0000ff;color:#fff;position:fixed;left:10px;top:10px;z-index: 10000;"
	document.body.appendChild($input);
	
})()
$input.value = location.search
function isEmpty(e) {
    for (var t in e) return !1;
    return !0
}

function isApp(e) {
    for (var t = window.navigator.userAgent.split(" "), o = !1, i = 0; i < t.length; i++) {
        if (t[i].split("/")[0] == e) return !0;
        o = !1
    }
    return o
}

function sendTokenToWap(e) {
    appGetData = e
}
var appGetData, monthNumDefault = (new Date).getMonth() + 1;
window.onload = function () {
    isApp("smkVersion") && (window.location.href = "smkapp://postSMKUserToken");
    var addVal = 100;
    new Promise(function (e, t) {
        var o = 0
            , i = parseInt($process.style.width)
            , n = parseInt($val.innerHTML);
        ! function t() {
            o <= 100 - i ? ($process.style.width = i + o + "%", $val.innerHTML = n + o + "%", o++, requestAnimationFrame(t)) : e()
        }()
    }).then(function (e) {
        $mask.parentNode.removeChild($mask)
    });
    var e = $(window).height();
    $("input").focus(function () {
        var t = $(this).offset().top;
        $(window).resize(function () {
            if ($(".swiper-slide").css({
                    height: e + "px"
                }), $(window).height() < e) {
                if (t < 250) return;
                $(".swiper-slide").css("top", 250 - t + "px")
            }
            else $(".swiper-slide").css("top", "0")
        })
    })
};
var app = new Vue({
    el: "#app"
    , data: {
        contentShow: !1
        , actionMaskShow: !1
        , doMaskShow: !1
        , dataLoadingShow: !1
        , swiperAppShow: !1
        , wxShareShow: !1
        , selMonthShow: !1
        , actionInfo: ""
        , thisDoKey: 0
        , doInfo: ""
        , slideShow: {
            page3Con1Show: !1
            , page3Con2Show: !1
            , page3Con3Show: !1
            , page3Con4Show: !1
            , page4Con1Show: !1
            , page4Con2Show: !1
            , page6Con1Show: !1
            , page6Con2Show: !1
            , page6Con3Show: !1
            , page7Con1Show: !1
            , page7Con2Show: !1
            , page7Con3Show: !1
        }
        , swiper: {}
        , loginConShow: !0
        , phoneNumInShow: !1
        , checkCodeInShow: !1
        , cardInShow: !1
        , monthNum: monthNumDefault + ""
        , phoneNum: ""
        , codeNum: ""
        , thisCardNum: ""
        , userName: ""
        , userId: ""
        , userlevel: 0
        , cardInfo: []
        , token: ""
        , bill: {
            bus_count: 0
            , subway_count: 0
            , park_count: 0
            , ride_time: 0
            , ride_km: 0
            , westlake_round: 0
            , fitness_count: 0
            , fitness_time: 0
            , save_electricity: 0
            , online_recharge_count: 0
            , online_recharge_money: 0
            , medical_count: 0
            , inter_room_settlement: 0
            , save_wait_time: 0
            , cost_money: 0
            , save_money: 0
            , bus_cost: 0
            , subway_cost: 0
            , park_cost: 0
            , save_co2: 0
            , save_rank: 0
        }
        , shareDataForTimeLine: {}
        , shareDataForMessage: {}
    }
    , computed: {
        selMonth: function () {
            for (var e = 1 * monthNumDefault, t = [], o = 1; o <= e; o++) t.push(o);
            return t.reverse()
        }
    }
    , mounted: function () {
        var e = this;
        (isApp("smkVersion") ? new Promise(function (t) {
            e.dataLoadingShow = !0, setTimeout(function () {
                e.token = appGetData, e.dataLoadingShow = !1, t()
            }, 1e3)
        }) : new Promise(function (e) {
            e()
        })).then(function (t) {
            e.init(), document.querySelector("#swiperApp").style.display = "block", e.mySwiper()
        }), this.isWeiXin()
    }
    , methods: {
        mySwiper: function () {
            var e = this;
            e.swiper = new Swiper(".swiper-container", {
                height: window.innerHeight
                , noSwiping: !0
                , loop: !1
                , speed: 400
                , direction: "vertical"
                , autoplayStopOnLast: !0
                , roundLengths: !0
                , passiveListeners: !1
                , onInit: function (e) {
                    swiperAnimateCache(e), swiperAnimate(e)
                }
                , onSlideChangeEnd: function (t) {
                    e.swiper.height = window.innerHeight;
                    t.activeIndex;
                    if (swiperAnimate(t), $(t.slides[t.activeIndex]).find(".counter").each(function () {
                            $(this).html();
                            $(this).SmkScrollNumber({
                                num: e.bill[$(this).data("val")] || 0
                                , speed: 1e3
                            })
                        }), "slide4" === $(t.slides[t.activeIndex]).attr("id")) {
                        $("#main").length > 0 && $("#main").remove();
                        var o = document.getElementById("chart-area").getContext("2d");
                        new Chart(o, {
                            type: "pie"
                            , data: {
                                labels: ["公交:￥" + e.bill.bus_cost, "地铁:￥" + e.bill.subway_cost, "P+R:￥" + e.bill.park_cost]
                                , datasets: [{
                                    label: "# of Votes"
                                    , data: [e.bill.bus_cost, e.bill.subway_cost, e.bill.park_cost]
                                    , backgroundColor: ["rgb(137, 202, 255)", "rgb(161, 155, 245)", "rgb(205, 143, 247)"]
                                    , borderColor: ["rgba(255,255,255,1)", "rgba(255,255,255,1)", "rgba(255,255,255,1)"]
                                    , borderWidth: 2
                                }]
                            }
                            , options: {
                                tooltips: {
                                    mode: "nearest"
                                    , intersect: !1
                                }
                                , legend: {
                                    display: !0
                                    , labels: {
                                        fontColor: "rgb(89, 130, 131)"
                                        , boxWidth: 20
                                        , usePointStyle: !0
                                    }
                                }
                            }
                        })
                    }
                }
            })
        }
        , removePage: function () {
            $(".swiper-slide");
            var e = $(".swiperSel")
                , t = void 0;
            for (var o in this.bill)
                if (this.bill.hasOwnProperty(o)) {
                    if (this.bill[o] > 0) {
                        t = !0;
                        break
                    }
                    t = !1
                }
            if (e.show(), e.addClass("swiper-slide"), !0 === t) e.eq(1).removeClass("swiper-slide"), e.eq(1).hide(), console.log("当前有数据，将显示数据展示页面！");
            else {
                for (var i = 2; i < e.length; i++) e.eq(i).removeClass("swiper-slide"), e.eq(i).hide();
                console.log("当前没有数据，将显示无数据提示页面！")
            }
        }
        , removeSlideCon: function () {
            Math.max(this.bill.park_count, this.bill.subway_count) < this.bill.bus_count ? (this.slideShow.page3Con1Show = !1, this.slideShow.page3Con2Show = !0, this.slideShow.page3Con3Show = !1, this.slideShow.page3Con4Show = !1) : Math.max(this.bill.bus_count, this.bill.subway_count) < this.bill.park_count ? (this.slideShow.page3Con1Show = !1, this.slideShow.page3Con2Show = !1, this.slideShow.page3Con3Show = !0, this.slideShow.page3Con4Show = !1) : Math.max(this.bill.bus_count, this.bill.park_count) < this.bill.subway_count ? (this.slideShow.page3Con1Show = !1, this.slideShow.page3Con2Show = !1, this.slideShow.page3Con3Show = !1, this.slideShow.page3Con4Show = !0) : (this.slideShow.page3Con1Show = !0, this.slideShow.page3Con2Show = !1, this.slideShow.page3Con3Show = !1, this.slideShow.page3Con4Show = !1), 1 === Math.ceil(2 * Math.random()) ? (this.slideShow.page4Con1Show = !0, this.slideShow.page4Con2Show = !1) : (this.slideShow.page4Con1Show = !1, this.slideShow.page4Con2Show = !0);
            var e = Math.ceil(2 * Math.random());
            0 === this.bill.fitness_count ? (this.slideShow.page6Con3Show = !0, this.slideShow.page6Con1Show = !1, this.slideShow.page6Con2Show = !1) : 1 === e ? (this.slideShow.page6Con1Show = !0, this.slideShow.page6Con2Show = !1, this.slideShow.page6Con3Show = !1) : (this.slideShow.page6Con1Show = !1, this.slideShow.page6Con2Show = !0, this.slideShow.page6Con3Show = !1);
            var t = Math.ceil(2 * Math.random());
            0 === this.bill.online_recharge_count && 0 === this.bill.medical_count && 0 === this.bill.inter_room_settlement ? (this.slideShow.page7Con1Show = !0, this.slideShow.page7Con2Show = !1, this.slideShow.page7Con3Show = !1) : 1 === t ? (this.slideShow.page7Con3Show = !0, this.slideShow.page7Con2Show = !1, this.slideShow.page7Con1Show = !1) : (this.slideShow.page7Con3Show = !1, this.slideShow.page7Con2Show = !0, this.slideShow.page7Con1Show = !1)
        }
        , setMonth: function (e) {
            var t = e.target;
            this.selMonthShow = !1, this.monthNum = t.innerHTML
        }
        , isWeiXin: function () {
            return "micromessenger" == window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i)
        }
        , IsPC: function () {
            var e = navigator.userAgent.toLowerCase()
                , t = "ipad" == e.match(/ipad/i)
                , o = "iphone os" == e.match(/iphone os/i)
                , i = "midp" == e.match(/midp/i)
                , n = "rv:1.2.3.4" == e.match(/rv:1.2.3.4/i)
                , s = "ucweb" == e.match(/ucweb/i)
                , a = "android" == e.match(/android/i)
                , h = "windows ce" == e.match(/windows ce/i)
                , r = "windows mobile" == e.match(/windows mobile/i);
            return !(t || o || i || n || s || a || h || r)
        }
        , isApp: function (e) {
            for (var t = window.navigator.userAgent.split(" "), o = !1, i = 0; i < t.length; i++) {
                if (t[i].split("/")[0] == e) return !0;
                o = !1
            }
            return o
        }
        , alertInfo: function (e) {
            this.actionMaskShow = !0, this.actionInfo = e, this.$refs.action.setAttribute("class", "action actionAni")
        }
        , alertDo: function (e, t) {
            this.thisDoKey = t, this.doMaskShow = !0, this.doInfo = e, this.$refs.action.setAttribute("class", "action actionAni")
        }
        , doIt: function (e) {
            e(this.thisDoKey), this.doMaskShow = !1
        }
        , init: function () {
            var e = this;
            new Promise(function (t) {
                e.isApp("smkVersion") ? new Promise(function (t) {
                    t(e.token)
                }).then(function (o) {
                    if (o) {
                        var i = o;
                        new Promise(function (e) {
                            getData("/big_data/ajax/auth.php", "post", {
                                cmd: "siginInByAppAccessToken"
                                , token: i
                            }, e)
                        }).then(function (o) {
                             if("ok" === o.status){
                             	e.userId = o.account, t("当前环境是APP")
                             }else{
                             	e.userId = 'f9718214514e4f01baf775a96be3d1d7';
                             	t("token获取失败请关闭页面重新进入")
                             	//window.location.href = "error.html", t("token获取失败请关闭页面重新进入")
                             }
                        })
                    }
                    else window.location.href = "error.html", t("token获取失败请关闭页面重新进入")
                }) : (e.userId = localStorage.getItem("userId") || null, t("当前环境是web"))
            }).then(function (t) {
                console.log(t), e.userId ? new Promise(function (t) {
                    getData("/big_data/ajax/auth.php", "post", {
                        cmd: "siginInByAccessCode"
                        , userid: e.userId
                        , ac: "biginsight"
                    }, t)
                }).then(function (t) {
                		e.alertInfo(t)
                    console.log(t.status), "fail" !== t.status ? e.getUserInfo().then(function () {
                        e.initSearchPage(), e.loginConShow = !1, e.goReal()
                    }) : e.alertInfo("免登验证失败请重新登录！")
                }) : (e.loginConShow = !0, e.loginName = "", e.phoneNum = "", e.codeNum = "", e.thisCardNum = "", e.cardInfo = [])
            })
        }
        , initSearchPage: function () {
            this.userlevel <= 1 && (this.loginName = "未实名")
        }
        , goReal: function () {
            this.userlevel < 2 ? this.alertInfo("当前用户未实名，请至【杭州市民卡】APP完成实名操作！  杭州通卡的添加仅用于个人月刊的生成，请自觉添加。") : this.alertInfo("当前用户已实名，账单信息会包含市民卡的用卡信息！  杭州通卡的添加仅用于个人月刊的生成，请自觉添加。")
        }
        , getYzm: function (e, t) {
            var o = this
                , i = e.target;
            this.checkPhone() && (isNaN($(i).html()) ? new Promise(function (e) {
                getData("/big_data/ajax/auth.php", "post", {
                    cmd: "getValidCode"
                    , mobile: o.phoneNum
                }, e)
            }).then(function (e) {
                $(i).html(t);
                var o = setInterval(function () {
                    $(i).html() > 0 ? $(i).html($(i).html() - 1) : (clearInterval(o), $(i).html("获取验证码"))
                }, 1e3)
            }) : o.alertInfo("请倒计时结束再重新获取！"))
        }
        , cPNShow: function () {
            this.phoneNumInShow = !this.phoneNumInShow, this.phoneNumInShow
        }
        , cCCShow: function () {
            this.checkCodeInShow = !this.checkCodeInShow, this.checkCodeInShow
        }
        , cIshow: function () {
            this.cardInShow = !this.cardInShow, this.cardInShow
        }
        , checkPhone: function () {
            var e = this.phoneNum
                , t = /^1[0-9]{10}$/;
            return e ? t.test(e) ? (this.cPNShow(), !0) : (this.alertInfo("这不是手机号,请重新输入"), !1) : (this.alertInfo("手机号不能为空！"), !1)
        }
        , checkCode: function () {
            var e = this;
            return new Promise(function (t) {
                getData("/big_data/ajax/auth.php", "post", {
                    cmd: "siginInByMobile"
                    , mobile: e.phoneNum
                    , vc: e.codeNum
                }, t)
            }).then(function (t) {
                var o = t.status;
                return "ok" === o ? console.log("验证码验证成功！") : e.alertInfo("验证码不正确，请确认输入！"), o
            })
        }
        , checkCard: function (e) {
            this.thisCardNum && this.cIshow()
        }
        , addCard: function () {
            var e = this.thisCardNum
                , t = this;
            if (e) {
                if (this.cardInfo.length >= 3) return void this.alertInfo("限定查询卡数为3张，您不能再添加了哦！");
                if (-1 !== $.inArray(e, this.cardInfo)) return void this.alertInfo("您已添加该卡不能重复添加！");
                this.thisCardNum = "", this.dataLoadingShow = !0, this.addCardToData(e).then(function (o) {
                    "failed" === o ? (t.dataLoadingShow = !1, t.alertInfo("卡号添加失败！杭州通卡请输入正确卡号，市民卡不支持手动添加，请至【杭州市民卡】APP进行实名！")) : (t.dataLoadingShow = !1, t.cardInfo.push(e))
                })
            }
            else this.alertInfo("卡号不能为空")
        }
        , addCardToData: function (e) {
            return new Promise(function (t) {
                getData("/big_data/ajax/relation.php", "post", {
                    cmd: "add"
                    , cardno: e
                }, t)
            }).then(function (e) {
                var t = e.status;
                return "failed" === t ? console.log("卡号写入数据库失败") : console.log("卡号写入数据库成功"), t
            })
        }
        , delCard: function (e) {
            var t = this.cardInfo[e];
            this.cardInfo.splice(e, 1), this.delCardInData(t)
        }
        , delCardInData: function (e) {
            new Promise(function (t) {
                getData("/big_data/ajax/relation.php", "post", {
                    cmd: "remove"
                    , cardno: e
                }, t)
            }).then(function (e) {
                "ok" === e.status ? console.log("删除数据库中该卡号成功") : console.log("删除数据库中该卡号失败")
            })
        }
        , setValue: function (e, t) {
            this[e] = t
        }
        , getValue: function (e) {
            return this[e]
        }
        , getUserInfo: function () {
            var e = this;
            return new Promise(function (t) {
                e.dataLoadingShow = !0, getData("/big_data/ajax/auth.php", "post", {
                    cmd: "getUserSummary"
                }, t)
            }).then(function (t) {
                return e.userName = parseInt(t.userlevel) < 2 ? "未实名" : "已实名", e.userId = t.userid || "", e.userlevel = parseInt(t.userlevel) || "", new Promise(function (e) {
                    getData("/big_data/ajax/relation.php", "post", {
                        cmd: "query"
                    }, e)
                }).then(function (t) {
                    if (e.dataLoadingShow = !1, status = t.status, "fail" != status)
                        for (var o = t.cards, i = 0; i < o.length; i++) "smk" !== o[i].cardtype && e.cardInfo.push(o[i].cardno);
                    else e.alertInfo("卡号获取失败！");
                    return status
                })
            })
        }
        , getCardInfo: function () {
            var e = this;
            return new Promise(function (t, o) {
                e.dataLoadingShow = !0;
                var i = 1 * e.monthNum < 9 ? (new Date).getFullYear() + "0" + e.monthNum : (new Date).getFullYear() + "" + e.monthNum;
                getData("/big_data/ajax/monkey.php", "post", {
                    monthcode: i
                }, t)
            }).then(function (t) {
                var o = t.status
                    , i = t.cardInfo;
                return console.log(t), "ok" === o ? (e.dataLoadingShow = !1, e.bill.bus_count = 1 * i.bus_count, e.bill.subway_count = 1 * i.subway_count, e.bill.park_count = 1 * i.park_count, e.bill.ride_time = 1 * i.ride_time, e.bill.ride_km = 1 * i.ride_km, e.bill.westlake_round = 1 * i.westlake_round, e.bill.fitness_count = 1 * i.fitness_count, e.bill.fitness_time = 1 * i.fitness_time, e.bill.save_electricity = 1 * i.save_electricity, e.bill.online_recharge_count = 1 * i.online_recharge_count, e.bill.online_recharge_money = 1 * i.online_recharge_money, e.bill.medical_count = 1 * i.medical_count, e.bill.inter_room_settlement = 1 * i.inter_room_settlement, e.bill.save_wait_time = 1 * i.save_wait_time, e.bill.cost_money = 1 * i.cost_money, e.bill.save_money = 1 * i.save_money, e.bill.bus_cost = 1 * i.bus_cost, e.bill.subway_cost = 1 * i.subway_cost, e.bill.park_cost = 1 * i.park_cost, e.bill.save_co2 = 1 * i.save_co2, e.bill.save_rank = 1 * i.save_rank, "ok") : (e.dataLoadingShow = !1, "fail")
            })
        }
        , loginIn: function () {
            var e = this
                , t = this.phoneNum
                , o = this.codeNum;
            t && o ? this.checkCode().then(function (t) {
                "fail" != t && e.getUserInfo().then(function (t) {
                    if (true) {
                        var o = e.userId;
                        e.storeId(o), e.loginConShow = !1, e.initSearchPage(), e.goReal()
                    }
                    else e.alertInfo("用户信息获取失败")
                })
            }) : this.alertInfo("手机号或验证码不能为空，请确认！")
        }
        , loginOut: function () {
            localStorage.clear(), this.init()
        }
        , search: function () {
            var e = this;
            this.getCardInfo().then(function (t) {
                "ok" === t ? (e.removePage(), e.removeSlideCon(), new Promise(function (o) {
                    e.swiper.init(), o(t)
                }).then(function (t) {
                    t ? e.swiper.slideNext() : e.alertInfo("swiper失败，联系程序狗！")
                })) : e.alertInfo("账单信息获取失败，请稍后重试！")
            })
        }
        , storeId: function (e) {
            localStorage.setItem("userId", e)
        }
        , share: function () {
            this.shareTo(), this.isWeiXin() ? (this.shareToWx(), this.wxShareShow = !0) : this.isApp("smkVersion") ? jsBridge.setShareInfo({
                title: this.shareDataForMessage.title
                , content: this.shareDataForMessage.desc
                , imageUrl: this.shareDataForMessage.imgUrl
                , shareUrl: this.shareDataForMessage.link
            }) : this.alertInfo("请用浏览器自带分享~")
        }
        , closeWxShare: function (e) {
            for (var t = $(e.target), o = t.children(), i = 0; i < o.length; i++) {
                if (o.eq(i) === t) return;
                this.wxShareShow = !1
            }
        }
        , shareToWx: function () {
            var e = this;
            wx.config(wx_conf), "undefined" != typeof wx && wx.ready(function () {
                wx.onMenuShareTimeline(e.shareDataForTimeLine), wx.onMenuShareAppMessage(e.shareDataForMessage), wx.onMenuShareQQ(e.shareDataForMessage), wx.onMenuShareQZone(e.shareDataForMessage), wx.hideMenuItems({
                    menuList: ["menuItem:exposeArticle", "menuItem:setFont", "menuItem:refresh", "menuItem:originPage", "menuItem:readMode", "menuItem:share:email"]
                })
            })
        }
        , shareTo: function () {
            var e = window.location.href.substring(0, window.location.href.lastIndexOf("/") + 1)
                , t = e + "share.html?save_co2=" + this.bill.save_co2 + "&save_rank=" + this.bill.save_rank + "&goOut=" + (1 * this.bill.bus_count + 1 * this.bill.subway_count + 1 * this.bill.park_count) + "&cost=" + (1 * this.bill.bus_cost + 1 * this.bill.subway_cost + 1 * this.bill.park_cost) + "&fitness_count=" + this.bill.fitness_count + "&save_electricity=" + this.bill.save_electricity + "&save_wait_time=" + this.bill.save_wait_time + "&save_money=" + this.bill.save_money
                , o = e + "img/shareImg.jpg";
            console.log(t), this.shareDataForMessage = {
                imgUrl: o
                , link: t
                , title: "看我" + parseInt(this.monthNum) + "月份的绿色生活月刊"
                , desc: "本月我打败了" + this.bill.save_rank + "%的大杭州用户，你呢？还不快来看看！"
                , success: function () {
                    getChance()
                }
                , cancel: function () {}
            }, this.shareDataForTimeLine = {
                imgUrl: o
                , link: t
                , title: "看我" + this.monthNum + "月份的绿色生活月刊"
                , desc: "本月我打败了" + 1 * this.bill.save_rank + "%的大杭州用户，你呢？还不快来看看！"
                , success: function () {
                    getChance()
                }
                , cancel: function () {}
            }
        }
    }
});