/**
 * Auth Service
 * Uses absolute URLs to bypass 404 routing issues.
 */
import apiClient from '../api/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://45.118.162.227/ticket/Calender_details.asmx/';

const authService = {
  login: async (username, password) => {
    const response = await apiClient.get(`${BASE_URL}UserLogin`, {
      params: {
        username: (username || '').toUpperCase().trim(),
        password: password || ''
      }
    });

    let result = response.data;
    if (result && result.d) {
      try {
        result = typeof result.d === 'string' ? JSON.parse(result.d) : result.d;
      } catch (e) {
        result = result.d;
      }
    }
    return result;
  },

  saveSession: async (token, userData) => {
    await AsyncStorage.setItem('userToken', token || '');
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
  },

  getSession: async () => {
    const token = await AsyncStorage.getItem('userToken');
    const userDataJson = await AsyncStorage.getItem('userData');
    if (token && userDataJson) {
      return JSON.parse(userDataJson);
    }
    return null;
  },

  clearSession: async () => {
    await AsyncStorage.multiRemove(['userToken', 'userData']);
  }
};

export default authService;
