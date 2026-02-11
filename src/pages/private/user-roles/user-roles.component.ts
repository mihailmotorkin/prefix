import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { LayoutHeaderComponent } from '#shared/layout-header/layout-header.component';
import { Button } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from '#shared/components/paginator/paginator.component';
import { AutocompleteComponent } from '#shared';
import { Router } from '@angular/router';
import { UserRoleCardComponent } from '#widgets/user-role-card';
import { AdminManagementService } from '#domains/admin-management/admin-management.service';
import { ReferenceDataService } from '#shared/services/reference-data.service';
import { AdminData, Firm, Role } from '#domains/role-assignment/role-assignment.model';

@Component({
  selector: 'prefix-user-roles',
  imports: [
    LayoutHeaderComponent,
    UserRoleCardComponent,
    Button,
    MultiSelectModule,
    SelectModule,
    FormsModule,
    PaginatorComponent,
    AutocompleteComponent,
  ],
  templateUrl: './user-roles.component.html',
  styleUrl: './user-roles.component.scss',
})
export class UserRolesComponent implements OnInit {
  private adminService = inject(AdminManagementService);
  private referenceService = inject(ReferenceDataService);
  private router = inject(Router);

  // Данные
  readonly filteredAdmins$$ = this.adminService.filteredAdmins$$;
  readonly firms$$ = this.referenceService.firms$$;
  readonly roles$$ = this.referenceService.roles$$;
  // Suggestions для автокомплита (обновляются при вводе)
  readonly adminSuggestions$$ = this.adminService.autocompleteSuggestions$$;

  // Локальные фильтры для UI binding
  selectedAdmin$$ = signal<AdminData['admin'] | null>(null);
  selectedFirms$$ = signal<Firm[]>([]);
  selectedRoles$$ = signal<Role[]>([]);


  constructor() {
    // Отслеживаем изменения selectedAdmin$$
    effect(() => {
      const selected = this.selectedAdmin$$();
      if (selected) {
        this.adminService.setSearchQuery(selected.name);
      } else {
        this.adminService.setSearchQuery('');
      }
    });
  }

  ngOnInit() {
    this.adminService.loadAdminsList({
      env: { admin_id: 1 }
    });
  }

  handleSearch(query: string) {
    this.adminService.setAutocompleteQuery(query);
  }

  onFirmsChange(firms: Firm[]) {
    this.selectedFirms$$.set(firms);
    this.adminService.setFirmFilter(firms.map(f => f.id));
  }

  onRolesChange(roles: Role[]) {
    this.selectedRoles$$.set(roles);
    this.adminService.setRoleFilter(roles.map(r => r.role_id));
  }

  resetFilters() {
    this.selectedAdmin$$.set(null);
    this.selectedFirms$$.set([]);
    this.selectedRoles$$.set([]);
    this.adminService.resetFilters();
  }

  navigateToAssigningRoles(adminId: number) {
    this.router.navigate(['/assigning-roles', adminId]);
  }

}
