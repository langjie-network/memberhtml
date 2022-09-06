
import AppHeader from '../../component/AppHeader/AppHeader.js';
import  MingSwiper from   '../../component/WebComponent/ming-swiper/ming-swiper.js';


const components=[
      AppHeader,
]

export default async function setupCustomComponents(app) {
     for (let i=0;i<components.length;i++){
          let component=components[i];
          component.template=await component.template;
          app.component(component.name, component);
     }
     MingRouter.registWebComponent(MingSwiper);
}