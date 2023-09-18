
window.onload = function () {
    M.vueApp = new Vue({
        el: "#main",
        data: {
            tab:0,
            msgWeiDuList: [{}],
            msgYiduList:[{}],
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
                    this.msgWeiDuList=[{}];
                }else {
                    this.msgYiduList=[{}];
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
                M.vueApp.yiduPage=  M.vueApp.yiduPage+1;
                M.vueApp.reRender("top")
                pr1.cancelLoading(); //刷新成功后调用此方法隐藏
            }, 500);
        }
    });
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
        M.item=this
    },
    methods: {

    },
    computed:{


    }
})

