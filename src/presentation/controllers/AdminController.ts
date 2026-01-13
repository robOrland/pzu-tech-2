import { Container } from '../../infrastructure/di/Container';

export class AdminController {
    async getAllTickets({ set }: any) {
        try {
            const tickets = await Container.getInstance().getAllTicketsUseCase.execute();
            return tickets.map((t: any) => t.toJSON());
        } catch (error: any) {
            set.status = 400;
            return { error: error.message };
        }
    }

    async updateTicketStatus({ params, body, set }: any) {
        try {
            const ticket = await Container.getInstance().updateTicketStatusUseCase.execute({
                id: params.id,
                status: body.status,
            });
            return ticket.toJSON();
        } catch (error: any) {
            set.status = 400;
            return { error: error.message };
        }
    }

    async getAllUsers({ set }: any) {
        try {
            const users = await Container.getInstance().getAllUsersUseCase.execute();
            // Since GetAllUsersUseCase already returns plain objects (mapped in use case), we don't need .toJSON() here
            // but let's double check the use case
            return users;
        } catch (error: any) {
            set.status = 400;
            return { error: error.message };
        }
    }
}
