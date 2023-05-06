import S2sSocketIoWebPlugin from "./S2sSocketIoWebPlugin.js";


let s2sSocketIoWebPlugin= new S2sSocketIoWebPlugin({
    key:"S2sSocketIoWebPlugin",
    uid:"30786",
    clientId:"2654786.30786",
    socketIoHost:"https://s2sio.langjie.com",
    callback(evt,msg){
        if(msg){
            M.Component.simu_s2s_skq.appendMsg(msg);
        }
        switch (evt){
            case "event":{
                M.Component.simu_s2s_skq.dealEventMsg(msg.body);
                break;
            }
            case "system":{
                M.Component.simu_s2s_skq.dealSystemMsg(msg.body);
                break;
            }
        }
    }
});

app.use(s2sSocketIoWebPlugin,
    {


    }
)