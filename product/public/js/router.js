
const Index=()=> import('../../views/index/index.js');
const Tablecardhome=()=> import('../../views/tablecardhome/tablecardhome.js');

const  { createRouter,createWebHashHistory} =VueRouter;

const routes = [
    { path: '/index', component: Index },
    { path: '/v', component: Tablecardhome },
    { path: '/d', component: Tablecardhome }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router;