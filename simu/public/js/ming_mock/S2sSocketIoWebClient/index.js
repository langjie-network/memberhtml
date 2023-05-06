import S2sSocketIoWebPlugin from "./S2sSocketIoWebPlugin.js";


let s2sSocketIoWebPlugin= new S2sSocketIoWebPlugin({
    key:"S2sSocketIoWebPlugin",
    uid:"30786",
    clientId:"2654786.c2",
    socketIoHost:"https://s2sio.langjie.com",
    callback(evt,msg){
        if(msg){
            M.Component.simu_s2s_skq.appendMsg(msg);
        }
        if(evt=="event"){
            M.Component.simu_s2s_skq.dealEventMsg(msg.body);
        }
       //console.log(evt,msg);
    }
});

app.use(s2sSocketIoWebPlugin,{




    }
)