import axiosInstance from './axiosInstance';
import type { PaginatedList, Client, Agency, Insurance } from '../types';
import { API_ENDPOINTS } from '../utils/api';

export interface Stats {
  clients: number;
  agencies: number;
  insurances: number;
}

export const statsService = {
  async getStats(): Promise<Stats> {
    const [clientsRes, agenciesRes, insurancesRes] = await Promise.all([
      axiosInstance.get<PaginatedList<Client>>(API_ENDPOINTS.clients),
      axiosInstance.get<PaginatedList<Agency>>(API_ENDPOINTS.agencies),
      axiosInstance.get<PaginatedList<Insurance>>(API_ENDPOINTS.insurances),
    ]);

    return {
      clients: clientsRes.data.count,
      agencies: agenciesRes.data.count,
      insurances: insurancesRes.data.count,
    };
  },
};

