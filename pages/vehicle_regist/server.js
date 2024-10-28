
app.get("/vehicleRegistGetList",async (req,res)=>{
    const r= await M.request.get("/member_ajax/vehicleRegist/getList",{
        page:1,
        num:10,
        filter:req.params.filter
    });
    res.send(r);
})


app.get("/vehicleRegistGetRecordById",async (req,res)=>{
    const r= await M.request.get("/hybrid/vehicleRegist/getRecordById/"+res.params.v_id);
    res.send(r);
})


