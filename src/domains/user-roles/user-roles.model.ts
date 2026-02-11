export interface User {
  id: number;
  name: string;
}

export interface Role {
  id: number;
  name: string;
  description?: string;
  rights?: Right[];
}

export interface Right {
  id: number;
  name: string;
  tag?: string;
}

export interface Firm {
  id: number;
  name: string;
}

// Для списка пользователей (GET /)
export interface AdminRoleInfo {
  admin: User;
  firms: Firm[];
  roles: Role[];
}

// Для карточки конкретного пользователя (GET /:admin_id)
export interface AdminRoleAssignment {
  id: number; // идентификатор связи
  role: Role;
  firms: Firm[];
  isGlobal: boolean;
}

export interface UserRolesFilters {
  user: User | null;
  roles: Role[];
  firms: Firm[];
  searchQuery: string;
}
