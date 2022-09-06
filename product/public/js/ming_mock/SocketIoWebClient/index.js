import SocketIoWebPlugin from "./SocketIoWebPlugin.js";
import {JsonRpcCallMethodEnum,JsonRpcEventMethodEnum} from "./enum.js";



let socketIoWebPlugin= new SocketIoWebPlugin({
    key:"SocketIoWebPlugin"
});

app.use(socketIoWebPlugin,{
        connect(msg){
            console.log("connect",msg);

            //重新查一下手控器状态
            if(M.gp.$route.fullPath=="/hard_skq"){
                M.Component.hard_skq.eventWxClientConnect(msg);
            }
            if(M.gp.$route.fullPath=="/product_skq"){
                M.Component.product_skq.eventWxClientConnect(msg);
            }
            if(M.gp.$route.fullPath=="/geren_skq"){
                M.Component.geren_skq.eventWxClientConnect(msg);
            }
        },
        disconnect(msg){
            console.log("disconnect",msg);
            if(M.gp.$route.fullPath=="/hard_skq"){
                M.Component.hard_skq.socketIoDisConnect();
                return;
            }
            if(M.gp.$route.fullPath=="/geren_skq"){
                M.Component.geren_skq.socketIoDisConnect();
                return;
            }
            if(M.gp.$route.fullPath=="/product_skq"){
                M.Component.product_skq.socketIoDisConnect();
                return;
            }
        },
        event(msg){
            let msgData=msg.params;
            switch (msg.method){
                case JsonRpcEventMethodEnum.vtcLog:{
                   if(M.gp.$route.fullPath=="/hard_skq"){
                        M.Component.hard_skq.eventVtcLog(msgData);
                        return
                    }

                    if(M.gp.$route.fullPath=="/geren_skq"){
                        M.Component.geren_skq.eventVtcLog(msgData);
                        return
                    }
                    if(M.gp.$route.fullPath=="/product_skq"){
                        M.Component.product_skq.eventVtcLog(msgData);
                        return;
                    }
                    break;
                }
                case JsonRpcEventMethodEnum.wxClientConnect:{
                    if(M.gp.$route.fullPath=="/hard_skq"){
                        M.Component.hard_skq.eventWxClientConnect({code:0});
                    }
                    if(M.gp.$route.fullPath=="/geren_skq"){
                        M.Component.geren_skq.eventWxClientConnect(msgData);
                        return
                    }
                    if(M.gp.$route.fullPath=="/product_skq"){
                        M.Component.product_skq.eventWxClientConnect({code:0});
                    }
                    break;
                }
            }
        },
        call(msg){
            switch (msg.method){
                case "call."+JsonRpcCallMethodEnum.keep_pressure:{
                    break;
                }
            }
        },
        replay(msg){
            let replayCallBack=socketIoWebPlugin.JsonRpcReplayMap[msg.method]
            if(replayCallBack && replayCallBack.id==msg.id){
                replayCallBack.callback(msg.params);
            }
        },
        changeChannel(v){
            if(M.config.debug){
                console.log("c=>",v);
            }
            switch (M.gp.$route.fullPath){
                case "/":{
                    break;
                }
                case "/hard_skq":{
                    M.Component.hard_skq.dispValue=v.disp;
                    break;
                }
                case "/product_skq":{
                    M.Component.product_skq.dispValue=v.disp;
                    break;
                }

                case "/geren_skq":{
                    M.Component.geren_skq.dispValue=v.disp;
                    break;
                }
            }
       }
    }
)