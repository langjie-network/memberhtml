var version = '1.2.1';
/**
 * 路由配置
 */
function route(url){
     url= url.replace("/hybrid","/member_ajax")
     //return 'https://wx.langjie.com'+url;
     return ''+url;
}

function apiRoute(url){
    return 'https://api.langjie.com'+url;
}

window.api={}

api.showProgress=function(){

}
api.hideProgress=function(){

}

api.toast=function ({msg}){
    function $message() {
        this.time = 2000;
        this.timer = null;
        this.newDiv = null;
        this.message = "";
        this.fn = function(options, newclass) {
            if (typeof options === 'string') {
                this.message = options;
                this.time = 1000;
            } else if (typeof options === 'object') {
                this.time = options.time || 1000;
                this.message = options.message;
            } else {
                return
            }
            this.newDiv = document.createElement("div")
            this.newDiv.className = "message"
            this.newDiv.className += newclass || "";
            //自定义样式 可以注释掉行间样式
            this.newDiv.style =
                'position:absolute;left: 50%;top: 20%;-webkit-transform: translate(-50%, -50%);transform: translate(-50%, -50%);background-color: rgba(0, 0, 0, 0.8);color: #fff;padding: .6rem;font-size: 1rem;border-radius: .4rem;text-align: center;zIndex:2250';

            document.body.appendChild(this.newDiv);
            this.newDiv.innerHTML = this.message;

            this.closes = function() {
                //console.log(this)
                this.newDiv.parentNode.removeChild(this.newDiv);
                clearTimeout(this.timer);
                this.timer = null;
            }

            this.timer = setTimeout(this.closes.bind(this), this.time);
        }
        return this.fn.bind(this);
    }
    new $message()(msg)
}

api.execScript=function({script}){
    eval(script)
}

api.confirm=async (p1,callback)=>{
    window.confirm(p1.msg)
    callback({
        buttonIndex:1
    })
} 
api.closeWin=()=>{
    sessionStorage.setItem('refresh', 'true');
    history.go(-1)
}


api.openPicker =({
                   type,
                   date,
                   title
               },callback)=>{

       var _this = this;
        let curFullYear= new Date().getFullYear();
        weui.datePicker({
            start: curFullYear-5,
            end: curFullYear+2,
            defaultValue: [new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate()],
            onConfirm: function(result){
               // console.log("000",result)
                 let selDateArr= result
                if(type=="date"){
                    callback({
                        year:selDateArr[0].value,
                        month:selDateArr[1].value,
                        day:selDateArr[2].value,
                    })
                    return
                }
                // 二级调用：时间
                $('.ma_expect_date_picker .weui-picker').on('animationend webkitAnimationEnd', function() {
                    show_expect_time_picker(_this, result);
                });
            },
            id: 'ma_expect_date',
            className: 'ma_expect_date_picker'
         });

    // -----------------------二级调用：时间
    var hours = [],
        minites = [],
        symbol = [{ label: ':', value: 0 }];
    function show_expect_time_picker(_this, date) {
        var date = date[0].label + date[1].label + date[2].label;
        if (!hours.length) {
            for (var i = 0; i< 24; i++) {
                var hours_item = {};
                hours_item.label = ('' + i).length === 1 ? '0' + i : '' + i;
                hours_item.value = i;
                hours.push(hours_item);
            }
        }
        if (!minites.length) {
            for (var j= 0; j < 60; j++) {
                var minites_item = {};
                minites_item.label = ('' + j).length === 1 ? '0' + j : '' + j;
                minites_item.value = j;
                minites.push(minites_item);
            }
        }
        weui.picker(hours, symbol, minites, {
            defaultValue: [new Date().getHours()+1, 0, 0],
            onConfirm: function(result) {
                var time = result[0].label + ':' + result[2].label;
                var expect_date = date  + time;
                // $(_this).find('.weui-cell__ft').text(expect_date);
                expect_date= expect_date.replaceAll("年","-")
                expect_date=expect_date.replaceAll("月","-")
                expect_date=expect_date.replaceAll("日","-")
                expect_date=expect_date.replaceAll(":","-")
                expect_date=expect_date.split("-");
                let  selDate= new Date();
                selDate.setFullYear(Number.parseInt(expect_date[0]));
                selDate.setMonth(Number.parseInt(expect_date[1]));
                selDate.setDate(Number.parseInt(expect_date[2]));
                selDate.setHours(Number.parseInt(expect_date[3]));
                selDate.setMinutes(Number.parseInt(expect_date[4]));
                selDate.setSeconds(0);
                callback({
                    year:selDate.getFullYear(),
                    month:selDate.getMonth(),
                    day:selDate.getDate(),
                    hour:selDate.getHours(),
                    minute:selDate.getMinutes()
                })
            },
            id: 'ma_expect_time'
        });
    }
};


