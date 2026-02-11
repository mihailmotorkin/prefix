import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'prefix-paginator',
  imports: [
    Button,
    PaginatorModule
  ],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent {
  first = 0;
  rows = 10;
  totalRecords = 112;

  pt = {
    root: {
      style: {
        fontSize: '14px',
      }
    },
    pcRowPerPageDropdown: {
      root: {
        style: {
          height: '40px',
          marginLeft: '8px',
          backgroundColor: 'white',
          alignItems: 'center',
        }
      }
    },
    pages: {
      style: {
        border: 'var(--border)',
        borderRight: 'none',
      }
    },
    page: {
      style: {
        borderRight: 'var(--border)',
        width: '39px',
        height: '38px',
      }
    },
    first: {
      style: {
        border: 'var(--border)',
        borderRight: 'none',
        borderRadius: '4px 0 0 4px',
        height: '40px'
      }
    },
    prev: {
      style: {
        border: 'var(--border)',
        borderRight: 'none',
        height: '40px'
      }
    },
    next: {
      style: {
        border: 'var(--border)',
        borderLeft: 'none',
        height: '40px'
      }
    },
    last: {
      style: {
        border: 'var(--border)',
        borderLeft: 'none',
        borderRadius: '0 4px 4px 0',
        height: '40px'
      }
    }
  };


  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
  }

  showMore() {
    console.log('Show more clicked');
  }
}
