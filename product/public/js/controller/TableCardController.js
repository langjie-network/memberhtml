
app.get("/cardopenTablecardProductPubInfoBySn",async (req,res)=>{
    let r= await M.request.get("/cardopen/tablecard/productPubInfoBySn",{
        sn:req.params
    });
    res.send(r);
});



app.get("/cardopenTableProductPubResouceInfo",async (req,res)=>{
    let r= await M.request.get("/cardopen/tablecard/productPubResouceInfo",{
        sn:req.params
    });
    res.send(r);
});




