// 拷贝元宝券二维码

const template = `
<div>
    <div>
        <header v-if="isclickQrCodeImg==false" style="text-align: center;font-size: 6vw">{{getHeaderTitle()}}</header>
        <div>
             <div style="text-align: center;margin-top: 1vw">
                    <img :style="{height:isclickQrCodeImg?'150vw':'40vw',margin: 'auto'}"
                         @click="clickQrCodeImg"
                         :src="qrCodeImg">
                </div>
                <div id="form">
                    <div v-if="false" class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">名称</label></div>
                        <div class="weui-cell__bd"><input class="weui-input" maxlength="18"
                                                          :disabled="formDisable"
                                                          notmatchtips="请输入正确的身份证号码" pattern="REG_IDNUM"
                                                          placeholder="请输入名称"
                                                          required=""
                                                          name="name"
                                                          type="text"/></div>
                    </div>
                    
                   <div class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">券标签</label></div>
                        <div class="weui-cell__bd">
                              <select name="yb_voucher_tag"  :disabled="formDisable"   >
                                 <template v-for="(item,i) in  $common._globle_cacheMap.vipRegistYbVoucherTagList"  >
                                     <option :value="item.userCode">{{item.name}}</option>
                                </template>
                            </select>
                        </div>
                    </div>
                    
                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">公司</label></div>
                        <div class="weui-cell__bd"><input class="weui-input"
                                                          :disabled="formDisable"
                                                          name="company"
                                                          maxlength="18"
                                                          :oninput="companyChange"
                                                          notmatchtips="请输入正确的公司"
                                                          pattern="REG_IDNUM" placeholder="请输入公司"
                                                          required=""
                                                          type="text"/>
                            <div v-if="companyNameListVisable" class="weui-cells searchbar-result" id="searchCompanyResult">
                                  <template v-for="(item,i) in companyNameList">
                                       <div class="weui-cell weui-cell_access" @click="selectCompany(item)">
                                            <div class="weui-cell__bd weui-cell_primary">
                                                <p>{{item}}</p>
                                            </div>
                                        </div>
                                 </template>
                            </div>
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">姓名</label></div>
                        <div class="weui-cell__bd"><input class="weui-input" maxlength="18"
                                                          pattern="REG_IDNUM"
                                                          :disabled="formDisable"
                                                          placeholder="请输入姓名"
                                                          name="member_name"
                                                          :oninput="memberNameChange"
                                                          @click="cleanMemberNameVisable"
                                                          required=""
                                                          type="text"/>
                            <div v-if="memberSearchMemberByCompanyMapKeysVisable" class="weui-cells" id="searchMemberNameResult">
                                  <template v-for="(item,i) in memberSearchMemberByCompanyMapKeysDis">
                                       <div class="weui-cell weui-cell_access" @click="selectMemberName(item)">
                                            <div class="weui-cell__bd weui-cell_primary">
                                                <p>{{item}}</p>
                                            </div>
                                        </div>
                                 </template>
                            </div> 
                                                          
                        </div>
                                                           
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">手机</label></div>
                        <div class="weui-cell__bd"><input class="weui-input" maxlength="18"
                                                          pattern="REG_IDNUM"
                                                          :disabled="formDisable"                         
                                                          placeholder="请输入手机"
                                                          name="member_phone"
                                                          required=""
                                                          type="text"></div>
                    </div>
                    
                     <div class="weui-cell">
                            <div class="weui-cell__hd"><label class="weui-label">地址</label></div>
                            <div class="weui-cell__bd"><input class="weui-input" maxlength="18"
                                                              pattern="REG_IDNUM"
                                                              :disabled="formDisable"                         
                                                              placeholder="请输入地址"
                                                              name="member_addr"
                                                              required=""
                                                              type="text"></div>
                        </div>
                    
                    
                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">元宝分</label></div>
                        <div class="weui-cell__bd"><input class="weui-input" maxlength="18"
                                                  disabled="disabled"
                                                  notmatchtips="请输入正确的身份证号码" pattern="REG_IDNUM"
                                                  placeholder="请输入名称"
                                                  required=""
                                                  name="yb_score"
                                                  type="text"/></div>
                    </div>
                    <div style="display: flex;width: 100vw;justify-content: space-around;margin-top: 2vw">
                         <div>
                            <a  :class="generateQrcodeBtnClass" style="width: 30vw" href="javascript:"><i v-if="recognizeBusinessCard_btn_loading==true" class="weui-loading"></i>
                                <span v-if="recognizeBusinessCard_btn_loading!=true">选名片</span> 
                                <input id="uploaderInput" @change="selectCard"  class="weui-uploader__input" type="file" accept="image/*">
                            </a>
                        </div>
                        
                         <div>
                            <a  :class="generateQrcodeBtnClass" style="width: 30vw" @click="generateQrcode" href="javascript:">
                            <i v-if="btn_loading==true" class="weui-loading"></i>
                                <span v-if="btn_loading!=true">生成卡</span> 
                            </a>
                        </div>
                        <div>
                            <a :class="submitBtnClass"  style="width: 30vw"  @click="formSubmit"  href="javascript:">领取</a>
                        </div>
                    </div>
                </div>
            
        </div>

    </div>
</div>

`

