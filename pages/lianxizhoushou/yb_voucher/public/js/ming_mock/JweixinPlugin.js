class JweixinPlugin{
    constructor({wxConfigUrl}) {
        this.wxConfigUrl=wxConfigUrl;
        this.isConfig=false;
    }
    install(app,args){
        let that=this;
        app.get("wxConfig",async (req,res)=>{
            let {readyCallBack} =req.params;
            //已经wx.config过
            if(that.isConfig){
                readyCallBack();
                return;
            }
            const page = window.location.href.split("#")[0];
            let timestamp = Date.now();
            $.ajax({
                url: this.wxConfigUrl,
                type: 'get',
                data: {
                    page: page,
                    timestamp: timestamp
                },
                dataType: "json",
                success: function (res) {
                    let config={};
                    config.appId = res.data.appId;
                    config.signature = res.data.signature;
                    config.nonceStr = res.data.nonceStr;
                    config.timestamp = timestamp;
                    config.jsApiList = ['scanQRCode','previewImage'];
                    //只执行一次
                    wx.config(config);
                    wx.ready(function () {
                        readyCallBack();
                        that.isConfig=true;
                    });
                },
                error:function (e){
                    console.error(e)
                }
            });
            res.send("success")
        })
    }
}

export default JweixinPlugin;