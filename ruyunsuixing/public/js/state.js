const { reactive } = Vue;

const gloable_state = reactive(
    { userInfo: M.getUserInfo()|| {
        phone:"",
        name:"",
        portrait:"https://langjie.oss-cn-hangzhou.aliyuncs.com/space/root/project/ruyunsuixing/img/default_avatar.png",
         avatar:"",
        unionid:""
       },
       visableLeftMenu:false,//是否展开左侧菜单
       showCoverMask:false,//是否显示遮罩层
       header:{ //页头状态
          title:"企业云盘",
          leftIcon:"menu", //menu 或 back
      },
      isLookRootFileList:false //是否看过rootfileList
});



export default gloable_state;
