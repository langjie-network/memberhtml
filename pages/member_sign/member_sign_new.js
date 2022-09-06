
M.nowDate=new Date().format("yyyy-MM-dd");
M.nowDay=new Date().getDate();

app.get("/member_ajaxQuerySignByTime",async (req,res)=>{
    let {startTime,endTime}=req.params;
    let r= await M.request.get("member_ajax/querySignByTime",{
    startTime:startTime,
    endTime:endTime});
    let dayMap={};
    for (let i=0;i<r.data.length;i++){
        let timeObj=  r.data[i];
        let key= timeObj.time.split(" ")[0];
        dayMap[key]=timeObj.time;
    }
    res.send(dayMap);
})

app.get("/member_ajax_sign",async (req,res)=>{
    let signScore=req.params.signScore;
    let r =  M.request.post("member_ajax/sign",{signScore});
     res.send(r)
})

app.get("/member_ajax_queryContinuousDay",async (req,res)=>{
    let r =await  M.request.get("member_ajax/queryContinuousDay");
    let days=r.data;
    res.send(days)
})

app.get("/member_ajax_qiandaozhixing",async (req,res)=>{
    let r = await M.request.get("member_ajax/qiandaozhixing");
    let data=r.data;
    if(data.length==0){
        res.send([]);
        return;
    }
    for (let i=0;i<data.length;i++){
        let surname=  data[i].name[0];
        if( data[i].gender=="男"){
            data[i].gender="先生"
        }else {
            data[i].gender="女士"
        }
        data[i].name=surname+data[i].gender;
    }
    res.send(data);
})

app.get("/member_ajax_qiandaoRanking",async (req,res)=>{
    let r =await  M.request.get("member_ajax/qiandaoRanking");
    let ranking=r.data;
    res.send(ranking)
})
/**
 * 同事列表
 */
app.get("/member_ajax_colleague_list",async (req,res)=>{
    let r =await  M.request.get("member_ajax/colleague_list");
    let memberList=r.data;
    res.send(memberList);
})
/**
 * 选择一个同事拼团
 */
app.get("/member_ajax_vipSignGroup_selectColleague",async (req,res)=>{
    let r =await  M.request.post("member_ajax/vipSignGroup/selectColleague",{
        participant:req.params.participant
    });
    res.send(r);
})

app.get("/member_ajax_vipSignGroup_listinfo",async (req,res)=>{
    let r =await  M.request.get("member_ajax/vipSignGroup/listinfo");
    let colleagueSelectedName=r.data.colleagueSelectedName;
    let colleagueList=r.data.colleagueList;
    //过滤掉已签到的,自己拼的人排在最前面
    let list= translateColleagueList(colleagueList,colleagueSelectedName);
    let colleagueSelectedNameSigned=false;
    if(colleagueSelectedName!=''){
       // alert(colleagueSelectedName)
        for (let i=0;i<list.length;i++){
            let item=list[i];
            if(item.signed){
                colleagueSelectedNameSigned=true;
            }
        }
    }

    res.send({colleagueList:list,colleagueSelectedName,colleagueSelectedNameSigned});
})

app.get("/member_ajax_vipCalendar_getVipCalendarWithCase",async (req,res)=>{
    let r =await  M.request.get("member_ajax/vipCalendar/getVipCalendarWithCase");
    res.send(r.data);
})


function translateColleagueList(colleagueList,colleagueSelectedName){
    //过滤掉已签到的,自己拼的人排在最前面
    let list= colleagueList.filter(u=>{return  !u.signed || u.name==colleagueSelectedName}).sort((a1,a2)=>{
        return a2.name.indexOf(colleagueSelectedName)-a1.name.indexOf(colleagueSelectedName)
    })
    return list;
}

