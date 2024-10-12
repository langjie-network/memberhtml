//注册券列表

const template = `
<div>
    <div class="weui-tab" id="tab">
    <div class="weui-navbar" style="margin-bottom: 2vw">
        <div class="weui-navbar__item">待领取</div>
        <div class="weui-navbar__item">待扫码</div>
        <div class="weui-navbar__item">已完成</div>
    </div>
    <div class="aui-refresh-content">
             <div class="aui-content">
               <div class="aui-content aui-margin-b-15">
                <ul class="aui-list aui-media-list">
                    <li @click="ybVoucherDetail(item)" v-for="(item,i) in dataList" :key="id" class="aui-list-item aui-list-item-middle">
                         <div class="aui-list-item-inner aui-list-item-arrow"  style="display: flex">
                                            
                                             <div class="aui-list-item-text" style="display: block;text-align: left" >
                                                    <div>
                                                        {{item.id}}
                                                    </div>
                                                    <div > 
                                                           &nbsp;  &nbsp;
                                                     </div>
                                                     <div > 
                                                           &nbsp;  &nbsp;
                                                     </div>
                                                       <div > 
                                                           &nbsp;  &nbsp;
                                                     </div>
                                            </div>
                                             <div class="aui-list-item-text" style="display: block;text-align: center" >
                                                    <div>
                                                          {{item.yb_voucher_tag}}
                                                    </div>
                                                    <div>
                                                     {{item.company}}
                                                    </div>
                                                    <div > 
                                                           {{item.member_name}} 
                                                     </div>
                                                      <div>
                                                         {{item.yb_score}}分
                                                     </div>
                                            </div>
                                             <div class="aui-list-item-text" style="display: block;text-align: right" >
                                                    <div>
                                                         {{$common.getYbVoucherState(item.state)}}
                                                    </div>
                                                    <div > 
                                                           {{$common.formatDate(item.gmt_create,'yyyy-MM-dd')}}
                                                     </div>
                                                      <div>
                                                            {{$common.formatDate(item.gmt_create,'hh:mm:ss')}}
                                                     </div>
                                                       <div > 
                                                           &nbsp;  &nbsp;
                                                     </div>
                                            </div>
                                </div>
                            
                      
                    </li>
                </ul>
            </div>
        </div>
</div>
  

</div>  </div>
`;



export default {
    name: "ybVoucherList",
    template,
    data() {
        return {
            //默认选中待领取
            tabSelect:"待领取",
            //总数据
            totalDataList:[],
            //要显示的数据
            dataList:[]
        }
    },
    methods: {
        async fetchDataListByState(state){
            let  filter=JSON.stringify({
                state:state
            })
            let r=  await MIO.vipRegistYbVoucherList({
                page:1,
                num:60,
                filter
            });
            this.dataList= r.dataList;
        },
        ybVoucherDetail(item){
            const itemJsonStr=JSON.stringify(item);
            this.$router.push({
                name: "ybVouchertDetail",
                params:{item:itemJsonStr}});
        },
        renderCompany(item){
            if(item.company){
                return `${item.company}`
            }else {
                return "";
            }
        }
    },

    async mounted() {
        M.ybVoucherList=this
        const that=this;
        weui.tab('#tab',{
            defaultIndex: 0,
            onChange: function(index){
                if(index==0){
                    that.tabSelect="待领取";
                    that.fetchDataListByState("待领取");
                }
                if(index==1){
                    that.tabSelect="待扫码"
                    that.fetchDataListByState("待扫码");
                }
                if(index==2){
                    that.tabSelect="已完成"
                    that.fetchDataListByState("已完成");
                }
            }
        });
        this.fetchDataListByState("待领取");
    },
    unmounted() {

    }

}


