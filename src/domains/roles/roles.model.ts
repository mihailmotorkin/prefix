import { RoleRight } from '#domains/role-rights';

export interface Role {
  id: number;
  name: string;
  description?: string;
  rights?: RoleRight[];
}

export interface UpdateRoleDto {
  id: number;
  name: string;
  description: string;
  right_ids: number[];
}
