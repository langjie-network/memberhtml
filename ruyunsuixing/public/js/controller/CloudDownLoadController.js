/**
 * 安装盘下载
 */


// M.removeUserInfo()
// localStorage.clear();
app.begin(async (req,res)=>{
   // alert(req.url)
})
app.end(async (req,d)=>{
  //  alert(req.url+d)
})

app.get("/targetBurnDiskBySn",async (req,res)=>{
    let r= await M.request.get(`/cardopen/targetBurnDiskBySn`,{
        sn:req.params
    });
    res.send(r);
    //res.send(M.mockData["targetBurnDiskBySn"])
})

app.get("/targetBurnDiskByDiskCode",async (req,res)=>{
    let r= await M.request.get(`/cardopen/targetBurnDiskByDiskCode`,{
        diskCode:req.params
    });
    res.send(r);
    //res.send(M.mockData["targetBurnDiskBySn"])
})




app.get("/cardInstallSendMail",async (req,res)=>{
    const {sn,to,softId,_id}=req.params;
    //alert(77)
    let unionid=vueApp.config.globalProperties.$gloable_state.userInfo.unionid;
    let r= await M.request.post(`/cardopen/sendMailForCloudDisk`,{
        unionid:unionid,
        sn:sn,
        to:to,
        _id:_id,
        softId:softId
    });
    res.send(r)
})


app.get("/cloudDiskDownLoad",async (req,res)=>{
    const {sn,softId,_id}=req.params;
    let unionid=vueApp.config.globalProperties.$gloable_state.userInfo.unionid;
    let r= await M.request.post(`/cardopen/cloudDisk/download`,{
        sn:sn,
        softId:softId,
        _id:_id,
        unionid:unionid,
    });
    res.send(r)
})
app.get("/cloudDiskDownLoadAddEvent",async (req,res)=>{
    const {sn,softId,_id}=req.params;
    let unionid=vueApp.config.globalProperties.$gloable_state.userInfo.unionid;
    let r= await M.request.post(`/cardopen/cloudDisk/downloadAddEvent`,{
        sn:sn,
        softId:softId,
        _id:_id,
        unionid:unionid,
    });
    res.send(r)
})

app.get("/cloudDiskDownLoadSoft",async (req,res)=>{
    const {softId}=req.params;
    let unionid=vueApp.config.globalProperties.$gloable_state.userInfo.unionid;
    let r= await M.request.post(`/cardopen/cloudDisk/downloadSoft`,{
        softId:softId,
        unionid:unionid,
    });
    res.send(r)
})

app.get("/rootfile_sync2oss",async (req,res)=>{
    const {_id,check}=req.params;
    let r= await M.request.get(`/member_ajax/rootfile/sync2oss/${_id}`,{
        check:check,
    });
    res.send(r)
})



