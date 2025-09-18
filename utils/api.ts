import axios from 'axios';

// Configure the base URL for your backend API
// For mobile development, use your computer's IP address instead of localhost
// UPDATE THIS: Replace with your actual IP from ipconfig that matches 192.168.1.x
const API_BASE_URL = __DEV__ 
  ? 'http://192.168.1.5:3000' // REPLACE X with your actual IP number
  : 'https://your-production-url.com'; // Your production backend URL

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable cookie handling for cross-origin requests
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    console.log('Making API request to:', (config.baseURL || '') + (config.url || ''));
    console.log('Request method:', config.method);
    console.log('Request data:', config.data);
    // Token will be set by AuthContext when user signs in
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => {
    console.log('Response status:', response.status);
    console.log('Response data:', response.data);
    return response;
  },
  (error) => {
    console.log('Response error status:', error.response?.status);
    console.log('Response error data:', error.response?.data);
    console.log('Response error headers:', error.response?.headers);
    
    // Handle common errors
    if (error.response?.status === 401) {
      // Token expired or invalid
      console.log('Authentication error - Invalid credentials or token expired');
    } else if (error.response?.status === 500) {
      console.error('Server error:', error.response.data);
    } else if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
    } else if (error.code === 'NETWORK_ERROR' || !error.response) {
      console.error('Network error - Cannot connect to server. Check if backend is running and IP address is correct.');
      console.error('Current API URL:', API_BASE_URL);
    }
    
    return Promise.reject(error);
  }
);

// Export the API URL for debugging
export { API_BASE_URL };

export default apiClient;