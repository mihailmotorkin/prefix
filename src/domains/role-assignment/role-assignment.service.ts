import { Injectable, signal } from '@angular/core';
import {
  GetAdminRolesRequest,
  GetAdminRolesResponse,
  AssignRoleRequest,
  AssignRoleResponse,
  UpdateRoleAssignmentRequest,
  UpdateRoleAssignmentResponse,
  DeleteRoleRequest,
  RoleAssignmentData
} from './role-assignment.model';
import {
  mockAdminRoles,
  mockAssignRoleResponse,
  mockUpdateRoleResponse
} from '#domains/role-assignment/role-assignment.mock-data';

@Injectable({
  providedIn: 'root'
})
export class RoleAssignmentService {
  // State - роли текущего администратора
  readonly currentAdminId$$ = signal<number | null>(null);
  readonly roleAssignments$$ = signal<RoleAssignmentData[]>([]);

  /* ====== PUBLIC API ====== */

  loadAdminRoles(adminId: number) {
    this.currentAdminId$$.set(adminId);
    this.roleAssignments$$.set(mockAdminRoles);
  }

  assignRole(roleId: number, firmIds: number[]) {
    const adminId = this.currentAdminId$$();
    if (!adminId) {
      console.error('Admin ID не установлен');
      return null;
    }

    const request: AssignRoleRequest = {
      env: { admin_id: adminId },
      admin_id: adminId,
      role_id: roleId,
      firm_ids: firmIds
    };

    const newAssignment = mockAssignRoleResponse;

    // Оптимистичное обновление
    this.roleAssignments$$.update(assignments => [...assignments, newAssignment]);

    return newAssignment;
  }

  updateRoleAssignment(
    assignmentId: number,
    firmIds: number[]
  ): RoleAssignmentData | null {
    const adminId = this.currentAdminId$$();
    if (!adminId) {
      console.error('Admin ID не установлен');
      return null;
    }

    const request: UpdateRoleAssignmentRequest = {
      env: { admin_id: adminId },
      admin_id: adminId,
      id: assignmentId,
      firm_ids: firmIds
    };

    const updated = mockUpdateRoleResponse;

    // Оптимистичное обновление
    this.roleAssignments$$.update(assignments =>
      assignments.map(a => a.id === assignmentId ? updated : a)
    );

    return updated;
  }

  deleteRoleAssignment(assignmentId: number): boolean {
    const adminId = this.currentAdminId$$();
    if (!adminId) {
      console.error('Admin ID не установлен');
      return false;
    }

    const request: DeleteRoleRequest = {
      env: { admin_id: adminId },
      admin_id: adminId,
      id: assignmentId
    };

    // Оптимистичное обновление
    this.roleAssignments$$.update(assignments =>
      assignments.filter(a => a.id !== assignmentId)
    );

    return true;
  }

  clearState(): void {
    this.currentAdminId$$.set(null);
    this.roleAssignments$$.set([]);
  }
}
