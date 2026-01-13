import { Elysia } from 'elysia';
import { Container } from '../../infrastructure/di/Container';

export const authMiddleware = (app: Elysia) =>
    app.derive(async ({ headers, set }) => {
        const auth = headers['authorization'];

        if (!auth || !auth.startsWith('Bearer ')) {
            return {
                user: null
            };
        }

        const token = auth.split(' ')[1];
        if (!token) {
            return {
                user: null
            };
        }

        const tokenService = Container.getInstance().tokenService;
        const payload = await tokenService.verifyToken(token);

        if (!payload) {
            set.status = 401;
            throw new Error('Unauthorized');
        }

        return {
            user: payload
        };
    });

