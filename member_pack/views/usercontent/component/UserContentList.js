importStyle("router-page-index", "/memberhtml/member_pack/views/usercontent/index.css");

const template=`
        <div class="weui-cells__title">{{userContentType}}</div>
        
                   <a href="https://v.douyin.com/6RMvaXE/" >进入直播</a>
                   
                  <div  v-if="dataList && dataList.length>0">
                       <template  v-for="item in dataList" :key="item.id" class="weui-cells">
                            <a  @click="detail(item)"  class="weui-cell weui-cell_access">
                                <div class="weui-cell__bd">
                                    <p>{{item.sn}}</p>
                                 </div>
                                  <div v-if="isShare" class="weui-cell__bd">
                                     <p>{{item.createUser}}</p>
                                  </div>
                                 <div class="weui-cell__bd">
                                    <p style="color: blue">{{item.userContentInstanceCount}}</p>
                                 </div>
                                <div class="weui-cell__ft"></div>
                            </a>
                    </template>
                  </div>
                  <div v-else class="weui-loadmore weui-loadmore_line">
                         <span class="weui-loadmore__tips">暂无数据</span>
                 </div>
       </div>
`;



export default {
    template,
    name: 'UserContentList',
    props: {
        //usercontent 类型
        userContentType:String,
        //因分享获得
        isShare:Number,
        dataList:Array
    },
    data() {
        return {

        }
    },
    methods:{
        detail(item){
            this.$router.push({ path: "/inslist",query:{
                      packId:item.id,
                      isShare:this.isShare
                }})
        }
    },
    mounted() {

    },
}