import api from './api';

export interface Ticket {
    id: string;
    category: string;
    description: string;
    photoUrl?: string | null;
    address: string;
    status: 'PENDENTE' | 'EM_ANALISE' | 'RESOLVIDO';
    userId: string;
    createdAt: string;
}

export const ticketService = {
    async getAll(): Promise<Ticket[]> {
        const { data } = await api.get('/tickets');
        return data;
    },

    async getMyTickets(): Promise<Ticket[]> {
        const { data } = await api.get('/tickets/me');
        return data;
    },

    async create(ticket: Omit<Ticket, 'id' | 'status' | 'userId' | 'createdAt'>): Promise<Ticket> {
        const { data } = await api.post('/tickets', ticket);
        return data;
    },

    async getById(id: string): Promise<Ticket> {
        const { data } = await api.get(`/tickets/${id}`);
        return data;
    }
};