// 补零函数
function doHandleZero(zero) {
    var date = zero;
    if (zero.toString().length == 1) {
        date = "0" + zero;
    }
    return date;
}
// 获取当前月1号
function getMonthFirstDay(myDate) {
    var tYear = myDate.getFullYear()
    var tMonth = myDate.getMonth()
    tMonth = doHandleZero(tMonth + 1);
    let date= tYear + "-" + tMonth + "-01";
    let utcDate=new Date(date);
    let week= utcDate.getDay();
    if(week==0){
        week=7;
    }
    return { utcDate:utcDate, dateStr: date,week:week,day:1}
}
// 获取当前年-月-日
function getDateNow(myDate) {
    var tYear = myDate.getFullYear()
    var tMonth = myDate.getMonth()
    var tDay = myDate.getDate()
    tMonth = doHandleZero(tMonth + 1)
    tDay = doHandleZero(tDay)
    return tYear + "-" + tMonth + "-" + tDay
}


function calendarFirstDay(m){
   if(m==null){
       m=0;
   }
    let curDate=  new Date()
    if(curDate.getDate()==31){
        curDate.setDate(29)
    }
    curDate.setMonth(curDate.getMonth()+m)
    let {dateStr,week,utcDate} =getMonthFirstDay(curDate);
    let mfd= utcDate.getDate();
    utcDate.setDate(mfd-(week-1));
    return utcDate;
}

function generateCalendarDay(m){
    let dateTime= calendarFirstDay(m);

    let dayList=[];
    for (let i=0;i<42;i++){
        dayList.push({
            date:new Date(dateTime),
            day:dateTime.getDate()
        } );
        dateTime.setDate(dateTime.getDate()+1);
    }

    return dayList;
}

function generateCalendarDataList(m){
    let dataList=  generateCalendarDay(m);
    let calendarDataList=[];
    for (let i=0;i<dataList.length;i++){
        let o={};
        o.day=dataList[i].day;
        o.signed=1;
        o.date=dataList[i].date.format("yyyy-MM-dd");
        o.bottomIcon="";
        o.bgColor="rgb(218,209,194)";
        o.index=i;
        calendarDataList.push(o);
    }

    return calendarDataList;
}

function myAlertToast(msg){
    var str = '<div id="toast">'+
        '<div class="weui-mask_transparent"></div>'+
        '<div class="weui-toast" style="width:11em;margin-left:-5.5em;">'+
        '<i class="weui-icon-warn weui-icon_msg" style="margin-top:10px;color:#fff;font-size:74px"></i>'+
        '<p class="weui-toast__content">'+msg+'</p>'+
        '</div>'+
        '</div>';
    $('body').append(str);
    setTimeout(function(){
        $('#toast').remove();
    },800);
}
////////////////////////////////////////////////////////////////////

function drawAndShareImage(imgId,bg,qr){
    let imgSrc= createQr(qr)
    var canvas = document.createElement("canvas");
    canvas.width = 720;
    canvas.height = 1157;
    var context = canvas.getContext("2d");
    context.rect(0 , 0 , canvas.width , canvas.height);
    context.fillStyle = "#fff";
    context.fill();

    var myImage = new Image();
    myImage.src = bg;
    myImage.crossOrigin = 'Anonymous';
    myImage.onload = function(){
        context.drawImage(myImage , 0 , 0 , 720 , 1157);
        var myImage2 = new Image();
        myImage2.src = imgSrc;
        myImage2.crossOrigin = 'Anonymous';
        myImage2.onload = function(){
            context.drawImage(myImage2 , 433 , 870 , 225 , 225);
            var base64 = canvas.toDataURL("image/png"); //"image/png" 这里注意一下
            var img = document.getElementById(imgId);
            img.setAttribute('src' , base64);
            M.shareImg= base64;
        }
    }
}

