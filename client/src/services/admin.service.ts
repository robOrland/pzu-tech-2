import api from './api';
import type { Ticket } from './ticket.service';
import type { User } from './auth.service';

export const adminService = {
    async getAllTickets(): Promise<Ticket[]> {
        const { data } = await api.get('/admin/tickets');
        return data;
    },

    async updateTicketStatus(id: string, status: string): Promise<Ticket> {
        const { data } = await api.patch(`/admin/tickets/${id}/status`, { status });
        return data;
    },

    async getAllUsers(): Promise<User[]> {
        const { data } = await api.get('/admin/users');
        return data;
    }
};
