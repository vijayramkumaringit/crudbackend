import { FastifyInstance } from "fastify";
import { registerAuthRoutes } from "./auth";
import { registerItemsRoute } from "./item";

export async function registerRoutes(app: FastifyInstance) {
  app.register(registerAuthRoutes, { prefix: "/auth" });
  app.register(registerItemsRoute, { prefix: "/item" });
}
