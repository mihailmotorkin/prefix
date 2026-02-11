import { computed, Injectable, signal } from '@angular/core';
import { AdminData, GetAdminsListRequest } from '#domains/role-assignment/role-assignment.model';
import { AdminListFilters } from '#domains/admin-management/admin-management.model';
import { mockAdminsList } from '#domains/role-assignment/role-assignment.mock-data';

@Injectable({
  providedIn: 'root'
})
export class AdminManagementService {
  // State
  readonly adminsList$$ = signal<AdminData[]>([]);
  private readonly filters$$ = signal<AdminListFilters>({
    searchQuery: '',
    firmIds: [],
    roleIds: []
  });

  // Добавляем отдельный сигнал для поискового запроса автокомплита
  private readonly autocompleteQuery$$ = signal<string>('');

  // Computed для suggestions автокомплита
  readonly autocompleteSuggestions$$ = computed(() => {
    const query = this.autocompleteQuery$$().toLowerCase().trim();
    const admins = this.adminsList$$();

    if (!query) {
      return []; // Пустой список пока не введён текст
    }

    return admins
      .filter(admin =>
        admin.admin.name.toLowerCase().includes(query) ||
        admin.admin.id.toString().includes(query)
      )
      .slice(0, 10) // Ограничиваем 10 результатами
      .map(admin => ({
        id: admin.admin.id,
        name: admin.admin.name
      }));
  });

  // Computed для фильтрации основного списка
  readonly filteredAdmins$$ = computed(() => {
    const admins = this.adminsList$$();
    const { searchQuery, firmIds, roleIds } = this.filters$$();

    return admins.filter(admin => {
      // Фильтр по поиску (id или имя)
      const matchesSearch = !searchQuery ||
        admin.admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        admin.admin.id.toString().includes(searchQuery);

      // Фильтр по филиалам
      const matchesFirms = firmIds.length === 0 ||
        admin.firms.some(firm => firmIds.includes(firm.id));

      // Фильтр по ролям
      const matchesRoles = roleIds.length === 0 ||
        admin.roles.some(role => roleIds.includes(role.role_id));

      return matchesSearch && matchesFirms && matchesRoles;
    });
  });

  /* ====== PUBLIC API ====== */

  loadAdminsList(request: Partial<GetAdminsListRequest>) {
    // Пока моки
    this.adminsList$$.set(mockAdminsList);
  }

  // Для автокомплита - обновляет suggestions
  setAutocompleteQuery(query: string) {
    this.autocompleteQuery$$.set(query);
  }

  setSearchQuery(query: string) {
    this.filters$$.update(f => ({ ...f, searchQuery: query }));
  }

  setFirmFilter(firmIds: number[]) {
    this.filters$$.update(f => ({ ...f, firmIds }));
  }

  setRoleFilter(roleIds: number[]) {
    this.filters$$.update(f => ({ ...f, roleIds }));
  }

  resetFilters() {
    this.filters$$.set({
      searchQuery: '',
      firmIds: [],
      roleIds: []
    });
  }

  getAdminById(adminId: number): AdminData | undefined {
    return this.adminsList$$().find(a => a.admin.id === adminId);
  }
}
