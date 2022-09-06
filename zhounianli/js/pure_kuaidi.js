$( () => {

    setTimeout(async ()=>{

        let exchange_record_id=  window.M.getParameter("exchange_record")
    
        let rList= await window.M.request.get("/member/stage/list", {ownerId: exchange_record_id,biz_name:"exchange_record"})
        rList=rList.data;
        let stageListMap={}
        let logistics="";
        let payload="";
        let status="";
        for(let i=0;i<rList.length;i++){
            if(i==0){
                status=rList[0].rem;
            }
            if(rList[i].rem=="已发货"){
                logistics=rList[i].content
                if(rList[i].payload){
                    payload=rList[i].payload;
                }
            }
            stageListMap[rList[i].rem]=rList[i];

        }
    
        M.p = {
            userInfo: { 
            "exchange_record_id": exchange_record_id, 
            "logistics":logistics,
            "payload":payload,
            "status": status,
            "stageMap": stageListMap,
           
        }}
    
    
    
        init();




    })

   
})


async function init() {
    await render_track_shipflow_id_template();
   // $(".goods_img").attr("src", "https://wx.langjie.com/img/notiClient/1627003619337.png")
    if (M.p.kuaidiInfo == null || M.p.userInfo.status == "待发货") {
        renderHeadStep(0)
    } else if (M.p.userInfo.status == "已发货") {
        renderHeadStep(1)
    } else if (M.p.userInfo.status == "已收货") {
        renderHeadStep(2)
    }
}


function renderHeadStep(stNum) {
    $(".steps > li").removeAttr("class", "active")
    for (let i = 0; i <= stNum; i++) {
        $($(".steps > li")[i]).attr("class", "active")
    }
}

async function render_track_shipflow_id_template() {
    let temp = $("#track_shipflow_id_template").html()
    list = await build_track_shipflow_params();
    let html = eval("`" + temp + "`")
    $(".track_shipflow").html(html)
}


/**
 * 构造快递参数
 */
async function build_track_shipflow_params() {
    let kuaidiInfo = [];
    M.p.kuaidiInfo = kuaidiInfo;
    let list = []
    if (M.p.userInfo.status == "待发货" || M.p.userInfo.logistics=="") {
        let firstItem = {
            time: M.p.userInfo.stageMap["待发货"].insert_time,
            status: "准备发货",
            cur: "cur"
        }
        list.push(firstItem);
        return list;
    }
    if (M.p.userInfo.status == "已发货" || M.p.userInfo.status == "已收货") {
        let firstItem = {
            time: M.p.userInfo.stageMap["待发货"].insert_time,
            status: "已确认,准备发货",
            cur: ""
        }
        let rResult = await MIO.queryExpress({ no: M.p.userInfo.logistics+":"+ M.p.userInfo.payload});
        let dList = rResult.list;
        $("#kuaidi_company_id").html(rResult.expName);
        $("#kuaidi_danhao_id").html(M.p.userInfo.logistics)
        list = [...dList, firstItem];
        if ( M.p.userInfo.status == "已发货") {
            $("#gotoGoodsInfoId").css("display", "block")
        } else {
            if(M.p.userInfo.stageMap["已收货"]){
                list.unshift({
                    time: M.p.userInfo.stageMap["已收货"].insert_time,
                    status: "已收货",
                })
            }
        }
        list[0].cur = "cur";
        return list;
    }

}


async function querenShuohuoclick() {
    let r = await MIO.logisticsUpdate()
    window.location.reload();
}