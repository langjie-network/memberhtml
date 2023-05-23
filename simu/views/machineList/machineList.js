M.loadCss("/memberhtml/simu/views/machineList/machineList.css")

const template=`
  <div>
        <div>
            <div>
                 <div v-if="dataList.length>0">
                    <ul>
                        <li v-for="(item,i) in dataList" @click="clickItem(item)"  class="aui-list-item aui-list-item-middle">
                            <div class="aui-list-item-inner" style="display: flex;margin: 5px">
                                <div>
                                    <div class="imgWrap">
                                        <img src="https://langjie.oss-cn-hangzhou.aliyuncs.com/space/root/project/viphelp/member_sign_group_icon.png">
                                    </div>
                                </div>
                                <div style="flex: 3">
                                    <div class="sn_name_div">
                                        {{item.sn}}
                                    </div>
                                    <div :class="item.online?'machine_statue_online':'machine_statue_offline'">
                                        {{item.online? '在线':'离线'}}
                                    </div>
                                </div>

                            </div>

                        </li>
                    </ul>
                </div>
                 <div v-else class="weui-loadmore weui-loadmore_line">
                     <span class="weui-loadmore__tips">暂无数据</span>
                </div>
            </div>
        </div>
    </div>
   
`;

export default  {
    name:"filechat",
    template,
    data() {
        return {
            dataList: [],
        }
    },
    methods:{
        async send(){

        },
        clickItem(item){
            location.href=`/member/simu/s2s_skq/${item.sn}#/s2s_skq`;
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
        document.title="我的机器";
        let r= await M.request.get(M.config.s2scloudHost+"/api/s2scloud/machine");
        let dataList=[];
        if (r.code==0){
            for (let i=0;i<r.data.dataList.length;i++){
                let obj={};
                obj.sn=r.data.dataList[i].sn;
                obj.online=r.data.dataList[i].clientIds?true:false;
                dataList.push(obj);
            }
            this.dataList=dataList;
        }
    }
}