/**
 * 查询root文件列表13589
 */
app.get("/rootfileList",async (req,res)=>{
    //console.log("==========")
    let {keyword,page=1,num=10,collect,root_file_id,file_source_type,rootFileCode,order_field,trial_version}=req.params;
    if(!keyword){
       keyword=""
    }
    if(!collect){
        collect=""
    }
    if(!root_file_id){
        root_file_id=""
    }
    if(!file_source_type){
        file_source_type=""
    }
    if(!rootFileCode){
        rootFileCode=""
    }
    if(!order_field){
        order_field=""
    }
    if(!trial_version){
        trial_version="";
    }
    let r= await M.request.get(`/member_ajax/rootfile/list`,{
        keyword,
        page,
        num,
        collect,
        root_file_id,
        file_source_type,
        rootFileCode,
        order_field,
        trial_version
    });
    res.send(r)
})


/**
 * 查询文件的聊天记录
 */
app.get("/rootfileListRootFileChatMsg",async (req,res)=>{
    const {page=1,num=5000,root_file_id}=req.params;
    let r= await M.request.get(`/member_ajax/rootfile/listRootFileChatMsg`,{
        page,
        num,
        root_file_id
    });
    res.send(r)
})


/**
 * 添加聊天记录
 */
app.get("/rootfileAddRootFileChatMsg",async (req,res)=>{
    const {content,root_file_id}=req.params;
    let r= await M.request.post(`/member_ajax/rootfile/addRootFileChatMsg`,{
        root_file_id,
        content
    });
    res.send(r)
});



/**
 * rootFile收藏与取消收藏
 */
app.get("/rootFilePersonalitySettings",async (req,res)=>{
    const {root_file_id,collect}=req.params;
    let r= await M.request.post(`/member_ajax/rootfile/rootFilePersonalitySettings`,{
        root_file_id,collect
    });
    res.send(r)
})

app.get("/knowlibGetGalleryGroupItem",async (req,res)=>{
    const id=req.params;
    let r= await M.request.get("/member_ajax/knowlib/getGalleryGroupItem?id="+id);
    if(r.code==200){
        let imgList= r.data.GallerySubs.map(u=>M.config.baseUrl("/img/gallery/"+u.album))
        res.send(imgList)
    }else {
        //console.error(r);
        res.send(["https://langjie.oss-cn-hangzhou.aliyuncs.com/space/root/project/ruyunsuixing/img/file_type_img.png"])
    }
})


app.get("/getNotiClientItemImgs",async (req,res)=>{
    const id=req.params;
    let r= await M.request.get("/member_ajax/getNotiClientItem?file_id="+id)
    if(r.code==200){
        let fileArr=[];
        let albumArr=[];
        let notiClientObj=r.data;
        let file= notiClientObj.file;
        let album= notiClientObj.album;
        if(file){
            fileArr=file.split(",");
        }
        if(album){
            albumArr=album.split(",")
        }
        let imgUrls=[];
        for (let i=0;i<fileArr.length;i++){
            let fileName=fileArr[i];
            if(fileName.toLowerCase().endsWith("png")||fileName.toLowerCase().endsWith("jpg")){
                let imgUrl=  M.config.baseUrl("/notiClient/"+fileName);
                imgUrls.push(imgUrl)
            }
        }
        for (let i=0;i<albumArr.length;i++){
            let fileName=albumArr[i];
            if(fileName.toLowerCase().endsWith("png")||fileName.toLowerCase().endsWith("jpg")){
                let imgUrl=  M.config.baseUrl("/img/notiClient/"+fileName);
                imgUrls.push(imgUrl)
            }
        }
        res.send(imgUrls)
    }else {
        console.error(r);
        res.send(["https://langjie.oss-cn-hangzhou.aliyuncs.com/space/root/project/ruyunsuixing/img/file_type_img.png"])
        return;
    }
})

app.get("member_ajax_gallery_sub_list_imgs",async (req,res)=>{
    let r= await M.request.get("/member_ajax/gallery_sub/list",{gallery_sub_left_id:req.params});
    let imgList=r.data.rows.map(u=>M.config.baseUrl("/img/gallery/"+u.album))
    res.send(imgList);
})



