importStyle("todoListCss","./views/todoList/todoList.css");

const template=`
   <div >
        <div class="aui-refresh-content-filechat">
                   <ul>
                        <li class="filechatLi" v-for="(item, index) in  rootFileChatMsgList" :key="index">
                            <div>
                                <img class="head-portrait" :src="item.baseModePayload.avatar"/>
                                <span class="head-name">{{getSendUserName(item.baseModePayload.name)}}</span>
                            </div>
                            <div class="filechatContent">
                                {{item.content}}
                            </div>  
                            <div class="filechatBottom">
                                 {{humanDate(item.gmtCreate)}}
                                 
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
             let result= await MIO.plcm_todoList_list()
             this.rootFileChatMsgList= result;
        },
        async send(){

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

        }
    },
    async mounted() {
        M.Component.filechat=this;
        this.pullRefresh();
        this.fetchFlush();
        if(M.getUserInfo()!=null){
            MIO.socketConnect();
        }
    }
}