import { Component, inject } from '@angular/core';
import { Button } from 'primeng/button';
import { RolesService } from '#domains/roles/roles.service';

@Component({
  selector: 'prefix-role-adding',
  imports: [
    Button
  ],
  templateUrl: './role-adding.component.html',
  styleUrl: './role-adding.component.scss',
})
export class RoleAddingComponent {
  private service = inject(RolesService);

  protected addNewRole() {
    this.service.createRole();
  }
}
