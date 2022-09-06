
const template=`
<div v-cloak>
           <router-view ></router-view> 
</div>`;



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
