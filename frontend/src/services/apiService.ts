/**
 * API Service Factory
 * Generic service for handling API CRUD operations
 */

import axiosInstance from './axiosInstance';
import { AxiosError } from 'axios';
import { getErrorMessage } from '../utils/errorHandler';

export interface ServiceOptions {
  endpoint: string;
}

/**
 * Generic API Service Factory
 * Creates a service with standard CRUD operations
 */
export function createApiService<T extends { id: number }>(
  options: ServiceOptions
) {
  const { endpoint } = options;

  return {
    /**
     * Get all items
     */
    async getAll(): Promise<T[]> {
      try {
        const response = await axiosInstance.get<T[]>(endpoint);
        return response.data;
      } catch (error) {
        const message = getErrorMessage(error as AxiosError);
        console.error(`Error fetching from ${endpoint}:`, message);
        throw new Error(message);
      }
    },

    /**
     * Get single item by ID
     */
    async getById(id: number): Promise<T> {
      try {
        const response = await axiosInstance.get<T>(`${endpoint}/${id}`);
        return response.data;
      } catch (error) {
        const message = getErrorMessage(error as AxiosError);
        console.error(`Error fetching ${endpoint}/${id}:`, message);
        throw new Error(message);
      }
    },

    /**
     * Create new item
     */
    async create(data: Omit<T, 'id'>): Promise<T> {
      try {
        const response = await axiosInstance.post<T>(endpoint, data);
        return response.data;
      } catch (error) {
        const message = getErrorMessage(error as AxiosError);
        console.error(`Error creating in ${endpoint}:`, message);
        throw new Error(message);
      }
    },

    /**
     * Update existing item
     */
    async update(id: number, data: Partial<T>): Promise<T> {
      try {
        const response = await axiosInstance.put<T>(
          `${endpoint}/${id}`,
          data
        );
        return response.data;
      } catch (error) {
        const message = getErrorMessage(error as AxiosError);
        console.error(`Error updating ${endpoint}/${id}:`, message);
        throw new Error(message);
      }
    },

    /**
     * Delete item
     */
    async delete(id: number): Promise<void> {
      try {
        await axiosInstance.delete(`${endpoint}/${id}`);
      } catch (error) {
        const message = getErrorMessage(error as AxiosError);
        console.error(`Error deleting ${endpoint}/${id}:`, message);
        throw new Error(message);
      }
    },
  };
}
