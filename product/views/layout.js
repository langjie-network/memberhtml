
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
        M.gp.$router.push(M.userInfo.router_page)
    }
}
