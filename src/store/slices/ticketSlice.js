/**
 * Ticket Slice
 * Refactored to use Ticket Service pattern.
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ticketService from '../../services/ticketService';

/**
 * Async Thunk: fetchTickets
 * Delegates API call to ticketService.
 */
export const fetchTickets = createAsyncThunk(
  'tickets/fetchAll',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const tickets = await ticketService.getTickets(auth.user.UserId, auth.role);
      return tickets;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch tickets');
    }
  }
);

  /**
   * Async Thunk: createTicket
   * Handles ticket creation and returns the new TicketNo.
   */
  export const createTicket = createAsyncThunk(
    'tickets/create',
    async (ticketData, { getState, rejectWithValue }) => {
      try {
        const { auth } = getState();
        const fullData = {
          ...ticketData,
          UserId: auth.user.UserId,
          CompanyID: auth.user.CompanyID,
        };
        const result = await ticketService.createTicket(fullData);

        if (result.status === "Success" || result.Status === "Success") {
          return result.data; // returns { TicketNo, CreatedDate }
        } else {
          return rejectWithValue(result.message || "Failed to create ticket");
        }
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to create ticket');
      }
    }
  );

  /**
   * Async Thunk: updateTicketStatus
   * Delegates API call to ticketService.
   */
export const updateTicketStatus = createAsyncThunk(
  'tickets/updateStatus',
  async ({ ticketId, status, assigneeId, feedback }, { rejectWithValue }) => {
    try {
      const result = await ticketService.updateStatus(ticketId, status, assigneeId, feedback);
      return result;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Update failed');
    }
  }
);

const ticketSlice = createSlice({
  name: 'tickets',
  initialState: {
    list: [],
    currentTicket: null,
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentTicket: (state, action) => {
      state.currentTicket = action.payload;
    },
    clearTicketError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTicketStatus.fulfilled, (state, action) => {
        // Optimistically update the list if needed or wait for re-fetch
      });
  },
});

export const { setCurrentTicket, clearTicketError } = ticketSlice.actions;
export default ticketSlice.reducer;
