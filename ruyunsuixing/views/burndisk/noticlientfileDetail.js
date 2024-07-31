importStyle("router-page-burndiskDetail","./views/burndisk/burndiskDetail.css");

import FileChat from "./component/filechat.js";

const template=`
<div>
    <!-- 头部 -->
    <div class="rootFileDetailHeader">
            <template v-if="this.rootFile.file_suffix!='imgs'">
                  <img @click.stop="filePreview"  class="rootFileDetailIconImg" :src="fileTypeImg">
             </template>
            <template v-else>
                 <MingDirImg @click.stop="filePreview"  pclass="rootFileDetailIconImg" :src="fileTypeImg"></MingDirImg>
            </template>
        <img  class="downloadBtnImg" @click.stop="download"  :src="$BASE_IMG_URL('/download-btn.png')"  />
        <img @click.stop="collectRootFile" class="rootFileDetailCollect" :src="$BASE_IMG_URL(rootFile.collect==1?'/yello_wujiaoxing.png':'/white_wujiaoxing.png')"/>
        <div v-if="rootFile.file_suffix=='imgs' &&  rootFile.file_source_type=='gallery_sub' " class="rootFileDetailImgs_more" @click="moreImgs">
              <img src="https://langjie.oss-cn-hangzhou.aliyuncs.com/space/root/project/ruyunsuixing/img/imgs_icon.png" />
                相关图片,更多>>
        </div>
    </div>
     <!--下面的3tab-->
   <div class="weui-tab burndiskDetailTabDiv" id="noticlientfileTabId">
    <div class="weui-navbar" style="height: 12.22287vw">
        <div class="weui-navbar__item">详情</div>
        <div class="weui-navbar__item">备注</div>
    </div>
    <div class="weui-tab__panel">
        <div class="weui-tab__content">
            <div class="budingList" >
                <ul>
                    <li class="budingListLi"  >
                        <div class="fileInfo">
                            文件名:{{rootFile.file_name}}
                        </div>
                    </li>
                
                     <li v-if="
                        rootFile.file_source_type!='gallery' && 
                        rootFile.file_source_type!='doc_lib' &&
                        rootFile.file_source_type!='vtc_cfg_temp' &&
                        rootFile.file_source_type!='ats_cfg_temp' &&
                        rootFile.file_suffix !='imgs' 
                     " class="budingListLi"  >
                        <div class="fileInfo">
                            文件大小:{{ this.$common.humanFileCapacity(rootFile.capacity)}}
                        </div>
                     </li>
                        <li class="budingListLi"  >
                        <div class="fileInfo">
                            创建时间:{{ this.$common.formatData(rootFile.gmt_create) }}
                        </div>
                     </li>
                </ul>
         </div>
        </div>
        <div class="weui-tab__content">
            <file-chat  :root_file_id="root_file_id"></file-chat>
        </div>
     </div>
    </div>
</div>
`

