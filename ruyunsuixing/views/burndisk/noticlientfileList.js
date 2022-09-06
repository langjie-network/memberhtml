
importStyle("router-page-burndiskList","./views/burndisk/burndiskList.css");



const template=`
<div class="burndiskListPageDiv">
    <div class="burndiskList-search-wrap">
          <input placeholder="请输入刻盘编码或文件名">
          <img  src="https://langjie.oss-cn-hangzhou.aliyuncs.com/space/root/project/viphelp/fangdajing32.png"/>
    </div>
    <div class="burndiskList">
         <ul>
            <li v-for="(item,i) in burndiskList">
               <div>
                    <img class="burndiskListImg" src="https://langjie.oss-cn-hangzhou.aliyuncs.com/space/root/project/ruyunsuixing/img/guangpan.png"/>
                </div>
                <div class="burndiskInfo">
                     <p>
                       文件名:{{item.diskName}}
                    </p>
                     <p>
                      文件编码:{{item.diskCode}}
                    </p>
                     <p>
                      备注:aaa
                    </p>
                </div> 
                 <div @click="collectBurnDisk(item)">
                     <i v-if="item.collect==1" class="weui-icon-success weui-icon_msg"></i>
                     <i v-else class="weui-icon-circle weui-icon_msg"></i>
                </div>
 
            </li>
        </ul>
    </div>
    
</div>

</div>



`
export default  {
    name:"noticlientfile",
    template,
    data() {
        return {
            burndiskList: [
                {
                    "_id": "5fc98cf8856540274c5e9340",
                    "diskName": "MaxTest电子万能试验机安装包2",
                    "diskCode": "M00010C",
                    "collect":1
                }
            ]
        }
    },
    methods:{
        collectBurnDisk(item){
            if(item.collect==0){
                item.collect=1;
            }else {
                item.collect=0;
            }
            //console.log(e.targ)
        }

    },
    computed:{

    },
    async mounted() {

    }
}


