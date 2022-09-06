const Test=()=> import('../../views/test/test.js');
const YbVoucherList=()=> import('../../views/ybVoucherList/ybVoucherList.js')
const Tab=()=> import('../../views/tab/tab.js')
const ybVouchertDetail=()=> import('../../views/ybVoucherList/ybVouchertDetail.js')



const  { createRouter,createWebHashHistory} =VueRouter;


const routes = [
    { path: '/', component: YbVoucherList },
    { name:"ybVouchertDetail", path: '/ybVouchertDetail', component: ybVouchertDetail},
    { path: '/test', component: Test },
    { path: '/tab', component: Tab },
];



const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router;