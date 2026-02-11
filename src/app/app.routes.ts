import { Routes } from '@angular/router';
import { LayoutComponent } from '#pages/';


export const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('#pages/private/private.routes').then(m => m.privateRoutes),
      }
    ]
  }
];
