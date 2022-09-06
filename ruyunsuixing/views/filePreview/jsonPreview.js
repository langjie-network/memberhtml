const template=`
<div v-if="fileUrl!=''">
    <iframe style="width: 100%;height: 200vw"
    :src="fileUrl" id="iframe"></iframe>
</div>
`;


export default {
    template,
    name:"jsonPreview",
    data() {
        return {
            fileUrl:""
        }
    },
    methods:{

    },
    computed:{

    },
    async mounted() {
         let file_url=this.$route.query.file_url;
          file_url=encodeURIComponent(file_url);
         let  fileUrl =M.config.baseUrl(file_url);
         fileUrl="/ruyunsuixing/views/filePreview/jsonPreview.html?fileUrl="+fileUrl
         this.fileUrl=fileUrl;

    }
}


