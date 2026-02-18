/**
 * API Configuration
 * Centralizes all API-related constants and configuration
 */

// Base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// API Endpoints
export const API_ENDPOINTS = {
  clients: '/clients',
  agencies: '/agencies',
  insurances: '/insurances',
};

// Auth constants
export const AUTH_TOKEN_KEY = 'access_token';
export const TOKEN_PREFIX = 'Bearer';
export const AUTH_HEADER = 'Authorization';

// HTTP timeout (milliseconds)
export const REQUEST_TIMEOUT = 30000;

export default API_BASE_URL;
