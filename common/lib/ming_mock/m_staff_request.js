(function (window, undefined) {
    window.M={}
    var App = {
        _get: {},
        _begin: function () {
        },
        begin(callback) {
            App._begin = callback;
        },
        get (methodName, callback) {
            //在M.IO上注册一个方法
            methodName= methodName.replace("/", "")
            M.IO.reg(methodName);
            App._get[methodName] = callback;
        },
        async doget(methodName,params,callback) {
            const req = {};
            const res = {};
            req.url = methodName;
            req.params = params;
            await App._begin(req, res);
            res.send = function (d) {
                callback(d);
            }.bind(this);
            App._get[methodName](req, res);
        }
    };
    //服务方法注册
    M.IO = {};
    M.IO.reg = function (methedName) {
        M.IO[methedName] = (param) => {
            return new Promise(
                function (reslove) {
                    App.doget(methedName,param,(d)=>{
                        reslove(d);
                    })
                }
            )
        }
    };

    const dealErrRequest=(err)=>{
        //token过期
        if(err.responseJSON.msg==="非法签名"){
            window.location.href="/m/staff"
        } else {
            alert(err.responseJSON.msg)
        }
    }

    const post  = async (api, params = {},headers) => {
        return new Promise((reslove, reject) => {
            $.ajax({
                type:"post",
                url:api,
                dataType:"json",
                contentType: "application/json",
                data:JSON.stringify(params),
                beforeSend: function(request) {
                    request.setRequestHeader('token',localStorage.getItem('lj_token'))
                },
                headers: headers|| {'Content-Type':'application/json;charset=utf8'},
                success:function(data){
                    reslove(data)
                },
                error: function(err){
                    dealErrRequest(err);
                    reject(err)
                }
            });
        });
    }

    const put  = async (api, params = {},headers) => {
        return new Promise((reslove, reject) => {
            $.ajax({
                type:"put",
                url:api,
                dataType:"json",
                contentType: "application/json",
                data:JSON.stringify(params),
                beforeSend: function(request) {
                    request.setRequestHeader('token',localStorage.getItem('lj_token'))
                },
                headers: headers|| {'Content-Type':'application/json;charset=utf8'},
                success:function(data){
                    reslove(data)
                },
                error: function(err){
                    dealErrRequest(err);
                    reject(err)
                }
            });
        });
    }



    const del  = async (api, params = {},headers) => {
        return new Promise((reslove, reject) => {
            $.ajax({
                type:"delete",
                url:api,
                dataType:"json",
                contentType: "application/json",
                data:JSON.stringify(params),
                beforeSend: function(request) {
                    request.setRequestHeader('token',localStorage.getItem('lj_token'))
                },
                headers: headers|| {'Content-Type':'application/json;charset=utf8'},
                success:function(data){
                    reslove(data)
                },
                error: function(err){
                    dealErrRequest(err);
                    reject(err)
                }
            });
        });
    }


    const get = async (api, params = {},headers) => {
        return new Promise((reslove, reject) => {
            $.ajax({
                type:"GET",
                url:api,
                dataType:"json",
                data:params,
                beforeSend: function(request) {
                    request.setRequestHeader('token',localStorage.getItem('lj_token'))
                },
                headers: headers|| {'Content-Type':'application/json;charset=utf8'},
                success:function(data){
                    if(data.code==-100){
                        window.location.href="/m/staff";
                        return;
                    }
                    reslove(data)
                },
                error: function(err){
                    dealErrRequest(err);
                    reject(err)
                }
            });
        });
    };


    M.init = function () {
        //格式化日期
        Date.prototype.format = function (fmt) {
            var o = {
                "M+": this.getMonth() + 1,                 //月份
                "d+": this.getDate(),                    //日
                "h+": this.getHours(),                   //小时
                "m+": this.getMinutes(),                 //分
                "s+": this.getSeconds(),                 //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds()             //毫秒
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
            return fmt;
        }
    };

    const getPageParam=()=>{
        const pageParamsStr=  sessionStorage.getItem("pageParams");
        if(pageParamsStr==null||pageParamsStr==""){
            return {}
        }
        return JSON.parse(pageParamsStr);
    }

    const setPageParam=(pageParams)=>{
        sessionStorage.setItem("pageParams",JSON.stringify(pageParams));
        return null;
    }

    function getLocation() {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    resolve([latitude, longitude]);
                }, error => {
                    reject(error);
                });
            } else {
                reject(new Error("您的浏览器不支持地理定位功能。"));
            }
        });
    }

    M.getParameter = function (name) {
        let locationhref =window.location.href;
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = locationhref.substr(locationhref.indexOf('?')).substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    };

    M.checkR=function (r){
        return r.code==200 || r.code==0;
    }
    window.M.request={}
    window.M.request.get=get;
    window.M.request.post=post;
    window.M.request.put=put;
    window.M.request.delete=del;
    window.M.getLocation=getLocation;
    window.M.getPageParam=getPageParam;
    window.M.setPageParam=setPageParam;
    window.M.checkLogin=async ()=>{
        return new Promise((resolve, reject)=>{
            if(localStorage.getItem('lj_token')){
                resolve(1);
                return;
            }else{
                $.ajax({
                    type:"GET",
                    url:"/member_ajax/userlogin",
                    dataType:"json",
                    data:{},
                    beforeSend: function(xhr) {
                    },
                    headers: {'Content-Type':'application/json;charset=utf8'},
                    success:function(res){
                        if(res.code==200||res.code==0){
                            localStorage.setItem('username', res.data[0].user_name);
                            localStorage.setItem('phone', res.data[0].phone);
                            localStorage.setItem('user_id', res.data[0].user_id);
                            localStorage.setItem('lj_token', res.data[0].token);
                            resolve(3);
                        }else {
                            window.location.href="/m/staff"
                            resolve(-2);
                        }
                    },
                    error: function(err){
                        dealErrRequest(err);
                    }
                });
            }
        })

    }
    M.init();
    window.M = M;
    window.MIO = M.IO;
    window.app = App;
})(window);



