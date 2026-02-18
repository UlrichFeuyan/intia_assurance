/**
 * API Configuration
 * Centralizes all API-related constants and configuration
 */

// Base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// API Endpoints
const API_ENDPOINTS = {
  clients: '/clients',
  agencies: '/agencies',
  insurances: '/insurances',
};

// Auth constants
const AUTH_TOKEN_KEY = 'access_token';
const TOKEN_PREFIX = 'Bearer';
const AUTH_HEADER = 'Authorization';

// HTTP timeout (milliseconds)
const REQUEST_TIMEOUT = 30000;

export {
  API_BASE_URL,
  API_ENDPOINTS,
  AUTH_TOKEN_KEY,
  TOKEN_PREFIX,
  AUTH_HEADER,
  REQUEST_TIMEOUT,
};

export default API_BASE_URL;
