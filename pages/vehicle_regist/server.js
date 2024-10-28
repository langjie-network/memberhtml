
app.get("/vehicleRegistGetList",async (req,res)=>{
    const r= await M.request.get("/member_ajax/vehicleRegist/getList",{
        page:1,
        num:10
    });
    res.send(r);
})