export default  {
    name:"burndiskDetail",
    template,
    components:{
        "file-chat": FileChat
    },
    data() {
        return {
            fileTypeImg:"",
            root_file_id:0,
            rootFile:{}
         }
    },
    methods:{
        async filePreview(){
            let file_suffix= this.rootFile.file_suffix;
            if( file_suffix=="doc"|| file_suffix=="docx"|| file_suffix=="pdf"){
                this.$router.push({ path: "officePreview", query:{
                        file_url:this.rootFile.file_url.replace("/downloads","")
                    }});
                 return
            };
            if(file_suffix=="json"){
                this.$router.push({ path: "jsonPreview", query:{
                        file_url:this.rootFile.file_url.replace("/downloads","")
                    }});
                return
            }else if(file_suffix=="jpg" || file_suffix=="png"){
                this.$router.push({ path: "imgPreview", query:{
                        file_url:this.rootFile.file_url.replace("/downloads","")
                    }});
                return
            } else if(file_suffix=="txt" || file_suffix=="md"){
                this.$router.push({ path: "textPreview", query:{
                        file_url:this.rootFile.file_url.replace("/downloads","")
                    }});
                return
            }else if(file_suffix=="imgs" && this.rootFile.file_source_type=="gallery"){
                let fileUrlList= await MIO.knowlibGetGalleryGroupItem(this.rootFile.file_id)
                MIO.wxConfig({
                    readyCallBack:()=>{
                        wx.previewImage({
                            current:fileUrlList[0],
                            urls:fileUrlList,
                        });
                    }})
                return
            }else if(file_suffix=="imgs" && this.rootFile.file_source_type=="noti_client"){
                let fileUrlList= await MIO.getNotiClientItemImgs(this.rootFile.file_id)
                MIO.wxConfig({
                    readyCallBack:()=>{
                        wx.previewImage({
                            current:fileUrlList[0],
                            urls:fileUrlList,
                        });
                    }})
                return
            }else if(file_suffix=="imgs" && this.rootFile.file_source_type=="gallery_sub"){
                this.$router.push({ path: "imgPreview", query:{
                        file_url:this.rootFile.file_url.replace("/downloads","")
                    }});
                return
            }
        },
        async moreImgs(){
            let fileUrlList= await MIO.member_ajax_gallery_sub_list_imgs(this.rootFile.file_id);
            if(fileUrlList.length>0){
                MIO.wxConfig({
                    readyCallBack:()=>{
                        wx.previewImage({
                            current:fileUrlList[0],
                            urls:fileUrlList,
                        });
                    }})
            }else {
                weui.toast('暂无图片');
            }
            return
        },
        changeDownType(downloadType){
            this.downloadType=downloadType;
        },
        async download(){
             window.open(  this.rootFile.file_url.replace("/downloads",""))
        },
        initWeuiTab(){
            weui.tab('#noticlientfileTabId',{
                defaultIndex: 0,
                onChange: function(index){
                    //console.log(index);
                }
            });

            $(".weui-navbar__item")[0].click()

        },
        async collectRootFile(){
            let item=this.rootFile;
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
        getFileTypeImg(){
            if(this.rootFile.file_suffix =="png" || this.rootFile.file_suffix =="jpg" || this.rootFile.file_suffix =="imgs"){
                return this.rootFile.file_url.replace("/downloads","");
            }
            return this.$common.getFileTypeImg(this.rootFile.file_suffix,this.rootFile.file_source_type);
        },
    },
    computed:{

    },

    async mounted() {
        this.initWeuiTab();
        let fileItemStr= this.$route.params.item;
        let root_file_id=this.$route.query.root_file_id;
         if(fileItemStr==undefined){
            let res= await MIO.rootfileList({root_file_id:root_file_id})
             this.rootFile=res.data.rows[0];
         }else {
             let fileItem=JSON.parse(fileItemStr);
             this.rootFile=fileItem;
         }
        if(this.rootFile.file_source_type=="noti_client"){
            M.gloable_state.header={
                title:"专线文件",
                leftIcon:"back",
            }
        }else if(this.rootFile.file_source_type=="doc_lib") {
            M.gloable_state.header={
                title:"文档库",
                leftIcon:"back",
            }
        }else if(this.rootFile.file_source_type=="gallery" || this.rootFile.file_source_type=="gallery_sub" ) {
            M.gloable_state.header={
                title:"图库",
                leftIcon:"back",
            }
         }else if(this.rootFile.file_source_type=="vtc_cfg_temp"){
                M.gloable_state.header={
                    title:"vtc模板",
                    leftIcon:"back",
                }
        }else if(this.rootFile.file_source_type=="ats_cfg_temp"){
                M.gloable_state.header={
                    title:"ats模板",
                    leftIcon:"back",
                }
        }
         this.fileTypeImg=this.getFileTypeImg();
         this.root_file_id=root_file_id;

        if(M.isWeiXin){
            MIO.member_ajax_memberRedict_setRedictUrl();
        }
    }
}


