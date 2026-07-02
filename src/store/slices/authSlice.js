/**
 * Authentication Slice - Production Grade
 * Refactored to use Auth Service pattern.
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';

/**
 * Async Thunk: loginUser
 * Delegates API call to authService.
 */
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const result = await authService.login(username, password);

      // Validate Success status from your API
      if (result && (result.status === "Success" || result.Status === "Success")) {
        const userData = result.data || result.Data;

        if (!userData) {
          return rejectWithValue('Login successful but no user data received.');
        }

        const token = userData.Authorization || userData.token;

        // Persist session via service
        await authService.saveSession(token, userData);

        return userData;
      } else {
        return rejectWithValue(result?.message || result?.Message || 'Invalid username or password.');
      }
    } catch (error) {
      console.log('Login Error:', error);
      return rejectWithValue(
        error.response?.data?.Message ||
        error.response?.data?.message ||
        'Network error. Please check your internet connection.'
      );
    }
  }
);

/**
 * Async Thunk: loadUserSession
 * Safely restores session on app boot via service.
 */
export const loadUserSession = createAsyncThunk(
  'auth/loadSession',
  async () => {
    try {
      return await authService.getSession();
    } catch (e) {
      return null;
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    role: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      authService.clearSession();
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const userData = action.payload;
        state.loading = false;
        state.isAuthenticated = true;
        state.user = userData;
        state.token = userData?.Authorization || '';
        state.role = (userData?.Role || 'CLIENT').toUpperCase();
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadUserSession.fulfilled, (state, action) => {
        if (action.payload) {
          state.isAuthenticated = true;
          state.user = action.payload;
          state.token = action.payload?.Authorization || '';
          state.role = (action.payload?.Role || 'CLIENT').toUpperCase();
        }
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
