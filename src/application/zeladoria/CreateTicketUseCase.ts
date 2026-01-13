import { Ticket } from '../../domain/entities/Ticket';
import type { ITicketRepository } from '../../domain/repositories/ITicketRepository';

interface CreateTicketInput {
    category: string;
    description: string;
    photoUrl?: string | null;
    address: string;
    userId: string;
}

export class CreateTicketUseCase {
    constructor(private ticketRepository: ITicketRepository) { }

    async execute(input: CreateTicketInput) {
        const ticket = new Ticket({
            category: input.category,
            description: input.description,
            photoUrl: input.photoUrl,
            address: input.address,
            userId: input.userId,
            status: 'PENDENTE',
        });

        await this.ticketRepository.create(ticket);
        return ticket;
    }
}

