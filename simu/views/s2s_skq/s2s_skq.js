M.loadCss("/memberhtml/simu/views/s2s_skq/s2s_skq.css")
const template = `
<div v-cloak >
     <div class="online_div"  >
        <div class="online_div_zaixian">
              <div :style="{color:black}">序列号:{{snValue}}</div>
              <div :style="{color: machineStatue=='在线'? 'green':'red'}"  class="mid">状态:{{machineStatue}}</div> 
              <div @click="cleanMsg" class="mid">消息数:{{msgList.length}}</div> 
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
            snValue:0,
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
        async appendMsg(msg) {
            let itemMsg = {
                t: new Date().format("mm:ss:S"),
                d: msg.body
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
            if (msg.method == "deviceState") {
                let deviceState = msg.params.device[0];
                this.dispValue = deviceState.disp;
                this.loadValue = deviceState.load?deviceState.load:0;
                this.elongValue = deviceState.elong?deviceState.elong:0;
            }
        },
        async dealGramMsg(msg){
            let lastInx=msg.points.length-1;
            this.dispValue = msg.points[lastInx].disp;
            this.loadValue = msg.points[lastInx].load;
            this.elongValue = msg.points[lastInx].elong;
        },
        async dealSystemMsg(msg) {
            setTimeout(() => {
                this.onlineCheck();
            }, 1000)
        },
        async AtsPushButton(btnName) {
            MIO.s2sSocketEmitCall("PushAtsButton", btnName, 0);
        }
    },
    async mounted() {
        document.title = M.userInfo.router_param;
        document.documentElement.style.overflow = 'auto';
        M.Component.simu_s2s_skq = this;
        this.snValue=M.userInfo.router_param;
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


