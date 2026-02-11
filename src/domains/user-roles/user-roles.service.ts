import { computed, Injectable, signal } from '@angular/core';
import { AdminRoleAssignment, AdminRoleInfo, Firm, Role, User, UserRolesFilters } from './user-roles.model';
import { ADMIN_ROLE_ASSIGNMENTS, ADMIN_ROLES_INFO, FIRMS, ROLES, USERS } from './user-roles.mock-data';

@Injectable({
  providedIn: 'root'
})
export class UserRolesService {
  readonly users$$ = signal<User[]>(USERS);
  readonly roles$$ = signal<Role[]>(ROLES);
  readonly firms$$ = signal<Firm[]>(FIRMS);

  // ✅ Список всех пользователей с их ролями
  readonly adminRolesInfo$$ = signal<AdminRoleInfo[]>(ADMIN_ROLES_INFO);

  readonly filters$$ = signal<UserRolesFilters>({
    user: null,
    firms: [],
    roles: [],
    searchQuery: ''
  });

  // ✅ Отфильтрованный список пользователей (для главной страницы)
  readonly filteredAdminRoles$$ = computed(() => {
    const infos = this.adminRolesInfo$$();
    const { user, firms, roles, searchQuery } = this.filters$$();

    if (!user && !firms.length && !roles.length && !searchQuery) {
      return infos;
    }

    return infos.filter(info =>
      this.filterByUser(info, user) &&
      this.filterByFirms(info, firms) &&
      this.filterByRoles(info, roles) &&
      this.filterBySearch(info, searchQuery)
    );
  });

  readonly usersForAutocomplete$$ = computed(() => {
    const users = this.users$$();
    const query = this.filters$$().searchQuery;
    if (!query) return users;

    const searchLower = query.toLowerCase();
    return users.filter(user =>
      user.name.toLowerCase().includes(searchLower) ||
      user.id.toString().includes(query)
    );
  });

  /* ====== PUBLIC API ====== */

  updateFilter<K extends keyof UserRolesFilters>(
    key: K,
    value: UserRolesFilters[K]
  ): void {
    this.patchFilters({ [key]: value } as Partial<UserRolesFilters>);
  }

  updateFilters(updates: Partial<UserRolesFilters>): void {
    this.patchFilters(updates);
  }

  resetFilters(): void {
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

  // ✅ Получить детальную информацию о назначениях ролей пользователя
  getAdminRoleAssignments(userId: number): AdminRoleAssignment[] {
    return ADMIN_ROLE_ASSIGNMENTS[userId] || [];
  }

  /* ====== PRIVATE ====== */

  private patchFilters(patch: Partial<UserRolesFilters>): void {
    this.filters$$.update(filters => ({ ...filters, ...patch }));
  }

  private filterByUser(info: AdminRoleInfo, selectedUser: User | null): boolean {
    if (!selectedUser) return true;
    return info.admin.id === selectedUser.id;
  }

  private filterByRoles(info: AdminRoleInfo, filterRoles: Role[]): boolean {
    if (!filterRoles?.length) return true;
    if (!info.roles?.length) return false;
    return info.roles.some(ir =>
      filterRoles.some(fr => fr.id === ir.id)
    );
  }

  private filterByFirms(info: AdminRoleInfo, filterFirms: Firm[]): boolean {
    if (!filterFirms?.length) return true;

    // Если у пользователя нет филиалов (глобальные роли) - показываем всегда
    if (!info.firms?.length) return true;

    return info.firms.some(inf =>
      filterFirms.some(ff => ff.id === inf.id)
    );
  }

  private filterBySearch(info: AdminRoleInfo, query: string): boolean {
    if (!query) return true;
    const searchLower = query.toLowerCase();
    return (
      info.admin.name.toLowerCase().includes(searchLower) ||
      info.admin.id.toString().includes(query)
    );
  }
}
