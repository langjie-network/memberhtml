
const template=`<div></div>`;



export default {
        name: "checklogin",
        template,
        data() {
            return {

            }
        },
        methods: {
            async loginCallBack(result,redirectUrl,queryUrl){
                const data = {
                    lj_token: result.data.lj_token,
                    endDate: result.data.endDate,
                    unionid: result.data.unionid,
                };
                sessionStorage.setItem('lj_token', JSON.stringify(data));
                M.setUserInfo({unionid:data.unionid});
                MIO.fetchMemberInfo({unionid:data.unionid}).then(d=>{
                   // console.log("redirectUrl",redirectUrl,d)
                    if(d.code==200){
                        window.location.href=`/ruyunsuixing/index.html#${redirectUrl}?${queryUrl}`
                        return;
                    }

                });

            }

        },
        computed: {},
        async mounted() {
            const {redirectUrl,...queryparams } =  M.urlParse(location.href)
            let queryUrl= M.urlStringify(queryparams);

            const code=M.getParameter("code");
            let r= await MIO.checkWxCode(code);
            this.loginCallBack(r,redirectUrl,queryUrl);
        }


    }


