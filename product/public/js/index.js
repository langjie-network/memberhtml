import './config.js';
import './controller/index.js';
import layout from '../../views/layout.js';
import router from './router.js';
import gloable_state from "./state.js";

import common from "./common.js";
import  setupCustomComponents  from './customComponents.js';


const {createApp}=Vue;
const vueApp= createApp(layout);
vueApp.use(router);

setupCustomComponents(vueApp).then(()=>{
    vueApp.mount('#root');
});
vueApp.config.globalProperties.$BASE_IMG_URL =(url)=>{
    return "https://langjie.oss-cn-hangzhou.aliyuncs.com/space/root/project/shoukongqi/static/"+url;
}
vueApp.config.globalProperties.$gloable_state =gloable_state;
vueApp.config.globalProperties.$common =common;

//全局状态
M.gloable_state=gloable_state;
//全局属性
M.gp=vueApp.config.globalProperties;
vueApp.config.isCustomElement = tag => tag.startsWith('ming-');
window.vueApp=vueApp;

if(M.config.env=='dev11'){
    const source = new EventSource('http://localhost:8888/sseServer?clientId=77');
    source.addEventListener('slide', e => {
        location.reload()
    }, false);
}
