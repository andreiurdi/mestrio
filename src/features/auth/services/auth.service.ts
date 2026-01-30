import axiosInstance from '@/lib/api/axios';
import type { User, LoginInput, RegisterInput, SetRoleInput } from '../types';

/**
 * Auth Service
 * Handles all authentication API calls
 */
export const authService = {
  /**
   * Register a new user
   */
  register: async (data: RegisterInput): Promise<User> => {
    const { data: response } = await axiosInstance.post('/api/auth/register', {
      email: data.email,
      password: data.password,
      name: data.name,
    });
    return response.user;
  },

  /**
   * Login a user
   */
  login: async (data: LoginInput): Promise<User> => {
    const { data: response } = await axiosInstance.post('/api/auth/login', {
      email: data.email,
      password: data.password,
    });
    return response.user;
  },

  /**
   * Logout the current user
   */
  logout: async (): Promise<void> => {
    await axiosInstance.post('/api/auth/logout');
  },

  /**
   * Set user role
   */
  setRole: async (data: SetRoleInput): Promise<User> => {
    const { data: response } = await axiosInstance.post('/api/auth/set-role', {
      role: data.role,
    });
    return response.user;
  },
};
