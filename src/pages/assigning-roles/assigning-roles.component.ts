import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { LayoutHeaderComponent } from '#shared/layout-header/layout-header.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { Button } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { AutocompleteComponent } from '#shared';
import { AssigningRoleCardComponent } from '#pages/assigning-roles/assigning-role-card/assigning-role-card.component';
import { AdminRoleDto, Firm, Role, User } from '#pages/model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRolesService } from '#pages/services/user-roles.service';

@Component({
  selector: 'prefix-assigning-roles',
  imports: [
    LayoutHeaderComponent,
    AutoCompleteModule,
    Button,
    FormsModule,
    AutocompleteComponent,
    MultiSelectModule,
    AssigningRoleCardComponent
  ],
  templateUrl: './assigning-roles.component.html',
  styleUrl: './assigning-roles.component.scss',
})
export class AssigningRolesComponent implements OnInit {
  service = inject(UserRolesService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  user$$ = signal<AdminRoleDto | null>(null);
  users$$ = this.service.filteredAdminRoles$$;
  roles$$ = this.service.roles$$;
  firms$$ = this.service.firms$$;

  // Флаг для добавления новой роли
  isAddingNewRole$$ = signal(false);

  // Фильтры
  selectedRoles$$ = signal<Role[]>([]);
  selectedFirms$$ = signal<Firm[]>([]);

  constructor() {
    effect(() => this.service.setRoles(this.selectedRoles$$()));
    effect(() => this.service.setFirms(this.selectedFirms$$()));
  }


  ngOnInit() {
    const userId = Number(this.route.snapshot.paramMap.get('userId'));
    const user = this.users$$().find(user => user.id === userId);

    user ? this.user$$.set(user) : this.router.navigate(['/staffer-roles']);
  }

  handleSearch(query: string) {
    this.service.setSearchQuery(query);
  }

  protected addNewRole() {
    this.isAddingNewRole$$.set(true);
  }

}
