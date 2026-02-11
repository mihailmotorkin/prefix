import { Component, signal } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SearchInputComponent } from '#shared/components/search-input/search-input.component';

interface MenuItem {
  label: string;
  icon: string;
  routerLink?: string;
  items?: MenuItem[];
}

@Component({
  selector: 'prefix-sidebar',
  imports: [
    IconFieldModule,
    InputIconModule,
    PanelMenuModule,
    SearchInputComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  panelItemStyle$$ = signal({
    root: {
      gap: 0
    },
    panel: {
      borderWidth: 0,
      first: {
        borderWidth: 0
      },
      last: {
        borderWidth: 0
      }
    }
  });

  items: MenuItem[] = [
    {
      label: 'Пользователи',
      icon: 'pi pi-user',
      items: [{
        label: 'kek',
        icon: 'pi pi-user'
      }]
    },
    {
      label: 'Справочники',
      icon: 'pi pi-copy',
      items: [
        {
          label: 'pupupu',
          icon: 'pi pi-copy'
        }
      ]
    },
    {
      label: 'Задания',
      icon: 'pi pi-check-square'
    },
    {
      label: 'Финансы',
      icon: 'pi pi-wallet'
    },
    {
      label: 'Склад',
      icon: 'pi pi-box'
    },
    {
      label: 'Кадры',
      icon: 'pi pi-users'
    },
    {
      label: 'Администрирование',
      icon: 'pi pi-cog'
    },
    {
      label: 'Схема сети',
      icon: 'pi pi-sitemap'
    },
    {
      label: 'Отчеты',
      icon: 'pi pi-book'
    },
    {
      label: 'Настройки',
      icon: 'pi pi-cog'
    },
    {
      label: 'Выход',
      icon: 'pi pi-sign-out'
    }
  ]
}
