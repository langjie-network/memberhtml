const { reactive } = Vue;

const gloable_state = reactive(
    {
       userInfo: M.userInfo,
       visableLeftMenu:false,//是否展开左侧菜单
       showCoverMask:false,//是否显示遮罩层
       header:{ //页头状态
          title:"",
          clientId:"aa",
          isShow:true
      }
});



export default gloable_state;
