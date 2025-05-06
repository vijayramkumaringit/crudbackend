import { FastifyInstance } from "fastify";
import { recoverController } from "../../controllers/auth/recover";

export default function recoverRoute(fastify: FastifyInstance) {
  fastify.post("/recover", {
    schema: {
      body: {
        type: "object",
        required: ["name"],
        properties: {
          name: { type: "string", format: "email" },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            message: { type: "string" },
            user: {
              type: "object",
              properties: {
                id: { type: "string" },
                name: { type: "string" },
              },
            },
          },
        },
      },
    },
    handler: recoverController,
  });
}
