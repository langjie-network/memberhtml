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
                    "name": "留言板",
                    "value": "/todoList",
                    "query":{

                     },
                    "children": [

                    ],
                },

            ]
        }
    },
    methods: {},
    mounted() {

    },
}