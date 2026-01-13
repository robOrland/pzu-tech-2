import type { IUserRepository } from '../../domain/repositories/IUserRepository';

export class GetAllUsersUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute() {
        const users = await this.userRepository.findAll();

        // Remove passwords from response
        return users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }));
    }
}
