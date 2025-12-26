import {Component, signal} from '@angular/core';
import {Button} from 'primeng/button';
import {Chip} from 'primeng/chip';

interface Right {
  id: number;
  label: string;
}

@Component({
  selector: 'prefix-user-rights',
  imports: [
    Button,
    Chip
  ],
  templateUrl: './user-rights.component.html',
  styleUrl: './user-rights.component.scss',
})
export class UserRightsComponent {
  protected rights: Right[] = [
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
  ];

  protected chipsConfig = signal({
    removeIcon: {
      color: '{blue.500}',
      size: '18px'
    }
  });

  protected addNewRight() {
    this.rights.push({
      id: this.rights.length + 1,
      label: 'Новые права'
    })
  }

}
