// Auth Feature - Types
export type { User, UserRole, AuthState } from '@/lib/types/user';

// Auth-specific types
export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SetRoleInput {
  role: UserRole;
}
