import {Component, inject, input, output} from '@angular/core';
import { Button } from "primeng/button";
import {Router} from '@angular/router';

@Component({
  selector: 'prefix-layout-header',
    imports: [
        Button
    ],
  templateUrl: './layout-header.component.html',
  styleUrl: './layout-header.component.scss',
})
export class LayoutHeaderComponent {
  close = output()

  title = input<string>('');

  exit() {
    this.close.emit();
  }
}
