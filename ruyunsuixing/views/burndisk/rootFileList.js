

importStyle("router-page-rootFileList","./views/burndisk/rootFileList.css");


const template=`
<div class="rootFileListPageDiv"  ref="scroll">
    <div class="rootFileList-search-wrap">
          <img  @click="scanSn" class="leftImg" src="https://langjie.oss-cn-hangzhou.aliyuncs.com/space/root/project/ruyunsuixing/img/scan_code.png"/>
          <input placeholder="请输入刻盘编码或文件名"  ref="rootFileKeyword">
          <img class="rightImg"  @click="fetchFlush(false)" src="https://langjie.oss-cn-hangzhou.aliyuncs.com/space/root/project/ruyunsuixing/img/search.png"/>
    </div>
    <div class="rootFileList">
         <ul v-if="rootFileList.length>0">
            <li @click="rootFileDetail(item)" v-for="(item,i) in rootFileList" :key="index" :style="{backgroundColor: item.collect==1?'rgb(167,211,189)':'rgb(255,255,255)'}">
                <div>
                    <template v-if="item.file_suffix!='imgs'">
                         <img class="rootFileListImg" :src="fileTypeImg(item)"/>
                    </template>
                    <template v-else>
                         <MingDirImg pclass="rootFileListImg" :src="fileTypeImg(item)"></MingDirImg>
                    </template>
                </div>
                <div class="burndiskInfo">
                     <p v-if="$gloable_state.userInfo.company=='杭州朗杰测控技术开发有限公司'">
                         {{item.affair_name}}
                     </p>
                     <p>
                       文件名:{{item.name}}
                    </p>
                     <p v-if="item.file_source_type=='burn_disk'">
                      文件编码:{{item.code}}
                    </p>
                     <p v-if="item.file_source_type=='burn_disk' ">
                       文件大小: {{ this.$common.humanFileCapacity(item.capacity)}}
                     </p>
                     <p v-if="item.last_file_chat_msg !=null">
                      备注:{{item.last_file_chat_msg_username}}:{{item.last_file_chat_msg}}
                    </p>
                     <p v-else>
                      备注:
                    </p>
                </div> 
                <img @click.stop="collectRootFile(item)" class="rootFileCollect" :src="$BASE_IMG_URL(item.collect==1?'/yello_wujiaoxing.png':'/white_wujiaoxing.png')"/>
            </li>
        </ul>
        <div v-else class="weui-loadmore weui-loadmore_line">
               <span class="weui-loadmore__tips">暂无数据</span>
        </div>
        <div style="height: 10vw"></div>
    </div>
   </div>
</div>
`;


