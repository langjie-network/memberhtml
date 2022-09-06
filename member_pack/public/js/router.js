const UserContent=()=> import('../../views/usercontent/index.js');
const UserContentInstanceList=()=> import('../../views/usercontent/UserContentInstanceList.js');
const Jsondisplay=()=> import('../../views/jsondisplay/index.js');





const  { createRouter,createWebHashHistory} =VueRouter;

const routes = [
    { path: '/', component: UserContent },
    { path: '/inslist', component: UserContentInstanceList },
    { path: '/jsondisplay', name:"jsondisplay", component: Jsondisplay },
];



const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router;