getParameter = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.href.substr(window.location.href.indexOf('?')).substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};


/**
 * log
 */
function log(data){
    data = typeof(data) == 'object'?JSON.stringify(data,null,4):data;

}

/**
 * 加载完成（取消300ms延迟）
 */
function apiReady(cb){
    window.onload = function () {
        //api.parseTapmode();
        api.pageParam=JSON.parse(sessionStorage.getItem("pageParams"))
        cb();
    }
}

/**
 * 刷新初始化
 */
function apiRefresh(cb) {
    var pullRefresh = new auiPullToRefresh({
        container: document.querySelector('.aui-refresh-content'),
        triggerDistance: 150
    },function(ret){
        if(ret.status=="success"){
            setTimeout(function(){
                pullRefresh.cancelLoading();
                api.toast({
                    msg: '刷新成功'
                });
                cb();
            },1500);
        }
    });
}

/**
 * 封装ajax
 */
function apiAjax(option,cb){
    // option.data.self_user_id = sessionStorage.getItem('user_id');
    // option.data.self_phone = sessionStorage.getItem('phone');
    var token = sessionStorage.getItem('token');
    // token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyMTAxIiwicGFzc1dvcmQiOiJlMTBhZGMzOTQ5YmE1OWFiYmU1NmUwNTdmMjBmODgzZSIsImlhdCI6MTYzODA4NTE1NSwiZXhwIjoxNjUzNjM3MTU1fQ.CNKidDui3Tlz3Uj7Br_YTtelPJhiSEh9Jib7fWxraJA'
    //alert(option.type)
    $.ajax({
        url:route(option.url),
        type:option.type?option.type:'get',
        beforeSend: function(request){
            request.setRequestHeader('token',token);
            request.setRequestHeader('version',version);
        },
        dataType:'json',
        timeout:30000,
        data: option.data,
        success:function(res){
            if(res.code==-100){
                window.location.href="/member/index"
                return
            }
            //alert(JSON.stringify(res))
    		cb(res);
        },
        error: function(err){
            try{
                api.toast({
                    msg: err.responseJSON.msg
                });
            }catch(e){

            }
        }
    });
}

/**
 * 检查是否登陆
 */
function checkLogin(cb){
    if(sessionStorage.getItem('token')){
        cb();
    }else{
        login(function(){
            cb();
        });
    }
}
function login(cb){
    if(sessionStorage.getItem('token')) return;

    $.ajax({
        type:"GET",
        url:"/member_ajax/userlogin",
        dataType:"json",
        data:{},
        beforeSend: function(xhr) {

        },
        headers: {'Content-Type':'application/json;charset=utf8'},
        success:function(res){
            api.hideProgress();
            api.toast({
                msg: res.msg
            });
            if(res.code==200){
                // alert(JSON.stringify(res))
                sessionStorage.setItem('username', res.data[0].user_name);
                sessionStorage.setItem('phone', res.data[0].phone);
                sessionStorage.setItem('user_id', res.data[0].user_id);
                sessionStorage.setItem('token', res.data[0].token);
                cb();
                //群发execScript需要更新登陆的页面
                updateLoginStatus();
            }
        },
        error: function(err){
            console.error(err)
        }
    });

    return;

}

