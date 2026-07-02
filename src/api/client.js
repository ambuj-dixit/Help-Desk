/**
 * API Client Configuration
 * Optimized to match browser-style GET requests to prevent 404s.
 */

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiClient = axios.create({
  baseURL: 'http://45.118.162.227/ticket/Calender_details.asmx/',
  timeout: 20000,
});

/**
 * Request Interceptor
 * Strictly attaches token ONLY for data-fetching calls.
 */
apiClient.interceptors.request.use(
  async (config) => {
    // Avoid sending ANY headers for UserLogin and CreateTicket
    if (config.url.includes('UserLogin') || config.url.includes('CreateTicket')) {
       // Clean slate for these specific calls
       config.headers = {};
    } else {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        config.headers.Authorization = token;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
