import { computed, Injectable, signal } from '@angular/core';
import { firms, roles, users } from '#pages/mock-data';
import { UserFilters, Firm, Role, User } from '#pages/model';

@Injectable({
  providedIn: 'root'
})
export class UserRolesService {
  // Все доступные данные
  private readonly allUsers$$ = signal<User[]>(users);
  readonly allRoles$$ = signal<Role[]>(roles);
  readonly allFirms$$ = signal<Firm[]>(firms);

  // Фильтры для списка пользователей
  readonly filters$$ = signal<UserFilters>({
    user: null,
    firms: [],
    roles: [],
    searchQuery: ''
  });

  // Отфильтрованные пользователи
  readonly filteredUsers$$ = computed(() => {
    const users = this.allUsers$$();
    const { user, firms, roles, searchQuery } = this.filters$$();

    if (!user && !firms.length && !roles.length && !searchQuery) {
      return users;
    }

    return users.filter(user =>
      this.filterByUser(user, user) &&
      this.filterBySearch(user, searchQuery) &&
      this.filterByRoles(user, roles) &&
      this.filterByFirms(user, firms)
    );
  });

  /* ====== PUBLIC API ====== */

  setUser(user: User | null) {
    this.patchFilters({ user });
  }

  setSearchQuery(query: string) {
    this.patchFilters({ searchQuery: query });
  }

  setRoles(roles: Role[]) {
    this.patchFilters({ roles });
  }

  setFirms(firms: Firm[]) {
    this.patchFilters({ firms });
  }

  resetFilters() {
    this.filters$$.set({
      user: null,
      roles: [],
      firms: [],
      searchQuery: ''
    });
  }

  /* ====== PRIVATE HELPERS ====== */

  private patchFilters(patch: Partial<UserFilters>) {
    this.filters$$.update(filters => ({ ...filters, ...patch }));
  }

  private filterByUser(user: User, selectedUser: User | null): boolean {
    return !selectedUser || user.id === selectedUser.id;
  }

  private filterBySearch(user: User, query: string): boolean {
    if (!query) {
      return true;
    }
    const searchQuery = query.trim().toLowerCase();
    return user.name.toLowerCase().includes(searchQuery) || user.id.toString().includes(searchQuery);
  }

  private filterByRoles(user: User, roles: Role[]): boolean {
    if (!roles.length) {
      return true;
    }
    if (!user.roles) {
      return false;
    }
    return roles.some(role =>
      user.roles!.some(userRole => userRole.id === role.id)
    );
  }

  private filterByFirms(user: User, firms: Firm[]): boolean {
    if (!firms.length) {
      return true;
    }
    if (!user.firms) {
      return false;
    }
    return firms.some(firms =>
      user.firms!.some(userFirms => userFirms.id === firms.id)
    );
  }

}
