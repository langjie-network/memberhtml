
app.get("/vipRegistYbVoucherList",async (req,res)=>{
    const r=  await  window.M.request.get("/member_ajax/vipRegistYbVoucher/list",
        req.params
    )
    r.data.rows.forEach(u => {
        u.key=u.id;
    });
    res.send({dataList:r.data.rows,total:r.data.count});
})

//领取券
app.get("/vipRegistYbVoucherClaimed",async (req,res)=>{
    const {id}=req.params;
    let r=  await  window.M.request.post("/member_ajax/vipRegistYbVoucher/claimed",
        {
            "id": id
        }
    );
    res.send(r);
})


app.get("/vipRegistYbVoucheCheckAndAddCompany",async (req,res)=>{
    const {company}=req.params;
    let r=  await  window.M.request.post("/member_ajax/vipRegistYbVoucher/checkAndAddCompany",
        {company}
    );
    res.send(r);
})

app.get("/vipRegistYbVoucherUpdate",async (req,res)=>{
    const {
        name,
        yb_score,
        company,
        member_name,
        member_phone,
        member_addr,
        id,
        yb_voucher_img_url,
        yb_voucher_tag
    }=req.params;
    let r=  await  window.M.request.post("/member_ajax/vipRegistYbVoucher/update",
        {
            yb_voucher_tag,
            name,
            yb_score,
            member_addr,
            company,
            member_name,
            member_phone,
            yb_voucher_img_url,
            id
        }
    );
    res.send(r);
})

app.get("/crmhelpVipRegistYbVoucherSysncRegistYbVoucherQrCode",async (req,res)=>{
    const {id,ybScore,company,memberName,ybVoucherTag}=req.params;
    let apiPath=  M.config.baseUrlCrmHelp("/open/crmhelp/vipRegistYbVoucher/sysncRegistYbVoucherQrCode");
    let r=  await  window.M.request.post(apiPath,{
        id,ybScore,company,memberName,ybVoucherTag
    });
    res.send(r);
})



app.get("/homeMemberSearchMemberByCompanyMap",async (req,res)=>{
    const company=req.params;
    let r= await M.request.get("/home/member/searchMemberByCompany?company="+company);
    let map={}
    for (let i=0;i<r.data.length;i++){
        let item=r.data[i];
        map[item.name]=item.phone;
    }
    res.send(map);
})


app.get("/crmhelp_dictionary_list",async (req,res)=>{
    const queryCode=req.params;
    let apiPath=  M.config.baseUrlCrmHelp("/crmhelp/dictionary/listByQueryCode");
    let r = await window.M.request.get(apiPath,{queryCode:queryCode});
    res.send(r.data);
});


