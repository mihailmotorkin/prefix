import { Component, computed, inject } from '@angular/core';
import { LayoutHeaderComponent } from '#shared/layout-header/layout-header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RoleFormComponent } from '#widgets/roles/role-form';

@Component({
  selector: 'prefix-role-edit',
  imports: [
    LayoutHeaderComponent,
    ReactiveFormsModule,
    RoleFormComponent
  ],
  templateUrl: './role-edit.component.html',
  styleUrl: './role-edit.component.scss',
})
export class RoleEditComponent {
  private route = inject(ActivatedRoute);

  protected readonly roleId = computed(() => Number(this.route.snapshot.paramMap.get('id')));
}
