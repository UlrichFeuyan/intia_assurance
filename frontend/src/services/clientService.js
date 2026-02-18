/**
 * Client Service (JavaScript version)
 * API operations for clients
 */

import axiosInstance from './axiosInstance.js';
import { API_ENDPOINTS } from '../utils/api.js';

const clientService = {
  /**
   * Get all clients
   * @returns {Promise<Array>}
   */
  async getAll() {
    const response = await axiosInstance.get(API_ENDPOINTS.clients);
    return response.data;
  },

  /**
   * Get single client by ID
   * @param {number} id
   * @returns {Promise<Object>}
   */
  async getById(id) {
    const response = await axiosInstance.get(
      `${API_ENDPOINTS.clients}/${id}`
    );
    return response.data;
  },

  /**
   * Create new client
   * @param {Object} data - Client data
   * @returns {Promise<Object>}
   */
  async create(data) {
    const response = await axiosInstance.post(API_ENDPOINTS.clients, data);
    return response.data;
  },

  /**
   * Update client
   * @param {number} id
   * @param {Object} data - Updated client data
   * @returns {Promise<Object>}
   */
  async update(id, data) {
    const response = await axiosInstance.put(
      `${API_ENDPOINTS.clients}/${id}`,
      data
    );
    return response.data;
  },

  /**
   * Delete client
   * @param {number} id
   * @returns {Promise<void>}
   */
  async delete(id) {
    await axiosInstance.delete(`${API_ENDPOINTS.clients}/${id}`);
  },
};

export default clientService;
