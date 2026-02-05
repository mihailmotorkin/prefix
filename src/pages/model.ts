export interface User {
  id: number;
  name: string;
}

export interface Role {
  id: number;
  name: string;
  description?: string;
  rights?: Right[]
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

export interface AdminRoleDto  {
  id: number;
  user: User;
  roles: Role[];
  firms: Firm[];
  isGlobal: boolean;
}

export interface UserRolesFilters {
  user: User | null;
  roles: Role[];
  firms: Firm[];
  searchQuery: string;
}
