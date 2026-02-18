import axiosInstance from './axiosInstance';
import type { Client, ClientFormData } from '../types';
import { API_ENDPOINTS } from '../utils/api';

export const clientService = {
  getAll: async () => {
    const response = await axiosInstance.get<Client[]>(API_ENDPOINTS.clients);
    return response.data;
  },

  getById: async (id: number) => {
    const response = await axiosInstance.get<Client>(
      `${API_ENDPOINTS.clients}/${id}`
    );
    return response.data;
  },

  create: async (data: ClientFormData) => {
    const response = await axiosInstance.post<Client>(
      API_ENDPOINTS.clients,
      data
    );
    return response.data;
  },

  update: async (id: number, data: ClientFormData) => {
    const response = await axiosInstance.put<Client>(
      `${API_ENDPOINTS.clients}/${id}`,
      data
    );
    return response.data;
  },

  delete: async (id: number) => {
    await axiosInstance.delete(`${API_ENDPOINTS.clients}/${id}`);
  },
};
