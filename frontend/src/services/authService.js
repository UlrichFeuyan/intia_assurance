/**
 * Authentication Service (JavaScript version)
 * Handles user login, logout, and token management
 */

import axiosInstance from './axiosInstance.js';
import { AUTH_TOKEN_KEY } from '../utils/api.js';

const AUTH_ENDPOINT = '/auth/login';

const authService = {
  /**
   * Login user with credentials
   * @param {Object} credentials - { username, password }
   * @returns {Promise<string>} Access token
   */
  async login(credentials) {
    try {
      const response = await axiosInstance.post(AUTH_ENDPOINT, credentials);
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
  logout() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  },

  /**
   * Get stored access token
   * @returns {string|null} Token or null if not found
   */
  getToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated() {
    const token = this.getToken();
    return !!token;
  },

  /**
   * Clear all auth data
   */
  clearAuth() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  },
};

export default authService;
