import {SocketIoEventEnum} from "./enum.js";


class SocketIoWebPlugin {


    constructor(socketIoConfig) {
        this.key=socketIoConfig.key;
        this.clientId=socketIoConfig.clientId;
        this.productClientId="";
        this.path=socketIoConfig.path;
        this.host=socketIoConfig.host;
        this.unionid="";
        this.connectGroup="";
        this.connectFun=()=>{};
        this.disConnectFun=()=>{};
        this.eventFun=()=>{};
        this.callFun=()=>{};
        this.replayFun=()=>{};
        this.datagramArray=[];
        this.JsonRpcReplayMap={}
    }
    async connect(){
        let that=this;
        let socketConfigRes=await MIO.plcm_socketio_applySocketio();
        if(!M.checkR(socketConfigRes)){
            that.connectFun(socketConfigRes);
            return
        }
        let socketConfig=socketConfigRes.data;
        this.host=socketConfig.socketioHost;
        this.clientId=socketConfig.clientId;
        this.productClientId=socketConfig.productClientId;
        this.connectGroup=socketConfig.connectGroup;
        this.unionid=M.userInfo.unionid;
        var socket = window.io(
            that.host+ '/?clientId='+this.clientId+"&unionid="+this.unionid
            ,{path:``});
        this.socket=socket;
        socket.on(SocketIoEventEnum.EVENT,async function (msg) {
            that.eventFun(msg);
        });
        socket.on(SocketIoEventEnum.CALL,async function (msg) {
            that.callFun(msg);
        });
        socket.on(SocketIoEventEnum.DATAGRAM,async function (msg) {
            that.datagramArray.push(msg.params);
        });
        socket.on(SocketIoEventEnum.REPLY,async function (msg) {
            that.replayFun(msg);
        });
        socket.on('connect',async function(data){
            //连接正常的事件
            that.connectFun(socketConfigRes);
            console.log( '- connect');
        });
        socket.on('connect_error', function(data){
            console.log(JSON.stringify(data)+ ' - connect_error');
        });
        socket.on('connect_timeout', function(data){
            console.log(JSON.stringify(data)+ ' - connect_timeout');
        });
        socket.on('error', function(data){
            console.log(JSON.stringify(data) + ' - error');
        });
        socket.on('disconnect', function(data){
            //失去连接的事件
            that.disConnectFun({code:0,msg:'离线'});
            console.log(JSON.stringify(data)+ ' - disconnect');
        });
        socket.on('reconnect', function(data){
            //console.log(JSON.stringify(data) + ' - reconnect');

        });
        socket.on('reconnect_attempt', function(data){
           // console.log(JSON.stringify(data));
        });
    }


    changeChannelThrottle= M.throttle((v)=>{
        this.changeChannel(v);
    },150);


    async install(app,args){
        this.eventFun=args.event;
        this.callFun=args.call;
        this.replayFun=args.replay;
        this.changeChannel=args.changeChannel;
        this.connectFun=args.connect;
        this.disConnectFun=args.disconnect;
        let that=this;
        MIO.socketConnect=this.connect.bind(this);
        MIO.socketEmitCall=async (method,params,id,callback)=>{
            let reqBody={
                "method": SocketIoEventEnum.CALL+"."+ method,
                "params": params
            };
            if(id){
                reqBody.id=id;
                that.JsonRpcReplayMap["reply."+ method]={
                    id: id,
                    callback:callback
                };
            }
            await MIO.socketRequest(reqBody);
        }


        setInterval(async ()=>{
            if(M.gp.$route.fullPath=="/simu"){
                M.Component.simu.dagagramLength=this.datagramArray.length;
            }
            if(this.datagramArray.length>90){
                this.datagramArray=[];
                return
            }
            let v=  this.datagramArray.pop();
            if(v){
                //console.log(v.disp)
                for (let i=0;i<v.disp.length;i++){
                     this.changeChannelThrottle({time:v.time[i],disp:v.disp[i]});
                     await M.delayMs(20);
                }
            }
        },200)
    }

}

export default  SocketIoWebPlugin;

