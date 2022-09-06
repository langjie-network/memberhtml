const template=`
<div>
   首页
</div>
`;


export default {
    template,
    name:"index",
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

    },
    computed:{

    },
    async mounted() {

    }
}


