import { Elysia } from 'elysia';
import { ZeladoriaController } from '../controllers/ZeladoriaController';
import { authMiddleware } from '../middleware/authMiddleware';

const zeladoriaController = new ZeladoriaController();

export const ZeladoriaModule = new Elysia()
    .use(authMiddleware)
    .get('/me', zeladoriaController.getUserTickets)
    .post('/', zeladoriaController.createTicket)
    .get('/:id', zeladoriaController.getTicketById);

