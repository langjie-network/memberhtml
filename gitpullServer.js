M=require("ming_node");
app=M.server();
app.listen(60000)

app.begin((req,res)=>{
    console.log(req.url)
})


app.get("/gitpull",async (req,res)=>{

    const r= await  M.exec(`git pull`);

    res.send(r)
})