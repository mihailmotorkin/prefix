import { Component, output } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'prefix-role-save',
  imports: [
    Button
  ],
  templateUrl: './role-save.component.html',
  styleUrl: './role-save.component.scss',
})
export class RoleSaveComponent {
  submit = output<void>();

  protected save() {
    this.submit.emit();
  }
}
