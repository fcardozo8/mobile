import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'tab4-alta',
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
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
