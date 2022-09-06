
app.get("/vipbasicpin_add",async (req,res)=>{
   const {pin,generateTimestamp,mid}=req.params;
    let apiPath=  M.config.crmHelpHost(`/crmhelp/vipbasicpin/add`);
    let reqParams= {pin,generateTimestamp,mid};
    let r = await window.M.request.post(apiPath,reqParams);
    res.send(r);
})






const vueConstructorData={
    Mp:M.p,
    pinSecret:"",
    async mounted() {
       let r= await MIO.vipbasicpin_add({
            pin:M.p.pin,
            mid:M.p.mid,
            generateTimestamp:M.p.generateTimestamp,
        });
        if(M.checkR(r)) {
            this.pinSecret=r.data.pinSecret;
        }
    }
}



window.onload = function () {
    PetiteVue.createApp(vueConstructorData).mount("#main");
}
