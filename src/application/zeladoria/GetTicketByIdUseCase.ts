import type { ITicketRepository } from '../../domain/repositories/ITicketRepository';

export class GetTicketByIdUseCase {
    constructor(private ticketRepository: ITicketRepository) { }

    async execute(id: string) {
        const ticket = await this.ticketRepository.findById(id);
        if (!ticket) {
            throw new Error('Ticket not found');
        }
        return ticket;
    }
}
