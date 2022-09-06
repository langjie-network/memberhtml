
const {WebComponent} =MingRouter;

class MingInput extends WebComponent {

    constructor(props) {
        super(props);
        window.t=this;
    }


    state = {
        selectData:"普通",
        value:"",
        selectColor:"black"
    }


    send(){
        let value= this.shadowRoot.querySelector('#tanmuInputId').value;
        this.state.value=value;
        let selectData= this.state.selectData;
        let selecColor= this.state.selectColor;
        eval(`${this.props.onsend}({selectData,selecColor,value})`);
        //this.shadowRoot.querySelector('#tanmuInputId').value="";
        //this.hide();
    }

    btnClick(v){
        this.setState({
                "selectData":v,
                value:this.shadowRoot.querySelector('#tanmuInputId').value},
            ()=>{
                this.shadowRoot.querySelectorAll("button").forEach(u=>{
                    if(u.innerText=="发送"){
                        return;
                    }
                    else {
                        if(u.innerText==v){
                            this.state.selectColor=MingInput.colorMap[u.innerText];
                            t.shadowRoot.querySelector("."+u.className).className="sel"
                        }
                    }
                })
            })

    }



    componentDidMount() {


    }

    show(){
        $("ming-input").show();
        this.setState({
            value:""
        });
        this.shadowRoot.querySelector("#tanmuInputId").focus();
    }

    hide(){
        //console.log(this.htmlElement)
        let rootWrap= this.shadowRoot.querySelector("#minginputId");
        window.t1=rootWrap;
        let count=30;
        MingInput.timer= setInterval(()=>{
            // console.log(count)
            count=count+30;
            rootWrap.style.top= count+"vh";
            if(count>100){
                rootWrap.style.top= count+"vh";
                clearInterval(MingInput.timer);
                rootWrap.style.top= 30+"vh";
                $("ming-input").hide();
            }
        },50);

    }

    render() {
        return `<style>
    #tanmuInputId{
        width: 60vw;
        height: 10vw;
        border-radius: 6vw;
        border: rgb(32,32,32);
        margin-left: 10vw;
        background-color: rgb(44,44,44);
        color: white;
        outline: none;
        text-indent:2vw;
    }

    #tanmuInputId::-webkit-input-placeholder { /* WebKit browsers */
        color: rgb(136,134,148);
        font-size: 16px;
    }

    .button_title{
        color: white;
        font-size: 4vw;
        text-indent:4vw;
    }

    #minginputId{
        display: block;
        background: rgb(32,32,32);
        width: 100vw;
        height: 100vh;
        top:30vh;
        left: 0vw;
        position: absolute;
    }

    .tanmuInputDiv  button{
        height: 10vw;
        width: 20vw;
        border-radius: 10vw;
        color: white;
        background: rgb(133,132,148);
        margin-left: 2vw;
        margin-top: 5vw;
    }



    .tanmuInputDiv .btn_kujin{
        color: white;
        background: linear-gradient(
                to right,
                #F76B1C,
                #FAD961);
    }

    .tanmuInputDiv .btn_xuancai{
        color: white;
        background: linear-gradient(
                to right,
                #FF5ACC,
                #FAD961);
    }

    .tanmuInputDiv .btn_xingdong{
        color: white;
        background: linear-gradient(
                to right,
                #FF2525,
                #ffe53b);
    }


    .tanmuInputDiv .btn_tangsancai{
        color: blue;
        border: blue 1px solid;
        background-color: rgb(32,32,32);
    }
    .tanmuInputDiv .btn_xiaowufen{
        color: pink;
        border: pink 1px solid;
        background-color: rgb(32,32,32);
    }
    .tanmuInputDiv .btn_cheng{
        color: orange;
        border: orange 1px solid;
        background-color: rgb(32,32,32);
    }
    .tanmuInputDiv .btn_hong{
        color: red;
        border: red 1px solid;
        background-color: rgb(32,32,32);
    }
    .tanmuInputDiv .btn_zi{
        color: purple;
        border: purple 1px solid;
        background-color: rgb(32,32,32);
    }
    .tanmuInputDiv .btn_lv{
        color: green;
        border: green 1px solid;
        background-color: rgb(32,32,32);
    }

    .sel{
        font-size: 2vw;
        border: red 4px solid ;
    }
    .huixuanbtnDiv{
        margin-top: 10vw;
    }
    .tanmucolorDiv{
        margin-top: 10vw;
    }

</style>

 

<div id="minginputId" class="tanmuInputDiv">
    <input id="tanmuInputId" value="${this.state.value}" placeholder="炫彩颜色,让你的弹幕脱颖而出">
    <button onclick="${this.selfName}.send()">发送</button>
    <div class="huixuanbtnDiv">
        <div class="button_title">会员尊享弹幕颜色特权</div>
        <button id="kujinId" onclick="${this.selfName}.btnClick('酷金')" class="btn_kujin">酷金</button>
        <button onclick="${this.selfName}.btnClick('炫彩')"  class="btn_xuancai">炫彩</button>
        <button onclick="${this.selfName}.btnClick('星动')"  class="btn_xingdong">星动 </button>
    </div>
    <div class="tanmucolorDiv">
        <div class="button_title">弹幕颜色</div>
        <button onclick="${this.selfName}.btnClick('唐三蓝')"  class="btn_tangsancai">唐三蓝</button>
        <button onclick="${this.selfName}.btnClick('小舞粉')"  class="btn_xiaowufen">小舞粉</button>
        <button onclick="${this.selfName}.btnClick('橙')"  class="btn_cheng">橙</button>
        <button onclick="${this.selfName}.btnClick('红')"  class="btn_hong">红</button>
        <button onclick="${this.selfName}.btnClick('紫')"  class="btn_zi">紫</button>
        <button onclick="${this.selfName}.btnClick('绿')"  class="btn_lv">绿</button>
    </div>
</div>`;
    }
}

MingInput.colorMap={
    "蓝":"blue",
    "粉":"pink",
    "橙":"orange",
    "红":"red",
    "紫":"purple",
    "绿":"green"
}



export default MingInput;
