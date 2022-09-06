const template=`
<div v-if="fileUrl!=''">
      <img :src="fileUrl" style="width: 100vw">
</div>
`;


export default {
    template,
    name:"imgPreview",
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


