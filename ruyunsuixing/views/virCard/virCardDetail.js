const template=`<div>
    <!-- 头部 -->
    <img class="card-guangpanImg" src="https://langjie.oss-cn-hangzhou.aliyuncs.com/space/root/project/ruyunsuixing/img/guangpan.png">
    <!--  页面的遮罩层-->
    <div v-if="showCoverMask" :class="maskStyle" @click="helpNum=0;visableDownloadDialog=false;showCoverMask=false;"></div>
    <div @click="visableDownloadDialog=false">
        <h2 class="vircarf-title">详情 </h2>
        <table>
            <tr>
                <td>序列号</td>
                <td>{{sn}}</td>
            </tr>
            <tr>
                <td>文件名</td>
                <td>{{diskName}}</td>
            </tr>
            <tr>
                <td>定制</td>
                <td>{{remark}}</td>
            </tr>
            <tr>
                <td>更新时间</td>
                <td>{{updatedAt}}</td>
            </tr>
        </table>
        <h2 class="vircarf-title">补丁表
            <img @click="changeVisableBudingList" :src="visableBudingListIcon">
        </h2>

        <div v-if="visableBudingList" class="budingList" >
            <ul>
                <li class="budingListLi" v-for="item in dependencies" :key="item.name" >
                    <div>
                        {{item.name}}
                    </div>
                    <div>
                        {{item.version}}
                    </div>
                    <img @click.stop="itemDownLoad(item)" class="downloadImg" :src="$BASE_IMG_URL('/download.png')">
                </li>
            </ul>
        </div>
        

        <div @click.stop="download"  class="download-btn-wrap">
            <img  :src="$BASE_IMG_URL('/download-btn.png')"  />
        </div>
    </div>
    <DownLoadBottomDialog v-if="visableDownloadDialog"></DownLoadBottomDialog>
</div>


`

export default  {
    template,
    name:"virCardDetail",
    data() {
        return {
            dizhi:window.location.href,
            visableDownloadDialog: false,
            dependencies:[],
            sn:"",
            softId: "",
            remark:"",
            updatedAt:"",
            diskName:"",
            helpNum:0,
            maskStyle:"coverMaskDiv",
            //遮罩层
            showCoverMask:false,
            visableBudingList:false,
            visableBudingListIcon:"https://langjie.oss-cn-hangzhou.aliyuncs.com/space/root/project/ruyunsuixing/img/xiala01.png"
        }
    },
    methods:{
        changeDownType(downloadType){
            this.downloadType=downloadType;
        },
        async download(){
            this.softId="";
            this.maskStyle="coverMaskDiv";
            let userInfo= M.getUserInfo()
            if(userInfo==null){
                let sn=M.getParameter("sn");
                location.href=`/member/ruyunsuixing?sn=${sn}&redirect_uri=/virCardDetail`;
                return;
            }
            // return
            if(!M.isPc){
                this.visableDownloadDialog=true;
                this.showCoverMask=true;
            }else {
                let r=await  MIO.cloudDiskDownLoad({sn:this.sn});
                if(r.code==200||r.code==0){
                    window.open(r.data)
                }
            }
        },
        async itemDownLoad(item){
            this.softId=item.id;
            if(!M.isPc){
                this.maskStyle="coverMaskDiv";
                this.visableDownloadDialog=true;
                this.showCoverMask=true;
            }else {
                let r=await  MIO.cloudDiskDownLoad({sn:this.sn,softId:this.softId});
                if(r.code==200||r.code==0){
                    window.open(r.data)
                }
            }
        },
        downLoadCallBack(downloadType,memberMail){
           // console.log(downloadType,memberMail)
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
                MIO.cardInstallSendMail({sn:this.sn,_id:this._id, softId:this.softId,to:memberMail})
            }
        },
        changeVisableBudingList(){
            this.visableBudingList=!this.visableBudingList;
            if(this.visableBudingList){
               this.visableBudingListIcon="https://langjie.oss-cn-hangzhou.aliyuncs.com/space/root/project/ruyunsuixing/img/xiala01.png";
            }else {
                this.visableBudingListIcon="https://langjie.oss-cn-hangzhou.aliyuncs.com/space/root/project/ruyunsuixing/img/shangla01.png";
            }
        }
    },
    computed:{

    },
    async mounted() {
        //alert(77)
        let sn = M.getParameter("sn");
        if (sn == null) {
            alert("不存在");
            return;
        }
        let userInfo=  M.getUserInfo();
        let unionid =await M.getParameter("unionid");

        if(M.isPc && userInfo==null && !M.isWeiXin){
            let hashArr= location.hash.split("?")
            let query=hashArr.length==2?`&${hashArr[1]}`:"";
            const redictUrl=`/ruyunsuixing/index.html#/login?redirect_uri=/virCardDetail`+query;
            console.log("=========burndisk=======",redictUrl,"=========burndisk=======")
            window.location.href=redictUrl;
            return;
        }
        if (M.isWeiXin  &&  unionid && userInfo==null) {
            M.setUserInfo({unionid})
            await MIO.fetchMemberInfo({unionid});
            userInfo=  M.getUserInfo();
        }

        let res = await MIO.targetBurnDiskBySn(sn);
        if (res.code != 200) {
            alert(res.msg);
            return;
        }
        let resData = res.data;
        this.sn = resData.sn;
        this._id=resData._id;
        this.remark = resData.remark;
        this.diskName = resData.diskName;
        this.dependencies = resData.dependencies;
        this.updatedAt = resData.updatedAt.substr(0, 10);
        //this.sn=99
        //this.$data={sn:77}
        M.t = this
    }
}


