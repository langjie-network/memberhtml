(function (window) {
    var M = {};
    M.Component={};
    var App = {
        _get: {},
        get (methodName, callback) {
            //在M.IO上注册一个方法
            M.IO.reg(methodName.replace("/", ""));
            App._get[methodName] = callback;
        },
        doget(methodName,params,callback) {
            req = {};
            res = {};
            req.params = params;
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
                    App.doget("/" + methedName,param,(d)=>{
                        reslove(d);
                    })
                }
            )
        }
    };
    M.get = function (url, param) {
        let u;
        App.doget(url,param,(d)=>{
            u = d;
        });
        return u;
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

    M.getParameter = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.href.substr(window.location.href.indexOf('?')).substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    };
    const get = async (api, params = {},headers) => {
        //console.log("gggggggggggggggg")
       // api=M.config.oncegame_host+api;
        return new Promise((reslove, reject) => {
            $.ajax({
                type:"GET",
                url:api,
                dataType:"json",
                data:params,
                beforeSend: function(xhr) {

                },
                headers: headers|| {'Content-Type':'application/json;charset=utf8'},
                success:function(res){
                    if(res.code==-100){
                        location.href=`/member/index`;
                    }
                    reslove(res)
                },
                error: function(err){
                    reject(err)
                }
            });
        });
    };
    const post  = async (api, params = {},headers) => {
    
        return new Promise((reslove, reject) => {
            $.ajax({
                type:"POST",
                url:api,
                dataType:"json",
                data:JSON.stringify(params),
                beforeSend: function(xhr) {

                },
                headers:  headers||{'Content-Type':'application/json;charset=utf8'},
                success:function(res){
                    if(res.code==-100){
                        location.href=`/member/index`;
                    }

                    reslove(res)
                },
                error: function(err){
                    reject(err)
                }
            });
        });
    }


    M.throttle  = function(func, wait, options) {
        var context, args, result;
        var timeout = null;
        var previous = 0;
        if (!options) options = {};
        var later = function() {
            previous = options.leading === false ? 0 : new Date().getTime();
            timeout = null;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        };
        return function() {
            var now = new Date().getTime();
            if (!previous && options.leading === false) previous = now;
            // 计算剩余时间
            var remaining = wait - (now - previous);
            //console.log("wait",wait,"now",now,"previous",previous)
            //console.log("AAA",remaining)
            context = this;
            args = arguments;
            // 当到达wait指定的时间间隔，则调用func函数
            // 精彩之处：按理来说remaining <= 0已经足够证明已经到达wait的时间间隔，但这里还考虑到假如客户端修改了系统时间则马上执行func函数。
            if (remaining <= 0 || remaining > wait) {
                // 由于setTimeout存在最小时间精度问题，因此会存在到达wait的时间间隔，但之前设置的setTimeout操作还没被执行，因此为保险起见，这里先清理setTimeout操作
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            } else if (!timeout && options.trailing !== false) {
                // options.trailing=true时，延时执行func函数
                timeout = setTimeout(later, remaining);
            }
            return result;
        };
    };



    M.debounce =function(fn, wait, immediate) {
        immediate = immediate || false;
        var timer = null;
        var count = 0;
        return function () {
            var _this = this;
            var _arg = arguments;
            clearTimeout(timer);
            if (immediate && !count) {
                fn.apply(_this, _arg);
                count++;
            } else {
                timer = setTimeout(function () {
                    console.log(this);
                    fn.apply(_this, _arg);
                    count++;
                }, wait);
            }


        }

    }



    window.M = M;
    window.MIO = M.IO;
//将ajax请求挂到全局对象M上
    M.init();
    window.M.request={}
    window.M.request.get=get;
    window.M.request.post=post;
    window.app = App;
})(window);