M.loadCss("/memberhtml/product/views/index/index.css")

const template=`
<div class="showImg" >

    <img  @mouseover="changeInterval(true)" 
         @mouseleave="changeInterval(false)"  
         v-for="(item) in imgArr" 
         :key="item.id"
         :src="item.url" 
         alt="暂无图片" 
         v-show="item.id===currentIndex" 
         >

    <div  @click="clickIcon('up')"   class="iconDiv icon-left"> 
        <i class="el-icon-caret-left"></i>
    </div>

    <div  @click="clickIcon('down')"  class="iconDiv icon-right">
        <i class="el-icon-caret-right"></i>
    </div>
 
    <div class="banner-circle">
        <ul>
            <li @click="changeImg(item.id)" 
                v-for="(item) in imgArr" 
                :key="item.id"
                :class="item.id===currentIndex? 'active': '' "
             ></li>
        </ul>
    </div>
</div>

`;


export default {
    template,
    name:"index",
    data(){
        return {
            currentIndex :0,//当前所在图片下标
            timer:null,//定时轮询
            imgArr:[
                {	id:0,
                    url:"https://6d69-minglie-31e331-1302367385.tcb.qcloud.la/h/%E7%8E%8B%E8%8E%B9%E4%B8%BD.jpg",
                },{
                    id:1,
                    url:"https://langjie.oss-cn-hangzhou.aliyuncs.com/static/tiger_guess/avatar/oxIzxsqjvRcWGTAYpuxc436-kKHs.jpg",
                },{
                    id:2,
                    url:"https://langjie.oss-cn-hangzhou.aliyuncs.com/static/tiger_guess/avatar/oxIzxsptFj2nXxym324gF7zlBDqE.jpg",
                },{
                    id:3,
                    url:"https://langjie.oss-cn-hangzhou.aliyuncs.com/static/tiger_guess/avatar/oxIzxsoiNWnHUElkc3gRFtIfRpVw.jpg",
                },
            ]
        }
    },
    methods:{
        //开启定时器
        startInterval(){
            // 事件里定时器应该先清除在设置，防止多次点击直接生成多个定时器
            clearInterval(this.timer);
            this.timer = setInterval(()=>{
                this.currentIndex++;
                if(this.currentIndex > this.imgArr.length-1){
                    this.currentIndex = 0
                }
            },3000)
        },
        // 点击左右箭头
        clickIcon(val){
            if(val==='down'){
                this.currentIndex++;
                if(this.currentIndex===this.imgArr.length){
                    this.currentIndex = 0;
                }
            }else{
                /* 第一种写法
                this.currentIndex--;
                if(this.currentIndex < 0){
                    this.currentIndex = this.imgArr.length-1;
                } */
                // 第二种写法
                if(this.currentIndex === 0){
                    this.currentIndex = this.imgArr.length;
                }
                this.currentIndex--;
            }
        },
        // 点击控制圆点
        changeImg(index){
            this.currentIndex = index
        },
        //鼠标移入移出控制
        changeInterval(val){
            if(val){
                clearInterval(this.timer)
            }else{
                this.startInterval()
            }
        }
    },

    computed:{

    },
    async mounted() {
        this.startInterval()
    }
}


