
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
        let vipRegistYbVoucherTagList=await MIO.crmhelp_dictionary_list("vipRegistYbVoucherTag")
        this.$common._globle_cacheMap["vipRegistYbVoucherTagList"]=vipRegistYbVoucherTagList;
    }
}
