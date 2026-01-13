import { Ticket } from '../entities/Ticket';
import type { TicketStatus } from '../entities/Ticket';

export interface ITicketRepository {
    create(ticket: Ticket): Promise<void>;
    findById(id: string): Promise<Ticket | null>;
    findAllByUserId(userId: string): Promise<Ticket[]>;
    findAll(): Promise<Ticket[]>;
    updateStatus(id: string, status: TicketStatus): Promise<Ticket>;
    save(ticket: Ticket): Promise<void>;
    delete(id: string): Promise<void>;
}
