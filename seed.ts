import { prismaClient as prisma } from './src/infrastructure/database/PrismaClient';

async function main() {
    const password = await Bun.password.hash('123456');

    console.log('--- Iniciando Seed ---');
    console.log('Conectando ao banco...');

    // Criar Usuário Comum
    await prisma.user.upsert({
        where: { email: 'user@example.com' },
        update: {},
        create: {
            id: crypto.randomUUID(),
            email: 'user@example.com',
            name: 'Cidadão Exemplo',
            password: password,
            role: 'CITIZEN',
        },
    });

    // Criar Usuário Admin
    await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            id: crypto.randomUUID(),
            email: 'admin@example.com',
            name: 'Administrador Tech',
            password: password,
            role: 'ADMIN',
        },
    });

    console.log('✅ Usuários de teste criados com sucesso!');
    console.log('👤 Cidadão: user@example.com / 123456');
    console.log('🛡️ Admin: admin@example.com / 123456');
}

main()
    .catch((e) => {
        console.error('❌ Erro durante o seed:');
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
