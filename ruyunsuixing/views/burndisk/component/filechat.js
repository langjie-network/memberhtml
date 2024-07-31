importStyle("filechatCss","./views/burndisk/component/filechat.css");

const template=`
   <div >
        <div class="aui-refresh-content-filechat">
                   <ul>
                        <li class="filechatLi" v-for="(item, index) in  rootFileChatMsgList" :key="index">
                            <div>
                                <img class="head-portrait" :src="item.avatar"/>
                                <span class="head-name">{{getSendUserName(item.create_user_name)}}</span>
                            </div>
                            <div class="filechatContent">
                                {{item.content}}
                            </div>  
                            <div class="filechatBottom">
                                 {{humanDate(item.gmt_create)}}
                                 
                            </div>  
                             <div class="filechatBottomLine"></div>  
                        </li> 
                    </ul>     
            </div>
        <div class="filechat-lastline">
             
        </div>    
        <div class="bottom-bar">
            <div class="chat-bar">
                 <input placeholder="请输入内容..."  v-model="inputValue"></input>
                 <div v-show="sendBtnVisable"  @click="send">发送</div>
            </div>
        </div>
   <div>
   
`;

export default  {
    name:"filechat",
    template,
    props: {
        root_file_id: String,
    },
    data() {
        return {
            sendBtnVisable:false,
            inputValue:"",
            rootFileChatMsgList: [
            ]
        }
    },
    methods:{
        getSendUserName(username){
            if(M.gloable_state.userInfo.company=="杭州朗杰测控技术开发有限公司"){
                return username;
            }else {
                if(username){
                   return  username[0]+"**";
                }
                return "匿**";
            }
        },
        humanDate(data){
            return this.$common.humanDate(data)
        },
        pullRefresh() {
            let that=this;
            let pr1 = new auiPullToRefresh({
                container: document.querySelector('.aui-refresh-content-filechat'),
                triggerDistance: 50
            }, function (ret) {
                if (ret.status == "success") {
                    setTimeout(function () {
                        that.fetchFlush();
                        pr1.cancelLoading();
                    }, 500);
                    pr1.cancelLoading();
                }
            });
        },
        async fetchFlush(){
          //  alert(this.fileid)
             let result= await MIO.rootfileListRootFileChatMsg({root_file_id:this.root_file_id})
             this.rootFileChatMsgList= result.data.rows;
        },
        async send(){
           let r=await MIO.rootfileAddRootFileChatMsg({
                content:this.inputValue,
                root_file_id:this.root_file_id
            });
           if(r.code==200||r.code==0){
               this.fetchFlush();
               this.inputValue="";
               this.sendBtnVisable=false;
               window.scrollTo(0,0);
           }
           if(false){
               let $dialog= weui.dialog({
                   title: '提醒',
                   content: `感谢您的参与,本次赠送的${r.data.score}元宝分已发送到您的钱包，请注意查收`,
                   className: 'custom-classname',
                   buttons: [ {
                       label: '确定',
                       type: 'primary',
                       onClick: function () { $dialog.hide() }
                   }]
               });
           }
        }
    },
    computed:{

    },
     watch:{
        inputValue(newVal){
           if(newVal.length>0){
                this.sendBtnVisable=true;
           }else {
               this.sendBtnVisable=false;
           }

        },
         root_file_id(newVal){
             //alert(newVal)
             this.pullRefresh();
             this.fetchFlush();
         }
    },
    async mounted() {

    }
}