// 生成二维码
function createQr(valText){
    document.createElement('canvas').getContext('2d');
    // 采用正则表达式判断输入的内容是否是中文
    var reg=/^[\u0391-\uFFE5]+$/;
    if(valText!=""&&!reg.test(valText)){
        // 如果不是中文，直接将输入的内容转换成二维码
        $('#qr_container').qrcode({render:"canvas",height:180, width:180,correctLevel:0,text:valText});
    }else{
        // 如果是中文，直接将输入的内容字符串转换成UTF-8，然后再转换成二维码
        $('#qr_container').qrcode({render:"canvas",height:180, width:180,correctLevel:0,text:utf16to8(valText)});
    }
    //获取网页中的canvas对象
    var mycanvas1=document.getElementsByTagName('canvas')[0];
    //将转换后的img标签插入到html中
    var imgSrc = mycanvas1.toDataURL("image/png")
    $('canvas').remove();
    return imgSrc;
}

// 字符编码
function utf16to8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for(i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
        }
    }
    return out;
}

function downImg(url) {

    // 创建a标签 并设置其相关属性，最后触发其点击事件

    let a = document.createElement("a")

    let clickEvent = document.createEvent("MouseEvents");

    a.setAttribute("href", url)

    a.setAttribute("download", 'codeImg')

    a.setAttribute("target", '_blank')

    clickEvent.initEvent('click', true, true)

    a.dispatchEvent(clickEvent);

}


