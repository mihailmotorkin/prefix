import { Component, input, output } from '@angular/core';
import { Button, ButtonSeverity } from 'primeng/button';

@Component({
  selector: 'prefix-icon-button',
  imports: [
    Button
  ],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.scss',
})
export class IconButtonComponent {
  icon = input.required<string>();
  severity = input<ButtonSeverity>('info');

  action = output<void>();

  protected handleClick() {
    this.action.emit();
  }
}
