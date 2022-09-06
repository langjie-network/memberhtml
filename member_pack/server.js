app.begin((req,res)=>{
    if(req.url.endsWith(".html")){
        var pathname = url_module.parse(req.url).pathname;   /*获取url的值*/
        let r= M.readFile(staticPath + '/' + pathname)
        res.renderHtml(r+`
            <script src="https://minglie.gitee.io/mi/reload.js"></script>
        `);
    }
})



app.set("views","./")

sseApp=M.sseServer()
app.get("/sseServer",sseApp)




let r=[]
if(fs.existsSync("public")){
    r= M.getFileDirList("./public");
    r.push("public")
}
if(fs.existsSync("views")){
    r1= M.getFileDirList("./views");
    r=[...r,...r1,"views"]
}
//console.log(r,"WWWWWWW")

if(fs.existsSync("static")){
    r1= M.getFileDirList("./static");
    r=[...r,...r1,"static"]
}

r.push(".");

r.forEach(u=>{
    M.watchFile(u,({file,event})=>{
        if(event=="change"){
           // console.log(file,event);
            sseApp.send("change");
        }
    })

})

console.log("watch on ",r)