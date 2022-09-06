
// import AppHeader from '../../component/AppHeader/AppHeader.js';
// import MingMenuItem from '../../component/MingMenu/MingMenuItem.js';
// import MingMenu from '../../component/MingMenu/MingMenu.js';

const components=[
     // AppHeader,
     // MingMenuItem,
     // MingMenu,
]

export default async function setupCustomComponents(app) {
     for (let i=0;i<components.length;i++){
          let component=components[i];
          component.template=await component.template;
          app.component(component.name, component);
     }
}