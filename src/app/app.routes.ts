import { Routes } from '@angular/router';
import { LayoutComponent, LoginComponent } from '#pages/';


export const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      // {  }
    ]
  },
  { path: 'login', component: LoginComponent }
];
