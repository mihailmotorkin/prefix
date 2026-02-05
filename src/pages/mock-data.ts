import { AdminRoleDto, Firm, Right, Role, User } from '#pages/model';

export const USERS: User[] = [
  { id: 1, name: 'Иванов Иван Иванович' },
  { id: 2, name: 'Зайчик Леся Олеговна' },
  { id: 3, name: 'Зайцев Риф Рахимович' },
  { id: 4, name: 'Зайцев Родион Родионович' },
  { id: 5, name: 'Займер Роман Павлович' },
  { id: 6, name: 'Пигус Павел Романович' },
];

export const FIRMS: Firm[] = [
  { id: 1, name: 'РК Север' },
  { id: 2, name: 'РК Юг' },
  { id: 3, name: 'РК Запад' },
  { id: 4, name: 'Филиал 1' },
  { id: 5, name: 'Филиал 2' },
  { id: 6, name: 'Телеком Сервис' }
];

export const RIGHTS: Right[] = [
  { id: 1, name: 'Просмотр пользователей', tag: 'users' },
  { id: 2, name: 'Создание пользователей', tag: 'users' },
  { id: 3, name: 'Редактирование пользователей', tag: 'users' },
  { id: 10, name: 'Просмотр ролей', tag: 'roles' },
  { id: 11, name: 'Создание ролей', tag: 'roles' },
  { id: 20, name: 'Просмотр отчетов', tag: 'reports' }
];

export const ROLES: Role[] = [
  {
    id: 1,
    name: 'Администратор ЕРП',
    description: 'Полный доступ к системе'
  },
  {
    id: 2,
    name: 'Бухгалтер',
    description: 'Финансовый учет и отчеты'
  },
  {
    id: 3,
    name: 'Кладовщик',
    description: 'Управление складскими операциями'
  },
  {
    id: 4,
    name: 'Архивариус',
    description: 'Управление архивом'
  },
  {
    id: 5,
    name: 'Диспетчер',
    description: 'Управление операциями'
  },
  {
    id: 6,
    name: 'Администратор серверов',
    description: 'Управление серверами'
  },
  {
    id: 7,
    name: 'Маркетолог',
    description: 'Маркетинг и реклама'
  },
  {
    id: 8,
    name: 'Кассир',
    description: 'Кассовые операции'
  }
];

export const ADMIN_ROLES: AdminRoleDto[] = [
  {
    id: 101,
    user: { id: 1, name: 'Иванов Иван Иванович' },
    roles: [
      { id: 6, name: 'Администратор серверов' },
      { id: 1, name: 'Администратор ЕРП' },
    ],
    firms: [
      { id: 1, name: 'РК Север' },
      { id: 2, name: 'РК Юг' }
    ],
    isGlobal: false
  },
  {
    id: 102,
    user: { id: 2, name: 'Зайчик Леся Олеговна' },
    roles: [
      { id: 5, name: 'Диспетчер' },
      { id: 7, name: 'Маркетолог' },
    ],
    firms: [{ id: 4, name: 'Филиал 1' }],
    isGlobal: false
  },
  {
    id: 103,
    user: { id: 3, name: 'Зайцев Риф Рахимович' },
    roles: [
      { id: 8, name: 'Кассир' },
      { id: 2, name: 'Бухгалтер' },
    ],
    firms: [
      { id: 4, name: 'Филиал 1' },
      { id: 5, name: 'Филиал 2' }
    ],
    isGlobal: false
  },
  {
    id: 104,
    user: { id: 4, name: 'Зайцев Родион Родионович' },
    roles: [
      { id: 5, name: 'Диспетчер' },
      { id: 2, name: 'Бухгалтер' },
    ],
    firms: [{ id: 4, name: 'Филиал 1' }],
    isGlobal: false
  },
  {
    id: 105,
    user: { id: 5, name: 'Займер Роман Павлович' },
    roles: [{ id: 5, name: 'Диспетчер' }],
    firms: [],
    isGlobal: true
  },
  {
    id: 106,
    user: { id: 6, name: 'Пигус Павел Романович' },
    roles: [{ id: 2, name: 'Бухгалтер' }],
    firms: [],
    isGlobal: true
  }
];
