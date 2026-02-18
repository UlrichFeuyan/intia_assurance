/**
 * useAuth Hook
 * React hook for authentication state management
 */

import { useState, useCallback } from 'react';
import { authService } from '../services/authService';
import { LoginCredentials } from '../types/auth';
import { getErrorMessage } from '../utils/errorHandler';
import { AxiosError } from 'axios';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    authService.isAuthenticated()
  );

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      setIsLoading(true);
      setError(null);
      try {
        await authService.login(credentials);
        setIsAuthenticated(true);
      } catch (err) {
        const message = getErrorMessage(err as AxiosError);
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(() => {
    authService.logout();
    setIsAuthenticated(false);
    setError(null);
  }, []);

  const getToken = useCallback(() => {
    return authService.getToken();
  }, []);

  return {
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    getToken,
  };
}
