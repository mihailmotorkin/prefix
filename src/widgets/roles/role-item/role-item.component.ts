import { Component, computed, effect, ElementRef, input, output, signal, viewChild } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { Button } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Role } from '#domains/roles/roles.model';

@Component({
  selector: 'prefix-role-item',
  imports: [ToolbarModule, Button, FormsModule, InputText],
  templateUrl: './role-item.component.html',
  styleUrl: './role-item.component.scss',
})
export class RoleItemComponent {
  role = input.required<Role>();
  edit = output();
  remove = output();
  rename = output<string>();

  roleInput = viewChild<ElementRef<HTMLInputElement>>('roleInput');

  isEditMode = signal(false);
  editableRoleName = signal<string>('');

  inputRoleConfig = computed(() => ({
    root: {
      borderColor: this.isEditMode() ? '{primary.color}' : 'transparent',
      hoverBorderColor: this.isEditMode() ? '{primary.color}' : 'transparent',
      focusBorderColor: '{primary.color}',
      shadow: 'none',
      cursor: this.isEditMode() ? 'text' : 'pointer',
    },
  }));

  constructor() {
    effect(() => {
      if (!this.isEditMode()) {
        this.editableRoleName.set(this.role().name);
      }
    });
  }

  editRoleTitle() {
    console.log('edit role');
    this.isEditMode.update(() => true);
    this.roleInput()?.nativeElement.focus();
  }

  editRole() {
    this.edit.emit();
  }

  removeRole() {
    this.remove.emit();
  }

  saveRole() {
    const newRoleName = this.editableRoleName().trim();
    const currentRoleName = this.role().name;

    if (!newRoleName || newRoleName === currentRoleName) {
      this.editableRoleName.set(currentRoleName);
      this.isEditMode.set(false);
      return;
    }

    this.rename.emit(newRoleName);
    this.isEditMode.set(false);
  }
}
