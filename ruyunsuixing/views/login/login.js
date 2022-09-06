
const template=`<iframe 
                key='loginIframe'
                title='loginIframe'
                style='width: 100%;height: 420px;border: none; marginTop: 112px' 
                :src='src'
            frameBorder="0" />`;





export default {
        name: "login",
        template,
        data() {
            return {
                    src:""
            }
        },
        methods: {},
        computed: {},
        async mounted() {
            const {redirect_uri,...queryparams } =  M.urlParse(location.href)
            let queryUrl= M.urlStringify(queryparams);
           this.src='https://open.weixin.qq.com/connect/qrconnect?appid='+M.config.wxLoginAppid+'&redirect_uri=' + encodeURIComponent( M.config.wxCallBackUrl+ '/ruyunsuixing/index.html#/checklogin?redirectUrl=' + redirect_uri+ '&'+queryUrl) + '&response_type=code&scope=snsapi_login#wechat_redirect'
        }
    }


