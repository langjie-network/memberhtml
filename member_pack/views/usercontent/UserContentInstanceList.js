

const template=`
    <div>   
          <template  v-for="item in dataList" :key="item.id" class="weui-cells">
                <a  @click="detail($event,item)"  class="weui-cell weui-cell_access">
                      <div style="flex: 4" class="weui-cell__bd">
                        <p>{{item.gmtCreate}}</p>
                      </div>
                        <div style="flex: 1" class="weui-cell__bd">
                            <a class="oplink">下载</a>
                        </div>
                         <div class="weui-cell__bd">
                            <a class="oplink">分享</a>
                        </div>
                     <div class="weui-cell__ft"></div>
                </a>
          </template>
     </div>
`;



export default {
    template,
    name: 'UserContentInstanceList',
    props: {
        //usercontent 类型
        user_pack_type:String,
        //因分享获得
        isShare:Number,
    },
    data() {
        return {
            dataList:[]
        }
    },
    methods: {
        async fetch(){
            let isShare=this.$route.query.isShare;
            let r= await MIO.crmhelpUserContentInstanceList({id:this.$route.query.packId,isShare:isShare});
            this.dataList=r.dataList;
        },
        detail(e,item){
            if(e.target.innerHTML=="下载") {
                this.$router.push({ name: "jsondisplay",params:{
                        file_url: item.filePreviewUrl
                    }})
            }
            return

        }
    },
    mounted() {
        this.fetch()
    },
}