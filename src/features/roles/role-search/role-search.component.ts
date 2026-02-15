import { Component } from '@angular/core';
import { AutocompleteComponent } from "#shared";

@Component({
  selector: 'prefix-role-search',
    imports: [
        AutocompleteComponent
    ],
  templateUrl: './role-search.component.html',
  styleUrl: './role-search.component.scss',
})
export class RoleSearchComponent {

}
