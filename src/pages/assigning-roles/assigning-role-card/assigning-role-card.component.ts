import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { TagComponent } from '#shared/tag/tag.component';
import { Button } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { AdminRoleDto, Firm, Role, User } from '#pages/model';
import { AutocompleteComponent } from '#shared';
import { UserRolesService } from '#pages/';

@Component({
  selector: 'prefix-assigning-role-card',
  imports: [
    TagComponent,
    Button,
    MultiSelectModule,
    CheckboxModule,
    FormsModule,
    AutocompleteComponent
  ],
  templateUrl: './assigning-role-card.component.html',
  styleUrl: './assigning-role-card.component.scss',
})
export class AssigningRoleCardComponent {
  private service = inject(UserRolesService);

  user = input.required<AdminRoleDto>();
  roleName = computed(() =>
    this.user().roles?.map(role => role.name)
  );

  isEditMode$$ = signal(false);
  checked$$ = signal(false);

  firms$$ = this.service.firms$$;
  roles$$ = this.service.roles$$;

  selectedRoles$$ = signal<Role[]>([]);
  selectedFirms$$ = signal<Firm[]>([]);

  constructor() {
    effect(() => this.service.setFirms(this.selectedFirms$$()));
    effect(() => this.service.setRoles(this.selectedRoles$$()));
  }

  protected handleSearch(query: string) {
    this.service.setSearchQuery(query);
  }

  protected editRole() {
    this.isEditMode$$.set(true);
  }

  protected deleteRole() {

  }

  protected saveRole() {

  }
}
