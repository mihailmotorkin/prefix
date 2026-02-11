// Общие типы
export interface Env {
  admin_id: number;
}

export interface Firm {
  id: number;
  name: string;
}

export interface Role {
  role_id: number;
  name: string;
  description: string;
}

export interface RoleAssignment {
  id: number;
  role_id: number;
  name: string;
}

// 1. Список администраторов с ролями и филиалами
export interface GetAdminsListRequest {
  env: Env;
  admin_id?: number;
  admin_name?: string;
  firm_name?: string;
  firm_id?: number;
  role_name?: string;
  role_id?: number;
}

export interface AdminData {
  admin: {
    id: number;
    name: string;
  };
  firms: Firm[];
  roles: RoleAssignment[];
}

export type GetAdminsListResponse = AdminData[];

// 2. Назначение новой роли администратору
export interface AssignRoleRequest {
  env: Env;
  admin_id: number;
  role_id: number;
  firm_ids: number[];
}

export interface RoleAssignmentData {
  id: number;
  is_global: boolean;
  firms: Firm[];
  role: Role;
}

export type AssignRoleResponse = RoleAssignmentData;

// 3. Удаление роли у администратора
export interface DeleteRoleRequest {
  env: Env;
  admin_id: number;
  id: number;
}

// Для успешного удаления данных нет, только success: true

// 4. Роли администратора и филиалы
export interface GetAdminRolesRequest {
  env: Env;
  admin_id: number;
}

export type GetAdminRolesResponse = RoleAssignmentData[];

// 5. Обновление связи администратора и роли
export interface UpdateRoleAssignmentRequest {
  env: Env;
  admin_id: number;
  id: number;
  firm_ids: number[];
}

export type UpdateRoleAssignmentResponse = RoleAssignmentData;
