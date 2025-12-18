import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent, HeaderComponent } from '#shared';
import { UserRoleComponent } from '#shared/user-role/user-role.component';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    SidebarComponent,
    HeaderComponent,
    UserRoleComponent,
    Button
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  users = [
    {
      id: 1,
      name: 'John',
      role: 'Роль 1',
    },
    {
      id: 2,
      name: 'July',
      role: 'Роль 2',
    },
    {
      id: 3,
      name: 'Jimmy',
      role: 'Роль 3',
    },
  ];

  addNewRole() {
    this.users.push({
      id: this.users.length + 1,
      name: '',
      role: `Роль ${this.users.length + 1}`
    });
  }

}
