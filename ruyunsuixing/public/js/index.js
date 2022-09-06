import './config.js';  //全局配置
import './controller/index.js';//全局接口
import layout from '../../views/layout.js'
import router from './router.js';//路由
import gloable_state from "./state.js";//全局状态
import common from "./common.js";
import  setupCustomComponents  from './customComponents.js';
import JweixinPlugin from './ming_mock/JweixinPlugin.js';
import YongZhongOfficePreviewPlugin from './ming_mock/YongZhongOfficePreviewPlugin.js';

const {createApp}=Vue;
const vueApp= createApp(layout);
vueApp.use(router);
setupCustomComponents(vueApp).then(()=>{
    vueApp.mount('#root');
});
vueApp.config.globalProperties.$BASE_IMG_URL =(url)=>{
    return "https://langjie.oss-cn-hangzhou.aliyuncs.com/space/root/project/ruyunsuixing/img"+url;
}
vueApp.config.globalProperties.$gloable_state =gloable_state;
vueApp.config.globalProperties.$common =common;
//全局状态
M.gloable_state=gloable_state;
vueApp.config.isCustomElement = tag => tag.startsWith('ming-input');
window.vueApp=vueApp;

//安装ming_mock插件
app.use(new JweixinPlugin({
    wxConfigUrl:"/common/proxyScan"
}));

//永中Office预览插件
app.use(new YongZhongOfficePreviewPlugin());