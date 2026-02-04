import { Firm, Role, User } from '#pages/model';

export const users: User[] = [
  {
    "id": 1,
    "name": "Зайцев Родион Родионович",
    "firms": [
      { "id": 1, "name": "SevStar" },
      { "id": 2, "name": "Pentagon" }
    ],
    "roles": [
      { "id": 4, "name": "Администратор ЕРП" }
    ]
  },
  {
    "id": 2,
    "name": "Зайчик Леся Олеговна",
    "firms": [
      { "id": 3, "name": "РК Запад" },
      { "id": 4, "name": "РК Юг" }
    ],
    "roles": [
      { "id": 1, "name": "Кладовщик" },
      { "id": 2, "name": "Учетчик" }
    ]
  },
  {
    "id": 3,
    "name": "Зайцев Риф Рахимович",
    "firms": null,
    "roles": [
      { "id": 3, "name": "Диспетчер" }
    ]
  },
  {
    "id": 4,
    "name": "Займер Роман Павлович",
    "firms": [
      { "id": 4, "name": "Филиал 1" },
      { "id": 5, "name": "Филиал 2" }
    ],
    "roles": null
  },
  {
    "id": 5,
    "name": "Зайцева Мария Андреевна",
    "firms": [
      { "id": 6, "name": "Филиал 3" }
    ],
    "roles": [
      { "id": 6, "name": "Архивариус" }
    ]
  }
];

export const firms: Firm[] = [
  { "id": 1, "name": "РК Юг" },
  { "id": 2, "name": "РК Север" },
  { "id": 3, "name": "РК Запад" },
  { "id": 4, "name": "Филиал 1" },
  { "id": 5, "name": "Филиал 2" },
  { "id": 6, "name": "Филиал 3" }
];

export const roles: Role[] = [
  { "id": 1, "name": "Кладовщик" },
  { "id": 2, "name": "Учетчик" },
  { "id": 3, "name": "Диспетчер" },
  { "id": 4, "name": "Администратор ЕРП" },
  { "id": 5, "name": "Администратор Серверов" },
  { "id": 6, "name": "Архивариус" }
]

