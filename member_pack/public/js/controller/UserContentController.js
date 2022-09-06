app.get("/crmhelpUserContenthomeListUserContentType", async (req, res) => {
    let apiPath=  M.config.crmHelpHost(`/crmhelp/usercontenthome/listUserContentType`);
    let r = await window.M.request.get(apiPath);
    res.send(r.data);
});


app.get("/crmhelpUserContentList", async (req, res) => {
    const {id,isShare}=req.params;
    let apiPath=  M.config.crmHelpHost(`/open/crmhelp/usercontent/userContentList`);
    let reqParams={};
    if(id!=undefined){
        reqParams.id=id;
    }
    if(isShare!=undefined){
        reqParams.isShare=isShare;
    }
    let r = await window.M.request.get(apiPath,reqParams);
    res.send(r.data);
});


app.get("/crmhelpUserContentInstanceList", async (req, res) => {
    const {id,isShare}=req.params;
    let apiPath=  M.config.crmHelpHost(`/open/crmhelp/usercontentinstance/list`);
    let reqParams={};
    if(id!=undefined){
        reqParams.id=id;
    }
    if(isShare!=undefined){
        reqParams.isShare=isShare;
    }
    let r = await window.M.request.get(apiPath,reqParams);
    res.send(r.data);
});