export type UserRole = "client" | "provider" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role?: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
