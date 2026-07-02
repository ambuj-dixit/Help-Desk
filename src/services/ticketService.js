/**
 * Ticket Service
 * Using direct JSON parsing to match backend Response.Write logic.
 */
import apiClient from '../api/client';

const ticketService = {
  getTickets: async (userId, role) => {
    const response = await apiClient.get('GetTickets', {
      params: { userId, role }
    });
    return response.data?.data || [];
  },

  createTicket: async (ticketData) => {
    // Note: We use relative path 'CreateTicket' which combines with baseURL
    const response = await apiClient.get('CreateTicket', {
      params: {
        UserId: ticketData.UserId,
        CompanyID: ticketData.CompanyID,
        ProductID: ticketData.ProductID,
        ModuleID: ticketData.ModuleID,
        Title: ticketData.Title,
        Description: ticketData.Description,
        Priority: ticketData.Priority,
        Attachment: ticketData.Attachment || ''
      }
    });

    // Directly return response.data as backend does not use .d wrapper
    return response.data;
  },

  updateStatus: async (ticketId, status, assigneeId, feedback) => {
    const response = await apiClient.get('UpdateTicketStatus', {
      params: {
        TicketID: ticketId,
        Status: status,
        AssigneeID: assigneeId,
        Feedback: feedback || ''
      }
    });
    return response.data;
  }
};

export default ticketService;
