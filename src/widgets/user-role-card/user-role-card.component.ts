import { Component, input, output } from '@angular/core';
import { TagComponent } from '#shared/components/tag/tag.component';
import { AdminData } from '#domains/role-assignment/role-assignment.model';

@Component({
  selector: 'prefix-user-role-card',
  imports: [
    TagComponent
  ],
  templateUrl: './user-role-card.component.html',
  styleUrl: './user-role-card.component.scss',
  host: {
    '(click)': 'handleClick()',
    '[class.clickable]': 'true'
  }
})
export class UserRoleCardComponent {
  admin = input.required<AdminData>();
  onCardClick = output<number>();

  handleClick() {
    this.onCardClick.emit(this.admin().admin.id);
  }
}
