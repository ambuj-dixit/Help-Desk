/**
 * Redux Store Configuration
 * This is the central repository of all application state.
 */

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import ticketReducer from './slices/ticketSlice';

export const store = configureStore({
  reducer: {
    // Authentication and user session state
    auth: authReducer,
    // Ticket management state
    tickets: ticketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Disabling serializableCheck to allow simpler handling of complex objects if needed
      serializableCheck: false,
    }),
});

export default store;
