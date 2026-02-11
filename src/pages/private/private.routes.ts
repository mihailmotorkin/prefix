import { Routes } from '@angular/router';

export const privateRoutes: Routes = [
  {
    path: 'roles',
    children: [
      {
        path: '',
        loadComponent: () => import('./roles/roles-list').then(m => m.RolesListComponent)
      },
      {
        path: ':id',
        loadComponent: () => import('./roles/role-edit').then(m => m.RoleEditComponent)
      }
    ]
  },
  {
    path: 'user-roles',
    loadComponent: () => import('./user-roles').then(m => m.UserRolesComponent)
  },
  {
    path: 'assigning-roles/:id',
    loadComponent: () => import('./assigning-roles').then(m => m.AssigningRolesComponent)
  }

]
