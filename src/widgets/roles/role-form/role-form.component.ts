import { Component, inject, input, OnInit, viewChild } from '@angular/core';
import { InputText } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoleRightsComponent } from '#widgets/roles/role-rights';
import { Textarea } from 'primeng/textarea';
import { UpdateRoleDto } from '#domains/roles/roles.model';
import { Router } from '@angular/router';
import { RolesService } from '#domains/roles/roles.service';
import { RoleSaveComponent } from '#features/roles/role-save';

@Component({
  selector: 'prefix-role-form',
  imports: [
    InputText,
    ReactiveFormsModule,
    RoleRightsComponent,
    Textarea,
    RoleSaveComponent
  ],
  templateUrl: './role-form.component.html',
  styleUrl: './role-form.component.scss',
})
export class RoleFormComponent implements OnInit {
  private router = inject(Router);
  private service = inject(RolesService);

  protected readonly rightsComponent = viewChild<RoleRightsComponent>('rights');

  roleId = input.required<number>();

  form = new FormGroup({
    id: new FormControl<number>(0, { nonNullable: true }),
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true })
  });

  ngOnInit() {
    this.loadRole(this.roleId());
  }

  private loadRole(roleId: number) {
    const role = this.service.getRoleById(roleId);

    if (!role) {
      return;
    }

    this.form.patchValue({
      id: role.id,
      name: role.name,
      description: role.description
    });

    const rightIds = role.rights?.map(right => right.id) ?? [];
    this.rightsComponent()?.setSelectedRights(rightIds);
  }

  protected save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
      return;
    }

    const updateDto = this.buildUpdateDto();
    this.service.updateRoleRights(updateDto);
    this.navigateToRolesList();
  }

  private buildUpdateDto(): UpdateRoleDto {
    const formValue = this.form.getRawValue();
    const rightIds = this.rightsComponent()!.getSelectedRightIds();

    return {
      id: this.roleId(),
      name: formValue.name,
      description: formValue.description,
      right_ids: rightIds
    };
  }

  private navigateToRolesList(): void {
    this.router.navigate(['/roles']);
  }

}
