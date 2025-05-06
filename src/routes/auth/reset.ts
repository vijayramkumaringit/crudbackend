import { FastifyInstance } from "fastify";
import { resetController } from "../../controllers/auth/reset";

export default function resetRoute(fastify: FastifyInstance) {
  fastify.post("/reset/:id", {
    schema: {
      params: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "string" },
        },
      },
      body: {
        type: "object",
        required: ["password"],
        properties: {
          password: { type: "string" },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    handler: resetController,
  });
}
