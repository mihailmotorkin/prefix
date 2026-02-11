import { Component, OnInit, inject, signal, OnDestroy, effect, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LayoutHeaderComponent } from '#shared/layout-header/layout-header.component';
import { AutocompleteComponent } from '#shared';
import { MultiSelectModule } from 'primeng/multiselect';
import { Button } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { RoleAssignmentService } from '#domains/role-assignment/role-assignment.service';
import { ReferenceDataService } from '#shared/services/reference-data.service';
import { AdminManagementService } from '#domains/admin-management/admin-management.service';
import { Firm, Role, RoleAssignmentData } from '#domains/role-assignment/role-assignment.model';
import { AssigningRoleCardComponent } from '#widgets/assigning-role-card';

@Component({
  selector: 'prefix-assigning-roles',
  imports: [
    LayoutHeaderComponent,
    AutocompleteComponent,
    MultiSelectModule,
    Button,
    FormsModule,
    AssigningRoleCardComponent
  ],
  templateUrl: './assigning-roles.component.html',
  styleUrl: './assigning-roles.component.scss',
})
export class AssigningRolesComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private roleService = inject(RoleAssignmentService);
  private referenceService = inject(ReferenceDataService);
  private adminService = inject(AdminManagementService);

  // Данные
  readonly availableRoles$$ = this.referenceService.roles$$;
  readonly availableFirms$$ = this.referenceService.firms$$;

  readonly assignments$$ = computed(() => this.roleService.roleAssignments$$());

  // Suggestions для автокомплита ролей
  readonly roleSuggestions$$ = this.referenceService.roleSuggestions$$;

  // UI state
  adminName$$ = signal<string>('');
  editingAssignmentId$$ = signal<number | null>(null);
  isAddingNew$$ = signal(false);

  // Для фильтра ролей в шапке
  selectedRole$$ = signal<Role | null>(null);
  selectedFirms$$ = signal<Firm[]>([]);

  constructor() {
    effect(() => {
      console.log('assignments$$', this.assignments$$());
    })
  }

  ngOnInit() {
    const adminId = Number(this.route.snapshot.paramMap.get('id'));

    if (adminId) {
      this.roleService.loadAdminRoles(adminId);

      // Получаем имя администратора
      const admin = this.adminService.getAdminById(adminId);
      if (admin) {
        this.adminName$$.set(admin.admin.name);
      }
    }
  }

  ngOnDestroy() {
    this.roleService.clearState();
  }

  startAddingRole(): void {
    this.isAddingNew$$.set(true);
    this.editingAssignmentId$$.set(null);
  }

  startEditingRole(assignmentId: number): void {
    this.editingAssignmentId$$.set(assignmentId);
    this.isAddingNew$$.set(false);
  }

  saveRole(assignment: Partial<RoleAssignmentData>) {
    if (!assignment.role) return;

    if (assignment.id) {
      // Обновление существующей роли
      this.roleService.updateRoleAssignment(
        assignment.id,
        assignment.firms?.map(f => f.id) || []
      );
    } else {
      // Добавление новой роли
      this.roleService.assignRole(
        assignment.role.role_id,
        assignment.firms?.map(f => f.id) || []
      );
    }

    this.cancelEdit();
  }

  deleteRole(assignment: RoleAssignmentData) {
    this.roleService.deleteRoleAssignment(assignment.id);
  }

  cancelEdit(): void {
    this.editingAssignmentId$$.set(null);
    this.isAddingNew$$.set(false);
  }

  isEditMode(assignmentId: number): boolean {
    return this.editingAssignmentId$$() === assignmentId;
  }

  protected handleSearch(query: string) {
    this.referenceService.setRoleAutocompleteQuery(query);
  }
}
