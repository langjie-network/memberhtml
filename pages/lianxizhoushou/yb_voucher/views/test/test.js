importStyle("router-page-test", "/memberhtml/pages/lianxizhoushou/yb_voucher/views/test/test.css");

const template=`<div>
    <div class="aui-tab aui-border-b" id="tab">
                <div class="aui-tab-item aui-active">哆啦小梦</div>
                <div class="aui-tab-item">啦啦啦啦</div>
            </div>
            <div class="aui-padded-5 " id="tab1-con">
               
               <a href="javascript:" role="button" title="等待中" class="weui-btn weui-btn_default weui-btn_loading"><span class="weui-primary-loading"><i class="weui-loading"></i></span>次要操作</a>
               
               
               <a href="javascript:" role="button" title="等待中" class="weui-btn weui-btn_primary weui-btn_loading"><span class="weui-primary-loading weui-primary-loading_transparent"><i class="weui-primary-loading__dot"></i></span>主要操作</a>
            </div>

</div>`


export default {
        template,
        name: "test",
        data() {
            return {
                menuData: {
                    "name": "我的下载",
                    "value": "我的下载",
                    "children": [
                        {"name": "我的下载1", "value": "我的下载1"},
                        {"name": "我的下载2", "value": "我的下载2"},
                        {"name": "我的下载2", "value": "我的下载2"},
                      ],
                }
            }
        },
        methods: {},
        computed: {},
        async mounted() {


        }
    }


