importStyle("DownLoadBottomDialog","./component/DownLoadBottomDialog/DownLoadBottomDialog.css");


const template=`
     <div  v-if="status==0" class="download-type-wrap-div">
        <header>{{headerTitle}}</header>
        <div class="download-type-content-wrap">
            <div class="download-type-content-item"  @click="changeDownType(1)">
                <img :src="downloadType==1?$BASE_IMG_URL( '/mail_checked.png'):$BASE_IMG_URL( '/mail_unchecked.png')">
                <div :style="{'color':downloadType==1?'green':'#9a9595'}">邮箱</div>
            </div>
            <div class="download-type-content-item" @click="changeDownType(2)">
                <img :src="downloadType==2?$BASE_IMG_URL( '/ios_checked.png'):$BASE_IMG_URL( '/ios_unchecked.png')">
                <div :style="{'color':downloadType==2?'green':'#9a9595'}">苹果用户</div>
            </div>
            <div class="download-type-content-item" @click="changeDownType(3)">
                <img :src="downloadType==3?$BASE_IMG_URL( '/android_checked.png'):$BASE_IMG_URL( '/android_unchecked.png')">
                <div :style="{'color':downloadType==3?'green':'#9a9595'}">安卓用户</div>
            </div>
        </div>
    </div>

    <div  v-if="status==1" class="download-type-wrap-div">
        <header>{{headerTitle}}</header>
        <div>
            <input class="mail-input" v-model="memberMail" placeholder="请输入邮箱地址">
            <button @click="sendMail" >&nbsp;&nbsp;&nbsp;发送</button>
        </div>
    </div>
    <div  v-if="status==2" class="download-type-wrap-div">
        <div>
            <img class="sendSuccess-img" src="https://langjie.oss-cn-hangzhou.aliyuncs.com/space/root/project/ruyunsuixing/img/mail_send_success.png"/>
            <div class="sendSuccess-text">发送成功,请前往邮箱下载</div>
        </div>
    </div>`;


const DOWNLOAD_TYPE={
    NONE:0,
    MAIL:1,
    IOS:2,
    ANDROID:3
}
export default  {
    template,
    name: 'DownLoadBottomDialog',
    props: {

    },
    data() {
        return {
            //0:下载方式;1:确认邮箱 2:rgba发送成功
            status: 0,
            //0:无;1:邮箱 2:ios; 3:android
            downloadType:DOWNLOAD_TYPE.NONE,
            //会员邮箱
            memberMail:""
        }
    },
    methods:{
        changeDownType(downloadType){
            this.downloadType=downloadType;
            if(this.downloadType==1){
                this.status=1;
                return;
            }

            this.$parent.downLoadCallBack(this.downloadType,this.memberMail);
        },
        sendMail(){
             if(this.memberMail){
                 let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
                 if(!reg.test(this.memberMail)) {
                     alert("邮箱不合法")
                     return;
                 }
                 this.$parent.downLoadCallBack(this.downloadType,this.memberMail);
             }
            this.status=2;

        }
    },
    computed:{
        headerTitle(){
            if(this.status==0){
                return "请选择下载方式"
            }
            if(this.status==1){
                return "请确认邮箱地址"
            }
        }
    },
    mounted(){
        // console.log("AAA",this.$BASE_IMG_URL,"CC")
    },
}