
class S2sSocketIoWebPlugin {
    constructor(socketIoConfig) {
        this.key=socketIoConfig.key;
        this.clientId=socketIoConfig.clientId;
        this.uid=socketIoConfig.uid;
        this.path=M.config.baseUrl("");
        this.host=socketIoConfig.socketIoHost;
        this.callback=socketIoConfig.callback;
    }
    async connect(){
        let that=this;
        if(that.socket!=null){
            that.socket.connect();
            return;
        }
        var socket = window.io(
            that.host+ `/?clientId=${this.clientId}&uid=${this.uid}&checkCode=1682239794589`
            ,{path:``});
        this.socket=socket;
        window.Msocket=socket;
        socket.on("event",async function (msg) {
            that.callback("event",msg)
        });
        socket.on("call",async function (msg,v) {
            that.callback("call",msg)
        });
        socket.on("reply",async function (msg) {
            that.callback("reply",msg)
        });
        socket.on("datagram",async function (msg) {
            that.callback("datagram",msg)
        });
        socket.on("system",async function (msg) {
            that.callback("system",msg)
        });
        socket.on('connect',async function(data){
            that.callback("connect",data)
            console.log( '- connect');
        });
        socket.on('connect_error', function(data){
            that.callback("connect_error",data)
            console.log(JSON.stringify(data)+ ' - connect_error');
        });
        socket.on('connect_timeout', function(data){
            that.callback("connect_timeout",data)
            console.log(JSON.stringify(data)+ ' - connect_timeout');
        });
        socket.on('error', function(data){
            that.callback("error",data)
            console.log(JSON.stringify(data) + ' - error');
        });
        socket.on('disconnect', function(data){
            that.callback("disconnect",data)
            console.log(JSON.stringify(data)+ ' - disconnect');
        });
        socket.on('reconnect', function(data){
            that.callback("reconnect",data)
        });
        socket.on('reconnect_attempt', function(data){
            that.callback("reconnect_attempt",data)
        });
    }

    async install(app,args){
        MIO.s2ssocketConnect=this.connect.bind(this);
    }

}
export default  S2sSocketIoWebPlugin;
