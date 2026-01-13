import { Container } from '../../infrastructure/di/Container';

export class AuthController {
    async register({ body, set }: any) {
        try {
            return await Container.getInstance().registerUserUseCase.execute(body);
        } catch (error: any) {
            set.status = 400;
            return { error: error.message };
        }
    }

    async login({ body, set }: any) {
        try {
            return await Container.getInstance().loginUseCase.execute(body);
        } catch (error: any) {
            set.status = 400;
            return { error: error.message };
        }
    }
}

