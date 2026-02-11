import { Role, RoleRight } from '#domains/roles/roles.model';

export const ROLES: Role[] = [
  { id: 1, name: 'Роль 1' },
  { id: 2, name: 'Роль 2' },
  { id: 3, name: 'Роль 3' },
]

export const ROLE_RIGHTS: RoleRight[] = [
  {
    id: 1,
    name: 'Редактирование абонентов'
  },
  {
    id: 2,
    name: 'Просмотр справочников улиц'
  },
  {
    id: 3,
    name: 'Редактирование справочников улиц'
  },
  {
    id: 4,
    name: 'Просмотр и редактирование CRUDa шаблонов заданий и автоматичсеких'
  }
]
