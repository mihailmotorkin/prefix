import { Component, input } from '@angular/core';
import { Button } from "primeng/button";

@Component({
  selector: 'prefix-layout-header',
    imports: [
        Button
    ],
  templateUrl: './layout-header.component.html',
  styleUrl: './layout-header.component.scss',
})
export class LayoutHeaderComponent {
  title = input<string>('');
}
