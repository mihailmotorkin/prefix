import { RoleRight } from '#domains/roles/roles.model';

export interface UpdateRoleDto {
  id: number;
  name: string;
  description: string;
  right_ids: number[];
}

export interface RoleResponseDto {
  id: number;
  name: string;
  description: string;
  rights: RoleRight[];
}
