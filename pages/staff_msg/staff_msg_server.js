
app.get("/notiPost_fromCenterList",async (req,res)=>{
    const r= await M.request.get("/home/notiPost/fromCenterList");
    res.send(r);
})

 app.get("/notiPost_fromCenterUpdate",async (req,res)=>{
     const {id,noti_client_mailId,atReply}=req.params;
     const r=await M.request.put("/home/notiPost/fromCenterUpdate",{
         "id":id,
         "noti_client_mailId":noti_client_mailId,
         "vote":"已阅",
         "atReply":atReply||""
     });
     res.send(r);
})
app.get("/home_msgBox_list",async (req,res)=>{
    const {page,num}=req.params;
    const r=await M.request.get(`/home/msgBox/list?page=${page}&num=${num}`,{})
    res.send(r);
})