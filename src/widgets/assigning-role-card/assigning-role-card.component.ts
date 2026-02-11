import { Component, effect, inject, input, OnInit, output, signal } from '@angular/core';
import { TagComponent } from '#shared/components/tag/tag.component';
import { Button } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { AutocompleteComponent } from '#shared';
import { Firm, Role, RoleAssignmentData } from '#domains/role-assignment/role-assignment.model';
import { ReferenceDataService } from '#shared/services/reference-data.service';

@Component({
  selector: 'prefix-assigning-role-card',
  imports: [
    TagComponent,
    Button,
    MultiSelectModule,
    CheckboxModule,
    FormsModule,
    AutocompleteComponent
  ],
  templateUrl: './assigning-role-card.component.html',
  styleUrl: './assigning-role-card.component.scss',
})
export class AssigningRoleCardComponent implements OnInit {
  private referenceService = inject(ReferenceDataService);
  // Входные данные
  assignment = input<RoleAssignmentData  | null>(null); // Для существующих назначений
  availableRoles = input<Role[]>([]); // Для новой роли
  availableFirms = input<Firm[]>([]); // Все доступные филиалы
  isEditMode = input<boolean>(false); // Режим редактирования/создания

  // Выходные события
  onSave = output<Partial<RoleAssignmentData>>();
  onCancel = output<void>();
  onDelete = output<RoleAssignmentData>();
  onEdit = output<number>(); // Передаем ID назначения

  // Suggestions для автокомплита
  readonly roleSuggestions$$ = this.referenceService.roleSuggestions$$;

  // Локальное состояние для редактирования
  selectedRole$$ = signal<Role | null>(null);
  selectedFirms$$ = signal<Firm[]>([]);
  isGlobal$$ = signal<boolean>(false);

  constructor() {
    // Инициализация состояния при изменении assignment или isEditMode
    effect(() => {
      const assignment = this.assignment();
      const editMode = this.isEditMode();

      if (assignment && editMode) {
        // Редактирование существующего назначения
        this.selectedRole$$.set(assignment.role);
        this.selectedFirms$$.set(assignment.firms || []);
        this.isGlobal$$.set(assignment.is_global);
      } else if (!assignment && editMode) {
        // Создание нового назначения - по умолчанию глобальная роль
        this.selectedRole$$.set(null);
        this.selectedFirms$$.set([]);
        this.isGlobal$$.set(true);
      }
    });
  }

  ngOnInit() {
    console.log('INIT', this.assignment());
  }

  /* ====== COMPUTED HELPERS ====== */

  get isSaveDisabled(): boolean {
    const hasRole = this.selectedRole$$() !== null;
    const isGlobal = this.isGlobal$$();
    const hasFirms = this.selectedFirms$$().length > 0;

    return !hasRole || (!isGlobal && !hasFirms);
  }

  get displayFirms(): Firm[] {
    return this.assignment()?.firms || [];
  }

  get displayRoleName(): string {
    return this.assignment()?.role?.name || '';
  }

  get isGlobalRole(): boolean {
    return this.assignment()?.is_global || false;
  }

  handleRoleSearch(query: string) {
    this.referenceService.setRoleAutocompleteQuery(query);
  }

  onGlobalChange(isGlobal: boolean) {
    this.isGlobal$$.set(isGlobal);
    if (isGlobal) {
      this.selectedFirms$$.set([]);
    }
  }

  handleEdit() {
    const assignment = this.assignment();
    if (assignment) {
      this.onEdit.emit(assignment.id);
    }
  }

  handleDelete(): void {
    const assignment = this.assignment();
    if (assignment) {
      this.onDelete.emit(assignment);
    }
  }

  handleSave(): void {
    const role = this.selectedRole$$();

    if (!role) {
      console.warn('Роль не выбрана');
      return;
    }

    const isGlobal = this.isGlobal$$();
    const firms = this.selectedFirms$$();

    if (!isGlobal && firms.length === 0) {
      console.warn('Выберите филиалы или установите "Глобально"');
      return;
    }

    const partialAssignment: Partial<RoleAssignmentData> = {
      id: this.assignment()?.id,
      role: role,
      firms: isGlobal ? [] : firms,
      is_global: isGlobal
    };

    this.onSave.emit(partialAssignment);
  }

  handleCancel(): void {
    this.onCancel.emit();
  }

}
