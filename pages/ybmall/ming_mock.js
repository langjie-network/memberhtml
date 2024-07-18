(function (window) {
    const M = {};
    //全局组件
    M.Component={}
    //全局缓存map
    M._globle_cacheMap = {}
    //全局对象缓存
    M._globle_lib_cacheMap={}
    //全局插件地址缓存
    M._globle_plugin_url_cacheMap={};
    //全局插件
    M._globle_plugin=new Set();


    M.config={
        baseUrl:()=>{},
        token:""
    }

    M.urlParse = function (url) {
        url = url.substr(url.indexOf("?") + 1);
        let t, n, r, i = url, s = {};
        t = i.split("&"),
            r = null,
            n = null;
        for (let o in t) {
            let u = t[o].indexOf("=");
            u !== -1 && (r = t[o].substr(0, u),
                n = t[o].substr(u + 1),
                s[r] = n);
        }
        return s
    };




    M.isPc=(()=>{
        var sUserAgent = navigator.userAgent.toLowerCase();
        if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent)) {
            return false;
        }
        return true;
    })();



    M.isWeiXin=(()=>{
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    })();

    M.getGloblePlugin=(pluginKey)=>{
        let plugin=null;
        M._globle_plugin.forEach(u=>{
            if(u.key==pluginKey){
                plugin=u;
            }
        })
        return plugin;
    }


    var App = {
        _get: {},
        get (methodName, callback) {
            M.IO.reg(methodName.replace("/", ""));
            methodName = M.formatUrl(methodName);
            App._get[methodName] = callback;
        },
        _begin: function () {
        },
        _end: function () {
        },

        begin(callback) {
            App._begin = callback;
        },
        end(callback) {
            App._end = callback;
        },
        use(url,callback){
            if(typeof url === 'function' || typeof url === 'object'  ){
                let plugin=url;
                let args=callback;
                if(plugin.installed){
                    return App;
                }
                if (typeof plugin === 'function') {
                    plugin(App, args);
                } else {
                    plugin.install(App, args);
                }
                plugin.installed = true;
                M._globle_plugin.add(plugin);
            }else {
                if (Array.isArray(url)) {
                    url.forEach(u=>{
                        let regExp=new RegExp(u)
                        App._use[u] = {url,regExp,callback};
                    })
                } else {
                    let regExp=new RegExp(url)
                    App._use[url] = {url,regExp,callback};
                }
            }
            return App;
        },
        async installPlugin(pluginUrl,constructorParams,pluginParams){
            if(M._globle_plugin_url_cacheMap[pluginUrl]){
                return
            }
            M._globle_plugin_url_cacheMap[pluginUrl]=pluginUrl;
            return  new Promise(resolve => {
                import(pluginUrl).then(async modul=>{
                    const Plugin= modul.default;
                    const plugin= new Plugin(constructorParams);
                    App.use(plugin,pluginParams)
                    resolve(plugin);
                })
            })
        },
        async doget(methodName,params,callback) {
            const req = {};
            const res = {};
            req.params = params||{};
            req.url = methodName;
            res.send = function (d) {
                res.alreadySend = true;
                callback(d);
                App._end(req, d);
            }.bind(this);
            await App._begin(req, res);
            if (!res.alreadySend) await App._get[methodName](req, res);
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

    /**
     * 去掉参数加让斜杠
     */
    M.formatUrl = function (url) {
        if (url.indexOf("?") > 0) {
            url = url.substr(0, url.indexOf("?"));
        } else {
            url = url;
        }
        if (!url.startsWith('/')) {
            url = '/' + url;
        }
        return url;
    };


    M.get = function (url, param) {
        let u;
        App.doget(url,param,(d)=>{
            u = d;
        });
        return u;
    };

    M.delayMs=async function (ms){
        return new Promise(r=>{
            setTimeout(()=>{
                r(1)
            },ms)
        })
    }


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
        let locationhref =window.location.href;
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = locationhref.substr(locationhref.indexOf('?')).substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    };

    M.urlStringify = function (obj) {
        if (obj !== null && typeof obj === 'object') {
            var keys = Object.keys(obj);
            var len = keys.length;
            var flast = len - 1;
            var fields = '';
            for (var i = 0; i < len; ++i) {
                var k = keys[i];
                var v = obj[k];
                var ks = k + "=";
                fields += ks + v;
                if (i < flast) {
                    fields += "&";
                }
            }
            return fields;
        }
        return '';
    };

    const translateApi=(api)=>{
        let url=M.config.baseUrl(api) ;
        if(!api.startsWith("http")){
            api=url
        }
        return api;
    }


    function preHeader(headers){
        let reqHeader=headers||{
            'Content-Type': 'application/json',
            "token":M.config.token
        }
        return reqHeader;
    }


    const post  = async (api, params = {},headers) => {
        api=translateApi(api)
        return new Promise((reslove, reject) => {
            fetch(api, {
                method: 'POST',
                mode: 'cors',
                headers:preHeader(headers),
                body: JSON.stringify(params)
            }).then(function (response) {
                return response.json();
            }).then((res) => {
                reslove(res)
            }).catch((err) => {
                reject(err)
            });
        })
    }
    const get = async (api, params = {},headers) => {
        api=translateApi(api)
        let getData = "";
        if (params) {
            getData = window.M.urlStringify(params);
            if (api.indexOf("?") > 0) {
                getData = "&" + getData;
            } else {
                getData = "?" + getData;
            }
        }
        api = api + getData;
        return new Promise((reslove, reject) => {
            fetch(api, {
                method: 'GET',
                mode: 'cors',
                headers: preHeader(headers),
            }).then(function (response) {
                return response.json();
            }).then((res) => {
                reslove(res)
            }).catch((err) => {
                reject(err)
            });
        })
    };
    const jsonp=async (url, callbackFunction)=>{
        return new Promise(resolve => {
            let callbackStr = M.urlParse(url).callback;
            window[callbackStr]=(...params)=>{
                if(callbackFunction) {
                    callbackFunction(params);
                }
                document.body.removeChild(document.getElementById("ming_mock_jsonp_id"))
                resolve(params);
            }
            var scriptElement = document.createElement('script');
            scriptElement.src = url;
            scriptElement.id="ming_mock_jsonp_id"
            document.body.appendChild(scriptElement);
        })
    };

    window.M = M;
    window.MIO = M.IO;
//将ajax请求挂到全局对象M上
    M.init();
    window.M.request={}
    window.M.request.get=get;
    window.M.request.post=post;
    window.M.request.jsonp=jsonp;
    window.app = App;
})(window);