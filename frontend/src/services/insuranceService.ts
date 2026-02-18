import axiosInstance from './axiosInstance';
import type { Insurance, InsuranceFormData, PaginatedList } from '../types';
import { API_ENDPOINTS } from '../utils/api';

export const insuranceService = {
  getAll: async () => {
    const response = await axiosInstance.get<PaginatedList<Insurance>>(
      API_ENDPOINTS.insurances
    );
    return response.data.results;
  },

  getById: async (id: number) => {
    const response = await axiosInstance.get<Insurance>(
      `${API_ENDPOINTS.insurances}/${id}`
    );
    return response.data;
  },

  create: async (data: InsuranceFormData) => {
    const response = await axiosInstance.post<Insurance>(
      API_ENDPOINTS.insurances,
      data
    );
    return response.data;
  },

  update: async (id: number, data: InsuranceFormData) => {
    const response = await axiosInstance.put<Insurance>(
      `${API_ENDPOINTS.insurances}/${id}`,
      data
    );
    return response.data;
  },

  delete: async (id: number) => {
    await axiosInstance.delete(`${API_ENDPOINTS.insurances}/${id}`);
  },
};
