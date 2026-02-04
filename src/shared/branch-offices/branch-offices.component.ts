import { Component, signal, viewChild } from '@angular/core';
import { Select } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';

interface Branch {
  id: string;
  name: string;
  badge?: string;
}

@Component({
  selector: 'prefix-branch-offices',
  imports: [
    Select,
    RadioButtonModule,
    FormsModule,
    Button
  ],
  templateUrl: './branch-offices.component.html',
  styleUrl: './branch-offices.component.scss',
})
export class BranchOfficesComponent {
  selectComponent = viewChild<Select>('selectComponent');

  branches$$ = signal<Branch[]>([
    { id: '1', name: 'Русская Компания Север', badge: 'Текущий' },
    { id: '2', name: 'Русская Компания Юг' },
    { id: '3', name: 'Русская Компания Восток' }
  ]);

  currentBranch$$ = signal<Branch>(this.branches$$()[0]);

  tempSelectedBranch: Branch = this.currentBranch$$();

  applyBranch() {
    this.currentBranch$$.set(this.tempSelectedBranch);
    this.selectComponent()?.hide();
  }
}
