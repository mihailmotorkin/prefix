import { Component, inject } from '@angular/core';
import { Button } from 'primeng/button';
import { Router } from '@angular/router';
import { LayoutHeaderComponent } from '#shared/layout-header/layout-header.component';
import { AutocompleteComponent } from '#shared';
import { RolesService } from '#domains/roles/roles.service';
import { Role } from '#domains/roles/roles.model';
import { RolesTableComponent } from '#widgets/roles/roles-table/roles-table.component';

@Component({
  selector: 'prefix-roles-list',
  imports: [
    Button,
    LayoutHeaderComponent,
    AutocompleteComponent,
    RolesTableComponent
  ],
  templateUrl: './roles-list.component.html',
  styleUrl: './roles-list.component.scss',
})
export class RolesListComponent {
  private router = inject(Router);
  private service = inject(RolesService);

  roles$$ = this.service.roles$$;

  protected addNewRole() {
    this.service.createRole();
  }

  protected editRole(id: number) {
    this.router.navigate(['roles', id]);
  }

  protected renameRole(role: Role) {
    this.service.updateRole(role)
  }

  protected removeRole(id: number) {
    this.service.removeRole(id);
  }
}
