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

export interface UpdateRoleDto {
  id: number;
  name: string;
  description: string;
  right_ids: number[];
}
