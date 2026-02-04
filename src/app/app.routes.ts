import { Routes } from '@angular/router';
import { LayoutComponent, LoginComponent } from '#pages/';


export const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {
        path: 'roles',
        children: [
          {
            path: '',
            loadComponent: () => import('#pages/').then(m => m.RolesListComponent)
          },
          {
            path: ':id',
            loadComponent: () => import('#pages/').then(m => m.RoleEditComponent)
          }
        ]
      },
      {
        path: 'staffer-roles',
        loadComponent: () => import('#pages/').then(m => m.StafferRolesComponent)
      },
      {
        path: 'assigning-roles/:userId',
        loadComponent: () => import('#pages/').then(m => m.AssigningRolesComponent)
      }
    ]
  },
  { path: 'login', component: LoginComponent }
];
