
M.loadCss("/memberhtml/product/views/tablecardhome/tablecardhome.css")

//轮播图数据
app.get("/mingSwiPerGetImgList",(req,res)=>{
    let imgList=[
        "https://www.langjie.com/img//gallery/DynaTest.jpg",
        "https://langjie.oss-cn-hangzhou.aliyuncs.com/space/root/project/products/D901.jpg",
        "https://langjie.oss-cn-hangzhou.aliyuncs.com/space/root/project/products/D921.jpg"
    ]
    res.send(imgList);
});

const template=`
<div>
    <div style="height: 5vw">
        
    </div>
    <header >
              
                <ming-swiper >
                </ming-swiper>
        </div>
    </header>
        
   <div class="card_info">
      <div class="card_info-body">
             
            <ul>
         
                <li v-for="(val, key, index)  in getAllInfo()" :style="{backgroundColor: index%2==0? 'rgb(217,247,227)':'rgb(235,250,240)'}"  :class="'card_info_bottom_line'">
                          <template v-if="val.column_comment=='安装盘'">
                                <div>
                                    {{val.column_comment}}:
                                </div>
                                <div style="max-width: 65vw " v-html="getDiskLink()">
                                </div>
                          </template>
                           <template v-else-if="val.column_comment=='个例资源'">
                                <div>
                                 {{val.column_comment}}:
                                 </div> 
                                 <div style="max-width: 65vw ">
                                  {{val.val}} (共{{val.count}}个)
                                </div>
                          </template>
                             <template v-else-if="val.column_comment=='型号'">
                                <div>
                                 {{val.column_comment}}:
                                 </div> 
                                 <div style="max-width: 65vw ">
                                    <a href="#" @click.prevent="goModelPage()">{{productInfo.model.val}}</a>
                                </div>
                          </template>
                          <template v-else>
                                <div>
                                     {{val.column_comment}}:
                                 </div> 
                                  <div style="max-width: 50vw ">
                                      {{val.val}}
                                    </div> 
                           </template>
               
                </li>
            </ul>
       
        </div>
    </div>
  
    <div class="tail_btn">
        <a class="kaishishiyongbtn">开始使用</a>
    </div> 
    
</div>
`;

import FileManagerMap from "/memberhtml/product/public/js/db/file_manager_map.js"
export default {
    template,
    name:"virIndex",
    data() {
        return {
            productInfo: {
                serialNo:{
                    "column_comment": "序列号",
                    "val": " "
                },
                model: {
                    "column_comment": "型号",
                    "val": " "
                },
                authType:{
                    "column_comment": "规格",
                    "val": " "
                },
                release_date:{
                    "column_comment": "出厂日期",
                    "val": " "
                }
            },
            resourceInfo:{
                burnDisk:{
                    "column_comment": "安装盘",
                    "val": ``
                },
                burnDiskRemark:{
                    "column_comment": "定制",
                    "val": ""
                },
                userContentInstance:{
                    "column_comment": "个例资源",
                    "val": "0",
                    "count":0
                },
                actionCloud:{
                    "column_comment": "云测控",
                    "val": ""
                },
            }
         }
    },
    methods:{
        goModelPage(){
            if(FileManagerMap[this.productInfo.model.val]){
                location.href=FileManagerMap[this.productInfo.model.val];
            }
            return
        },
        getAllInfo(){
            let r1= Object.assign(this.productInfo,this.resourceInfo);
            return r1;
        },
        getDiskLink(){
            let diskName= this.resourceInfo.burnDisk.val;
            if(diskName.indexOf("代龙")>-1){
                return  diskName.replace("代龙",`<a  href="${FileManagerMap["dynaTest"]}" >MaxTest</a>`) ;
            }
            if(diskName.indexOf("MaxTest")>-1){
                return  diskName.replace("MaxTest",`<a  href="${FileManagerMap["MaxTest"]}" >MaxTest</a>`) ;
            }
            return diskName;
        }
    },
    async mounted() {

        let sn=window.M.userInfo.router_param;
        let productResult= await MIO.cardopenTablecardProductPubInfoBySn(sn);
        let productResourceResult=await MIO.cardopenTableProductPubResouceInfo(sn);
        if(!window.M.checkR(productResult)){
            M.gp.$common.myAlertToast(productResult.msg);
            return;
        }
        if(!window.M.checkR(productResourceResult)){
            M.gp.$common.myAlertToast(productResourceResult.msg);
            return;
        }
        let productData=productResult.data;
        let productResourceData=productResourceResult.data;

        this.productInfo={
            serialNo:{
                "column_comment": "序列号",
                "val": productData.serialNo
            },
            model: {
                "column_comment": "型号",
                "val": productData.model
            },
            authType:{
                "column_comment": "规格",
                "val":productData.authType
            },
            release_date:{
                "column_comment": "出厂日期",
                "val": new Date(productData.release_date).format("yyyy-MM-dd")
            }
        }
        this.resourceInfo={
            burnDisk:{
                "column_comment": "安装盘",
                 "val": productResourceData.burnDisk.diskName
            },
            burnDiskRemark:{
                "column_comment": "定制",
                 "val": productResourceData.burnDisk.remark
            },
            userContentInstance:{
                 "column_comment": "个例资源",
                 "val": productResourceData.userContentInstance.lastName,
                 "count":productResourceData.userContentInstance.count
            },
            actionCloud:{
                "column_comment": "云测控",
                 "val": "离线"
            },
        }
        M.gloable_state.header={
            title: productData.nick_name
        };
    }
}


