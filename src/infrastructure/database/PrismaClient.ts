import "dotenv/config";
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// No Prisma 7, para conexões diretas (postgres://), é necessário usar um driver adapter.
// Isso garante compatibilidade total com o novo sistema de conexão do Prisma 7.
// Referência: https://pris.ly/d/config-datasource

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error("❌ DATABASE_URL não encontrada no ambiente.");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prismaClient = new PrismaClient({
    // @ts-ignore - Adaptador configurado para Prisma 7
    adapter
});

export { prismaClient };
