const template=`
    <div>
      
    </div>
`;

export default {
    template,
    name:"gallery",
    data() {
        return {
            gallery_id:null
        }
    },
    methods:{

    },
    computed:{

    },
    async mounted() {
        MIO.wxConfig({
            readyCallBack:()=>{
                wx.previewImage({
                    current:"https://langjie.oss-cn-hangzhou.aliyuncs.com/space/root/project/ruyunsuixing/img/guangpan.png",
                    urls:["https://langjie.oss-cn-hangzhou.aliyuncs.com/space/root/project/ruyunsuixing/img/guangpan.png","" +
                    "https://langjie.oss-cn-hangzhou.aliyuncs.com/space/root/project/ruyunsuixing/img/yello_wujiaoxing.png"],
                });
            }})
    }
}


