


M.pageContext={
    curDay:new Date().getDate(),
    today: new Date().setHours(0, 0, 0, 0)
}


window.onload =async function () {
    if((await M.checkLogin())<0){
        return;
    }
    M.msg_list_vm = new Vue({
        el: "#main",
        data: {
            tab:0,
            msgWeiDuList: [],
            msgYiduList:[],
            yiduPage:1,
            yiduNum:8

        },
        async mounted() {
            pullRefresh();
            let that=this;
            weui.tab('#tab',{
                defaultIndex: 0,
                onChange: function(index){
                    that.tab=index;
                    that.reRender("bottom");
                }
            });
            this.reRender("bottom");
        },

        methods: {
            getItemState(state) {

            },
            async reRender(scroll){
                if(this.tab==0){
                    let r1= await MIO.notiPost_fromCenterList();
                    r1.data=r1.data.reverse();
                    this.msgWeiDuList=r1.data;
                }else {
                    let r2= await MIO.home_msgBox_list({
                        page:this.yiduPage,
                        num:this.yiduNum,
                    });
                    r2.data=r2.data.reverse();
                    this.msgYiduList=[...r2.data,...this.msgYiduList];
                }
                if(scroll=="top"){
                    window.scrollTo(0,0)
                }
                if(scroll=="bottom"){
                    window.scrollTo(0,document.body.scrollHeight)
                }
            }
        },
        updated(){

        }
    });
}


function pullRefresh() {
    var pr1 = new auiPullToRefresh({
        container: document.querySelector('.aui-refresh-content1'),
        triggerDistance: 50
    }, function (ret) {

        if (ret.status == "success") {
            setTimeout(function () {
                M.msg_list_vm.yiduPage=  M.msg_list_vm.yiduPage+1;
                M.msg_list_vm.reRender("top")
                pr1.cancelLoading(); //刷新成功后调用此方法隐藏
            }, 500);
        }
    });
}





function isToday(da){
    let d = new Date(da).setHours(0, 0, 0, 0);
    let today =M.pageContext.today;
    let obj = {
        '-86400000': '昨天',
        '0': '今天',
        '86400000': '明天',
    };
    return obj[d - today] || 0;
}



Vue.component('msg-item', {
    template: "#msgItemTemplateId",
    props: {
        atme:String,
        model: Object,
        id:String,
        msgtype:Number
    },
    data: function () {
        return {
            huifuValue:""
        }
    },
    created(){
        M.tt=this
    },
    methods: {
        async yiyue(){
            // M.tt=this
            //alert(this.model.mailId)
            let r=  await MIO.notiPost_fromCenterUpdate({
                id:this.id,
                noti_client_mailId:this.model.mailId
            })
            if(r.msg=="更新成功"){
                let delId=  M.msg_list_vm.msgWeiDuList.map(u=>u.id).indexOf(this.id);
                M.msg_list_vm.msgWeiDuList.splice(delId,1)
            }else {
                weui.toast(r.msg);
            }
           // M.msg_list_vm.reRender();
        },
        async huifu(){
            if(this.huifuValue.length==0){
                weui.toast('回复不能为空', {duration: 500});
                return
            }
            let r=  await MIO.notiPost_fromCenterUpdate({
                id:this.id,
                noti_client_mailId:this.model.mailId,
                atReply:this.huifuValue
            })
            if(r.msg=="更新成功"){
                let delId=  M.msg_list_vm.msgWeiDuList.map(u=>u.id).indexOf(this.id);
                M.msg_list_vm.msgWeiDuList.splice(delId,1)
            }else {
                weui.toast(r.msg);
            }
        }
    },
    computed:{
        shengyuNum(){
            return 100-this.huifuValue.length
        },
        post_time(){
            let post_time_data= new Date(this.$props.model.post_time)
            let disMonth= post_time_data.getMonth()+1;
            let disDay=post_time_data.getDate();
            let disHour=post_time_data.getHours();
            let disMins=post_time_data.getMinutes();
            disMins=disMins.toString().padStart(2,0)
            M.post_time_data=post_time_data;
            let r= isToday(post_time_data);
            if(r=="今天"){
                return `${disHour}:${disMins}`;
            }else if(r=="昨天"){
                return `昨天${disHour}:${disMins}`;
            }else {
                return `${disMonth}月${disDay}日${disHour}:${disMins}`;
            }
        }
    }
})

