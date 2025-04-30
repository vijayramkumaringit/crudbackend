import { FastifyInstance } from 'fastify';
import itemRoutes from './itemCrud.ts/items';
import authRoutes from './auth.ts/commonAuth';

export async function registerRoutes (app: FastifyInstance) {
    app.register(authRoutes,{prefix:'/auth'})
    app.register(itemRoutes,{prefix:'/itemCrud'});
}
