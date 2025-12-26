/*
### Компоненты PrimeNG для использования:

  1. **Input** (`pInputText`) - для ID и названия
2. **Textarea** (`pTextarea`) - для описания
3. **Chip** (`p-chip`) - для отображения выбранных прав
4. **Button** (`p-button`) - для действий
5. **Dialog** (`p-dialog`) - для выбора прав (открывается по кнопке "Добавить")

---

## 2. Архитектура (FSD + DDD)

### Структура файлов:

*/

/*
src/
├── app/
│   └── providers/
│       └── router/
│           └── routes.ts
│
├── pages/
│   ├── roles-list/                    # Страница списка ролей (1й скриншот)
│   │   ├── ui/
│   │   │   ├── roles-list.component.ts
│   │   │   ├── roles-list.component.html
│   │   │   └── roles-list.component.scss
│   │   └── model/
│   │       └── roles-list.store.ts
│   │
│   └── role-edit/                     # Страница редактирования роли (2й скриншот)
│       ├── ui/
│       │   ├── role-edit.component.ts
│       │   ├── role-edit.component.html
│       │   └── role-edit.component.scss
│       └── model/
│           └── role-edit.store.ts
│
├── widgets/
│   ├── role-list-item/                # Виджет для одного элемента списка ролей
│   │   ├── ui/
│   │   │   ├── role-list-item.component.ts
│   │   │   └── role-list-item.component.html
│   │   └── model/
│   │       └── role-list-item.model.ts
│   │
│   └── role-permissions-selector/     # Виджет для выбора прав
│       ├── ui/
│       │   ├── role-permissions-selector.component.ts
│       │   └── role-permissions-selector.component.html
│       └── model/
│           └── permissions-selector.store.ts
│
├── features/
│   ├── role/
│   │   ├── create-role/               # Feature: Создание роли
│   │   │   ├── ui/
│   │   │   │   └── create-role-button.component.ts
│   │   │   └── model/
│   │   │       └── create-role.service.ts
│   │   │
│   │   ├── edit-role/                 # Feature: Редактирование роли
│   │   │   ├── ui/
│   │   │   │   └── edit-role-form.component.ts
│   │   │   └── model/
│   │   │       └── edit-role.service.ts
│   │   │
│   │   └── delete-role/               # Feature: Удаление роли
│   │       ├── ui/
│   │       │   └── delete-role-button.component.ts
│   │       └── model/
│   │           └── delete-role.service.ts
│   │
│   └── permissions/
│       └── assign-permissions/        # Feature: Назначение прав
│           ├── ui/
│           │   └── assign-permissions-dialog.component.ts
│           └── model/
│               └── assign-permissions.service.ts
│
├── entities/
│   ├── role/                          # Domain Entity: Роль
│   │   ├── model/
│   │   │   ├── role.model.ts          # interface Role
│   │   │   ├── role.repository.ts     # abstract class RoleRepository
│   │   │   └── role.store.ts          # Store для управления состоянием ролей
│   │   ├── api/
│   │   │   └── role-api.service.ts    # HTTP запросы для ролей
│   │   └── ui/
│   │       └── role-card.component.ts # UI для отображения роли
│   │
│   └── permission/                    # Domain Entity: Право
│       ├── model/
│       │   ├── permission.model.ts
│       │   ├── permission.repository.ts
│       │   └── permission.store.ts
│       └── api/
│           └── permission-api.service.ts
│
└── shared/
    ├── ui/
    │   ├── editable-input/            # Переиспользуемый editable input
    │   │   └── editable-input.component.ts
    │   └── chip-list/                 # Список chips
    │       └── chip-list.component.ts
    └── lib/
        └── form-validators/
            └── role-validators.ts
*/
