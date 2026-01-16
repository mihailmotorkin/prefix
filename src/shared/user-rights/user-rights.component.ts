import { Component, computed, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { Chip } from 'primeng/chip';
import { FormsModule } from '@angular/forms';
import { MultiSelect } from 'primeng/multiselect';

interface Right {
  id: number;
  label: string;
}

@Component({
  selector: 'prefix-user-rights',
  imports: [
    Button,
    Chip,
    FormsModule,
    MultiSelect
  ],
  templateUrl: './user-rights.component.html',
  styleUrl: './user-rights.component.scss',
})
export class UserRightsComponent {
  isShowDropdown$$ = signal(false);
  isRightsVisible$$ = signal(true);

  selectedRights$$ = signal<Right[]>([]);

  selectedRightsCount = computed(() => this.selectedRights$$().length);
  toggleButtonLabel = computed(() => this.isRightsVisible$$() ? 'Скрыть' : 'Показать');

  rights = signal<Right[]>([
    {
      id: 1,
      label: 'Редактирование абонентов'
    },
    {
      id: 2,
      label: 'Просмотр справочников улиц'
    },
    {
      id: 3,
      label: 'Редактирование справочников улиц'
    },
    {
      id: 4,
      label: 'Просмотр и редактирование CRUDa шаблонов заданий и автоматичсеких'
    }
  ]);

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

  public getSelectedRightIds(): number[] {
    return this.selectedRights$$().map(right => right.id);
  }

  protected toggleRightsVisibility() {
    this.isRightsVisible$$.update(visible => !visible);
  }

  protected addRights() {
    this.isShowDropdown$$.update(() => true);
  }

  protected removeRight(removed: Right) {
    this.selectedRights$$.update(rights =>
      rights.filter(right => right.id !== removed.id))
  }
}
