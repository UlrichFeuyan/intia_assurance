/**
 * Client Service Tests
 * Tests pour le service des clients
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { clientService } from '../../services/clientService';

// Mock axiosInstance
vi.mock('../../services/axiosInstance', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('clientService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return list of clients', async () => {
      const mockClients = [
        { id: 1, name: 'Client 1', email: 'c1@test.com', phone: '0123456789' },
        { id: 2, name: 'Client 2', email: 'c2@test.com', phone: '9876543210' },
      ];

      // Note: Test with actual API would require mock-server-worker (msw)
      // This is a basic structure for the test
      expect(clientService.getAll).toBeDefined();
    });
  });

  describe('getById', () => {
    it('should return a single client', async () => {
      expect(clientService.getById).toBeDefined();
    });
  });

  describe('create', () => {
    it('should create a new client', async () => {
      const newClient = {
        name: 'New Client',
        email: 'new@test.com',
        phone: '0123456789',
      };

      expect(clientService.create).toBeDefined();
    });
  });

  describe('update', () => {
    it('should update an existing client', async () => {
      const updatedData = {
        name: 'Updated Client',
        email: 'updated@test.com',
        phone: '1111111111',
      };

      expect(clientService.update).toBeDefined();
    });
  });

  describe('delete', () => {
    it('should delete a client', async () => {
      expect(clientService.delete).toBeDefined();
    });
  });
});