function updateLoginStatus(){

}

/**
 * 2018-03-05 10:31:22
 */
function time(t){
    if(t){
    	  if(t=='0000-00-00') return t;
        var date = new Date(t);
    }else{
        var date = new Date();
    }
    var yy = date.getFullYear();
    var MM = date.getMonth()+1;
    var dd = date.getDate();
    if(date.getHours()<10){
        var HH = '0'+date.getHours();
    }else{
        var HH = date.getHours();
    }
    if(date.getMinutes()<10){
        var mm = '0'+date.getMinutes();
    }else{
        var mm = date.getMinutes();
    }
    if(date.getSeconds()<10){
        var ss = '0'+date.getSeconds();
    }else{
        var ss = date.getSeconds();
    }
    if(MM<10) MM = '0'+MM;
    if(dd<10) dd = '0'+dd;
    var time = yy + '-' + MM + '-' + dd +' '+HH+':'+mm+':'+ss;
    return time;
}

/**
 * 2018-03-05
 */
function dateTime(t){
    if(t){
       	if(t=='0000-00-00') return t;
        var date = new Date(t);
    }else{
        var date = new Date();
    }
    var yy = date.getFullYear();
    var MM = date.getMonth()+1;
    var dd = date.getDate();
    if(MM<10) MM ='0'+MM;
    if(dd<10) dd ='0'+dd;
    var time = yy + '-' + MM + '-' + dd;
    return time;
}

/**
 * 10:31:22
 */
function hoursTime(t){
    if(t){
    	  if(t=='0000-00-00') return t;
        var date = new Date(t);
    }else{
        var date = new Date();
    }
    if(date.getHours()<10){
        var HH = '0'+date.getHours();
    }else{
        var HH = date.getHours();
    }
    if(date.getMinutes()<10){
        var mm = '0'+date.getMinutes();
    }else{
        var mm = date.getMinutes();
    }
    if(date.getSeconds()<10){
        var ss = '0'+date.getSeconds();
    }else{
        var ss = date.getSeconds();
    }
    var time = HH+':'+mm+':'+ss;
    return time;
}

function openOrderFrame(num, obj) {
    $(".aui-tab-item").removeClass("aui-active")
    $(obj).addClass("aui-active");
    if(num==2){
        location.href="./frame1.html"
    }
    if(num==1){
        location.href="./meetOrders.html"
    }
    if(num==3){
        location.href="./otherOrders.html"
    }

    return
}

function getLevel() {
    const user_id = sessionStorage.getItem('user_id');
    if (user_id == 1302) {
        return 4;
    }
    return 6;
}


// 随意切换按钮
function randomSwitchBtn(tag) {
    // if (tag == $api.dom('#footer li.active')) return;
    var eFootLis = $api.domAll('#footer li'),
        eHeaderLis = $api.domAll('header li'),
        index = 0;
    for (var i = 0, len = eFootLis.length; i < len; i++) {
        if (tag == eFootLis[i]) {
            index = i;
        } else {
            $api.removeCls(eFootLis[i], 'active');
            $api.removeCls(eHeaderLis[i], 'active');
        }
    }
    $api.addCls(eFootLis[index], 'active');
    $api.addCls(eHeaderLis[index], 'active');
    if (index == 2) {
        var ind = $('#tab .aui-active').index();
        $('.showIcon').hide();
        $('.show_filter').show();
        if (ind == 0) {
            index = 4;
        } else if (ind == 2) {
            index = 5;
        }
    }
    let text= $(tag).text().trim();

    if(text=="首页"){
        location.href="../html/frame2.html"
    }
    if(text=="电话簿"){
        location.href="../html/frame0.html"
    }
    if(text=="联系单"){
        location.href="../html/meetOrders.html"
    }
    if(text=="车辆"){
        location.href="../html/frame3.html"
    }
    if(text=="元宝券"){
        location.href="../html/yb_voucher_frame.html"
    }


}