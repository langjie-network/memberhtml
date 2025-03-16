app.get("/myInvitationMember",async (req,res)=>{
   const r= await M.request.get("/m/staff/myInvitationMember");
   res.send(r);
});


app.get("/pendingCompanyAndNameInfo",async (req,res)=>{
   const user_id=req.params.user_id;
   const r= await M.request.get("/m/staff/pendingCompanyAndNameInfo",{
      user_id:user_id
   });
   res.send(r);
});


app.get("/changeIsPrizeSend",async (req,res)=>{
   const user_id=req.params.user_id;
   const is_prize_send=req.params.is_prize_send;
   const r= await M.request.post("/m/staff/changeIsPrizeSend",{
        user_id:user_id,
        is_prize_send:is_prize_send
   });
   res.send(r);
});



app.get("/updatePendingCompanyAndName",async (req,res)=>{
   const {user_id,name,pending_company}=req.params;
   const r= await M.request.post("/m/staff/updatePendingCompanyAndName",{
      user_id,
      name,
      pending_company
   });
   res.send(r);
})