/**
 * API Utils Tests
 * Tests pour les constantes et configuration API
 */

import { describe, it, expect } from 'vitest';
import API_BASE_URL, {
  AUTH_TOKEN_KEY,
  TOKEN_PREFIX,
  AUTH_HEADER,
  REQUEST_TIMEOUT,
  API_ENDPOINTS,
} from '../../utils/api';

describe('API Utils', () => {
  describe('Constants', () => {
    it('should export AUTH_TOKEN_KEY', () => {
      expect(AUTH_TOKEN_KEY).toBe('access_token');
    });

    it('should export TOKEN_PREFIX', () => {
      expect(TOKEN_PREFIX).toBe('Bearer');
    });

    it('should export AUTH_HEADER', () => {
      expect(AUTH_HEADER).toBe('Authorization');
    });

    it('should export REQUEST_TIMEOUT', () => {
      expect(REQUEST_TIMEOUT).toBe(30000);
      expect(typeof REQUEST_TIMEOUT).toBe('number');
    });
  });

  describe('API_BASE_URL', () => {
    it('should be a valid URL', () => {
      expect(API_BASE_URL).toBeDefined();
      expect(typeof API_BASE_URL).toBe('string');
      // Base URL should contain http/https and api path
      expect(API_BASE_URL.includes('api')).toBe(true);
    });
  });

  describe('API_ENDPOINTS', () => {
    it('should have clients endpoint', () => {
      expect(API_ENDPOINTS.clients).toBeDefined();
      expect(typeof API_ENDPOINTS.clients).toBe('string');
      expect(API_ENDPOINTS.clients).toContain('clients');
    });

    it('should have agencies endpoint', () => {
      expect(API_ENDPOINTS.agencies).toBeDefined();
      expect(typeof API_ENDPOINTS.agencies).toBe('string');
      expect(API_ENDPOINTS.agencies).toContain('agencies');
    });

    it('should have insurances endpoint', () => {
      expect(API_ENDPOINTS.insurances).toBeDefined();
      expect(typeof API_ENDPOINTS.insurances).toBe('string');
      expect(API_ENDPOINTS.insurances).toContain('insurances');
    });

    it('should have token endpoint', () => {
      expect(API_ENDPOINTS.token).toBeDefined();
      expect(typeof API_ENDPOINTS.token).toBe('string');
      expect(API_ENDPOINTS.token).toContain('token');
    });

    it('all endpoints should be non-empty strings', () => {
      Object.values(API_ENDPOINTS).forEach((endpoint) => {
        expect(endpoint).toBeDefined();
        expect(endpoint.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Configuration', () => {
    it('should have valid timeout', () => {
      expect(REQUEST_TIMEOUT).toBeGreaterThan(0);
      expect(REQUEST_TIMEOUT).toBeLessThan(120000); // Less than 2 minutes
    });

    it('should have consistent token prefix', () => {
      expect(TOKEN_PREFIX).toBe('Bearer');
      // Other auth methods could use "Basic", "ApiKey", etc.
    });
  });
});
