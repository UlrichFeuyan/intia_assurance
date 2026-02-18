/**
 * Authentication Service
 * Handles user login, logout, and token management
 */

import axiosInstance from './axiosInstance';
import { AUTH_TOKEN_KEY } from '../utils/api';
import { AuthResponse, LoginCredentials } from '../types/auth';

const AUTH_ENDPOINT = '/auth/login';

export const authService = {
  /**
   * Login user with credentials
   * Returns access token on success
   */
  async login(credentials: LoginCredentials): Promise<string> {
    try {
      const response = await axiosInstance.post<AuthResponse>(
        AUTH_ENDPOINT,
        credentials
      );

      const { access } = response.data;

      // Store token in localStorage
      localStorage.setItem(AUTH_TOKEN_KEY, access);

      return access;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  /**
   * Logout user
   * Removes token from localStorage
   */
  logout(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  },

  /**
   * Get stored access token
   * Returns null if no token is stored
   */
  getToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  },

  /**
   * Clear all auth data
   */
  clearAuth(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  },
};
