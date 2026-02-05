import { Component, effect, inject, signal } from '@angular/core';
import { LayoutHeaderComponent } from '#shared/layout-header/layout-header.component';
import { StafferRoleCardComponent } from '#shared/staffer-role-card/staffer-role-card.component';
import { Button } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from '#shared/paginator/paginator.component';
import { AutocompleteComponent } from '#shared';
import { Firm, Role, User } from '#pages/model';
import { Router } from '@angular/router';
import { UserRolesService } from '#pages/services/user-roles.service';

@Component({
  selector: 'prefix-staffer-roles',
  imports: [
    LayoutHeaderComponent,
    StafferRoleCardComponent,
    Button,
    MultiSelectModule,
    SelectModule,
    FormsModule,
    PaginatorComponent,
    AutocompleteComponent,
  ],
  templateUrl: './staffer-roles.component.html',
  styleUrl: './staffer-roles.component.scss',
})
export class StafferRolesComponent {
  private service = inject(UserRolesService);
  private router = inject(Router);

  // Данные для отображения
  adminRoles$$ = this.service.filteredAdminRoles$$; // Отфильтрованные назначения
  usersForAutocomplete$$ = this.service.usersForAutocomplete$$; // Для автокомплита
  roles$$ = this.service.roles$$;
  firms$$ = this.service.firms$$;

  // Локальные signals для binding
  selectedUser$$ = signal<User | null>(null);
  selectedRoles$$ = signal<Role[]>([]);
  selectedFirms$$ = signal<Firm[]>([]);

  constructor() {
    // Синхронизация с сервисом
    effect(() => this.service.setUser(this.selectedUser$$()));
    effect(() => this.service.setRoles(this.selectedRoles$$()));
    effect(() => this.service.setFirms(this.selectedFirms$$()));
  }

  handleSearch(query: string) {
    this.service.setSearchQuery(query);
  }

  resetFilters() {
    this.selectedUser$$.set(null);
    this.selectedRoles$$.set([]);
    this.selectedFirms$$.set([]);
    this.service.resetFilters();
  }

  navigateToAssigningRoles(userId: number) {
    this.router.navigate(['/assigning-roles', userId]);
  }

}
