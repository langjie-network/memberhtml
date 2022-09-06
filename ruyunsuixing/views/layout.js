
const noCheckPathArr=[
    "#/checklogin",
    "#/login",
    "#/burndiskDetail",
    "#/noticlientfileDetail",
    "#/jsonPreview1"
]


const template=`
            <div class="header">
               <AppHeader/>
            </div>
             <!--  页面的遮罩层-->

            <div v-if="$gloable_state.showCoverMask" class="g_coverMaskDiv" @click="clickGloableCoverMask"></div>
            <div v-if="$gloable_state.visableLeftMenu" class="layout-left-nav">
                <MingMenu />
           </div>
           <div>
            <p v-if="invalidRoute">404 is {{$route.path}}</p>
             <router-view ></router-view> 
</div>`



export default {
    template,
    methods:{
        clickGloableCoverMask(){
            vueApp.config.globalProperties.$gloable_state.showCoverMask=false;
            vueApp.config.globalProperties.$gloable_state.visableLeftMenu=false;
        }
    },
     data() {
        return {

        }
    },
    computed: {
        invalidRoute () {
            return !this.$route.matched || this.$route.matched.length === 0;
        }
    },
    activated(){

    },
    async mounted() {
        let locationHash =location.hash;
        if(!noCheckPathArr.includes(locationHash)){
            let userInfo=  M.getUserInfo();
            if(userInfo==null && M.isPc && !M.isWeiXin){
                let hashArr= location.hash.split("?")
                let query=hashArr.length==2?`?${hashArr[1]}`:"";
                const redictUrl="/ruyunsuixing/index.html#/login"+query;
                window.location.href=redictUrl;
                return;
            }
            if(M.isWeiXin){
                let unionid=await M.getParameter("unionid");
                if(userInfo==null ||  unionid!=userInfo.unionid){
                    if(unionid!=null){
                        M.setUserInfo({unionid})
                        await MIO.fetchMemberInfo({unionid});
                    }else if(userInfo==null){
                        if(!locationHash.startsWith("#/burndiskDetail")){
                            location.href="/member/ruyunsuixing";
                        }
                    }
                }
            }
        }
    }
}
