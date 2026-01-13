import { Elysia } from 'elysia';
import { AuthController } from '../controllers/AuthController';

const authController = new AuthController();

export const AuthModule = new Elysia({ prefix: '/auth' })
    .post('/register', authController.register)
    .post('/login', authController.login);
