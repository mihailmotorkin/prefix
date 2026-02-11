import { Component, input, output } from '@angular/core';
import { RoleItemComponent } from '#widgets/roles/role-item';
import { Role } from '#domains/roles/roles.model';

@Component({
  selector: 'prefix-roles-table',
  imports: [
    RoleItemComponent
  ],
  templateUrl: './roles-table.component.html',
  styleUrl: './roles-table.component.scss',
})
export class RolesTableComponent {
  roles = input.required<Role[]>();

  edit = output<number>();
  rename = output<{ id: number; name: string }>();
  remove = output<number>();

  onEdit(roleId: number) {
    this.edit.emit(roleId);
  }

  onRename(roleId: number, name: string) {
    this.rename.emit({ id: roleId, name });
  }

  onRemove(roleId: number) {
    this.remove.emit(roleId);
  }
}
