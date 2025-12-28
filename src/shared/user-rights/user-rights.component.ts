import { Component, signal } from '@angular/core';
import {Button} from 'primeng/button';
import {Chip} from 'primeng/chip';
import { Checkbox } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';

interface Right {
  id: number;
  label: string;
}

@Component({
  selector: 'prefix-user-rights',
  imports: [
    Button,
    Chip,
    Checkbox,
    FormsModule,
    Select
  ],
  templateUrl: './user-rights.component.html',
  styleUrl: './user-rights.component.scss',
})
export class UserRightsComponent {
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

  selectedRights = signal<Right[]>([]);

  isSelected(right: Right): boolean {
    return this.selectedRights().includes(right);
  }

  toggleRight(right: any) {
    if (this.isSelected(right)) {
      this.selectedRights.update(() => this.selectedRights().filter(r => r !== right));
    } else {
      this.selectedRights.set(right);
    }
  }

  protected addNewRight() {
    this.rights().push({
      id: this.rights().length + 1,
      label: 'Новые права'
    })
  }

  protected hideAllRights() {
    console.log('hide all rights');
  }

}
