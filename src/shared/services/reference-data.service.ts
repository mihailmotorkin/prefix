import { computed, Injectable, signal } from '@angular/core';
import { mockFirms, mockRoles } from '#domains/role-assignment/role-assignment.mock-data';
import { Firm, Role } from '#domains/role-assignment/role-assignment.model';

@Injectable({
  providedIn: 'root'
})
export class ReferenceDataService {
  // Справочники - загружаются один раз при старте приложения
  readonly firms$$ = signal<Firm[]>(mockFirms);
  readonly roles$$ = signal<Role[]>(mockRoles);

  // Для автокомплита ролей
  private readonly roleAutocompleteQuery$$ = signal<string>('');

  readonly roleSuggestions$$ = computed(() => {
    const query = this.roleAutocompleteQuery$$().toLowerCase().trim();
    const roles = this.roles$$();

    if (!query) {
      return [];
    }

    return roles
      .filter(role =>
        role.name.toLowerCase().includes(query) ||
        role.role_id.toString().includes(query)
      )
      .slice(0, 10);
  });

  loadReferenceData() {
    // TODO: Загрузка справочников с бэкенда
  }

  setRoleAutocompleteQuery(query: string): void {
    this.roleAutocompleteQuery$$.set(query);
  }

  getFirmById(id: number): Firm | undefined {
    return this.firms$$().find(f => f.id === id);
  }

  getRoleById(roleId: number): Role | undefined {
    return this.roles$$().find(r => r.role_id === roleId);
  }
}
