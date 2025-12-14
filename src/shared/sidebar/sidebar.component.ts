import { Component } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PanelMenuModule } from 'primeng/panelmenu';
import { InputText } from 'primeng/inputtext';
import { SidebarMenuComponent } from '#shared/sidebar-menu/sidebar-menu.component';

interface MenuItem {
  label: string;
  icon: string;
  items?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  imports: [IconFieldModule, InputIconModule, InputText, PanelMenuModule, SidebarMenuComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  items: MenuItem[] = [
    {
      label: 'Пользователи',
      icon: 'pi pi-user',
      items: [{
        label: 'lasas',
        icon: 'pi pi-user'
      }]
    },
    {
      label: 'Справочники',
      icon: 'pi pi-copy'
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
