
if(M.isPc){
    importStyle("AppHeader","./component/AppHeader/AppHeaderPc.css");
}else {
    importStyle("AppHeader","./component/AppHeader/AppHeader.css");
}



const template=`
    <header class="header-wrap">
        <div class="left-menu-wrap" @click="changLeftMenuStatus">
            <img :class="$gloable_state.header.leftIcon=='back'?'left-back-img':'left-menu-img'">
            <span v-if="$gloable_state.header.leftIcon=='back'" style="color: white;">{{isPc?'':'返回'}}</span>
        </div>
        <span class="header-wrap__title">{{$gloable_state.header.title}}</span>
        <div class="avatar" @click="showBtn">
            <img :src="$gloable_state.userInfo.avatar">
            <div v-if="visableBtn">
                  <button @click="clickBtn">{{$gloable_state.userInfo.unionid?'退出':'登陆'}}</button>
            </div>
        </div>
    </header>
`;



export default {
    template,
    name: 'AppHeader',
    props: {},
    data() {
        return {
            isWeiXin:M.isWeiXin,
            isPc:M.isPc,
            visableBtn: false,
        }
    },
    methods:{
        changLeftMenuStatus(){
            // if(this.isPc){
            //     return;
            // }
            if(this.$gloable_state.header.leftIcon=="back"){
                if(window.history.length>1){
                    if(M.getParameter("code")){
                        location.href="/member/ruyunsuixing"
                    }else if(M.gloable_state.isLookRootFileList) {
                        this.$router.back();
                    }else {
                        location.href="/member/ruyunsuixing"
                    }
                }else {
                    location.href="/member/ruyunsuixing"
                }
                return;
            }
            vueApp.config.globalProperties.$gloable_state.visableLeftMenu=!vueApp.config.globalProperties.$gloable_state.visableLeftMenu
            if(vueApp.config.globalProperties.$gloable_state.visableLeftMenu){
                vueApp.config.globalProperties.$gloable_state.showCoverMask=true;
            }else {
                vueApp.config.globalProperties.$gloable_state.showCoverMask=false;
            }
        },
        showBtn(){
            if(this.isPc && this.isWeiXin){
                this.visableBtn=!this.visableBtn;
            }
        },
        clickBtn(){
            setTimeout(  ()=>  {
                    this.visableBtn=false;
                     MIO.signOut();
                    // if(this.$gloable_state.userInfo.unionid){
                    //      MIO.signOut();
                    // }
              }
            )
        },

    },
    mounted() {
      // console.log(M.gloable_state)
    },

}