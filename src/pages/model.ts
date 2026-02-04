export interface User {
  id: number;
  name: string;
  firms: Firm[] | null;
  roles: Role[] | null;
}

export interface Role {
  id: number;
  name: string;
  isGlobal?: boolean;
}

export interface Firm {
  id: number;
  name: string;
}

export interface UserFilters {
  user: User | null;
  roles: Role[];
  firms: Firm[];
  searchQuery: string;
}

export interface RoleFilters {
  role: Role | null;
  firms: Firm[];
  searchQuery: string;
}