///////////////////////////////////
M.shareImg="";
window.onload = function () {
    M.vueApp = new Vue({
        el: "#main",
        data: {
            maskStyle:"g_coverMaskDiv",
            monthIndex:0,
            continuousDay:0,
            ranking:0,
            calendarDataList:[],
            qiandaozhixingList:[

            ],
            colleagueList:[

            ],
            colleagueSliceStart:0,
            //我拼签的人
            colleagueSelectedName:"",
            //我拼签的人已经签过
            colleagueSelectedNameSigned:false,
            memberListFormVisable:false,
            vipCalendarMap:{},
            signScore:10,
        },
        async mounted() {
            this.vipCalendarMap=await MIO.member_ajax_vipCalendar_getVipCalendarWithCase();
            this.fetch();
            this.qiandaozhixingList=await MIO.member_ajax_qiandaozhixing();
            this.continuousDay=await MIO.member_ajax_queryContinuousDay();
            this.ranking=await MIO.member_ajax_qiandaoRanking();
            let {colleagueList,colleagueSelectedName,colleagueSelectedNameSigned} = await MIO.member_ajax_vipSignGroup_listinfo();
            this.colleagueList=colleagueList;
            this.colleagueSliceStart=0;
            this.colleagueSelectedName=colleagueSelectedName;
            this.colleagueSelectedNameSigned=colleagueSelectedNameSigned;
            let uid= M.getParameter("uid")
            let qrUrl=  "https://" + window.location.host+"/tools/vipRegInfo/"+uid;
            if(colleagueList.length==0){
                  drawAndShareImage("no_fellow_member_shareIdImg","./member_sign_group_no_fellow.png",
                      qrUrl)
            }
        },
        computed:{
            disMonth(){
                let disMonthDate= new Date();
                if(disMonthDate.getDate()==31){
                    disMonthDate.setDate(30);
                }
                disMonthDate.setMonth(disMonthDate.getMonth()+this.monthIndex);
                return disMonthDate;
            }
        },
        methods: {
            async fetch(){
                let baseCalendarDataList=generateCalendarDataList(this.monthIndex);
                if(this.monthIndex<=0){
                    let dayMap=await MIO.member_ajaxQuerySignByTime({
                        startTime: baseCalendarDataList[0].date,
                        endTime: baseCalendarDataList[41].date
                    });
                    for (let i=0;i<baseCalendarDataList.length;i++){
                        let baseCalendarData= baseCalendarDataList[i];
                        if(dayMap[baseCalendarData.date]){
                            baseCalendarData.bottomIcon="v";
                        }else if(M.nowDate==baseCalendarData.date){
                            baseCalendarData.bottomIcon="yuanbao";
                        }
                        if(M.nowDate==baseCalendarData.date){
                            baseCalendarData.bgColor="red";
                            if(this.vipCalendarMap[baseCalendarData.date]){
                               this.signScore=this.vipCalendarMap[baseCalendarData.date].sign_score||10;
                            }
                        }
                        if(baseCalendarData.date>M.nowDate){
                            //baseCalendarData.bottomIcon="yuanbao";
                            if(this.vipCalendarMap[baseCalendarData.date]){
                                baseCalendarData.bottomIcon=this.vipCalendarMap[baseCalendarData.date].activity_img;
                            }
                            baseCalendarData.bgColor="rgb( 232,183,187)"
                        }
                    }
                }else {
                    for (let i=0;i<baseCalendarDataList.length;i++){
                        let baseCalendarData= baseCalendarDataList[i];
                       // baseCalendarData.bottomIcon="yuanbao";
                        baseCalendarData.bgColor="rgb(238,121,133)"
                        if(baseCalendarData.date>M.nowDate){
                            //baseCalendarData.bottomIcon="yuanbao";
                            if(this.vipCalendarMap[baseCalendarData.date]){
                                baseCalendarData.bottomIcon=this.vipCalendarMap[baseCalendarData.date].activity_img;
                            }
                            baseCalendarData.bgColor="rgb( 232,183,187)"
                        }
                    }
                }
                this.calendarDataList=baseCalendarDataList;
            },
            previousMonth(){
                this.monthIndex--;
                this.fetch();
            },
            nextMonth(){
                this.monthIndex++;
                this.fetch();
            },
            async member_ajaxSign(item){
                if(item.bottomIcon=="yuanbao"){
                    if(item.day==M.nowDay){
                        let r=await MIO.member_ajax_sign({signScore:this.signScore});
                        if(r.msg=="签到成功"){
                            item.bottomIcon="v";
                            //this.calendarDataList[item.index+1].bottomIcon="yuanbao";
                            this.qiandaozhixingList=await MIO.member_ajax_qiandaozhixing();
                            this.ranking=await MIO.member_ajax_qiandaoRanking();
                            this.continuousDay++;
                        }else {
                            alertToast(item.msg)
                        }
                    }else {
                        //alertToast("明天再签")
                    }
                }
            },
            sign_order_img(i){
                if(i==1){
                    return "url(https://langjie.oss-cn-hangzhou.aliyuncs.com/space/root/project/viphelp/sign_huangguan_jin.png)";
                }else if(i==2){
                    return "url(https://langjie.oss-cn-hangzhou.aliyuncs.com/space/root/project/viphelp/sign_huangguan_yin.png)";
                }else if(i==3){
                    return "url(https://langjie.oss-cn-hangzhou.aliyuncs.com/space/root/project/viphelp/sign_huangguan_tong.png)";
                }
            },
            show_vip_sign_group_form(){
                this.memberListFormVisable=! this.memberListFormVisable;
            },
            huanyipi(){
                if(this.colleagueList.length<=9){
                   return
                }else {
                   if(this.colleagueList.length-this.colleagueSliceStart>9){
                       this.colleagueSliceStart=this.colleagueSliceStart+9;
                   }else {
                       this.colleagueSliceStart=0;
                   }
                }
            },
            vipSignGroup_selectColleague(item){
                if(this.colleagueSelectedName!=""){
                    myAlertToast("已拼团成功");
                    return
                }
                MIO.member_ajax_vipSignGroup_selectColleague({
                    participant:item.unionid
                }).then(d=>{
                    if(d.code==200){
                        M.vueApp.colleagueSelectedName=item.name;
                    }else {
                        myAlertToast("已拼团");
                    }
                })
            },
            no_fellow_share_link(){



            },
            no_fellow_save(){



            },
            no_fellow_share_poster(){




            },
        },
        updated(){

        }
    });
}