var timer;

export default {
    template,
    name: "ybVouchertQrCode",
    data() {
        return {
            isclickQrCodeImg:false,
            qrCodeImg:"https://langjie.oss-cn-hangzhou.aliyuncs.com/space/root/qrcode/yb_voucher/mobile-preview1.png",
            ybVouchert: {},
            formDisable:false,
            btn_loading:false,
            recognizeBusinessCard_btn_loading:false,
            companyNameList:[],
            companyNameListVisable:false,
            memberSearchMemberByCompanyMap:{},
            memberSearchMemberByCompanyMapKeys:[],
            memberSearchMemberByCompanyMapKeysDis:[],
            memberSearchMemberByCompanyMapKeysVisable:false,
        }
    },
    methods: {
        async selectCard(event){
            let that=this;
            this.recognizeBusinessCard_btn_loading=true;
            var formdata = new FormData();
            formdata.append("file", event.target.files[0], "d2.jpg");
            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };
            fetch( M.config.baseUrlCrmHelp("/open/crmhelp/aliocr/recognizeBusinessCardRequest"), requestOptions)
                .then(response => response.json())
                .then(result => {
                        if(result.code!=0){
                            api.toast({msg:result.msg})
                            console.log('error', result)
                            this.recognizeBusinessCard_btn_loading=false;
                            return;
                        }else{
                            let cardInfo= result.data.data;
                            that.ybVouchert.member_name=cardInfo.name;
                            that.ybVouchert.member_addr= cardInfo.addresses.length? cardInfo.addresses[0]:"";
                            that.ybVouchert.company=cardInfo.companies.length? cardInfo.companies[0]:"";
                            that.ybVouchert.member_phone=cardInfo.cellPhoneNumbers.length?cardInfo.cellPhoneNumbers[0]:""
                            if(that.ybVouchert.member_phone==""){
                                that.ybVouchert.member_phone=cardInfo.officePhoneNumbers.length?cardInfo.officePhoneNumbers[0]:""
                            }
                            that.setFormData( that.ybVouchert) ;
                            that.recognizeBusinessCard_btn_loading=false;
                        }
              }).catch(e=>{
                api.toast({msg:e.toString()})
                this.recognizeBusinessCard_btn_loading=false;
            })

        },
        cleanMemberNameVisable(){
            this.memberSearchMemberByCompanyMapKeysVisable=false;
            this.companyNameListVisable=false;
        },
        async selectMemberName(memberName){
            $('input[name=member_name]').val(memberName);
            this.memberSearchMemberByCompanyMapKeysVisable=false;
            if(memberName){
                let phone=  this.memberSearchMemberByCompanyMap[memberName]
                $('input[name=member_phone]').val(phone);
             }
        },
        async selectCompany(company){
            $('input[name=company]').val(company);
            this.companyNameListVisable=false;
            if(company){
                this.memberSearchMemberByCompanyMap= await MIO.homeMemberSearchMemberByCompanyMap(company);
                this.memberSearchMemberByCompanyMapKeys=Object.keys(M.Component.ybVouchertQrCode.memberSearchMemberByCompanyMap);
            }
        },
         getHeaderTitle(){
            let title=  this.$common.getYbVoucherState(this.ybVouchert.state)+"("+this.ybVouchert.id+")";
            return title;
        },
        async vipRegistYbVoucherClaimed() {
            let r = await MIO.vipRegistYbVoucherClaimed({
                id: this.ybVouchert.id
            })
            if (r.code == 200) {
                this.$router.back();
            }
        },
        memberNameChange(){
            var v = $('input[name=member_name]').val();
            this.memberSearchMemberByCompanyMapKeysDis=this.memberSearchMemberByCompanyMapKeys.filter(u=>u.indexOf(v)>-1)
            this.memberSearchMemberByCompanyMapKeysVisable=true;
        },
        companyChange() {
            this.memberSearchMemberByCompanyMapKeysVisable=false;
            var v = $('input[name=company]').val();
            clearTimeout(timer);
            const that = this;
            timer = setTimeout(async function () {
                if (!v) return;
                // 搜索相关认证公司
                let result = await M.request.get("/member_ajax/searchCompany", {keywords: v});
                that.companyNameList=result.data.map(u=>{
                    return u.company;
                });
                that.companyNameListVisable=true;
            }, 500);
        },

        getFormData(){
            let name= $('input[name=name]').val();
            let company= $('input[name=company]').val();
            let yb_score=   $('input[name=yb_score]').val();
            let member_name=  $("input[name='member_name']").val();
            let member_phone=  $("input[name='member_phone']").val();
            let member_addr=  $("input[name='member_addr']").val();
            let yb_voucher_tag=  $("select[name='yb_voucher_tag']").val();
             return {
                 name,
                 company,
                 yb_score,
                 member_phone,
                 member_name,
                 yb_voucher_tag,
                 member_addr
             }
        },
        setFormData(formData){
            const {yb_score,member_addr, name,company,member_name,member_phone,yb_voucher_tag}=formData;
             $('input[name=yb_score]').val(yb_score);
            $('input[name=name]').val(name);
            $('input[name=company]').val(company);
            $('input[name=member_addr]').val(member_addr);
            $('input[name=member_name]').val(member_name);
            $('input[name=member_phone]').val(member_phone);
            $('select[name=yb_voucher_tag]').val(yb_voucher_tag);

        },
       async generateQrcode(){
             if(this.formDisable){
                 return
             }
             let formatData=  this.getFormData();
            // alert(JSON.stringify(formatData))
            if( formatData.company
                && formatData.member_name
                && formatData.member_phone
                && formatData.yb_score
                && formatData.yb_voucher_tag
            ){

             this.btn_loading=true;
             let result=  await MIO.crmhelpVipRegistYbVoucherSysncRegistYbVoucherQrCode({
                   id: this.ybVouchert.id,
                   ybScore:formatData.yb_score,
                   company:formatData.company,
                   memberName:formatData.member_name,
                   ybVoucherTag: formatData.yb_voucher_tag
                });
                if(result.code==0){
                    this.qrCodeImg=result.data+"?t="+new Date().getTime();
                }
            }else {
                api.toast({msg:"请先填写完整表单"})
            }
           this.btn_loading=false;
        },
        async formSubmit(){
             if(this.qrCodeImg=="https://langjie.oss-cn-hangzhou.aliyuncs.com/space/root/qrcode/yb_voucher/mobile-preview1.png"){
                 api.toast({msg:"请先生成二维码"});
                 return
             }
            let {
                name,
                company,
                yb_score,
                member_phone,
                member_name,
                member_addr,
                yb_voucher_tag
            }=  this.getFormData();
            if(!/^1\d{10}( 1\d{10})*$/.test( member_phone)) {
                api.toast({msg:"手机号格式错误"});
                return
            }
            if(company==null || company.trim()=="") {
                api.toast({msg:"公司为空"});
                return
            }
            if(member_name==null || member_name.trim()=="") {
                api.toast({msg:"名字为空"});
                return
            }
           let r=  await MIO.vipRegistYbVoucheCheckAndAddCompany({company:company});
            if(r==null){
                api.toast({msg:"未知错误"});
                return
            }
            if(r.code!=200){
                api.toast({msg:r.msg});
                return
            }
            r=await  await MIO.vipRegistYbVoucherUpdate( {
                name,
                yb_score,
                company,
                member_name,
                member_phone,
                member_addr,
                id:this.ybVouchert.id,
                yb_voucher_img_url:this.qrCodeImg,
                yb_voucher_tag
            });
            if(r.code==200){
                api.toast({msg:"领取成功"});
                setTimeout(()=>{
                    this.$router.back();
                },500)
            }else {
                api.toast({msg:r.msg});
            }
        },
        //form输入完整
        isFormInputOk(){
            let formInputOk=false;
            let formatData=this.getFormData();
            if(formatData.name
                && formatData.company
                && formatData.member_name
                && formatData.member_phone
                && formatData.yb_score){
                formInputOk=true;
            }
            return formInputOk;
        },
        clickQrCodeImg(){
            if(this.isclickQrCodeImg){
                this.isclickQrCodeImg=false;
            }else {
                this.isclickQrCodeImg=true;
            }
        }
    },

    async mounted() {
        $("input").click(function () {
            $("html,body").animate({scrollTop: document.documentElement.clientHeight},500);
        });
        M.Component.ybVouchertQrCode=this;
        if (!this.$route.params.item) {
            this.$router.push({path: "/",})
            return
        }
        let item = JSON.parse(this.$route.params.item);
        this.ybVouchert = item;

        if(item.state!="unclaimed"){
            this.formDisable=true;
        }
        if(item.yb_voucher_img_url){
            this.qrCodeImg=item.yb_voucher_img_url;
        }
        if(!this.ybVouchert.yb_voucher_tag){
            this.ybVouchert.yb_voucher_tag="会员注册券";
        }
        if(item.addr){
            this.ybVouchert.member_addr=item.addr;
        }
        if(item.yb_score){
            this.ybVouchert.yb_score=item.yb_score;
        }
        this.setFormData(this.ybVouchert);
    },

    computed:{
        //提交按钮样式
        submitBtnClass(){
            //let formatDataOk=this.isFormInputOk();
            if(this.formDisable){
                return "weui-btn weui-btn_primary weui-btn_disabled ming_disabled";
            }else {
                return "weui-btn weui-btn_primary";
            }
        },
        //生成二维码按钮样式
        generateQrcodeBtnClass(){
           // let formatDataOk=this.isFormInputOk();
            if(this.formDisable){
                return "weui-btn weui-btn_primary weui-btn_disabled ming_disabled";
            }else {
                    return "weui-btn weui-btn_primary";
            }
        },
        //选名片按钮
        selectCardBtnClass(){
            // let formatDataOk=this.isFormInputOk();
            if(this.formDisable){
                return "weui-btn weui-btn_primary weui-btn_disabled ming_disabled";
            }else {
                return "weui-btn weui-btn_primary";
            }
        }
    }
}
