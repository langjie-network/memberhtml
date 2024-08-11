

importStyle("router-page-burndiskDetail","./views/burndisk/burndiskDetail.css");
import FileChat from "./component/filechat.js";



const burndiskDetailProjectType={
    "53":"MaxTestinstall",
    "57":"MaxTesten-Install",
    "58":"DynaTest900-Install",
    "62":"ActionKit-VTC-Install",
    "63":"ActionKit-MGT-Install",
    "66":"MaxTestYJ-install",
    "68":"MaxTest-ZY install",
    "74":  "ActionKit-MGT-Demo"
}
const template=`
<div>
    <!-- 头部 -->
    <div class="rootFileDetailHeader">
        <img class="rootFileDetailIconImg" :src="guangpanImg">
        <img  class="downloadBtnImg" @click.stop="download"  :src="$BASE_IMG_URL('/download-btn.png')"  />
        <img @click.stop="collectRootFile" class="rootFileDetailCollect" :src="$BASE_IMG_URL(rootFile.collect==1?'/yello_wujiaoxing.png':'/white_wujiaoxing.png')"/>
    </div>
    <!--页面的遮罩层-->
    <div v-if="showCoverMask" :class="maskStyle" @click="helpNum=0;visableDownloadDialog=false;showCoverMask=false;"></div>
    <!--下面的3tab-->
   <div class="weui-tab burndiskDetailTabDiv" id="burndiskDetailTabId">
    <div class="weui-navbar" style="height: 12.22287vw">
        <div class="weui-navbar__item">详情</div>
        <div class="weui-navbar__item">补丁表</div>
        <div class="weui-navbar__item">备注</div>
    </div>
    <div class="weui-tab__panel">
        <div class="weui-tab__content">
            <div class="budingList" >
                <ul>
                    <li class="budingListLi"  >
                        <div class="fileInfo">
                            文件名:{{diskName}}
                        </div>
                    </li>
                     <li class="budingListLi"  >
                        <div class="fileInfo">
                            定制:{{remark}}
                        </div>
                    </li>
                     <li class="budingListLi"  >
                        <div class="fileInfo">
                            刻盘编码:{{diskCode}}
                        </div>
                    </li>
                     <li class="budingListLi"  >
                        <div class="fileInfo">
                            适用于:{{remark1}}
                        </div>
                    </li>
                     <li class="budingListLi"  >
                        <div class="fileInfo">
                            文件大小:{{(diskcapacity/1048576).toFixed(2)}}M
                        </div>
                    </li>
                    <li class="budingListLi"  >
                        <div class="fileInfo">
                            更新时间:{{updatedAt}}
                        </div>
                    </li>
                </ul>
         </div>
     
        </div>
        <div class="weui-tab__content">
          <div class="budingList budingOverflowy" >
            <ul>
                <li class="budingListLi" 
                    style="background-color: rgb(255,255,255);">
                   <div class="budingHeadName">
                       补丁名
                    </div>
                    <div style="font-size: 4vw">
                       版本号
                    </div>
                    <div>
                    
                    </div>
                </li>
                <li class="budingListLi" v-for="item in dependencies" :key="item.name" >
                    <div class="budingItemName">
                        {{item.name}}
                    </div>
                    <div>
                        {{item.version}}
                    </div>
                    <img @click.stop="itemDownLoad(item)" class="downloadImg" :src="$BASE_IMG_URL('/download.png')">
                </li>
            </ul>
        </div>
        </div>
        <div class="weui-tab__content">
             <file-chat :rootFile="rootFile"  :root_file_id="root_file_id"></file-chat>
        </div>
     </div>
    </div>

    <DownLoadBottomDialog v-if="visableDownloadDialog"></DownLoadBottomDialog>
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
            root_file_id:0,
            rootFile:{},
            guangpanImg:"https://langjie.oss-cn-hangzhou.aliyuncs.com/space/root/project/ruyunsuixing/img/guangpan.png",
            dizhi:window.location.href,
            visableDownloadDialog: false,
            dependencies:[],
            sn:"",
            _id:"",
            diskCode:"",
            softId: "",
            remark:"",
            updatedAt:"",
            diskName:"",
            helpNum:0,
            remark1:"",
            diskcapacity:0,
            maskStyle:"g_coverMaskDiv",
            //遮罩层
            showCoverMask:false,
            visableBudingList:true,
            visableBudingListIcon:"https://langjie.oss-cn-hangzhou.aliyuncs.com/space/root/project/ruyunsuixing/img/xiala01.png"
        }
    },
    methods:{
        changeDownType(downloadType){
            this.downloadType=downloadType;
        },
        async download(){
            this.softId="";
            this.maskStyle="g_coverMaskDiv";
            let userInfo= M.getUserInfo()
            if(userInfo==null){
                let diskCode=M.getParameter("diskCode");
                location.href="/member/ruyunsuixing?diskCode="+diskCode+"&redirect_uri=/burndiskDetail";
                return;
            }
            // return
            if(!M.isPc){
                this.visableDownloadDialog=true;
                this.showCoverMask=true;
            }else {
                let r=await  MIO.cloudDiskDownLoad({_id:this._id});
                let r2= await MIO.rootfile_sync2oss({_id:this._id,check:true});
                if(r2.code!=200 && r2.code!=0 ){
                    weui.toast(r2.msg);
                    return;
                }
                if(r.code==200||r.code==0){
                    let ossCacheFile=r.data.split("downloads/temp/")[1];
                    let fileCacheFile=r2.data.split("downloads/temp/")[1];
                    if(ossCacheFile ==fileCacheFile){
                         MIO.cloudDiskDownLoadAddEvent({_id:this._id});
                         window.open(r.data)
                    }else {
                       let r2= await MIO.rootfile_sync2oss({_id:this._id,check:false});
                       if(M.checkR(r2)){
                           weui.toast("正在打包中...")
                       }else {
                           weui.toast(e.msg)
                       }
                    }
                }else {
                    weui.toast(r.msg+"_"+r2.msg)
                }
            }
        },
        async itemDownLoad(item){
            this.softId=item.id;
            let r=await  MIO.cloudDiskDownLoadSoft({softId:this.softId});
            if(r.code==200||r.code==0){
                setTimeout(()=>{
                  //  console.log(M.config.wxCallBackUrl+r.data,"AAAAAAA")
                    window.open(M.config.wxCallBackUrl+r.data)
                },1000);
            }else {
                weui.toast(r.msg)
            }
        },
        async downLoadCallBack(downloadType,memberMail){
            //console.log(downloadType,memberMail)
            if(downloadType!=1){
                this.showCoverMask=1;
                this.visableDownloadDialog=false;
                //this.helpNum=1;
                 if(downloadType==2){
                     this.maskStyle="coverMaskDiv3";
                 }else {
                     this.maskStyle="coverMaskDiv2";
                 }
            }
            if(downloadType==1){
                let r=await  MIO.cloudDiskDownLoad({_id:this._id});
                let r2= await MIO.rootfile_sync2oss({_id:this._id,check:true});
                if(r2.code!=200 && r.code==0){
                    weui.toast(r2.msg);
                    return;
                }
                let ossUrl=null;
                if(r.code==200 || r.code==0){
                    let ossCacheFile=r.data.split("downloads/temp/")[1];
                    let fileCacheFile=r2.data.split("downloads/temp/")[1];
                    if(ossCacheFile ==fileCacheFile){
                        MIO.cloudDiskDownLoadAddEvent({_id:this._id});
                        ossUrl=r.data;
                    }else {
                        let r2= await MIO.rootfile_sync2oss({_id:this._id,check:false});
                        if(M.checkR(r2)){
                            weui.toast("正在打包中...")
                        }else {
                            weui.toast(e.msg)
                        }
                    }
                }else {
                    weui.toast(r.msg+"_"+r2.msg)
                }
                if(ossUrl!=null){
                    MIO.cardInstallSendMail({sn:this.sn,softId:this.softId,to:memberMail,_id:this._id,ossUrl:ossUrl})
                }
            }
        },
        changeVisableBudingList(){
            this.visableBudingList=!this.visableBudingList;
            if(this.visableBudingList){
               this.visableBudingListIcon="https://langjie.oss-cn-hangzhou.aliyuncs.com/space/root/project/ruyunsuixing/img/xiala01.png";
            }else {
                this.visableBudingListIcon="https://langjie.oss-cn-hangzhou.aliyuncs.com/space/root/project/ruyunsuixing/img/shangla01.png";
            }
        },
        initWeuiTab(){
            weui.tab('#burndiskDetailTabId',{
                defaultIndex: 0,
                onChange: function(index){
                    if(index!=0){
                        let userInfo= M.getUserInfo()
                        if(userInfo==null){
                            let diskCode=M.getParameter("diskCode");
                            location.href="/member/ruyunsuixing?diskCode="+diskCode+"&redirect_uri=/burndiskDetail";
                            return;
                        }
                    }
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
        }
    },
    computed:{

    },
    async mounted() {
        let userInfo=  M.getUserInfo();
        let unionid =await M.getParameter("unionid");
        M.gloable_state.header={
            title:"安装云盘",
            leftIcon:"back",
        }
        this.initWeuiTab();
        let diskCode=M.getParameter("diskCode");
        if(unionid||userInfo!=null){
            let fileItemStr= this.$route.params.item;
            let root_file_id=this.$route.query.root_file_id;
            if(fileItemStr==undefined){
                let res= await MIO.rootfileList({root_file_id:root_file_id,rootFileCode:diskCode})
                this.rootFile=res.data.rows[0];
            }else {
                let fileItem=JSON.parse(fileItemStr);
                this.rootFile=fileItem;
            }
            this.fileTypeImg=this.$common.getFileTypeImg(this.rootFile.file_suffix,this.rootFile.file_source_type);
            this.root_file_id=this.rootFile.id;
            if(this.rootFile.trial_version==1){
                M.gloable_state.header={
                    title:"安装云盘(试用版)",
                    leftIcon:"back",
                }
            }
        }
        if (diskCode == null) {
            alert("diskCode不存在");
            return;
        }
        if(M.isPc && userInfo==null && !M.isWeiXin){
            let hashArr= location.hash.split("?")
            let query=hashArr.length==2?`&${hashArr[1]}`:"";
            const redictUrl=`/memberhtml/pages/vippc/login.html`;
            window.location.href=redictUrl;
            return;
        }
        if (unionid && userInfo==null) {
            M.setUserInfo({unionid})
            await MIO.fetchMemberInfo({unionid});
            userInfo=  M.getUserInfo();
        }
        let res = await MIO.targetBurnDiskByDiskCode(diskCode);
        if (res.code != 200 && res.code != 0) {
            alert(res.msg);
            return;
        }
        let resData = res.data;
        this._id=resData._id;
        this.diskCode = diskCode;
        this.remark = resData.remark;
        this.remark1 = resData.remark1;
        this.diskName = resData.diskName;
        this.dependencies = resData.dependencies;
        this.updatedAt = resData.updatedAt.substr(0, 10);
        if(resData.diskcapacity){
            this.diskcapacity=resData.diskcapacity;
        }
        let projectName=  burndiskDetailProjectType[resData.projectPrimaryId];
        if(projectName.startsWith("Max")){
            this.guangpanImg=this.$BASE_IMG_URL("/MaxTest_guangpan.png");
        }else if(projectName.startsWith("Dyna")){
            this.guangpanImg=this.$BASE_IMG_URL("/DynaTest_guangpan.png");
        }else if(projectName.startsWith("ActionKit")){
            this.guangpanImg=this.$BASE_IMG_URL("/Actionket_guangpan.png");
        }
        if(M.isWeiXin){
            MIO.member_ajax_memberRedict_setRedictUrl();
        }
    }
}


