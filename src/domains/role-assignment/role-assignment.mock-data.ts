import {
  Firm,
  Role,
  GetAdminsListResponse,
  GetAdminRolesResponse,
  AssignRoleResponse,
  UpdateRoleAssignmentResponse
} from './role-assignment.model';

// Моковые данные для филиалов
export const mockFirms: Firm[] = [
  { id: 1, name: 'РК Север' },
  { id: 2, name: 'РК Юг' },
  { id: 3, name: 'РК Запад' },
  { id: 4, name: 'Филиал 1' },
  { id: 5, name: 'Филиал 2' },
  { id: 6, name: 'Филиал 3' },
  { id: 7, name: 'Филиал 4' },
  { id: 8, name: 'Филиал 5' },
  { id: 9, name: 'Телеком Сервис' },
];

// Моковые данные для ролей
export const mockRoles: Role[] = [
  { role_id: 1, name: 'Администратор ЕРП', description: 'Полный доступ к системе' },
  { role_id: 2, name: 'Администратор Серверов', description: 'Управление серверами' },
  { role_id: 3, name: 'Архивариус', description: 'Работа с архивом' },
  { role_id: 4, name: 'Бухгалтер', description: 'Ведение бухгалтерии' },
  { role_id: 5, name: 'Суперкладовщик', description: 'Управление складом' },
  { role_id: 6, name: 'Кладовщик', description: 'Работа со складом' },
  { role_id: 7, name: 'Учетчик', description: 'Учет товаров' },
  { role_id: 8, name: 'Диспетчер', description: 'Диспетчерская служба' },
  { role_id: 9, name: 'Кассир', description: 'Работа с кассой' },
  { role_id: 10, name: 'Маркетолог', description: 'Маркетинг' },
  { role_id: 11, name: 'Финансист', description: 'Финансовый учет' },
];

// Моковые данные для списка администраторов (1)
export const mockAdminsList: GetAdminsListResponse = [
  {
    admin: { id: 10, name: 'Зайцев Родион Родионович' },
    firms: [{ id: 1, name: 'РК Север' }],
    roles: [
      { id: 101, role_id: 2, name: 'Администратор Серверов' },
    ],
  },
  {
    admin: { id: 90, name: 'Зайчик Леся Олеговна' },
    firms: [{ id: 1, name: 'РК Север' }],
    roles: [
      { id: 102, role_id: 2, name: 'Администратор Серверов' },
    ],
  },
  {
    admin: { id: 90, name: 'Зайцев Риф Рахимович' },
    firms: [{ id: 1, name: 'РК Север' }],
    roles: [
      { id: 103, role_id: 3, name: 'Архивариус' },
    ],
  },
  {
    admin: { id: 90, name: 'Займер Роман Павлович' },
    firms: [{ id: 1, name: 'РК Север' }],
    roles: [
      { id: 104, role_id: 6, name: 'Кладовщик' },
      { id: 105, role_id: 7, name: 'Учетчик' },
      { id: 106, role_id: 8, name: 'Диспетчер' },
    ],
  },
  {
    admin: { id: 300, name: 'Сергеев Сергей Сергеевич' },
    firms: [
      { id: 1, name: 'РК Север' },
      { id: 5, name: 'Филиал 2' },
      { id: 4, name: 'Филиал 4' },
      { id: 8, name: 'Филиал 5' },
    ],
    roles: [
      { id: 107, role_id: 9, name: 'Кассир' },
      { id: 108, role_id: 10, name: 'Маркетолог' },
      { id: 109, role_id: 11, name: 'Финансист' },
    ],
  },
  {
    admin: { id: 120, name: 'Антонов Антон Антонович' },
    firms: [],
    roles: [],
  },
];

// Моковые данные для ролей администратора (4)
export const mockAdminRoles: GetAdminRolesResponse = [
  {
    id: 201,
    is_global: false,
    firms: [
      { id: 1, name: 'РК Север' },
      { id: 2, name: 'РК Юг' },
      { id: 9, name: 'Телеком Сервис' },
    ],
    role: {
      role_id: 1,
      name: 'Администратор ЕРП',
      description: 'Полный доступ к системе',
    },
  },
  {
    id: 202,
    is_global: false,
    firms: [{ id: 4, name: 'Филиал 1' }],
    role: {
      role_id: 4,
      name: 'Бухгалтер',
      description: 'Ведение бухгалтерии',
    },
  },
  {
    id: 203,
    is_global: false,
    firms: [
      { id: 2, name: 'РК Юг' },
      { id: 4, name: 'Филиал 1' },
    ],
    role: {
      role_id: 5,
      name: 'Суперкладовщик',
      description: 'Управление складом',
    },
  },
];

// Моковые данные для назначения роли (2)
export const mockAssignRoleResponse: AssignRoleResponse = {
  id: 204,
  is_global: true,
  firms: [],
  role: {
    role_id: 1,
    name: 'Администратор ЕРП',
    description: 'Полный доступ к системе',
  },
};

// Моковые данные для обновления роли (5)
export const mockUpdateRoleResponse: UpdateRoleAssignmentResponse = {
  id: 201,
  is_global: false,
  firms: [
    { id: 1, name: 'РК Север' },
    { id: 2, name: 'РК Юг' },
    { id: 9, name: 'Телеком Сервис' },
  ],
  role: {
    role_id: 1,
    name: 'Администратор ЕРП',
    description: 'Полный доступ к системе',
  },
};
