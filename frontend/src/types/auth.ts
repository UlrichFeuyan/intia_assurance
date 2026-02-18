/**
 * Authentication Types
 * Interfaces for authentication responses and user data
 */

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  access: string;
  refresh?: string;
  user?: {
    id: number;
    username: string;
    email: string;
  };
}

export interface User {
  id: number;
  username: string;
  email: string;
}
