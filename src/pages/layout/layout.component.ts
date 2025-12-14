import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent, HeaderComponent } from '#shared';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    SidebarComponent,
    HeaderComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {

}
