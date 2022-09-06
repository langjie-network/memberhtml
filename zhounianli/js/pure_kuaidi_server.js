



app.get("/logisticsUpdate",async (req,res)=>{
    let id =   window.M.getParameter("exchange_record")
         window.M.request.post("/member/stage/add", {
            "ownerId": id,
            "biz_name": "exchange_record",
            "content": "",
            "rem": "已收货",
            "stage": 2
        }).then(d=>{
          window.history.go(-1);
		})
})






app.get("/queryExpress",async (req,res)=>{
    let no=req.params.no;
    let r= await M.request.get("https://www.langjie.com/ming/tiger/queryExpress",{no});
    if(r.data){
        res.send(r.data.result)
    }else {
        res.send(null)
    }
})