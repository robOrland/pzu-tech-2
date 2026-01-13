import type { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';
import { prismaClient } from '../database/PrismaClient';

export class UserRepository implements IUserRepository {
    private prisma = prismaClient;


    private mapToDomain(prismaUser: any): User {
        return new User({
            id: prismaUser.id,
            email: prismaUser.email,
            password: prismaUser.password,
            name: prismaUser.name,
            role: prismaUser.role as any,
            createdAt: prismaUser.createdAt,
            updatedAt: prismaUser.updatedAt,
        });
    }

    async create(user: User): Promise<void> {
        await this.prisma.user.create({
            data: {
                id: user.id,
                email: user.email,
                password: user.password,
                name: user.name,
                role: user.role,
            },
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        const prismaUser = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!prismaUser) return null;
        return this.mapToDomain(prismaUser);
    }

    async findById(id: string): Promise<User | null> {
        const prismaUser = await this.prisma.user.findUnique({
            where: { id },
        });

        if (!prismaUser) return null;
        return this.mapToDomain(prismaUser);
    }

    async findAll(): Promise<User[]> {
        const prismaUsers = await this.prisma.user.findMany({
            orderBy: { name: 'asc' },
        });

        return prismaUsers.map(this.mapToDomain);
    }

    async save(user: User): Promise<void> {
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                email: user.email,
                name: user.name,
                password: user.password,
                role: user.role,
            },
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.user.delete({
            where: { id },
        });
    }
}

