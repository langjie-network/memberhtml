var M=require("ming_node");


var app=M.server();
app.listen(8888);

app.set("views","./")

sseApp=M.sseServer()
app.get("/sseServer",sseApp)



let r= M.getFileDirList(".")
r=r.filter(u=>!u.includes(".idea") && !u.includes(".git"))
r.push(".")
r.forEach(u=>{
    M.watchFile(u,({file,event})=>{
        if(event=="change"){
           // console.log(file,event);
            sseApp.send("change");
        }
    })

})
console.log("watch on ",r)