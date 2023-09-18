



app.get("/notiPost_fromCenterList",(req,res)=>{

    res.send([])
})

 app.get("/notiPost_fromCenterUpdate",(req,res)=>{

     res.send([])
})



app.get("/home_msgBox_list",(req,res)=>{
    const {page,num}=req.params;

    res.send([1,2,3])
})