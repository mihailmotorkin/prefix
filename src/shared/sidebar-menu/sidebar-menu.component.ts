import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar-menu',
  imports: [CommonModule, PanelMenuModule, RouterModule],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.scss',
})
export class SidebarMenuComponent {
  @Input() items: MenuItem[] = [];
  @Input() multiple: boolean = false;
  @Input() style: any = {};
  @Input() styleClass: string = '';
  @Input() tabindex: number = 0;
  @Input() transitionOptions: string = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
  @Input() chevronPosition: 'left' | 'right' = 'left';

  getStyleClass(): string {
    const classes = [this.styleClass];
    if (this.chevronPosition === 'right') {
      classes.push('chevron-right-menu');
    }
    return classes.filter(c => c).join(' ');
  }
}
