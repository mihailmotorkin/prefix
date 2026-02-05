import { Component, input, output } from '@angular/core';
import { TagComponent } from '#shared/tag/tag.component';
import { AdminRoleDto } from '#pages/model';

@Component({
  selector: 'prefix-staffer-role-card',
  imports: [
    TagComponent
  ],
  templateUrl: './staffer-role-card.component.html',
  styleUrl: './staffer-role-card.component.scss',
  host: {
    '(click)': 'handleClick()',
    '[class.clickable]': 'true'
  }
})
export class StafferRoleCardComponent {
  adminRole = input.required<AdminRoleDto>();
  onCardClick = output<number>();

  handleClick() {
    this.onCardClick.emit(this.adminRole().user.id);
  }
}
