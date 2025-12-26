import { Component, inject, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { UserRoleComponent } from '#shared/user-role/user-role.component';
import { Router } from '@angular/router';
import { LayoutHeaderComponent } from '#shared/layout-header/layout-header.component';

interface User {
  id: number;
  name: string;
  role: string;
  description?: string;
}

@Component({
  selector: 'prefix-roles-list',
  imports: [
    Button,
    UserRoleComponent,
    LayoutHeaderComponent
  ],
  templateUrl: './roles-list.component.html',
  styleUrl: './roles-list.component.scss',
})
export class RolesListComponent {
  router = inject(Router);

  users = signal<User[]>([
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
  ]);

  protected addNewRole() {
    this.users.update(() => [...this.users(), {
      id: this.users().length + 1,
      name: '',
      role: `Роль ${this.users().length + 1}`
    }]);
  }

  protected editRole(id: number) {
    this.router.navigate(['roles', id]);
  }
}
