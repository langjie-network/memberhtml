importStyle("router-page-test", "./views/test/test.css");

const template=`<div>
    <div id="left">
        <ul id="demo">
                  AAAAAA
        </ul>
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


