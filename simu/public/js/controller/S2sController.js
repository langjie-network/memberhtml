
app.get("/s2sCloudIsOnlineByUid",async (req,res)=>{
    let {uid}=req.params;
    let r= await M.request.get(M.config.s2scloudHost+"/s2scloud/s2sClient/list?uid="+uid);
    if(r.code!=0){
        res.send(0);
        return;
    }
    if(r.code==0){
        if(r.data.dataList.length==0){
            res.send(0);
            return;
        }else{
            if(r.data.dataList[0].clientIds.length){
                res.send(1);
                return;
            }else {
                res.send(0);
                return;
            }
        }
    }
    res.send(r);
});
