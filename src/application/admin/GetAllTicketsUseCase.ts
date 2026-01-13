import type { ITicketRepository } from '../../domain/repositories/ITicketRepository';

export class GetAllTicketsUseCase {
    constructor(private ticketRepository: ITicketRepository) { }

    async execute() {
        return await this.ticketRepository.findAll();
    }
}
