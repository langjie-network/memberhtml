



app.get("/notiPost_fromCenterList",(req,res)=>{
      $.ajax({
        url:"/home/notiPost/fromCenterList",
        type:'get',
        beforeSend: function(request){
            request.setRequestHeader('token',localStorage.getItem('token'))
        },
        dataType:'json',
        timeout:30000,
        data: {},
        success:function(r){
            res.send(r)
        },
        error: function(err){
           console.error(err)
        }
    });
})

 app.get("/notiPost_fromCenterUpdate",(req,res)=>{

     const {id,noti_client_mailId,atReply}=req.params;

     $.ajax({
         url:"/home/notiPost/fromCenterUpdate",
         type:'put',
         beforeSend: function(request){
             request.setRequestHeader('token',localStorage.getItem('token'))
         },
         contentType: "application/json; charset=utf-8",
         dataType:'json',
         timeout:30000,
         data: JSON.stringify({
             "id":id,
             "noti_client_mailId":noti_client_mailId,
             "vote":"已阅",
             "atReply":atReply||""
         }),
         success:function(r){
             res.send(r)
         },
         error: function(err){
             console.error(err)
         }
     });
})



app.get("/home_msgBox_list",(req,res)=>{
    const {page,num}=req.params;
    $.ajax({
        url:`/home/msgBox/list?page=${page}&num=${num}`,
        type:'get',
        beforeSend: function(request){
            request.setRequestHeader('token',localStorage.getItem('token'))
        },
        dataType:'json',
        timeout:30000,
        data: {},
        success:function(r){
            res.send(r)
        },
        error: function(err){
            console.error(err)
        }
    });
})