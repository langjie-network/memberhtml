const template = `
         <div  v-for="menuItemData in menuItemDataList">
           <MingMenuItem :menuItemData="menuItemData" />
        </div>    
    `;

export default {
    template,
    name: 'MingMenu',
    data() {
        return {
            menuItemDataList: [
                {
                    "name": "最近使用",
                    "value": "/rootFileList",
                    "query":{
                         collect:0
                     },
                    "children": [

                    ],
                },
                {
                    "name": "收藏",
                    "value": "/rootFileList",
                    "query":{
                        collect:1
                    },
                    "children": [

                    ],
                },
                {
                    "name": "合同",
                    "value": "/rootFileList",
                    "query":{
                        file_source_type:"burn_disk"
                    },
                    "children": [

                    ],
                },
                {
                    "name": "专线",
                    "value": "/rootFileList",
                    "query":{
                        file_source_type:"noti_client"
                    },
                    "children": [

                    ],
                },
                {
                    "name": "试用版",
                    "value": "/rootFileList",
                    "query":{
                        file_source_type:"burn_disk",
                        trial_version:1
                    },
                    "children": [

                    ],
                },
                {
                    "name": "公共模板",
                    "value": "/rootFileList",
                    "query":{
                        file_source_type:"vtc_cfg_temp,ats_cfg_temp",
                    },
                    "children": [

                    ],
                },
                {
                    "name": "产品文档",
                    "value": "/rootFileList",
                    "query":{
                        file_source_type:"doc_lib"
                    },
                    "children": [


                    ],
                },
                {
                    "name": "图库",
                    "value": "/rootFileList",
                    "query":{
                        file_source_type:"gallery"
                    },
                    "children": [


                    ],
                }
            ]
        }
    },
    methods: {},
    mounted() {

    },
}