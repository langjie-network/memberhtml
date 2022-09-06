const template=`
<div v-if="fileUrl!=''">
      <iframe :src="fileUrl" style="width: 100vw;height: 100vh">
</div>
`;


export default {
    template,
    name:"textPreview",
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
        this.fileUrl=M.config.baseUrl(file_url);
    }
}


