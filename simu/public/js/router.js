const HardSkq=()=> import('../../views/hard_skq/hard_skq.js');
const SimuSkq=()=> import('../../views/simu_skq/simu_skq.js');
const GeRenSkq=()=> import('../../views/geren_skq/geren_skq.js');
const S2Skq=()=> import('../../views/s2s_skq/s2s_skq.js');
const MachineList=()=> import('../../views/machineList/machineList.js');

const  { createRouter,createWebHashHistory} =VueRouter;

const routes = [
    { path: '/', component: SimuSkq },
    { path: '/hard_skq', component: HardSkq },
    { path: '/simu_skq', component: SimuSkq },
    { path: '/geren_skq', component: GeRenSkq },
    { path: '/s2s_skq', component: S2Skq },
    { path: '/machine_list', component: MachineList }
];



const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router;