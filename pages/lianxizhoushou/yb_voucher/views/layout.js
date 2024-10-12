
const template=`
             <router-view ></router-view> 
</div>`



export default {
    template,
    methods:{
    },
     data() {
        return {
        }
    },
    computed: {
    },
    activated(){
    },
    async mounted() {
        let vipRegistYbVoucherTagList=[{"name":"会员注册券"}];
        this.$common._globle_cacheMap["vipRegistYbVoucherTagList"]=vipRegistYbVoucherTagList;
    }
}
