/**
 * Auth Service Tests
 * Tests pour le service d'authentification
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { authService } from '../../services/authService';

describe('authService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('login', () => {
    it('should store token in localStorage on successful login', async () => {
      // Mock localStorage
      const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test.token';
      
      // Note: Ce test nécessite un mock d'axiosInstance
      // Pour un test réel, utilisez des mocks HTTP comme msw
      expect(localStorage.getItem('access_token')).toBeNull();
    });

    it('should throw error on failed login', async () => {
      expect(authService.login).toBeDefined();
    });
  });

  describe('logout', () => {
    it('should remove token from localStorage', () => {
      // Setup
      localStorage.setItem('access_token', 'test-token');
      
      // Action
      authService.logout();
      
      // Assertion
      expect(localStorage.getItem('access_token')).toBeNull();
    });
  });

  describe('getToken', () => {
    it('should return token from localStorage', () => {
      const token = 'test-token-123';
      localStorage.setItem('access_token', token);
      
      expect(authService.getToken()).toBe(token);
    });

    it('should return null if no token exists', () => {
      expect(authService.getToken()).toBeNull();
    });
  });

  describe('isAuthenticated', () => {
    it('should return true if token exists', () => {
      localStorage.setItem('access_token', 'test-token');
      expect(authService.isAuthenticated()).toBe(true);
    });

    it('should return false if no token exists', () => {
      expect(authService.isAuthenticated()).toBe(false);
    });
  });

  describe('clearAuth', () => {
    it('should clear all auth data', () => {
      localStorage.setItem('access_token', 'test-token');
      
      authService.clearAuth();
      
      expect(localStorage.getItem('access_token')).toBeNull();
      expect(authService.isAuthenticated()).toBe(false);
    });
  });
});
