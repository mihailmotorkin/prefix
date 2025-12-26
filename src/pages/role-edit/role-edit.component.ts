import { Component } from '@angular/core';
import { LayoutHeaderComponent } from '#shared/layout-header/layout-header.component';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import {UserRightsComponent} from '#shared/user-rights/user-rights.component';

@Component({
  selector: 'prefix-role-edit',
  imports: [
    LayoutHeaderComponent,
    InputText,
    Textarea,
    ReactiveFormsModule,
    Button,
    UserRightsComponent
  ],
  templateUrl: './role-edit.component.html',
  styleUrl: './role-edit.component.scss',
})
export class RoleEditComponent {
  userRoleForm = new FormGroup({
    roleId: new FormControl(''),
    roleName: new FormControl(''),
    roleDescription: new FormControl('')
  });
}
