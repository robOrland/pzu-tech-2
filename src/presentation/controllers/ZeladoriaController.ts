import { Container } from '../../infrastructure/di/Container';

export class ZeladoriaController {
    async createTicket({ body, user, set }: any) {
        if (!user) {
            set.status = 401;
            return { error: 'Unauthorized' };
        }

        try {
            return await Container.getInstance().createTicketUseCase.execute({
                ...body,
                userId: user.sub
            });
        } catch (error: any) {
            set.status = 400;
            return { error: error.message };
        }
    }

    async getUserTickets({ user, set }: any) {
        if (!user) {
            set.status = 401;
            return { error: 'Unauthorized' };
        }

        const tickets = await Container.getInstance().getUserTicketsUseCase.execute(user.sub);
        return tickets.map((t: any) => t.toJSON());
    }

    async getTicketById({ params, set }: any) {
        try {
            const ticket = await Container.getInstance().getTicketByIdUseCase.execute(params.id);
            return ticket?.toJSON();
        } catch (error: any) {
            set.status = 404;
            return { error: error.message };
        }
    }
}

