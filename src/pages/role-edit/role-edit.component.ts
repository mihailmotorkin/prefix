import {Component, inject, OnInit, viewChild} from '@angular/core';
import { LayoutHeaderComponent } from '#shared/layout-header/layout-header.component';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import {UserRightsComponent} from '#shared/user-rights/user-rights.component';
import {Router} from '@angular/router';

interface RoleFormData {
  roleId: string;
  roleName: string;
  roleDescription: string;
  rights: number[];
}

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
export class RoleEditComponent implements OnInit {
  private router = inject(Router);

  userRightComponent = viewChild<UserRightsComponent>('userRights');

  userRoleForm = new FormGroup({
    roleId: new FormControl<string>(''),
    roleName: new FormControl<string>(''),
    roleDescription: new FormControl<string>('')
  });

  ngOnInit() {
    this.loadRoleData();
  }

  private loadRoleData() {
    // Пример загрузки данных
    const existingRole = {
      roleId: '235345',
      roleName: 'Роль 11',
      roleDescription: 'В своём стремлении улучшить пользовательский опыт мы упускаем, что сторонники тоталитаризма в науке могут быть ограничены исключительно образом мышления. Имеется спорная точка зрения, гласящая примерно следующее: ключевые особенности структуры проекта'
    };

    this.userRoleForm.patchValue(existingRole);
  }

  protected save() {
    if (this.userRoleForm.invalid) {
      this.userRoleForm.markAllAsTouched();
      return;
    }

    const selectedRights = this.userRightComponent()?.getSelectedRightIds() || [];

    const formData: RoleFormData = {
      ...this.userRoleForm.value as Omit<RoleFormData, 'rights'>,
      rights: selectedRights
    };

    console.log('Сохраняем данные роли:', formData);

    this.router.navigate(['/roles'])
  }

  protected close() {
    this.router.navigate(['/roles']);
    console.log('Navigate to Roles!');
  }
}
