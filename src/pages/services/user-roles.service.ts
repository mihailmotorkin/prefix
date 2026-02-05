import { computed, Injectable, signal } from '@angular/core';
import { ADMIN_ROLES, FIRMS, ROLES, USERS } from '#pages/mock-data';
import { UserRolesFilters, Firm, Role, User, AdminRoleDto } from '#pages/model';

@Injectable({
  providedIn: 'root'
})
export class UserRolesService {
  // Все доступные данные
  readonly users$$ = signal<User[]>(USERS);
  readonly roles$$ = signal<Role[]>(ROLES);
  readonly firms$$ = signal<Firm[]>(FIRMS);
  readonly adminRoles$$ = signal<AdminRoleDto[]>(ADMIN_ROLES);

  // Фильтры для списка пользователей
  readonly filters$$ = signal<UserRolesFilters>({
    user: null,
    firms: [],
    roles: [],
    searchQuery: ''
  });

  // Отфильтрованные пользователи
  readonly filteredAdminRoles$$ = computed(() => {
    const assignments = this.adminRoles$$();
    const { user, firms, roles, searchQuery } = this.filters$$();

    if (!user && !firms.length && !roles.length && !searchQuery) {
      return assignments;
    }

    return assignments.filter(assignment =>
      this.filterByUser(assignment, user) &&
      this.filterByFirms(assignment, firms) &&
      this.filterByRoles(assignment, roles) &&
      this.filterBySearch(assignment, searchQuery)
    );
  });

  // Пользователи для автокомплита (с учетом searchQuery)
  readonly usersForAutocomplete$$ = computed(() => {
    const users = this.users$$();
    const query = this.filters$$().searchQuery;

    if (!query) {
      return users;
    }

    const searchLower = query.toLowerCase();
    return users.filter(user =>
      user.name.toLowerCase().includes(searchLower) ||
      user.id.toString().includes(query)
    );
  });

  /* ====== PUBLIC API ====== */

  setUser(user: User | null) {
    this.patchFilters({ user });
  }

  setRoles(roles: Role[]) {
    this.patchFilters({ roles });
  }

  setFirms(firms: Firm[]) {
    this.patchFilters({ firms });
  }

  setSearchQuery(query: string) {
    this.patchFilters({ searchQuery: query });
  }

  resetFilters() {
    this.filters$$.set({
      user: null,
      roles: [],
      firms: [],
      searchQuery: ''
    });
  }

  getUserById(id: number): User | undefined {
    return this.users$$().find(u => u.id === id);
  }

  getAdminRolesByUserId(userId: number): AdminRoleDto[] {
    return this.adminRoles$$().filter(ar => ar.user.id === userId);
  }

  /* ====== PRIVATE HELPERS ====== */

  private patchFilters(patch: Partial<UserRolesFilters>) {
    this.filters$$.update(filters => ({ ...filters, ...patch }));
  }

  private filterByUser(assignment: AdminRoleDto, filterUser: User | null): boolean {
    if (!filterUser) {
      return true;
    }
    return assignment.user.id === filterUser.id;
  }

  private filterByRoles(assignment: AdminRoleDto, filterRoles: Role[]): boolean {
    if (!filterRoles.length) {
      return true;
    }

    if (!assignment.roles || !assignment.roles.length) {
      return false;
    }
    return assignment.roles.some(assignmentRole =>
      filterRoles.some(filterRole  => filterRole.id === assignmentRole.id)
    );
  }

  private filterByFirms(assignment: AdminRoleDto, filterFirms: Firm[]): boolean {
    if (!filterFirms.length) {
      return true;
    }
    if (assignment.isGlobal) {
      return true;
    }
    if (!assignment.firms || !assignment.firms.length) {
      return false;
    }
    return assignment.firms.some(assignmentFirm =>
      filterFirms.some(filterFirm => filterFirm.id === assignmentFirm.id)
    );
  }

  private filterBySearch(assignment: AdminRoleDto, query: string): boolean {
    if (!query) {
      return true;
    }

    const searchQuery = query.toLowerCase();

    return (
      assignment.user.name.toLowerCase().includes(searchQuery) ||
      assignment.user.id.toString().includes(searchQuery)
    );
  }

}
