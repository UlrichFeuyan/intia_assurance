/**
 * API Error Handling
 * Centralized error utilities for API responses
 */

/**
 * Get error message from API error response
 * Handles various error response formats from Django REST Framework
 *
 * @param {Object} error - Axios error object
 * @returns {string} Error message
 */
export function getErrorMessage(error) {
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
 *
 * @param {Object} error - Axios error object
 * @returns {boolean}
 */
export function isValidationError(error) {
  return error.response?.status === 400;
}

/**
 * Get validation errors in a key-value format
 *
 * @param {Object} error - Axios error object
 * @returns {Object} Validation errors
 */
export function getValidationErrors(error) {
  return error.response?.data?.errors || {};
}

/**
 * Check if error is authorization error
 *
 * @param {Object} error - Axios error object
 * @returns {boolean}
 */
export function isAuthError(error) {
  return error.response?.status === 401;
}

/**
 * Check if error is permission error
 *
 * @param {Object} error - Axios error object
 * @returns {boolean}
 */
export function isPermissionError(error) {
  return error.response?.status === 403;
}

/**
 * Check if error is server error
 *
 * @param {Object} error - Axios error object
 * @returns {boolean}
 */
export function isServerError(error) {
  const status = error.response?.status;
  return status ? status >= 500 : false;
}
