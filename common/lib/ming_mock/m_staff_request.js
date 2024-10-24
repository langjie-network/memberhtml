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
                    request.setRequestHeader('token',localStorage.getItem('token'))
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
                    request.setRequestHeader('token',localStorage.getItem('token'))
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
                    request.setRequestHeader('token',localStorage.getItem('token'))
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
    };
    window.M.request={}
    window.M.request.get=get;
    window.M.request.post=post;
    window.M.request.put=put;
    window.M.checkLogin=async ()=>{
        return new Promise((resolve, reject)=>{
            if(localStorage.getItem('token')){
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
                            localStorage.setItem('token', res.data[0].token);
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

    window.M = M;
    window.MIO = M.IO;
    window.app = App;
})(window);



