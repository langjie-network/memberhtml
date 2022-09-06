import UserContentList from "./component/UserContentList.js";
importStyle("router-page-index", "/memberhtml/member_pack/views/usercontent/index.css");

const template=`<div class="weui-tab" id="tab1">
    <div class="weui-navbar">
        <div class="weui-navbar__item">私有</div>
        <div class="weui-navbar__item">共享</div>
    </div>
   <div class="weui-tab__panel">
        <div class="weui-tab__content">
             <template   v-for="item in userContentTypeList" >
               <UserContentList isShare="0" :userContentType="item" :dataList="usercontentData[item]" />
             </template>
        </div>
        <div class="weui-tab__content">
             <template  v-for="item in userContentTypeList" >
                <UserContentList isShare="1" :userContentType="item" :dataList="usercontentShareData[item]" />
             </template>
        </div>
    </div>
</div>`;


export default {
    template,
    name: "usercontent",
    components:{
        UserContentList
    },
    data() {
        return {
            userContentTypeList: ['ini', 'ivt', 'ui', 'vtc', 'ats', 'mgt'],
            usercontentData:{},
            usercontentShareData:{}
        }
    },
    methods: {
        async fetch(){
            let usercontentData={};
            let usercontentShareData={};
            for (let i=0;i<this.userContentTypeList.length;i++){
                usercontentData[this.userContentTypeList[i]]=[];
                usercontentShareData[this.userContentTypeList[i]]=[];
            }
            let r= await MIO.crmhelpUserContentList({isShare:0});
            for (let i=0;i< r.dataList.length;i++){
                let item= r.dataList[i];
                switch (item.userContentType){
                    case "vtc": { usercontentData.vtc.push(item);break;}
                    case "ats": { usercontentData.ats.push(item);break;}
                    case "ini": { usercontentData.ini.push(item);break;}
                    case "mgt": { usercontentData.mgt.push(item);break;}
                }
            }
            let r1= await MIO.crmhelpUserContentList({isShare:1});
            for (let i=0;i< r1.dataList.length;i++){
                let item= r1.dataList[i];
                switch (item.userContentType){
                    case "vtc": { usercontentShareData.vtc.push(item);break;}
                    case "ats": { usercontentShareData.ats.push(item);break;}
                    case "ini": { usercontentShareData.ini.push(item);break;}
                    case "mgt": { usercontentShareData.mgt.push(item);break;}
                }
            }
            this.usercontentData=usercontentData;
            this.usercontentShareData=usercontentShareData;
        },
    },
    computed: {},
    async mounted() {
        this.fetch();
        weui.tab('#tab1',{
            defaultIndex: 0,
            onChange: function(index){
                //console.log(index);
            }
        });


    },
}


