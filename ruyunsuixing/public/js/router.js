const Test=()=> import('../../views/test/test.js');
const Checklogin=()=> import('../../views/checklogin/checklogin.js')
const VirCardDetail=()=> import('../../views/virCard/virCardDetail.js');
const RootFileList=()=> import('../../views/burndisk/rootFileList.js');
const NoticlientfileList=()=> import('../../views/burndisk/noticlientfileList.js');
const BurndiskDetail= ()=> import('../../views/burndisk/burndiskDetail.js');
const Tab= ()=> import('../../views/tab/tab.js');
const Login=()=> import('../../views/login/login.js');
const Filechat=()=> import('../../views/burndisk/component/filechat.js');
const NoticlientfileDetail= ()=> import('../../views/burndisk/noticlientfileDetail.js');
const Gallery=()=> import('../../views/filePreview/gallery.js');


import {
    OfficePreview,
    JsonPreview,
    ImgPreview,
    TextPreview

} from '../../views/filePreview/index.js';


const  { createRouter,createWebHashHistory} =VueRouter;

const routes = [
    { path: '/', component: RootFileList },
    { path: '/tab', component: Tab },
    { path: '/test', component: Test },
    { path: '/login', component: Login },
    { path: '/checklogin', component: Checklogin },
    { path: '/burndiskDetail', component: BurndiskDetail },
    { path: '/rootFileList', component: RootFileList },
    { path: '/noticlientfileList', component: NoticlientfileList },
    { path: '/virCardDetail', component: VirCardDetail },
    { path: '/filechat', component: Filechat },
    { name:'noticlientfileDetail',path: '/noticlientfileDetail', component: NoticlientfileDetail },
    { path: '/officePreview', component: OfficePreview },
    { path: '/jsonPreview', component: JsonPreview },
    { path: '/imgPreview', component: ImgPreview },
    {path: '/textPreview',component: TextPreview },
    {path: '/gallery',component: Gallery }
];



const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router;