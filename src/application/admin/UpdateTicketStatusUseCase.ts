import type { ITicketRepository } from '../../domain/repositories/ITicketRepository';
import type { TicketStatus } from '../../domain/entities/Ticket';

interface UpdateTicketStatusInput {
    id: string;
    status: TicketStatus;
}

export class UpdateTicketStatusUseCase {
    constructor(private ticketRepository: ITicketRepository) { }

    async execute({ id, status }: UpdateTicketStatusInput) {
        const ticket = await this.ticketRepository.findById(id);
        if (!ticket) {
            throw new Error('Ticket not found');
        }

        return await this.ticketRepository.updateStatus(id, status);
    }
}
