
app.get("/plcm_socketio_applySocketio",async (req,res)=>{

    let share=1;

    let reqBody={
        "terminalType":"wx",
        "direction":1,
        "share":share,
        "productTerminal":"action",
        "app":M.userInfo.router_page,
        "machineCode": M.userInfo.router_param,
    }

    if(M.gp.$route.fullPath=="/geren_skq"){
        reqBody.share=0;
        delete reqBody.machineCode;
    }

    let r= await M.request.post(M.config.plcmcontrollerHost("/plcm/socketio/applySocketio"),reqBody);
    res.send(r);
});


app.get("/plcm_vtc_vtcMachine_status",async (req,res)=>{
    let curOperatorClientId=req.params.curOperatorClientId;
    let r= await M.request.get(M.config.plcmcontrollerHost("/controllerplay/vtc/manager/vtcMachine/list"),{
        curOperatorClientId
    })
    let playJar= r.data.dataList[0];
    res.send(playJar);
});






app.get("/mobileSocketioClientList", async (req, res) => {
    let socketIoWebPlugin= M.gp.$socketIoWebPlugin;
    if(!socketIoWebPlugin.connectGroup){
        res.send(M.successResult([]));
        return
    }
    let apiPath=  M.config.plcmcontrollerHost(`/plcm/socketio/mobileSocketioClientList`);
    let r = await window.M.request.get(apiPath,{
        connectGroup:socketIoWebPlugin.connectGroup
    });
    res.send(r);
});


app.get("/socketRequest", async (req, res) => {
    let socketIoWebPlugin= M.gp.$socketIoWebPlugin;
    let sendClientId= socketIoWebPlugin.clientId || "";
    let receveClientId="";
    if(req.params.method=="call.query_skq_status"){
        receveClientId= socketIoWebPlugin.productClientId || "";
    }
    let apiPath=  M.config.plcmcontrollerHost(`/plcm/socketio/socketRequest?sendClientId=${sendClientId}&receveClientId=${receveClientId}`);
    let r = await window.M.request.post(apiPath,req.params);
    res.send(r.data);
});


