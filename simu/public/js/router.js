
const HardSkq=()=> import('../../views/hard_skq/hard_skq.js');
const SimuSkq=()=> import('../../views/simu_skq/simu_skq.js');
const GeRenSkq=()=> import('../../views/geren_skq/geren_skq.js');

const  { createRouter,createWebHashHistory} =VueRouter;

const routes = [
    { path: '/', component: SimuSkq },
    { path: '/hard_skq', component: HardSkq },
    { path: '/simu_skq', component: SimuSkq },
    { path: '/geren_skq', component: GeRenSkq }
];



const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router;