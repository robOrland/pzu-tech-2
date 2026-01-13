import { User } from '../../domain/entities/User';
import type { Role } from '../../domain/entities/User';
import type { IUserRepository } from '../../domain/repositories/IUserRepository';
import type { IPasswordHasher } from '../../domain/services/IPasswordHasher';
import type { ITokenService } from '../../domain/services/ITokenService';

interface RegisterInput {
    name: string;
    email: string;
    password: string;
    role: Role;
}

export class RegisterUserUseCase {
    constructor(
        private userRepository: IUserRepository,
        private passwordHasher: IPasswordHasher,
        private tokenService: ITokenService
    ) { }

    async execute(input: RegisterInput) {
        const existingUser = await this.userRepository.findByEmail(input.email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await this.passwordHasher.hash(input.password);

        const user = new User({
            name: input.name,
            email: input.email,
            password: hashedPassword,
            role: input.role,
        });

        await this.userRepository.create(user);

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

