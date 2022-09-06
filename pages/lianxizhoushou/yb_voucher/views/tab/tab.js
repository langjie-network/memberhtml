importStyle("router-page-tab", "./views/tab/tab.css");

const template=`
<div class="weui-tab" id="tab">
    <div class="weui-navbar">
        <div class="weui-navbar__item">反馈</div>
        <div class="weui-navbar__item">表单</div>
        <div class="weui-navbar__item">上传</div>
        <div class="weui-navbar__item">其它</div>
    </div>
    <div class="weui-tab__panel">
        <div class="weui-tab__content">
            反馈页
        </div>
        <div class="weui-tab__content">
            表单页
        </div>
        <div class="weui-tab__content">上传页</div>
        <div class="weui-tab__content">其它页</div>
    </div>
</div>

`


export default {
        template,
        name: "tab",
        data() {
            return {

            }
        },
        methods: {},
        computed: {},
       async mounted() {
        weui.tab('#tab',{
            defaultIndex: 0,
            onChange: function(index){
                //console.log(index);
            }
        });


    },
}


