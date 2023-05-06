M.loadCss("/memberhtml/simu/views/s2s_skq/s2s_skq.css")

const template = `
<div v-cloak id="shoukongqi"
    @touchcancel="main_contol_wrap_touchend"
    @touchend="main_contol_wrap_touchend">
    
     <div class="online_div"  >
        <div class="online_div_zaixian">
             <div :style="{color: machineStatue=='在线'? 'green':'red'}"  class="mid">{{machineStatue}}</div> 
              <div @click="cleanMsg" class="mid">消息数{{msgList.length}}</div> 
        </div> 
    </div>
    <hr/>
    <div class="disTitle"  >
      <div class="input_wrap">
            <div>
              力
            </div>
            <input  v-model="loadValue"/>
      </div>
      <div  class="input_wrap">
            <div>
              位移
            </div>
            <input v-model="dispValue"/>
      </div>
      <div class="input_wrap">
            <div>
              变形
            </div>
            <input v-model="elongValue"/>
      </div>
    </div>
     <div style="height: 10vw">
     
    </div>
     <div class="btnZone"  >
         <div @click="AtsPushButton('stop')"> 
             <span   href="javascript:" role="button" class="btn1 weui-btn weui-btn_mini weui-btn_primary">停止</span>
       </div>  
        <div @click="AtsPushButton('pause')"> 
             <span  href="javascript:" role="button" class="btn2 weui-btn weui-btn_mini weui-btn_primary">暂停</span>
       </div>  
          <div @click="AtsPushButton('start')"> 
             <span href="javascript:" role="button" class="btn3 weui-btn weui-btn_mini weui-btn_primary">开始</>
        </div>  
        </div>   
      <div class="online_msg">
             <div   v-for="item in msgList" class="msg-item">
                     {{item.t}}:{{JSON.stringify(item.d)}}
              </div>
       </div>           
 </div>
    

 
`
export default {
    template,
    name: "s2s_skq",

    data() {
        return {
            machineStatue: "离线",
            dispValue: 0.000,
            elongValue: 0.000,
            loadValue: 0.000,
            msgList: [],
        }
    },
    methods: {
        async onlineCheck() {
            let r = await MIO.s2sCloudIsOnlineByUid({uid: M.userInfo.router_param});
            if (r) {
                this.machineStatue = "在线"
            } else {
                this.machineStatue = "离线"
            }
        },
        online_msg_dbclick() {
            if (this.isShowMsgList) {
                this.isShowMsgList = false
            } else {
                this.isShowMsgList = true
            }
        },
        async appendMsg(msg) {
            let itemMsg = {
                t: new Date().format("mm:ss:S"),
                d: msg
            }
            if (this.msgList.length > 50) {
                this.msgList.length = 49;
            }
            this.msgList = [itemMsg, ...this.msgList]

        },
        cleanMsg(){
            this.msgList=[]
        },
        async dealEventMsg(msg) {
            if (msg.method == "event.deviceState") {
                let deviceState = msg.params.device[0];
                this.dispValue = deviceState.disp;
                this.loadValue = deviceState.load?deviceState.load:0;
                this.elongValue = deviceState.elong?deviceState.elong:0;
            }
        },
        async dealSystemMsg(msg) {
            setTimeout(() => {
                this.onlineCheck();
            }, 1000)
        },
        async AtsPushButton(btnName) {
            if (navigator.vibrate) {
                navigator.vibrate(100);
            } else if (navigator.webkitVibrate) {
                navigator.webkitVibrate(100);
            }
            $(".activeImg").hide();
            $(`.${btnName}Img + svg`).show();
            MIO.s2sSocketEmitCall("pushBtn", btnName, 0);
        },
        main_contol_wrap_touchend() {
            $(".activeImg").hide();
            $(".defaultImg").show();
        }
    },
    async mounted() {
        document.title = M.userInfo.router_param;
        document.documentElement.style.overflow = 'auto';
        $(".activeImg").hide()
        $(".defaultImg").show()
        M.Component.simu_s2s_skq = this;
        if (M.userInfo != null) {
            this.onlineCheck();
            let clientId = M.userInfo.router_param + "." + M.userInfo.uid;
            let r = await M.request.post(M.config.s2scloudHost + "/api/s2scloud/applySocketio", {
                "clientId": clientId
            })
            await MIO.s2ssocketConnect(r.data, clientId);
        }
    },
    watch: {}
}


