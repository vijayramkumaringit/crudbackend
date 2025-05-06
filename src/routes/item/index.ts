import fastify, { FastifyInstance } from "fastify";
import itemRoutes from "./items";

export async function registerItemsRoute(fastify:FastifyInstance){
fastify.register(itemRoutes)
}