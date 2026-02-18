/**
 * API Service Factory
 * Generic service for handling API CRUD operations
 */

import axiosInstance from './axiosInstance.js';
import { getErrorMessage } from '../utils/errorHandler.js';

/**
 * Generic API Service Factory
 * Creates a service with standard CRUD operations
 *
 * @param {Object} options - Service options
 * @param {string} options.endpoint - API endpoint
 * @returns {Object} Service with CRUD methods
 */
export function createApiService(options) {
  const { endpoint } = options;

  return {
    /**
     * Get all items
     * @returns {Promise<Array>}
     */
    async getAll() {
      try {
        const response = await axiosInstance.get(endpoint);
        return response.data;
      } catch (error) {
        const message = getErrorMessage(error);
        console.error(`Error fetching from ${endpoint}:`, message);
        throw new Error(message);
      }
    },

    /**
     * Get single item by ID
     * @param {number} id
     * @returns {Promise<Object>}
     */
    async getById(id) {
      try {
        const response = await axiosInstance.get(`${endpoint}/${id}`);
        return response.data;
      } catch (error) {
        const message = getErrorMessage(error);
        console.error(`Error fetching ${endpoint}/${id}:`, message);
        throw new Error(message);
      }
    },

    /**
     * Create new item
     * @param {Object} data
     * @returns {Promise<Object>}
     */
    async create(data) {
      try {
        const response = await axiosInstance.post(endpoint, data);
        return response.data;
      } catch (error) {
        const message = getErrorMessage(error);
        console.error(`Error creating in ${endpoint}:`, message);
        throw new Error(message);
      }
    },

    /**
     * Update existing item
     * @param {number} id
     * @param {Object} data
     * @returns {Promise<Object>}
     */
    async update(id, data) {
      try {
        const response = await axiosInstance.put(`${endpoint}/${id}`, data);
        return response.data;
      } catch (error) {
        const message = getErrorMessage(error);
        console.error(`Error updating ${endpoint}/${id}:`, message);
        throw new Error(message);
      }
    },

    /**
     * Delete item
     * @param {number} id
     * @returns {Promise<void>}
     */
    async delete(id) {
      try {
        await axiosInstance.delete(`${endpoint}/${id}`);
      } catch (error) {
        const message = getErrorMessage(error);
        console.error(`Error deleting ${endpoint}/${id}:`, message);
        throw new Error(message);
      }
    },
  };
}
