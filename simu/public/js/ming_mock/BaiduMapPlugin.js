

class BaiduMapPlugin{

    constructor({ak}) {
        this.ak=ak
    }

    install(app,args){
        app.get("/BaiduMapPluginGetLocation",async (req,res)=>{
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async  position => {
                    let latitude = position.coords.latitude;//获取纬度
                    let longitude = position.coords.longitude;//获取经度
                    let r=await M.request.jsonp(`https://api.map.baidu.com/reverse_geocoding/v3/?ak=${this.ak}&output=json&coordtype=wgs84ll&location=${latitude},${longitude}&callback=showPub&_=${Date.now()}`)
                    res.send(r);
                }, error => {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            res.send("定位失败,用户拒绝请求地理定位");
                            break;
                        case error.POSITION_UNAVAILABLE:
                            res.send("定位失败,位置信息是不可用");
                            break;
                        case error.TIMEOUT:
                            res.send("定位失败,请求获取用户位置超时");
                            break;
                        case error.UNKNOWN_ERROR:
                            res.send("定位失败,定位系统失效");
                            break;
                    }
                });
            } else {
                res.send("不支持定位功能");
            }
        })
    }
}

export default BaiduMapPlugin;