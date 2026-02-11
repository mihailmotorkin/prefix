import { AdminRoleInfo, AdminRoleAssignment, Firm, Right, Role, User } from './user-roles.model';

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
  { id: 1, name: 'Администратор ЕРП', description: 'Полный доступ к системе' },
  { id: 2, name: 'Бухгалтер', description: 'Финансовый учет и отчеты' },
  { id: 3, name: 'Кладовщик', description: 'Управление складскими операциями' },
  { id: 4, name: 'Архивариус', description: 'Управление архивом' },
  { id: 5, name: 'Диспетчер', description: 'Управление операциями' },
  { id: 6, name: 'Администратор серверов', description: 'Управление серверами' },
  { id: 7, name: 'Маркетолог', description: 'Маркетинг и реклама' },
  { id: 8, name: 'Кассир', description: 'Кассовые операции' }
];

// ✅ Данные для списка (GET /) - один объект на пользователя
export const ADMIN_ROLES_INFO: AdminRoleInfo[] = [
  {
    admin: { id: 1, name: 'Иванов Иван Иванович' },
    roles: [
      { id: 6, name: 'Администратор серверов' },
      { id: 1, name: 'Администратор ЕРП' },
    ],
    firms: [
      { id: 1, name: 'РК Север' },
      { id: 2, name: 'РК Юг' },
      { id: 6, name: 'Телеком Сервис' }
    ]
  },
  {
    admin: { id: 2, name: 'Зайчик Леся Олеговна' },
    roles: [
      { id: 5, name: 'Диспетчер' },
      { id: 7, name: 'Маркетолог' },
    ],
    firms: [
      { id: 4, name: 'Филиал 1' }
    ]
  },
  {
    admin: { id: 3, name: 'Зайцев Риф Рахимович' },
    roles: [
      { id: 8, name: 'Кассир' },
      { id: 2, name: 'Бухгалтер' },
    ],
    firms: [
      { id: 4, name: 'Филиал 1' },
      { id: 5, name: 'Филиал 2' }
    ]
  },
  {
    admin: { id: 4, name: 'Зайцев Родион Родионович' },
    roles: [
      { id: 5, name: 'Диспетчер' },
      { id: 2, name: 'Бухгалтер' },
    ],
    firms: [
      { id: 4, name: 'Филиал 1' }
    ]
  },
  {
    admin: { id: 5, name: 'Займер Роман Павлович' },
    roles: [
      { id: 5, name: 'Диспетчер' }
    ],
    firms: [] // Глобальная роль
  },
  {
    admin: { id: 6, name: 'Пигус Павел Романович' },
    roles: [
      { id: 2, name: 'Бухгалтер' }
    ],
    firms: [] // Глобальная роль
  }
];

// ✅ Данные для карточки пользователя (GET /:admin_id)
// Это детальная информация о назначениях ролей конкретного пользователя
export const ADMIN_ROLE_ASSIGNMENTS: Record<number, AdminRoleAssignment[]> = {
  // Иванов: Администратор ЕРП в РК Север, РК Юг, Телеком Сервис + Администратор серверов глобально
  1: [
    {
      id: 101,
      role: { id: 1, name: 'Администратор ЕРП', description: 'Полный доступ к системе' },
      firms: [
        { id: 1, name: 'РК Север' },
        { id: 2, name: 'РК Юг' },
        { id: 6, name: 'Телеком Сервис' }
      ],
      isGlobal: false
    },
    {
      id: 102,
      role: { id: 6, name: 'Администратор серверов', description: 'Управление серверами' },
      firms: [],
      isGlobal: true
    }
  ],

  // Зайчик Леся: Диспетчер и Маркетолог в Филиале 1
  2: [
    {
      id: 201,
      role: { id: 5, name: 'Диспетчер', description: 'Управление операциями' },
      firms: [{ id: 4, name: 'Филиал 1' }],
      isGlobal: false
    },
    {
      id: 202,
      role: { id: 7, name: 'Маркетолог', description: 'Маркетинг и реклама' },
      firms: [{ id: 4, name: 'Филиал 1' }],
      isGlobal: false
    }
  ],

  // Зайцев Риф: Кассир в Филиале 1, Бухгалтер в Филиале 2
  3: [
    {
      id: 301,
      role: { id: 8, name: 'Кассир', description: 'Кассовые операции' },
      firms: [{ id: 4, name: 'Филиал 1' }],
      isGlobal: false
    },
    {
      id: 302,
      role: { id: 2, name: 'Бухгалтер', description: 'Финансовый учет' },
      firms: [{ id: 5, name: 'Филиал 2' }],
      isGlobal: false
    }
  ],

  // Зайцев Родион: обе роли в Филиале 1
  4: [
    {
      id: 401,
      role: { id: 5, name: 'Диспетчер', description: 'Управление операциями' },
      firms: [{ id: 4, name: 'Филиал 1' }],
      isGlobal: false
    },
    {
      id: 402,
      role: { id: 2, name: 'Бухгалтер', description: 'Финансовый учет' },
      firms: [{ id: 4, name: 'Филиал 1' }],
      isGlobal: false
    }
  ],

  // Займер: глобальная роль
  5: [
    {
      id: 501,
      role: { id: 5, name: 'Диспетчер', description: 'Управление операциями' },
      firms: [],
      isGlobal: true
    }
  ],

  // Пигус: глобальная роль
  6: [
    {
      id: 601,
      role: { id: 2, name: 'Бухгалтер', description: 'Финансовый учет' },
      firms: [],
      isGlobal: true
    }
  ]
};
