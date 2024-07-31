//M.removeUserInfo()



app.get("/checkWxCode",async (req,res)=>{
    const code=req.params;
    let r= await M.request.post('/open/login/scanCode',{
        reloadUrl: true,
        code: code
    });
    if(r.code!=200&&r.code!=0){
        weui.toast(JSON.stringify(r), 200)
    }
    res.send(r);
    //res.send(M.mockData["targetBurnDiskBySn"])
})



app.get("/fetchMemberInfo",async (req,res)=>{
    const { unionid } = req.params;
    if(unionid==null){
        res.send({});
        weui.toast('登陆失败', 200)
        return;
    }
    const r = await M.request.get('https://api.langjie.com/member/info/' + unionid);
    const userInfo=Object.assign(M.getUserInfo(),r.data);
    let r1= await M.request.get(`/tools/memberInfoByUnionId`,{
        unionid:req.params.unionid
    });
    userInfo.avatar=r1.data.avatar;
    M.setUserInfo(userInfo);
    vueApp.config.globalProperties.$gloable_state.userInfo=userInfo;
    res.send(r)
})


app.get("/signOut",async (req,res)=>{
    M.setUserInfo(null);
    vueApp.config.globalProperties.$gloable_state.userInfo={
        phone:"",
        name:"",
        portrait:"https://langjie.oss-cn-hangzhou.aliyuncs.com/space/root/project/ruyunsuixing/img/default_avatar.png",
        unionid:""
    };
    sessionStorage.clear();
    vueApp.config.globalProperties.$router.push({ path: "/login" })

})




app.get("/member_ajax_memberRedict_setRedictUrl",async (req,res)=>{
    let r= await M.request.post("/member_ajax/memberRedict/setRedictUrl",{redictUrl:location.href});
    res.send(r);
})

app.get("/member_ajax_memberRedict_getRedictUrl",async (req,res)=>{
    let r= await M.request.get("/member_ajax/memberRedict/getRedictUrl");
    res.send(r);
})