export default  {
    name:"rootFileList",
    template,
    data() {
        return {
            innerHeight : 0,
            rootFileList: [],
            isLoad:false,
            page:1,
            num:12,
            collect:null,
            file_source_type:null,
            trial_version:null
        }
    },
    methods:{
        rootFileDetail(item){
            if(item.file_source_type=="burn_disk"){
                this.$router.push({ path: "burndiskDetail",
                    query:{
                        diskCode:item.code,
                    } })
            }else {
                this.$router.push({
                    query:{root_file_id:item.id},
                    name: "noticlientfileDetail",
                    params:{item:JSON.stringify(item)}})
            }
        },
        //收藏
        async collectRootFile(item){
            if(item.collect==0){
               let r= await MIO.rootFilePersonalitySettings({
                    "root_file_id": item.id,
                    "collect": 1
                });
                if(r.code==200||r.code==0){
                    item.collect=1;
                }
            }else {
                let r= await MIO.rootFilePersonalitySettings({
                    "root_file_id": item.id,
                    "collect": 0
                });
                if(r.code==200||r.code==0){
                    item.collect=0;
                }
            }
        },

        pullRefresh() {
            let that=this;
            let pr1 = new auiPullToRefresh({
                container: document.querySelector('.rootFileList'),
                triggerDistance: 50
            }, function (ret) {
                if (ret.status == "success") {
                    setTimeout(function () {
                        that.fetchFlush(false);
                        pr1.cancelLoading();
                    }, 500);
                    pr1.cancelLoading();
                }
            });
        },

        //搜索
        async fetchFlush(append){
           let keyword=this.$refs.rootFileKeyword.value;
            if(append==false){
                this.page=1;
            }
            let r= await MIO.rootfileList(
                            {
                                page:this.page,
                                num:this.num,
                                keyword:keyword,
                                collect:this.collect,
                                file_source_type:this.file_source_type,
                                trial_version:this.trial_version
                           });
           if(append){
               this.rootFileList=[...this.rootFileList,...r.data.rows]  ;
           }else {
               this.innerHeight=0;
               this.rootFileList=r.data.rows;
           }
        },
        async onScroll(){
            //可滚动容器的高度
            let innerHeight = this.$refs.scroll.clientHeight;
            //屏幕尺寸高度
            let outerHeight = document.documentElement.clientHeight;
            //可滚动容器超出当前窗口显示范围的高度
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            //document.title=scrollTop
            //避免切换时读取到异常高度
            if(scrollTop==0){
                innerHeight=10000
            }
            //scrollTop在页面为滚动时为0，开始滚动后，慢慢增加，滚动到页面底部时，出现innerHeight < (outerHeight + scrollTop)的情况，严格来讲，是接近底部。
            if(this.isLoad==false){
                if(innerHeight-this.innerHeight>0 && (innerHeight-(outerHeight + scrollTop))<-50){
                   // console.log(innerHeight,"======",innerHeight-(outerHeight + scrollTop))
                    this.isLoad=true;
                    setTimeout(async ()=>{
                        this.page=this.page+1;
                        await this.fetchFlush(true);
                        this.isLoad=false;
                        this.innerHeight=innerHeight;
                    },200);

                }
            }
        },
        //扫描二维码
        async scanSn(){
            let that=this;
            MIO.wxConfig({
                readyCallBack:()=>{
                    wx.scanQRCode({
                        desc: 'scanQRCode desc',
                        needResult: 1,
                        scanType: ["qrCode","barCode"],
                        success: function (res) {
                            try{
                               // var no = res.resultStr.split(',')[1];
                                setTimeout(function(){
                                     let  urlObj=  M.urlParse(res.resultStr)
                                     that.$refs.rootFileKeyword.value=urlObj.diskCode;
                                     that.fetchFlush(false);
                                }, 500);
                            }catch(e){
                                alert('非法条形码');
                            }
                        },
                        error: function(err){
                            if(err.errMsg.indexOf('function_not_exist') > 0){
                                alert('版本过低请升级');
                            }
                        }
                    });
            }})
        },
        fileTypeImg(item){
            if(item.file_suffix =="png" || item.file_suffix =="jpg" || item.file_suffix =="imgs"){
                return item.file_url.replace("/downloads","");
            }
            return this.$common.getFileTypeImg(item.file_suffix,item.file_source_type);
        }
    },
    watch:{
        $route: {
            handler() {
                 if(this.$route.fullPath.startsWith("/rootFileList")){
                     let query= this.$route.query;
                     this.collect=query.collect;
                     this.file_source_type=query.file_source_type;
                     this.trial_version=query.trial_version;
                     this.page=1;
                     console.log("====>",query.trial_version)
                     this.fetchFlush(false);
                 }
            },
            deep: true,
        }
    },

    async mounted() {
         M.gloable_state.isLookRootFileList=true;
         M.gloable_state.header={
             title:"企业云盘",
             leftIcon:"menu",
         };
         let query= this.$route.query;
         //console.log("===>",query)
         this.collect=query.collect;
         this.page=1;
         this.file_source_type=query.file_source_type;
         this.trial_version=query.trial_version;
         this.pullRefresh();
         this.fetchFlush(false);
         window.addEventListener("scroll", this.onScroll);
    },
    unmounted(){
        window.removeEventListener('scroll', this.onScroll ,false)
    }
}


