import axiosInstance from './axiosInstance';
import { Agency, AgencyFormData } from '../types';
import { API_ENDPOINTS } from '../utils/api';

export const agencyService = {
  getAll: async () => {
    const response = await axiosInstance.get<Agency[]>(API_ENDPOINTS.agencies);
    return response.data;
  },

  getById: async (id: number) => {
    const response = await axiosInstance.get<Agency>(
      `${API_ENDPOINTS.agencies}/${id}`
    );
    return response.data;
  },

  create: async (data: AgencyFormData) => {
    const response = await axiosInstance.post<Agency>(
      API_ENDPOINTS.agencies,
      data
    );
    return response.data;
  },

  update: async (id: number, data: AgencyFormData) => {
    const response = await axiosInstance.put<Agency>(
      `${API_ENDPOINTS.agencies}/${id}`,
      data
    );
    return response.data;
  },

  delete: async (id: number) => {
    await axiosInstance.delete(`${API_ENDPOINTS.agencies}/${id}`);
  },
};
