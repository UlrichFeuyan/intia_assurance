/**
 * API Error Handling
 * Centralized error utilities for API responses
 */

import { AxiosError } from 'axios';

export interface ApiErrorResponse {
  error?: string;
  message?: string;
  detail?: string;
  errors?: Record<string, string[]>;
}

/**
 * Get error message from API error response
 * Handles various error response formats from Django REST Framework
 */
export function getErrorMessage(error: AxiosError<ApiErrorResponse>): string {
  if (!error.response) {
    return 'Erreur de connexion. Vérifiez votre connexion internet.';
  }

  const { status, data } = error.response;

  // Handle different HTTP status codes
  switch (status) {
    case 400:
      return data?.message || data?.error || 'Requête invalide';
    case 401:
      return 'Session expirée. Veuillez vous reconnecter.';
    case 403:
      return 'Accès refusé';
    case 404:
      return 'Ressource non trouvée';
    case 500:
      return 'Erreur serveur. Réessayez plus tard.';
    case 502:
    case 503:
      return 'Le serveur est temporairement indisponible';
    default:
      return data?.message || data?.error || 'Une erreur est survenue';
  }
}

/**
 * Check if error is a validation error (typically 400)
 */
export function isValidationError(
  error: AxiosError<ApiErrorResponse>
): boolean {
  return error.response?.status === 400;
}

/**
 * Get validation errors in a key-value format
 */
export function getValidationErrors(
  error: AxiosError<ApiErrorResponse>
): Record<string, string[]> {
  return error.response?.data?.errors || {};
}

/**
 * Check if error is authorization error
 */
export function isAuthError(error: AxiosError<ApiErrorResponse>): boolean {
  return error.response?.status === 401;
}

/**
 * Check if error is permission error
 */
export function isPermissionError(error: AxiosError<ApiErrorResponse>): boolean {
  return error.response?.status === 403;
}

/**
 * Check if error is server error
 */
export function isServerError(error: AxiosError<ApiErrorResponse>): boolean {
  const status = error.response?.status;
  return status ? status >= 500 : false;
}
