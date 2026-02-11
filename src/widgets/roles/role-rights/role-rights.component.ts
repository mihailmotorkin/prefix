import { Component, computed, effect, input, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { Chip } from 'primeng/chip';
import { FormsModule } from '@angular/forms';
import { MultiSelect } from 'primeng/multiselect';
import { RoleRight } from '#domains/roles/roles.model';
import { ROLE_RIGHTS } from '#domains/roles/roles-mock-data';

@Component({
  selector: 'prefix-role-rights',
  imports: [
    Button,
    Chip,
    FormsModule,
    MultiSelect
  ],
  templateUrl: './role-rights.component.html',
  styleUrl: './role-rights.component.scss',
})
export class RoleRightsComponent {
  availableRights = input<RoleRight[]>(ROLE_RIGHTS);

  isShowDropdown$$ = signal(false);
  isRightsVisible$$ = signal(true);

  rights = signal<RoleRight[]>(ROLE_RIGHTS);
  selectedRights$$ = signal<RoleRight[]>([]);

  selectedRightsCount = computed(() => this.selectedRights$$().length);
  toggleButtonLabel = computed(() => this.isRightsVisible$$() ? 'Скрыть' : 'Показать');


  protected chipsConfig = signal({
    removeIcon: {
      color: '{blue.500}',
      size: '18px'
    }
  });

  protected multiSelectConfig = signal({
    option: {
      selectedColor: '{blue.500}',
      selectedFocusBackground: '{blue.50}'
    }
  });

  constructor() {
    effect(() => {
      console.log('Selected rights:', this.selectedRights$$());
    });
  }

  public getSelectedRightIds() {
    return this.selectedRights$$().map(right => right.id);
  }

  setSelectedRights(ids: number[]) {
    if (!ids.length) {
      this.selectedRights$$.set([]);
      return;
    }

    const selectedRights = this.availableRights().filter(right =>
      ids.includes(right.id)
    );

    this.selectedRights$$.set(selectedRights);
  }

  protected toggleRightsVisibility() {
    this.isRightsVisible$$.update(visible => !visible);
  }

  protected addRights() {
    this.isShowDropdown$$.update(() => true);
  }

  protected removeRight(removed: RoleRight) {
    this.selectedRights$$.update(rights =>
      rights.filter(right => right.id !== removed.id))
  }
}
