import type { ITicketRepository } from '../../domain/repositories/ITicketRepository';
import { Ticket } from '../../domain/entities/Ticket';
import { prismaClient } from '../database/PrismaClient';

export class TicketRepository implements ITicketRepository {
    private prisma = prismaClient;


    private mapToDomain(prismaTicket: any): Ticket {
        return new Ticket({
            id: prismaTicket.id,
            category: prismaTicket.category,
            description: prismaTicket.description,
            photoUrl: prismaTicket.photoUrl,
            address: prismaTicket.address,
            status: prismaTicket.status as any,
            userId: prismaTicket.userId,
            createdAt: prismaTicket.createdAt,
            updatedAt: prismaTicket.updatedAt,
        });
    }

    async create(ticket: Ticket): Promise<void> {
        await this.prisma.ticket.create({
            data: {
                id: ticket.id,
                category: ticket.category,
                description: ticket.description,
                photoUrl: ticket.photoUrl,
                address: ticket.address,
                status: ticket.status,
                userId: ticket.userId,
            },
        });
    }

    async findById(id: string): Promise<Ticket | null> {
        const prismaTicket = await this.prisma.ticket.findUnique({
            where: { id },
        });

        if (!prismaTicket) return null;
        return this.mapToDomain(prismaTicket);
    }

    async findAllByUserId(userId: string): Promise<Ticket[]> {
        const prismaTickets = await this.prisma.ticket.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });

        return prismaTickets.map(this.mapToDomain);
    }

    async findAll(): Promise<Ticket[]> {
        const prismaTickets = await this.prisma.ticket.findMany({
            orderBy: { createdAt: 'desc' },
        });

        return prismaTickets.map(this.mapToDomain);
    }

    async updateStatus(id: string, status: any): Promise<Ticket> {
        const prismaTicket = await this.prisma.ticket.update({
            where: { id },
            data: { status },
        });

        return this.mapToDomain(prismaTicket);
    }

    async save(ticket: Ticket): Promise<void> {
        await this.prisma.ticket.update({
            where: { id: ticket.id },
            data: {
                category: ticket.category,
                description: ticket.description,
                photoUrl: ticket.photoUrl,
                address: ticket.address,
                status: ticket.status,
            },
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.ticket.delete({
            where: { id },
        });
    }
}

