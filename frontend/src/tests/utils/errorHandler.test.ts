/**
 * Error Handler Tests
 * Tests pour les utilitaires de gestion des erreurs
 */

import { describe, it, expect } from 'vitest';
import {
  getErrorMessage,
  isValidationError,
  isAuthError,
  isServerError,
} from '../../utils/errorHandler';
import type { AxiosError } from 'axios';

describe('errorHandler', () => {
  describe('getErrorMessage', () => {
    it('should return connection error message when no response', () => {
      const error = {
        response: undefined,
      } as AxiosError;

      const message = getErrorMessage(error);
      expect(message).toContain('connexion');
    });

    it('should return validation error message for 400', () => {
      const error = {
        response: {
          status: 400,
          data: { message: 'Email invalide' },
        },
      } as unknown as AxiosError;

      const message = getErrorMessage(error);
      expect(message).toBe('Email invalide');
    });

    it('should return auth error message for 401', () => {
      const error = {
        response: {
          status: 401,
          data: {},
        },
      } as unknown as AxiosError;

      const message = getErrorMessage(error);
      expect(message).toContain('Session expirée');
    });

    it('should return forbidden error message for 403', () => {
      const error = {
        response: {
          status: 403,
          data: {},
        },
      } as unknown as AxiosError;

      const message = getErrorMessage(error);
      expect(message).toBe('Accès refusé');
    });

    it('should return not found error message for 404', () => {
      const error = {
        response: {
          status: 404,
          data: {},
        },
      } as unknown as AxiosError;

      const message = getErrorMessage(error);
      expect(message).toBe('Ressource non trouvée');
    });

    it('should return server error message for 500', () => {
      const error = {
        response: {
          status: 500,
          data: {},
        },
      } as unknown as AxiosError;

      const message = getErrorMessage(error);
      expect(message).toContain('Erreur serveur');
    });
  });

  describe('isValidationError', () => {
    it('should return true for 400 status', () => {
      const error = {
        response: { status: 400, data: {} },
      } as unknown as AxiosError;

      expect(isValidationError(error)).toBe(true);
    });

    it('should return false for non-400 status', () => {
      const error = {
        response: { status: 401, data: {} },
      } as unknown as AxiosError;

      expect(isValidationError(error)).toBe(false);
    });
  });

  describe('isAuthError', () => {
    it('should return true for 401 status', () => {
      const error = {
        response: { status: 401, data: {} },
      } as unknown as AxiosError;

      expect(isAuthError(error)).toBe(true);
    });

    it('should return false for non-401 status', () => {
      const error = {
        response: { status: 400, data: {} },
      } as unknown as AxiosError;

      expect(isAuthError(error)).toBe(false);
    });
  });

  describe('isServerError', () => {
    it('should return true for 5xx status', () => {
      const error = {
        response: { status: 500, data: {} },
      } as unknown as AxiosError;

      expect(isServerError(error)).toBe(true);
    });

    it('should return false for non-5xx status', () => {
      const error = {
        response: { status: 400, data: {} },
      } as unknown as AxiosError;

      expect(isServerError(error)).toBe(false);
    });
  });
});
