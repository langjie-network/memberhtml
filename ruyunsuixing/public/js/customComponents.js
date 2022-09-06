
import AppHeader from '../../component/AppHeader/AppHeader.js';
import DownLoadBottomDialog from '../../component/DownLoadBottomDialog/DownLoadBottomDialog.js';
import MingMenuItem from '../../component/MingMenu/MingMenuItem.js';
import MingMenu from '../../component/MingMenu/MingMenu.js';
import MingDirImg from '../../component/MingDirImg/MingDirImg.js';

const components=[
     AppHeader,
     DownLoadBottomDialog,
     MingMenuItem,
     MingMenu,
     MingDirImg
]

export default async function setupCustomComponents(app) {
     for (let i=0;i<components.length;i++){
          let component=components[i];
          component.template=await component.template;
          app.component(component.name, component);
     }
}