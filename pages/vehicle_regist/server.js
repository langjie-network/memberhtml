app.get("/vehicleRegistCreate",async (req,res)=>{
    const r= await M.request.post("/member_ajax/vehicleRegist/create",{
        car_no:req.params.car_no,
        take_time:req.params.take_time,
        take_mile:req.params.take_mile,
        take_gps:req.params.take_gps
    });
    res.send(r);
})


app.get("/vehicleRegistSupplement",async (req,res)=>{
    const r= await M.request.post("/member_ajax/vehicleRegist/supplement",{
        car_no:req.params.car_no,
        take_time:req.params.take_time,
        take_mile:req.params.take_mile,
        back_mile:req.params.back_mile,
        back_time:req.params.back_time,
        take_gps:req.params.take_gps
    });
    res.send(r);
})

app.get("/supplementPass",async (req,res)=>{
    const r= await M.request.post("/member_ajax/vehicleRegist/supplementPass",{
        id:req.params.id,
    });
    res.send(r);
})




app.get("/vehicleRegistGetList",async (req,res)=>{
    const r= await M.request.get("/member_ajax/vehicleRegist/getList",{
        page:req.params.page,
        num:req.params.pageSize,
        filter:req.params.filter,
        t:req.params.t
    });
    res.send(r);
});


app.get("/vehicleRegistGetRecordById",async (req,res)=>{
    const r= await M.request.get("/member_ajax/vehicleRegist/getRecordById/"+req.params.v_id);
    res.send(r);
});


app.get("/vehicleRegistUpdate",async (req,res)=>{
    const r= await M.request.put("/member_ajax/vehicleRegist/update",req.params);
    res.send(r);
});


app.get("/vehicleRegistUpdateTake",async (req,res)=>{
    const r= await M.request.put("/member_ajax/vehicleRegist/updateTake",req.params);
    res.send(r);
});


app.get("/vehicleRegistUpdateBack",async (req,res)=>{
    const r= await M.request.put("/member_ajax/vehicleRegist/updateBack",req.params);
    res.send(r);
});


app.get("/vehicleRegistDelete",async (req,res)=>{
    const r= await M.request.delete("/member_ajax/vehicleRegist/del/"+req.params.v_id);
    res.send(r);
});


app.get("/goodsCarList",async (req,res)=>{
    const r= await M.request.get("/home/goods/list",{
        page: 1,
        num: 30,
        keywords: '',
        order: 'albumUpdateTime',
        filter: JSON.stringify({
            "myGoods": "所有物品",
            "goodsType": "车辆",
            "location":"",
            "management":"",
            "isBorrow":"",
            "borrowStatus":"",
            "isdel":"在库",
            "events":"借用"
        })
    });
    r.data.data=r.data.data.filter(u=>u.serialNo!=="浙AA8B92" && u.serialNo!=="浙A6995B");
    res.send(r);
});



app.get("/fetchPrevMile",async (req,res)=>{
    // const r= await M.request.get("/member_ajax/vehicleRegist/getPrevMile",{
    //      car_no:req.params.car_no
    //     });
      res.send({code:0, data:0});
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
            res.send(r);
        },
        error: function (err) {
            console.error(err);
            res.send({
                code:-1,
                msg:"上传失败"
            });
        }
    });
})





