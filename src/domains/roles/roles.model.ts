export interface Role {
  id: number;
  name: string;
  description?: string;
  rights?: RoleRight[];
}

export interface RoleRight {
  id: number;
  name: string;
}
