import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { LayoutHeaderComponent } from '#shared/layout-header/layout-header.component';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from 'primeng/button';
import { ActivatedRoute, Router } from '@angular/router';
import { RolesService } from '#domains/roles/roles.service';
import { RoleRightsComponent } from '#widgets/roles/role-rights';
import { UpdateRoleDto } from '#domains/roles/roles-dto/update-role.model';

interface RoleFormValue {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'prefix-role-edit',
  imports: [
    LayoutHeaderComponent,
    InputText,
    Textarea,
    ReactiveFormsModule,
    Button,
    RoleRightsComponent
  ],
  templateUrl: './role-edit.component.html',
  styleUrl: './role-edit.component.scss',
})
export class RoleEditComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private service = inject(RolesService);

  protected readonly rightsComponent = viewChild<RoleRightsComponent>('rights');

  protected readonly roleId = signal<number>(0);

  form = new FormGroup({
    id: new FormControl<number>(0, { nonNullable: true }),
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true })
  });

  ngOnInit() {
    this.roleId.set(Number(this.route.snapshot.paramMap.get('id')));
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
