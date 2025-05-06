import { FastifyInstance } from "fastify";
import { registerController } from "../../controllers/auth/register";

export default function registerRoute(fastify: FastifyInstance) {
  fastify.post("/register", {
    schema: {
      body: {
        type: "object",
        required: ["name", "password"],
        properties: {
          name: { type: "string" },
          password: { type: "string" },
        },
      },
      response: {
        201: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            password: { type: "string" },
          },
        },
      },
    },
    handler: registerController,
  });
}
