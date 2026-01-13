import type { ITicketRepository } from '../../domain/repositories/ITicketRepository';

export class GetUserTicketsUseCase {
    constructor(private ticketRepository: ITicketRepository) { }

    async execute(userId: string) {
        return await this.ticketRepository.findAllByUserId(userId);
    }
}
