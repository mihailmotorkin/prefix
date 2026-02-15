import { Injectable, signal } from '@angular/core';
import { Role, RoleRight, UpdateRoleDto } from '#domains/roles/roles.model';
import { ROLE_RIGHTS, ROLES } from '#domains/roles/roles-mock-data';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  roles$$ = signal<Role[]>(ROLES);
  rights$$ = signal<RoleRight[]>(ROLE_RIGHTS);

  getRoleById(id: number) {
    return this.roles$$().find(role => role.id === id);
  }

  createRole() {
    const nextId = this.roles$$().length + 1;

    const role: Role = {
      id: nextId,
      name: `Роль ${nextId}`,
      description: '',
      rights: []
    };

    this.roles$$.update(roles => [...roles, role]);
  }

  updateRole(newRole: Role) {
    this.roles$$.update(roles =>
      roles.map(role => role.id === newRole.id ? newRole : role)
    );
  }

  updateRoleRights(dto: UpdateRoleDto) {
    const role = this.getRoleById(dto.id);

    if (!role) {
      console.warn(`Cannot update rights: role with ID ${dto.id} not found`);
      return;
    }

    const selectedRights = this.getRightsByIds(dto.right_ids);

    const updatedRole: Role = {
      ...role,
      name: dto.name,
      description: dto.description,
      rights: selectedRights
    };

    this.updateRole(updatedRole);
  }

  getRightById(id: number): RoleRight | undefined {
    return this.rights$$().find(right => right.id === id);
  }

  getRightsByIds(ids: number[]): RoleRight[] {
    return this.rights$$().filter(right => ids.includes(right.id));
  }

  removeRole(id: number) {
    this.roles$$.update(roles =>
      roles.filter(role => role.id !== id)
    );
  }
}
