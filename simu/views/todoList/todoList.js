M.loadCss("/memberhtml/simu/views/todoList/todoList.css")

const template=`
   <div >
     
             AAAAAAAAAAAAAAAAA
   <div>
   
`;

export default  {
    name:"filechat",
    template,
    props: {
        root_file_id: String,
    },
    data() {
        return {
            sendBtnVisable:false,
            inputValue:"",
            rootFileChatMsgList: [
            ]
        }
    },
    methods:{

        async send(){

        }
    },
    computed:{

    },
     watch:{
        inputValue(newVal){
           if(newVal.length>0){
                this.sendBtnVisable=true;
           }else {
               this.sendBtnVisable=false;
           }

        }
    },
    async mounted() {


    }
}