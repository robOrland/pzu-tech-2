import { Elysia } from 'elysia';
import { AdminController } from '../controllers/AdminController';
import { authMiddleware } from '../middleware/authMiddleware';

const adminController = new AdminController();

export const AdminModule = new Elysia({ prefix: '/admin' })
    .use(authMiddleware)
    .guard({
        beforeHandle: ({ user, set }: any) => {
            if (!user || user.role !== 'ADMIN') {
                set.status = 403;
                return { error: 'Forbidden: Admin access only' };
            }
        }
    })
    .get('/tickets', adminController.getAllTickets)
    .patch('/tickets/:id/status', adminController.updateTicketStatus)
    .get('/users', adminController.getAllUsers);
