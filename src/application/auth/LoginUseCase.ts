import type { IUserRepository } from '../../domain/repositories/IUserRepository';
import type { IPasswordHasher } from '../../domain/services/IPasswordHasher';
import type { ITokenService } from '../../domain/services/ITokenService';

interface LoginInput {
    email: string;
    password: string;
}

export class LoginUseCase {
    constructor(
        private userRepository: IUserRepository,
        private passwordHasher: IPasswordHasher,
        private tokenService: ITokenService
    ) { }

    async execute(input: LoginInput) {
        const user = await this.userRepository.findByEmail(input.email);
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isPasswordValid = await this.passwordHasher.compare(input.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        const token = await this.tokenService.generateToken({
            sub: user.id,
            email: user.email,
            role: user.role,
        });

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        };
    }
}

