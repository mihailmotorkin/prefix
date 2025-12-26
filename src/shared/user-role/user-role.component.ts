import { Component, effect, ElementRef, input, output, signal, viewChild } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { Button } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';

interface User {
  id: number;
  name: string;
  role: string;
  description?: string;
}

@Component({
  selector: 'prefix-user-role',
  imports: [ToolbarModule, Button, FormsModule, InputText],
  templateUrl: './user-role.component.html',
  styleUrl: './user-role.component.scss',
})
export class UserRoleComponent {
  user = input<User>();
  onEdit = output();
  roleInput = viewChild<ElementRef<HTMLInputElement>>('roleInput');

  isEditMode = signal(false);
  editableRole = signal<string>('');

  inputRoleConfig = signal({
    root: {
      borderColor: 'transparent',
      hoverBorderColor: 'transparent',
      focusBorderColor: '{primary.color}',
      shadow: 'none',
      cursor: 'pointer'
    }
  });

  constructor() {
    effect(() => {
      const currentUser = this.user();
      if (currentUser && !this.isEditMode()) {
        this.editableRole.set(currentUser.role);
      }
    });

    effect(() => {
      if (this.isEditMode()) {
        this.inputRoleConfig.set({
          root: {
            borderColor: '{primary.color}',
            hoverBorderColor: '{primary.color}',
            focusBorderColor: '{primary.color}',
            shadow: 'none',
            cursor: 'text'
          }
        });
      } else {
        this.inputRoleConfig.set({
          root: {
            borderColor: 'transparent',
            hoverBorderColor: 'transparent',
            focusBorderColor: '{primary.color}',
            shadow: 'none',
            cursor: 'pointer'
          }
        });
      }
    })
  }

  editRoleTitle() {
    console.log('edit role');
    this.isEditMode.update(() => true);
    this.roleInput()?.nativeElement.focus();
  }

  editRole() {
    this.onEdit.emit();
  }

  saveRole() {
    console.log('save role');
    const newRole = this.editableRole();
    const currentUser = this.user();
    if (newRole && newRole !== currentUser?.role) {
      console.log('save role', newRole);
    } else {
      this.editableRole.set(currentUser!.role);
    }
    this.isEditMode.update(() => false);
  }
}
