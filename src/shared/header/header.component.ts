import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { BranchOfficesComponent } from '#shared/branch-offices/branch-offices.component';

@Component({
  selector: 'prefix-header',
  imports: [ButtonModule, BranchOfficesComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  toggleSidebar() {
    console.log('toggle sidebar');
  }
}
