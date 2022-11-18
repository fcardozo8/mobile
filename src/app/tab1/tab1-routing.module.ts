import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
    children:[
    {
      path: 'tab2',
      loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
    },
    {
      path: 'tab4 - alta',
      loadChildren: () => import('../tab4-alta/tab4.module').then(m => m.Tab4PageModule)
    },
    {
      path: 'tab5-modificar',
      loadChildren: () => import('../tab5-modificar/tab5.module').then(m => m.Tab5PageModule)
    },
    {
      path: 'tab6-paciente',
      loadChildren: () => import('../tab6-paciente/tab6.module').then(m => m.Tab6PageModule)
    },
    {
      path: 'modal',
      loadChildren: () => import('../pages/modal/modal.module').then( m => m.ModalPageModule)
    },  
    {
      path: 'tab8-modificar',
      loadChildren: () => import('../tab8-modificar/tab8.module').then(m => m.Tab8PageModule)
    },
    {
      path: 'tab7-paciente',
      loadChildren: () => import('../tab7-paciente/tab7.module').then(m => m.Tab7PageModule)
    },
    

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
