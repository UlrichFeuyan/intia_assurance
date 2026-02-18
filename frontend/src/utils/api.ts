// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const API_ENDPOINTS = {
  clients: '/clients',
  agencies: '/agencies',
  insurances: '/insurances',
};

export default API_BASE_URL;
