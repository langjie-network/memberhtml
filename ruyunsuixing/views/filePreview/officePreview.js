const template=`
<div v-if="fileUrl!=''" :style="{'marginTop':iframeMarginTop}">
     <iframe style="width: 100%;height: 200vw"
    :src="officePreviewServer(0,fileUrl)" id="iframe"></iframe>
</div>
`;


export default {
    template,
    name:"jsonPreview",
    data() {
        return {
            fileUrl:"",
            iframeMarginTop:"0vw",
        }
    },
    methods:{
        officePreviewServer(serverType,fileUrl){
            if(serverType==0){
               return MIO.yongZhongOfficePreviewGetFileUrl(fileUrl)
            }
            if(serverType==1){
               return  "https://view.officeapps.live.com/op/view.aspx?src="+ encodeURIComponent(fileUrl)
            }
            if(serverType==2){
               return "https://view.xdocin.com/view?src="+encodeURIComponent(fileUrl);
            }
            if(serverType==3){
                return "https://ming-bucket-01.oss-cn-beijing.aliyuncs.com/datasheet/math/%E7%94%B5%E6%9E%A2%E5%85%AC%E5%BC%8F.pdf";
            }
        }
    },
    async mounted() {
        let file_url=this.$route.query.file_url;
        if(!file_url.startsWith("http")){
            this.fileUrl=M.config.baseUrl(file_url);
        }
        if(file_url.endsWith("pdf")){
            this.iframeMarginTop="0vw";
        }

    }
}


