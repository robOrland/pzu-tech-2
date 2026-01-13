import "dotenv/config";
import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { AuthModule } from './src/presentation/modules/AuthModule';
import { ZeladoriaModule } from './src/presentation/modules/ZeladoriaModule';
import { AdminModule } from './src/presentation/modules/AdminModule';

const app = new Elysia()
    .use(cors())
    .group('/api', (app) =>
        app
            .use(AuthModule)
            .group('/tickets', (app) => app.use(ZeladoriaModule))
            .use(AdminModule)
    )
    .listen(process.env.PORT || 3000);

console.log(
    `🚀 Server is running at ${app.server?.hostname}:${app.server?.port}`
);