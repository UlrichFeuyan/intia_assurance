/**
 * Axios Instance Configuration
 * Sets up HTTP client with JWT authentication and global error handling
 */

import axios from 'axios';
import type { AxiosInstance } from 'axios';
import API_BASE_URL, {
  AUTH_TOKEN_KEY,
  TOKEN_PREFIX,
  AUTH_HEADER,
  REQUEST_TIMEOUT,
} from '../utils/api';

// Create Axios instance with default configuration
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request Interceptor
 * Automatically attaches JWT token from localStorage to all requests
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      config.headers[AUTH_HEADER] = `${TOKEN_PREFIX} ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Handles global error scenarios like 401 Unauthorized
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized - token expired or invalid
    if (error.response?.status === 401) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      // Redirect to login only if not already on login page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.error('Access forbidden');
    }

    // Handle 500 Server Error
    if (error.response?.status >= 500) {
      console.error('Server error:', error.response.status);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
