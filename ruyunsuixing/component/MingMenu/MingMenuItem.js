
if(M.isPc){
    importStyle("MingMenuItem","./component/MingMenu/MingMenuItemPc.css");
}else {
    importStyle("MingMenuItem","./component/MingMenu/MingMenuItem.css");
}






const template=`
     <div class="MingMenuItem">
            <li  @click.stop="toggle"  class="MingMenuItem-li" v-if="menuItemData.value">
                <div >
                       <span v-if="!isFolder">  {{menuItemData.name}} </span>
                       <span  v-else>  {{menuItemData.name}} </span>
                   
                       <img class="MingMenuItem-img"   src="https://langjie.oss-cn-hangzhou.aliyuncs.com/space/root/project/ruyunsuixing/img/right_row.png"/>
                  </div>
                <ul class="MingMenuItem-ul" v-show="open" v-if="isFolder">      
                  <MingMenuItem   class="MingMenuItem-item"
                    v-for="menuItemData in menuItemData.children"
                    :menuItemData="menuItemData">
                  </MingMenuItem>
                </ul>
            </li>
    </div>`;



export default  {
    template,
    name: 'MingMenuItem',
    props: {
        menuItemData: Object
    },
    data() {
        return {
            open: false,
            folderImg:"",
        }
    },
    methods:{
        toggle: function (e) {
            if (this.isFolder) {
                this.open = !this.open
            }else {
                $(".MingMenuItem").css("background","white")
                if(e.target.tagName=="SPAN"){
                    e.target.parentElement.parentElement.parentElement.style.backgroundColor="rgb(142,214,232)";
                }
                if(e.target.tagName=="DIV"){
                    e.target.parentElement.parentElement.style.backgroundColor="rgb(142,214,232)";
                }
                let url=this.menuItemData.value;
                let query=this.menuItemData.query;
                //alert(url)
                this.$router.push({ path: url, query})
            }
        },
        changeType: function () {
            if (!this.isFolder) {

                this.open = true
            }
        }
    },
    computed: {
        isFolder: function () {
            return this.menuItemData.children &&
                this.menuItemData.children.length
        }
    },
    mounted(){

    },
}