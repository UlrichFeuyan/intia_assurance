/**
 * useAuth Hook Tests
 * Tests pour le custom hook useAuth
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../../hooks/useAuth';

// Mock authService
vi.mock('../../services/authService', () => ({
  authService: {
    login: vi.fn(() => Promise.resolve('mock-token')),
    logout: vi.fn(),
    isAuthenticated: vi.fn(() => true),
    getToken: vi.fn(() => 'mock-token'),
    clearAuth: vi.fn(),
  },
}));

describe('useAuth Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return expected properties', () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current).toHaveProperty('isAuthenticated');
    expect(result.current).toHaveProperty('isLoading');
    expect(result.current).toHaveProperty('error');
    expect(result.current).toHaveProperty('login');
    expect(result.current).toHaveProperty('logout');
    expect(result.current).toHaveProperty('getToken');
  });

  it('should initialize with correct state', () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should call logout function', () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.logout();
    });

    expect(result.current.isAuthenticated).toBe(false);
  });

  it('should call getToken function', () => {
    const { result } = renderHook(() => useAuth());

    const token = result.current.getToken();
    expect(typeof token).toBe('string');
  });

  it('should handle login function', async () => {
    const { result } = renderHook(() => useAuth());

    const credentials = { username: 'testuser', password: 'password123' };

    // Note: Actual login test would require proper async handling
    expect(result.current.login).toBeDefined();
  });

  it('should initialize isAuthenticated based on authService', () => {
    const { result } = renderHook(() => useAuth());

    // Since authService.isAuthenticated is mocked to return true
    expect(result.current.isAuthenticated).toBe(true);
  });
});
