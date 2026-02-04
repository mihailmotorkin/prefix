import { Component, input, model, output } from '@angular/core';
import { AutoCompleteCompleteEvent } from "primeng/autocomplete";
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';

export interface AutocompleteItem {
  [key: string]: any;
}

@Component({
  selector: 'prefix-autocomplete',
  imports: [
    AutoCompleteModule,
    FormsModule
  ],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
})
export class AutocompleteComponent {
  placeholder = input<string>();
  optionLabel = input<string>('name');
  suggestions = input<AutocompleteItem[]>([]);

  onSearch = output<string>();

  selectedItem = model<AutocompleteItem | null>(null);

  pt = {
    pcInputText: {
      root: {
        style: {
          background: '#FFFFFF',
        }
      }
    }
  }

  search(event: AutoCompleteCompleteEvent) {
    this.onSearch.emit(event.query);
  }
}
