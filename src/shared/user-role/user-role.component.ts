import { Component, input, signal } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { Button } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';

interface User {
  id: number;
  name: string;
  role: string
}

@Component({
  selector: 'prefix-user-role',
  imports: [ToolbarModule, Button, FormsModule, InputText],
  templateUrl: './user-role.component.html',
  styleUrl: './user-role.component.scss',
})
export class UserRoleComponent {
  user = input<User>();

  isEditMode = signal(false);
  userRole$$ = signal<string>('')


  editRole() {
    console.log('edit role');
    this.isEditMode.update(() => true);
  }

  saveRole() {
    console.log('save role');
    this.isEditMode.update(() => false);
  }
}
