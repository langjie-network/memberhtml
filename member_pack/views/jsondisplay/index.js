importStyle("router-page-index", "/memberhtml/member_pack/views/jsondisplay/index.css");

const template=`
<div>
    <div id="wrap">
        <pre>
            {{jsonContent}}
        </pre>
</div>
    <div id="btn">
        <a href="javascript:;" class="weui-btn weui-btn_warn" onclick="delFile();">删除</a>
    </div>
</div>



`
export default {
        template,
        name: "tab",
        data() {
            return {
                jsonContent:""
            }
        },
        methods: {},
        computed: {},
       async mounted() {
            let file_url=this.$route.params.file_url;
            let r=await M.request.get(file_url);
            let jsonContent= JSON.stringify(r, null, 4)
            this.jsonContent=jsonContent;
       },
}


