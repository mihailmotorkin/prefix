import { Component, input, output } from '@angular/core';
import { TagComponent } from '#shared/tag/tag.component';

interface User {
  id: number;
  name: string;
  branchOffices?: BranchOffice[] | null;
  roles?: Role[] | null;
}

interface Role {
  id: number;
  name: string;
}

interface BranchOffice {
  id: number;
  name: string;
}

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
  user = input.required<User>();
  onCardClick = output<User>();

  handleClick() {
    this.onCardClick.emit(this.user());
  }
}
