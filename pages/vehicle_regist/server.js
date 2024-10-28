
app.get("/vehicleRegistGetList",async (req,res)=>{
    const r= await M.request.get("/member_ajax/vehicleRegist/getList",{
        page:1,
        num:10,
        filter:req.params.filter
    });
    res.send(r);
});


app.get("/vehicleRegistGetRecordById",async (req,res)=>{
    const r= await M.request.get("/member_ajax/vehicleRegist/getRecordById/"+req.params.v_id);
    res.send(r);
});

/**
 * 上传图片
 */
app.get("/member_ajax_ossUpload",async (req,res)=>{
    var data = new FormData();
    data.append('files',req.params.file);
    $.ajax({
        url: '/member_ajax/ossUpload?shortOssKey=true&rootPath=public/img/gallery',
        type: 'POST',
        data: data,
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false,
        success:  function (r) {
            let ossUrl="https://langjie.oss-cn-hangzhou.aliyuncs.com"+"/" +  r.data.ossResult.name;
            res.send(ossUrl);
        },
        error: function (err) {
            res.send("");
        }
    });
})





